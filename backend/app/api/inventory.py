"""Vehicle purchase and restock endpoints."""
from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.auth.security import get_current_user, require_admin
from app.database.session import get_db
from app.models.user import User
from app.repositories.purchase_repository import PurchaseRepository
from app.repositories.vehicle_repository import VehicleRepository
from app.schemas.inventory import PurchaseRequest, RestockRequest
from app.schemas.vehicle import VehicleResponse
from app.services.inventory_service import InventoryService, InsufficientStockError, VehicleOutOfStockError
from app.services.vehicle_service import VehicleNotFoundError

router = APIRouter(prefix="/api/v1/vehicles", tags=["inventory"])


def get_inventory_service(database_session: Session = Depends(get_db)) -> InventoryService:
    return InventoryService(VehicleRepository(database_session))


@router.post("/{vehicle_id}/purchase")
def purchase_vehicle(
    vehicle_id: UUID,
    purchase_request: PurchaseRequest,
    current_user: User = Depends(get_current_user),
    inventory_service: InventoryService = Depends(get_inventory_service),
) -> dict[str, str | VehicleResponse]:
    try:
        # Use the same session attached to the inventory service's
        # vehicle repository to ensure atomicity (avoid two separate
        # sessions which can raise on commit/refresh).
        session = inventory_service.vehicle_repository.database_session
        vehicle = inventory_service.purchase(
            vehicle_id,
            purchase_request.quantity,
            user_id=current_user.id,
            purchase_repository=PurchaseRepository(session),
        )
    except VehicleNotFoundError as error:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Vehicle not found") from error
    except VehicleOutOfStockError as error:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Vehicle is out of stock") from error
    except InsufficientStockError as error:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Insufficient stock") from error
    return {"message": "Vehicle purchased successfully", "vehicle": VehicleResponse.model_validate(vehicle)}


@router.post("/{vehicle_id}/restock")
def restock_vehicle(
    vehicle_id: UUID,
    restock_request: RestockRequest,
    _: User = Depends(require_admin),
    inventory_service: InventoryService = Depends(get_inventory_service),
) -> dict[str, str | VehicleResponse]:
    try:
        vehicle = inventory_service.restock(vehicle_id, restock_request.quantity)
    except VehicleNotFoundError as error:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Vehicle not found") from error
    return {"message": "Vehicle restocked successfully", "vehicle": VehicleResponse.model_validate(vehicle)}

