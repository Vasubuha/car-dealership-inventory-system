from collections.abc import Generator
import os
from sqlalchemy import create_engine
from sqlalchemy.orm import DeclarativeBase, Session, sessionmaker
from app.database.config import get_settings

class Base(DeclarativeBase):
    pass

raw_url = os.getenv("DATABASE_URL", "sqlite:///./dealership.db")
if raw_url.startswith("postgres://"):
    db_url = raw_url.replace("postgres://", "postgresql+psycopg://", 1)
elif raw_url.startswith("postgresql://") and not raw_url.startswith("postgresql+psycopg://"):
    db_url = raw_url.replace("postgresql://", "postgresql+psycopg://", 1)
else:
    db_url = raw_url

connect_args = {"check_same_thread": False} if "sqlite" in db_url else {}

engine = create_engine(db_url, pool_pre_ping=True, connect_args=connect_args)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

def get_db() -> Generator[Session, None, None]:
    database_session = SessionLocal()
    try:
        yield database_session
    finally:
        database_session.close()