import sys, os, asyncio
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__))))

import httpx
from app.main import app

async def run_api_tests():
    print("=== Testing FastAPI Endpoints via ASGI AsyncClient ===")
    
    # Gunakan ASGITransport httpx modern
    transport = httpx.ASGITransport(app=app)
    async with httpx.AsyncClient(transport=transport, base_url="http://testserver") as client:
        # 1. Health check
        r_root = await client.get("/")
        print("1. Root Health Check:", r_root.status_code, r_root.json().get("status"))
        assert r_root.status_code == 200
        
        # 2. Login kode siswa
        r_login = await client.post("/api/v1/auth/login-code", json={"student_code": "SA8A01"})
        print("2. Login (SA8A01):", r_login.status_code, r_login.json().get("message"))
        assert r_login.status_code == 200
        data = r_login.json()["data"]
        token = data["access_token"]
        student_id = data["student"]["id"]
        
        # 3. Auth Me
        r_me = await client.get("/api/v1/auth/me", headers={"Authorization": f"Bearer {token}"})
        print("3. Auth Me:", r_me.status_code, r_me.json()["data"]["name"])
        assert r_me.status_code == 200
        
        # 4. Materials
        r_mat = await client.get("/api/v1/materials")
        print("4. Materials Count:", len(r_mat.json()["data"]))
        assert r_mat.status_code == 200
        assert len(r_mat.json()["data"]) == 8
        
        # 5. Material Detail L1
        r_mat1 = await client.get("/api/v1/materials/1")
        print("5. Material Detail L1:", r_mat1.status_code, r_mat1.json()["data"]["title"])
        assert r_mat1.status_code == 200
        
        # 6. Questions
        r_q = await client.get("/api/v1/evaluations/questions?type=pretest")
        questions = r_q.json()["data"]
        print("6. Pretest Questions Count:", len(questions))
        assert r_q.status_code == 200
        
        # 7. Submit Evaluation
        ans_payload = [
            {"question_id": q["id"], "selected_option": "C", "duration_seconds": 12}
            for q in questions[:5]
        ]
        r_eval = await client.post("/api/v1/evaluations/submit", json={
            "student_id": student_id,
            "evaluation_type": "pretest",
            "answers": ans_payload
        })
        print("7. Submit Eval:", r_eval.status_code, "Score:", r_eval.json()["data"]["total_score"])
        assert r_eval.status_code == 200
        
        # 8. Complete Progress
        r_prog = await client.post("/api/v1/progress/complete-level", json={
            "student_id": student_id,
            "level_number": 2,
            "stars": 3
        })
        print("8. Complete Level 2:", r_prog.status_code, r_prog.json()["data"]["unlocked_next_level"])
        assert r_prog.status_code == 200
        
        # 9. Badges
        r_b = await client.get(f"/api/v1/badges/{student_id}")
        print("9. Badges Count:", len(r_b.json()["data"]))
        assert r_b.status_code == 200
        
    print("\n>>> ALL 9 API ENDPOINTS TESTED AND VERIFIED 100% OK! <<<")

if __name__ == "__main__":
    asyncio.run(run_api_tests())
