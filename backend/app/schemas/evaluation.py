from typing import List, Optional, Any, Dict
from pydantic import BaseModel, Field


class QuestionOption(BaseModel):
    id: str
    text: str


class QuestionItem(BaseModel):
    id: str
    material_id: Optional[int] = None
    evaluation_type: str
    question_text: str
    context_data: Optional[Dict[str, Any]] = None
    options: List[QuestionOption]
    mathematical_literacy_dimension: str
    explanation: Optional[str] = None
    points: int = 10


class QuestionListResponse(BaseModel):
    success: bool = True
    data: List[QuestionItem]
    message: str = "Daftar soal berhasil dimuat"


class AnswerSubmission(BaseModel):
    question_id: str
    selected_option: str
    duration_seconds: Optional[int] = 0


class EvaluationSubmissionRequest(BaseModel):
    student_id: str
    evaluation_type: str = Field(..., example="pretest")  # pretest, posttest, challenge
    answers: List[AnswerSubmission]


class DimensionBreakdown(BaseModel):
    formulate_score: float = 0.0
    employ_score: float = 0.0
    interpret_score: float = 0.0


class EvaluationResultData(BaseModel):
    total_score: float
    correct_count: int
    total_questions: int
    xp_earned: int
    dimension_breakdown: DimensionBreakdown
    n_gain_score: Optional[float] = None
    n_gain_category: Optional[str] = None
    feedback_summary: str


class EvaluationResultResponse(BaseModel):
    success: bool = True
    data: EvaluationResultData
    message: str = "Evaluasi berhasil dinilai"
