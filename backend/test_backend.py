import sys
import os

# Tambahkan backend ke path
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__))))

from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_endpoints():
    print("=== Testing FastAPI Endpoints ===")
    
    # 1. Root Health Check
    r_root = client.get("/")
    print("1. Root Health Check:", r_root.status_code, r_root.json().get("status"))
    assert r_root.status_code == 200
    
    # 2. Login dengan kode siswa demo SA8A01
    r_login = client.post("/api/v1/auth/login-code", json={"student_code": "SA8A01"})
    print("2. Login Code (SA8A01):", r_login.status_code, r_login.json().get("message"))
    assert r_login.status_code == 200
    login_data = r_login.json()["data"]
    token = login_data["access_token"]
    student = login_data["student"]
    student_id = student["id"]
    print("   Student Name:", student["name"], "Class:", student["class_name"])
    
    # 3. Get Auth /me
    r_me = client.get("/api/v1/auth/me", headers={"Authorization": f"Bearer {token}"})
    print("3. Auth Me:", r_me.status_code, r_me.json()["data"]["name"])
    assert r_me.status_code == 200
    
    # 4. Get Materials List
    r_mat = client.get("/api/v1/materials")
    print("4. Materials List Count:", len(r_mat.json()["data"]))
    assert r_mat.status_code == 200
    assert len(r_mat.json()["data"]) == 8
    
    # 5. Get Material Detail (Level 1)
    r_mat1 = client.get("/api/v1/materials/1")
    print("5. Material Detail L1:", r_mat1.status_code, r_mat1.json()["data"]["title"])
    assert r_mat1.status_code == 200
    assert len(r_mat1.json()["data"]["slides"]) >= 4
    
    # 6. Get Pretest Questions
    r_q = client.get("/api/v1/evaluations/questions?type=pretest")
    questions = r_q.json()["data"]
    print("6. Questions Count:", len(questions))
    assert r_q.status_code == 200
    assert len(questions) >= 5
    
    # 7. Submit Evaluation
    answers_payload = [
        {"question_id": q["id"], "selected_option": "C", "duration_seconds": 15}
        for q in questions[:5]
    ]
    r_eval = client.post("/api/v1/evaluations/submit", json={
        "student_id": student_id,
        "evaluation_type": "pretest",
        "answers": answers_payload
    })
    print("7. Submit Evaluation:", r_eval.status_code, "Score:", r_eval.json()["data"]["total_score"])
    assert r_eval.status_code == 200
    
    # 8. Complete Level Progress
    r_prog = client.post("/api/v1/progress/complete-level", json={
        "student_id": student_id,
        "level_number": 2,
        "stars": 3
    })
    print("8. Complete Level 2:", r_prog.status_code, r_prog.json().get("message"))
    assert r_prog.status_code == 200
    
    # 9. Get Badges
    r_badges = client.get(f"/api/v1/badges/{student_id}")
    print("9. Badges Count:", len(r_badges.json()["data"]))
    assert r_badges.status_code == 200
    
    print("\nALL BACKEND API TESTS PASSED SUCCESSFULLY! (100% OK)")

if __name__ == "__main__":
    test_endpoints()
