from typing import List, Optional, Dict, Any
from app.core.database import db


class MaterialService:
    @staticmethod
    def list_materials() -> List[Dict[str, Any]]:
        return db.get_all_materials()

    @staticmethod
    def get_material_detail(level_number: int) -> Optional[Dict[str, Any]]:
        return db.get_material_by_level(level_number)
