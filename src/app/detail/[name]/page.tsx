'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { pokeApi } from '@/services/api';
import { ArrowLeft, Info, Globe } from 'lucide-react';
import Link from 'next/link';
import { useAppStore } from '@/store/useAppStore';
import SkeletonDetail from '@/components/SkeletonDetail';

export default function DetailBerryPage() {
  const { name } = useParams();
  const router = useRouter();
  const { language } = useAppStore();
  
  const [berry, setBerry] = useState<any>(null);
  const [allBerries, setAllBerries] = useState<any[]>([]);
  const [selectedBerry, setSelectedBerry] = useState(name);
  const [loading, setLoading] = useState(true);

  // 1. Fetch daftar semua berry untuk Dropdown (Urut ID dari API)
  useEffect(() => {
    const fetchList = async () => {
      try {
        const res = await pokeApi.get('berry?limit=100');
        // PokeAPI secara default memberikan urutan berdasarkan ID
        setAllBerries(res.data.results);
      } catch (err) {
        console.error("Gagal memuat daftar dropdown", err);
      }
    };
    fetchList();
  }, []);

  // 2. Fetch detail berry berdasarkan parameter URL [name]
  useEffect(() => {
    const fetchDetail = async () => {
      try {
        setLoading(true);
        const res = await pokeApi.get(`berry/${name}`);
        setBerry(res.data);
        setSelectedBerry(name); // Sinkronkan pilihan dropdown dengan data saat ini
      } catch (err) {
        console.error("Gagal memuat detail", err);
      } finally {
        // Beri sedikit delay agar transisi skeleton terasa smooth
        setTimeout(() => setLoading(false), 500);
      }
    };
    fetchDetail();
  }, [name]);

  // Fungsi untuk tombol GO sesuai persyaratan soal
  const handleGo = () => {
    if (selectedBerry) {
      router.push(`/detail/${selectedBerry}`);
    }
  };

  // Menggunakan Skeleton Loading yang sudah dipisah
  if (loading) return <SkeletonDetail />;

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      {/* Header & Navigation */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2 text-blue-800 hover:text-blue-900 font-black uppercase text-sm group transition-colors">
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          {language === 'id' ? 'KEMBALI KE DAFTAR' : 'BACK TO BERRY LIST'}
        </Link>

        {/* Dropdown Selector + Go Button */}
        <div className="flex items-center gap-2 bg-white p-2 border-2 border-gray-300 rounded-2xl shadow-sm">
          <select 
            value={selectedBerry}
            onChange={(e) => setSelectedBerry(e.target.value)}
            className="px-4 py-2 bg-transparent font-black text-gray-900 outline-none cursor-pointer capitalize min-w-[180px]"
          >
            {allBerries.map((b) => {
              // Mengambil ID dari URL (format: .../berry/1/)
              const id = b.url.split('/').filter(Boolean).pop();
              return (
                <option key={id} value={b.name}>
                  #{id?.padStart(2, '0')} - {b.name}
                </option>
              );
            })}
          </select>
          <button 
            onClick={handleGo}
            className="bg-blue-700 text-white px-6 py-2 rounded-xl font-black uppercase text-xs hover:bg-blue-800 transition shadow-md active:scale-95"
          >
            GO
          </button>
        </div>
      </div>

      {/* Detail Content Card */}
      <div className="bg-white border-2 border-gray-300 rounded-[2.5rem] shadow-2xl overflow-hidden">
        {/* Card Header */}
        <div className="bg-gray-100 p-8 border-b-2 border-gray-300 flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-black text-gray-900 uppercase tracking-tight capitalize">
              {berry?.name}
            </h1>
            <p className="text-blue-700 font-black mt-1 uppercase tracking-widest text-xs">
              Berry Index: #{berry?.id}
            </p>
          </div>
          <div className="w-16 h-16 bg-blue-700 rounded-full flex items-center justify-center text-white shadow-lg">
            <Info size={32} />
          </div>
        </div>

        {/* Card Body */}
        <div className="p-10 space-y-8">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-blue-50 p-6 rounded-3xl border-2 border-blue-100 text-center">
              <span className="block text-[10px] font-black text-blue-400 uppercase tracking-widest mb-1">Size</span>
              <span className="text-2xl font-black text-blue-900">{berry?.size} mm</span>
            </div>
            <div className="bg-purple-50 p-6 rounded-3xl border-2 border-purple-100 text-center">
              <span className="block text-[10px] font-black text-purple-400 uppercase tracking-widest mb-1">Growth Time</span>
              <span className="text-2xl font-black text-purple-900">{berry?.growth_time}h</span>
            </div>
            <div className="bg-orange-50 p-6 rounded-3xl border-2 border-orange-100 text-center">
              <span className="block text-[10px] font-black text-orange-400 uppercase tracking-widest mb-1">Max Harvest</span>
              <span className="text-2xl font-black text-orange-900">{berry?.max_harvest}</span>
            </div>
          </div>

          {/* Additional Info Section */}
          <div className="border-2 border-gray-100 rounded-3xl p-6 space-y-4 bg-gray-50/30">
            <div className="flex items-center gap-3 text-gray-900 font-black uppercase text-xs border-b border-gray-100 pb-3 tracking-widest">
              <Globe size={18} className="text-blue-700" />
              Natural Gift Properties
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-sm">
                <span className="text-gray-400 font-bold block uppercase text-[10px] mb-1">Element Type</span>
                <span className="font-black text-gray-800 uppercase italic bg-white px-3 py-1 rounded-lg border border-gray-200 inline-block">
                  {berry?.natural_gift_type?.name}
                </span>
              </div>
              <div className="text-sm">
                <span className="text-gray-400 font-bold block uppercase text-[10px] mb-1">Power Level</span>
                <span className="font-black text-gray-800 text-lg">
                  {berry?.natural_gift_power}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}