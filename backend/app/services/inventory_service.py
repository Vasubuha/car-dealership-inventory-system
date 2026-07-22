"""Inventory business use cases."""
from uuid import UUID

from app.models.vehicle import Vehicle
from app.repositories.vehicle_repository import VehicleRepository
from app.services.vehicle_service import VehicleNotFoundError


class VehicleOutOfStockError(Exception):
    """Raised when a vehicle has no inventory available."""


class InsufficientStockError(Exception):
    """Raised when a requested purchase exceeds available inventory."""


class InventoryService:
    def __init__(self, vehicle_repository: VehicleRepository) -> None:
        self.vehicle_repository = vehicle_repository

    def purchase(self, vehicle_id: UUID, quantity: int) -> Vehicle:
        vehicle = self._get_existing(vehicle_id)
        if vehicle.quantity == 0:
            raise VehicleOutOfStockError
        if quantity > vehicle.quantity:
            raise InsufficientStockError
        return self.vehicle_repository.update(vehicle, quantity=vehicle.quantity - quantity)

    def restock(self, vehicle_id: UUID, quantity: int) -> Vehicle:
        vehicle = self._get_existing(vehicle_id)
        return self.vehicle_repository.update(vehicle, quantity=vehicle.quantity + quantity)

    def _get_existing(self, vehicle_id: UUID) -> Vehicle:
        vehicle = self.vehicle_repository.get_by_id(vehicle_id)
        if vehicle is None:
            raise VehicleNotFoundError
        return vehicle
