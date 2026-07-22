"""Create users table.

Revision ID: 20260721_0001
Revises:
Create Date: 2026-07-21
"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

revision = "20260721_0001"
down_revision = None
branch_labels = None
depends_on = None

user_role = postgresql.ENUM("admin", "customer", name="user_role", create_type=False)

def upgrade() -> None:
    user_role.create(op.get_bind(), checkfirst=False)
    op.create_table(
        "users",
        sa.Column("id", sa.Integer(), primary_key=True),
        sa.Column("username", sa.String(length=100), nullable=False),
        sa.Column("email", sa.String(length=255), nullable=False),
        sa.Column("password_hash", sa.String(length=255), nullable=False),
        sa.Column("role", user_role, nullable=False, server_default="customer"),
        sa.Column(
            "created_at",
            sa.DateTime(timezone=True),
            server_default=sa.text("now()"),
            nullable=False,
        ),
        sa.UniqueConstraint("email", name="uq_users_email"),
    )

def downgrade() -> None:
    op.drop_table("users")
    user_role.drop(op.get_bind(), checkfirst=False)