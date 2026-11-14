# SYSTEM ARCHITECTURE DOCUMENT (ARCHITECTURE.md)
## STATISTIKA ADVENTURE: Arsitektur Sistem Web & Backend

---

### 1. RINGKASAN ARSITEKTUR TINGKAT TINGGI

Statistika Adventure mengadopsi arsitektur terpisah (*Decoupled Client-Server Architecture*) yang membagi sistem menjadi 3 lapisan utama:
1. **Frontend Presentation Tier (Client Layer):** Single Page Application (SPA) berbasis React + Vite yang dioptimalkan untuk mobile browser Android dengan kemampuan rendering 2D/3D interaktif Three.js.
2. **Backend Application Tier (API Layer):** RESTful API berbasis Python FastAPI yang menangani verifikasi kode siswa, kalkulasi evaluasi otomatis, pemberian XP/lencana, dan komunikasi aman ke database.
3. **Data Persistence Tier (Storage Layer):** Supabase Managed PostgreSQL dengan Row Level Security (RLS) untuk keamanan data, integritas relasional, dan transaksi atomik.

```mermaid
graph TD
    subgraph Client ["Client Device (Android Smartphone / Chrome)"]
        UI["React 18 SPA (Vite)"]
        Three["Three.js 3D Engine & Canvas 2D"]
        State["State Management (Auth, Progress, GameXP)"]
        UI --> Three
        UI --> State
    end

    subgraph Gateway ["Networking & Security"]
        CORS["CORS Middleware / HTTPS"]
        JWT["JWT Bearer Token Auth"]
    end

    subgraph Backend ["Backend Tier (Python FastAPI)"]
        Router["API Routers (/api/v1)"]
        Services["Business Logic (Grading, Gamification, Stats)"]
        Validation["Pydantic v2 Schemas"]
        Router --> Validation
        Validation --> Services
    end

    subgraph Database ["Persistence Tier (Supabase PostgreSQL)"]
        RLS["Row Level Security Policies"]
        Tables["Tables: students, materials, questions, evaluations, progress, badges"]
        RLS --> Tables
    end

    UI -->|HTTPS / REST API Requests| CORS
    CORS --> JWT
    JWT --> Router
    Services -->|Supabase Python Client (Secure Key)| Database
```

---

### 2. KOMPONEN FRONTEND (REACT + VITE)

#### 2.1 Struktur Folder Frontend (`frontend/src/`)
```
frontend/
├── public/
│   ├── assets/            # Audio efek, ikon SVG, tekstur 3D
│   └── favicon.ico
├── src/
│   ├── components/
│   │   ├── common/        # Button, Modal, Card, ProgressBar, Toast, Header
│   │   ├── gamification/  # BadgeCard, XpCounter, LevelNode, MapJourney
│   │   ├── visualization/ # ThreeCanvas.jsx, BarChart3D.jsx, PieChart3D.jsx, LineChart3D.jsx, Chart2D.jsx
│   │   └── layout/        # Navbar, Footer, MobileContainer
│   ├── pages/
│   │   ├── LandingPage.jsx
│   │   ├── LoginPage.jsx
│   │   ├── DashboardPage.jsx
│   │   ├── AdventureMapPage.jsx
│   │   ├── MaterialPage.jsx
│   │   ├── VisualizationLabPage.jsx
│   │   ├── ChallengePage.jsx
│   │   ├── EvaluationPage.jsx
│   │   └── ProfilePage.jsx
│   ├── services/          # api.js (Axios / Fetch client), auth.js, sound.js
│   ├── hooks/             # useAuth.js, useSound.js, useThree.js, useWindowDimensions.js
│   ├── context/          # AuthContext.jsx, GameContext.jsx
│   ├── data/              # staticData.js (fallback offline materi & lab default)
│   ├── utils/             # mathHelpers.js, formatting.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── package.json
├── tailwind.config.js
└── vite.config.js
```

#### 2.2 Desain Visualisasi 3D dengan Three.js
- **Canvas Container:** Ditempatkan dalam komponen React terkontrol dengan siklus hidup:
  - `componentDidMount` / `useEffect`: Inisialisasi `WebGLRenderer`, `PerspectiveCamera`, `Scene`, `DirectionalLight`, `AmbientLight`, dan `OrbitControls`.
  - `componentWillUnmount`: Pembersihan objek geometry, material, tekstur, serta penghentian `requestAnimationFrame` untuk menghindari *memory leak* pada smartphone Android.
- **Strategi Optimasi GPU Mobile:**
  - `antialias: false` pada perangkat dengan rasio piksel tinggi (`window.devicePixelRatio > 1.5`).
  - `powerPreference: "high-performance"`.
  - Geometri low-poly: BoxGeometry dan CylinderGeometry dengan segmentasi rendah (maksimal 16 segmentasi lingkaran).
  - Bayangan (*shadow maps*) dinonaktifkan secara default untuk menjamin 60 FPS di perangkat smartphone menengah ke bawah.
- **Dual-Mode 2D/3D:**
  - Tombol toggle instan memungkinkan siswa berpindah ke tampilan grafik 2D berbasis HTML5 Canvas/SVG murni jika ingin fokus membaca angka secara ortogonal tanpa distorsi perspektif.

---

### 3. KOMPONEN BACKEND (PYTHON FASTAPI)

#### 3.1 Struktur Folder Backend (`backend/`)
```
backend/
├── app/
│   ├── api/
│   │   └── v1/
│   │       ├── endpoints/
│   │       │   ├── auth.py          # Verifikasi kode siswa & login
│   │       │   ├── students.py      # Profil siswa & statistik
│   │       │   ├── materials.py     # Modul & konten level
│   │       │   ├── evaluations.py   # Pretest, posttest, submit jawaban
│   │       │   ├── progress.py      # Tracking level & progress
│   │       │   └── badges.py        # Pengambilan badge & unlocking
│   │       └── router.py            # Aggregator rute API
│   ├── core/
│   │   ├── config.py                # Pydantic BaseSettings (ENV vars)
│   │   ├── security.py              # JWT encoding/decoding & hash helpers
│   │   └── database.py              # Supabase Client connection instance
│   ├── schemas/                     # Pydantic Models (Request/Response DTO)
│   │   ├── student.py
│   │   ├── material.py
│   │   ├── evaluation.py
│   │   └── progress.py
│   ├── services/                    # Business logic
│   │   ├── auth_service.py
│   │   ├── evaluation_service.py    # Auto-scoring & N-Gain calculation
│   │   └── gamification_service.py  # Algoritma XP, Level up, Badge criteria
│   └── main.py                      # FastAPI app instance & Middleware
├── requirements.txt
├── .env.example
└── README.md
```

#### 3.2 Alur Logika Backend (Business Logic Core)
1. **Autentikasi Siswa:**
   - Siswa mengirimkan `student_code` (misal `SA8A01`).
   - Backend memverifikasi keberadaan kode pada tabel `students`.
   - Mengembalikan data siswa beserta token sesi aman (*Bearer Token*) yang kedaluwarsa dalam 7 hari.
2. **Evaluasi Otomatis & Analisis Literasi Matematis:**
   - Setiap butir soal ditandai dengan dimensi literasi: `FORMULATE`, `EMPLOY`, atau `INTERPRET`.
   - Backend menghitung skor total, skor per dimensi literasi, memberikan rekomendasi perbaikan belajar, dan mencatat perolehan XP.
3. **Kalkulasi N-Gain Score:**
   - Ketika siswa menyelesaikan Posttest, sistem membandingkan dengan skor Pretest:
     $$g = \frac{\text{Skor Posttest} - \text{Skor Pretest}}{100 - \text{Skor Pretest}}$$
   - Memberikan kategori efektivitas pembelajaran: Rendah ($g < 0.3$), Sedang ($0.3 \le g \le 0.7$), atau Tinggi ($g > 0.7$).

---

### 4. KOMPONEN DATABASE (SUPABASE POSTGRESQL)

#### 4.1 Entitas & Relasi Data Utama
- **`students`**: Data identitas siswa, kode akses unik, kelas, total XP, level saat ini.
- **`materials`**: Modul pembelajaran per level (1 - 8) dengan segmentasi konten (JSONB).
- **`questions`**: Bank soal untuk pretest, latihan level, dan posttest beserta dimensi literasi matematis.
- **`evaluations`**: Sesi ujian (pretest / posttest / latihan), skor total, dan rincian dimensi.
- **`answers`**: Jawaban individual per butir soal, status benar/salah, dan waktu pengerjaan.
- **`student_progress`**: Status penyelesaian level belajar (LOCKED, IN_PROGRESS, COMPLETED).
- **`badges`**: Master data lencana gamifikasi dengan syarat klaim.
- **`student_badges`**: Relasi banyak-ke-banyak pencapaian lencana siswa.

#### 4.2 Prinsip Keamanan Database
- Kunci `service_role` hanya digunakan di server backend Python (`backend/app/core/database.py`).
- Frontend hanya berkomunikasi melalui Backend REST API atau Supabase Anon Key dengan aturan RLS ketat.
- Row Level Security (RLS) diaktifkan pada semua tabel untuk memastikan isolasi data.

---

### 5. STRATEGI JARINGAN & OFFLINE RESILIENCE
1. **Penyimpanan Lokal (localStorage / IndexedDB):**
   - Sesi siswa, status audio (on/off), dan data progres terakhir disimpan di `localStorage` sebagai cache lokal.
   - Jika koneksi jaringan mengalami gangguan sementara, siswa tetap dapat membaca materi yang telah terbuka dan mencoba simulasi laboratorium 3D.
2. **Sinkronisasi Data:**
   - Saat koneksi kembali stabil, aplikasi secara otomatis menyinkronkan status penyelesaian latihan ke server.
