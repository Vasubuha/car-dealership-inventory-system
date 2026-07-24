"""Dashboard analytics endpoints."""
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.auth.security import require_admin
from app.database.session import get_db
from app.models.user import User
from app.repositories.analytics_repository import AnalyticsRepository
from app.schemas.analytics import DashboardResponse
from app.services.analytics_service import AnalyticsService

router = APIRouter(prefix="/api/v1/dashboard", tags=["dashboard"])


def get_analytics_service(database_session: Session = Depends(get_db)) -> AnalyticsService:
    return AnalyticsService(AnalyticsRepository(database_session))


@router.get("", response_model=DashboardResponse)
@router.get("/", response_model=DashboardResponse)
def get_dashboard_metrics(
    _: User = Depends(require_admin),
    analytics_service: AnalyticsService = Depends(get_analytics_service),
) -> DashboardResponse:
    return analytics_service.get_dashboard_data()
