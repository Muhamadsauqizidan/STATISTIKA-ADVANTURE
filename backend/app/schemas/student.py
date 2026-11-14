from typing import Optional, List
from pydantic import BaseModel, Field


class StudentLoginRequest(BaseModel):
    student_code: str = Field(..., example="SA8A01", description="Kode siswa unik")


class StudentProfile(BaseModel):
    id: str
    student_code: str
    name: str
    class_name: str
    school_name: Optional[str] = "SMP Negeri 1 Matematika"
    total_xp: int = 0
    current_level: int = 1
    avatar_seed: Optional[str] = "adventurer"
    completed_levels: List[int] = Field(default_factory=list)


class LoginResponseData(BaseModel):
    access_token: str
    token_type: str = "bearer"
    student: StudentProfile


class LoginResponse(BaseModel):
    success: bool = True
    data: Optional[LoginResponseData] = None
    message: str = "Login berhasil"


class GenericResponse(BaseModel):
    success: bool = True
    data: Optional[dict] = None
    message: str = "Operasi berhasil"
