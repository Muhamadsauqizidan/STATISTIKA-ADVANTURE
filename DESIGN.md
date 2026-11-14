Get-ChildItem .\src -Recurse -File | Select-String -Pattern "Peta Petualangan|Pengelompokan Data|Tersedia Sekarang"# UI/UX DESIGN SYSTEM SPECIFICATION (DESIGN.md)
## STATISTIKA ADVENTURE: Desain Antarmuka Mobile-First & Game Edukasi

---

### 1. FILOSOFI & ARAH DESAIN
Desain antarmuka **STATISTIKA ADVENTURE** menggabungkan estetika **Modern Educational Game** dengan prinsip **Cognitive Load Theory (CLT)**. Pendekatan ini menghasilkan antarmuka yang membangkitkan rasa ingin tahu siswa SMP kelas VIII tanpa menimbulkan distraksi kognitif yang mengganggu pemahaman konsep matematika.

#### Pilar Desain:
1. **Mobile-First & Thumb-Friendly:** Seluruh tombol penting, kontrol navigasi, dan tombol aksi (*CTA*) berada di zona jangkauan ibu jari (*thumb zone*).
2. **Playful yet Purposeful:** Sentuhan game modern (kartu melengkung, badge mengkilap, partikel halus) tetap mengutamakan kejelasan teks dan grafik matematika.
3. **Cognitive Clarity:** Informasi disajikan secara terpotong-potong (*segmented card layout*), dengan penandaan warna khusus (*signaling*) untuk rumus dan data penting.
4. **Accessible & High-Contrast:** Rasio kontras teks memenuhi standar WCAG AA agar mudah dibaca di bawah pencahayaan layar smartphone yang bervariasi.

---

### 2. DESIGN TOKENS

#### 2.1 Palet Warna (Color Palette)
| Nama Warna | Kode HEX | Peran dalam Antarmuka |
| :--- | :--- | :--- |
| **Deep Space Navy** | `#0F172A` (Slate 900) | Latar belakang utama (mengurangi kelelahan mata / eye strain) |
| **Surface Card** | `#1E293B` (Slate 800) | Latar belakang kartu materi dan kontainer komponen |
| **Surface Elevated** | `#334155` (Slate 700) | Batas kartu dan kontainer sekunder |
| **Electric Indigo** | `#6366F1` (Indigo 500) | Warna tema primer (navigasi, tombol aksi utama) |
| **Neon Violet** | `#8B5CF6` (Purple 500) | Gradien aksen petualangan dan elemen gamifikasi |
| **Vibrant Cyan** | `#06B6D4` (Cyan 500) | Aksen visualisasi data 3D dan penandaan konsep (*signaling*) |
| **Emerald Success** | `#10B981` (Emerald 500) | Jawaban benar, perolehan XP, dan status level selesai |
| **Coral Alert** | `#F43F5E` (Rose 500) | Umpan balik jawaban salah dan peringatan |
| **Golden Amber** | `#F59E0B` (Amber 500) | Ikon bintang, piala, dan lencana prestasi (*badges*) |
| **Text Pure White** | `#F8FAFC` (Slate 50) | Teks judul utama (*headings*) |
| **Text Muted Gray** | `#94A3B8` (Slate 400) | Teks keterangan pendukung dan label sekunder |

#### 2.2 Tipografi (Typography)
- **Primary Font Family:** `'Plus Jakarta Sans', 'Inter', -apple-system, sans-serif`
  - Font geometris sans-serif dengan legibilitas tinggi pada resolusi layar smartphone kecil.
- **Hierarki Tipografi:**
  - `Display / Level Title`: 24px - 28px (Bold 700, Line-height 1.2)
  - `H1 / Page Title`: 20px - 22px (Bold 700, Line-height 1.3)
  - `H2 / Section Title`: 16px - 18px (Semi-Bold 600, Line-height 1.4)
  - `Body / Story Text`: 14px - 15px (Regular 400 & Medium 500, Line-height 1.6)
  - `Caption / Microcopy`: 11px - 12px (Regular 400, Line-height 1.4)
  - `Math Equations`: Monospace/Sans tebal berlatar kontras dengan ukuran minimal 16px.

#### 2.3 Radius & Elevasi (Border Radius & Shadows)
- **Card Radius:** `rounded-2xl` (16px) hingga `rounded-3xl` (24px) untuk kesan ramah anak (*friendly & safe*).
- **Button Radius:** `rounded-xl` (12px) hingga `rounded-full` (capsule style).
- **Shadows:** Bayangan halus dengan sedikit *glow* warna aksen:
  - `box-shadow: 0 10px 25px -5px rgba(99, 102, 241, 0.25)`

---

### 3. TATA LETAK & NAVIGASI MOBILE (360px - 412px VIEWPORT)

#### 3.1 Mobile Container Shell
- Seluruh antarmuka dioptimalkan dengan lebar maksimal `max-w-md` (maksimal 448px) yang terpusat di layar komputer/tablet, dan memenuhi layar 100% pada smartphone Android.
- Safe Area Inset didukung untuk menghindari terpotongnya konten oleh kamera *punch-hole* atau bilah navigasi OS Android.

#### 3.2 Bottom Navigation Bar (Bilah Navigasi Bawah)
Bilah navigasi mengambang (*floating bottom dock*) dengan 5 tombol cepat:
1. 🏠 **Beranda (Dashboard):** Ringkasan progres dan XP.
2. 🗺️ **Peta (Adventure Map):** Jalur perjalanan 8 level.
3. 🧪 **Lab 3D:** Laboratorium visualisasi interaktif data.
4. ⚔️ **Tantangan / Latihan:** Latihan literasi kontekstual.
5. 👤 **Profil:** Koleksi lencana dan statistik belajar.

---

### 4. KOMPONEN UTAMA & WIREFRAME INTERAKSI

#### 4.1 Halaman Login Kode Siswa
```
+------------------------------------------+
|  [Logo Statistika Adventure 3D Icon]     |
|  STATISTIKA ADVENTURE                    |
|  Petualangan Menjelajah Dunia Data       |
|                                          |
|  +------------------------------------+  |
|  | Masukkan Kode Siswa:               |  |
|  | [   SA8A01                        ] |  |
|  +------------------------------------+  |
|                                          |
|  [ 🚀 MULAI PETUALANGAN (Tombol Besar) ]|  |
|                                          |
|  💡 Contoh kode: SA8A01 (Tanya Gurumu)   |
+------------------------------------------+
```

#### 4.2 Peta Petualangan 8 Level (Game Journey Map)
Jalur meliuk-liuk vertikal (*vertical curved trail*) dengan node berbentuk pulau kristal:
- **Level Selesai (Completed):** Warna hijau emerald dengan bintang emas (⭐ 3/3).
- **Level Aktif (Current):** Efek pulsasi (*pulsing glow effect*) warna ungu/cyan dengan tombol "Masuk Level".
- **Level Terkunci (Locked):** Warna abu-abu gelap dengan ikon gembok kecil (🔒).

#### 4.3 Laboratorium 2D & 3D (Dual-Mode Lab)
- **Top Control:** Toggle Switch `[ Mode 2D | Mode 3D ]` & Selector Jenis Grafik `[ Batang | Garis | Lingkaran ]`.
- **Center Canvas:** Area interaktif Three.js WebGL (orbit rotasi sentuh, cubit zoom) atau 2D Canvas.
- **Bottom Data Editor:** Tabel kecil yang memungkinkan siswa menambah/mengubah nilai kategori secara langsung, melihat perubahan grafik seketika.
- **Simulasi Ukuran Pemusatan:** Menampilkan balok keseimbangan (jungkat-jungkit) untuk memahami konsep Mean secara fisik.

---

### 5. IMPLEMENTASI PRINSIP COGNITIVE LOAD PADA UI
1. **Segmented Stepper (Anti-Scroll Kelelahan):** Materi tidak disajikan dalam artikel panjang ke bawah, melainkan kartu geser (*swipe/stepper*) 3-5 langkah per level.
2. **Clear Feedback State:** Tombol latihan langsung berubah warna menjadi hijau (benar) atau oranye (perlu coba lagi) disertai kotak penjelasan singkat yang muncul dari bawah (*bottom drawer*).
3. **Audio-Visual Balance:** Efek suara klik dan sukses dapat dinyalakan/dimatikan dengan satu sentuhan (*toggle mute*) di pojok kanan atas.
