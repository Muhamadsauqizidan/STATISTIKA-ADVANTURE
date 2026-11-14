import React, { useState, useEffect } from 'react';
import { Compass, CheckCircle2, Lock, Star, ChevronRight, Play } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';
import { ADVENTURE_LEVELS as FALLBACK_LEVELS } from '../data/mockData';

const AdventureMapPage = ({ onSelectLevel }) => {
  const { student } = useAuth();
  const [levels, setLevels] = useState(FALLBACK_LEVELS);
  const [loading, setLoading] = useState(false);

  const currentLvl = student?.current_level || 1;
  const completedLevels = student?.completed_levels || [];

  useEffect(() => {
    let isMounted = true;
    const fetchMaterials = async () => {
      try {
        setLoading(true);
        const res = await api.getMaterials();
        if (isMounted && res && res.success && res.data && res.data.length > 0) {
          setLevels(res.data);
        }
      } catch (e) {
        // Gunakan fallback static data
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    fetchMaterials();
    return () => { isMounted = false; };
  }, []);

  return (
    <div className="w-full max-w-md mx-auto min-h-screen pb-24 px-5 pt-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <span className="text-[11px] font-semibold text-indigo-400 uppercase tracking-wider">
            Jalur Pembelajaran
          </span>
          <h2 className="text-xl font-black text-white">Peta Petualangan 🗺️</h2>
        </div>
        <div className="text-xs bg-slate-800 border border-slate-700 px-3 py-1.5 rounded-xl font-bold text-cyan-400">
          {completedLevels.length} / 8 Level
        </div>
      </div>

      <p className="text-xs text-slate-300 mb-6 leading-relaxed">
        Selesaikan setiap pulau materi secara bertahap untuk membuka pulau berikutnya dan meraih lencana master statistika!
      </p>

      {/* Vertical Adventure Path */}
      <div className="relative pl-6 space-y-6 before:absolute before:left-3.5 before:top-4 before:bottom-4 before:w-0.5 before:bg-gradient-to-b before:from-emerald-500 before:via-indigo-500 before:to-slate-800">
        {levels.map((level) => {
          const isCompleted = completedLevels.includes(level.level_number);
          const isCurrent = level.level_number === currentLvl;
          const isLocked = level.level_number > currentLvl;

          return (
            <div key={level.id || level.level_number} className="relative">
              {/* Path Node Marker */}
              <div
                className={`absolute -left-6 top-3 w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs shadow-md z-10 transition ${
                  isCompleted
                    ? 'bg-emerald-500 text-slate-950 ring-4 ring-emerald-500/20'
                    : isCurrent
                    ? 'bg-indigo-600 text-white ring-4 ring-indigo-500/40 animate-pulse'
                    : 'bg-slate-800 text-slate-500 border border-slate-700'
                }`}
              >
                {isCompleted ? <CheckCircle2 size={16} /> : isLocked ? <Lock size={13} /> : level.level_number}
              </div>

              {/* Level Card */}
              <div
                onClick={() => !isLocked && onSelectLevel(level.level_number)}
                className={`p-4 rounded-2xl border transition ${
                  isCurrent
                    ? 'bg-gradient-to-r from-slate-800 via-indigo-950/40 to-slate-800 border-indigo-500/60 shadow-game-glow cursor-pointer'
                    : isCompleted
                    ? 'bg-slate-800/80 border-slate-700/80 hover:border-slate-600 cursor-pointer'
                    : 'bg-slate-900/50 border-slate-800/60 opacity-60 cursor-not-allowed'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-400">
                        Level {level.level_number}
                      </span>
                      {isCompleted && (
                        <div className="flex items-center text-amber-400 text-[10px]">
                          <Star size={11} fill="currentColor" />
                          <Star size={11} fill="currentColor" />
                          <Star size={11} fill="currentColor" />
                        </div>
                      )}
                    </div>
                    <h3 className="text-sm font-bold text-white mt-0.5">{level.title}</h3>
                    <p className="text-xs text-slate-300 font-medium">{level.subtitle}</p>
                    <p className="text-[11px] text-slate-400 mt-1 leading-snug">{level.description}</p>
                  </div>

                  <div className="shrink-0 pt-1">
                    {isCurrent ? (
                      <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-indigo-600 text-white text-xs font-bold shadow-game-glow">
                        <Play size={12} fill="currentColor" /> Masuk
                      </span>
                    ) : isCompleted ? (
                      <span className="text-xs text-slate-400 hover:text-white flex items-center gap-0.5">
                        Ulas <ChevronRight size={14} />
                      </span>
                    ) : (
                      <span className="p-2 rounded-xl bg-slate-800/60 text-slate-500">
                        <Lock size={16} />
                      </span>
                    )}
                  </div>
                </div>

                <div className="mt-3 pt-2.5 border-t border-slate-700/60 flex items-center justify-between text-[11px]">
                  <span className="text-amber-400 font-semibold">+{level.xp_reward || 100} XP</span>
                  <span className="text-slate-400">
                    {isCompleted ? 'Selesai' : isCurrent ? 'Tersedia Sekarang' : 'Terkunci'}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AdventureMapPage;
