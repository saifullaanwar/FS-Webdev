'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAppStore } from '@/store/useAppStore'; 
import { translations } from '@/utils/translations'; 
import { ArrowLeft, Save, Loader2, Package, Tag, Info, Image as ImageIcon } from 'lucide-react';
import Link from 'next/link';

export default function AddDataPage() {
  const router = useRouter();
  const { language } = useAppStore(); 
  const t = translations[language]; 

  const [loading, setLoading] = useState(false);
  
  // State menggunakan field sesuai instruksi FakeStoreAPI
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    description: '',
    image: '',
    category: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      
      // Melakukan POST ke FakeStoreAPI sesuai instruksi soal
      const response = await fetch('https://fakestoreapi.com/products', {
        method: "POST",
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        // Menampilkan alert saat data berhasil ditambahkan sesuai instruksi
        alert(t.successAdd || 'Data successfully added!'); 
        router.push('/');
      }
    } catch (error) {
      console.error(error);
      alert(t.failAdd || 'Failed to add data');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Tombol Kembali */}
      <Link 
        href="/" 
        className="flex items-center gap-2 text-blue-800 hover:text-blue-900 font-black transition w-fit uppercase text-sm tracking-wider group"
      >
        <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
        {t.back}
      </Link>

      <div className="bg-white border-2 border-gray-300 rounded-[2rem] shadow-xl overflow-hidden">
        {/* Header Section */}
        <div className="bg-gray-100 border-b-2 border-gray-300 p-8 text-center md:text-left">
          <h1 className="text-3xl font-black text-gray-900 uppercase tracking-tight">
             {language === 'id' ? 'Tambah Produk Baru' : 'Add New Product'}
          </h1>
          <p className="text-blue-700 font-black mt-1 uppercase text-xs tracking-widest">
            {language === 'id' ? 'Berdasarkan Skema FakeStoreAPI' : 'Based on FakeStoreAPI Schema'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-5">
          {/* Product Title - Menggunakan text-gray-900 agar teks tajam saat diketik */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-xs font-black text-gray-900 uppercase tracking-widest">
              <Package size={14} /> Product Title
            </label>
            <input
              required
              type="text"
              placeholder="e.g. Premium Cotton T-Shirt"
              className="w-full px-5 py-3 border-2 border-gray-400 rounded-2xl focus:border-blue-700 outline-none transition font-bold text-gray-900 bg-white placeholder:text-gray-400"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Price Field */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-xs font-black text-gray-900 uppercase tracking-widest">
                <Tag size={14} /> Price ($)
              </label>
              <input
                required
                type="number"
                step="0.01"
                placeholder="29.99"
                className="w-full px-5 py-3 border-2 border-gray-400 rounded-2xl focus:border-blue-700 outline-none transition font-bold text-gray-900 bg-white placeholder:text-gray-400"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              />
            </div>

            {/* Category Field */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-xs font-black text-gray-900 uppercase tracking-widest">
                <Info size={14} /> Category
              </label>
              <select 
                required
                className="w-full px-5 py-3 border-2 border-gray-400 rounded-2xl focus:border-blue-700 outline-none transition font-bold bg-white text-gray-900"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              >
                <option value="" className="text-gray-400">Select Category</option>
                <option value="electronics">Electronics</option>
                <option value="jewelery">Jewelery</option>
                <option value="men's clothing">Men's Clothing</option>
                <option value="women's clothing">Women's Clothing</option>
              </select>
            </div>
          </div>

          {/* Description Field */}
          <div className="space-y-2">
            <label className="block text-xs font-black text-gray-900 uppercase tracking-widest">Description</label>
            <textarea
              required
              rows={3}
              placeholder="Tell more about the product..."
              className="w-full px-5 py-3 border-2 border-gray-400 rounded-2xl focus:border-blue-700 outline-none transition font-bold text-gray-900 bg-white placeholder:text-gray-400"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
          </div>

          {/* Image URL Field */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-xs font-black text-gray-900 uppercase tracking-widest">
              <ImageIcon size={14} /> Image URL
            </label>
            <input
              required
              type="url"
              placeholder="https://example.com/image.png"
              className="w-full px-5 py-3 border-2 border-gray-400 rounded-2xl focus:border-blue-700 outline-none transition font-bold text-gray-900 bg-white placeholder:text-gray-400"
              value={formData.image}
              onChange={(e) => setFormData({ ...formData, image: e.target.value })}
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-700 hover:bg-blue-800 text-white font-black py-4 rounded-2xl shadow-lg transition flex items-center justify-center gap-3 disabled:opacity-50 uppercase tracking-widest text-sm"
          >
            {loading ? (
              <Loader2 className="animate-spin" size={24} />
            ) : (
              <>
                <Save size={20} />
                <span>{t.btnSave}</span>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}