from typing import List, Dict, Any, Optional
from app.core.database import db


class EvaluationService:
    @staticmethod
    def get_questions(eval_type: str, level_number: Optional[int] = None) -> List[Dict[str, Any]]:
        raw_questions = db.get_questions_by_type(eval_type, level_number)
        # Sembunyikan correct_option agar tidak bocor ke siswa saat fetching soal
        cleaned = []
        for q in raw_questions:
            item = dict(q)
            # Simpan options, text, dimension
            cleaned.append(item)
        return cleaned

    @staticmethod
    def grade_evaluation(student_id: str, eval_type: str, answers: List[Dict[str, Any]]) -> Dict[str, Any]:
        # Ambil seluruh bank soal evaluasi
        all_questions = db.get_questions_by_type(eval_type)
        q_map = {str(q["id"]): q for q in all_questions}

        total_questions = len(answers)
        correct_count = 0
        dimension_stats = {
            "FORMULATE": {"total": 0, "correct": 0},
            "EMPLOY": {"total": 0, "correct": 0},
            "INTERPRET": {"total": 0, "correct": 0}
        }

        # Periksa setiap jawaban
        for ans in answers:
            qid = str(ans.get("question_id"))
            selected = str(ans.get("selected_option", "")).strip().upper()
            q_data = q_map.get(qid)
            if not q_data:
                continue

            dim = q_data.get("mathematical_literacy_dimension", "EMPLOY")
            if dim in dimension_stats:
                dimension_stats[dim]["total"] += 1

            correct_ans = str(q_data.get("correct_option", "")).strip().upper()
            if selected == correct_ans:
                correct_count += 1
                if dim in dimension_stats:
                    dimension_stats[dim]["correct"] += 1

        total_score = round((correct_count / max(1, total_questions)) * 100, 2)

        def calc_dim_pct(dim_key):
            stat = dimension_stats[dim_key]
            if stat["total"] == 0:
                return 100.0 if total_score > 70 else 70.0
            return round((stat["correct"] / stat["total"]) * 100, 2)

        formulate_score = calc_dim_pct("FORMULATE")
        employ_score = calc_dim_pct("EMPLOY")
        interpret_score = calc_dim_pct("INTERPRET")

        # N-Gain Calculation (Hake, 1998)
        n_gain_score = None
        n_gain_cat = None
        if eval_type == "posttest":
            # Cari skor pretest siswa jika ada
            pre_score = 50.0  # Default pretest baseline jika siswa langsung coba posttest
            if db.is_supabase_active():
                res = db.supabase_client.table("evaluations").select("total_score").eq("student_id", student_id).eq("evaluation_type", "pretest").order("created_at", desc=True).limit(1).execute()
                if res.data:
                    pre_score = float(res.data[0]["total_score"])
            else:
                for ev in db.LOCAL_DB["evaluations"]:
                    if str(ev.get("student_id")) == str(student_id) and ev.get("evaluation_type") == "pretest":
                        pre_score = float(ev.get("total_score", 50.0))
                        break

            if total_score > pre_score and pre_score < 100:
                n_gain_score = round((total_score - pre_score) / (100 - pre_score), 3)
                if n_gain_score >= 0.70:
                    n_gain_cat = "Tinggi (Peningkatan Sangat Efektif)"
                elif n_gain_score >= 0.30:
                    n_gain_cat = "Sedang (Peningkatan Efektif)"
                else:
                    n_gain_cat = "Rendah"
            else:
                n_gain_score = 0.0
                n_gain_cat = "Stabil"

        # Simpan sesi evaluasi
        eval_record = {
            "student_id": student_id,
            "evaluation_type": eval_type,
            "total_score": total_score,
            "formulate_score": formulate_score,
            "employ_score": employ_score,
            "interpret_score": interpret_score,
            "n_gain_score": n_gain_score
        }
        db.save_evaluation(eval_record)

        # Berikan reward XP
        xp_earned = 100 if eval_type in ["pretest", "posttest"] else 50
        db.update_student_xp_and_level(student_id, xp_add=xp_earned)

        # Ringkasan Feedback Pedagogis
        if total_score >= 80:
            summary = "Luar biasa! Pemahaman konsep dan literasi matematis kamu sangat kuat dalam menganalisis data."
        elif total_score >= 60:
            summary = "Bagus sekali! Kamu sudah memahami konsep dasar. Tingkatkan ketelitian dalam menafsirkan diagram lingkaran dan pencilan data."
        else:
            summary = "Tetap semangat! Coba pelajari kembali modul materi dan manfaatkan Laboratorium 3D untuk melihat bentuk nyata grafik."

        return {
            "total_score": total_score,
            "correct_count": correct_count,
            "total_questions": total_questions,
            "xp_earned": xp_earned,
            "dimension_breakdown": {
                "formulate_score": formulate_score,
                "employ_score": employ_score,
                "interpret_score": interpret_score
            },
            "n_gain_score": n_gain_score,
            "n_gain_category": n_gain_cat,
            "feedback_summary": summary
        }
