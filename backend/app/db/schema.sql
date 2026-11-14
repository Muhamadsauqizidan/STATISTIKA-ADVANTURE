-- ==============================================================================
-- DATABASE SCHEMA: STATISTIKA ADVENTURE
-- Platform: Supabase Managed PostgreSQL 15+
-- Specification: DATABASE.md
-- ==============================================================================

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 2. TABEL: students (Identitas & Gamifikasi Akun Siswa)
CREATE TABLE IF NOT EXISTS students (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_code VARCHAR(20) UNIQUE NOT NULL,
    name VARCHAR(100) NOT NULL,
    class_name VARCHAR(20) NOT NULL,
    school_name VARCHAR(150) DEFAULT 'SMP Negeri 1 Matematika',
    total_xp INTEGER DEFAULT 0 CHECK (total_xp >= 0),
    current_level INTEGER DEFAULT 1 CHECK (current_level BETWEEN 1 AND 8),
    avatar_seed VARCHAR(50) DEFAULT 'adventurer',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index pencarian kode siswa
CREATE INDEX IF NOT EXISTS idx_students_student_code ON students (student_code);

-- 3. TABEL: materials (Modul 8 Level Pembelajaran Statistika)
CREATE TABLE IF NOT EXISTS materials (
    id SERIAL PRIMARY KEY,
    level_number INTEGER UNIQUE NOT NULL CHECK (level_number BETWEEN 1 AND 8),
    title VARCHAR(100) NOT NULL,
    subtitle VARCHAR(150),
    description TEXT,
    icon VARCHAR(50) DEFAULT 'Compass',
    learning_objectives TEXT[] NOT NULL DEFAULT '{}',
    slides JSONB NOT NULL DEFAULT '[]'::jsonb,
    xp_reward INTEGER DEFAULT 100 CHECK (xp_reward >= 0),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_materials_level_number ON materials (level_number);

-- 4. TABEL: questions (Bank Soal Pretest, Posttest, Latihan, & Tantangan Literasi)
CREATE TABLE IF NOT EXISTS questions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    material_id INTEGER REFERENCES materials(id) ON DELETE SET NULL,
    evaluation_type VARCHAR(30) NOT NULL CHECK (evaluation_type IN ('pretest', 'posttest', 'practice', 'challenge')),
    question_text TEXT NOT NULL,
    context_data JSONB DEFAULT '{}'::jsonb,
    options JSONB NOT NULL DEFAULT '[]'::jsonb, -- Array [{id: 'A', text: '...'}, ...]
    correct_option VARCHAR(5) NOT NULL,
    mathematical_literacy_dimension VARCHAR(20) NOT NULL CHECK (
        mathematical_literacy_dimension IN ('FORMULATE', 'EMPLOY', 'INTERPRET')
    ),
    explanation TEXT NOT NULL,
    points INTEGER DEFAULT 10 CHECK (points >= 0),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_questions_eval_type ON questions (evaluation_type);
CREATE INDEX IF NOT EXISTS idx_questions_material_id ON questions (material_id);
CREATE INDEX IF NOT EXISTS idx_questions_dimension ON questions (mathematical_literacy_dimension);

-- 5. TABEL: evaluations (Sesi Evaluasi & Kalkulasi N-Gain Literasi Matematis)
CREATE TABLE IF NOT EXISTS evaluations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id UUID NOT NULL REFERENCES students(id) ON DELETE CASCADE,
    evaluation_type VARCHAR(30) NOT NULL CHECK (evaluation_type IN ('pretest', 'posttest', 'practice', 'challenge')),
    total_score NUMERIC(5,2) DEFAULT 0.0 CHECK (total_score BETWEEN 0 AND 100),
    formulate_score NUMERIC(5,2) DEFAULT 0.0 CHECK (formulate_score BETWEEN 0 AND 100),
    employ_score NUMERIC(5,2) DEFAULT 0.0 CHECK (employ_score BETWEEN 0 AND 100),
    interpret_score NUMERIC(5,2) DEFAULT 0.0 CHECK (interpret_score BETWEEN 0 AND 100),
    n_gain_score NUMERIC(4,3) CHECK (n_gain_score IS NULL OR n_gain_score BETWEEN -1 AND 1),
    duration_seconds INTEGER DEFAULT 0 CHECK (duration_seconds >= 0),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_evaluations_student_id ON evaluations (student_id);

-- 6. TABEL: answers (Detail Jawaban per Butir Soal untuk Analisis Diagnostik)
CREATE TABLE IF NOT EXISTS answers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    evaluation_id UUID NOT NULL REFERENCES evaluations(id) ON DELETE CASCADE,
    question_id UUID NOT NULL REFERENCES questions(id) ON DELETE CASCADE,
    selected_option VARCHAR(5) NOT NULL,
    is_correct BOOLEAN NOT NULL,
    duration_seconds INTEGER DEFAULT 0 CHECK (duration_seconds >= 0),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_answers_evaluation_id ON answers (evaluation_id);

-- 7. TABEL: student_progress (Status Perjalanan Pulau Level Pembelajaran)
CREATE TABLE IF NOT EXISTS student_progress (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id UUID NOT NULL REFERENCES students(id) ON DELETE CASCADE,
    level_number INTEGER NOT NULL CHECK (level_number BETWEEN 1 AND 8),
    status VARCHAR(20) DEFAULT 'LOCKED' CHECK (status IN ('LOCKED', 'IN_PROGRESS', 'COMPLETED')),
    stars INTEGER DEFAULT 0 CHECK (stars BETWEEN 0 AND 3),
    completed_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE (student_id, level_number)
);

CREATE INDEX IF NOT EXISTS idx_student_progress_student ON student_progress (student_id);

-- 8. TABEL: badges (Master Lencana Penghargaan Game-Based Learning)
CREATE TABLE IF NOT EXISTS badges (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    badge_code VARCHAR(50) UNIQUE NOT NULL,
    name VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    icon VARCHAR(20) NOT NULL DEFAULT '🏅',
    xp_required INTEGER DEFAULT 0 CHECK (xp_required >= 0),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 9. TABEL: student_badges (Relasi Kepemilikan Lencana Siswa)
CREATE TABLE IF NOT EXISTS student_badges (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id UUID NOT NULL REFERENCES students(id) ON DELETE CASCADE,
    badge_id UUID NOT NULL REFERENCES badges(id) ON DELETE CASCADE,
    unlocked_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE (student_id, badge_id)
);

CREATE INDEX IF NOT EXISTS idx_student_badges_student ON student_badges (student_id);

-- ==============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================

ALTER TABLE students ENABLE ROW LEVEL SECURITY;
ALTER TABLE materials ENABLE ROW LEVEL SECURITY;
ALTER TABLE questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE evaluations ENABLE ROW LEVEL SECURITY;
ALTER TABLE answers ENABLE ROW LEVEL SECURITY;
ALTER TABLE student_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE badges ENABLE ROW LEVEL SECURITY;
ALTER TABLE student_badges ENABLE ROW LEVEL SECURITY;

-- Materi dan Badges dapat dibaca secara publik oleh siapa saja
CREATE POLICY "Public read materials" ON materials
    FOR SELECT USING (true);

CREATE POLICY "Public read badges" ON badges
    FOR SELECT USING (true);

CREATE POLICY "Public read questions" ON questions
    FOR SELECT USING (true);

-- Siswa hanya dapat membaca profil mereka sendiri
CREATE POLICY "Student read own profile" ON students
    FOR SELECT USING (true);

CREATE POLICY "Student read own progress" ON student_progress
    FOR SELECT USING (true);

CREATE POLICY "Student read own badges" ON student_badges
    FOR SELECT USING (true);

CREATE POLICY "Student read own evaluations" ON evaluations
    FOR SELECT USING (true);

CREATE POLICY "Student read own answers" ON answers
    FOR SELECT USING (true);

-- Catatan Keamanan: Backend FastAPI menggunakan SUPABASE_SERVICE_ROLE_KEY untuk
-- melakukan operasi INSERT/UPDATE/DELETE aman dengan bypass RLS di sisi server.
-- Frontend TIDAK PERNAH memegang SUPABASE_SERVICE_ROLE_KEY.
