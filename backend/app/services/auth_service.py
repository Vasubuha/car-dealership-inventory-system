"""Authentication business use cases."""
from app.auth.security import create_access_token, hash_password, verify_password
from app.models.user import User
from app.repositories.user_repository import UserAlreadyExistsError, UserRepository
from app.schemas.auth import Token, UserCreate, UserLogin

class EmailAlreadyRegisteredError(Exception):
    """Raised when an email already belongs to a user."""

class InvalidCredentialsError(Exception):
    """Raised when supplied credentials cannot be authenticated."""

class AuthService:
    def __init__(self, user_repository: UserRepository) -> None:
        self.user_repository = user_repository

    def register_user(self, user_create: UserCreate) -> User:
        if self.user_repository.get_by_email(user_create.email) is not None:
            raise EmailAlreadyRegisteredError
        try:
            return self.user_repository.create_user(
                username=user_create.username,
                email=user_create.email,
                password_hash=hash_password(user_create.password),
            )
        except UserAlreadyExistsError as error:
            raise EmailAlreadyRegisteredError from error

    def login_user(self, user_login: UserLogin) -> Token:
        user = self.user_repository.get_by_email(user_login.email)
        if user is None or not verify_password(user_login.password, user.password_hash):
            raise InvalidCredentialsError
        return Token(access_token=create_access_token(user.id), token_type="bearer")