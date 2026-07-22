"""Authentication request and response schemas."""
from pydantic import BaseModel, ConfigDict, EmailStr, Field, field_validator
from app.models.user import UserRole

class UserCreate(BaseModel):
    username: str = Field(max_length=100)
    email: EmailStr
    password: str = Field(min_length=8, max_length=128)

    @field_validator("username")
    @classmethod
    def normalize_username(cls, value: str) -> str:
        normalized_value = value.strip()
        if not normalized_value:
            raise ValueError("Username must not be blank")
        return normalized_value

    @field_validator("email")
    @classmethod
    def normalize_email(cls, value: EmailStr) -> str:
        return str(value).lower()

class UserLogin(BaseModel):
    email: EmailStr
    password: str = Field(min_length=1, max_length=128)

    @field_validator("email")
    @classmethod
    def normalize_email(cls, value: EmailStr) -> str:
        return str(value).lower()

class UserResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    id: int
    username: str
    email: EmailStr
    role: UserRole

class Token(BaseModel):
    access_token: str
    token_type: str
    user: UserResponse

class TokenData(BaseModel):
    user_id: int = Field(gt=0)