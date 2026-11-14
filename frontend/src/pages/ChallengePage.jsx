import React, { useState } from 'react';
import { Swords, CheckCircle2, XCircle, ArrowRight, Sparkles, Award } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import confetti from 'canvas-confetti';

const SAMPLE_CHALLENGES = [
  {
    id: 1,
    title: "Survei Minuman Favorit Kantin",
    dimension: "FORMULATE",
    dimensionLabel: "Merumuskan Situasi Nyata",
    scenario: "Pengelola kantin SMP Prestasi ingin mengetahui minuman favorit siswa untuk disiapkan di awal tahun ajaran. Sekolah memiliki 720 siswa (kelas 7, 8, dan 9).",
    question: "Manakah cara yang paling representatif (adil & tidak bias) untuk mengambil sampel penelitian tersebut?",
    options: [
      { id: "A", text: "Menanyai semua anggota tim basket putra saat latihan." },
      { id: "B", text: "Menanyai 30 siswa yang sedang antre di stan jus saja." },
      { id: "C", text: "Memilih secara acak 20 siswa dari masing-masing tingkatan kelas (total 60 siswa)." },
      { id: "D", text: "Hanya menanyai pengurus OSIS saat rapat mingguan." }
    ],
    correctOption: "C",
    explanation: "Sampel yang baik harus adil dan mewakili seluruh tingkatan kelas secara proporsional dan acak tanpa memihak kelompok tertentu.",
    xpReward: 50
  },
  {
    id: 2,
    title: "Pencilan (Outlier) & Upah Pekerja",
    dimension: "INTERPRET",
    dimensionLabel: "Menafsirkan & Mengevaluasi",
    scenario: "Lima pekerja usaha sablon memiliki upah harian: Rp80.000, Rp85.000, Rp80.000, Rp90.000, dan pemilik usaha menerima Rp500.000 per hari.",
    question: "Mengapa nilai Median lebih tepat digunakan daripada nilai Mean untuk menggambarkan upah pekerja biasa pada usaha tersebut?",
    options: [
      { id: "A", text: "Karena nilai Mean selalu menghasilkan bilangan pecahan yang sulit dihitung." },
      { id: "B", text: "Karena nilai Median selalu bernilai lebih besar daripada Mean." },
      { id: "C", text: "Karena nilai Mean terdistorsi/tertarik tinggi oleh nilai ekstrem Rp500.000, sehingga tidak mencerminkan keadaan pekerja kebanyakan." },
      { id: "D", text: "Karena perhitungan Median tidak memerlukan data diurutkan." }
    ],
    correctOption: "C",
    explanation: "Nilai Mean sangat rentan terhadap data pencilan (outlier) ekstrem. Satu nilai yang terlampau tinggi akan mengangkat rata-rata secara semu, sementara Median tetap stabil di nilai tengah.",
    xpReward: 60
  }
];

const ChallengePage = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const { addXp } = useAuth();

  const currentChallenge = SAMPLE_CHALLENGES[currentIndex];
  const isCorrect = selectedOption === currentChallenge.correctOption;

  const handleSelectOption = (optId) => {
    if (isAnswered) return;
    setSelectedOption(optId);
  };

  const handleCheckAnswer = () => {
    if (!selectedOption) return;
    setIsAnswered(true);

    if (selectedOption === currentChallenge.correctOption) {
      addXp(currentChallenge.xpReward);
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.7 }
      });
    }
  };

  const handleNextChallenge = () => {
    setSelectedOption(null);
    setIsAnswered(false);
    setCurrentIndex((prev) => (prev + 1) % SAMPLE_CHALLENGES.length);
  };

  return (
    <div className="w-full max-w-md mx-auto min-h-screen pb-24 px-5 pt-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <span className="text-[11px] font-semibold text-purple-400 uppercase tracking-wider">
            Literasi Matematis
          </span>
          <h2 className="text-xl font-black text-white">Tantangan Kontekstual ⚔️</h2>
        </div>
        <div className="text-xs bg-slate-800 border border-slate-700 px-3 py-1.5 rounded-xl font-bold text-amber-400">
          Kasus {currentIndex + 1} / {SAMPLE_CHALLENGES.length}
        </div>
      </div>

      {/* Challenge Card */}
      <div className="p-5 rounded-3xl bg-slate-800/90 border border-slate-700/80 shadow-lg mb-4">
        {/* Dimension Badge */}
        <div className="flex items-center justify-between mb-3">
          <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-purple-950/70 border border-purple-800/60 text-purple-300">
            {currentChallenge.dimensionLabel}
          </span>
          <span className="text-xs font-bold text-amber-400">+{currentChallenge.xpReward} XP</span>
        </div>

        <h3 className="text-base font-bold text-white mb-2 leading-snug">
          {currentChallenge.title}
        </h3>

        {/* Story Scenario Box */}
        <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 text-xs text-slate-300 leading-relaxed mb-4">
          📖 {currentChallenge.scenario}
        </div>

        {/* Question Prompt */}
        <p className="text-xs font-bold text-cyan-300 mb-3.5">
          ❓ {currentChallenge.question}
        </p>

        {/* Options */}
        <div className="space-y-2.5">
          {currentChallenge.options.map((opt) => {
            const isSelected = selectedOption === opt.id;
            let btnStyle = 'bg-slate-800 border-slate-700 text-slate-200 hover:bg-slate-700/60';

            if (isAnswered) {
              if (opt.id === currentChallenge.correctOption) {
                btnStyle = 'bg-emerald-950/80 border-emerald-500 text-emerald-200 shadow-sm';
              } else if (isSelected) {
                btnStyle = 'bg-rose-950/80 border-rose-500 text-rose-200';
              } else {
                btnStyle = 'bg-slate-900/50 border-slate-800 text-slate-500 opacity-60';
              }
            } else if (isSelected) {
              btnStyle = 'bg-indigo-600/30 border-indigo-500 text-white shadow-game-glow';
            }

            return (
              <button
                key={opt.id}
                onClick={() => handleSelectOption(opt.id)}
                disabled={isAnswered}
                className={`w-full p-3 rounded-2xl border text-left text-xs font-medium flex items-start gap-3 transition ${btnStyle}`}
              >
                <span className="w-5 h-5 rounded-lg bg-slate-900/80 border border-slate-700 flex items-center justify-center font-bold text-[11px] shrink-0 mt-0.5">
                  {opt.id}
                </span>
                <span className="leading-snug">{opt.text}</span>
              </button>
            );
          })}
        </div>

        {/* Action Button */}
        {!isAnswered ? (
          <button
            onClick={handleCheckAnswer}
            disabled={!selectedOption}
            className="w-full mt-4 py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-bold text-xs shadow-game-glow hover:opacity-95 active:scale-[0.98] transition disabled:opacity-50"
          >
            Kunci Jawaban Saya
          </button>
        ) : (
          <button
            onClick={handleNextChallenge}
            className="w-full mt-4 py-3 rounded-xl bg-slate-700 hover:bg-slate-600 text-white font-bold text-xs flex items-center justify-center gap-2 transition"
          >
            <span>Tantangan Berikutnya</span>
            <ArrowRight size={16} />
          </button>
        )}
      </div>

      {/* Explanatory Feedback Drawer */}
      {isAnswered && (
        <div
          className={`p-4 rounded-2xl border text-xs leading-relaxed animate-fade-in ${
            isCorrect
              ? 'bg-emerald-950/60 border-emerald-500/50 text-emerald-200'
              : 'bg-rose-950/60 border-rose-500/50 text-rose-200'
          }`}
        >
          <div className="flex items-center gap-2 font-bold mb-1.5">
            {isCorrect ? (
              <>
                <CheckCircle2 size={18} className="text-emerald-400" />
                <span className="text-emerald-300">Luar biasa, jawabanmu tepat! (+{currentChallenge.xpReward} XP)</span>
              </>
            ) : (
              <>
                <XCircle size={18} className="text-rose-400" />
                <span className="text-rose-300">Belum tepat, mari kita pelajari konsepnya:</span>
              </>
            )}
          </div>
          <p className="text-slate-300 text-[11px] mt-1 pl-6">
            {currentChallenge.explanation}
          </p>
        </div>
      )}
    </div>
  );
};

export default ChallengePage;
