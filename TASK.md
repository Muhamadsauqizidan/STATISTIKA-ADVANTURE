# MASTER WORK PLAN & ROADMAP (TASK.md)
## STATISTIKA ADVENTURE: Rencana Kerja Bertahap 10 Fase

---

### RINGKASAN STATUS PROYEK
- **Fase Aktif Saat Ini:** FASE 1 (Dokumentasi & Analisis Kebutuhan)
- **Status Kemajuan Keseluruhan:** In Progress
- **Metodologi:** Incremental & Iterative Educational Engineering

---

### TABEL CHECKLIST 10 FASE PENGERJAAN

#### 📋 FASE 1: Analisis Kebutuhan & Dokumentasi Lengkap
- [x] Analisis profil siswa SMP kelas VIII, kurikulum, dan hambatan belajar statistika.
- [x] Pembuatan `PRD.md` (Product Requirements Document).
- [x] Pembuatan `ARCHITECTURE.md` (Arsitektur Sistem & Aliran Data).
- [x] Pembuatan `README.md` (Ringkasan Proyek & Panduan Setup).
- [x] Pembuatan `AGENTS.md` (Matriks Peran & Kolaborasi Tim Pengembang).
- [x] Pembuatan `TASK.md` (Rencana Kerja Bertahap).
- [x] Pembuatan `DESIGN.md` (Panduan UI/UX, Design Tokens, Mobile-First Guidelines).
- [x] Pembuatan `API.md` (Spesifikasi REST API FastAPI).
- [x] Pembuatan `DATABASE.md` (Skema Supabase PostgreSQL & DDL Script).
- [x] Pembuatan `LEARNING_OBJECTIVES.md` (Tujuan Pembelajaran & Capaian Literasi Matematis).
- [x] Pembuatan `MATERIAL_KISI_KISI.md` (Silabus 8 Level & Bank Soal Kontekstual).
- [x] Pembuatan `COGNITIVE_LOAD.md` (Penerapan Cognitive Load Theory).
- [x] Pembuatan `TESTING.md` (Rencana Pengujian Komprehensif).
- [x] Pembuatan `DEPLOYMENT.md` (Panduan Deployment Frontend & Backend).

---

#### 📚 FASE 2: Penyusunan Materi & Kisi-kisi Soal Literasi Matematis
- [ ] Penyusunan konten 8 Level dengan prinsip segmentasi (*chunking*):
  - [ ] Level 1: Pengenalan Statistika (Data, Populasi, Sampel).
  - [ ] Level 2: Pengumpulan & Pengelompokan Data (Tabel Frekuensi).
  - [ ] Level 3: Penyajian Data (Diagram Batang, Garis, Lingkaran).
  - [ ] Level 4: Ukuran Pemusatan - Mean (Rata-rata & Nilai Ekstrem).
  - [ ] Level 5: Ukuran Pemusatan - Median (Nilai Tengah Data Ganjil & Genap).
  - [ ] Level 6: Ukuran Pemusatan - Modus (Frekuensi Terbanyak & Penggunaan Praktis).
  - [ ] Level 7: Analisis & Interpretasi Data (Tren & Pengambilan Keputusan).
  - [ ] Level 8: Tantangan Literasi Matematis (Studi Kasus Kontekstual Kompleks).
- [ ] Pembuatan bank soal Pretest (10 butir) & Posttest (10 butir) dengan indikator PISA (*Formulate, Employ, Interpret*).
- [ ] Pembuatan soal latihan formatif interaktif per level (3-5 butir per level) beserta umpan balik penjelas (*explanatory feedback*).

---

#### 🎨 FASE 3: Desain UI/UX & Prototipe Antarmuka
- [ ] Definisi Design Tokens: Palet warna (Navy, Indigo, Violet, Neon Cyan, Emerald, Amber), tipografi font sans-serif, radius card membulat, dan elevasi bayangan halus.
- [ ] Perancangan antarmuka mobile-first (Viewport 360px - 412px Android):
  - [ ] Landing Page (Hero 3D data, call-to-action mulai belajar).
  - [ ] Login Kode Siswa (Input besar, pesan validasi ramah anak).
  - [ ] Dashboard Siswa (Progress ring, XP bar, lencana terkini, quick navigation).
  - [ ] Peta Petualangan 8 Level (Jalur pulau interaktif, status locked/unlocked).
  - [ ] Kartu Materi Interaktif (Step-by-step progress, worked examples, toggle audio).
  - [ ] Laboratorium 2D & 3D (Dual-view switcher, slider data dinamis, orbit controls).
  - [ ] Halaman Evaluasi & Pembahasan (Kuis interaktif, penjelasan solusi, visualisasi capaian literasi).
  - [ ] Profil Siswa (Statistik perolehan XP, galeri lencana prestasi, riwayat latihan).

---

#### 🗄️ FASE 4: Pembuatan Basis Data Supabase
- [ ] Konfigurasi skema database PostgreSQL:
  - [ ] Tabel `students` (identitas, kode unik, total XP, current level).
  - [ ] Tabel `materials` (modul 8 level, deskripsi, slides JSONB).
  - [ ] Tabel `questions` (soal pretest, posttest, latihan, dimensi literasi, bobot).
  - [ ] Tabel `answers` (jawaban siswa, koreksi otomatis, waktu pengerjaan).
  - [ ] Tabel `evaluations` (riwayat tes, total skor, skor per dimensi, N-Gain).
  - [ ] Tabel `student_progress` (status level per siswa: LOCKED, IN_PROGRESS, COMPLETED).
  - [ ] Tabel `badges` (master data lencana dan kriteria pencapaian).
  - [ ] Tabel `student_badges` (lencana yang berhasil diklaim siswa).
- [ ] Penulisan skrip SQL DDL lengkap (`schema.sql`).
- [ ] Implementasi Row Level Security (RLS) policies pada seluruh tabel.
- [ ] Pembuatan seed data awal (`seed.sql`) untuk data uji coba.

---

#### 💻 FASE 5: Pengembangan Frontend React + Vite
- [ ] Inisialisasi proyek React 18 menggunakan Vite di folder `frontend/`.
- [ ] Konfigurasi Tailwind CSS dengan konfigurasi tema khusus *educational gaming*.
- [ ] Pembangunan komponen inti UI (*Atomic Design Components*):
  - [ ] Button, Card, Modal, Input, Badge, ProgressBar, Toast.
- [ ] Pembangunan sistem navigasi dan routing dengan React Router v6.
- [ ] Pembangunan Halaman:
  - [ ] `LandingPage.jsx`
  - [ ] `LoginPage.jsx`
  - [ ] `DashboardPage.jsx`
  - [ ] `AdventureMapPage.jsx`
  - [ ] `MaterialPage.jsx` (Segmented stepped reader)
  - [ ] `VisualizationLabPage.jsx`
  - [ ] `ChallengePage.jsx`
  - [ ] `EvaluationPage.jsx`
  - [ ] `ProfilePage.jsx`
- [ ] Implementasi context state management (`AuthContext`, `GameContext`).

---

#### 🐍 FASE 6: Pengembangan Backend Python FastAPI
- [ ] Inisialisasi struktur proyek FastAPI di folder `backend/`.
- [ ] Konfigurasi `requirements.txt` (FastAPI, Uvicorn, Pydantic, Supabase, PyJWT, Python-dotenv).
- [ ] Pembuatan modul konfigurasi lingkungan (`config.py`).
- [ ] Pembuatan skema validasi Pydantic untuk request dan response.
- [ ] Pembuatan router REST API (`/api/v1/`):
  - [ ] Auth Router: Login kode siswa & verifikasi token JWT.
  - [ ] Students Router: Ambil profil, XP, dan progres siswa.
  - [ ] Materials Router: Ambil materi level 1-8.
  - [ ] Evaluations Router: Ambil soal pretest/posttest, submit jawaban, dan kalkulasi N-Gain.
  - [ ] Progress Router: Update status level yang diselesaikan siswa.
  - [ ] Badges Router: Ambil daftar lencana dan klaim lencana baru.
- [ ] Penanganan error terpusat (*exception handling middleware*).

---

#### 📊 FASE 7: Integrasi Visualisasi Interaktif Three.js
- [ ] Pembuatan modul canvas 3D mandiri dengan lifecycle terkontrol di React.
- [ ] Implementasi Grafik Batang 3D (3D Voxel/Bar Mesh dengan ketinggian dinamis & label nilai).
- [ ] Implementasi Diagram Lingkaran 3D (Extruded Pie/Donut Chart dengan efek hover/sentuh).
- [ ] Implementasi Grafik Garis 3D (Garis koordinat bertekstur neon dengan titik tumpu data).
- [ ] Pembuatan Simulator Mean, Median, Modus:
  - [ ] Simulasi timbangan jungkat-jungkit (*seesaw fulcrum*) untuk visualisasi titik keseimbangan Mean.
  - [ ] Urutan balok tinggi untuk penentuan Median.
  - [ ] Tumpukan balok frekuensi untuk Modus.
- [ ] Pembuatan Mode 2D Fallback/Alternatif berbasis HTML5 Canvas untuk kejelasan analitis.
- [ ] Optimasi performa WebGL pada Android (resource cleanup & dispose).

---

#### 🔗 FASE 8: Integrasi Penuh API & Database
- [ ] Penghubungan client HTTP Frontend ke Backend FastAPI.
- [ ] Penghubungan Backend FastAPI ke Supabase PostgreSQL instance.
- [ ] Uji coba alur utuh (*end-to-end flow*):
  - [ ] Login Siswa -> Buka Dashboard -> Kerjakan Pretest -> Buka Level 1 di Peta -> Baca Materi -> Coba Lab 3D -> Jawab Latihan -> Naik Level & Dapat XP/Badge -> Buka Level Selanjutnya -> Selesaikan Posttest -> Lihat Hasil Analisis & N-Gain.
- [ ] Penanganan mode offline/mock data fallback jika database sedang tidak dapat diakses.

---

#### 📱 FASE 9: Pengujian pada Smartphone Android & Validasi
- [ ] Pengujian responsivitas pada berbagai resolusi layar Android (360x640, 390x844, 412x915).
- [ ] Uji performa Three.js: konsistensi 60 FPS, konsumsi baterai, dan kestabilan WebGL.
- [ ] Uji fungsionalitas seluruh fitur kuis dan evaluasi otomatis.
- [ ] Uji kegunaan (*usability testing*) berorientasi *Cognitive Load*: kemudahan membaca, kejelasan instruksi, tidak adanya elemen membingungkan.

---

#### 🚀 FASE 10: Deployment & Dokumentasi Akhir
- [ ] Deployment Frontend ke platform hosting web gratis (Vercel / Netlify).
- [ ] Deployment Backend FastAPI ke web service gratis (Render / Railway / Fly.io).
- [ ] Konfigurasi CORS, Environment Variables produksi, dan URL API publik.
- [ ] Pembuatan panduan penggunaan untuk guru dan siswa.
- [ ] Penyusunan laporan verifikasi akhir kesiapan uji coba lapangan.
