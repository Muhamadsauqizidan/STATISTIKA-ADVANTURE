-- ==============================================================================
-- DATABASE SEED DATA: STATISTIKA ADVENTURE
-- Platform: Supabase PostgreSQL
-- Specification: MATERIAL_KISI_KISI.md, DATABASE.md
-- ==============================================================================

-- 1. SEED STUDENTS (Akun Demo Siswa Kelas VIII)
INSERT INTO students (id, student_code, name, class_name, school_name, total_xp, current_level, avatar_seed) VALUES
('c1f7b8a0-2f3b-4e8c-8c9a-1e5b8c9a0001', 'SA8A01', 'Budi Santoso', '8A', 'SMP Negeri 1 Matematika', 450, 2, 'budi'),
('c1f7b8a0-2f3b-4e8c-8c9a-1e5b8c9a0002', 'SA8A02', 'Siti Aminah', '8A', 'SMP Negeri 1 Matematika', 1250, 5, 'siti'),
('c1f7b8a0-2f3b-4e8c-8c9a-1e5b8c9a0003', 'SA8B01', 'Rizky Pratama', '8B', 'SMP Negeri 1 Matematika', 2400, 8, 'rizky')
ON CONFLICT (student_code) DO UPDATE SET
    name = EXCLUDED.name,
    class_name = EXCLUDED.class_name,
    total_xp = EXCLUDED.total_xp,
    current_level = EXCLUDED.current_level;

-- 2. SEED BADGES (Master Lencana Penghargaan Gamifikasi)
INSERT INTO badges (id, badge_code, name, description, icon, xp_required) VALUES
('b1000000-0000-0000-0000-000000000001', 'DATA_SCOUT', 'Penjelajah Data', 'Menyelesaikan Level 1 dan memahami konsep data, populasi, dan sampel.', '🧭', 100),
('b1000000-0000-0000-0000-000000000002', 'CHART_MASTER', 'Arsitek Diagram', 'Mencoba semua model grafik 2D dan 3D di Laboratorium Visualisasi.', '📊', 250),
('b1000000-0000-0000-0000-000000000003', 'BALANCE_KEEPER', 'Penjaga Keseimbangan', 'Memahami cara kerja nilai Mean pada simulasi timbangan data.', '⚖️', 500),
('b1000000-0000-0000-0000-000000000004', 'MEDIAN_HUNTER', 'Pemburu Nilai Tengah', 'Berhasil mengurutkan data genap dan menemukan median dengan cepat.', '🎯', 750),
('b1000000-0000-0000-0000-000000000005', 'TREND_SETTER', 'Ahli Modus', 'Membantu penjaga kantin menentukan minuman terlaris menggunakan modus.', '🔥', 1000),
('b1000000-0000-0000-0000-000000000006', 'GRAND_HERO', 'Pahlawan Statistika', 'Menyelesaikan seluruh 8 level petualangan dan menuntaskan Posttest.', '👑', 2000)
ON CONFLICT (badge_code) DO NOTHING;

-- 3. SEED MATERIALS (8 Level Silabus Pembelajaran)
INSERT INTO materials (id, level_number, title, subtitle, description, icon, learning_objectives, xp_reward, slides) VALUES
(1, 1, 'Mengenal Statistika', 'Data, Populasi, dan Sampel', 'Memahami apa itu data dan cara menentukan sampel yang adil tanpa bias.', 'Compass',
 ARRAY['Membedakan data, populasi, dan sampel.', 'Menentukan sampel representatif dari lingkungan sekolah.'], 100,
 '[
   {
     "step": 1,
     "title": "Apa itu Statistika & Data?",
     "badge": "Konsep Dasar",
     "icon": "📊",
     "content": "Statistika adalah ilmu yang mempelajari cara mengumpulkan, mengolah, menyajikan, menganalisis, dan menarik kesimpulan dari data.",
     "highlight": "Data adalah kumpulan fakta atau informasi berupa angka atau kategori yang diperoleh melalui pengamatan langsung.",
     "example": "Contoh: Nomor ukuran sepatu teman sekelas, nilai ulangan, atau menu minuman paling disukai di kantin sekolah."
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
     "title": "Worked Example: Survei Minat Buku",
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
     "feedback": "Tepat sekali! Memilih secara acak dari seluruh kelas VIII menjamin keterwakilan tanpa bias tinggi badan kelompok atlet basket."
   }
 ]'::jsonb),

(2, 2, 'Pengelompokan Data', 'Tabel Distribusi Frekuensi & Turus', 'Mengubah data mentah menjadi tabel frekuensi yang teratur dan mudah dibaca.', 'Table',
 ARRAY['Menyusun data mentah ke dalam tabel turus (tally).', 'Membaca dan membuat tabel distribusi frekuensi tunggal.'], 120,
 '[
   {
     "step": 1,
     "title": "Mengapa Data Perlu Dikelompokkan?",
     "badge": "Pengorganisasian",
     "icon": "📋",
     "content": "Data mentah yang berserakan sangat sulit dibaca polanya. Dengan tabel distribusi frekuensi, kita bisa langsung melihat nilai mana yang paling banyak muncul.",
     "highlight": "Frekuensi menyatakan seberapa sering suatu nilai muncul dalam kumpulan data."
   },
   {
     "step": 2,
     "title": "Metode Turus (Tally Marks)",
     "badge": "Prosedur Menghitung",
     "icon": "✏️",
     "content": "Turus adalah cara mencatat kemunculan data menggunakan garis tegak dan miring setiap kelipatan 5.",
     "example": "Contoh: Data ukuran sepatu 12 siswa: 37, 38, 39, 38, 40, 38, 37, 39, 41, 38, 39, 38. Ukuran 38 muncul 5 kali (|||| garis silang)."
   },
   {
     "step": 3,
     "title": "Verifikasi Jumlah Total Frekuensi",
     "badge": "Prinsip Ketelitian",
     "icon": "✅",
     "content": "Langkah wajib setelah membuat tabel frekuensi adalah menjumlahkan seluruh kolom frekuensi.",
     "highlight": "Total Frekuensi (∑f) HARUS persis sama dengan banyaknya data awal (n)."
   }
 ]'::jsonb),

(3, 3, 'Penyajian Data', 'Diagram Batang, Garis, dan Lingkaran', 'Mengeksplorasi visualisasi data 2D dan 3D interaktif di laboratorium.', 'BarChart3',
 ARRAY['Memilih diagram yang sesuai dengan karakteristik data.', 'Menghitung proporsi derajat dan persentase diagram lingkaran.'], 150,
 '[
   {
     "step": 1,
     "title": "Tiga Bentuk Visualisasi Utama",
     "badge": "Klasifikasi Grafik",
     "icon": "📈",
     "content": "Setiap jenis diagram memiliki keunggulan tersendiri tergantung pertanyaan yang ingin dijawab:",
     "breakdown": [
       {"term": "Diagram Batang", "desc": "Terbaik untuk membandingkan jumlah antar kategori berbeda (misal: hobi olahraga)."},
       {"term": "Diagram Garis", "desc": "Terbaik untuk melihat tren perubahan dari waktu ke waktu (misal: suhu atau pengunjung perpustakaan)."},
       {"term": "Diagram Lingkaran", "desc": "Terbaik untuk membandingkan proporsi atau bagian terhadap keseluruhan 100% atau 360°."}
     ]
   },
   {
     "step": 2,
     "title": "Kalkulasi Sudut Diagram Lingkaran",
     "badge": "Rumus Matematika",
     "icon": "🥧",
     "content": "Untuk membagi lingkaran menjadi juring sudut:",
     "highlight": "Sudut Juring = (Frekuensi Kategori ÷ Total Frekuensi) × 360°",
     "example": "Jika 15 dari 60 siswa menyukai Jus Jeruk: (15 ÷ 60) × 360° = 0.25 × 360° = 90° (tepat seperempat lingkaran)."
   }
 ]'::jsonb),

(4, 4, 'Menara Mean (Rata-rata)', 'Rata-rata Hitung & Bahaya Nilai Ekstrem', 'Menemukan titik keseimbangan data dan menguji ketahanan terhadap nilai pencilan (outlier).', 'Scale',
 ARRAY['Menghitung nilai rata-rata (mean) data tunggal.', 'Menjelaskan dampak data pencilan terhadap nilai mean.'], 180,
 '[
   {
     "step": 1,
     "title": "Apa itu Mean?",
     "badge": "Definisi Konseptual",
     "icon": "⚖️",
     "content": "Mean adalah nilai rata-rata yang mewakili kumpulan data jika seluruh nilai dikumpulkan lalu dibagi rata secara adil kepada setiap anggota.",
     "highlight": "Mean (x̄) = Jumlah Seluruh Nilai Data ÷ Banyaknya Data (n)"
   },
   {
     "step": 2,
     "title": "Worked Example: Rata-rata Uang Saku",
     "badge": "Perhitungan Nyata",
     "icon": "💵",
     "content": "Uang saku Budi selama 5 hari: Rp10.000, Rp12.000, Rp10.000, Rp8.000, Rp10.000.",
     "steps": [
       "Langkah 1: Jumlahkan = 10.000 + 12.000 + 10.000 + 8.000 + 10.000 = Rp50.000",
       "Langkah 2: Banyak data = 5 hari",
       "Langkah 3: Mean = 50.000 ÷ 5 = Rp10.000/hari"
     ]
   },
   {
     "step": 3,
     "title": "Bahaya Pencilan (Outlier)!",
     "badge": "Literasi Kritis",
     "icon": "🚨",
     "content": "Bagaimana jika pada hari ke-6 Budi diberi hadiah Rp100.000? Jumlah uang = Rp150.000 untuk 6 hari. Mean melonjak menjadi Rp25.000/hari!",
     "warning": "Kelemahan Mean: Sangat mudah terdistorsi oleh satu nilai yang terlampau tinggi atau rendah (outlier)."
   }
 ]'::jsonb),

(5, 5, 'Jembatan Median', 'Nilai Tengah Data Terurut', 'Mengurutkan data dan menemukan nilai tepat di posisi tengah (ganjil & genap).', 'GitCommit',
 ARRAY['Menentukan median dari data berukuran ganjil.', 'Menentukan median dari data berukuran genap.'], 180,
 '[
   {
     "step": 1,
     "title": "Kunci Utama Median: URUTKAN DATA!",
     "badge": "Prinsip Emas",
     "icon": "📏",
     "content": "Median adalah nilai yang membagi data menjadi dua bagian yang sama banyak setelah data diurutkan dari yang terkecil hingga terbesar.",
     "highlight": "Data TIDAK BISA langsung dicari mediannya sebelum diurutkan!"
   },
   {
     "step": 2,
     "title": "Kasus 1: Banyak Data Ganjil",
     "badge": "Contoh Ganjil",
     "icon": "1️⃣",
     "content": "Data nilai matematika 5 siswa: 85, 70, 90, 75, 80.",
     "steps": [
       "Langkah 1: Urutkan = 70, 75, [80], 85, 90",
       "Langkah 2: Nilai tepat di tengah adalah 80.",
       "Median = 80."
     ]
   },
   {
     "step": 3,
     "title": "Kasus 2: Banyak Data Genap",
     "badge": "Contoh Genap",
     "icon": "2️⃣",
     "content": "Data nilai 6 siswa: 70, 75, 80, 85, 90, 95.",
     "steps": [
       "Dua nilai di tengah adalah 80 dan 85.",
       "Median = (80 + 85) ÷ 2 = 82.5."
     ]
   }
 ]'::jsonb),

(6, 6, 'Lembah Modus', 'Frekuensi Terbanyak & Stok Toko', 'Menentukan nilai paling populer untuk membantu keputusan bisnis kantin sekolah.', 'Flame',
 ARRAY['Menentukan modus dari kumpulan data tunggal.', 'Menggunakan modus dalam pengambilan keputusan bisnis nyata.'], 180,
 '[
   {
     "step": 1,
     "title": "Apa itu Modus?",
     "badge": "Konsep Inti",
     "icon": "🔥",
     "content": "Modus adalah nilai atau kategori yang paling sering muncul (memiliki frekuensi tertinggi) dalam kumpulan data.",
     "highlight": "Suatu kumpulan data bisa memiliki satu modus (unimodal), dua modus (bimodal), atau tidak memiliki modus sama sekali jika semua frekuensinya sama."
   },
   {
     "step": 2,
     "title": "Aplikasi Modus di Dunia Nyata",
     "badge": "Kasus Kantin",
     "icon": "🧃",
     "content": "Penjaga kantin mencatat penjualan minuman harian: Teh Kotak (25), Susu Cokelat (42), Air Mineral (30), Jus Apel (15).",
     "steps": [
       "Modus penjualan adalah Susu Cokelat (frekuensi tertinggi = 42 botol).",
       "Keputusan: Pemilik kantin harus memesan stok Susu Cokelat paling banyak agar tidak kehabisan pembeli."
     ]
   }
 ]'::jsonb),

(7, 7, 'Analisis & Interpretasi', 'Membaca Makna & Mengambil Keputusan', 'Membandingkan mean, median, dan modus pada kasus nyata untuk kesimpulan terbaik.', 'LineChart',
 ARRAY['Mengevaluasi kesesuaian mean vs median pada distribusi miring.', 'Menarik kesimpulan objektif berbasis data.'], 200,
 '[
   {
     "step": 1,
     "title": "Kapan Memilih Mean vs Median vs Modus?",
     "badge": "Panduan Keputusan",
     "icon": "🧭",
     "content": "Setiap ukuran pemusatan memiliki momen terbaiknya:",
     "breakdown": [
       {"term": "Gunakan Mean", "desc": "Jika data tersebar merata dan tidak ada nilai pencilan yang mencolok."},
       {"term": "Gunakan Median", "desc": "Jika ada nilai ekstrem (sangat tinggi atau sangat rendah) yang merusak rata-rata."},
       {"term": "Gunakan Modus", "desc": "Jika data bertipe kategori (warna, ukuran, merek) atau ingin mengetahui preferensi terbanyak."}
     ]
   }
 ]'::jsonb),

(8, 8, 'Benteng Literasi Data', 'Tantangan Komprehensif PISA', 'Uji kehebatanmu merumuskan, menerapkan, dan mengevaluasi data dunia nyata!', 'ShieldAlert',
 ARRAY['Menyelesaikan masalah kontekstual multi-tahap.', 'Mengintegrasikan perumusan, penerapan, dan interpretasi matematis.'], 300,
 '[
   {
     "step": 1,
     "title": "Misi Akhir Petualangan!",
     "badge": "Tantangan Puncak",
     "icon": "🏆",
     "content": "Kamu telah menjelajahi seluruh konsep dasar statistika. Di level ini, kamu akan menghadapi skenario nyata seorang peneliti muda yang membantu sekolah mengambil kebijakan berdasarkan data perpustakaan dan nilai siswa.",
     "highlight": "Gunakan ketiga dimensi literasimu: Merumuskan masalah, Menerapkan konsep hitung, dan Mengevaluasi keputusan."
   }
 ]'::jsonb)
ON CONFLICT (level_number) DO UPDATE SET
    title = EXCLUDED.title,
    subtitle = EXCLUDED.subtitle,
    description = EXCLUDED.description,
    learning_objectives = EXCLUDED.learning_objectives,
    slides = EXCLUDED.slides;

-- 4. SEED QUESTIONS (10 Soal Pretest & Posttest Berdasarkan Kisi-Kisi PISA)
INSERT INTO questions (id, material_id, evaluation_type, question_text, context_data, options, correct_option, mathematical_literacy_dimension, explanation, points) VALUES
('q1000000-0000-0000-0000-000000000001', 1, 'pretest',
 'Pengelola kantin SMP Prestasi ingin mengetahui minuman favorit siswa untuk disiapkan di awal tahun ajaran baru. Sekolah memiliki 720 siswa yang terbagi dalam kelas 7, 8, dan 9. Cara manakah yang paling representatif untuk mengambil sampel penelitian tersebut?',
 '{"topic": "Survei Minuman Kantin", "population": 720}'::jsonb,
 '[
   {"id": "A", "text": "Menanyai seluruh anggota tim basket putra saat jam latihan."},
   {"id": "B", "text": "Menanyai 30 siswa yang sedang mengantre di depan satu stan jus saja."},
   {"id": "C", "text": "Memilih secara acak 20 siswa dari masing-masing tingkatan kelas (total 60 siswa)."},
   {"id": "D", "text": "Hanya menanyai pengurus OSIS saat rapat mingguan."}
 ]'::jsonb,
 'C', 'FORMULATE',
 'Sampel yang baik harus adil dan mewakili seluruh strata populasi (kelas 7, 8, dan 9) secara acak tanpa bias kelompok tertentu.', 10),

('q1000000-0000-0000-0000-000000000002', 3, 'pretest',
 'Data jenis olahraga favorit siswa kelas 8A adalah: Futsal (12 siswa), Badminton (8 siswa), Basket (6 siswa), dan Renang (4 siswa). Jika disajikan dalam diagram lingkaran, berapakah besar sudut juring untuk olahraga Futsal?',
 '{"total": 30, "futsal": 12}'::jsonb,
 '[
   {"id": "A", "text": "120°"},
   {"id": "B", "text": "144°"},
   {"id": "C", "text": "150°"},
   {"id": "D", "text": "72°"}
 ]'::jsonb,
 'B', 'EMPLOY',
 'Total siswa = 12 + 8 + 6 + 4 = 30 siswa. Sudut juring Futsal = (12 ÷ 30) × 360° = 0.4 × 360° = 144°.', 10),

('q1000000-0000-0000-0000-000000000003', 3, 'pretest',
 'Grafik garis menunjukkan jumlah pengunjung perpustakaan dari hari Senin hingga Sabtu: Senin (45), Selasa (50), Rabu (35), Kamis (60), Jumat (40), dan Sabtu (75). Pada hari apakah terjadi kenaikan jumlah pengunjung paling tajam dibandingkan hari sebelumnya?',
 '{"data": [45, 50, 35, 60, 40, 75]}'::jsonb,
 '[
   {"id": "A", "text": "Sabtu (naik 35 orang)"},
   {"id": "B", "text": "Kamis (naik 25 orang)"},
   {"id": "C", "text": "Selasa (naik 5 orang)"},
   {"id": "D", "text": "Senin"}
 ]'::jsonb,
 'A', 'INTERPRET',
 'Kenaikan terbesar terjadi pada hari Sabtu: 75 - 40 = 35 orang pengunjung bertambah dari hari Jumat.', 10),

('q1000000-0000-0000-0000-000000000004', 4, 'pretest',
 'Nilai ulangan matematika 6 siswa adalah: 75, 80, 85, 90, 70, dan 80. Berapakah nilai rata-rata (mean) dari keenam siswa tersebut?',
 '{"scores": [75, 80, 85, 90, 70, 80]}'::jsonb,
 '[
   {"id": "A", "text": "78.5"},
   {"id": "B", "text": "80.0"},
   {"id": "C", "text": "81.5"},
   {"id": "D", "text": "82.0"}
 ]'::jsonb,
 'B', 'EMPLOY',
 'Mean = (75 + 80 + 85 + 90 + 70 + 80) ÷ 6 = 480 ÷ 6 = 80.0.', 10),

('q1000000-0000-0000-0000-000000000005', 5, 'pretest',
 'Catatan pengeluaran uang jajan harian Rian selama 7 hari berturut-turut adalah: Rp12.000, Rp10.000, Rp15.000, Rp10.000, Rp8.000, Rp14.000, Rp11.000. Berapakah nilai median dari pengeluaran uang jajan Rian?',
 '{"money": [12000, 10000, 15000, 10000, 8000, 14000, 11000]}'::jsonb,
 '[
   {"id": "A", "text": "Rp10.000"},
   {"id": "B", "text": "Rp10.500"},
   {"id": "C", "text": "Rp11.000"},
   {"id": "D", "text": "Rp12.000"}
 ]'::jsonb,
 'C', 'EMPLOY',
 'Data diurutkan dari terkecil: 8.000, 10.000, 10.000, [11.000], 12.000, 14.000, 15.000. Nilai tengah ke-4 adalah Rp11.000.', 10),

('q1000000-0000-0000-0000-000000000006', 6, 'pretest',
 'Seorang pemilik toko sepatu mencatat nomor sepatu yang terjual dalam seminggu: 38, 39, 40, 39, 41, 39, 38, 42, 39, 40. Berapakah modus dari nomor sepatu yang terjual dan apa maknanya bagi pemilik toko?',
 '{"shoes": [38, 39, 40, 39, 41, 39, 38, 42, 39, 40]}'::jsonb,
 '[
   {"id": "A", "text": "Modus = 38; pemilik toko harus menyetok lebih banyak ukuran 38."},
   {"id": "B", "text": "Modus = 40; pembeli rata-rata bertelapak kaki besar."},
   {"id": "C", "text": "Modus = 41; ukuran 41 paling jarang dibeli."},
   {"id": "D", "text": "Modus = 39; ukuran 39 paling laris sehingga persediaannya harus diperbanyak."}
 ]'::jsonb,
 'D', 'INTERPRET',
 'Ukuran 39 muncul paling sering (4 kali). Artinya ukuran 39 adalah ukuran paling diminati pelanggan.', 10),

('q1000000-0000-0000-0000-000000000007', 4, 'pretest',
 'Lima siswa mencatat durasi belajar mandiri harian mereka: 2 jam, 3 jam, 1 jam, 2 jam, dan 2 jam. Jika siswa ke-6 yang belajar selama 8 jam bergabung dalam kelompok, bagaimanakah perubahan nilai rata-rata (mean) durasi belajar mereka?',
 '{"before": [2, 3, 1, 2, 2], "added": 8}'::jsonb,
 '[
   {"id": "A", "text": "Nilai rata-rata tetap 2 jam."},
   {"id": "B", "text": "Nilai rata-rata meningkat dari 2 jam menjadi 3 jam."},
   {"id": "C", "text": "Nilai rata-rata menurun menjadi 1.5 jam."},
   {"id": "D", "text": "Nilai rata-rata meningkat drastis menjadi 5 jam."}
 ]'::jsonb,
 'B', 'EMPLOY',
 'Mean awal = (2 + 3 + 1 + 2 + 2) ÷ 5 = 10 ÷ 5 = 2 jam. Mean baru = (10 + 8) ÷ 6 = 18 ÷ 6 = 3 jam. Terjadi kenaikan 1 jam.', 10),

('q1000000-0000-0000-0000-000000000008', 3, 'pretest',
 'Diagram lingkaran menunjukkan kegiatan ekstrakurikuler yang diikuti 120 siswa. Pramuka (40%), PMR (25%), Robotik (15%), dan Seni Musik (20%). Berapakah jumlah siswa yang mengikuti ekstrakurikuler Robotik?',
 '{"total": 120, "robotik_pct": 15}'::jsonb,
 '[
   {"id": "A", "text": "18 siswa"},
   {"id": "B", "text": "15 siswa"},
   {"id": "C", "text": "24 siswa"},
   {"id": "D", "text": "30 siswa"}
 ]'::jsonb,
 'A', 'EMPLOY',
 'Jumlah siswa Robotik = 15% × 120 = 0.15 × 120 = 18 siswa.', 10),

('q1000000-0000-0000-0000-000000000009', 7, 'pretest',
 'Lima orang pekerja di sebuah usaha sablon memiliki upah harian: Rp80.000, Rp85.000, Rp80.000, Rp90.000, dan pemilik usaha menerima Rp500.000 per hari. Mengapa nilai median lebih tepat digunakan daripada nilai mean untuk menggambarkan upah pekerja biasa pada usaha tersebut?',
 '{"wages": [80000, 85000, 80000, 90000, 500000]}'::jsonb,
 '[
   {"id": "A", "text": "Karena nilai mean selalu menghasilkan angka pecahan yang rumit."},
   {"id": "B", "text": "Karena nilai median selalu bernilai lebih besar daripada mean."},
   {"id": "C", "text": "Karena nilai mean sangat terpengaruh oleh upah pemilik usaha yang bernilai ekstrem tinggi, sehingga tidak mencerminkan upah pekerja kebanyakan."},
   {"id": "D", "text": "Karena nilai median tidak memerlukan proses pengurutan data."}
 ]'::jsonb,
 'C', 'INTERPRET',
 'Mean sangat sensitif terhadap pencilan (outlier) Rp500.000 yang mengerek rata-rata menjadi Rp167.000, padahal tidak ada satupun pekerja biasa yang menerima gaji setinggi itu.', 10),

('q1000000-0000-0000-0000-000000000010', 8, 'pretest',
 'Kelas 8A memiliki rata-rata nilai 78 dengan nilai terendah 74 dan tertinggi 82. Kelas 8B memiliki rata-rata nilai 78 dengan nilai terendah 55 dan tertinggi 98. Jika sekolah ingin memilih kelas dengan kemampuan matematika yang paling merata dan stabil, kelas manakah yang sebaiknya dipilih?',
 '{"classA": {"mean": 78, "min": 74, "max": 82}, "classB": {"mean": 78, "min": 55, "max": 98}}'::jsonb,
 '[
   {"id": "A", "text": "Kelas 8B, karena memiliki siswa peraih nilai 98."},
   {"id": "B", "text": "Kedua kelas sama saja karena memiliki nilai rata-rata yang sama persis yaitu 78."},
   {"id": "C", "text": "Tidak dapat ditentukan tanpa mengetahui jumlah murid masing-masing kelas."},
   {"id": "D", "text": "Kelas 8A, karena jangkauan nilainya (82 - 74 = 8) jauh lebih kecil sehingga kemampuan siswanya lebih merata dan homogen."}
 ]'::jsonb,
 'D', 'INTERPRET',
 'Jangkauan (range) nilai kelas 8A hanya 8 poin, sedangkan kelas 8B mencapai 43 poin. Kelas 8A jauh lebih konsisten dan merata.', 10)
ON CONFLICT (id) DO NOTHING;

-- 5. SEED INITIAL PROGRESS UNTUK SISWA DEMO
INSERT INTO student_progress (student_id, level_number, status, stars, completed_at) VALUES
('c1f7b8a0-2f3b-4e8c-8c9a-1e5b8c9a0001', 1, 'COMPLETED', 3, NOW() - INTERVAL '1 day'),
('c1f7b8a0-2f3b-4e8c-8c9a-1e5b8c9a0001', 2, 'IN_PROGRESS', 0, NULL),
('c1f7b8a0-2f3b-4e8c-8c9a-1e5b8c9a0002', 1, 'COMPLETED', 3, NOW() - INTERVAL '4 days'),
('c1f7b8a0-2f3b-4e8c-8c9a-1e5b8c9a0002', 2, 'COMPLETED', 3, NOW() - INTERVAL '3 days'),
('c1f7b8a0-2f3b-4e8c-8c9a-1e5b8c9a0002', 3, 'COMPLETED', 2, NOW() - INTERVAL '2 days'),
('c1f7b8a0-2f3b-4e8c-8c9a-1e5b8c9a0002', 4, 'COMPLETED', 3, NOW() - INTERVAL '1 day'),
('c1f7b8a0-2f3b-4e8c-8c9a-1e5b8c9a0002', 5, 'IN_PROGRESS', 0, NULL)
ON CONFLICT (student_id, level_number) DO NOTHING;

-- 6. SEED INITIAL BADGES UNTUK SISWA DEMO
INSERT INTO student_badges (student_id, badge_id, unlocked_at) VALUES
('c1f7b8a0-2f3b-4e8c-8c9a-1e5b8c9a0001', 'b1000000-0000-0000-0000-000000000001', NOW() - INTERVAL '1 day'),
('c1f7b8a0-2f3b-4e8c-8c9a-1e5b8c9a0001', 'b1000000-0000-0000-0000-000000000002', NOW() - INTERVAL '1 day'),
('c1f7b8a0-2f3b-4e8c-8c9a-1e5b8c9a0002', 'b1000000-0000-0000-0000-000000000001', NOW() - INTERVAL '4 days'),
('c1f7b8a0-2f3b-4e8c-8c9a-1e5b8c9a0002', 'b1000000-0000-0000-0000-000000000002', NOW() - INTERVAL '3 days'),
('c1f7b8a0-2f3b-4e8c-8c9a-1e5b8c9a0002', 'b1000000-0000-0000-0000-000000000003', NOW() - INTERVAL '2 days'),
('c1f7b8a0-2f3b-4e8c-8c9a-1e5b8c9a0002', 'b1000000-0000-0000-0000-000000000004', NOW() - INTERVAL '1 day')
ON CONFLICT (student_id, badge_id) DO NOTHING;
