"""Vehicle database operations."""
from decimal import Decimal
from uuid import UUID

from sqlalchemy import Select, select
from sqlalchemy.orm import Session

from app.models.vehicle import Vehicle
from app.schemas.vehicle import VehicleSearchQuery


class VehicleRepository:
    def __init__(self, database_session: Session) -> None:
        self.database_session = database_session

    def create(self, **values: object) -> Vehicle:
        vehicle = Vehicle(**values)
        self.database_session.add(vehicle)
        self.database_session.commit()
        self.database_session.refresh(vehicle)
        return vehicle

    def get_all(self) -> list[Vehicle]:
        return list(self.database_session.scalars(select(Vehicle).order_by(Vehicle.created_at)))

    def get_by_id(self, vehicle_id: UUID) -> Vehicle | None:
        return self.database_session.get(Vehicle, vehicle_id)

    def update(self, vehicle: Vehicle, **values: object) -> Vehicle:
        for field_name, value in values.items():
            setattr(vehicle, field_name, value)
        self.database_session.commit()
        self.database_session.refresh(vehicle)
        return vehicle

    def delete(self, vehicle: Vehicle) -> None:
        self.database_session.delete(vehicle)
        self.database_session.commit()

    def search(self, filters: VehicleSearchQuery) -> list[Vehicle]:
        statement: Select[tuple[Vehicle]] = select(Vehicle)
        if filters.make is not None:
            statement = statement.where(Vehicle.make.ilike(f"%{filters.make}%"))
        if filters.model is not None:
            statement = statement.where(Vehicle.model.ilike(f"%{filters.model}%"))
        if filters.category is not None:
            statement = statement.where(Vehicle.category.ilike(f"%{filters.category}%"))
        if filters.min_price is not None:
            statement = statement.where(Vehicle.price >= filters.min_price)
        if filters.max_price is not None:
            statement = statement.where(Vehicle.price <= filters.max_price)
        return list(self.database_session.scalars(statement.order_by(Vehicle.created_at)))
