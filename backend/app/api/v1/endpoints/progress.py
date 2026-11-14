from fastapi import APIRouter, HTTPException
from app.schemas.progress import ProgressListResponse, CompleteLevelRequest, CompleteLevelResponse
from app.services.progress_service import ProgressService

router = APIRouter()


@router.get("/{student_id}", response_model=ProgressListResponse)
def get_student_progress(student_id: str):
    """
    Mengambil riwayat status perjalanan level petualangan siswa (LOCKED, IN_PROGRESS, COMPLETED).
    """
    progress = ProgressService.get_progress(student_id)
    return ProgressListResponse(
        success=True,
        data=progress,
        message="Riwayat progres belajar berhasil dimuat"
    )


@router.post("/complete-level", response_model=CompleteLevelResponse)
def complete_level(payload: CompleteLevelRequest):
    """
    Menandai suatu level belajar telah diselesaikan oleh siswa, memberikan bintang,
    membuka level berikutnya, dan menambahkan poin reward XP.
    """
    result = ProgressService.complete_level(
        student_id=payload.student_id,
        level_number=payload.level_number,
        stars=payload.stars
    )

    return CompleteLevelResponse(
        success=True,
        data=result,
        message=f"Level {payload.level_number} berhasil diselesaikan! (+{result['xp_earned']} XP)"
    )
