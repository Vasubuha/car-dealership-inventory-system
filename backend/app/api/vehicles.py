"""Vehicle inventory endpoints."""
from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException, Response, status
from sqlalchemy.orm import Session

from app.auth.security import get_current_user, require_admin
from app.database.session import get_db
from app.models.user import User
from app.repositories.vehicle_repository import VehicleRepository
from app.schemas.vehicle import VehicleCreate, VehicleResponse, VehicleSearchQuery, VehicleUpdate
from app.services.vehicle_service import VehicleNotFoundError, VehicleService

router = APIRouter(prefix="/api/v1/vehicles", tags=["vehicles"])


def get_vehicle_service(database_session: Session = Depends(get_db)) -> VehicleService:
    return VehicleService(VehicleRepository(database_session))


@router.post("", response_model=VehicleResponse, status_code=status.HTTP_201_CREATED)
def create_vehicle(vehicle_create: VehicleCreate, _: User = Depends(get_current_user), vehicle_service: VehicleService = Depends(get_vehicle_service)) -> VehicleResponse:
    return vehicle_service.create(vehicle_create)


@router.get("/search", response_model=list[VehicleResponse])
def search_vehicles(filters: VehicleSearchQuery = Depends(), _: User = Depends(get_current_user), vehicle_service: VehicleService = Depends(get_vehicle_service)) -> list[VehicleResponse]:
    return vehicle_service.search(filters)


@router.get("", response_model=list[VehicleResponse])
def list_vehicles(_: User = Depends(get_current_user), vehicle_service: VehicleService = Depends(get_vehicle_service)) -> list[VehicleResponse]:
    return vehicle_service.get_all()


@router.put("/{vehicle_id}", response_model=VehicleResponse)
def update_vehicle(vehicle_id: UUID, vehicle_update: VehicleUpdate, _: User = Depends(get_current_user), vehicle_service: VehicleService = Depends(get_vehicle_service)) -> VehicleResponse:
    try:
        return vehicle_service.update(vehicle_id, vehicle_update)
    except VehicleNotFoundError as error:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Vehicle not found") from error


@router.delete("/{vehicle_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_vehicle(vehicle_id: UUID, _: User = Depends(require_admin), vehicle_service: VehicleService = Depends(get_vehicle_service)) -> Response:
    try:
        vehicle_service.delete(vehicle_id)
    except VehicleNotFoundError as error:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Vehicle not found") from error
    return Response(status_code=status.HTTP_204_NO_CONTENT)
