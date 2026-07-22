from fastapi import FastAPI
from app.api.auth import router as auth_router
from app.api.vehicles import router as vehicle_router
from app.api.inventory import router as inventory_router
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="Car Dealership Inventory System")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router)
app.include_router(vehicle_router)
app.include_router(inventory_router)
