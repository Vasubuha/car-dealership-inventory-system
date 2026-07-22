from fastapi.testclient import TestClient

from app.models.user import User, UserRole

VEHICLE = {"make": "Toyota", "model": "Fortuner", "category": "SUV", "price": 4200000, "quantity": 5}


def authenticated_headers(client: TestClient, email: str = "inventory@example.com") -> dict[str, str]:
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


def test_purchase_vehicle_successfully(client: TestClient) -> None:
    headers = authenticated_headers(client)
    vehicle = create_vehicle(client, headers)
    response = client.post(f"/api/v1/vehicles/{vehicle['id']}/purchase", headers=headers, json={"quantity": 1})
    assert response.status_code == 200
    assert response.json()["message"] == "Vehicle purchased successfully"
    assert response.json()["vehicle"]["quantity"] == 4


def test_purchase_multiple_and_exact_remaining_stock(client: TestClient) -> None:
    headers = authenticated_headers(client)
    vehicle = create_vehicle(client, headers, quantity=5)
    assert client.post(f"/api/v1/vehicles/{vehicle['id']}/purchase", headers=headers, json={"quantity": 3}).json()["vehicle"]["quantity"] == 2
    assert client.post(f"/api/v1/vehicles/{vehicle['id']}/purchase", headers=headers, json={"quantity": 2}).json()["vehicle"]["quantity"] == 0


def test_purchase_rejects_invalid_quantity_and_insufficient_stock(client: TestClient) -> None:
    headers = authenticated_headers(client)
    vehicle = create_vehicle(client, headers, quantity=2)
    assert client.post(f"/api/v1/vehicles/{vehicle['id']}/purchase", headers=headers, json={"quantity": 0}).status_code == 422
    response = client.post(f"/api/v1/vehicles/{vehicle['id']}/purchase", headers=headers, json={"quantity": 3})
    assert response.status_code == 400
    assert response.json()["detail"] == "Insufficient stock"


def test_purchase_out_of_stock_not_found_and_unauthorized(client: TestClient) -> None:
    headers = authenticated_headers(client)
    vehicle = create_vehicle(client, headers, quantity=1)
    client.post(f"/api/v1/vehicles/{vehicle['id']}/purchase", headers=headers, json={"quantity": 1})
    assert client.post(f"/api/v1/vehicles/{vehicle['id']}/purchase", headers=headers, json={"quantity": 1}).json()["detail"] == "Vehicle is out of stock"
    assert client.post("/api/v1/vehicles/00000000-0000-0000-0000-000000000000/purchase", headers=headers, json={"quantity": 1}).status_code == 404
    assert client.post(f"/api/v1/vehicles/{vehicle['id']}/purchase", json={"quantity": 1}).status_code == 401


def test_admin_restock_increases_stock(client: TestClient, database_session) -> None:
    headers = authenticated_headers(client, "admin-inventory@example.com")
    make_admin(database_session, "admin-inventory@example.com")
    vehicle = create_vehicle(client, headers, quantity=1)
    response = client.post(f"/api/v1/vehicles/{vehicle['id']}/restock", headers=headers, json={"quantity": 10})
    assert response.status_code == 200
    assert response.json()["message"] == "Vehicle restocked successfully"
    assert response.json()["vehicle"]["quantity"] == 11


def test_restock_rejects_invalid_quantity_non_admin_and_missing_vehicle(client: TestClient, database_session) -> None:
    admin_headers = authenticated_headers(client, "admin-restock@example.com")
    make_admin(database_session, "admin-restock@example.com")
    vehicle = create_vehicle(client, admin_headers)
    assert client.post(f"/api/v1/vehicles/{vehicle['id']}/restock", headers=admin_headers, json={"quantity": 0}).status_code == 422
    customer_headers = authenticated_headers(client, "customer-restock@example.com")
    assert client.post(f"/api/v1/vehicles/{vehicle['id']}/restock", headers=customer_headers, json={"quantity": 1}).status_code == 403
    assert client.post("/api/v1/vehicles/00000000-0000-0000-0000-000000000000/restock", headers=admin_headers, json={"quantity": 1}).status_code == 404
