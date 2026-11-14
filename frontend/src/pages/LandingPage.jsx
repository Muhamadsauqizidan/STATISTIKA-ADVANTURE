
import {
  ArrowRight,
  Compass,
  Box,
  Trophy,
  BookOpen,
  ShieldCheck,
} from 'lucide-react';

import ThreeHeroChart from '../components/visualization/ThreeHeroChart';

const LandingPage = ({ onStartLogin, onExploreDemo }) => {
  const features = [
    {
      icon: Box,
      title: 'Lab 2D & 3D',
      description: 'Rotasi grafik dan manipulasi data secara interaktif.',
      color: 'bg-indigo-500/20 text-indigo-400',
    },
    {
      icon: Compass,
      title: '8 Pulau Belajar',
      description: 'Jelajahi materi statistika melalui petualangan.',
      color: 'bg-purple-500/20 text-purple-400',
    },
    {
      icon: BookOpen,
      title: 'Literasi PISA',
      description: 'Belajar melalui kasus kantin, perpustakaan, dan uang saku.',
      color: 'bg-cyan-500/20 text-cyan-400',
    },
    {
      icon: Trophy,
      title: 'XP & Lencana',
      description: 'Dapatkan pengalaman dan lencana setelah belajar.',
      color: 'bg-amber-500/20 text-amber-400',
    },
  ];

  return (
    <div className="w-full min-h-screen bg-game-bg text-white pb-10">

      {/* HEADER */}
      <header className="w-full border-b border-slate-800/70">
        <div className="max-w-7xl mx-auto px-5 md:px-10 py-5 flex items-center justify-between">

          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-indigo-500 via-purple-500 to-cyan-400 flex items-center justify-center shadow-game-glow">
              <span className="text-2xl">📊</span>
            </div>

            <div>
              <h1 className="text-lg md:text-xl font-extrabold tracking-tight">
                STATISTIKA <span className="text-cyan-400">ADVENTURE</span>
              </h1>
              <p className="text-xs md:text-sm text-slate-400">
                Fase D Kurikulum Merdeka
              </p>
            </div>
          </div>

          <button
            onClick={onStartLogin}
            className="px-4 md:px-6 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-indigo-300 font-semibold text-sm hover:bg-slate-700 transition"
          >
            Masuk Kode
          </button>
        </div>
      </header>

      {/* HERO SECTION */}
      <main className="max-w-7xl mx-auto px-5 md:px-10">

        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 items-center py-10 md:py-16">

          {/* GRAFIK 3D */}
          <div className="w-full order-2 lg:order-1">
            <div className="relative rounded-3xl overflow-hidden bg-gradient-to-b from-slate-900 to-slate-900/50 border border-slate-800 p-3 md:p-5 shadow-xl">
              <ThreeHeroChart />
            </div>

            <p className="text-center text-xs text-slate-500 mt-3">
              Sentuh dan geser grafik untuk melihat visualisasi 3D
            </p>
          </div>

          {/* TEKS UTAMA */}
          <div className="order-1 lg:order-2 text-center lg:text-left">

            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs md:text-sm font-medium mb-5">
              <Compass size={16} />
              Petualangan Menjelajah Dunia Data
            </div>

            <h2 className="text-3xl md:text-5xl xl:text-6xl font-black tracking-tight leading-tight">
              Belajar Statistika Jadi
              <span className="block text-gradient mt-2">
                Mudah, Seru & Nyata!
              </span>
            </h2>

            <p className="text-sm md:text-base text-slate-300 mt-6 leading-relaxed max-w-xl mx-auto lg:mx-0">
              Bantu dirimu memahami mean, median, modus, dan penyajian grafik
              melalui laboratorium 3D interaktif serta tantangan kontekstual
              yang menyenangkan untuk siswa SMP.
            </p>

            {/* TOMBOL */}
            <div className="flex flex-col sm:flex-row gap-3 mt-8">
              <button
                onClick={onStartLogin}
                className="w-full sm:w-auto px-7 py-4 rounded-2xl bg-gradient-to-r from-indigo-500 via-indigo-600 to-purple-600 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-game-glow hover:opacity-90 active:scale-95 transition"
              >
                Mulai Petualangan
                <ArrowRight size={18} />
              </button>

              <button
                onClick={onExploreDemo}
                className="w-full sm:w-auto px-7 py-4 rounded-2xl bg-slate-800 border border-slate-700 text-slate-300 font-semibold text-sm flex items-center justify-center gap-2 hover:bg-slate-700 transition"
              >
                <Box size={17} className="text-cyan-400" />
                Coba Akun Demo
              </button>
            </div>

          </div>
        </section>

        {/* FITUR UNGGULAN */}
        <section className="py-10 border-t border-slate-800/70">

          <div className="text-center mb-8">
            <p className="text-sm font-bold text-indigo-400 uppercase tracking-widest">
              Fitur Unggulan
            </p>

            <h3 className="text-2xl md:text-3xl font-extrabold mt-2">
              Petualangan Belajar yang Menyenangkan
            </h3>

            <p className="text-sm text-slate-400 mt-2">
              Temukan berbagai pengalaman belajar statistika yang interaktif.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

            {features.map((feature, index) => {
              const Icon = feature.icon;

              return (
                <div
                  key={index}
                  className="p-5 rounded-2xl bg-slate-800/60 border border-slate-700/60 hover:border-indigo-500/50 hover:-translate-y-1 transition duration-300"
                >
                  <div className={`w-11 h-11 rounded-xl ${feature.color} flex items-center justify-center mb-4`}>
                    <Icon size={22} />
                  </div>

                  <h4 className="text-base font-bold text-white">
                    {feature.title}
                  </h4>

                  <p className="text-sm text-slate-400 mt-2 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              );
            })}

          </div>
        </section>

        {/* FOOTER */}
        <footer className="pt-8 border-t border-slate-800/70 text-center">
          <div className="flex items-center justify-center gap-2 text-xs md:text-sm text-slate-500">
            <ShieldCheck size={16} className="text-emerald-500" />
            Dirancang untuk Pembelajaran Matematika SMP Kelas VIII
          </div>

          <p className="text-xs text-slate-600 mt-3">
            © 2026 Statistika Adventure
          </p>
        </footer>

      </main>
    </div>
  );
};

export default LandingPage;
