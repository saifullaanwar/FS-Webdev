import Link from 'next/link';
import { Database, PlusCircle } from 'lucide-react';

export default function Sidebar() {
  return (
    <div className="w-64 h-screen bg-white border-r-2 border-gray-300 p-4 flex flex-col gap-4">
      {/* Judul/Logo dibuat sangat hitam dan tebal */}
      <div className="font-black text-2xl mb-6 px-2 text-gray-900 tracking-tighter">
        BERRY APP
      </div>
      
      <nav className="flex flex-col gap-3">
        {/* Link List Table */}
        <Link 
          href="/" 
          className="flex items-center gap-3 p-3 text-gray-900 font-black rounded-xl border-2 border-transparent hover:border-blue-600 hover:bg-blue-50 transition-all group"
        >
          <Database size={22} className="text-gray-900 group-hover:text-blue-700" /> 
          <span className="uppercase text-sm tracking-wide">List Table</span>
        </Link>
        
        {/* Link Add Data */}
        <Link 
          href="/add" 
          className="flex items-center gap-3 p-3 text-gray-900 font-black rounded-xl border-2 border-transparent hover:border-blue-600 hover:bg-blue-50 transition-all group"
        >
          <PlusCircle size={22} className="text-gray-900 group-hover:text-blue-700" /> 
          <span className="uppercase text-sm tracking-wide">Add Data</span>
        </Link>
      </nav>

      {/* Tambahan: Penanda Versi di bawah agar tidak kosong */}
      <div className="mt-auto p-2">
        <div className="bg-gray-900 text-white text-[10px] font-black py-1 px-3 rounded-full w-fit">
          V.1.0.0
        </div>
      </div>
    </div>
  );
}