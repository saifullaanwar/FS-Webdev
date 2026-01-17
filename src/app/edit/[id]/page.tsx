'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { ArrowLeft, Save, Loader2, AlertCircle } from 'lucide-react';
import Link from 'next/link';
import { pokeApi } from '@/services/api'; // Ubah ke pokeApi
import { useAppStore } from '@/store/useAppStore';
import { translations } from '@/utils/translations';

export default function EditDataPage() {
  const router = useRouter();
  const { id } = useParams();
  const { language } = useAppStore();
  const t = translations[language];
  
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // State disesuaikan dengan skema data Berry
  const [formData, setFormData] = useState({
    name: '',
    growth_time: '',
    max_harvest: '',
  });

  useEffect(() => {
    const fetchBerry = async () => {
      try {
        setLoading(true);
        setError(null);
        // Memanggil PokeAPI menggunakan ID Berry
        const res = await pokeApi.get(`berry/${id}`);
        setFormData({
          name: res.data.name,
          growth_time: res.data.growth_time.toString(),
          max_harvest: res.data.max_harvest.toString(),
        });
      } catch (err) {
        setError(language === 'id' 
          ? "Gagal mengambil data Berry. Pastikan ID benar dan PokeAPI dapat diakses." 
          : "Failed to fetch Berry data. Ensure ID is correct and PokeAPI is accessible.");
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchBerry();
  }, [id, language]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setSubmitting(true);
      // Catatan: PokeAPI adalah Read-Only. 
      // Di dunia nyata, ini akan mengirimkan data ke server.
      console.log('Updating berry:', formData);
      
      alert(language === 'id' ? 'Data Berhasil Diperbarui secara lokal!' : 'Data Successfully Updated locally!');
      router.push('/'); 
    } catch (error) {
      alert(language === 'id' ? 'Gagal memperbarui data.' : 'Failed to update data.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] text-gray-800">
        <Loader2 className="animate-spin text-blue-700 mb-2" size={48} />
        <p className="font-black text-lg uppercase tracking-widest italic">LOADING BERRY DATA...</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <Link 
        href="/" 
        className="flex items-center gap-2 text-blue-800 hover:text-blue-900 font-black transition w-fit group"
      >
        <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
        BACK TO BERRY LIST
      </Link>

      <div className="bg-white border-2 border-gray-300 rounded-[2rem] shadow-xl overflow-hidden">
        <div className="bg-gray-100 border-b-2 border-gray-300 p-8">
          <h1 className="text-3xl font-black text-gray-900 uppercase tracking-tight">Edit Berry Info</h1>
          <p className="text-blue-700 font-black mt-1 uppercase text-xs">Berry ID: #{id}</p>
        </div>

        {error ? (
          <div className="p-12 text-center text-red-700 font-bold flex flex-col items-center gap-4">
            <AlertCircle size={56} />
            <p className="text-lg uppercase italic">{error}</p>
            <button onClick={() => window.location.reload()} className="bg-red-700 text-white px-8 py-2 rounded-full font-black">RETRY</button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-8 space-y-6">
            <div>
              <label className="block text-xs font-black text-gray-900 mb-2 uppercase tracking-widest">
                Berry Name
              </label>
              <input
                required
                type="text"
                className="w-full px-5 py-4 border-2 border-gray-400 rounded-2xl focus:ring-4 focus:ring-blue-100 focus:border-blue-700 outline-none transition text-gray-900 font-bold capitalize"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-black text-gray-900 mb-2 uppercase tracking-widest">
                  Growth Time
                </label>
                <input
                  required
                  type="number"
                  className="w-full px-5 py-4 border-2 border-gray-400 rounded-2xl focus:ring-4 focus:ring-blue-100 focus:border-blue-700 outline-none transition text-gray-900 font-bold"
                  value={formData.growth_time}
                  onChange={(e) => setFormData({ ...formData, growth_time: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-xs font-black text-gray-900 mb-2 uppercase tracking-widest">
                  Max Harvest
                </label>
                <input
                  required
                  type="number"
                  className="w-full px-5 py-4 border-2 border-gray-400 rounded-2xl focus:ring-4 focus:ring-blue-100 focus:border-blue-700 outline-none transition text-gray-900 font-bold"
                  value={formData.max_harvest}
                  onChange={(e) => setFormData({ ...formData, max_harvest: e.target.value })}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-blue-700 hover:bg-blue-800 text-white font-black py-5 rounded-2xl shadow-lg transition flex items-center justify-center gap-3 disabled:opacity-50 mt-4 uppercase tracking-widest text-sm"
            >
              {submitting ? (
                <Loader2 className="animate-spin" size={24} />
              ) : (
                <>
                  <Save size={24} />
                  <span>UPDATE BERRY DATA</span>
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}