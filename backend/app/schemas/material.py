from typing import List, Optional, Any, Dict
from pydantic import BaseModel


class MaterialSummary(BaseModel):
    id: int
    level_number: int
    title: str
    subtitle: Optional[str] = ""
    description: Optional[str] = ""
    icon: Optional[str] = "Compass"
    xp_reward: int = 100


class MaterialDetail(BaseModel):
    id: int
    level_number: int
    title: str
    subtitle: Optional[str] = ""
    description: Optional[str] = ""
    icon: Optional[str] = "Compass"
    learning_objectives: List[str] = []
    xp_reward: int = 100
    slides: List[Dict[str, Any]] = []


class MaterialListResponse(BaseModel):
    success: bool = True
    data: List[MaterialSummary]
    message: str = "Daftar materi berhasil dimuat"


class MaterialDetailResponse(BaseModel):
    success: bool = True
    data: Optional[MaterialDetail] = None
    message: str = "Detail materi berhasil dimuat"
