"""Inventory business use cases."""
from __future__ import annotations

from decimal import Decimal
from typing import TYPE_CHECKING
from uuid import UUID

from app.models.vehicle import Vehicle
from app.repositories.vehicle_repository import VehicleRepository
from app.services.vehicle_service import VehicleNotFoundError

if TYPE_CHECKING:
    from app.repositories.purchase_repository import PurchaseRepository


class VehicleOutOfStockError(Exception):
    """Raised when a vehicle has no inventory available."""


class InsufficientStockError(Exception):
    """Raised when a requested purchase exceeds available inventory."""


class InventoryService:
    def __init__(self, vehicle_repository: VehicleRepository) -> None:
        self.vehicle_repository = vehicle_repository

    def purchase(
        self,
        vehicle_id: UUID,
        quantity: int,
        *,
        user_id: int | None = None,
        purchase_repository: PurchaseRepository | None = None,
    ) -> Vehicle:
        """Decrement stock and optionally record a purchase row in one atomic transaction.

        When ``user_id`` and ``purchase_repository`` are both supplied, the
        stock deduction and purchase record are committed together so neither
        can succeed without the other.
        """
        vehicle = self._get_existing(vehicle_id)
        if vehicle.quantity == 0:
            raise VehicleOutOfStockError
        if quantity > vehicle.quantity:
            raise InsufficientStockError

        if user_id is not None and purchase_repository is not None:
            # Atomic path: stage both changes and commit once.
            vehicle.quantity -= quantity
            purchase_repository.create_purchase(
                user_id=user_id,
                vehicle_id=vehicle.id,
                quantity=quantity,
                purchase_price=vehicle.price,
                total_price=Decimal(str(vehicle.price)) * quantity,
            )
            # Both the vehicle mutation and new Purchase row are pending in the
            # same session — commit once for true atomicity.
            purchase_repository.database_session.commit()
            purchase_repository.database_session.refresh(vehicle)
            return vehicle

        # Legacy path (no purchase recording): delegate to repository as before.
        return self.vehicle_repository.update(vehicle, quantity=vehicle.quantity - quantity)

    def restock(self, vehicle_id: UUID, quantity: int) -> Vehicle:
        vehicle = self._get_existing(vehicle_id)
        return self.vehicle_repository.update(vehicle, quantity=vehicle.quantity + quantity)

    def _get_existing(self, vehicle_id: UUID) -> Vehicle:
        vehicle = self.vehicle_repository.get_by_id(vehicle_id)
        if vehicle is None:
            raise VehicleNotFoundError
        return vehicle

