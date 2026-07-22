"""Vehicle business use cases."""
from uuid import UUID

from app.models.vehicle import Vehicle
from app.repositories.vehicle_repository import VehicleRepository
from app.schemas.vehicle import VehicleCreate, VehicleSearchQuery, VehicleUpdate


class VehicleNotFoundError(Exception):
    """Raised when a requested vehicle does not exist."""


class VehicleService:
    def __init__(self, vehicle_repository: VehicleRepository) -> None:
        self.vehicle_repository = vehicle_repository

    def create(self, vehicle_create: VehicleCreate) -> Vehicle:
        return self.vehicle_repository.create(**vehicle_create.model_dump())

    def get_all(self) -> list[Vehicle]:
        return self.vehicle_repository.get_all()

    def update(self, vehicle_id: UUID, vehicle_update: VehicleUpdate) -> Vehicle:
        vehicle = self._get_existing(vehicle_id)
        return self.vehicle_repository.update(vehicle, **vehicle_update.model_dump(exclude_unset=True))

    def delete(self, vehicle_id: UUID) -> None:
        self.vehicle_repository.delete(self._get_existing(vehicle_id))

    def search(self, filters: VehicleSearchQuery) -> list[Vehicle]:
        return self.vehicle_repository.search(filters)

    def _get_existing(self, vehicle_id: UUID) -> Vehicle:
        vehicle = self.vehicle_repository.get_by_id(vehicle_id)
        if vehicle is None:
            raise VehicleNotFoundError
        return vehicle
