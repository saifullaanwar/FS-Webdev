'use client';

import { useState } from 'react';
import { Menu, Globe, User, ChevronDown, Check } from 'lucide-react';
import { useAppStore } from '@/store/useAppStore'; 
import { translations } from '@/utils/translations'; 

export default function Navbar() {
  // Ambil state language, setLanguage, dan toggleSidebar dari store
  const { language, setLanguage, toggleSidebar } = useAppStore(); 
  const [isOpen, setIsOpen] = useState(false); // State untuk kontrol buka-tutup dropdown bahasa
  const t = translations[language];

  const languages = [
    { code: 'id', label: 'ID Indonesia', flag: '🇮🇩' },
    { code: 'en', label: 'EN English', flag: '🇺🇸' },
  ];

  return (
    <nav className="h-16 border-b-2 border-gray-200 bg-white flex items-center justify-between px-6 sticky top-0 z-50 shadow-sm">
      {/* Tombol Menu - Sekarang terhubung ke toggleSidebar */}
      <div className="flex items-center gap-4">
        <button 
          onClick={toggleSidebar}
          className="p-2 hover:bg-gray-100 rounded-xl transition-colors text-gray-900 border border-transparent hover:border-gray-300 active:scale-95"
        >
          <Menu size={24} />
        </button>
      </div>

      <div className="flex items-center gap-6">
        {/* Custom Dropdown Bahasa */}
        <div className="relative">
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center gap-2 border-2 border-gray-900 px-4 py-1.5 rounded-full hover:bg-gray-50 transition-all shadow-sm group bg-white"
          >
            <Globe size={18} className="text-blue-700 group-hover:rotate-12 transition-transform" />
            <span className="text-xs font-black text-gray-900 uppercase tracking-tight">
              {language === 'id' ? 'ID Indonesia' : 'EN English'}
            </span>
            <ChevronDown 
              size={14} 
              className={`text-gray-900 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} 
            />
          </button>

          {/* Dropdown Menu */}
          {isOpen && (
            <>
              {/* Overlay untuk menutup saat klik di luar area dropdown */}
              <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)}></div>
              
              <div className="absolute right-0 mt-2 w-48 bg-white border-2 border-gray-900 rounded-2xl shadow-xl overflow-hidden z-50 animate-in fade-in zoom-in duration-150">
                <div className="py-1">
                  {languages.map((item) => (
                    <button
                      key={item.code}
                      onClick={() => {
                        setLanguage(item.code as 'id' | 'en');
                        setIsOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-4 py-3 text-xs font-bold transition-colors
                        ${language === item.code 
                          ? 'bg-blue-50 text-blue-700' 
                          : 'text-gray-700 hover:bg-gray-50'
                        }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-base">{item.flag}</span>
                        <span className="uppercase">{item.label}</span>
                      </div>
                      {language === item.code && <Check size={14} className="text-blue-700" />}
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>

        {/* Info User */}
        <div className="flex items-center gap-3 border-l-2 border-gray-200 pl-6">
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