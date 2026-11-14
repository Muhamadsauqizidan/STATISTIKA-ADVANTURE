from typing import List, Optional
from pydantic import BaseModel


class BadgeItem(BaseModel):
    id: str
    badge_code: str
    name: str
    description: str
    icon: str
    xp_required: int = 0
    unlocked: bool = False


class BadgeListResponse(BaseModel):
    success: bool = True
    data: List[BadgeItem]
    message: str = "Daftar lencana berhasil dimuat"
