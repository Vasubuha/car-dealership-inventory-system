"""Tests for the dashboard analytics module."""
from fastapi.testclient import TestClient
from sqlalchemy.orm import Session

from app.models.user import User, UserRole
from app.repositories.analytics_repository import AnalyticsRepository


def get_admin_headers(client: TestClient, db_session: Session) -> dict[str, str]:
    email = "admin_analytics@example.com"
    client.post("/api/auth/register", json={"username": "admin_analytics", "email": email, "password": "Password123"})
    user = db_session.query(User).filter_by(email=email).one()
    user.role = UserRole.ADMIN
    db_session.commit()

    token = client.post("/api/auth/login", json={"email": email, "password": "Password123"}).json()["access_token"]
    return {"Authorization": f"Bearer {token}"}


def get_customer_headers(client: TestClient) -> dict[str, str]:
    email = "customer_analytics@example.com"
    client.post("/api/auth/register", json={"username": "customer_analytics", "email": email, "password": "Password123"})
    token = client.post("/api/auth/login", json={"email": email, "password": "Password123"}).json()["access_token"]
    return {"Authorization": f"Bearer {token}"}


def test_dashboard_endpoint_requires_admin(client: TestClient, database_session: Session) -> None:
    # Unauthenticated should fail 401
    res = client.get("/api/v1/dashboard")
    assert res.status_code == 401

    # Customer role should fail 403
    cust_headers = get_customer_headers(client)
    res = client.get("/api/v1/dashboard", headers=cust_headers)
    assert res.status_code == 403


def test_dashboard_endpoint_as_admin(client: TestClient, database_session: Session) -> None:
    admin_headers = get_admin_headers(client, database_session)

    # Create vehicle & purchase
    veh_res = client.post(
        "/api/v1/vehicles",
        headers=admin_headers,
        json={"make": "BMW", "model": "M3", "category": "Sports", "price": 80000.0, "quantity": 10},
    )
    assert veh_res.status_code == 201
    veh_id = veh_res.json()["id"]

    # Customer purchases 2 units
    cust_headers = get_customer_headers(client)
    purch_res = client.post(f"/api/v1/vehicles/{veh_id}/purchase", headers=cust_headers, json={"quantity": 2})
    assert purch_res.status_code == 200

    # Fetch dashboard data
    res = client.get("/api/v1/dashboard", headers=admin_headers)
    assert res.status_code == 200
    data = res.json()

    # Check top-level keys
    assert "kpis" in data
    assert "salesTrend" in data
    assert "weeklySales" in data
    assert "salesByCategory" in data
    assert "topBrands" in data
    assert "recentPurchases" in data

    # Check KPI metrics
    kpis = data["kpis"]
    assert kpis["total_revenue"] == 160000.0
    assert kpis["todays_revenue"] == 160000.0
    assert kpis["vehicles_sold_today"] == 2
    assert kpis["inventory_value"] == 640000.0  # 8 units remaining * 80000

    # Check salesByCategory
    cat_item = next((c for c in data["salesByCategory"] if c["category"] == "Sports"), None)
    assert cat_item is not None
    assert cat_item["sales"] == 2
    assert cat_item["revenue"] == 160000.0

    # Check topBrands
    brand_item = next((b for b in data["topBrands"] if b["brand"] == "BMW"), None)
    assert brand_item is not None
    assert brand_item["sales"] == 2
    assert brand_item["revenue"] == 160000.0

    # Check recentPurchases
    assert len(data["recentPurchases"]) >= 1
    recent = data["recentPurchases"][0]
    assert recent["vehicle_make"] == "BMW"
    assert recent["vehicle_model"] == "M3"
    assert recent["quantity"] == 2
    assert recent["total_price"] == 160000.0


def test_analytics_repository_queries(database_session: Session) -> None:
    repo = AnalyticsRepository(database_session)
    kpis = repo.get_kpis()
    assert "total_revenue" in kpis
    assert "inventory_value" in kpis
    assert "low_stock_count" in kpis

    trend = repo.get_sales_trend(30)
    assert len(trend) == 30

    weekly = repo.get_weekly_sales()
    assert len(weekly) == 7
