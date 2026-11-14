import sys
import os
import time
import threading
import json
import urllib.request
import urllib.error

sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__))))

import uvicorn
from app.main import app

server_instance = None

def run_uvicorn():
    global server_instance
    try:
        config = uvicorn.Config(app=app, host="127.0.0.1", port=8000, log_level="info")
        server_instance = uvicorn.Server(config)
        # Matikan signal handling di subthread agar tidak throw ValueError di Windows
        server_instance.install_signal_handlers = lambda: None
        server_instance.run()
    except Exception as e:
        print("Uvicorn thread exception:", e)

def run_tests():
    print("Starting Uvicorn Server in background thread...")
    t = threading.Thread(target=run_uvicorn, daemon=True)
    t.start()
    
    # Tunggu server online
    base_url = "http://127.0.0.1:8000"
    online = False
    for i in range(15):
        time.sleep(0.5)
        try:
            req = urllib.request.urlopen(f"{base_url}/", timeout=1)
            if req.status == 200:
                online = True
                break
        except Exception:
            pass

    if not online:
        print("ERROR: Server failed to start within 7.5s")
        if server_instance:
            server_instance.should_exit = True
        sys.exit(1)

    print("Server is ONLINE! Running HTTP Endpoint Tests...")

    def http_req(path, method="GET", data=None, token=None):
        url = f"{base_url}{path}"
        headers = {"Content-Type": "application/json"}
        if token:
            headers["Authorization"] = f"Bearer {token}"
        req_data = json.dumps(data).encode("utf-8") if data else None
        request = urllib.request.Request(url, data=req_data, headers=headers, method=method)
        with urllib.request.urlopen(request, timeout=3) as response:
            return response.status, json.loads(response.read().decode("utf-8"))

    try:
        # 1. Health check
        status, body = http_req("/")
        print("1. [GET /] Status:", status, body.get("app"), "- OK")

        # 2. Login dengan kode siswa demo SA8A01
        status, body = http_req("/api/v1/auth/login-code", method="POST", data={"student_code": "SA8A01"})
        print("2. [POST /api/v1/auth/login-code] Status:", status, "Message:", body.get("message"))
        login_data = body["data"]
        token = login_data["access_token"]
        student = login_data["student"]
        student_id = student["id"]
        print("   Student:", student["name"], "Level:", student["current_level"], "XP:", student["total_xp"])

        # 3. Auth Me
        status, body = http_req("/api/v1/auth/me", token=token)
        print("3. [GET /api/v1/auth/me] Status:", status, "Student:", body["data"]["name"], "- OK")

        # 4. Materials List
        status, body = http_req("/api/v1/materials")
        print("4. [GET /api/v1/materials] Status:", status, "Count:", len(body["data"]), "levels - OK")

        # 5. Material Detail (Level 1)
        status, body = http_req("/api/v1/materials/1")
        print("5. [GET /api/v1/materials/1] Status:", status, "Title:", body["data"]["title"], "Slides:", len(body["data"]["slides"]), "- OK")

        # 6. Evaluation Questions
        status, body = http_req("/api/v1/evaluations/questions?type=pretest")
        questions = body["data"]
        print("6. [GET /api/v1/evaluations/questions] Status:", status, "Questions:", len(questions), "- OK")

        # 7. Submit Evaluation
        answers = [{"question_id": q["id"], "selected_option": "C", "duration_seconds": 15} for q in questions[:5]]
        status, body = http_req("/api/v1/evaluations/submit", method="POST", data={
            "student_id": student_id,
            "evaluation_type": "pretest",
            "answers": answers
        })
        print("7. [POST /api/v1/evaluations/submit] Status:", status, "Score:", body["data"]["total_score"], "XP Earned:", body["data"]["xp_earned"], "- OK")

        # 8. Complete Level Progress
        status, body = http_req("/api/v1/progress/complete-level", method="POST", data={
            "student_id": student_id,
            "level_number": 2,
            "stars": 3
        })
        print("8. [POST /api/v1/progress/complete-level] Status:", status, "Unlocked:", body["data"]["unlocked_next_level"], "- OK")

        # 9. Badges
        status, body = http_req(f"/api/v1/badges/{student_id}")
        badges = body["data"]
        print("9. [GET /api/v1/badges] Status:", status, "Total Badges:", len(badges), "Unlocked:", len([b for b in badges if b["unlocked"]]), "- OK")

        print("\n=======================================================")
        print(" SUCCESS: ALL 9 FASTAPI ENDPOINTS FUNCTIONING 100%! ")
        print("=======================================================")

    finally:
        if server_instance:
            server_instance.should_exit = True

if __name__ == "__main__":
    run_tests()
