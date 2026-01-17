# Berry App - Technical Assessment

Aplikasi manajemen data Berry yang dibangun untuk memenuhi kriteria penilaian teknis menggunakan **Next.js 14**, **Zustand**, dan **PokeAPI**.

## 🚀 Fitur Utama yang Diimplementasikan

- **Manajemen Tabel (Question 1 & 2)**:
  - Menampilkan daftar Berry dengan kolom No, Name, dan Action.
  - Sorting nama secara otomatis (A-Z).
  - Paginasi dengan pilihan 10, 30, dan 50 data per halaman.
  - Live Search yang responsif.

- **Halaman Detail**:
  - Menampilkan detail data yang dipilih menggunakan Skeleton Loading untuk UX yang lebih baik.
  - Dropdown selector di halaman detail untuk berpindah antar data dengan cepat menggunakan tombol "GO".

- **Persistence (Optional Task - Completed)**:
  - Posisi halaman (pagination) tidak kembali ke awal saat refresh browser.
  - Hasil pencarian tetap tersimpan di kolom input setelah halaman dimuat ulang.

- **Multi-language Support**:
  - Mendukung Bahasa Indonesia (ID) dan Bahasa Inggris (EN) yang terintegrasi dengan state management.

## 🛠️ Tech Stack

- **Framework**: Next.js (App Router)
- **State Management**: Zustand dengan Persist Middleware (localStorage)
- **Styling**: Tailwind CSS
- **Data Source**: [PokeAPI (Berry)](https://pokeapi.co/api/v2/berry/) & [FakeStoreAPI (Products)](https://fakestoreapi.com/products)

## 📦 Cara Instalasi

1. Instalasi dependensi:
   ```bash
   npm install
   ```

2. Menjalankan aplikasi secara lokal:
   ```bash
   npm run dev
   ```

Aplikasi akan berjalan di http://localhost:3000.