# STATISTIKA ADVENTURE 🎮📊
### Media Pembelajaran Matematika Berbasis Game Edukasi & Visualisasi 3D untuk Siswa SMP Kelas VIII

[![React](https://img.shields.io/badge/Frontend-React%2018%20%7C%20Vite-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![Three.js](https://img.shields.io/badge/Visualisasi-Three.js%203D-black?logo=three.js)](https://threejs.org/)
[![FastAPI](https://img.shields.io/badge/Backend-Python%20FastAPI-009688?logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com/)
[![Supabase](https://img.shields.io/badge/Database-Supabase%20PostgreSQL-3ECF8E?logo=supabase&logoColor=white)](https://supabase.com/)
[![Pedagogy](https://img.shields.io/badge/Pedagogi-Cognitive%20Load%20Theory-FF6F00)](#landasan-pedagogis)
[![Focus](https://img.shields.io/badge/Fokus-Literasi%20Matematis-7952B3)](#literasi-matematis)

---

## 🌟 Tentang Aplikasi
**STATISTIKA ADVENTURE** adalah web-based educational game yang dirancang khusus untuk siswa SMP kelas VIII. Aplikasi ini menyajikan konsep statistika melalui petualangan 8 level bertingkat, laboratorium visualisasi data interaktif 2D dan 3D berbasis **Three.js**, serta latihan pemecahan masalah kontekstual yang berfokus pada peningkatan **Literasi Matematis**.

Dibangun dengan prinsip **Cognitive Load Theory (CLT)** oleh John Sweller, antarmuka aplikasi mengutamakan segmentasi informasi (chunking), eliminasi distraksi visual, dan umpan balik instan agar proses belajar menjadi bermakna, menyenangkan, dan bebas tekanan (*anti-math anxiety*).

---

## 🚀 Fitur Unggulan

1. **🔑 Login Kode Siswa Instan:**
   - Masuk cepat tanpa perlu email dan kata sandi rumit. Cukup masukkan kode unik (misal: `SA8A01`).
2. **🗺️ Peta Petualangan 8 Level:**
   - Level 1: Mengenal Statistika (Data, Populasi, Sampel).
   - Level 2: Mengumpulkan & Mengelompokkan Data.
   - Level 3: Menyajikan Data (Tabel & Diagram).
   - Level 4: Mean (Rata-rata & Nilai Ekstrem).
   - Level 5: Median (Nilai Tengah Data Ganjil/Genap).
   - Level 6: Modus (Frekuensi Tertinggi).
   - Level 7: Analisis & Interpretasi Data.
   - Level 8: Tantangan Literasi Matematis.
3. **🧊 Laboratorium Visualisasi Interaktif 2D & 3D (Three.js):**
   - Diagram Batang, Diagram Lingkaran (Pie/Donut), dan Grafik Garis 3D.
   - Input data langsung dengan pembaruan grafik secara *real-time*.
   - Simulasi titik tumpu keseimbangan Mean, Median, dan Modus.
   - Toggle instan antara mode 2D (analitis) dan 3D (spasial/eksploratif).
4. **🎯 Latihan Kontekstual & Literasi Matematis:**
   - Soal kontekstual berbasis data nyata (uang saku, waktu belajar, survei kantin, pengunjung perpustakaan).
   - Mengukur 3 dimensi literasi matematis: *Formulate*, *Employ*, dan *Interpret*.
5. **🏆 Gamifikasi Positif & Suportif:**
   - Perolehan XP, kenaikan Level, dan koleksi Badge tanpa tekanan leaderboard publik.
6. **📱 Dioptimalkan untuk Smartphone Android:**
   - Desain *mobile-first*, ukuran tombol ramah jari, dan performa WebGL 60 FPS yang ringan.

---

## 🛠️ Tumpukan Teknologi (Tech Stack)

| Komponen | Teknologi | Keterangan |
| :--- | :--- | :--- |
| **Frontend** | React 18, Vite, Tailwind CSS, Lucide Icons | Antarmuka interaktif, cepat, dan responsif |
| **3D Rendering** | Three.js | Visualisasi data 3D dengan WebGL |
| **Backend API** | Python 3.10+, FastAPI, Pydantic v2 | Server RESTful berkecepatan tinggi |
| **Database** | Supabase (PostgreSQL 15) | Relasional, Row Level Security, Realtime |
| **Autentikasi** | Token Sesi JWT Berbasis Kode Siswa | Aman dan ramah siswa SMP |

---

## 📁 Struktur Direktori Proyek

```
STATISTIKA ADVENTURE/
├── frontend/                     # Kode Aplikasi Klien React + Three.js
│   ├── public/                   # Asset statis, audio, tekstur
│   ├── src/
│   │   ├── components/           # Komponen UI Reusable
│   │   │   ├── common/           # Button, Modal, Card, Input
│   │   │   ├── gamification/     # XP, Badge, Map Nodes
│   │   │   └── visualization/    # Three.js 3D & Canvas 2D Charts
│   │   ├── pages/                # Halaman Aplikasi (Landing, Map, Lab, dll)
│   │   ├── services/             # HTTP Client & API Calls
│   │   └── utils/                # Logika kalkulasi statistika
│   ├── package.json
│   └── vite.config.js
├── backend/                      # Kode Server API Python FastAPI
│   ├── app/
│   │   ├── api/v1/endpoints/     # Endpoints REST (auth, progress, evaluasi)
│   │   ├── core/                 # Konfigurasi ENV & Database Supabase
│   │   ├── schemas/              # Validasi Data Pydantic
│   │   ├── services/             # Scoring & Algoritma Gamifikasi
│   │   └── main.py               # Entrypoint FastAPI
│   ├── requirements.txt
│   └── .env.example
├── PRD.md                        # Product Requirements Document
├── ARCHITECTURE.md               # Arsitektur & Alur Data
├── DATABASE.md                   # Skema DDL SQL & Aturan RLS Supabase
├── API.md                        # Dokumentasi Lengkap Endpoint REST
├── DESIGN.md                     # Panduan Desain UI/UX & Desain Sistem
├── COGNITIVE_LOAD.md             # Implementasi Teori Beban Kognitif
├── LEARNING_OBJECTIVES.md        # Tujuan Pembelajaran & Capaian Literasi
├── MATERIAL_KISI_KISI.md         # Silabus 8 Level & Kisi-kisi Soal
├── TASK.md                       # Roadmap & Rencana Pengerjaan Bertahap
├── TESTING.md                    # Prosedur & Hasil Pengujian
└── DEPLOYMENT.md                 # Panduan Hosting Frontend & Backend
```

---

## ⚡ Panduan Menjalankan Proyek Secara Lokal

### Prasyarat:
- **Node.js:** Versi 18.x atau lebih baru.
- **Python:** Versi 3.10 atau lebih baru.
- **Akun Supabase:** Untuk koneksi PostgreSQL terkelola.

---

### 1. Menjalankan Backend (FastAPI)
```bash
# Masuk ke direktori backend
cd backend

# Buat virtual environment (opsional namun disarankan)
python -m venv venv
# Windows:
venv\Scripts\activate
# Linux/Mac:
source venv/bin/activate

# Install dependensi
pip install -r requirements.txt

# Salin file environment dan sesuaikan konfigurasi
cp .env.example .env

# Jalankan server FastAPI
uvicorn app.main:app --reload --port 8000
```
Server backend akan aktif di: `http://localhost:8000`
Dokumentasi interaktif Swagger UI: `http://localhost:8000/docs`

---

### 2. Menjalankan Frontend (React + Vite)
```bash
# Buka terminal baru dan masuk ke direktori frontend
cd frontend

# Install dependensi frontend
npm install

# Jalankan server pengembangan Vite
npm run dev
```
Buka peramban pada: `http://localhost:5173`

---

## 👥 Akun Demo untuk Pengujian Cepat
Gunakan kode siswa yang telah disediakan dalam seed data:
- `SA8A01` - Budi Santoso (Kelas 8A - Level 1)
- `SA8A02` - Siti Aminah (Kelas 8A - Level 4)
- `SA8B01` - Rizky Pratama (Kelas 8B - Level 8 / Tamat)

---

## 📜 Lisensi & Hak Cipta
Aplikasi ini dikembangkan untuk kepentingan riset pendidikan dan inovasi pembelajaran matematika SMP. Hak cipta milik Pengembang & Mahasiswa Pendidikan Matematika. Bebas digunakan untuk keperluan akademik dan non-komersial.
