import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Equinox Technical Task",
  description: "Fullstack Web Developer Task",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex h-screen bg-gray-50">
          {/* Sidebar Samping - Sekarang sudah kontras tinggi */}
          <Sidebar />

          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Navbar Atas - Sekarang sudah kontras tinggi */}
            <Navbar />

            {/* Area Konten Utama */}
            <main className="flex-1 overflow-x-hidden overflow-y-auto p-6">
              <div className="bg-white rounded-[2rem] border-2 border-gray-200 shadow-sm min-h-full p-8">
                {children}
              </div>
            </main>

            {/* Footer - Diperbarui agar tidak samar dan lebih modern */}
            <footer className="h-12 border-t-2 border-gray-300 bg-white flex items-center justify-between px-8">
              <div className="flex items-center gap-2">
                <span className="text-gray-900 font-black text-xs uppercase tracking-widest">
                  Berry App
                </span>
                <span className="text-gray-400 font-bold text-xs">
                  &copy; 2026
                </span>
              </div>
              
              <div className="hidden md:flex items-center gap-6">
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-[10px] font-black text-gray-500 uppercase tracking-tight">
                    System Operational
                  </span>
                </div>
                <div className="h-4 w-[1px] bg-gray-300"></div>
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter italic">
                  Technical Assessment Task
                </span>
              </div>
            </footer>
          </div>
        </div>
      </body>
    </html>
  );
}