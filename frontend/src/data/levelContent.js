export const LEVEL_CONTENT = {
  1: {
    levelNumber: 1,
    title: 'Mengenal Statistika',
    subtitle: 'Data, Populasi, dan Sampel',
    slides: [
      {
        title: 'Apa Itu Statistika?',
        badge: 'Level 1 • Konsep Dasar',
        icon: '🧭',
        content:
          'Statistika adalah ilmu yang mempelajari cara mengumpulkan, mengolah, menyajikan, menganalisis, dan menarik kesimpulan dari data.',
        highlight:
          'Data merupakan kumpulan fakta atau informasi yang diperoleh melalui pengamatan atau pengukuran.',
        example:
          'Contoh: nilai ulangan matematika, tinggi badan siswa kelas VIII, dan jumlah pengunjung perpustakaan.'
      },
      {
        title: 'Jenis-Jenis Data',
        badge: 'Level 1 • Klasifikasi Data',
        icon: '📋',
        content:
          'Berdasarkan sifatnya, data dibagi menjadi dua kelompok utama yang perlu dibedakan sebelum diolah.',
        breakdown: [
          {
            term: 'Data Kuantitatif (Angka)',
            desc: 'Data berbentuk bilangan yang bisa dihitung atau diukur, seperti berat badan (kg), suhu (°C), dan skor ujian.'
          },
          {
            term: 'Data Kualitatif (Kategori)',
            desc: 'Data berbentuk sifat, label, atau kategori, seperti hobi, golongan darah, dan warna favorit.'
          }
        ]
      },
      {
        title: 'Populasi vs Sampel',
        badge: 'Level 1 • Objek Penelitian',
        icon: '👥',
        content:
          'Peneliti sering kali tidak perlu memeriksa seluruh objek jika jumlahnya terlalu besar, cukup mengambil perwakilan yang adil.',
        breakdown: [
          {
            term: 'Populasi',
            desc: 'Seluruh objek atau individu yang menjadi sasaran utama penelitian.'
          },
          {
            term: 'Sampel',
            desc: 'Sebagian anggota populasi yang dipilih secara acak/adil untuk mewakili karakteristik populasi.'
          }
        ],
        example:
          'Dari 800 siswa SMP Negeri 1 (Populasi), dipilih 80 siswa dari tiap kelas secara acak (Sampel) untuk survei kantin.'
      },
      {
        title: 'Teknik Pengumpulan Data',
        badge: 'Level 1 • Metode Survei',
        icon: '📝',
        content:
          'Pemilihan teknik pengumpulan data memengaruhi keakuratan hasil analisis statistika.',
        breakdown: [
          {
            term: 'Observasi',
            desc: 'Mengamati dan mencatat langsung kejadian di lapangan.'
          },
          {
            term: 'Wawancara',
            desc: 'Tanya jawab langsung dengan narasumber/responden.'
          },
          {
            term: 'Angket (Kuesioner)',
            desc: 'Menyebarkan daftar pertanyaan tertulis kepada banyak responden.'
          }
        ],
        warning:
          'Hindari sampel yang bias! Misalnya menanyakan olahraga favorit hanya kepada anggota klub basket.'
      }
    ],
    questions: [
      {
        question: 'Apa yang dimaksud dengan statistika?',
        options: [
          'Ilmu tentang bangun ruang dan sudut',
          'Ilmu tentang pengumpulan, pengolahan, dan analisis data',
          'Ilmu tentang klasifikasi tumbuhan',
          'Ilmu tentang gaya dan gerak benda'
        ],
        correct: 1,
        explanation:
          'Statistika adalah ilmu yang mempelajari cara mengumpulkan, mengolah, menyajikan, menganalisis, dan menyimpulkan data.'
      },
      {
        question: 'Manakah di bawah ini yang termasuk data kuantitatif?',
        options: [
          'Warna seragam olahraga',
          'Jenis ekstrakurikuler favorit',
          'Tinggi badan siswa dalam sentimeter',
          'Kota asal kelahiran siswa'
        ],
        correct: 2,
        explanation:
          'Tinggi badan dinyatakan dengan angka dan satuan ukuran sehingga termasuk data kuantitatif.'
      },
      {
        question: 'Sebuah SMP memiliki 720 siswa. Untuk mengetahui minat baca, dipilih 90 siswa secara acak. Himpunan 720 siswa tersebut disebut ...',
        options: [
          'Sampel',
          'Populasi',
          'Frekuensi',
          'Turus'
        ],
        correct: 1,
        explanation:
          'Seluruh objek yang menjadi sasaran penelitian (720 siswa) disebut populasi, sedangkan 90 siswa adalah sampel.'
      },
      {
        question: 'Mengapa pemilihan sampel harus dilakukan secara acak dan mewakili setiap kelompok?',
        options: [
          'Agar jumlah data menjadi lebih sedikit dari 5',
          'Supaya hasil penelitian tidak bias dan akurat mewakili populasi',
          'Agar tidak perlu membuat tabel frekuensi',
          'Supaya semua responden menjawab hal yang sama'
        ],
        correct: 1,
        explanation:
          'Sampel acak yang representatif mencegah bias sehingga kesimpulan mencerminkan kondisi populasi sebenarnya.'
      },
      {
        question: 'Bu Rina membagikan lembaran berisi 10 pertanyaan tertulis kepada seluruh siswa kelas 8A untuk diisi. Teknik ini disebut ...',
        options: [
          'Observasi',
          'Eksperimen laboratorium',
          'Angket (Kuesioner)',
          'Pengukuran langsung'
        ],
        correct: 2,
        explanation:
          'Pengumpulan data menggunakan daftar pertanyaan tertulis yang diisi responden disebut angket atau kuesioner.'
      }
    ]
  },

  2: {
    levelNumber: 2,
    title: 'Pengelompokan Data',
    subtitle: 'Tabel Distribusi Frekuensi & Turus',
    slides: [
      {
        title: 'Dari Data Mentah ke Tabel',
        badge: 'Level 2 • Pengolahan Data',
        icon: '📊',
        content:
          'Data yang baru dikumpulkan masih acak (data mentah) sehingga sulit dibaca. Kita perlu mengelompokkannya ke dalam tabel frekuensi.',
        highlight:
          'Frekuensi adalah banyaknya kemunculan suatu nilai atau kategori dalam kumpulan data.',
        example:
          'Data ukuran sepatu: 38, 39, 38, 40, 38 → Ukuran 38 muncul 3 kali, maka frekuensinya = 3.'
      },
      {
        title: 'Menggunakan Turus (Tally)',
        badge: 'Level 2 • Pencatatan Akurat',
        icon: '🧮',
        content:
          'Turus adalah simbol garis tegak untuk membantu menghitung data satu per satu agar tidak ada data yang terlewat atau terhitung ganda.',
        breakdown: [
          {
            term: 'Aturan Ikat Lima',
            desc: 'Empat garis tegak (||||) ditambah satu garis miring/coret melintang melambangkan hitungan 5.'
          },
          {
            term: 'Total Frekuensi (∑f)',
            desc: 'Jumlah seluruh kolom frekuensi harus selalu sama dengan banyaknya data awal.'
          }
        ]
      },
      {
        title: 'Frekuensi Relatif (Persentase)',
        badge: 'Level 2 • Proporsi Data',
        icon: '📐',
        content:
          'Selain jumlah kemunculan, kita sering membandingkan frekuensi suatu kategori terhadap keseluruhan data dalam bentuk persen.',
        highlight:
          'Frekuensi Relatif (%) = (Frekuensi Kategori ÷ Total Seluruh Data) × 100%',
        example:
          'Jika 12 dari 40 siswa memiliki ukuran sepatu 39, maka frekuensi relatifnya = (12 ÷ 40) × 100% = 30%.'
      }
    ],
    questions: [
      {
        question: 'Apa yang dimaksud dengan frekuensi dalam tabel statistika?',
        options: [
          'Selisih antara nilai terbesar dan terkecil',
          'Banyaknya kemunculan suatu nilai atau kategori data',
          'Nilai yang berada tepat di tengah data',
          'Urutan data dari yang terkecil ke terbesar'
        ],
        correct: 1,
        explanation:
          'Frekuensi menyatakan seberapa sering (banyak) suatu nilai atau kategori muncul dalam sekumpulan data.'
      },
      {
        question: 'Diketahui data nilai kuis: 70, 80, 70, 90, 80, 70, 100, 70. Berapakah frekuensi untuk nilai 70?',
        options: [
          '2',
          '3',
          '4',
          '5'
        ],
        correct: 2,
        explanation:
          'Nilai 70 muncul sebanyak 4 kali dalam deretan data tersebut.'
      },
      {
        question: 'Dalam pencatatan turus, tiga ikat lima ditambah dua garis tegak (||||- ||||- ||||- ||) menunjukkan frekuensi sebesar ...',
        options: [
          '12',
          '15',
          '17',
          '20'
        ],
        correct: 2,
        explanation:
          'Setiap ikatan bernilai 5. Tiga ikat = 3 × 5 = 15, ditambah 2 garis tegak = 17.'
      },
      {
        question: 'Dari 50 siswa kelas VIII, tercatat 15 siswa menyukai pelajaran IPA. Berapakah frekuensi relatif siswa yang menyukai IPA?',
        options: [
          '15%',
          '25%',
          '30%',
          '35%'
        ],
        correct: 2,
        explanation:
          'Frekuensi relatif = (15 ÷ 50) × 100% = 0,3 × 100% = 30%.'
      },
      {
        question: 'Jika hasil penjumlahan seluruh kolom frekuensi pada tabel adalah 38, padahal jumlah siswa yang disurvei ada 40 orang, kesimpulannya adalah ...',
        options: [
          'Tabel sudah benar karena selisih 2 wajar',
          'Ada 2 data siswa yang terlewat dan belum dimasukkan ke tabel',
          'Frekuensi relatifnya menjadi lebih dari 100%',
          'Nilai terbesar harus dikurangi 2'
        ],
        correct: 1,
        explanation:
          'Total frekuensi harus selalu sama dengan jumlah responden awal (40). Selisih 2 berarti ada 2 data yang belum tercatat.'
      }
    ]
  },

  3: {
    levelNumber: 3,
    title: 'Penyajian Data',
    subtitle: 'Diagram Batang, Garis & Lingkaran',
    slides: [
      {
        title: 'Memilih Diagram yang Tepat',
        badge: 'Level 3 • Visualisasi Data',
        icon: '📈',
        content:
          'Setiap jenis diagram memiliki fungsi khusus agar pola data langsung terlihat dalam sekali pandang.',
        breakdown: [
          {
            term: 'Diagram Batang',
            desc: 'Cocok untuk membandingkan jumlah antar kategori yang terpisah (misal: jumlah siswa per ekstrakurikuler).'
          },
          {
            term: 'Diagram Garis',
            desc: 'Cocok untuk melihat tren kenaikan atau penurunan dari waktu ke waktu (misal: suhu harian atau penjualan per bulan).'
          },
          {
            term: 'Diagram Lingkaran',
            desc: 'Cocok untuk menunjukkan proporsi/bagian terhadap keseluruhan dalam persen (%) atau derajat (°).'
          }
        ]
      },
      {
        title: 'Rumus Diagram Lingkaran',
        badge: 'Level 3 • Perhitungan Sudut & Persen',
        icon: '🥧',
        content:
          'Satu lingkaran penuh bernilai 100% atau 360°. Kita dapat mengubah frekuensi tiap kategori menjadi besar sudut atau persentase.',
        breakdown: [
          {
            term: 'Besar Sudut Pusat (°)',
            desc: '(Frekuensi Kategori ÷ Total Data) × 360°'
          },
          {
            term: 'Persentase Bagian (%)',
            desc: '(Frekuensi Kategori ÷ Total Data) × 100%'
          }
        ],
        example:
          'Seperempat (1/4) lingkaran sama dengan 25% atau 90°.'
      },
      {
        title: 'Membaca Selisih & Tren Grafik',
        badge: 'Level 3 • Interpretasi Visual',
        icon: '🔍',
        content:
          'Perhatikan skala pada sumbu tegak (frekuensi) saat membaca diagram batang atau garis.',
        warning:
          'Sumbu vertikal yang tidak dimulai dari angka 0 dapat membuat perbedaan antar batang tampak jauh lebih besar dari kenyataannya!'
      }
    ],
    questions: [
      {
        question: 'Diagram manakah yang paling tepat digunakan untuk menyajikan perkembangan suhu udara dari pukul 06.00 hingga 18.00?',
        options: [
          'Diagram Lingkaran',
          'Diagram Garis',
          'Piktogram',
          'Tabel Turus'
        ],
        correct: 1,
        explanation:
          'Diagram garis paling efektif menunjukkan perubahan atau tren data yang berkelanjutan berdasarkan waktu.'
      },
      {
        question: 'Dalam suatu survei terhadap 60 siswa, sebanyak 15 siswa memilih hobi membaca. Jika dibuat diagram lingkaran, berapa besar sudut pusat untuk hobi membaca?',
        options: [
          '45°',
          '60°',
          '90°',
          '120°'
        ],
        correct: 2,
        explanation:
          'Sudut pusat = (15 ÷ 60) × 360° = (1/4) × 360° = 90°.'
      },
      {
        question: 'Sebuah diagram lingkaran menunjukkan data transportasi 200 siswa ke sekolah: Jalan Kaki 35%, Sepeda 25%, Angkutan Umum 15%, dan sisanya Diantar Orang Tua. Berapa banyak siswa yang diantar orang tua?',
        options: [
          '25 siswa',
          '40 siswa',
          '50 siswa',
          '75 siswa'
        ],
        correct: 2,
        explanation:
          'Persentase diantar orang tua = 100% - (35% + 25% + 15%) = 25%. Jumlah siswa = 25% × 200 = 50 siswa.'
      },
      {
        question: 'Pada diagram garis penjualan buku di koperasi: Januari = 40 buku, Februari = 55 buku, Maret = 35 buku, April = 70 buku. Kenaikan penjualan tertinggi terjadi pada bulan ...',
        options: [
          'Januari ke Februari',
          'Februari ke Maret',
          'Maret ke April',
          'Januari ke Maret'
        ],
        correct: 2,
        explanation:
          'Januari→Februari naik 15 buku, Februari→Maret turun 20 buku, dan Maret→April naik 35 buku (tertinggi).'
      },
      {
        question: 'Mengapa sumbu tegak (sumbu Y) pada diagram batang sebaiknya selalu dimulai dari angka 0?',
        options: [
          'Agar batang terlihat berwarna-warni',
          'Agar perbandingan tinggi antar batang proporsional dan tidak menyesatkan pembaca',
          'Karena angka negatif tidak boleh ditulis',
          'Supaya luas lingkaran selalu 360°'
        ],
        correct: 1,
        explanation:
          'Memotong sumbu Y (tidak mulai dari 0) membuat selisih kecil terlihat ekstrem secara visual sehingga dapat memanipulasi persepsi.'
      }
    ]
  },

  4: {
    levelNumber: 4,
    title: 'Menara Mean',
    subtitle: 'Rata-rata Hitung & Nilai Ekstrem',
    slides: [
      {
        title: 'Konsep Keseimbangan Mean',
        badge: 'Level 4 • Ukuran Pemusatan',
        icon: '⚖️',
        content:
          'Mean (rata-rata hitung) adalah titik keseimbangan dari seluruh data. Jika semua nilai diratakan sama besar, itulah nilai Mean.',
        highlight:
          'Mean (x̄) = Jumlah Seluruh Nilai Data ÷ Banyaknya Data (n)',
        example:
          'Nilai 4 ulangan: 70, 80, 85, 85 → Jumlah = 320. Mean = 320 ÷ 4 = 80.'
      },
      {
        title: 'Mean Data Berfrekuensi',
        badge: 'Level 4 • Rata-rata Berbobot',
        icon: '🔢',
        content:
          'Jika data disajikan dalam tabel frekuensi, kalikan setiap nilai (x) dengan frekuensinya (f) terlebih dahulu sebelum dibagi total frekuensi.',
        highlight:
          'Mean = ∑(nilai × frekuensi) ÷ ∑frekuensi',
        example:
          '3 siswa mendapat nilai 80 dan 2 siswa mendapat nilai 90 → Total nilai = (3×80) + (2×90) = 240 + 180 = 420. Mean = 420 ÷ 5 = 84.'
      },
      {
        title: 'Sensitif Terhadap Pencilan (Outlier)',
        badge: 'Level 4 • Analisis Nilai Ekstrem',
        icon: '⚠️',
        content:
          'Pencilan (outlier) adalah nilai yang sangat jauh lebih besar atau jauh lebih kecil dibandingkan mayoritas data lainnya.',
        warning:
          'Mean sangat mudah tertarik oleh nilai ekstrem! Satu nilai 0 atau nilai 1000 dapat menggeser rata-rata secara drastis.'
      }
    ],
    questions: [
      {
        question: 'Hitunglah mean (rata-rata) dari data berikut: 6, 8, 7, 9, 10!',
        options: [
          '7,5',
          '8,0',
          '8,5',
          '9,0'
        ],
        correct: 1,
        explanation:
          'Jumlah data = 6 + 8 + 7 + 9 + 10 = 40. Banyak data = 5. Mean = 40 ÷ 5 = 8,0.'
      },
      {
        question: 'Rata-rata nilai ulangan 4 orang siswa adalah 75. Jika nilai Budi digabungkan, rata-rata ke-5 siswa menjadi 78. Berapakah nilai ulangan Budi?',
        options: [
          '80',
          '85',
          '90',
          '93'
        ],
        correct: 2,
        explanation:
          'Total 4 siswa = 4 × 75 = 300. Total 5 siswa = 5 × 78 = 390. Nilai Budi = 390 - 300 = 90.'
      },
      {
        question: 'Dalam sebuah kelas, 10 siswa laki-laki memiliki rata-rata tinggi 160 cm dan 15 siswa perempuan memiliki rata-rata tinggi 150 cm. Berapakah rata-rata tinggi gabungan seluruh siswa?',
        options: [
          '154 cm',
          '155 cm',
          '156 cm',
          '158 cm'
        ],
        correct: 0,
        explanation:
          'Total tinggi = (10 × 160) + (15 × 150) = 1.600 + 2.250 = 3.850 cm. Total siswa = 25. Mean gabungan = 3.850 ÷ 25 = 154 cm.'
      },
      {
        question: 'Uang saku 5 anak adalah: Rp10.000, Rp12.000, Rp10.000, Rp8.000, dan Rp60.000. Mengapa nilai mean sebesar Rp20.000 kurang tepat menggambarkan uang saku kelompok tersebut?',
        options: [
          'Karena jumlah datanya bilangan ganjil',
          'Karena ada nilai ekstrem (Rp60.000) yang menarik rata-rata jauh ke atas',
          'Karena tidak ada uang saku yang bernilai Rp20.000',
          'Karena uang saku tidak boleh dihitung rata-ratanya'
        ],
        correct: 1,
        explanation:
          'Rp60.000 adalah pencilan (outlier) yang jauh di atas 4 anak lainnya (Rp8rb–Rp12rb) sehingga menarik nilai mean menjadi tinggi.'
      },
      {
        question: 'Tabel nilai: Nilai 70 (frekuensi 2), Nilai 80 (frekuensi 5), Nilai 90 (frekuensi 3). Berapakah mean dari data tabel tersebut?',
        options: [
          '80',
          '81',
          '82',
          '85'
        ],
        correct: 1,
        explanation:
          '∑(x·f) = (70×2) + (80×5) + (90×3) = 140 + 400 + 270 = 810. Total frekuensi = 2 + 5 + 3 = 10. Mean = 810 ÷ 10 = 81.'
      }
    ]
  },
  5: {
    levelNumber: 5,
    title: 'Jembatan Median',
    subtitle: 'Nilai Tengah Data Terurut',
    slides: [
      {
        title: 'Syarat Mutlak Median: Urutkan!',
        badge: 'Level 5 • Nilai Tengah',
        icon: '🌉',
        content:
          'Median adalah nilai yang berada tepat di tengah-tengah kumpulan data setelah data diurutkan dari yang terkecil hingga terbesar.',
        warning:
          'Kesalahan paling sering terjadi adalah langsung mengambil angka tengah tanpa mengurutkan datanya terlebih dahulu!'
      },
      {
        title: 'Median Data Ganjil vs Genap',
        badge: 'Level 5 • Rumus Posisi',
        icon: '🎯',
        content:
          'Cara menentukan median bergantung pada banyaknya data (n) setelah terurut:',
        breakdown: [
          {
            term: 'Jika Banyak Data Ganjil (n ganjil)',
            desc: 'Median adalah tepat 1 data di posisi ke-(n + 1) ÷ 2. Contoh n = 7 → data ke-4.'
          },
          {
            term: 'Jika Banyak Data Genap (n genap)',
            desc: 'Median adalah rata-rata dari 2 data yang berada di tengah. Contoh n = 8 → (data ke-4 + data ke-5) ÷ 2.'
          }
        ]
      },
      {
        title: 'Keunggulan Median',
        badge: 'Level 5 • Tahan Pencilan',
        icon: '🛡️',
        content:
          'Berbeda dengan mean, median tidak terpengaruh oleh nilai pencilan (outlier) karena hanya bergantung pada urutan posisi tengah.',
        example:
          'Data: 10, 12, 14, 15, 999 → Median tetap 14 meskipun angka terakhir melonjak menjadi 999.'
      }
    ],
    questions: [
      {
        question: 'Tentukan median dari data berikut: 14, 9, 20, 11, 17, 8, 15!',
        options: [
          '11',
          '14',
          '15',
          '20'
        ],
        correct: 1,
        explanation:
          'Urutkan data terlebih dahulu: 8, 9, 11, 14, 15, 17, 20. Karena ada 7 data (ganjil), median adalah data ke-4 yaitu 14.'
      },
      {
        question: 'Diketahui data berat badan (kg) 8 siswa: 45, 50, 42, 48, 52, 46, 44, 55. Berapakah mediannya?',
        options: [
          '46 kg',
          '47 kg',
          '48 kg',
          '49 kg'
        ],
        correct: 1,
        explanation:
          'Urutkan: 42, 44, 45, 46, 48, 50, 52, 55. Ada 8 data (genap), median = (data ke-4 + data ke-5) ÷ 2 = (46 + 48) ÷ 2 = 47 kg.'
      },
      {
        question: 'Jika terdapat 25 data yang sudah diurutkan dari terkecil ke terbesar, maka letak median berada pada data ke-...',
        options: [
          '12',
          '12,5',
          '13',
          '14'
        ],
        correct: 2,
        explanation:
          'Untuk n = 25 (ganjil), posisi median = (25 + 1) ÷ 2 = 26 ÷ 2 = data ke-13.'
      },
      {
        question: 'Data terurut: 5, 7, 8, x, 12, 15. Jika median dari data tersebut adalah 9, berapakah nilai x?',
        options: [
          '9',
          '10',
          '11',
          '12'
        ],
        correct: 1,
        explanation:
          'Ada 6 data (genap), maka median = (data ke-3 + data ke-4) ÷ 2 → (8 + x) ÷ 2 = 9 → 8 + x = 18 → x = 10.'
      },
      {
        question: 'Tabel frekuensi nilai ujian: Nilai 6 (3 siswa), Nilai 7 (4 siswa), Nilai 8 (5 siswa), Nilai 9 (2 siswa). Berapakah median nilai ujian tersebut?',
        options: [
          '7',
          '7,5',
          '8',
          '8,5'
        ],
        correct: 1,
        explanation:
          'Total siswa = 3 + 4 + 5 + 2 = 14 (genap). Median = rata-rata data ke-7 dan ke-8. Data ke-1 s.d. ke-3 bernilai 6, ke-4 s.d. ke-7 bernilai 7, ke-8 bernilai 8. Maka median = (7 + 8) ÷ 2 = 7,5.'
      }
    ]
  },

  6: {
    levelNumber: 6,
    title: 'Lembah Modus',
    subtitle: 'Frekuensi Terbanyak & Stok Kantin',
    slides: [
      {
        title: 'Apa Itu Modus?',
        badge: 'Level 6 • Nilai Paling Populer',
        icon: '🔥',
        content:
          'Modus adalah nilai atau kategori data yang paling sering muncul (memiliki frekuensi tertinggi).',
        highlight:
          'Satu-satunya ukuran pemusatan yang bisa dipakai untuk data kualitatif (non-angka) seperti merek favorit atau rasa minuman terlaris!',
        example:
          'Pesanan minuman: Es Teh (18), Jus Jeruk (9), Susu Cokelat (12) → Modusnya adalah Es Teh.'
      },
      {
        title: 'Jenis Modus dalam Kumpulan Data',
        badge: 'Level 6 • Variasi Frekuensi',
        icon: '📊',
        content:
          'Suatu kumpulan data tidak selalu hanya memiliki satu modus:',
        breakdown: [
          {
            term: 'Unimodal (1 Modus)',
            desc: 'Hanya ada satu nilai yang frekuensinya paling tinggi.'
          },
          {
            term: 'Bimodal / Multimodal',
            desc: 'Terdapat dua atau lebih nilai yang sama-sama memiliki frekuensi tertinggi.'
          },
          {
            term: 'Tidak Ada Modus',
            desc: 'Semua nilai muncul dengan frekuensi yang sama persis (misal: tiap angka hanya muncul 1 kali).'
          }
        ]
      },
      {
        title: 'Penerapan Modus di Dunia Nyata',
        badge: 'Level 6 • Keputusan Stok',
        icon: '🏪',
        content:
          'Pemilik toko sepatu atau penjaga kantin sekolah tidak memesan stok berdasarkan rata-rata ukuran sepatu (misal ukuran 38,4 tidak ada di pabrik!), melainkan berdasarkan Modus.',
        example:
          'Jika ukuran sepatu 39 paling banyak dicari siswa, maka toko harus menyetok ukuran 39 paling banyak.'
      }
    ],
    questions: [
      {
        question: 'Tentukan modus dari kumpulan data berikut: 4, 7, 5, 7, 8, 6, 7, 5, 9!',
        options: [
          '5',
          '6',
          '7',
          '8'
        ],
        correct: 2,
        explanation:
          'Angka 7 muncul sebanyak 3 kali (paling banyak dibanding angka lainnya), sehingga modusnya adalah 7.'
      },
      {
        question: 'Diketahui data warna helm pengendara: Merah, Hitam, Putih, Hitam, Biru, Putih, Abu-abu. Bagaimana status modus dari data tersebut?',
        options: [
          'Tidak memiliki modus',
          'Memiliki dua modus (bimodal), yaitu Hitam dan Putih',
          'Modusnya hanya Hitam saja',
          'Tidak bisa dicari karena bukan angka'
        ],
        correct: 1,
        explanation:
          'Hitam dan Putih sama-sama muncul 2 kali (frekuensi tertinggi), sehingga data bersifat bimodal (2 modus).'
      },
      {
        question: 'Seorang pemilik toko baju sekolah ingin menentukan ukuran seragam mana yang harus diproduksi paling banyak bulan depan. Ukuran pemusatan data manakah yang paling tepat ia gunakan?',
        options: [
          'Mean',
          'Median',
          'Modus',
          'Jangkauan'
        ],
        correct: 2,
        explanation:
          'Modus menunjukkan ukuran yang paling banyak diminati pembeli sehingga paling relevan untuk keputusan stok barang.'
      },
      {
        question: 'Data penjualan jus di kantin hari ini: Alpukat 12 gelas, Mangga 19 gelas, Jambu 15 gelas, Melon 19 gelas, Stroberi 10 gelas. Manakah pernyataan yang benar?',
        options: [
          'Modusnya adalah 19 gelas',
          'Modusnya adalah Jus Mangga dan Jus Melon',
          'Modusnya adalah Jus Stroberi',
          'Data tersebut tidak memiliki modus'
        ],
        correct: 1,
        explanation:
          'Modus adalah kategori/nilainya (Jus Mangga dan Jus Melon), bukan angka frekuensinya (19).'
      },
      {
        question: 'Diberikan data: 12, 15, 18, 20, 22, 25. Mengapa kumpulan data tersebut dikatakan tidak memiliki modus?',
        options: [
          'Karena semua angkanya bilangan bulat',
          'Karena setiap nilai muncul dengan frekuensi yang sama (masing-masing 1 kali)',
          'Karena nilainya sudah terurut dari kecil ke besar',
          'Karena tidak ada nilai yang diulang sebanyak 5 kali'
        ],
        correct: 1,
        explanation:
          'Jika semua nilai memiliki frekuensi kemunculan yang sama rata, maka tidak ada nilai yang paling dominan (tidak ada modus).'
      }
    ]
  },

  7: {
    levelNumber: 7,
    title: 'Analisis & Interpretasi',
    subtitle: 'Membaca Makna & Mengambil Keputusan',
    slides: [
      {
        title: 'Membandingkan Mean, Median & Modus',
        badge: 'Level 7 • Pemilihan Ukuran Tepat',
        icon: '🧠',
        content:
          'Analis data tidak asal menghitung ketiganya, melainkan memilih ukuran yang paling jujur menggambarkan kondisi data.',
        breakdown: [
          {
            term: 'Gunakan Mean',
            desc: 'Saat data numerik tersebar merata dan TIDAK memiliki nilai ekstrem (outlier).'
          },
          {
            term: 'Gunakan Median',
            desc: 'Saat data numerik memiliki nilai ekstrem/pencilan (seperti data gaji karyawan atau harga rumah).'
          },
          {
            term: 'Gunakan Modus',
            desc: 'Saat data berupa kategori/kualitatif atau ingin mencari pilihan paling populer.'
          }
        ]
      },
      {
        title: 'Membaca Sebaran Data (Jangkauan)',
        badge: 'Level 7 • Konsistensi Data',
        icon: '📏',
        content:
          'Dua kelompok bisa memiliki rata-rata yang sama, tetapi penyebarannya sangat berbeda. Jangkauan (Range) mengukur selisih nilai terbesar dan terkecil.',
        highlight:
          'Jangkauan (Range) = Nilai Maksimum − Nilai Minimum',
        example:
          'Tim A nilai: 78, 80, 82 (Jangkauan = 4, stabil). Tim B nilai: 50, 80, 110 (Jangkauan = 60, sangat fluktuatif).'
      },
      {
        title: 'Mengambil Keputusan Berbasis Data',
        badge: 'Level 7 • Studi Kasus Nyata',
        icon: '💡',
        content:
          'Kesimpulan yang baik harus selalu didukung oleh bukti angka dari tabel atau grafik, bukan sekadar tebakan.',
        warning:
          'Waspadai klaim iklan atau berita yang hanya menampilkan rata-rata tanpa menyebutkan sebaran atau mediannya!'
      }
    ],
    questions: [
      {
        question: 'Gaji bulanan 6 karyawan di sebuah startup adalah: Rp4 juta, Rp4,5 juta, Rp4,5 juta, Rp5 juta, Rp5 juta, dan Rp37 juta (Direktur). Ukuran mana yang paling jujur mewakili gaji karyawan pada umumnya?',
        options: [
          'Mean (Rp10 juta)',
          'Median (Rp4,75 juta)',
          'Jangkauan (Rp33 juta)',
          'Nilai maksimum (Rp37 juta)'
        ],
        correct: 1,
        explanation:
          'Gaji direktur Rp37 juta adalah pencilan ekstrem yang membuat Mean naik jadi Rp10 juta. Median Rp4,75 juta jauh lebih akurat mewakili gaji mayoritas.'
      },
      {
        question: 'Pelatih basket membandingkan dua pemain. Andi mencetak poin: 14, 15, 16, 15, 15 (Mean = 15). Bima mencetak poin: 4, 28, 5, 26, 12 (Mean = 15). Kesimpulan analisis yang tepat adalah ...',
        options: [
          'Bima selalu mencetak lebih banyak poin di setiap pertandingan',
          'Performa Andi jauh lebih konsisten/stabil dibandingkan Bima',
          'Andi memiliki jangkauan nilai yang lebih besar dari Bima',
          'Kedua pemain memiliki pola permainan yang identik'
        ],
        correct: 1,
        explanation:
          'Meski Mean sama-sama 15, jangkauan Andi hanya 2 (16−14) sedangkan jangkauan Bima 24 (28−4). Artinya Andi sangat konsisten.'
      },
      {
        question: 'Hitunglah jangkauan (range) dari data suhu berikut: 24°C, 29°C, 21°C, 32°C, 27°C, 23°C!',
        options: [
          '8°C',
          '9°C',
          '11°C',
          '13°C'
        ],
        correct: 2,
        explanation:
          'Nilai maksimum = 32°C, nilai minimum = 21°C. Jangkauan = 32 − 21 = 11°C.'
      },
      {
        question: 'Dalam sebuah kelas dengan 30 siswa, nilai KKM adalah 75. Diketahui median kelas tersebut adalah 78. Kesimpulan yang pasti benar adalah ...',
        options: [
          'Semua siswa di kelas tersebut lulus KKM',
          'Setidaknya separuh (minimal 15 siswa) memperoleh nilai 78 atau lebih',
          'Rata-rata kelas pasti lebih kecil dari 75',
          'Tidak ada siswa yang mendapat nilai di bawah 70'
        ],
        correct: 1,
        explanation:
          'Karena median (nilai tengah) adalah 78, maka minimal 50% siswa berada pada posisi nilai ≥ 78.'
      },
      {
        question: 'Kapan kita sebaiknya menggunakan Mean dibandingkan Median untuk merangkum sekumpulan data angka?',
        options: [
          'Ketika terdapat beberapa nilai pencilan yang sangat ekstrem',
          'Ketika data berupa nama warna dan merek kendaraan',
          'Ketika data tersebar cukup merata/simetris tanpa nilai ekstrem',
          'Ketika jumlah data kurang dari 3 buah'
        ],
        correct: 2,
        explanation:
          'Mean paling optimal digunakan pada data numerik yang distribusinya merata dan bebas dari outlier ekstrem.'
      }
    ]
  },

  8: {
    levelNumber: 8,
    title: 'Benteng Literasi Data',
    subtitle: 'Tantangan Komprehensif PISA',
    slides: [
      {
        title: 'Literasi Statistika Model PISA',
        badge: 'Level 8 • Tantangan Akhir',
        icon: '🏰',
        content:
          'Pada benteng terakhir ini, kamu akan menghadapi soal literasi data tingkat tinggi yang menggabungkan membaca konteks, menghitung gabungan ukuran pemusatan, dan mengevaluasi argumen.',
        breakdown: [
          {
            term: '1. Formulate (Merumuskan)',
            desc: 'Mengidentifikasi informasi penting dari masalah dunia nyata ke dalam bentuk matematis.'
          },
          {
            term: '2. Employ (Menerapkan)',
            desc: 'Menghitung mean, median, modus, persentase, dan perbandingan secara teliti.'
          },
          {
            term: '3. Interpret & Evaluate (Mengevaluasi)',
            desc: 'Menilai apakah suatu kesimpulan atau klaim berita masuk akal secara logika statistika.'
          }
        ]
      },
      {
        title: 'Strategi Menaklukkan Soal HOTS',
        badge: 'Level 8 • Checklist Detektif Data',
        icon: '🕵️',
        content:
          'Gunakan tiga langkah cepat sebelum menentukan jawaban akhir:',
        highlight:
          'Cek Total Data (n) → Periksa Kemungkinan Nilai Baru yang Masuk → Uji Kembali Syarat Mean/Median/Modus.',
        example:
          'Ingat: Menambah satu data yang lebih besar dari rata-rata lama akan selalu menaikkan rata-rata baru!'
      }
    ],
    questions: [
      {
        question: '[PISA - Evaluasi Klaim] Sebuah iklan suplemen menulis: "Rata-rata tinggi badan 5 pemain basket naik 3 cm setelah minum susu X." Jika total tinggi awal ke-5 pemain adalah 850 cm, berapa total tinggi mereka sekarang?',
        options: [
          '853 cm',
          '860 cm',
          '865 cm',
          '875 cm'
        ],
        correct: 2,
        explanation:
          'Rata-rata naik 3 cm untuk 5 orang berarti total kenaikan = 5 × 3 cm = 15 cm. Total tinggi baru = 850 + 15 = 865 cm.'
      },
      {
        question: '[PISA - Rekonstruksi Data] Lima bilangan bulat positif memiliki Mean = 11, Median = 10, dan Modus tunggal = 8. Jika bilangan terbesarnya adalah 18, berapakah bilangan kedua terbesar dalam kelompok itu?',
        options: [
          '9',
          '10',
          '11',
          '12'
        ],
        correct: 2,
        explanation:
          'Total 5 bilangan = 5 × 11 = 55. Urutan data: 8, 8, 10, d, 18 (karena modus tunggal = 8 dan median = 10). Maka d = 55 - (8 + 8 + 10 + 18) = 55 - 44 = 11.'
      },
      {
        question: '[PISA - Simulasi Kebijakan] Nilai rata-rata ujian matematika 28 siswa adalah 80. Dua siswa mengikuti ujian susulan. Agar rata-rata kelas naik menjadi tepat 81, berapa rata-rata nilai minimal yang harus diraih kedua siswa susulan tersebut?',
        options: [
          '82',
          '88',
          '94',
          '95'
        ],
        correct: 3,
        explanation:
          'Total nilai 28 siswa = 28 × 80 = 2.240. Target total 30 siswa = 30 × 81 = 2.430. Selisih nilai 2 siswa = 2.430 - 2.240 = 190. Rata-rata keduanya = 190 ÷ 2 = 95.'
      },
      {
        question: '[PISA - Interpretasi Grafik] Di SMP Harapan, 60% dari 200 siswa kelas VIII adalah perempuan. Jika 25% siswa perempuan dan 50% siswa laki-laki mengikuti klub robotik, berapa persen seluruh siswa kelas VIII yang mengikuti klub robotik?',
        options: [
          '30%',
          '35%',
          '37,5%',
          '40%'
        ],
        correct: 1,
        explanation:
          'Perempuan = 60% × 200 = 120 (ikut robotik: 25% × 120 = 30). Laki-laki = 80 (ikut robotik: 50% × 80 = 40). Total robotik = 70 dari 200 siswa = (70 ÷ 200) × 100% = 35%.'
      },
      {
        question: '[PISA - Keputusan Akhir] Panitia lomba memilih 1 tim terbaik dari 3 kali babak penyisihan (skor maks 100): Tim Garuda [70, 85, 85], Tim Elang [60, 90, 90], Tim Rajawali [78, 80, 82]. Ketiga tim memiliki Mean yang sama (80). Jika juri mengutamakan konsistensi performa tanpa penurunan tajam, tim mana yang paling layak dipilih?',
        options: [
          'Tim Garuda karena modusnya 85',
          'Tim Elang karena pernah mencapai skor 90',
          'Tim Rajawali karena jangkauan skornya paling kecil (4 poin) dan terus meningkat',
          'Ketiganya harus diundi karena nilai meannya sama persis'
        ],
        correct: 2,
        explanation:
          'Tim Rajawali memiliki jangkauan tersempit (82 - 78 = 4) dibanding Garuda (15) dan Elang (30), serta trennya selalu naik stabil.'
      }
    ]
  }
};