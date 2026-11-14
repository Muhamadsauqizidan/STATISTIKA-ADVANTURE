
from typing import Optional, Dict, Any
from app.core.database import db
from app.core.security import create_access_token


class AuthService:

    @staticmethod
    def login_with_student_code(code: str) -> Optional[Dict[str, Any]]:
        clean_code = code.strip().upper()

        # Cari siswa berdasarkan kode di database
        student = db.get_student_by_code(clean_code)

        if not student:
            return None

        # Ambil progres belajar siswa
        progress = db.get_student_progress(student["id"])

        completed = [
            p["level_number"]
            for p in progress
            if p.get("status") == "COMPLETED"
        ]

        student["completed_levels"] = completed

        # Buat access token
        token = create_access_token(
            subject=student["id"]
        )

        return {
            "access_token": token,
            "token_type": "bearer",
            "student": student
        }

    @staticmethod
    def get_current_student(
        student_id: str
    ) -> Optional[Dict[str, Any]]:

        student = db.get_student_by_id(student_id)

        if not student:
            return None

        progress = db.get_student_progress(student["id"])

        completed = [
            p["level_number"]
            for p in progress
            if p.get("status") == "COMPLETED"
        ]

        student["completed_levels"] = completed

        return student
