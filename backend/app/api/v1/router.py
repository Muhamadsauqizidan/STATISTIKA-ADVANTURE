from fastapi import APIRouter
from app.api.v1.endpoints import auth, students, materials, evaluations, progress, badges

api_router = APIRouter()

api_router.include_router(auth.router, prefix="/auth", tags=["Autentikasi"])
api_router.include_router(students.router, prefix="/students", tags=["Siswa"])
api_router.include_router(materials.router, prefix="/materials", tags=["Materi"])
api_router.include_router(evaluations.router, prefix="/evaluations", tags=["Evaluasi & Soal"])
api_router.include_router(progress.router, prefix="/progress", tags=["Progres Belajar"])
api_router.include_router(badges.router, prefix="/badges", tags=["Lencana"])
