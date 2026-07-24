"""Repository for database analytics aggregation queries."""
from datetime import datetime, timedelta, timezone
from decimal import Decimal

from sqlalchemy import func, select
from sqlalchemy.orm import Session, joinedload

from app.models.purchase import Purchase
from app.models.user import User
from app.models.vehicle import Vehicle


class AnalyticsRepository:
    def __init__(self, database_session: Session) -> None:
        self.database_session = database_session

    def get_kpis(self) -> dict[str, float | int]:
        now = datetime.now(timezone.utc)
        start_of_today = datetime(now.year, now.month, now.day, tzinfo=timezone.utc)
        start_of_week = start_of_today - timedelta(days=start_of_today.weekday())
        start_of_month = datetime(now.year, now.month, 1, tzinfo=timezone.utc)

        # Total revenue
        tot_rev_stmt = select(func.coalesce(func.sum(Purchase.total_price), Decimal("0")))
        tot_rev = float(self.database_session.scalar(tot_rev_stmt) or 0)

        # Today's revenue
        today_rev_stmt = select(func.coalesce(func.sum(Purchase.total_price), Decimal("0"))).where(
            Purchase.created_at >= start_of_today
        )
        today_rev = float(self.database_session.scalar(today_rev_stmt) or 0)

        # Weekly revenue
        week_rev_stmt = select(func.coalesce(func.sum(Purchase.total_price), Decimal("0"))).where(
            Purchase.created_at >= start_of_week
        )
        week_rev = float(self.database_session.scalar(week_rev_stmt) or 0)

        # Monthly revenue
        month_rev_stmt = select(func.coalesce(func.sum(Purchase.total_price), Decimal("0"))).where(
            Purchase.created_at >= start_of_month
        )
        month_rev = float(self.database_session.scalar(month_rev_stmt) or 0)

        # Inventory value
        inv_val_stmt = select(func.coalesce(func.sum(Vehicle.price * Vehicle.quantity), Decimal("0")))
        inv_val = float(self.database_session.scalar(inv_val_stmt) or 0)

        # Total vehicles (sum of stock)
        tot_veh_stmt = select(func.coalesce(func.sum(Vehicle.quantity), 0))
        tot_veh = int(self.database_session.scalar(tot_veh_stmt) or 0)

        # Available vehicles (vehicles with quantity > 0)
        avail_veh_stmt = select(func.coalesce(func.sum(Vehicle.quantity), 0)).where(Vehicle.quantity > 0)
        avail_veh = int(self.database_session.scalar(avail_veh_stmt) or 0)

        # Low stock count (vehicles with quantity between 1 and 5)
        low_stock_stmt = select(func.count(Vehicle.id)).where(Vehicle.quantity >= 1, Vehicle.quantity <= 5)
        low_stock = int(self.database_session.scalar(low_stock_stmt) or 0)

        # Vehicles sold today
        sold_today_stmt = select(func.coalesce(func.sum(Purchase.quantity), 0)).where(
            Purchase.created_at >= start_of_today
        )
        sold_today = int(self.database_session.scalar(sold_today_stmt) or 0)

        # Vehicles sold this week
        sold_week_stmt = select(func.coalesce(func.sum(Purchase.quantity), 0)).where(
            Purchase.created_at >= start_of_week
        )
        sold_week = int(self.database_session.scalar(sold_week_stmt) or 0)

        # Average selling price
        asp_stmt = select(func.coalesce(func.avg(Purchase.purchase_price), Decimal("0")))
        asp = float(self.database_session.scalar(asp_stmt) or 0)

        return {
            "total_revenue": tot_rev,
            "todays_revenue": today_rev,
            "weekly_revenue": week_rev,
            "monthly_revenue": month_rev,
            "inventory_value": inv_val,
            "total_vehicles": tot_veh,
            "available_vehicles": avail_veh,
            "low_stock_count": low_stock,
            "vehicles_sold_today": sold_today,
            "vehicles_sold_this_week": sold_week,
            "average_selling_price": asp,
        }

    def get_sales_trend(self, days: int = 30) -> list[dict]:
        now = datetime.now(timezone.utc)
        start_date = now - timedelta(days=days - 1)
        start_date_clean = datetime(start_date.year, start_date.month, start_date.day, tzinfo=timezone.utc)

        # Query sales grouped by date
        stmt = (
            select(
                func.date(Purchase.created_at).label("sale_date"),
                func.coalesce(func.sum(Purchase.total_price), Decimal("0")).label("revenue"),
                func.coalesce(func.sum(Purchase.quantity), 0).label("units"),
            )
            .where(Purchase.created_at >= start_date_clean)
            .group_by(func.date(Purchase.created_at))
            .order_by(func.date(Purchase.created_at))
        )
        rows = self.database_session.execute(stmt).all()

        # Map results by date string YYYY-MM-DD
        data_by_date = {}
        for r in rows:
            d_str = str(r.sale_date)
            data_by_date[d_str] = {
                "date": d_str,
                "revenue": float(r.revenue),
                "units": int(r.units),
            }

        # Build continuous 30-day timeline
        trend = []
        for i in range(days):
            d = (start_date_clean + timedelta(days=i)).strftime("%Y-%m-%d")
            if d in data_by_date:
                trend.append(data_by_date[d])
            else:
                trend.append({"date": d, "revenue": 0.0, "units": 0})
        return trend

    def get_weekly_sales(self) -> list[dict]:
        now = datetime.now(timezone.utc)
        start_of_today = datetime(now.year, now.month, now.day, tzinfo=timezone.utc)
        start_of_week = start_of_today - timedelta(days=start_of_today.weekday())

        days_map = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
        weekly_data = {days_map[i]: {"day": days_map[i], "sales": 0, "revenue": 0.0} for i in range(7)}

        stmt = (
            select(
                func.date(Purchase.created_at).label("sale_date"),
                func.coalesce(func.sum(Purchase.quantity), 0).label("sales"),
                func.coalesce(func.sum(Purchase.total_price), Decimal("0")).label("revenue"),
            )
            .where(Purchase.created_at >= start_of_week)
            .group_by(func.date(Purchase.created_at))
        )
        rows = self.database_session.execute(stmt).all()

        for r in rows:
            if r.sale_date:
                dt = datetime.strptime(str(r.sale_date), "%Y-%m-%d")
                day_name = days_map[dt.weekday()]
                weekly_data[day_name] = {
                    "day": day_name,
                    "sales": int(r.sales),
                    "revenue": float(r.revenue),
                }

        return list(weekly_data.values())

    def get_sales_by_category(self) -> list[dict]:
        stmt = (
            select(
                Vehicle.category,
                func.coalesce(func.sum(Purchase.quantity), 0).label("sales"),
                func.coalesce(func.sum(Purchase.total_price), Decimal("0")).label("revenue"),
            )
            .join(Vehicle, Purchase.vehicle_id == Vehicle.id)
            .group_by(Vehicle.category)
            .order_by(func.sum(Purchase.total_price).desc())
        )
        rows = self.database_session.execute(stmt).all()
        return [
            {
                "category": r.category,
                "sales": int(r.sales),
                "revenue": float(r.revenue),
            }
            for r in rows
        ]

    def get_top_brands(self, limit: int = 5) -> list[dict]:
        stmt = (
            select(
                Vehicle.make.label("brand"),
                func.coalesce(func.sum(Purchase.quantity), 0).label("sales"),
                func.coalesce(func.sum(Purchase.total_price), Decimal("0")).label("revenue"),
            )
            .join(Vehicle, Purchase.vehicle_id == Vehicle.id)
            .group_by(Vehicle.make)
            .order_by(func.sum(Purchase.total_price).desc())
            .limit(limit)
        )
        rows = self.database_session.execute(stmt).all()
        return [
            {
                "brand": r.brand,
                "sales": int(r.sales),
                "revenue": float(r.revenue),
            }
            for r in rows
        ]

    def get_recent_purchases(self, limit: int = 10) -> list[Purchase]:
        stmt = (
            select(Purchase)
            .options(joinedload(Purchase.user), joinedload(Purchase.vehicle))
            .order_by(Purchase.created_at.desc())
            .limit(limit)
        )
        return list(self.database_session.scalars(stmt))
