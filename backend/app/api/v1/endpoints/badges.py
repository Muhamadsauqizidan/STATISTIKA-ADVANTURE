from fastapi import APIRouter
from app.schemas.badge import BadgeListResponse
from app.services.progress_service import ProgressService

router = APIRouter()


@router.get("/{student_id}", response_model=BadgeListResponse)
def get_student_badges(student_id: str):
    """
    Mengambil seluruh daftar lencana penghargaan dan status kepemilikannya oleh siswa.
    """
    badges = ProgressService.get_badges(student_id)
    return BadgeListResponse(
        success=True,
        data=badges,
        message="Daftar lencana prestasi berhasil dimuat"
    )
