import React, { useState } from 'react';
import { ArrowLeft, KeyRound, Sparkles, AlertCircle, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { DEMO_STUDENTS } from '../data/mockData';

const LoginPage = ({ onBack, onSuccess }) => {
  const [code, setCode] = useState('');
  const { loginWithCode, loading, error, setError } = useAuth();
  const [successInfo, setSuccessInfo] = useState(null);

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    if (!code.trim()) {
      setError('Masukkan kode siswa terlebih dahulu.');
      return;
    }

    const result = await loginWithCode(code);
    if (result.success) {
      setSuccessInfo(result.student);
      setTimeout(() => {
        onSuccess(result.student);
      }, 1200);
    }
  };

  const handleSelectDemo = (demoCode) => {
    setCode(demoCode);
    setError(null);
  };

  return (
    <div className="w-full max-w-md mx-auto min-h-screen flex flex-col bg-game-bg px-6 py-6 justify-between">
      <div>
        {/* Back Button */}
        <button
          onClick={onBack}
          className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white px-3 py-2 rounded-xl bg-slate-800/60 border border-slate-700/60 mb-6 transition"
        >
          <ArrowLeft size={16} />
          <span>Kembali</span>
        </button>

        {/* Header Icon */}
        <div className="text-center mb-6">
          <div className="w-16 h-16 mx-auto rounded-3xl bg-gradient-to-tr from-indigo-500 via-purple-500 to-cyan-400 flex items-center justify-center shadow-game-glow mb-4">
            <KeyRound size={32} className="text-white" />
          </div>
          <h2 className="text-2xl font-black text-white tracking-tight">Masuk Siswa</h2>
          <p className="text-xs text-slate-400 mt-1.5 max-w-xs mx-auto">
            Masukkan kode unik siswa yang diberikan oleh gurumu untuk melanjutkan petualangan data.
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5 ml-1">
              Kode Siswa:
            </label>
            <div className="relative">
              <input
                type="text"
                value={code}
                onChange={(e) => {
                  setCode(e.target.value.toUpperCase());
                  if (error) setError(null);
                }}
                placeholder="Contoh: SA8A01"
                maxLength={10}
                className="w-full py-3.5 px-4 rounded-2xl bg-slate-800/90 border border-slate-700 text-white placeholder-slate-500 text-center font-mono font-bold text-lg tracking-widest focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30 transition uppercase"
              />
              <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500">
                <Sparkles size={18} />
              </span>
            </div>
          </div>

          {/* Error Alert */}
          {error && (
            <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-start gap-2 animate-shake">
              <AlertCircle size={16} className="shrink-0 mt-0.5 text-rose-400" />
              <span>{error}</span>
            </div>
          )}

          {/* Success Notification */}
          {successInfo && (
            <div className="p-3.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2.5">
              <CheckCircle2 size={20} className="shrink-0 text-emerald-400" />
              <div>
                <p className="font-bold text-emerald-200">Selamat datang, {successInfo.name}!</p>
                <p className="text-[11px] text-emerald-300/80">Kelas {successInfo.class_name} • Membuka Dashboard...</p>
              </div>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading || !!successInfo}
            className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-indigo-500 via-indigo-600 to-purple-600 text-white font-bold text-sm shadow-game-glow hover:opacity-95 active:scale-[0.98] transition disabled:opacity-60 flex items-center justify-center gap-2"
          >
            {loading ? (
              <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
            ) : (
              <span>Masuk Petualangan</span>
            )}
          </button>
        </form>

        {/* Demo Code Selector Chips */}
        <div className="mt-8 pt-6 border-t border-slate-800">
          <p className="text-xs font-semibold text-slate-400 mb-2.5 text-center">
            Atau pilih akun siswa demo pengujian:
          </p>
          <div className="space-y-2">
            {DEMO_STUDENTS.map((std) => (
              <button
                key={std.id}
                type="button"
                onClick={() => handleSelectDemo(std.student_code)}
                className={`w-full p-2.5 rounded-xl border text-left flex items-center justify-between transition ${
                  code === std.student_code
                    ? 'bg-indigo-600/20 border-indigo-500 text-white shadow-sm'
                    : 'bg-slate-800/40 border-slate-700/60 text-slate-300 hover:bg-slate-800'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-slate-700 flex items-center justify-center font-bold text-xs text-cyan-400">
                    {std.class_name}
                  </div>
                  <div>
                    <p className="text-xs font-bold leading-tight">{std.name}</p>
                    <p className="text-[10px] text-slate-400">Level {std.current_level} • {std.total_xp} XP</p>
                  </div>
                </div>
                <span className="font-mono text-xs font-semibold px-2 py-0.5 rounded bg-slate-900 border border-slate-700 text-amber-400">
                  {std.student_code}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="text-center text-[11px] text-slate-500 mt-6">
        Tidak perlu mengingat email & kata sandi yang rumit.
      </div>
    </div>
  );
};

export default LoginPage;
