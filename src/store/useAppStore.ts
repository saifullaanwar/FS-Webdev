import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface AppState {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  itemsPerPage: number;
  setItemsPerPage: (num: number) => void;
  language: 'en' | 'id';
  setLanguage: (lang: 'en' | 'id') => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      // State untuk pencarian
      searchTerm: '',
      setSearchTerm: (term) => set({ searchTerm: term }),

      // State untuk navigasi halaman
      currentPage: 1,
      setCurrentPage: (page) => set({ currentPage: page }),

      // State untuk jumlah data per halaman
      itemsPerPage: 10,
      setItemsPerPage: (num) => set({ 
        itemsPerPage: num, 
        currentPage: 1 // Reset ke halaman 1 jika jumlah per halaman berubah
      }),

      // State untuk pengaturan bahasa
      language: 'en',
      setLanguage: (lang) => set({ language: lang }),
    }),
    { 
      name: 'berry-store',
      storage: createJSONStorage(() => localStorage), // Memastikan penyimpanan di localStorage browser
    }
  )
);