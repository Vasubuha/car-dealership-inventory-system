"""Analytics service for building dashboard payload."""
from app.repositories.analytics_repository import AnalyticsRepository
from app.schemas.analytics import (
    CategorySalesPoint,
    DashboardResponse,
    KPISummary,
    RecentPurchaseItem,
    SalesTrendPoint,
    TopBrandPoint,
    WeeklySalesPoint,
)


class AnalyticsService:
    def __init__(self, analytics_repository: AnalyticsRepository) -> None:
        self.analytics_repository = analytics_repository

    def get_dashboard_data(self) -> DashboardResponse:
        kpi_dict = self.analytics_repository.get_kpis()
        sales_trend_raw = self.analytics_repository.get_sales_trend(days=30)
        weekly_sales_raw = self.analytics_repository.get_weekly_sales()
        sales_by_cat_raw = self.analytics_repository.get_sales_by_category()
        top_brands_raw = self.analytics_repository.get_top_brands(limit=5)
        recent_purchases_raw = self.analytics_repository.get_recent_purchases(limit=10)

        kpis = KPISummary(**kpi_dict)

        sales_trend = [SalesTrendPoint(**item) for item in sales_trend_raw]
        weekly_sales = [WeeklySalesPoint(**item) for item in weekly_sales_raw]
        sales_by_category = [CategorySalesPoint(**item) for item in sales_by_cat_raw]
        top_brands = [TopBrandPoint(**item) for item in top_brands_raw]

        recent_purchases = [
            RecentPurchaseItem(
                id=p.id,
                customer_name=p.user.username if p.user else "Customer",
                customer_email=p.user.email if p.user else "",
                vehicle_make=p.vehicle.make if p.vehicle else "Unknown",
                vehicle_model=p.vehicle.model if p.vehicle else "Unknown",
                category=p.vehicle.category if p.vehicle else "Standard",
                quantity=p.quantity,
                unit_price=float(p.purchase_price),
                total_price=float(p.total_price),
                created_at=p.created_at,
            )
            for p in recent_purchases_raw
        ]

        return DashboardResponse(
            kpis=kpis,
            salesTrend=sales_trend,
            weeklySales=weekly_sales,
            salesByCategory=sales_by_category,
            topBrands=top_brands,
            recentPurchases=recent_purchases,
        )
