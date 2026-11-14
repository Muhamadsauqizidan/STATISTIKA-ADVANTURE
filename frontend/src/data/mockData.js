// Mock & Seed Data untuk Offline-first Resiliency
export const DEMO_STUDENTS = [
  {
    id: "std-001",
    student_code: "SA8A01",
    name: "Budi Santoso",
    class_name: "8A",
    school_name: "SMP Negeri 1 Matematika",
    total_xp: 450,
    current_level: 2,
    avatar_seed: "budi",
    badges_count: 2,
    completed_levels: [1]
  },
  {
    id: "std-002",
    student_code: "SA8A02",
    name: "Siti Aminah",
    class_name: "8A",
    school_name: "SMP Negeri 1 Matematika",
    total_xp: 1250,
    current_level: 5,
    avatar_seed: "siti",
    badges_count: 4,
    completed_levels: [1, 2, 3, 4]
  },
  {
    id: "std-003",
    student_code: "SA8B01",
    name: "Rizky Pratama",
    class_name: "8B",
    school_name: "SMP Negeri 1 Matematika",
    total_xp: 2400,
    current_level: 8,
    avatar_seed: "rizky",
    badges_count: 7,
    completed_levels: [1, 2, 3, 4, 5, 6, 7]
  }
];

export const ADVENTURE_LEVELS = [
  {
    id: 1,
    level_number: 1,
    title: "Mengenal Statistika",
    subtitle: "Data, Populasi, dan Sampel",
    icon: "Compass",
    description: "Memahami apa itu data dan cara menentukan sampel yang adil tanpa bias.",
    xp_reward: 100,
    status: "COMPLETED", // for demo default
    stars: 3,
    color: "from-blue-500 to-cyan-500"
  },
  {
    id: 2,
    level_number: 2,
    title: "Pengelompokan Data",
    subtitle: "Tabel Distribusi Frekuensi & Turus",
    icon: "Table",
    description: "Mengubah data mentah ukuran sepatu menjadi tabel frekuensi yang rapi.",
    xp_reward: 120,
    status: "CURRENT",
    stars: 0,
    color: "from-indigo-500 to-purple-500"
  },
  {
    id: 3,
    level_number: 3,
    title: "Penyajian Data",
    subtitle: "Diagram Batang, Garis & Lingkaran",
    icon: "BarChart3",
    description: "Mengeksplorasi visualisasi data 2D dan 3D interaktif di laboratorium.",
    xp_reward: 150,
    status: "LOCKED",
    stars: 0,
    color: "from-purple-500 to-pink-500"
  },
  {
    id: 4,
    level_number: 4,
    title: "Menara Mean",
    subtitle: "Rata-rata Hitung & Nilai Ekstrem",
    icon: "Scale",
    description: "Menemukan titik keseimbangan data dan menguji ketahanan terhadap nilai pencilan.",
    xp_reward: 180,
    status: "LOCKED",
    stars: 0,
    color: "from-amber-500 to-orange-500"
  },
  {
    id: 5,
    level_number: 5,
    title: "Jembatan Median",
    subtitle: "Nilai Tengah Data Terurut",
    icon: "GitCommit",
    description: "Mengurutkan data dan menemukan nilai tepat di posisi tengah (ganjil & genap).",
    xp_reward: 180,
    status: "LOCKED",
    stars: 0,
    color: "from-emerald-500 to-teal-500"
  },
  {
    id: 6,
    level_number: 6,
    title: "Lembah Modus",
    subtitle: "Frekuensi Terbanyak & Stok Kantin",
    icon: "Flame",
    description: "Menentukan nilai paling populer untuk membantu keputusan bisnis kantin sekolah.",
    xp_reward: 180,
    status: "LOCKED",
    stars: 0,
    color: "from-rose-500 to-red-500"
  },
  {
    id: 7,
    level_number: 7,
    title: "Analisis & Interpretasi",
    subtitle: "Membaca Makna & Mengambil Keputusan",
    icon: "LineChart",
    description: "Membandingkan mean, median, dan modus pada kasus nyata untuk kesimpulan terbaik.",
    xp_reward: 200,
    status: "LOCKED",
    stars: 0,
    color: "from-cyan-500 to-blue-600"
  },
  {
    id: 8,
    level_number: 8,
    title: "Benteng Literasi Data",
    subtitle: "Tantangan Komprehensif PISA",
    icon: "ShieldAlert",
    description: "Uji kehebatanmu merumuskan, menerapkan, dan mengevaluasi data dunia nyata!",
    xp_reward: 300,
    status: "LOCKED",
    stars: 0,
    color: "from-violet-600 to-indigo-800"
  }
];

export const GAME_BADGES = [
  {
    id: "badge-01",
    badge_code: "DATA_SCOUT",
    name: "Penjelajah Data",
    description: "Menyelesaikan Level 1 dan memahami konsep data, populasi, dan sampel.",
    icon: "🧭",
    unlocked: true,
    unlocked_at: "Hari ini"
  },
  {
    id: "badge-02",
    badge_code: "CHART_MASTER",
    name: "Arsitek Diagram",
    description: "Mencoba semua model grafik 2D dan 3D di Laboratorium Visualisasi.",
    icon: "📊",
    unlocked: true,
    unlocked_at: "Hari ini"
  },
  {
    id: "badge-03",
    badge_code: "BALANCE_KEEPER",
    name: "Penjaga Keseimbangan",
    description: "Memahami cara kerja nilai Mean pada simulasi timbangan data.",
    icon: "⚖️",
    unlocked: false,
    unlocked_at: null
  },
  {
    id: "badge-04",
    badge_code: "MEDIAN_HUNTER",
    name: "Pemburu Nilai Tengah",
    description: "Berhasil mengurutkan data genap dan menemukan median dengan cepat.",
    icon: "🎯",
    unlocked: false,
    unlocked_at: null
  },
  {
    id: "badge-05",
    badge_code: "TREND_SETTER",
    name: "Ahli Modus",
    description: "Membantu penjaga kantin menentukan minuman terlaris menggunakan modus.",
    icon: "🔥",
    unlocked: false,
    unlocked_at: null
  },
  {
    id: "badge-06",
    badge_code: "GRAND_HERO",
    name: "Pahlawan Statistika",
    description: "Menyelesaikan seluruh 8 level petualangan dan menuntaskan Posttest.",
    icon: "👑",
    unlocked: false,
    unlocked_at: null
  }
];
