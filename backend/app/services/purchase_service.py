"""Purchase use cases and transaction boundaries."""
from decimal import Decimal
from uuid import UUID
from sqlalchemy.orm import Session
from app.models.purchase import Purchase
from app.models.user import User
from app.repositories.purchase_repository import PurchaseRepository
from app.repositories.vehicle_repository import VehicleRepository
from app.services.inventory_service import InsufficientStockError, VehicleOutOfStockError
from app.services.vehicle_service import VehicleNotFoundError

class PurchaseService:
    def __init__(self, database_session: Session, vehicle_repository: VehicleRepository, purchase_repository: PurchaseRepository) -> None:
        self.database_session = database_session
        self.vehicle_repository = vehicle_repository
        self.purchase_repository = purchase_repository

    def purchase(self, customer: User, vehicle_id: UUID, quantity: int) -> Purchase:
        vehicle = self.vehicle_repository.get_by_id(vehicle_id)
        if vehicle is None:
            raise VehicleNotFoundError
        if vehicle.quantity == 0:
            raise VehicleOutOfStockError
        if quantity > vehicle.quantity:
            raise InsufficientStockError
        try:
            vehicle.quantity -= quantity
            purchase = self.purchase_repository.create_purchase(user_id=customer.id, vehicle_id=vehicle.id, quantity=quantity, purchase_price=vehicle.price, total_price=Decimal(vehicle.price) * quantity)
            self.database_session.commit()
            self.database_session.refresh(purchase)
            return purchase
        except Exception:
            self.database_session.rollback()
            raise

    def get_history(self, customer: User, *, page: int, page_size: int, make: str | None, model: str | None):
        return self.purchase_repository.get_customer_purchase_history(customer.id, page=page, page_size=page_size, make=make, model=model)

    def get_summary(self) -> dict[str, object]:
        total_revenue, total_units, total_count = self.purchase_repository.get_revenue_summary()
        return {
            "total_revenue": float(total_revenue or 0),
            "total_purchases": total_count,
            "total_units_sold": total_units,
        }

