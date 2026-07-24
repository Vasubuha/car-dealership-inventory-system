"""Script to create or promote an admin user in PostgreSQL with a properly hashed bcrypt password."""
import argparse
from pathlib import Path
import sys

# Ensure backend root directory is in sys.path when script is executed directly
backend_dir = Path(__file__).resolve().parent.parent
if str(backend_dir) not in sys.path:
    sys.path.insert(0, str(backend_dir))

from app.database.session import SessionLocal
from app.models.user import User, UserRole
from app.auth.security import hash_password


def create_or_update_admin(email: str, password: str, username: str = "Admin") -> None:
    db = SessionLocal()
    try:
        user = db.query(User).filter(User.email == email.lower().strip()).first()
        if user:
            print(f"User with email '{email}' already exists. Updating to admin role and updating password...")
            user.role = UserRole.ADMIN
            user.password_hash = hash_password(password)
            if username:
                user.username = username
        else:
            print(f"Creating new admin user '{email}'...")
            user = User(
                username=username,
                email=email.lower().strip(),
                password_hash=hash_password(password),
                role=UserRole.ADMIN,
            )
            db.add(user)

        db.commit()
        print("-----------------------------------------")
        print("✅ Admin user successfully created/updated!")
        print(f"   Email:    {email}")
        print(f"   Role:     {user.role.value}")
        print("-----------------------------------------")

    except Exception as e:
        db.rollback()
        print(f"❌ Error setting up admin user: {e}", file=sys.stderr)
        sys.exit(1)
    finally:
        db.close()


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Create or promote an admin user.")
    parser.add_argument("--email", default="admin@dealership.com", help="Admin email address")
    parser.add_argument("--password", default="admin123", help="Admin password")
    parser.add_argument("--username", default="Admin User", help="Admin username")

    args = parser.parse_args()
    create_or_update_admin(email=args.email, password=args.password, username=args.username)
