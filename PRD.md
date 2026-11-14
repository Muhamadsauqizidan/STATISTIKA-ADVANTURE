# PRODUCT REQUIREMENTS DOCUMENT (PRD)
## STATISTIKA ADVENTURE: Web-Based Educational Game untuk Siswa SMP Kelas VIII

---

### 1. INFORMASI DOKUMEN & IDENTITAS PROYEK
- **Nama Aplikasi:** STATISTIKA ADVENTURE
- **Versi Dokumen:** 1.0.0
- **Penulis/Pengembang:** Mahasiswa Pendidikan Matematika (bekerja sama dengan Senior Educational Full Stack Architect)
- **Target Pengguna:** Siswa SMP/MTs Kelas VIII (Fase D Kurikulum Merdeka)
- **Mata Pelajaran:** Matematika
- **Topik Utama:** Statistika (Penyajian Data, Ukuran Pemusatan Data, Ukuran Penyebaran Data, Literasi Data)
- **Fokus Kemampuan:** *Mathematical Literacy* (Merumuskan, Menerapkan, dan Menafsirkan/Mengevaluasi)
- **Landasan Pedagogis:** *Cognitive Load Theory* (Sweller) & *Game-Based Learning*
- **Platform Sasaran:** Web Responsif Mobile-First (Dioptimalkan untuk Smartphone Android)

---

### 2. LATAR BELAKANG & TUJUAN
#### 2.1 Latar Belakang
Statistika merupakan materi esensial dalam pembelajaran matematika SMP yang berkaitan erat dengan pemecahan masalah dunia nyata. Kendala umum siswa kelas VIII meliputi:
1. Kesulitan menafsirkan grafik/diagram dan membaca makna di balik angka (kelemahan literasi matematis).
2. Kesulitan membedakan konsep ukuran pemusatan (Mean, Median, Modus) dan kapan ukuran tersebut tepat digunakan.
3. Tingginya beban kognitif (*extraneous cognitive load*) akibat buku teks statis dengan rumus berulang tanpa visualisasi interaktif.
4. Rendahnya motivasi belajar matematika tradisional yang kurang kontekstual dan interaktif.

#### 2.2 Tujuan Pengembangan
1. **Penguasaan Materi:** Membantu siswa memahami konsep dasar statistika secara konseptual dan prosedural.
2. **Peningkatan Literasi Matematis:** Melatih 3 proses literasi matematis:
   - *Formulating situations mathematically* (Merumuskan).
   - *Employing mathematical concepts, facts, procedures* (Menerapkan).
   - *Interpreting, applying and evaluating mathematical outcomes* (Menafsirkan).
3. **Pengurangan Beban Kognitif:** Mengimplementasikan *Cognitive Load Theory* melalui segmentasi materi (chunking), eliminasi elemen distraksi (coherence), penandaan konsep esensial (signaling), dan dual modalitas (teks-visual proporsional).
4. **Visualisasi Interaktif 2D & 3D:** Memanfaatkan Three.js untuk visualisasi diagram batang, lingkaran, dan garis yang dapat dirotasi dan dimanipulasi secara real-time.
5. **Keterlibatan Siswa:** Menerapkan mekanika game yang suportif (XP, Level, Badge, Peta Petualangan) tanpa kompetisi yang memicu kecemasan matematika (*math anxiety*).

---

### 3. PROFIL PENGGUNA (USER PERSONA)
#### Persona 1: Siswa SMP Kelas VIII (Primary User)
- **Karakteristik:** Usia 13-14 tahun, pengguna aktif smartphone Android, terbiasa dengan antarmuka game kasual/interaktif, mudah bosan dengan teks panjang.
- **Tingkat Kemampuan Awal:** Memahami operasi hitung dasar (penjumlahan, pembagian, persen), namun ragu dalam analisis tabel/diagram majemuk.
- **Kebutuhan:** Login mudah tanpa email/password rumit, navigasi satu tangan (*thumb-friendly*), petunjuk jelas langkah demi langkah, umpan balik langsung (*immediate feedback*).

#### Persona 2: Guru Matematika / Peneliti (Secondary User)
- **Kebutuhan:** Monitoring progres belajar siswa melalui kode kelas, analisis penguasaan materi per level, hasil pretest dan posttest untuk pengukuran efektivitas media.

---

### 4. FITUR UTAMA & SPESIFIKASI SISTEM

#### 4.1 Modul Autentikasi Siswa
- **Mekanisme Login:** Kode Siswa unik (contoh: `SA8A01` = Statistika Adventure Kelas 8A No 01) yang dibuat oleh guru/sistem.
- **Tanpa Email & Password Kompleks:** Mencegah hambatan login bagi siswa SMP.
- **Validasi Keamanan:** Backend memverifikasi kode siswa dan mengembalikan status aktif, nama lengkap, kelas, serta session token (JWT ringan).

#### 4.2 Dashboard & Peta Petualangan (Adventure Map)
- **Dashboard:** Menampilkan nama siswa, avatar gamifikasi, perolehan XP, level saat ini, koleksi lencana (*badges*), dan progress bar keseluruhan.
- **8 Level Peta Petualangan:**
  1. *Level 1 - Gerbang Statistika:* Pengenalan data, populasi, dan sampel.
  2. *Level 2 - Pengelompokan Data:* Tabel frekuensi dan data tunggal vs berkelompok sederhana.
  3. *Level 3 - Lab Visualisasi:* Diagram Batang, Garis, dan Lingkaran.
  4. *Level 4 - Menara Mean:* Rata-rata hitung dan fenomena nilai ekstrem.
  5. *Level 5 - Jembatan Median:* Nilai tengah data ganjil dan genap.
  6. *Level 6 - Lembah Modus:* Nilai yang paling sering muncul dan kegunaannya.
  7. *Level 7 - Analisis & Interpretasi:* Membaca tren, anomali, dan kesimpulan data.
  8. *Level 8 - Benteng Literasi:* Tantangan skenario kontekstual berbasis studi kasus nyata.

#### 4.3 Laboratorium Visualisasi 2D & 3D (Three.js & Canvas)
- **Fitur Visual:**
  - Grafik Batang 2D (SVG/Canvas) & 3D (Three.js Voxel/Cylinder Mesh dengan pencahayaan dinamis).
  - Diagram Lingkaran 2D & 3D (Pie / Donut 3D dengan segmen interaktif yang terangkat saat diklik).
  - Grafik Garis 2D & 3D (Plot titik koordinat 3D dengan kurva garis dinamis).
- **Interaktivitas:**
  - Slider dan form input data real-time.
  - Simulasi dinamis Mean, Median, Modus (titik tumpu keseimbangan untuk Mean).
  - Kontrol kamera 3D: Rotasi orbit 360°, zoom in/out, reset kamera.
  - Toggle Switch: Mode 2D (fokus kejelasan) vs Mode 3D (fokus spasial dan keterlibatan visual).
- **Optimasi Mobile:** Render capped pada 60 FPS, downscaling resolusi pada low-end device, pembersihan memori WebGL saat unmount.

#### 4.4 Modul Materi dengan Prinsip Cognitive Load Theory
- **Segmentasi Informasi:** Tampilan kartu materi bertahap (*slide/step-based*) dengan tombol "Lanjut" setelah siswa membaca/mencoba interaksi.
- **Signaling:** Highlighter visual pada kata kunci rumus, konsep esensial, dan angka kunci pada grafik.
- **Worked Examples:** Contoh soal diselesaikan langkah demi langkah (*step-by-step calculation*) sebelum siswa diminta berlatih mandiri.

#### 4.5 Modul Tantangan & Evaluasi
- **Kategori Evaluasi:**
  1. *Pretest:* 10 soal diagnostik literasi matematis awal.
  2. *Latihan Per Level:* 3-5 soal formatif interaktif langsung dengan umpan balik dan pembahasan.
  3. *Posttest:* 10 soal sumatif setara pretest untuk mengukur *N-Gain score*.
- **Jenis Soal Literasi Matematis:** Kontekstual (data kantin sekolah, uang saku, jam tidur vs nilai, pengunjung perpustakaan).
- **Mekanisme Umpan Balik:** Menjelaskan mengapa opsi yang dipilih benar atau salah beserta konsep perbaikannya.

#### 4.6 Game Mechanics (Gamifikasi Pedagogis)
- **Experience Points (XP):** Diberikan setelah membaca materi (+20 XP), menyelesaikan latihan (+50 XP), dan evaluasi (+100 XP).
- **Badges (Lencana Prestasi):**
  - *Data Scout:* Menyelesaikan Level 1-2.
  - *Master of Charts:* Mencoba semua visualisasi di Laboratorium 3D.
  - *Balance Keeper:* Memahami konsep Mean dan titik keseimbangan.
  - *Grand Data Hero:* Menyelesaikan seluruh level dan posttest.
- **Anti-Stress Design:** Tidak ada papan peringkat global (*leaderboard*) publik antar-siswa untuk mencegah tekanan mental; fokus pada *self-improvement* dan grafik perkembangan diri siswa.

---

### 5. PERSYARATAN NON-FUNGSIONAL (NFR)
1. **Performa:** Waktu buka awal (*first contentful paint*) < 2.5 detik pada jaringan 4G. Ukuran bundle JavaScript dioptimalkan melalui *code splitting*.
2. **Kompatibilitas:** Responsif penuh pada resolusi smartphone Android dari 360x640px hingga 412x915px (Chrome Android v90+).
3. **Keamanan:** Autentikasi kode siswa dengan enkripsi token JWT, penerapan PostgreSQL Row Level Security (RLS) pada Supabase, sanitasi input untuk mencegah XSS/SQL Injection.
4. **Aksesibilitas & Keterbacaan:** Kontras warna memenuhi standar WCAG 2.1 Level AA, ukuran target sentuh (*touch target*) minimal 48x48px, tipografi font sans-serif ramah anak (Plus Jakarta Sans/Inter).
5. **Offline/Fault Tolerance:** Penanganan status jaringan ketika koneksi lambat dengan loading skeleton dan pesan error ramah pengguna.

---

### 6. BATASAN & ASUMSI SISTEM
- **Asumsi Koneksi:** Pengguna memiliki akses internet berkala untuk sinkronisasi data progres ke Supabase.
- **Asumsi Perangkat:** Smartphone siswa mendukung WebGL 1.0/2.0 untuk rendering Three.js. Jika WebGL tidak didukung, fallback otomatis disediakan ke visualisasi 2D berbasis SVG/Canvas.
- **Bahasa:** Seluruh konten instruksional, soal, dan UI menggunakan Bahasa Indonesia baku yang komunikatif dan ramah siswa SMP.
