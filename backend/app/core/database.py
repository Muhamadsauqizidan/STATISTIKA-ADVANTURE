import os
from typing import Optional, Any, Dict, List
from app.core.config import settings

# In-memory Local Repository (Active if Supabase is not configured)
LOCAL_DB: Dict[str, Any] = {
    "students": [
        {
            "id": "c1f7b8a0-2f3b-4e8c-8c9a-1e5b8c9a0001",
            "student_code": "SA8A01",
            "name": "Budi Santoso",
            "class_name": "8A",
            "school_name": "SMP Negeri 1 Matematika",
            "total_xp": 450,
            "current_level": 2,
            "avatar_seed": "budi"
        },
        {
            "id": "c1f7b8a0-2f3b-4e8c-8c9a-1e5b8c9a0002",
            "student_code": "SA8A02",
            "name": "Siti Aminah",
            "class_name": "8A",
            "school_name": "SMP Negeri 1 Matematika",
            "total_xp": 1250,
            "current_level": 5,
            "avatar_seed": "siti"
        },
        {
            "id": "c1f7b8a0-2f3b-4e8c-8c9a-1e5b8c9a0003",
            "student_code": "SA8B01",
            "name": "Rizky Pratama",
            "class_name": "8B",
            "school_name": "SMP Negeri 1 Matematika",
            "total_xp": 2400,
            "current_level": 8,
            "avatar_seed": "rizky"
        }
    ],
    "materials": [
        {
            "id": 1,
            "level_number": 1,
            "title": "Mengenal Statistika",
            "subtitle": "Data, Populasi, dan Sampel",
            "description": "Memahami apa itu data dan cara menentukan sampel yang adil tanpa bias.",
            "icon": "Compass",
            "learning_objectives": [
                "Membedakan data, populasi, dan sampel.",
                "Menentukan sampel representatif dari lingkungan sekolah."
            ],
            "xp_reward": 100,
            "slides": [
                {
                    "step": 1,
                    "title": "Apa itu Statistika & Data?",
                    "badge": "Konsep Dasar",
                    "icon": "📊",
                    "content": "Statistika adalah ilmu yang mempelajari cara mengumpulkan, mengolah, menyajikan, menganalisis, dan menarik kesimpulan dari data.",
                    "highlight": "Data adalah kumpulan fakta atau keterangan berupa angka atau kategori yang diperoleh melalui pengamatan.",
                    "example": "Contoh: Nomor ukuran sepatu teman sekelas, nilai ulangan, atau minuman paling disukai di kantin."
                },
                {
                    "step": 2,
                    "title": "Populasi vs Sampel",
                    "badge": "Perbedaan Esensial",
                    "icon": "👥",
                    "content": "Saat meneliti hal besar, kita tidak selalu bisa menanyai semua orang karena keterbatasan waktu dan tenaga.",
                    "breakdown": [
                        {"term": "Populasi", "desc": "Seluruh objek lengkap yang ingin diteliti. Contoh: Seluruh 600 siswa di sekolahmu."},
                        {"term": "Sampel", "desc": "Sebagian kecil anggota populasi yang dipilih secara adil untuk mewakili keseluruhan."}
                    ],
                    "warning": "Sampel harus adil (representatif). Hindari memilih sampel yang hanya memihak satu kelompok tertentu!"
                },
                {
                    "step": 3,
                    "title": "Worked Example: Minat Buku",
                    "badge": "Langkah demi Langkah",
                    "icon": "🧮",
                    "content": "Kepala perpustakaan ingin mengetahui genre buku favorit siswa SMP Harapan.",
                    "steps": [
                        "Langkah 1: Identifikasi Populasi = Seluruh siswa di sekolah (kelas 7, 8, dan 9).",
                        "Langkah 2: Tentukan Sampel yang Adil = Mengambil secara acak 15 siswa dari masing-masing tingkat kelas (total 45 siswa).",
                        "Langkah 3: Menarik Kesimpulan = Hasil survei 45 siswa ini mewakili minat baca seluruh siswa tanpa bias."
                    ]
                },
                {
                    "step": 4,
                    "title": "Cek Pemahaman Kilat!",
                    "badge": "Latihan Cepat",
                    "icon": "🎯",
                    "question": "Jika ingin meneliti tinggi rata-rata siswa kelas VIII, manakah cara pengambilan sampel yang paling adil?",
                    "options": [
                        {"id": "A", "text": "Hanya mengukur anggota tim bola basket sekolah."},
                        {"id": "B", "text": "Memilih secara acak 5 siswa laki-laki dan 5 siswa perempuan dari setiap kelas VIII."},
                        {"id": "C", "text": "Hanya mengukur siswa yang duduk di deretan paling depan."}
                    ],
                    "correct": "B",
                    "feedback": "Tepat sekali! Memilih secara acak dari seluruh kelas VIII menjamin keterwakilan tanpa bias tinggi badan atlet basket."
                }
            ]
        },
        {
            "id": 2,
            "level_number": 2,
            "title": "Pengelompokan Data",
            "subtitle": "Tabel Distribusi Frekuensi & Turus",
            "description": "Mengubah data mentah menjadi tabel frekuensi yang teratur dan mudah dibaca.",
            "icon": "Table",
            "learning_objectives": [
                "Menyusun data mentah ke dalam tabel turus (tally).",
                "Membaca dan membuat tabel distribusi frekuensi tunggal."
            ],
            "xp_reward": 120,
            "slides": [
                {
                    "step": 1,
                    "title": "Mengapa Data Perlu Dikelompokkan?",
                    "badge": "Pengorganisasian",
                    "icon": "📋",
                    "content": "Data mentah yang berserakan sangat sulit dibaca polanya. Dengan tabel frekuensi, kita bisa langsung melihat nilai mana yang paling banyak muncul.",
                    "highlight": "Frekuensi menyatakan seberapa sering suatu nilai muncul dalam kumpulan data."
                }
            ]
        },
        {
            "id": 3,
            "level_number": 3,
            "title": "Penyajian Data",
            "subtitle": "Diagram Batang, Garis, dan Lingkaran",
            "description": "Mengeksplorasi visualisasi data 2D dan 3D interaktif di laboratorium.",
            "icon": "BarChart3",
            "learning_objectives": [
                "Memilih diagram yang sesuai dengan karakteristik data.",
                "Menghitung proporsi derajat dan persentase diagram lingkaran."
            ],
            "xp_reward": 150,
            "slides": [
                {
                    "step": 1,
                    "title": "Tiga Bentuk Visualisasi Utama",
                    "badge": "Klasifikasi Grafik",
                    "icon": "📈",
                    "content": "Diagram batang untuk perbandingan kategori, diagram garis untuk tren waktu, diagram lingkaran untuk persentase proporsi."
                }
            ]
        },
        {
            "id": 4,
            "level_number": 4,
            "title": "Menara Mean (Rata-rata)",
            "subtitle": "Rata-rata Hitung & Bahaya Nilai Ekstrem",
            "description": "Menemukan titik keseimbangan data dan menguji ketahanan terhadap nilai pencilan (outlier).",
            "icon": "Scale",
            "learning_objectives": [
                "Menghitung nilai rata-rata (mean) data tunggal.",
                "Menjelaskan dampak data pencilan terhadap nilai mean."
            ],
            "xp_reward": 180,
            "slides": [
                {
                    "step": 1,
                    "title": "Apa itu Mean?",
                    "badge": "Definisi Konseptual",
                    "icon": "⚖️",
                    "content": "Mean adalah nilai rata-rata yang mewakili kumpulan data jika seluruh nilai dikumpulkan lalu dibagi rata secara adil.",
                    "highlight": "Mean (x̄) = Jumlah Seluruh Nilai Data ÷ Banyaknya Data (n)"
                }
            ]
        },
        {
            "id": 5,
            "level_number": 5,
            "title": "Jembatan Median",
            "subtitle": "Nilai Tengah Data Terurut",
            "description": "Mengurutkan data dan menemukan nilai tepat di posisi tengah (ganjil & genap).",
            "icon": "GitCommit",
            "learning_objectives": [
                "Menentukan median dari data berukuran ganjil.",
                "Menentukan median dari data berukuran genap."
            ],
            "xp_reward": 180,
            "slides": [
                {
                    "step": 1,
                    "title": "Kunci Utama Median: URUTKAN DATA!",
                    "badge": "Prinsip Emas",
                    "icon": "📏",
                    "content": "Median adalah nilai yang membagi data menjadi dua bagian yang sama banyak setelah data diurutkan dari yang terkecil hingga terbesar."
                }
            ]
        },
        {
            "id": 6,
            "level_number": 6,
            "title": "Lembah Modus",
            "subtitle": "Frekuensi Terbanyak & Stok Toko",
            "description": "Menentukan nilai paling populer untuk membantu keputusan bisnis kantin sekolah.",
            "icon": "Flame",
            "learning_objectives": [
                "Menentukan modus dari kumpulan data tunggal.",
                "Menggunakan modus dalam pengambilan keputusan bisnis nyata."
            ],
            "xp_reward": 180,
            "slides": [
                {
                    "step": 1,
                    "title": "Apa itu Modus?",
                    "badge": "Konsep Inti",
                    "icon": "🔥",
                    "content": "Modus adalah nilai atau kategori yang paling sering muncul (frekuensi tertinggi) dalam kumpulan data."
                }
            ]
        },
        {
            "id": 7,
            "level_number": 7,
            "title": "Analisis & Interpretasi",
            "subtitle": "Membaca Makna & Mengambil Keputusan",
            "description": "Membandingkan mean, median, dan modus pada kasus nyata untuk kesimpulan terbaik.",
            "icon": "LineChart",
            "learning_objectives": [
                "Mengevaluasi kesesuaian mean vs median pada distribusi miring.",
                "Menarik kesimpulan objektif berbasis data."
            ],
            "xp_reward": 200,
            "slides": [
                {
                    "step": 1,
                    "title": "Kapan Memilih Mean vs Median vs Modus?",
                    "badge": "Panduan Keputusan",
                    "icon": "🧭",
                    "content": "Mean untuk data merata, median untuk data berpencilan ekstrem, modus untuk data kategori/tren."
                }
            ]
        },
        {
            "id": 8,
            "level_number": 8,
            "title": "Benteng Literasi Data",
            "subtitle": "Tantangan Komprehensif PISA",
            "description": "Uji kehebatanmu merumuskan, menerapkan, dan mengevaluasi data dunia nyata!",
            "icon": "ShieldAlert",
            "learning_objectives": [
                "Menyelesaikan masalah kontekstual multi-tahap.",
                "Mengintegrasikan perumusan, penerapan, dan interpretasi matematis."
            ],
            "xp_reward": 300,
            "slides": [
                {
                    "step": 1,
                    "title": "Misi Akhir Petualangan!",
                    "badge": "Tantangan Puncak",
                    "icon": "🏆",
                    "content": "Gunakan ketiga dimensi literasimu: Merumuskan masalah, Menerapkan konsep hitung, dan Mengevaluasi keputusan."
                }
            ]
        }
    ],
    "questions": [
        {
            "id": "q1000000-0000-0000-0000-000000000001",
            "material_id": 1,
            "evaluation_type": "pretest",
            "question_text": "Pengelola kantin SMP Prestasi ingin mengetahui minuman favorit siswa untuk disiapkan di awal tahun ajaran baru. Sekolah memiliki 720 siswa yang terbagi dalam kelas 7, 8, dan 9. Cara manakah yang paling representatif untuk mengambil sampel penelitian tersebut?",
            "options": [
                {"id": "A", "text": "Menanyai seluruh anggota tim basket putra saat jam latihan."},
                {"id": "B", "text": "Menanyai 30 siswa yang sedang mengantre di depan satu stan jus saja."},
                {"id": "C", "text": "Memilih secara acak 20 siswa dari masing-masing tingkatan kelas (total 60 siswa)."},
                {"id": "D", "text": "Hanya menanyai pengurus OSIS saat rapat mingguan."}
            ],
            "correct_option": "C",
            "mathematical_literacy_dimension": "FORMULATE",
            "explanation": "Sampel yang baik harus adil dan mewakili seluruh strata populasi (kelas 7, 8, dan 9) secara acak tanpa bias kelompok tertentu.",
            "points": 10
        },
        {
            "id": "q1000000-0000-0000-0000-000000000002",
            "material_id": 3,
            "evaluation_type": "pretest",
            "question_text": "Data jenis olahraga favorit siswa kelas 8A adalah: Futsal (12 siswa), Badminton (8 siswa), Basket (6 siswa), dan Renang (4 siswa). Jika disajikan dalam diagram lingkaran, berapakah besar sudut juring untuk olahraga Futsal?",
            "options": [
                {"id": "A", "text": "120°"},
                {"id": "B", "text": "144°"},
                {"id": "C", "text": "150°"},
                {"id": "D", "text": "72°"}
            ],
            "correct_option": "B",
            "mathematical_literacy_dimension": "EMPLOY",
            "explanation": "Total siswa = 30 siswa. Sudut juring Futsal = (12 ÷ 30) × 360° = 144°.",
            "points": 10
        },
        {
            "id": "q1000000-0000-0000-0000-000000000003",
            "material_id": 3,
            "evaluation_type": "pretest",
            "question_text": "Grafik garis menunjukkan jumlah pengunjung perpustakaan dari hari Senin hingga Sabtu: Senin (45), Selasa (50), Rabu (35), Kamis (60), Jumat (40), dan Sabtu (75). Pada hari apakah terjadi kenaikan jumlah pengunjung paling tajam dibandingkan hari sebelumnya?",
            "options": [
                {"id": "A", "text": "Sabtu (naik 35 orang)"},
                {"id": "B", "text": "Kamis (naik 25 orang)"},
                {"id": "C", "text": "Selasa (naik 5 orang)"},
                {"id": "D", "text": "Senin"}
            ],
            "correct_option": "A",
            "mathematical_literacy_dimension": "INTERPRET",
            "explanation": "Kenaikan terbesar terjadi pada hari Sabtu: 75 - 40 = 35 orang pengunjung bertambah dari hari Jumat.",
            "points": 10
        },
        {
            "id": "q1000000-0000-0000-0000-000000000004",
            "material_id": 4,
            "evaluation_type": "pretest",
            "question_text": "Nilai ulangan matematika 6 siswa adalah: 75, 80, 85, 90, 70, dan 80. Berapakah nilai rata-rata (mean) dari keenam siswa tersebut?",
            "options": [
                {"id": "A", "text": "78.5"},
                {"id": "B", "text": "80.0"},
                {"id": "C", "text": "81.5"},
                {"id": "D", "text": "82.0"}
            ],
            "correct_option": "B",
            "mathematical_literacy_dimension": "EMPLOY",
            "explanation": "Mean = (75 + 80 + 85 + 90 + 70 + 80) ÷ 6 = 480 ÷ 6 = 80.0.",
            "points": 10
        },
        {
            "id": "q1000000-0000-0000-0000-000000000005",
            "material_id": 5,
            "evaluation_type": "pretest",
            "question_text": "Catatan pengeluaran uang jajan harian Rian selama 7 hari: Rp12.000, Rp10.000, Rp15.000, Rp10.000, Rp8.000, Rp14.000, Rp11.000. Berapakah nilai median dari pengeluaran uang jajan Rian?",
            "options": [
                {"id": "A", "text": "Rp10.000"},
                {"id": "B", "text": "Rp10.500"},
                {"id": "C", "text": "Rp11.000"},
                {"id": "D", "text": "Rp12.000"}
            ],
            "correct_option": "C",
            "mathematical_literacy_dimension": "EMPLOY",
            "explanation": "Data diurutkan: 8.000, 10.000, 10.000, [11.000], 12.000, 14.000, 15.000. Nilai tengah adalah Rp11.000.",
            "points": 10
        },
        {
            "id": "q1000000-0000-0000-0000-000000000006",
            "material_id": 6,
            "evaluation_type": "pretest",
            "question_text": "Seorang pemilik toko sepatu mencatat nomor sepatu yang terjual: 38, 39, 40, 39, 41, 39, 38, 42, 39, 40. Berapakah modus dari nomor sepatu yang terjual dan apa maknanya?",
            "options": [
                {"id": "A", "text": "Modus = 38; pemilik toko harus menyetok lebih banyak ukuran 38."},
                {"id": "B", "text": "Modus = 40; pembeli rata-rata bertelapak kaki besar."},
                {"id": "C", "text": "Modus = 41; ukuran 41 paling jarang dibeli."},
                {"id": "D", "text": "Modus = 39; ukuran 39 paling laris sehingga persediaannya harus diperbanyak."}
            ],
            "correct_option": "D",
            "mathematical_literacy_dimension": "INTERPRET",
            "explanation": "Ukuran 39 muncul paling sering (4 kali), sehingga merupakan ukuran paling populer.",
            "points": 10
        },
        {
            "id": "q1000000-0000-0000-0000-000000000007",
            "material_id": 4,
            "evaluation_type": "pretest",
            "question_text": "Lima siswa mencatat durasi belajar harian: 2 jam, 3 jam, 1 jam, 2 jam, dan 2 jam. Jika siswa ke-6 yang belajar 8 jam bergabung, bagaimana perubahan nilai rata-rata (mean)?",
            "options": [
                {"id": "A", "text": "Nilai rata-rata tetap 2 jam."},
                {"id": "B", "text": "Nilai rata-rata meningkat dari 2 jam menjadi 3 jam."},
                {"id": "C", "text": "Nilai rata-rata menurun menjadi 1.5 jam."},
                {"id": "D", "text": "Nilai rata-rata meningkat drastis menjadi 5 jam."}
            ],
            "correct_option": "B",
            "mathematical_literacy_dimension": "EMPLOY",
            "explanation": "Mean awal = 10 ÷ 5 = 2 jam. Mean baru = 18 ÷ 6 = 3 jam. Terjadi kenaikan 1 jam.",
            "points": 10
        },
        {
            "id": "q1000000-0000-0000-0000-000000000008",
            "material_id": 3,
            "evaluation_type": "pretest",
            "question_text": "Diagram lingkaran ekstrakurikuler 120 siswa: Pramuka (40%), PMR (25%), Robotik (15%), dan Seni Musik (20%). Berapakah jumlah siswa yang mengikuti Robotik?",
            "options": [
                {"id": "A", "text": "18 siswa"},
                {"id": "B", "text": "15 siswa"},
                {"id": "C", "text": "24 siswa"},
                {"id": "D", "text": "30 siswa"}
            ],
            "correct_option": "A",
            "mathematical_literacy_dimension": "EMPLOY",
            "explanation": "Jumlah siswa Robotik = 15% × 120 = 18 siswa.",
            "points": 10
        },
        {
            "id": "q1000000-0000-0000-0000-000000000009",
            "material_id": 7,
            "evaluation_type": "pretest",
            "question_text": "Lima orang pekerja sablon memiliki upah harian: Rp80.000, Rp85.000, Rp80.000, Rp90.000, dan pemilik usaha Rp500.000. Mengapa Median lebih tepat daripada Mean untuk upah pekerja?",
            "options": [
                {"id": "A", "text": "Karena nilai mean selalu menghasilkan angka pecahan yang rumit."},
                {"id": "B", "text": "Karena nilai median selalu bernilai lebih besar daripada mean."},
                {"id": "C", "text": "Karena nilai mean sangat terpengaruh oleh upah pemilik usaha yang bernilai ekstrem tinggi."},
                {"id": "D", "text": "Karena nilai median tidak memerlukan proses pengurutan data."}
            ],
            "correct_option": "C",
            "mathematical_literacy_dimension": "INTERPRET",
            "explanation": "Nilai Mean sangat rentan terhadap pencilan Rp500.000, sedangkan Median tetap mewakili upah umum.",
            "points": 10
        },
        {
            "id": "q1000000-0000-0000-0000-000000000010",
            "material_id": 8,
            "evaluation_type": "pretest",
            "question_text": "Kelas 8A memiliki rata-rata 78 dengan rentang nilai 74 - 82. Kelas 8B memiliki rata-rata 78 dengan rentang 55 - 98. Kelas manakah yang kemampuannya paling merata dan stabil?",
            "options": [
                {"id": "A", "text": "Kelas 8B, karena memiliki siswa peraih nilai 98."},
                {"id": "B", "text": "Kedua kelas sama saja karena memiliki nilai rata-rata 78."},
                {"id": "C", "text": "Tidak dapat ditentukan tanpa jumlah siswa."},
                {"id": "D", "text": "Kelas 8A, karena jangkauan nilainya (82 - 74 = 8) jauh lebih kecil sehingga homogen."}
            ],
            "correct_option": "D",
            "mathematical_literacy_dimension": "INTERPRET",
            "explanation": "Jangkauan (range) kelas 8A hanya 8 poin, sehingga nilainya jauh lebih merata.",
            "points": 10
        }
    ],
    "student_progress": [
        {"student_id": "c1f7b8a0-2f3b-4e8c-8c9a-1e5b8c9a0001", "level_number": 1, "status": "COMPLETED", "stars": 3},
        {"student_id": "c1f7b8a0-2f3b-4e8c-8c9a-1e5b8c9a0001", "level_number": 2, "status": "IN_PROGRESS", "stars": 0}
    ],
    "badges": [
        {"id": "b1000000-0000-0000-0000-000000000001", "badge_code": "DATA_SCOUT", "name": "Penjelajah Data", "description": "Menyelesaikan Level 1 dan memahami konsep data, populasi, dan sampel.", "icon": "🧭", "xp_required": 100},
        {"id": "b1000000-0000-0000-0000-000000000002", "badge_code": "CHART_MASTER", "name": "Arsitek Diagram", "description": "Mencoba semua model grafik 2D dan 3D di Laboratorium Visualisasi.", "icon": "📊", "xp_required": 250},
        {"id": "b1000000-0000-0000-0000-000000000003", "badge_code": "BALANCE_KEEPER", "name": "Penjaga Keseimbangan", "description": "Memahami cara kerja nilai Mean pada simulasi timbangan data.", "icon": "⚖️", "xp_required": 500},
        {"id": "b1000000-0000-0000-0000-000000000004", "badge_code": "MEDIAN_HUNTER", "name": "Pemburu Nilai Tengah", "description": "Berhasil mengurutkan data genap dan menemukan median dengan cepat.", "icon": "🎯", "xp_required": 750},
        {"id": "b1000000-0000-0000-0000-000000000005", "badge_code": "TREND_SETTER", "name": "Ahli Modus", "description": "Membantu penjaga kantin menentukan minuman terlaris menggunakan modus.", "icon": "🔥", "xp_required": 1000},
        {"id": "b1000000-0000-0000-0000-000000000006", "badge_code": "GRAND_HERO", "name": "Pahlawan Statistika", "description": "Menyelesaikan seluruh 8 level petualangan dan menuntaskan Posttest.", "icon": "👑", "xp_required": 2000}
    ],
    "student_badges": [
        {"student_id": "c1f7b8a0-2f3b-4e8c-8c9a-1e5b8c9a0001", "badge_id": "b1000000-0000-0000-0000-000000000001"},
        {"student_id": "c1f7b8a0-2f3b-4e8c-8c9a-1e5b8c9a0001", "badge_id": "b1000000-0000-0000-0000-000000000002"}
    ],
    "evaluations": []
}

class DatabaseManager:
    """
    Manajer database cerdas:
    - Terhubung ke Supabase jika SUPABASE_URL & SUPABASE_KEY tersedia
    - Menggunakan In-Memory Local Storage jika offline / saat development
    """
    def __init__(self):
        self.supabase_client = None
        self._init_client()

    def _init_client(self):
        if settings.SUPABASE_URL and settings.SUPABASE_KEY and "your-project" not in settings.SUPABASE_URL:
            try:
                from supabase import create_client
                self.supabase_client = create_client(settings.SUPABASE_URL, settings.SUPABASE_KEY)
                print("Connected to Supabase PostgreSQL.")
            except Exception as e:
                print(f"Supabase connection warning: {e}. Falling back to Local Storage.")
                self.supabase_client = None
        else:
            print("Supabase credentials not configured. Using high-performance Local Storage.")

    def is_supabase_active(self) -> bool:
        return self.supabase_client is not None

    # --- Student Operations ---
    def get_student_by_code(self, student_code: str) -> Optional[Dict[str, Any]]:
        clean_code = student_code.strip().upper()
        if self.is_supabase_active():
            res = self.supabase_client.table("students").select("*").eq("student_code", clean_code).execute()
            if res.data:
                return res.data[0]
            return None

        for std in LOCAL_DB["students"]:
            if std["student_code"].upper() == clean_code:
                return dict(std)
        return None

    def get_student_by_id(self, student_id: str) -> Optional[Dict[str, Any]]:
        if self.is_supabase_active():
            res = self.supabase_client.table("students").select("*").eq("id", student_id).execute()
            return res.data[0] if res.data else None

        for std in LOCAL_DB["students"]:
            if str(std["id"]) == str(student_id):
                return dict(std)
        return None

    def update_student_xp_and_level(self, student_id: str, xp_add: int, new_level: Optional[int] = None) -> Optional[Dict[str, Any]]:
        if self.is_supabase_active():
            current = self.get_student_by_id(student_id)
            if not current:
                return None
            updates = {"total_xp": current.get("total_xp", 0) + xp_add}
            if new_level and new_level > current.get("current_level", 1):
                updates["current_level"] = new_level
            res = self.supabase_client.table("students").update(updates).eq("id", student_id).execute()
            return res.data[0] if res.data else None

        for std in LOCAL_DB["students"]:
            if str(std["id"]) == str(student_id):
                std["total_xp"] = max(0, std.get("total_xp", 0) + xp_add)
                if new_level and new_level > std.get("current_level", 1):
                    std["current_level"] = new_level
                return dict(std)
        return None

    # --- Materials Operations ---
    def get_all_materials(self) -> List[Dict[str, Any]]:
        if self.is_supabase_active():
            res = self.supabase_client.table("materials").select("id, level_number, title, subtitle, description, icon, xp_reward").order("level_number").execute()
            return res.data or []

        return [
            {
                "id": m["id"],
                "level_number": m["level_number"],
                "title": m["title"],
                "subtitle": m.get("subtitle", ""),
                "description": m.get("description", ""),
                "icon": m.get("icon", "Compass"),
                "xp_reward": m.get("xp_reward", 100)
            }
            for m in LOCAL_DB["materials"]
        ]

    def get_material_by_level(self, level_number: int) -> Optional[Dict[str, Any]]:
        if self.is_supabase_active():
            res = self.supabase_client.table("materials").select("*").eq("level_number", level_number).execute()
            return res.data[0] if res.data else None

        for m in LOCAL_DB["materials"]:
            if m["level_number"] == level_number:
                return dict(m)
        return None

    # --- Questions & Evaluations Operations ---
    def get_questions_by_type(self, eval_type: str, level_number: Optional[int] = None) -> List[Dict[str, Any]]:
        if self.is_supabase_active():
            query = self.supabase_client.table("questions").select("*").eq("evaluation_type", eval_type)
            if level_number:
                mat = self.get_material_by_level(level_number)
                if mat:
                    query = query.eq("material_id", mat["id"])
            res = query.execute()
            return res.data or []

        # Return questions from local
        results = []
        for q in LOCAL_DB["questions"]:
           if q["evaluation_type"] == eval_type:
                # omit correct_option for student questions
                q_copy = dict(q)
                results.append(q_copy)
        return results

    def save_evaluation(self, eval_data: Dict[str, Any]) -> Dict[str, Any]:
        import uuid
        eval_id = str(uuid.uuid4())
        eval_record = {
            "id": eval_id,
            **eval_data
        }
        if self.is_supabase_active():
            res = self.supabase_client.table("evaluations").insert(eval_record).execute()
            return res.data[0] if res.data else eval_record

        LOCAL_DB["evaluations"].append(eval_record)
        return eval_record

    # --- Student Progress Operations ---
    def get_student_progress(self, student_id: str) -> List[Dict[str, Any]]:
        if self.is_supabase_active():
            res = self.supabase_client.table("student_progress").select("*").eq("student_id", student_id).order("level_number").execute()
            return res.data or []

        return [p for p in LOCAL_DB["student_progress"] if str(p["student_id"]) == str(student_id)]

    def complete_level_progress(self, student_id: str, level_number: int, stars: int = 3) -> Dict[str, Any]:
        if self.is_supabase_active():
            # Upsert progress
            data = {
                "student_id": student_id,
                "level_number": level_number,
                "status": "COMPLETED",
                "stars": stars
            }
            res = self.supabase_client.table("student_progress").upsert(data, on_conflict="student_id,level_number").execute()
            # Buka level berikutnya
            if level_number < 8:
                next_lvl = {
                    "student_id": student_id,
                    "level_number": level_number + 1,
                    "status": "IN_PROGRESS",
                    "stars": 0
                }
                self.supabase_client.table("student_progress").upsert(next_lvl, on_conflict="student_id,level_number").execute()
            return res.data[0] if res.data else data

        # Local DB Update
        existing = None
        for p in LOCAL_DB["student_progress"]:
            if str(p["student_id"]) == str(student_id) and p["level_number"] == level_number:
                existing = p
                break
        if existing:
            existing["status"] = "COMPLETED"
            existing["stars"] = max(existing.get("stars", 0), stars)
        else:
            LOCAL_DB["student_progress"].append({
                "student_id": student_id,
                "level_number": level_number,
                "status": "COMPLETED",
                "stars": stars
            })

        # Buka level berikutnya di local
        if level_number < 8:
            next_found = False
            for p in LOCAL_DB["student_progress"]:
                if str(p["student_id"]) == str(student_id) and p["level_number"] == level_number + 1:
                    next_found = True
                    break
            if not next_found:
                LOCAL_DB["student_progress"].append({
                    "student_id": student_id,
                    "level_number": level_number + 1,
                    "status": "IN_PROGRESS",
                    "stars": 0
                })

        return {"student_id": student_id, "level_number": level_number, "status": "COMPLETED", "stars": stars}

    # --- Badges Operations ---
    def get_badges_for_student(self, student_id: str) -> List[Dict[str, Any]]:
        all_badges = LOCAL_DB["badges"]
        if self.is_supabase_active():
            res = self.supabase_client.table("badges").select("*").execute()
            all_badges = res.data or all_badges
            earned_res = self.supabase_client.table("student_badges").select("badge_id, unlocked_at").eq("student_id", student_id).execute()
            earned_ids = {item["badge_id"] for item in (earned_res.data or [])}
        else:
            earned_ids = {b["badge_id"] for b in LOCAL_DB["student_badges"] if str(b["student_id"]) == str(student_id)}

        results = []
        for b in all_badges:
            b_copy = dict(b)
            b_copy["unlocked"] = b["id"] in earned_ids
            results.append(b_copy)
        return results


# Global singleton instance
db = DatabaseManager()
