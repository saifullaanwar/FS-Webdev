'use client';

import Link from 'next/link';
import { Database, PlusCircle } from 'lucide-react';
import { useAppStore } from '@/store/useAppStore';
import { usePathname } from 'next/navigation';

export default function Sidebar() {
  const { isSidebarOpen } = useAppStore();
  const pathname = usePathname();

  return (
    <aside 
      className={`h-screen bg-white border-r-2 border-gray-300 p-4 flex flex-col transition-all duration-300 ease-in-out overflow-hidden
        ${isSidebarOpen ? 'w-64' : 'w-20'}`}
    >
      {/* Judul/Logo - Teks disembunyikan saat sidebar tertutup */}
      <div className={`mb-6 px-2 transition-all duration-300 ${isSidebarOpen ? 'opacity-100' : 'opacity-0 h-8 flex items-center justify-center'}`}>
        {isSidebarOpen ? (
          <span className="font-black text-2xl text-gray-900 tracking-tighter whitespace-nowrap">
            BERRY APP
          </span>
        ) : (
          <div className="w-8 h-8 bg-gray-900 rounded-lg shrink-0" />
        )}
      </div>
      
      <nav className="flex flex-col gap-3">
        {/* Link List Table */}
        <SidebarLink 
          href="/" 
          icon={<Database size={22} />} 
          label="List Table" 
          isOpen={isSidebarOpen} 
          active={pathname === '/'} 
        />
        
        {/* Link Add Data */}
        <SidebarLink 
          href="/add" 
          icon={<PlusCircle size={22} />} 
          label="Add Data" 
          isOpen={isSidebarOpen} 
          active={pathname === '/add'} 
        />
      </nav>

      {/* Penanda Versi */}
      <div className={`mt-auto p-2 transition-all duration-300 ${isSidebarOpen ? 'opacity-100' : 'flex justify-center'}`}>
        <div className="bg-gray-900 text-white text-[10px] font-black py-1 px-3 rounded-full w-fit whitespace-nowrap">
          {isSidebarOpen ? 'V.1.0.0' : 'V.1'}
        </div>
      </div>
    </aside>
  );
}

// Komponen Pembantu agar kode lebih bersih
function SidebarLink({ href, icon, label, isOpen, active }: { href: string, icon: React.ReactNode, label: string, isOpen: boolean, active: boolean }) {
  return (
    <Link 
      href={href} 
      className={`flex items-center gap-3 p-3 font-black rounded-xl border-2 transition-all group
        ${active 
          ? 'bg-blue-600 border-blue-600 text-white shadow-md' 
          : 'text-gray-900 border-transparent hover:border-blue-600 hover:bg-blue-50'
        } ${!isOpen && 'justify-center'}`}
    >
      <div className={`${active ? 'text-white' : 'text-gray-900 group-hover:text-blue-700'}`}>
        {icon}
      </div>
      
      {isOpen && (
        <span className="uppercase text-sm tracking-wide whitespace-nowrap animate-in fade-in slide-in-from-left-2 duration-300">
          {label}
        </span>
      )}
    </Link>
  );
}