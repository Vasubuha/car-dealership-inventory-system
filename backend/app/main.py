from fastapi import FastAPI
from app.api.auth import router as auth_router
from app.api.vehicles import router as vehicle_router
from app.api.inventory import router as inventory_router
from app.api.purchases import router as purchases_router
from fastapi.middleware.cors import CORSMiddleware

import os

app = FastAPI(title="Car Dealership Inventory System")

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


@app.get("/")
@app.head("/")
def health_check():
    return {"status": "ok", "message": "Car Dealership Inventory System API is live"}
