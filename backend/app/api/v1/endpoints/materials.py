from fastapi import APIRouter, HTTPException
from app.schemas.material import MaterialListResponse, MaterialDetailResponse
from app.services.material_service import MaterialService

router = APIRouter()


@router.get("", response_model=MaterialListResponse)
def list_materials():
    """
    Mengambil daftar ringkas 8 level silabus petualangan statistika.
    """
    materials = MaterialService.list_materials()
    return MaterialListResponse(
        success=True,
        data=materials,
        message="Daftar materi 8 level berhasil dimuat"
    )


@router.get("/{level_number}", response_model=MaterialDetailResponse)
def get_material_detail(level_number: int):
    """
    Mengambil modul materi level tertentu dengan segmentasi slide (Cognitive Load Theory).
    """
    if level_number < 1 or level_number > 8:
        raise HTTPException(status_code=400, detail="Nomor level harus antara 1 sampai 8")

    mat = MaterialService.get_material_detail(level_number)
    if not mat:
        raise HTTPException(status_code=404, detail=f"Materi untuk level {level_number} tidak ditemukan")

    return MaterialDetailResponse(
        success=True,
        data=mat,
        message=f"Modul Level {level_number}: {mat['title']} berhasil dimuat"
    )
