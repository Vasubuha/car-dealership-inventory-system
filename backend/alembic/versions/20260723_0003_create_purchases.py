"""Create purchases table."""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql
revision = "20260723_0003"
down_revision = "20260722_0002"
branch_labels = None
depends_on = None

def upgrade() -> None:
    op.create_table("purchases", sa.Column("id", postgresql.UUID(as_uuid=True), primary_key=True), sa.Column("user_id", sa.Integer(), sa.ForeignKey("users.id"), nullable=False), sa.Column("vehicle_id", postgresql.UUID(as_uuid=True), sa.ForeignKey("vehicles.id"), nullable=False), sa.Column("quantity", sa.Integer(), nullable=False), sa.Column("purchase_price", sa.Numeric(12, 2), nullable=False), sa.Column("total_price", sa.Numeric(14, 2), nullable=False), sa.Column("created_at", sa.DateTime(timezone=True), server_default=sa.text("now()"), nullable=False))
    op.create_index("ix_purchases_user_id", "purchases", ["user_id"])
    op.create_index("ix_purchases_vehicle_id", "purchases", ["vehicle_id"])

def downgrade() -> None:
    op.drop_index("ix_purchases_vehicle_id", table_name="purchases")
    op.drop_index("ix_purchases_user_id", table_name="purchases")
    op.drop_table("purchases")
