import React from 'react';
import { Home, Map, Box, Swords, User } from 'lucide-react';

const BottomNav = ({ activeTab, onTabChange }) => {
  const navItems = [
    { id: 'dashboard', label: 'Beranda', icon: Home },
    { id: 'map', label: 'Peta', icon: Map },
    { id: 'lab', label: 'Lab 3D', icon: Box },
    { id: 'challenge', label: 'Tantangan', icon: Swords },
    { id: 'profile', label: 'Profil', icon: User },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 max-w-md mx-auto bg-slate-900/90 backdrop-blur-lg border-t border-slate-800/80 px-2 py-2 safe-bottom">
      <div className="flex items-center justify-around">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`flex flex-col items-center justify-center w-16 py-1 rounded-xl transition-all duration-200 ${
                isActive
                  ? 'text-cyan-400 font-semibold scale-105'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <div
                className={`p-1.5 rounded-xl transition-all ${
                  isActive ? 'bg-indigo-600/30 text-cyan-300 shadow-cyan-glow' : ''
                }`}
              >
                <Icon size={20} strokeWidth={isActive ? 2.5 : 2} />
              </div>
              <span className="text-[10px] mt-0.5 tracking-tight">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;
