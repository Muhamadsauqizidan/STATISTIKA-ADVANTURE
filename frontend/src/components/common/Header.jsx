import React from 'react';
import { Sparkles, Trophy, LogOut } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const Header = ({ onLogout }) => {
  const { student } = useAuth();

  return (
    <header className="sticky top-0 z-40 w-full max-w-md mx-auto bg-slate-900/80 backdrop-blur-md border-b border-slate-800/80 px-4 py-3 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-500 to-cyan-400 flex items-center justify-center shadow-game-glow">
          <span className="text-base select-none">📊</span>
        </div>
        <div>
          <h1 className="text-sm font-bold tracking-tight text-white leading-none">
            STATISTIKA <span className="text-cyan-400">ADVENTURE</span>
          </h1>
          <p className="text-[10px] text-slate-400 mt-0.5">Matematika SMP Kelas VIII</p>
        </div>
      </div>

      {student && (
        <div className="flex items-center gap-2">
          {/* XP Pill */}
          <div className="flex items-center gap-1.5 bg-slate-800/90 border border-amber-500/30 px-2.5 py-1 rounded-full shadow-sm">
            <Sparkles size={13} className="text-amber-400 fill-amber-400" />
            <span className="text-xs font-bold text-amber-300">
              {student.total_xp || 0} <span className="text-[10px] font-normal text-amber-400/80">XP</span>
            </span>
          </div>

          {/* Level Pill */}
          <div className="flex items-center gap-1 bg-indigo-950/80 border border-indigo-500/40 px-2 py-1 rounded-full">
            <Trophy size={12} className="text-indigo-400" />
            <span className="text-xs font-bold text-indigo-200">
              Lv.{student.current_level || 1}
            </span>
          </div>

          {/* Logout Button */}
          <button
            onClick={onLogout}
            title="Keluar"
            className="p-1.5 text-slate-400 hover:text-rose-400 rounded-lg hover:bg-slate-800/60 transition-colors"
          >
            <LogOut size={16} />
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;
