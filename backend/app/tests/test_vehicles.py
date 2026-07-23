from fastapi.testclient import TestClient

from app.models.user import User, UserRole


VEHICLE = {
    "make": "Toyota",
    "model": "Fortuner",
    "category": "SUV",
    "price": 4200000,
    "quantity": 5,
}


def authenticated_headers(client: TestClient) -> dict[str, str]:
    client.post(
        "/api/auth/register",
        json={"username": "vehicle-user", "email": "vehicle@example.com", "password": "Password123"},
    )
    token = client.post(
        "/api/auth/login", json={"email": "vehicle@example.com", "password": "Password123"}
    ).json()["access_token"]
    return {"Authorization": f"Bearer {token}"}


def create_vehicle(client: TestClient, headers: dict[str, str], **changes: object):
    return client.post("/api/v1/vehicles", headers=headers, json=VEHICLE | changes)


def test_create_vehicle_success(client: TestClient) -> None:
    response = create_vehicle(client, authenticated_headers(client))

    assert response.status_code == 201
    assert response.json()["make"] == "Toyota"
    assert response.json()["price"] == "4200000.00"


def test_create_vehicle_default_quantity(client: TestClient) -> None:
    response = client.post(
        "/api/v1/vehicles",
        headers=authenticated_headers(client),
        json={key: value for key, value in VEHICLE.items() if key != "quantity"},
    )
    assert response.status_code == 201
    assert response.json()["quantity"] == 1


def test_create_vehicle_invalid_data(client: TestClient) -> None:
    headers = authenticated_headers(client)
    assert create_vehicle(client, headers, price=0).status_code == 422
    assert create_vehicle(client, headers, make="   ").status_code == 422
    assert create_vehicle(client, headers, model="").status_code == 422
    assert create_vehicle(client, headers, category="").status_code == 422
    assert create_vehicle(client, headers, quantity=-1).status_code == 422


def test_list_all_vehicles_and_empty_list(client: TestClient) -> None:
    headers = authenticated_headers(client)
    assert client.get("/api/v1/vehicles").status_code == 200
    assert client.get("/api/v1/vehicles").json() == []
    create_vehicle(client, headers)
    assert len(client.get("/api/v1/vehicles").json()) == 1


def test_update_vehicle_and_partial_update(client: TestClient) -> None:
    headers = authenticated_headers(client)
    vehicle_id = create_vehicle(client, headers).json()["id"]
    response = client.put(f"/api/v1/vehicles/{vehicle_id}", headers=headers, json={"price": 4000000})

    assert response.status_code == 200
    assert response.json()["price"] == "4000000.00"
    assert response.json()["make"] == "Toyota"
    assert client.put(f"/api/v1/vehicles/{vehicle_id}", headers=headers, json={"price": -1}).status_code == 422
    assert client.put("/api/v1/vehicles/00000000-0000-0000-0000-000000000000", headers=headers, json={"make": "Honda"}).status_code == 404


def test_admin_can_delete_vehicle(client: TestClient, database_session) -> None:
    headers = authenticated_headers(client)
    user = database_session.query(User).filter_by(email="vehicle@example.com").one()
    user.role = UserRole.ADMIN
    database_session.commit()
    vehicle_id = create_vehicle(client, headers).json()["id"]

    assert client.delete(f"/api/v1/vehicles/{vehicle_id}", headers=headers).status_code == 204
    assert client.delete(f"/api/v1/vehicles/{vehicle_id}", headers=headers).status_code == 404


def test_non_admin_cannot_delete_vehicle(client: TestClient, database_session) -> None:
    customer_headers = authenticated_headers(client)
    vehicle_id = create_vehicle(client, customer_headers).json()["id"]

    assert client.delete(f"/api/v1/vehicles/{vehicle_id}", headers=customer_headers).status_code == 403


def test_search_vehicles(client: TestClient) -> None:
    headers = authenticated_headers(client)
    create_vehicle(client, headers)
    create_vehicle(client, headers, make="Honda", model="City", category="Sedan", price=1500000)

    assert len(client.get("/api/v1/vehicles/search", headers=headers, params={"make": "Toyota"}).json()) == 1
    assert len(client.get("/api/v1/vehicles/search", headers=headers, params={"model": "City"}).json()) == 1
    assert len(client.get("/api/v1/vehicles/search", headers=headers, params={"category": "SUV"}).json()) == 1
    assert len(client.get("/api/v1/vehicles/search", headers=headers, params={"min_price": 1000000, "max_price": 2000000}).json()) == 1
    assert len(client.get("/api/v1/vehicles/search", headers=headers, params={"make": "Toyota", "category": "SUV"}).json()) == 1
    assert client.get("/api/v1/vehicles/search", headers=headers, params={"make": "Ford"}).json() == []
