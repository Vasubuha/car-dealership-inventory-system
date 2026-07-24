"""Analytics and Dashboard API schemas."""
from datetime import datetime
from uuid import UUID
from pydantic import BaseModel, ConfigDict


class KPISummary(BaseModel):
    total_revenue: float
    todays_revenue: float
    weekly_revenue: float
    monthly_revenue: float
    inventory_value: float
    total_vehicles: int
    available_vehicles: int
    low_stock_count: int
    vehicles_sold_today: int
    vehicles_sold_this_week: int
    average_selling_price: float


class SalesTrendPoint(BaseModel):
    date: str
    revenue: float
    units: int


class WeeklySalesPoint(BaseModel):
    day: str
    sales: int
    revenue: float


class CategorySalesPoint(BaseModel):
    category: str
    sales: int
    revenue: float


class TopBrandPoint(BaseModel):
    brand: str
    sales: int
    revenue: float


class RecentPurchaseItem(BaseModel):
    id: UUID
    customer_name: str
    customer_email: str
    vehicle_make: str
    vehicle_model: str
    category: str
    quantity: int
    unit_price: float
    total_price: float
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)


class DashboardResponse(BaseModel):
    kpis: KPISummary
    salesTrend: list[SalesTrendPoint]
    weeklySales: list[WeeklySalesPoint]
    salesByCategory: list[CategorySalesPoint]
    topBrands: list[TopBrandPoint]
    recentPurchases: list[RecentPurchaseItem]
