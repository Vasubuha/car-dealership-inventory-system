from collections.abc import Generator
import os
import logging
from sqlalchemy import create_engine
from sqlalchemy.orm import DeclarativeBase, Session, sessionmaker

class Base(DeclarativeBase):
    pass

raw_url = os.getenv("DATABASE_URL", "").strip()

# Strip accidental variable name/tab prefixes (e.g. "DATABASE_URL postgresql://...")
if "postgres" in raw_url:
    idx = raw_url.find("postgres")
    raw_url = raw_url[idx:]

# On cloud servers like Render, localhost/127.0.0.1 is invalid unless local PG is running. Fallback to SQLite.
if not raw_url or "localhost" in raw_url or "127.0.0.1" in raw_url:
    db_url = "sqlite:///./dealership.db"
elif raw_url.startswith("postgres://"):
    db_url = raw_url.replace("postgres://", "postgresql+psycopg://", 1)
elif raw_url.startswith("postgresql://") and not raw_url.startswith("postgresql+psycopg://"):
    db_url = raw_url.replace("postgresql://", "postgresql+psycopg://", 1)
else:
    db_url = raw_url

connect_args = {"check_same_thread": False} if "sqlite" in db_url else {}

def init_db() -> None:
    from app.models.user import User
    from app.models.vehicle import Vehicle
    from app.models.purchase import Purchase
    Base.metadata.create_all(bind=engine)

try:
    engine = create_engine(db_url, pool_pre_ping=True, connect_args=connect_args)
    init_db()
except Exception as err:
    logging.warning(f"Database connection failed for {db_url}: {err}. Falling back to SQLite.")
    db_url = "sqlite:///./dealership.db"
    engine = create_engine(db_url, pool_pre_ping=True, connect_args={"check_same_thread": False})
    init_db()

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

_db_initialized = False

def get_db() -> Generator[Session, None, None]:
    global _db_initialized
    if not _db_initialized:
        try:
            init_db()
            _db_initialized = True
        except Exception as err:
            logging.warning(f"Failed to ensure tables in get_db: {err}")

    database_session = SessionLocal()
    try:
        yield database_session
    finally:
        database_session.close()