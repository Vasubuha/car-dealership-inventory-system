from fastapi import Depends, FastAPI, HTTPException
from fastapi.testclient import TestClient
from app.auth.security import get_current_user, verify_access_token
from app.database.session import get_db
from app.models.user import User, UserRole


def register(client: TestClient, email: str = "john@example.com"):
    return client.post(
        "/api/auth/register",
        json={"username": "john", "email": email, "password": "Password123"},
    )


def login(client: TestClient, password: str = "Password123"):
    return client.post(
        "/api/auth/login",
        json={"email": "john@example.com", "password": password},
    )


def test_register_success_hashes_password_and_assigns_customer_role(client, database_session):
    response = register(client)
    user = database_session.query(User).one()

    assert response.status_code == 201
    assert response.json() == {"message": "User registered successfully"}
    assert user.password_hash != "Password123"
    assert user.role is UserRole.CUSTOMER


def test_duplicate_email_is_case_insensitive(client):
    assert register(client).status_code == 201
    assert register(client, "JOHN@EXAMPLE.COM").status_code == 409


def test_invalid_registration(client):
    response = client.post(
        "/api/auth/register",
        json={"username": "   ", "email": "not-email", "password": "short"},
    )
    assert response.status_code == 422


def test_login_success(client):
    register(client)
    response = login(client)

    assert response.status_code == 200
    assert response.json()["token_type"] == "bearer"
    assert response.json()["access_token"]


def test_invalid_password(client):
    register(client)
    assert login(client, "wrong-password").status_code == 401


def test_unknown_email(client):
    response = client.post(
        "/api/auth/login",
        json={"email": "unknown@example.com", "password": "Password123"},
    )
    assert response.status_code == 401


def test_jwt_creation_and_validation(client):
    register(client)
    token = login(client).json()["access_token"]
    assert verify_access_token(token).user_id == 1


def test_invalid_jwt_is_rejected():
    try:
        verify_access_token("not-a-jwt")
    except HTTPException as error:
        assert error.status_code == 401
    else:
        raise AssertionError("Invalid JWT was accepted")


def test_protected_route_authorized_and_unauthorized(client, session_factory):
    protected_app = FastAPI()

    def override_get_db():
        database_session = session_factory()
        try:
            yield database_session
        finally:
            database_session.close()

    protected_app.dependency_overrides[get_db] = override_get_db

    @protected_app.get("/protected")
    def protected(user: User = Depends(get_current_user)):
        return {"email": user.email}

    protected_client = TestClient(protected_app)
    assert protected_client.get("/protected").status_code == 401

    register(client)
    token = login(client).json()["access_token"]
    response = protected_client.get(
        "/protected", headers={"Authorization": f"Bearer {token}"}
    )
    assert response.status_code == 200
    assert response.json() == {"email": "john@example.com"}