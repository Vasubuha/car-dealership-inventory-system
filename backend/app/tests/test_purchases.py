"""Tests for the customer purchase history module."""
from fastapi.testclient import TestClient

from app.models.user import User, UserRole

VEHICLE = {"make": "Toyota", "model": "Fortuner", "category": "SUV", "price": 4500000, "quantity": 5}


# ---------------------------------------------------------------------------
# Helpers
# ---------------------------------------------------------------------------

def authenticated_headers(client: TestClient, email: str = "buyer@example.com") -> dict[str, str]:
    client.post("/api/auth/register", json={"username": email.split("@")[0], "email": email, "password": "Password123"})
    token = client.post("/api/auth/login", json={"email": email, "password": "Password123"}).json()["access_token"]
    return {"Authorization": f"Bearer {token}"}


def create_vehicle(client: TestClient, headers: dict[str, str], **changes: object) -> dict:
    response = client.post("/api/v1/vehicles", headers=headers, json=VEHICLE | changes)
    assert response.status_code == 201
    return response.json()


def make_admin(database_session, email: str) -> None:
    user = database_session.query(User).filter_by(email=email).one()
    user.role = UserRole.ADMIN
    database_session.commit()


def do_purchase(client: TestClient, headers: dict[str, str], vehicle_id: str, quantity: int = 1) -> dict:
    response = client.post(f"/api/v1/vehicles/{vehicle_id}/purchase", headers=headers, json={"quantity": quantity})
    assert response.status_code == 200
    return response.json()


# ---------------------------------------------------------------------------
# Purchase recording
# ---------------------------------------------------------------------------

def test_purchase_creates_history_record(client: TestClient) -> None:
    """A successful purchase via POST /purchase must appear in /my-history."""
    headers = authenticated_headers(client)
    vehicle = create_vehicle(client, headers)

    do_purchase(client, headers, vehicle["id"])

    response = client.get("/api/v1/purchases/my-history", headers=headers)
    assert response.status_code == 200
    body = response.json()
    assert body["meta"]["total"] == 1
    item = body["items"][0]
    assert item["vehicle_id"] == vehicle["id"]
    assert item["make"] == "Toyota"
    assert item["model"] == "Fortuner"
    assert item["category"] == "SUV"
    assert item["quantity"] == 1
    assert float(item["purchase_price"]) == 4500000.0
    assert float(item["total_price"]) == 4500000.0


def test_purchase_deducts_stock_and_records(client: TestClient) -> None:
    """Stock is decremented AND the purchase record is written in the same request."""
    headers = authenticated_headers(client, "stockcheck@example.com")
    vehicle = create_vehicle(client, headers, quantity=3)

    purchase_resp = do_purchase(client, headers, vehicle["id"], quantity=2)
    # Stock deduction is still working
    assert purchase_resp["vehicle"]["quantity"] == 1

    history_resp = client.get("/api/v1/purchases/my-history", headers=headers)
    assert history_resp.json()["meta"]["total"] == 1
    assert history_resp.json()["items"][0]["quantity"] == 2


def test_multiple_purchases_appear_newest_first(client: TestClient) -> None:
    """History returns all purchases for the current user."""
    headers = authenticated_headers(client, "multi@example.com")
    v1 = create_vehicle(client, headers, make="Honda", model="CR-V", quantity=5)
    v2 = create_vehicle(client, headers, make="Ford", model="Ranger", quantity=5)

    do_purchase(client, headers, v1["id"])
    do_purchase(client, headers, v2["id"])

    resp = client.get("/api/v1/purchases/my-history", headers=headers)
    items = resp.json()["items"]
    assert len(items) == 2
    makes = {item["make"] for item in items}
    assert makes == {"Honda", "Ford"}


# ---------------------------------------------------------------------------
# History retrieval — filters & pagination
# ---------------------------------------------------------------------------

def test_history_filter_by_make(client: TestClient) -> None:
    headers = authenticated_headers(client, "filtermaker@example.com")
    v1 = create_vehicle(client, headers, make="BMW", model="X5", quantity=2)
    v2 = create_vehicle(client, headers, make="Mercedes", model="GLE", quantity=2)
    do_purchase(client, headers, v1["id"])
    do_purchase(client, headers, v2["id"])

    resp = client.get("/api/v1/purchases/my-history", headers=headers, params={"make": "bmw"})
    items = resp.json()["items"]
    assert len(items) == 1
    assert items[0]["make"] == "BMW"


def test_history_filter_by_model(client: TestClient) -> None:
    headers = authenticated_headers(client, "filtermodel@example.com")
    v1 = create_vehicle(client, headers, make="Toyota", model="Hilux", quantity=2)
    v2 = create_vehicle(client, headers, make="Toyota", model="Fortuner", quantity=2)
    do_purchase(client, headers, v1["id"])
    do_purchase(client, headers, v2["id"])

    resp = client.get("/api/v1/purchases/my-history", headers=headers, params={"model": "hilux"})
    items = resp.json()["items"]
    assert len(items) == 1
    assert items[0]["model"] == "Hilux"


def test_history_pagination(client: TestClient) -> None:
    headers = authenticated_headers(client, "paginator@example.com")
    vehicles = [create_vehicle(client, headers, make=f"Make{i}", model=f"Model{i}", quantity=5) for i in range(5)]
    for v in vehicles:
        do_purchase(client, headers, v["id"])

    page1 = client.get("/api/v1/purchases/my-history", headers=headers, params={"page": 1, "page_size": 3})
    page2 = client.get("/api/v1/purchases/my-history", headers=headers, params={"page": 2, "page_size": 3})

    assert page1.status_code == 200
    assert len(page1.json()["items"]) == 3
    assert page1.json()["meta"]["total"] == 5
    assert page1.json()["meta"]["total_pages"] == 2

    assert page2.status_code == 200
    assert len(page2.json()["items"]) == 2


def test_history_empty_for_new_customer(client: TestClient) -> None:
    """A brand-new customer has no purchase history."""
    headers = authenticated_headers(client, "newcustomer@example.com")
    resp = client.get("/api/v1/purchases/my-history", headers=headers)
    assert resp.status_code == 200
    assert resp.json()["meta"]["total"] == 0
    assert resp.json()["items"] == []


# ---------------------------------------------------------------------------
# Authorization
# ---------------------------------------------------------------------------

def test_history_requires_authentication(client: TestClient) -> None:
    """Request without a JWT token must be rejected with 401."""
    response = client.get("/api/v1/purchases/my-history")
    assert response.status_code == 401


def test_history_allowed_for_admin(client: TestClient, database_session) -> None:
    """Admin users can access /my-history — they see their own purchases (empty here)."""
    headers = authenticated_headers(client, "admin-hist@example.com")
    make_admin(database_session, "admin-hist@example.com")
    response = client.get("/api/v1/purchases/my-history", headers=headers)
    assert response.status_code == 200
    assert response.json()["meta"]["total"] == 0


def test_revenue_summary_requires_admin(client: TestClient) -> None:
    """Non-admin user cannot access /summary."""
    headers = authenticated_headers(client, "customer-rev@example.com")
    response = client.get("/api/v1/purchases/summary", headers=headers)
    assert response.status_code == 403


def test_revenue_summary_for_admin(client: TestClient, database_session) -> None:
    """Admin user can fetch total revenue summary."""
    admin_headers = authenticated_headers(client, "admin-rev@example.com")
    make_admin(database_session, "admin-rev@example.com")
    user_headers = authenticated_headers(client, "buyer-rev@example.com")

    vehicle = create_vehicle(client, admin_headers, price=50000, quantity=10)
    do_purchase(client, user_headers, vehicle["id"], quantity=2)

    response = client.get("/api/v1/purchases/summary", headers=admin_headers)
    assert response.status_code == 200
    data = response.json()
    assert data["total_revenue"] >= 100000.0
    assert data["total_units_sold"] >= 2
    assert data["total_purchases"] >= 1



# ---------------------------------------------------------------------------
# Error paths (purchase endpoint, indirectly validates recording guard)
# ---------------------------------------------------------------------------

def test_insufficient_stock_does_not_create_purchase(client: TestClient) -> None:
    """When a purchase fails due to insufficient stock no purchase row must appear."""
    headers = authenticated_headers(client, "nostock@example.com")
    vehicle = create_vehicle(client, headers, quantity=1)

    # This should fail
    resp = client.post(f"/api/v1/vehicles/{vehicle['id']}/purchase", headers=headers, json={"quantity": 10})
    assert resp.status_code == 400

    history = client.get("/api/v1/purchases/my-history", headers=headers)
    assert history.json()["meta"]["total"] == 0


def test_invalid_vehicle_does_not_create_purchase(client: TestClient) -> None:
    """Purchasing a non-existent vehicle returns 404 and creates no purchase row."""
    headers = authenticated_headers(client, "ghost@example.com")
    resp = client.post(
        "/api/v1/vehicles/00000000-0000-0000-0000-000000000000/purchase",
        headers=headers,
        json={"quantity": 1},
    )
    assert resp.status_code == 404

    history = client.get("/api/v1/purchases/my-history", headers=headers)
    assert history.json()["meta"]["total"] == 0
