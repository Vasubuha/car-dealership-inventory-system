"""Purchase history endpoint — accessible by any authenticated user."""
from math import ceil

from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session

from app.auth.security import get_current_user
from app.database.session import get_db
from app.models.user import User
from app.repositories.purchase_repository import PurchaseRepository
from app.repositories.vehicle_repository import VehicleRepository
from app.schemas.purchase import PaginatedPurchaseResponse, PaginationMeta, PurchaseHistoryResponse
from app.services.purchase_service import PurchaseService

router = APIRouter(prefix="/api/v1/purchases", tags=["purchases"])


def get_purchase_service(database_session: Session = Depends(get_db)) -> PurchaseService:
    return PurchaseService(
        database_session,
        VehicleRepository(database_session),
        PurchaseRepository(database_session),
    )


@router.get("/my-history", response_model=PaginatedPurchaseResponse)
def get_my_purchase_history(
    page: int = Query(default=1, ge=1),
    page_size: int = Query(default=10, ge=1, le=100),
    make: str | None = None,
    model: str | None = None,
    current_user: User = Depends(get_current_user),
    purchase_service: PurchaseService = Depends(get_purchase_service),
) -> PaginatedPurchaseResponse:
    purchases, total = purchase_service.get_history(
        current_user, page=page, page_size=page_size, make=make, model=model
    )
    return PaginatedPurchaseResponse(
        items=[
            PurchaseHistoryResponse(
                purchase_id=p.id,
                vehicle_id=p.vehicle_id,
                make=p.vehicle.make,
                model=p.vehicle.model,
                category=p.vehicle.category,
                quantity=p.quantity,
                purchase_price=p.purchase_price,
                total_price=p.total_price,
                purchase_date=p.created_at,
            )
            for p in purchases
        ],
        meta=PaginationMeta(
            page=page,
            page_size=page_size,
            total=total,
            total_pages=ceil(total / page_size) if total else 0,
        ),
    )
