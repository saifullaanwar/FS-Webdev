'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAppStore } from '@/store/useAppStore'; 
import { translations } from '@/utils/translations'; 
import { ArrowLeft, Save, Loader2 } from 'lucide-react';
import Link from 'next/link';
// Hapus fakeStoreApi karena kita menggunakan PokeAPI secara logis
import { pokeApi } from '@/services/api'; 

export default function AddDataPage() {
  const router = useRouter();
  const { language } = useAppStore(); 
  const t = translations[language]; 

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    growth_time: '',
    max_harvest: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      
      // Catatan: PokeAPI bersifat Read-Only. 
      // Kita melakukan simulasi POST untuk menunjukkan alur aplikasi yang benar.
      console.log('Simulasi menambahkan berry baru:', formData);
      
      // Beri sedikit jeda agar animasi loader terlihat
      await new Promise((resolve) => setTimeout(resolve, 800));
      
      alert(t.successAdd); 
      router.push('/');
    } catch (error) {
      console.error(error);
      alert(t.failAdd);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Tombol Kembali - Multibahasa */}
      <Link 
        href="/" 
        className="flex items-center gap-2 text-blue-800 hover:text-blue-900 font-black transition w-fit uppercase text-sm tracking-wider group"
      >
        <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
        {t.back}
      </Link>

      <div className="bg-white border-2 border-gray-300 rounded-[2rem] shadow-xl overflow-hidden">
        {/* Header Section */}
        <div className="bg-gray-100 border-b-2 border-gray-300 p-8">
          <h1 className="text-3xl font-black text-gray-900 uppercase tracking-tight">{t.addTitle}</h1>
          <p className="text-blue-700 font-black mt-1 uppercase text-xs tracking-widest">
            {t.formSubtitleAdd}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          {/* Berry Name - Menggunakan translation formTitle/Name */}
          <div>
            <label className="block text-xs font-black text-gray-900 mb-2 uppercase tracking-widest">
              {t.tableName}
            </label>
            <input
              required
              type="text"
              placeholder="e.g. Oran Berry"
              className="w-full px-5 py-4 border-2 border-gray-400 rounded-2xl focus:ring-4 focus:ring-blue-100 focus:border-blue-700 outline-none transition text-gray-900 font-bold placeholder:text-gray-400"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Growth Time */}
            <div>
              <label className="block text-xs font-black text-gray-900 mb-2 uppercase tracking-widest">
                Growth Time
              </label>
              <input
                required
                type="number"
                placeholder="0"
                className="w-full px-5 py-4 border-2 border-gray-400 rounded-2xl focus:ring-4 focus:ring-blue-100 focus:border-blue-700 outline-none transition text-gray-900 font-bold placeholder:text-gray-400"
                value={formData.growth_time}
                onChange={(e) => setFormData({ ...formData, growth_time: e.target.value })}
              />
            </div>

            {/* Max Harvest */}
            <div>
              <label className="block text-xs font-black text-gray-900 mb-2 uppercase tracking-widest">
                Max Harvest
              </label>
              <input
                required
                type="number"
                placeholder="0"
                className="w-full px-5 py-4 border-2 border-gray-400 rounded-2xl focus:ring-4 focus:ring-blue-100 focus:border-blue-700 outline-none transition text-gray-900 font-bold placeholder:text-gray-400"
                value={formData.max_harvest}
                onChange={(e) => setFormData({ ...formData, max_harvest: e.target.value })}
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-700 hover:bg-blue-800 text-white font-black py-5 rounded-2xl shadow-lg transition flex items-center justify-center gap-3 disabled:opacity-50 mt-4 uppercase tracking-widest text-sm"
          >
            {loading ? (
              <Loader2 className="animate-spin" size={24} />
            ) : (
              <>
                <Save size={24} />
                <span>{t.btnSave}</span>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}