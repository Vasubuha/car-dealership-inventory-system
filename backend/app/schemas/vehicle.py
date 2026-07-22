"""Vehicle request and response schemas."""
from datetime import datetime
from decimal import Decimal
from uuid import UUID

from pydantic import BaseModel, ConfigDict, Field, field_validator


class VehicleFields(BaseModel):
    make: str = Field(min_length=1, max_length=100)
    model: str = Field(min_length=1, max_length=100)
    category: str = Field(min_length=1, max_length=100)
    price: Decimal = Field(gt=0, max_digits=12, decimal_places=2)
    quantity: int = Field(default=1, ge=0)

    @field_validator("make", "model", "category")
    @classmethod
    def reject_blank_text(cls, value: str) -> str:
        normalized_value = value.strip()
        if not normalized_value:
            raise ValueError("Field must not be blank")
        return normalized_value


class VehicleCreate(VehicleFields):
    pass


class VehicleUpdate(BaseModel):
    make: str | None = Field(default=None, min_length=1, max_length=100)
    model: str | None = Field(default=None, min_length=1, max_length=100)
    category: str | None = Field(default=None, min_length=1, max_length=100)
    price: Decimal | None = Field(default=None, gt=0, max_digits=12, decimal_places=2)
    quantity: int | None = Field(default=None, ge=0)

    @field_validator("make", "model", "category")
    @classmethod
    def reject_blank_text(cls, value: str | None) -> str | None:
        if value is None:
            return value
        normalized_value = value.strip()
        if not normalized_value:
            raise ValueError("Field must not be blank")
        return normalized_value


class VehicleSearchQuery(BaseModel):
    make: str | None = None
    model: str | None = None
    category: str | None = None
    min_price: Decimal | None = Field(default=None, gt=0)
    max_price: Decimal | None = Field(default=None, gt=0)


class VehicleResponse(VehicleFields):
    model_config = ConfigDict(from_attributes=True)

    id: UUID
    created_at: datetime
    updated_at: datetime
