from typing import List, Optional
from pydantic import BaseModel, Field


class StudentProgressItem(BaseModel):
    level_number: int
    status: str  # LOCKED, IN_PROGRESS, COMPLETED
    stars: int = 0
    completed_at: Optional[str] = None


class ProgressListResponse(BaseModel):
    success: bool = True
    data: List[StudentProgressItem]
    message: str = "Progres belajar berhasil dimuat"


class CompleteLevelRequest(BaseModel):
    student_id: str
    level_number: int = Field(..., ge=1, le=8)
    stars: int = Field(default=3, ge=1, le=3)


class CompleteLevelResponse(BaseModel):
    success: bool = True
    data: dict
    message: str = "Level berhasil diselesaikan"
