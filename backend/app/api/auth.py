from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.database.session import get_db
from app.repositories.user_repository import UserRepository
from app.schemas.auth import Token, UserCreate, UserLogin
from app.services.auth_service import AuthService, EmailAlreadyRegisteredError, InvalidCredentialsError

router = APIRouter(prefix="/api/auth", tags=["authentication"])

def get_auth_service(database_session: Session = Depends(get_db)) -> AuthService:
    return AuthService(UserRepository(database_session))

@router.post("/register", status_code=status.HTTP_201_CREATED)
def register_user(user_create: UserCreate, auth_service: AuthService = Depends(get_auth_service)) -> dict[str, str]:
    try:
        auth_service.register_user(user_create)
    except EmailAlreadyRegisteredError as error:
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="Email already registered") from error
    return {"message": "User registered successfully"}

@router.post("/login", response_model=Token)
def login_user(user_login: UserLogin, auth_service: AuthService = Depends(get_auth_service)) -> Token:
    try:
        return auth_service.login_user(user_login)
    except InvalidCredentialsError as error:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid email or password") from error