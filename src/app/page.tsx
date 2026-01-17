'use client';

import { useEffect, useState } from 'react';
import { useAppStore } from '@/store/useAppStore';
import { pokeApi } from '@/services/api';
import { Berry } from '@/types/berry';
import { 
  Edit, 
  Trash, 
  Search, 
  ExternalLink, 
  ChevronLeft, 
  ChevronRight, 
  AlertCircle, 
  Languages 
} from 'lucide-react';
import Link from 'next/link';
import { translations } from '@/utils/translations';

export default function ListTablePage() {
  // 1. Tambahkan state isClient untuk mencegah Hydration Error
  const [isClient, setIsClient] = useState(false);

  const { 
    searchTerm, 
    setSearchTerm, 
    currentPage, 
    setCurrentPage, 
    itemsPerPage, 
    setItemsPerPage,
    language,    
    setLanguage  
  } = useAppStore();

  const t = translations[language];

  const [berries, setBerries] = useState<Berry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 2. Efek untuk menandai bahwa komponen sudah terpasang di browser (client-side)
  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return; // Jangan fetch sebelum client siap

    const controller = new AbortController();

    const fetchBerries = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await pokeApi.get('berry?limit=100&offset=0', {
          signal: controller.signal
        }); 
        
        if (res.data && res.data.results) {
          const formattedData = res.data.results.map((item: any, index: number) => ({
            id: index + 1,
            name: item.name,
            url: item.url
          }));
          setBerries(formattedData);
        }
      } catch (err: any) {
        if (err.name !== 'CanceledError' && err.name !== 'AbortError') {
          setError(language === 'id' ? "Koneksi gagal: PokeAPI tidak merespon." : "Connection failed: PokeAPI not responding.");
        }
      } finally {
        setTimeout(() => setLoading(false), 800);
      }
    };

    fetchBerries();
    return () => controller.abort();
  }, [isClient, language]); // Tambahkan isClient sebagai dependency

  const filteredData = berries
    .filter((b) => b.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => a.name.localeCompare(b.name));

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = filteredData.slice(startIndex, startIndex + itemsPerPage);

  const handleSearchChange = (val: string) => {
    setSearchTerm(val);
    setCurrentPage(1); 
  };

  const handleDelete = (name: string) => {
    const isConfirmed = confirm(`${language === 'id' ? 'Hapus' : 'Delete'} "${name}"?`);
    if (isConfirmed) {
      setBerries((prev) => prev.filter((item) => item.name !== name));
      alert(`${name} ${language === 'id' ? 'berhasil dihapus.' : 'successfully deleted.'}`);
    }
  };

  // 3. Jika belum client-side, kembalikan null atau loader sederhana agar tidak ada mismatch
  if (!isClient) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-700"></div>
      </div>
    );
  }

  // Komponen Skeleton Row
  const SkeletonRow = () => (
    <tr className="animate-pulse">
      <td className="p-5 border-r border-gray-100">
        <div className="h-6 w-8 bg-gray-200 rounded-md"></div>
      </td>
      <td className="p-5">
        <div className="h-6 w-32 bg-gray-200 rounded-md"></div>
      </td>
      <td className="p-5">
        <div className="flex justify-center gap-3">
          <div className="h-10 w-10 bg-gray-200 rounded-xl border-2 border-gray-100"></div>
          <div className="h-10 w-10 bg-gray-200 rounded-xl border-2 border-gray-100"></div>
          <div className="h-10 w-10 bg-gray-200 rounded-xl border-2 border-gray-100"></div>
        </div>
      </td>
    </tr>
  );

  return (
    <div className="space-y-6">
      {/* Language Switcher Section */}
      <div className="flex justify-end items-center gap-3">
        <div className="flex items-center gap-2 text-gray-900 font-black text-sm uppercase">
          <Languages size={18} />
          <span>Language:</span>
        </div>
        <div className="inline-flex bg-gray-200 p-1 rounded-lg border border-gray-400 shadow-sm">
          <button 
            onClick={() => setLanguage('id')}
            className={`px-4 py-1.5 rounded-md text-sm font-black transition-all ${
              language === 'id' ? 'bg-blue-700 text-white shadow-md' : 'text-gray-700 hover:text-gray-900'
            }`}
          >
            ID
          </button>
          <button 
            onClick={() => setLanguage('en')}
            className={`px-4 py-1.5 rounded-md text-sm font-black transition-all ${
              language === 'en' ? 'bg-blue-700 text-white shadow-md' : 'text-gray-700 hover:text-gray-900'
            }`}
          >
            EN
          </button>
        </div>
      </div>

      {/* Header Section */}
      <div className="flex justify-between items-center bg-white p-6 rounded-2xl border-2 border-gray-300 shadow-sm">
        <div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">{t.title}</h1>
          <p className="text-gray-700 text-sm font-bold mt-1 uppercase tracking-wide">{t.subtitle}</p>
        </div>
        <Link href="/add" className="bg-blue-700 text-white px-6 py-3 rounded-xl hover:bg-blue-800 transition flex items-center gap-2 shadow-lg font-black uppercase text-sm">
          <span className="text-xl">+</span> {t.addBtn}
        </Link>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-end md:items-center">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-4 top-3 text-gray-700" size={20} />
          <input
            type="text"
            placeholder={t.searchPlaceholder}
            className="pl-12 pr-4 py-3 w-full border-2 border-gray-400 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-700 outline-none transition bg-white text-gray-900 font-bold placeholder:text-gray-500 shadow-sm"
            value={searchTerm}
            onChange={(e) => handleSearchChange(e.target.value)}
          />
        </div>
      </div>

      {/* Table Section */}
      <div className="overflow-x-auto border-2 border-gray-400 rounded-2xl shadow-xl bg-white">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-100 text-gray-900 uppercase text-xs font-black border-b-2 border-gray-400">
            <tr>
              <th className="p-5 w-20">{t.tableNo}</th>
              <th className="p-5">{t.tableName}</th>
              <th className="p-5 text-center">{t.tableAction}</th>
            </tr>
          </thead>
          <tbody className="divide-y-2 divide-gray-100">
            {loading ? (
              [...Array(5)].map((_, i) => <SkeletonRow key={i} />)
            ) : error ? (
              <tr>
                <td colSpan={3} className="p-16 text-center">
                  <div className="flex flex-col items-center gap-3 text-red-700">
                    <AlertCircle size={48} />
                    <span className="font-black text-lg">{error}</span>
                    <button onClick={() => window.location.reload()} className="mt-4 bg-red-700 text-white px-8 py-2 rounded-full font-black">RETRY</button>
                  </div>
                </td>
              </tr>
            ) : paginatedData.length > 0 ? (
              paginatedData.map((item, index) => (
                <tr key={item.id} className="hover:bg-blue-50 transition duration-150">
                  <td className="p-5 text-gray-900 font-black border-r border-gray-100">{startIndex + index + 1}</td>
                  <td className="p-5 capitalize font-black text-gray-800 text-lg">{item.name}</td>
                  <td className="p-5">
                    <div className="flex justify-center gap-3">
                      <Link href={`/edit/${item.id}`} className="p-3 text-blue-800 hover:bg-blue-100 rounded-xl transition border-2 border-blue-200">
                        <Edit size={20} />
                      </Link>
                      <button onClick={() => handleDelete(item.name)} className="p-3 text-red-700 hover:bg-red-100 rounded-xl transition border-2 border-red-200">
                        <Trash size={20} />
                      </button>
                      <Link href={`/detail/${item.name}`} className="p-3 text-gray-900 hover:bg-gray-200 rounded-xl transition border-2 border-gray-300">
                        <ExternalLink size={20} />
                      </Link>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3} className="p-20 text-center text-gray-900 font-black text-xl uppercase tracking-widest">
                  --- {language === 'id' ? 'DATA TIDAK DITEMUKAN' : 'NO DATA FOUND'} ---
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-center bg-gray-100 p-6 rounded-2xl border-2 border-gray-400 gap-4 shadow-inner">
        <div className="flex items-center gap-3 text-gray-900 font-black uppercase text-xs">
          <span>{t.show}</span>
          <select value={itemsPerPage} onChange={(e) => setItemsPerPage(Number(e.target.value))} className="border-2 border-gray-400 rounded-lg px-3 py-2 bg-white font-black cursor-pointer">
            <option value={10}>10</option>
            <option value={30}>30</option>
            <option value={50}>50</option>
          </select>
          <span>{t.entries}</span>
        </div>

        <div className="flex items-center gap-6">
          <p className="text-xs text-gray-900 font-black uppercase tracking-widest">
            {t.page} <span className="text-blue-700 text-lg mx-1">{currentPage}</span> {t.of} <span className="text-blue-700 text-lg mx-1">{totalPages || 1}</span>
          </p>
          <div className="flex gap-3">
            <button 
              disabled={currentPage === 1 || loading}
              onClick={() => setCurrentPage(currentPage - 1)}
              className="p-3 bg-white border-2 border-gray-900 text-gray-900 rounded-xl disabled:opacity-20 hover:bg-gray-900 hover:text-white transition shadow-md"
            >
              <ChevronLeft size={24} strokeWidth={4} />
            </button>
            <button 
              disabled={currentPage === totalPages || totalPages === 0 || loading}
              onClick={() => setCurrentPage(currentPage + 1)}
              className="p-3 bg-white border-2 border-gray-900 text-gray-900 rounded-xl disabled:opacity-20 hover:bg-gray-900 hover:text-white transition shadow-md"
            >
              <ChevronRight size={24} strokeWidth={4} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}