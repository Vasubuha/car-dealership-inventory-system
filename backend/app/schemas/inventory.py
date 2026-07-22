"""Inventory request schemas."""
from pydantic import BaseModel, Field


class InventoryQuantity(BaseModel):
    quantity: int = Field(gt=0, strict=True, description="A whole number greater than zero")


class PurchaseRequest(InventoryQuantity):
    pass


class RestockRequest(InventoryQuantity):
    pass
