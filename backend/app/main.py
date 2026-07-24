import logging
from contextlib import asynccontextmanager
from decimal import Decimal

from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse
from app.api.auth import router as auth_router
from app.api.vehicles import router as vehicle_router
from app.api.inventory import router as inventory_router
from app.api.purchases import router as purchases_router
from app.api.dashboard import router as dashboard_router
from fastapi.middleware.cors import CORSMiddleware

import os


@asynccontextmanager
async def lifespan(app: FastAPI):
    from app.database.session import Base, engine, SessionLocal
    from app.models.user import User
    from app.models.vehicle import Vehicle
    from app.models.purchase import Purchase

    # Create all tables on target database (PostgreSQL / SQLite)
    Base.metadata.create_all(bind=engine)

    # Seed sample inventory if database has 0 vehicles
    db = SessionLocal()
    try:
        if db.query(Vehicle).count() == 0:
            sample_vehicles = [
                Vehicle(make="BMW", model="M4 Competition Coupé", category="Sports", price=Decimal("15300000.00"), quantity=5, image_url="https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=800&q=80"),
                Vehicle(make="Mercedes-Benz", model="E-Class LWB E350d", category="Luxury", price=Decimal("8850000.00"), quantity=4, image_url="https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=800&q=80"),
                Vehicle(make="Porsche", model="911 Carrera GTS", category="Sports", price=Decimal("21500000.00"), quantity=2, image_url="https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80"),
                Vehicle(make="Tata", model="Harrier Fearless+ Dark", category="SUV", price=Decimal("2640000.00"), quantity=8, image_url="https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=800&q=80"),
                Vehicle(make="Mahindra", model="XUV700 AX7 Luxury AWD", category="SUV", price=Decimal("2580000.00"), quantity=6, image_url="https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=800&q=80"),
                Vehicle(make="Hyundai", model="Ioniq 5 EV AWD", category="Electric", price=Decimal("4620000.00"), quantity=3, image_url="https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&w=800&q=80"),
            ]
            db.add_all(sample_vehicles)
            db.commit()
    except Exception as e:
        logging.warning(f"Error seeding initial vehicles: {e}")
    finally:
        db.close()
    yield


app = FastAPI(title="Car Dealership Inventory System", lifespan=lifespan)

allowed_origins = [
    "http://localhost:5173",
    "http://localhost:5174",
    "http://localhost:5175",
    "http://localhost:5176",
    "http://127.0.0.1:5173",
    "https://car-dealership-inventory-system-sand.vercel.app",
]
env_origins = os.getenv("ALLOWED_ORIGINS")
if env_origins:
    allowed_origins.extend([o.strip() for o in env_origins.split(",") if o.strip()])

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_origin_regex=r"https://.*\.vercel\.app",
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router)
app.include_router(auth_router, prefix="/auth")
app.include_router(vehicle_router)
app.include_router(inventory_router)
app.include_router(purchases_router)
app.include_router(dashboard_router)


@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    logging.error(f"Global unhandled exception on {request.url}: {exc}", exc_info=True)
    return JSONResponse(
        status_code=500,
        content={"detail": "An internal server error occurred."},
    )


@app.get("/")
@app.head("/")
def health_check():
    return {"status": "ok", "message": "Car Dealership Inventory System API is live"}
