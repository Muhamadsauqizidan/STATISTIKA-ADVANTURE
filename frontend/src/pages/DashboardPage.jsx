import React from 'react';
import { 
  Play, 
  Map, 
  Box, 
  Swords, 
  FileCheck2, 
  Sparkles, 
  Trophy, 
  ChevronRight, 
  Star,
  CheckCircle2,
  Lock
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { ADVENTURE_LEVELS, GAME_BADGES } from '../data/mockData';

const DashboardPage = ({ onNavigate }) => {
  const { student } = useAuth();

  if (!student) return null;

  const currentLevelNum = student.current_level || 1;
  const currentLevelData = ADVENTURE_LEVELS.find(l => l.level_number === currentLevelNum) || ADVENTURE_LEVELS[0];
  const progressPercent = Math.min(100, Math.round(((student.completed_levels?.length || 0) / 8) * 100));

  return (
    <div className="w-full max-w-md mx-auto min-h-screen pb-24 px-5 pt-4">
      {/* Welcome Hero Card */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-indigo-900/80 via-slate-900 to-slate-900 border border-indigo-500/30 p-5 shadow-game-glow mb-5">
        <div className="flex items-start justify-between">
          <div>
            <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-cyan-400 bg-cyan-950/60 border border-cyan-800/60 px-2.5 py-0.5 rounded-full mb-2">
              <Sparkles size={11} /> Kelas {student.class_name} • {student.school_name || 'SMP'}
            </span>
            <h2 className="text-xl font-black text-white tracking-tight">
              Halo, <span className="text-gradient">{student.name}</span>! 👋
            </h2>
            <p className="text-xs text-slate-300 mt-1">
              Petualangan datamu sedang berjalan lancar!
            </p>
          </div>

          <div className="w-12 h-12 rounded-2xl bg-indigo-600/30 border border-indigo-500/40 flex items-center justify-center text-2xl shadow-inner">
            🧑‍🎓
          </div>
        </div>

        {/* Level & XP Quick Bar */}
        <div className="mt-4 pt-4 border-t border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
              <Trophy size={16} />
            </div>
            <div>
              <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Total Poin</p>
              <p className="text-sm font-black text-amber-300">{student.total_xp || 0} XP</p>
            </div>
          </div>

          <div className="h-8 w-px bg-slate-800"></div>

          <div>
            <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider text-right">Progres Kurikulum</p>
            <p className="text-sm font-black text-cyan-400 text-right">{progressPercent}% Selesai</p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-slate-800 h-2 rounded-full mt-3 overflow-hidden">
          <div 
            className="bg-gradient-to-r from-indigo-500 to-cyan-400 h-full rounded-full transition-all duration-500"
            style={{ width: `${Math.max(5, progressPercent)}%` }}
          />
        </div>
      </div>

      {/* Current Objective / Mission Card */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2.5 px-1">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Misi Aktif Kamu</h3>
          <span className="text-[11px] font-semibold text-indigo-400">Level {currentLevelNum} dari 8</span>
        </div>

        <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/80 flex items-center justify-between gap-3 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center text-white font-bold text-base shadow-game-glow shrink-0">
              {currentLevelNum}
            </div>
            <div>
              <h4 className="text-sm font-bold text-white leading-snug">{currentLevelData.title}</h4>
              <p className="text-xs text-slate-400 mt-0.5 line-clamp-1">{currentLevelData.subtitle}</p>
              <div className="flex items-center gap-2 mt-1.5">
                <span className="text-[10px] font-semibold text-amber-300 bg-amber-950/40 border border-amber-800/50 px-2 py-0.5 rounded-md">
                  +{currentLevelData.xp_reward} XP
                </span>
                <span className="text-[10px] text-slate-400">Siap Dipelajari</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => onNavigate('map')}
            className="p-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white shadow-game-glow active:scale-95 transition shrink-0"
          >
            <Play size={18} fill="currentColor" />
          </button>
        </div>
      </div>

      {/* 4 Main Core Action Menus */}
      <div className="mb-6">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2.5 px-1">
          Menu Utama Pembelajaran
        </h3>

        <div className="grid grid-cols-2 gap-3">
          {/* Peta Petualangan */}
          <button
            onClick={() => onNavigate('map')}
            className="p-4 rounded-2xl bg-gradient-to-b from-slate-800/90 to-slate-800/50 border border-slate-700/70 text-left hover:border-indigo-500/50 active:scale-[0.98] transition group"
          >
            <div className="w-10 h-10 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center mb-2.5 group-hover:scale-110 transition">
              <Map size={22} />
            </div>
            <h4 className="text-xs font-bold text-white group-hover:text-indigo-300 transition">Peta Petualangan</h4>
            <p className="text-[11px] text-slate-400 mt-1 leading-snug">Jelajahi 8 level statistika bertahap.</p>
          </button>

          {/* Lab 3D Visualisasi */}
          <button
            onClick={() => onNavigate('lab')}
            className="p-4 rounded-2xl bg-gradient-to-b from-slate-800/90 to-slate-800/50 border border-slate-700/70 text-left hover:border-cyan-500/50 active:scale-[0.98] transition group"
          >
            <div className="w-10 h-10 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center mb-2.5 group-hover:scale-110 transition">
              <Box size={22} />
            </div>
            <h4 className="text-xs font-bold text-white group-hover:text-cyan-300 transition">Lab Visualisasi 3D</h4>
            <p className="text-[11px] text-slate-400 mt-1 leading-snug">Eksplor grafik batang, lingkaran, & garis.</p>
          </button>

          {/* Latihan & Tantangan */}
          <button
            onClick={() => onNavigate('challenge')}
            className="p-4 rounded-2xl bg-gradient-to-b from-slate-800/90 to-slate-800/50 border border-slate-700/70 text-left hover:border-purple-500/50 active:scale-[0.98] transition group"
          >
            <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center mb-2.5 group-hover:scale-110 transition">
              <Swords size={22} />
            </div>
            <h4 className="text-xs font-bold text-white group-hover:text-purple-300 transition">Tantangan Literasi</h4>
            <p className="text-[11px] text-slate-400 mt-1 leading-snug">Soal kontekstual kehidupan sehari-hari.</p>
          </button>

          {/* Evaluasi / Kuis */}
          <button
            onClick={() => onNavigate('evaluation')}
            className="p-4 rounded-2xl bg-gradient-to-b from-slate-800/90 to-slate-800/50 border border-slate-700/70 text-left hover:border-emerald-500/50 active:scale-[0.98] transition group"
          >
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-2.5 group-hover:scale-110 transition">
              <FileCheck2 size={22} />
            </div>
            <h4 className="text-xs font-bold text-white group-hover:text-emerald-300 transition">Evaluasi & Tes</h4>
            <p className="text-[11px] text-slate-400 mt-1 leading-snug">Pretest, posttest & analisis N-Gain.</p>
          </button>
        </div>
      </div>

      {/* Badges Collection Showcase */}
      <div>
        <div className="flex items-center justify-between mb-2.5 px-1">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Koleksi Lencana</h3>
          <button 
            onClick={() => onNavigate('profile')}
            className="text-[11px] font-semibold text-indigo-400 flex items-center gap-0.5 hover:underline"
          >
            Lihat Semua <ChevronRight size={12} />
          </button>
        </div>

        <div className="flex gap-2.5 overflow-x-auto pb-2 -mx-1 px-1 scrollbar-none">
          {GAME_BADGES.slice(0, 4).map((badge) => (
            <div
              key={badge.id}
              className={`shrink-0 w-28 p-3 rounded-2xl border flex flex-col items-center text-center transition ${
                badge.unlocked
                  ? 'bg-slate-800/80 border-amber-500/40 shadow-sm'
                  : 'bg-slate-900/60 border-slate-800 opacity-60'
              }`}
            >
              <div className="text-2xl mb-1 select-none">
                {badge.unlocked ? badge.icon : '🔒'}
              </div>
              <p className="text-[11px] font-bold text-white leading-tight truncate w-full">
                {badge.name}
              </p>
              <span className={`text-[9px] mt-1 px-1.5 py-0.5 rounded font-medium ${
                badge.unlocked ? 'bg-amber-950/60 text-amber-300' : 'bg-slate-800 text-slate-400'
              }`}>
                {badge.unlocked ? 'Diraih' : 'Terkunci'}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
