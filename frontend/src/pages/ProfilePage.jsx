import React from 'react';
import { User, Trophy, Sparkles, Award, ShieldCheck, LogOut, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { GAME_BADGES } from '../data/mockData';

const ProfilePage = ({ onLogout }) => {
  const { student } = useAuth();

  if (!student) return null;

  return (
    <div className="w-full max-w-md mx-auto min-h-screen pb-24 px-5 pt-4">
      {/* Profile Card */}
      <div className="p-5 rounded-3xl bg-gradient-to-b from-slate-800 to-slate-900 border border-slate-700/80 text-center relative overflow-hidden shadow-lg mb-6">
        <div className="w-20 h-20 mx-auto rounded-3xl bg-gradient-to-tr from-indigo-500 via-purple-500 to-cyan-400 p-1 shadow-game-glow mb-3">
          <div className="w-full h-full bg-slate-900 rounded-[22px] flex items-center justify-center text-3xl">
            🧑‍🎓
          </div>
        </div>

        <h2 className="text-lg font-black text-white">{student.name}</h2>
        <p className="text-xs text-slate-300 font-medium mt-0.5">
          Kelas {student.class_name} • {student.school_name || 'SMP'}
        </p>

        {/* Student Code Badge */}
        <div className="inline-flex items-center gap-1.5 mt-2 px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-xs text-slate-300">
          <span className="text-slate-500">Kode Siswa:</span>
          <span className="font-mono font-bold text-amber-400">{student.student_code}</span>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-3 gap-2 mt-5 pt-4 border-t border-slate-800">
          <div className="p-2 rounded-xl bg-slate-800/50">
            <p className="text-[10px] text-slate-400 uppercase font-bold">Level</p>
            <p className="text-base font-black text-indigo-400">{student.current_level || 1}</p>
          </div>
          <div className="p-2 rounded-xl bg-slate-800/50">
            <p className="text-[10px] text-slate-400 uppercase font-bold">Total XP</p>
            <p className="text-base font-black text-amber-300">{student.total_xp || 0}</p>
          </div>
          <div className="p-2 rounded-xl bg-slate-800/50">
            <p className="text-[10px] text-slate-400 uppercase font-bold">Tamat</p>
            <p className="text-base font-black text-emerald-400">{student.completed_levels?.length || 0} Lvl</p>
          </div>
        </div>
      </div>

      {/* Badges Collection Section */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3 px-1">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
            <Award size={15} className="text-amber-400" />
            <span>Koleksi Lencana Penghargaan</span>
          </h3>
          <span className="text-[11px] font-semibold text-slate-400">
            {GAME_BADGES.filter(b => b.unlocked).length} / {GAME_BADGES.length}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {GAME_BADGES.map((badge) => (
            <div
              key={badge.id}
              className={`p-3.5 rounded-2xl border flex flex-col justify-between transition ${
                badge.unlocked
                  ? 'bg-slate-800/80 border-amber-500/40 shadow-sm'
                  : 'bg-slate-900/50 border-slate-800/60 opacity-50'
              }`}
            >
              <div>
                <div className="text-3xl mb-2 select-none">
                  {badge.unlocked ? badge.icon : '🔒'}
                </div>
                <h4 className="text-xs font-bold text-white">{badge.name}</h4>
                <p className="text-[10px] text-slate-400 mt-1 leading-snug">{badge.description}</p>
              </div>

              <div className="mt-3 pt-2 border-t border-slate-800 flex items-center justify-between">
                <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${
                  badge.unlocked
                    ? 'bg-emerald-950/60 text-emerald-400 border border-emerald-800/50'
                    : 'bg-slate-800 text-slate-500'
                }`}>
                  {badge.unlocked ? 'Telah Diraih' : 'Belum Terbuka'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Logout Action */}
      <button
        onClick={onLogout}
        className="w-full py-3 px-4 rounded-2xl bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 text-rose-300 font-semibold text-xs flex items-center justify-center gap-2 transition"
      >
        <LogOut size={16} />
        <span>Keluar dari Akun Siswa</span>
      </button>
    </div>
  );
};

export default ProfilePage;
