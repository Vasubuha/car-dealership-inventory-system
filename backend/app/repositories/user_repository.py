"""User database operations."""
from sqlalchemy import select
from sqlalchemy.exc import IntegrityError
from sqlalchemy.orm import Session
from app.models.user import User, UserRole

class UserAlreadyExistsError(Exception):
    """Raised when the database rejects a duplicate user email."""

class UserRepository:
    def __init__(self, database_session: Session) -> None:
        self.database_session = database_session

    def create_user(
        self, *, username: str, email: str, password_hash: str, role: UserRole = UserRole.CUSTOMER
    ) -> User:
        user = User(username=username, email=email, password_hash=password_hash, role=role)
        self.database_session.add(user)
        try:
            self.database_session.commit()
        except IntegrityError as error:
            self.database_session.rollback()
            raise UserAlreadyExistsError from error
        self.database_session.refresh(user)
        return user

    def get_by_email(self, email: str) -> User | None:
        return self.database_session.scalar(select(User).where(User.email == email))

    def get_by_id(self, user_id: int) -> User | None:
        return self.database_session.get(User, user_id)