"""Database seed script to populate realistic vehicle data into PostgreSQL using SQLAlchemy."""
from decimal import Decimal
from pathlib import Path
import sys

# Ensure backend root directory is in sys.path when script is executed directly
backend_dir = Path(__file__).resolve().parent.parent
if str(backend_dir) not in sys.path:
    sys.path.insert(0, str(backend_dir))

from app.database.session import SessionLocal
from app.models.user import User  # noqa: F401
from app.models.purchase import Purchase  # noqa: F401
from app.models.vehicle import Vehicle

VEHICLES_DATA = [
    # Toyota
    {
        "make": "Toyota",
        "model": "Camry",
        "category": "Sedan",
        "price": 4800000,
        "quantity": 5,
        "image_url": "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?auto=format&fit=crop&w=1000&q=80",
    },
    {
        "make": "Toyota",
        "model": "Corolla",
        "category": "Sedan",
        "price": 2200000,
        "quantity": 8,
        "image_url": "https://images.unsplash.com/photo-1590362891991-f776e747a588?auto=format&fit=crop&w=1000&q=80",
    },
    {
        "make": "Toyota",
        "model": "Fortuner",
        "category": "SUV",
        "price": 4200000,
        "quantity": 12,
        "image_url": "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1000&q=80",
    },
    {
        "make": "Toyota",
        "model": "Hilux",
        "category": "Pickup Truck",
        "price": 3800000,
        "quantity": 4,
        "image_url": "https://images.unsplash.com/photo-1559416523-140ddc3d238c?auto=format&fit=crop&w=1000&q=80",
    },
    # Honda
    {
        "make": "Honda",
        "model": "Civic",
        "category": "Sedan",
        "price": 2200000,
        "quantity": 7,
        "image_url": "https://images.unsplash.com/photo-1606152421802-db97b9c7a11b?auto=format&fit=crop&w=1000&q=80",
    },
    {
        "make": "Honda",
        "model": "City",
        "category": "Sedan",
        "price": 1600000,
        "quantity": 10,
        "image_url": "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&w=1000&q=80",
    },
    {
        "make": "Honda",
        "model": "CR-V",
        "category": "SUV",
        "price": 3200000,
        "quantity": 6,
        "image_url": "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=1000&q=80",
    },
    # Hyundai
    {
        "make": "Hyundai",
        "model": "Creta",
        "category": "SUV",
        "price": 1800000,
        "quantity": 15,
        "image_url": "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1000&q=80",
    },
    {
        "make": "Hyundai",
        "model": "Venue",
        "category": "SUV",
        "price": 1200000,
        "quantity": 9,
        "image_url": "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1000&q=80",
    },
    {
        "make": "Hyundai",
        "model": "Verna",
        "category": "Sedan",
        "price": 1700000,
        "quantity": 6,
        "image_url": "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=1000&q=80",
    },
    {
        "make": "Hyundai",
        "model": "Tucson",
        "category": "SUV",
        "price": 3000000,
        "quantity": 5,
        "image_url": "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1000&q=80",
    },
    # Kia
    {
        "make": "Kia",
        "model": "Seltos",
        "category": "SUV",
        "price": 1700000,
        "quantity": 11,
        "image_url": "https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&w=1000&q=80",
    },
    {
        "make": "Kia",
        "model": "Sonet",
        "category": "SUV",
        "price": 1100000,
        "quantity": 14,
        "image_url": "https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=1000&q=80",
    },
    {
        "make": "Kia",
        "model": "Carens",
        "category": "Van",
        "price": 1400000,
        "quantity": 8,
        "image_url": "https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?auto=format&fit=crop&w=1000&q=80",
    },
    # Mahindra
    {
        "make": "Mahindra",
        "model": "Scorpio N",
        "category": "SUV",
        "price": 2200000,
        "quantity": 10,
        "image_url": "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=1000&q=80",
    },
    {
        "make": "Mahindra",
        "model": "XUV700",
        "category": "SUV",
        "price": 2600000,
        "quantity": 13,
        "image_url": "https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=1000&q=80",
    },
    {
        "make": "Mahindra",
        "model": "Thar",
        "category": "SUV",
        "price": 1800000,
        "quantity": 7,
        "image_url": "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1000&q=80",
    },
    # Tata
    {
        "make": "Tata",
        "model": "Nexon",
        "category": "SUV",
        "price": 1200000,
        "quantity": 12,
        "image_url": "https://images.unsplash.com/photo-1616422285623-13ff0162193c?auto=format&fit=crop&w=1000&q=80",
    },
    {
        "make": "Tata",
        "model": "Harrier",
        "category": "SUV",
        "price": 2400000,
        "quantity": 6,
        "image_url": "https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=1000&q=80",
    },
    {
        "make": "Tata",
        "model": "Punch",
        "category": "Hatchback",
        "price": 900000,
        "quantity": 11,
        "image_url": "https://images.unsplash.com/photo-1541348263662-e08266f92f2a?auto=format&fit=crop&w=1000&q=80",
    },
    {
        "make": "Tata",
        "model": "Safari",
        "category": "SUV",
        "price": 2800000,
        "quantity": 5,
        "image_url": "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=1000&q=80",
    },
    # BMW
    {
        "make": "BMW",
        "model": "3 Series",
        "category": "Luxury",
        "price": 7400000,
        "quantity": 4,
        "image_url": "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=1000&q=80",
    },
    {
        "make": "BMW",
        "model": "X5",
        "category": "Luxury",
        "price": 9800000,
        "quantity": 3,
        "image_url": "https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=1000&q=80",
    },
    # Mercedes-Benz
    {
        "make": "Mercedes-Benz",
        "model": "C-Class",
        "category": "Luxury",
        "price": 6500000,
        "quantity": 5,
        "image_url": "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=1000&q=80",
    },
    {
        "make": "Mercedes-Benz",
        "model": "GLC",
        "category": "Luxury",
        "price": 7800000,
        "quantity": 4,
        "image_url": "https://images.unsplash.com/photo-1609521263047-f8d205293f24?auto=format&fit=crop&w=1000&q=80",
    },
    # Audi
    {
        "make": "Audi",
        "model": "A4",
        "category": "Luxury",
        "price": 5600000,
        "quantity": 6,
        "image_url": "https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?auto=format&fit=crop&w=1000&q=80",
    },
    {
        "make": "Audi",
        "model": "Q5",
        "category": "Luxury",
        "price": 7200000,
        "quantity": 3,
        "image_url": "https://images.unsplash.com/photo-1541348263662-e08266f92f2a?auto=format&fit=crop&w=1000&q=80",
    },
    # Tesla
    {
        "make": "Tesla",
        "model": "Model 3",
        "category": "Electric",
        "price": 6000000,
        "quantity": 7,
        "image_url": "https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&w=1000&q=80",
    },
    {
        "make": "Tesla",
        "model": "Model Y",
        "category": "Electric",
        "price": 7000000,
        "quantity": 5,
        "image_url": "https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=1000&q=80",
    },
    # Ford
    {
        "make": "Ford",
        "model": "Mustang",
        "category": "Sports",
        "price": 8500000,
        "quantity": 2,
        "image_url": "https://images.unsplash.com/photo-1584345604476-8ec5e12e42dd?auto=format&fit=crop&w=1000&q=80",
    },
    # Jeep
    {
        "make": "Jeep",
        "model": "Wrangler",
        "category": "SUV",
        "price": 7200000,
        "quantity": 4,
        "image_url": "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1000&q=80",
    },
    # Volkswagen
    {
        "make": "Volkswagen",
        "model": "Virtus",
        "category": "Sedan",
        "price": 1800000,
        "quantity": 9,
        "image_url": "https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=1000&q=80",
    },
]


def seed_vehicles() -> None:
    db = SessionLocal()
    inserted = 0
    skipped = 0
    total = len(VEHICLES_DATA)

    try:
        existing_records = db.query(Vehicle.make, Vehicle.model).all()
        existing_keys = {
            (make.strip().lower(), model.strip().lower())
            for make, model in existing_records
        }

        vehicles_to_add = []
        for vehicle_data in VEHICLES_DATA:
            key = (vehicle_data["make"].strip().lower(), vehicle_data["model"].strip().lower())
            if key in existing_keys:
                skipped += 1
            else:
                existing_keys.add(key)
                vehicle_obj = Vehicle(
                    make=vehicle_data["make"],
                    model=vehicle_data["model"],
                    category=vehicle_data["category"],
                    price=Decimal(str(vehicle_data["price"])),
                    quantity=int(vehicle_data["quantity"]),
                    image_url=vehicle_data.get("image_url"),
                )
                vehicles_to_add.append(vehicle_obj)
                inserted += 1

        if vehicles_to_add:
            db.add_all(vehicles_to_add)
            db.commit()

        print("--------------------------------")
        print("Vehicle Seed Complete")
        print(f"Inserted : {inserted}")
        print(f"Skipped : {skipped}")
        print(f"Total : {total}")
        print("--------------------------------")

    except Exception as e:
        db.rollback()
        print(f"Error during database seed: {e}", file=sys.stderr)
        raise
    finally:
        db.close()


if __name__ == "__main__":
    seed_vehicles()
