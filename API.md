# REST API SPECIFICATION (API.md)
## STATISTIKA ADVENTURE: Dokumentasi Backend RESTful API (Python FastAPI)

---

### 1. RINGKASAN & PROTOKOL
- **Base URL:** `/api/v1`
- **Format Pertukaran Data:** JSON (`Content-Type: application/json; charset=utf-8`)
- **Autentikasi:** HTTP Bearer Token (`Authorization: Bearer <JWT_TOKEN>`) untuk endpoint yang memerlukan otorisasi.
- **Dokumentasi Interaktif (Swagger UI):** `http://localhost:8000/docs`
- **ReDoc:** `http://localhost:8000/redoc`

---

### 2. STRUKTUR STANDAR RESPONSE & ERROR HANDLING

#### 2.1 Format Response Sukses
```json
{
  "success": true,
  "data": { ... },
  "message": "Operasi berhasil"
}
```

#### 2.2 Format Response Gagal / Error
```json
{
  "success": false,
  "error": {
    "code": "STUDENT_CODE_NOT_FOUND",
    "message": "Kode siswa 'SA9999' tidak terdaftar di sistem. Silakan periksa kembali atau tanyakan pada gurumu."
  }
}
```

---

### 3. DAFTAR ENDPOINT UTAMA

#### 3.1 Modul Autentikasi Siswa (`/api/v1/auth`)

##### `POST /api/v1/auth/login-code`
Memvalidasi kode siswa dan mengembalikan profil dasar serta token sesi JWT.
- **Request Body:**
```json
{
  "student_code": "SA8A01"
}
```
- **Response Sukses (200 OK):**
```json
{
  "success": true,
  "data": {
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "token_type": "bearer",
    "student": {
      "id": "c1f7b8a0-2f3b-4e8c-8c9a-1e5b8c9a0001",
      "student_code": "SA8A01",
      "name": "Budi Santoso",
      "class_name": "8A",
      "school_name": "SMP Negeri 1 Matematika",
      "total_xp": 350,
      "current_level": 2
    }
  },
  "message": "Selamat datang, Budi Santoso!"
}
```
- **Error Response (404 Not Found):**
```json
{
  "success": false,
  "error": {
    "code": "INVALID_CODE",
    "message": "Kode siswa tidak ditemukan."
  }
}
```

##### `GET /api/v1/auth/me`
Mengambil data sesi siswa yang sedang login berdasarkan token JWT.
- **Headers:** `Authorization: Bearer <token>`
- **Response Sukses (200 OK):** Mengembalikan objek profil siswa lengkap.

---

#### 3.2 Modul Materi Pembelajaran (`/api/v1/materials`)

##### `GET /api/v1/materials`
Mengambil daftar ringkas 8 level petualangan statistika.
- **Response Sukses (200 OK):**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "level_number": 1,
      "title": "Mengenal Statistika",
      "subtitle": "Data, Populasi, dan Sampel",
      "icon": "Compass",
      "xp_reward": 50
    },
    ...
  ]
}
```

##### `GET /api/v1/materials/{level_number}`
Mengambil detail modul pembelajaran level tertentu yang terpecah menjadi beberapa kartu slide (*segmented slides*) sesuai prinsip *Cognitive Load Theory*.
- **Response Sukses (200 OK):**
```json
{
  "success": true,
  "data": {
    "level_number": 4,
    "title": "Mean (Rata-rata)",
    "learning_objectives": [
      "Menentukan rata-rata (mean) dari kumpulan data tunggal.",
      "Menjelaskan pengaruh nilai ekstrem terhadap nilai mean."
    ],
    "slides": [
      {
        "slide_index": 1,
        "type": "concept",
        "title": "Apa itu Mean?",
        "content": "Mean adalah nilai rata-rata yang mewakili kumpulan data jika seluruh nilai dibagikan secara adil dan merata.",
        "highlight": "Mean = Jumlah Seluruh Nilai ÷ Banyaknya Data",
        "interactive_element": null
      },
      {
        "slide_index": 2,
        "type": "worked_example",
        "title": "Contoh: Uang Saku Harian",
        "content": "Uang saku 5 hari Budi: Rp10.000, Rp12.000, Rp10.000, Rp8.000, Rp10.000.",
        "calculation_steps": [
          "Langkah 1: Jumlahkan semua data = 10.000 + 12.000 + 10.000 + 8.000 + 10.000 = 50.000",
          "Langkah 2: Hitung banyaknya hari = 5",
          "Langkah 3: Bagi jumlah dengan banyaknya hari = 50.000 ÷ 5 = Rp10.000/hari"
        ]
      },
      {
        "slide_index": 3,
        "type": "mini_practice",
        "title": "Cek Pemahamanmu!",
        "question": "Jika nilai ulangan 4 siswa adalah 70, 80, 80, 90, berapakah mean nilai mereka?",
        "options": ["75", "80", "85", "90"],
        "correct_index": 1,
        "feedback": "Tepat sekali! (70 + 80 + 80 + 90) ÷ 4 = 320 ÷ 4 = 80."
      }
    ]
  }
}
```

---

#### 3.3 Modul Evaluasi & Literasi Matematis (`/api/v1/evaluations`)

##### `GET /api/v1/evaluations/questions?type={pretest|posttest|challenge}&level={level_number}`
Mengambil paket soal evaluasi diagnostik, formatif, atau sumatif.
Setiap soal memiliki tag dimensi literasi: `FORMULATE`, `EMPLOY`, `INTERPRET`.

##### `POST /api/v1/evaluations/submit`
Mengirimkan lembar jawaban siswa untuk dinilai secara instan oleh server.
- **Request Body:**
```json
{
  "student_id": "c1f7b8a0-2f3b-4e8c-8c9a-1e5b8c9a0001",
  "evaluation_type": "posttest",
  "answers": [
    { "question_id": 101, "selected_option": "B", "duration_seconds": 35 },
    { "question_id": 102, "selected_option": "A", "duration_seconds": 42 }
  ]
}
```
- **Response Sukses (200 OK):**
```json
{
  "success": true,
  "data": {
    "total_score": 85.0,
    "correct_count": 8,
    "total_questions": 10,
    "xp_earned": 150,
    "dimension_breakdown": {
      "formulate_score": 100.0,
      "employ_score": 80.0,
      "interpret_score": 75.0
    },
    "n_gain_score": 0.65,
    "n_gain_category": "Sedang (Peningkatan Efektif)",
    "feedback_summary": "Hebat! Kamu sangat mahir merumuskan data ke dalam model matematika. Tingkatkan ketelitian dalam menafsirkan diagram lingkaran."
  }
}
```

---

#### 3.4 Modul Progres & Gamifikasi (`/api/v1/progress` & `/api/v1/badges`)

##### `GET /api/v1/progress/{student_id}`
Mengambil riwayat level yang sudah dibuka (*unlocked*) dan diselesaikan (*completed*).

##### `POST /api/v1/progress/complete-level`
Menandai suatu level telah selesai dan memberikan hadiah XP.
- **Request Body:**
```json
{
  "student_id": "c1f7b8a0-2f3b-4e8c-8c9a-1e5b8c9a0001",
  "level_number": 2,
  "stars_earned": 3
}
```

##### `GET /api/v1/badges/{student_id}`
Mengambil koleksi lencana yang diperoleh dan lencana yang masih terkunci.
