'use client';

import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import { useAppStore } from "@/store/useAppStore";

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const { isSidebarOpen } = useAppStore();

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Sidebar dengan transisi lebar */}
      <div className={`transition-all duration-300 ease-in-out h-full ${isSidebarOpen ? 'w-64' : 'w-0 -translate-x-full md:w-20 md:translate-x-0'}`}>
        <Sidebar />
      </div>

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Navbar />

        {/* Area Konten Utama */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto p-4 md:p-6 bg-gray-50">
          <div className="bg-white rounded-[1.5rem] md:rounded-[2rem] border-2 border-gray-200 shadow-sm min-h-full p-4 md:p-8">
            {children}
          </div>
        </main>

        {/* Footer */}
        <footer className="h-12 border-t-2 border-gray-300 bg-white flex items-center justify-between px-8 shrink-0">
          <div className="flex items-center gap-2">
            <span className="text-gray-900 font-black text-xs uppercase tracking-widest">Berry App</span>
            <span className="text-gray-400 font-bold text-xs">&copy; 2026</span>
          </div>
          
          <div className="hidden md:flex items-center gap-6">
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-[10px] font-black text-gray-500 uppercase tracking-tight">System Operational</span>
            </div>
            <div className="h-4 w-[1px] bg-gray-300"></div>
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter italic">Technical Assessment Task</span>
          </div>
        </footer>
      </div>
    </div>
  );
}