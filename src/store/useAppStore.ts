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
  // State baru untuk Sidebar
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
  setSidebarOpen: (isOpen: boolean) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      // State untuk pencarian (Persistence)
      searchTerm: '',
      setSearchTerm: (term) => set({ searchTerm: term }),

      // State untuk navigasi halaman (Persistence)
      currentPage: 1,
      setCurrentPage: (page) => set({ currentPage: page }),

      // State untuk jumlah data per halaman (10, 30, 50)
      itemsPerPage: 10,
      setItemsPerPage: (num) => set({ 
        itemsPerPage: num, 
        currentPage: 1 // Reset ke halaman 1 jika jumlah per halaman berubah
      }),

      // State untuk pengaturan bahasa (ID/EN)
      language: 'en',
      setLanguage: (lang) => set({ language: lang }),

      // State untuk Sidebar Toggle
      isSidebarOpen: true, // Default terbuka untuk tampilan desktop awal
      toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
      setSidebarOpen: (isOpen) => set({ isSidebarOpen: isOpen }),
    }),
    { 
      name: 'berry-store', // Nama key di localStorage
      storage: createJSONStorage(() => localStorage), // Menyimpan di browser agar data tetap ada setelah refresh
    }
  )
);