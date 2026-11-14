from typing import List, Dict, Any
from app.core.database import db


class ProgressService:
    @staticmethod
    def get_progress(student_id: str) -> List[Dict[str, Any]]:
        return db.get_student_progress(student_id)

    @staticmethod
    def complete_level(student_id: str, level_number: int, stars: int = 3) -> Dict[str, Any]:
        # 1. Update status progres level
        result = db.complete_level_progress(student_id, level_number, stars)

        # 2. Ambil XP reward level dari materi
        material = db.get_material_by_level(level_number)
        xp_reward = material.get("xp_reward", 100) if material else 100

        # 3. Update total XP siswa dan naikkan level jika perlu
        next_level = min(8, level_number + 1)
        student = db.update_student_xp_and_level(student_id, xp_add=xp_reward, new_level=next_level)

        # 4. Periksa apakah ada badge baru yang terbuka
        if level_number >= 1 and db.is_supabase_active():
            # unlock badge 1 jika belum
            try:
                db.supabase_client.table("student_badges").upsert({
                    "student_id": student_id,
                    "badge_id": "b1000000-0000-0000-0000-000000000001"
                }, on_conflict="student_id,badge_id").execute()
            except Exception:
                pass

        return {
            "progress": result,
            "student": student,
            "xp_earned": xp_reward,
            "unlocked_next_level": next_level
        }

    @staticmethod
    def get_badges(student_id: str) -> List[Dict[str, Any]]:
        return db.get_badges_for_student(student_id)
