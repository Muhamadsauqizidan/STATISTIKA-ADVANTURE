from fastapi import APIRouter, HTTPException
from app.services.auth_service import AuthService
from app.services.progress_service import ProgressService

router = APIRouter()


@router.get("/{student_id}/profile")
def get_student_profile(student_id: str):
    student = AuthService.get_current_student(student_id)
    if not student:
        raise HTTPException(status_code=404, detail="Siswa tidak ditemukan")
    return {
        "success": True,
        "data": student,
        "message": "Profil siswa berhasil dimuat"
    }


@router.get("/{student_id}/stats")
def get_student_stats(student_id: str):
    student = AuthService.get_current_student(student_id)
    if not student:
        raise HTTPException(status_code=404, detail="Siswa tidak ditemukan")

    progress = ProgressService.get_progress(student_id)
    badges = ProgressService.get_badges(student_id)

    completed_count = len([p for p in progress if p.get("status") == "COMPLETED"])
    earned_badges_count = len([b for b in badges if b.get("unlocked")])

    return {
        "success": True,
        "data": {
            "student_id": student["id"],
            "name": student["name"],
            "class_name": student["class_name"],
            "total_xp": student.get("total_xp", 0),
            "current_level": student.get("current_level", 1),
            "completed_levels_count": completed_count,
            "progress_percentage": round((completed_count / 8) * 100),
            "earned_badges_count": earned_badges_count
        },
        "message": "Statistik siswa berhasil dimuat"
    }
