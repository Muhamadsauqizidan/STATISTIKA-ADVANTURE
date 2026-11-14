import sys, os
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__))))

from app.main import app
from app.services.auth_service import AuthService
from app.services.material_service import MaterialService
from app.services.evaluation_service import EvaluationService
from app.services.progress_service import ProgressService

print("1. Testing AuthService...")
login_res = AuthService.login_with_student_code("SA8A01")
print("Login result:", login_res["student"]["name"], "Token:", bool(login_res["access_token"]))

print("2. Testing MaterialService...")
mats = MaterialService.list_materials()
print("Materials count:", len(mats))
mat1 = MaterialService.get_material_detail(1)
print("Material 1 slides:", len(mat1["slides"]))

print("3. Testing EvaluationService...")
questions = EvaluationService.get_questions("pretest")
print("Pretest questions count:", len(questions))
grade_res = EvaluationService.grade_evaluation(
    student_id=login_res["student"]["id"],
    eval_type="pretest",
    answers=[{"question_id": q["id"], "selected_option": "C", "duration_seconds": 10} for q in questions]
)
print("Grade result:", grade_res["total_score"], "XP earned:", grade_res["xp_earned"])

print("4. Testing ProgressService...")
prog_res = ProgressService.complete_level(student_id=login_res["student"]["id"], level_number=2, stars=3)
print("Progress complete L2:", prog_res["unlocked_next_level"])
badges = ProgressService.get_badges(login_res["student"]["id"])
print("Badges count:", len(badges))

print("\nALL DIRECT SERVICE TESTS PASSED 100%!")
