'use client';

import { Menu, Globe, User, ChevronDown } from 'lucide-react';
import { useAppStore } from '@/store/useAppStore'; // Import Store
import { translations } from '@/utils/translations'; // Import Kamus

export default function Navbar() {
  const { language, setLanguage } = useAppStore(); // Hubungkan ke Store
  const t = translations[language];

  return (
    <nav className="h-16 border-b-2 border-gray-300 bg-white flex items-center justify-between px-6 sticky top-0 z-10 shadow-sm">
      {/* Tombol Menu - Kontras Tinggi */}
      <div className="flex items-center gap-4">
        <button className="p-2 hover:bg-gray-100 rounded-xl transition-colors text-gray-900 border border-transparent hover:border-gray-300">
          <Menu size={24} />
        </button>
      </div>

      <div className="flex items-center gap-6">
        {/* Dropdown Bahasa - Dibuat Jelas dan Tidak Samar */}
        <div className="flex items-center gap-2 border-2 border-gray-900 px-4 py-1.5 rounded-full hover:bg-gray-50 transition-all shadow-sm group">
          <Globe size={18} className="text-blue-700 group-hover:rotate-12 transition-transform" />
          <div className="flex items-center gap-1">
            <select 
              value={language} 
              onChange={(e) => setLanguage(e.target.value as 'en' | 'id')}
              className="bg-transparent text-xs font-black text-gray-900 focus:outline-none cursor-pointer uppercase tracking-tighter appearance-none pr-1"
            >
              <option value="id">ID Indonesia</option>
              <option value="en">EN English</option>
            </select>
            <ChevronDown size={14} className="text-gray-900" />
          </div>
        </div>

        {/* Info User - Teks dipertegas */}
        <div className="flex items-center gap-3 border-l-2 border-gray-300 pl-6">
          <div className="flex flex-col items-end hidden md:flex">
            <span className="text-xs font-black text-gray-900 uppercase tracking-tight">
              Saiful Anwar
            </span>
            <span className="text-[10px] font-bold text-blue-700 leading-none">
              Administrator
            </span>
          </div>
          <div className="w-10 h-10 bg-gradient-to-br from-pink-400 to-pink-600 rounded-full flex items-center justify-center shadow-md border-2 border-white ring-2 ring-pink-100">
            <User size={20} className="text-white" />
          </div>
        </div>
      </div>
    </nav>
  );
}