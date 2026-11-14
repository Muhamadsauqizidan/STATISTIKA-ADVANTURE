from fastapi import APIRouter, HTTPException, Query
from typing import Optional
from app.schemas.evaluation import QuestionListResponse, EvaluationSubmissionRequest, EvaluationResultResponse
from app.services.evaluation_service import EvaluationService

router = APIRouter()


@router.get("/questions", response_model=QuestionListResponse)
def get_evaluation_questions(
    type: str = Query("pretest", description="Tipe evaluasi: pretest, posttest, challenge, practice"),
    level: Optional[int] = Query(None, description="Nomor level opsional")
):
    """
    Mengambil paket soal evaluasi diagnostik, formatif, atau sumatif berdimensi literasi matematis.
    """
    valid_types = ["pretest", "posttest", "challenge", "practice"]
    if type not in valid_types:
        raise HTTPException(status_code=400, detail=f"Tipe evaluasi harus salah satu dari: {valid_types}")

    questions = EvaluationService.get_questions(eval_type=type, level_number=level)
    return QuestionListResponse(
        success=True,
        data=questions,
        message=f"Daftar soal {type} berhasil dimuat ({len(questions)} butir)"
    )


@router.post("/submit", response_model=EvaluationResultResponse)
def submit_evaluation(payload: EvaluationSubmissionRequest):
    """
    Mengirimkan lembar jawaban evaluasi untuk dinilai otomatis secara instan.
    Mengembalikan skor total, rincian per dimensi literasi matematis, dan skor N-Gain.
    """
    if not payload.answers:
        raise HTTPException(status_code=400, detail="Lembar jawaban tidak boleh kosong")

    result = EvaluationService.grade_evaluation(
        student_id=payload.student_id,
        eval_type=payload.evaluation_type,
        answers=[a.dict() for a in payload.answers]
    )

    return EvaluationResultResponse(
        success=True,
        data=result,
        message="Evaluasi berhasil dinilai secara otomatis"
    )
