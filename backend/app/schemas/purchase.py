"""Purchase API schemas."""
from datetime import datetime
from decimal import Decimal
from uuid import UUID
from pydantic import BaseModel, ConfigDict, Field

class PurchaseCreate(BaseModel):
    quantity: int = Field(gt=0)

class PurchaseResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    id: UUID
    vehicle_id: UUID
    quantity: int
    purchase_price: Decimal
    total_price: Decimal
    created_at: datetime

class PurchaseHistoryResponse(BaseModel):
    purchase_id: UUID
    vehicle_id: UUID
    make: str
    model: str
    category: str
    quantity: int
    purchase_price: Decimal
    total_price: Decimal
    purchase_date: datetime

class PaginationMeta(BaseModel):
    page: int
    page_size: int
    total: int
    total_pages: int

class PaginatedPurchaseResponse(BaseModel):
    items: list[PurchaseHistoryResponse]
    meta: PaginationMeta

class RevenueSummaryResponse(BaseModel):
    total_revenue: float
    total_purchases: int
    total_units_sold: int

