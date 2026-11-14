from fastapi import APIRouter, HTTPException, Depends, Header
from typing import Optional
from app.schemas.student import StudentLoginRequest, LoginResponse, StudentProfile
from app.services.auth_service import AuthService
from app.core.security import decode_access_token

router = APIRouter()


@router.post("/login-code", response_model=LoginResponse)
def login_with_student_code(payload: StudentLoginRequest):
    """
    Login menggunakan kode siswa unik (contoh: SA8A01).
    Tidak memerlukan email dan kata sandi yang membebani siswa SMP.
    """
    auth_data = AuthService.login_with_student_code(payload.student_code)
    if not auth_data:
        raise HTTPException(
            status_code=404,
            detail=f"Kode siswa '{payload.student_code}' tidak ditemukan. Silakan periksa kembali atau gunakan akun demo: SA8A01, SA8A02, SA8B01"
        )

    return LoginResponse(
        success=True,
        data=auth_data,
        message=f"Selamat datang, {auth_data['student']['name']}!"
    )


@router.get("/me")
def get_current_user(authorization: Optional[str] = Header(None)):
    """
    Mengambil data sesi profil siswa yang sedang login.
    """
    if not authorization or not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Header Authorization Bearer token diperlukan")

    token = authorization.split(" ", 1)[1].strip()
    payload = decode_access_token(token)
    if not payload or not payload.get("sub"):
        raise HTTPException(status_code=401, detail="Token sesi tidak valid atau sudah kedaluwarsa")

    student_id = payload["sub"]
    student = AuthService.get_current_student(student_id)
    if not student:
        raise HTTPException(status_code=404, detail="Data siswa tidak ditemukan")

    return {
        "success": True,
        "data": student,
        "message": "Sesi aktif ditemukan"
    }
