# Penambahan Fitur Menu Makanan & Pemisahan Kategori Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Menambahkan katalog menu makanan (snack & makanan utama) ke dalam website One Pool and Cafe serta memisahkan navigasi filter kategori antara makanan dan minuman secara intuitif dan responsif.

**Architecture:** Memperkaya tipe data `MenuItem` dengan pembeda `itemType: 'drink' | 'food'`. Mengganti sistem filter flat satu baris dengan filter dua tingkat: (1) Toggle level atas (*Semua*, *Minuman*, *Makanan*), dan (2) Tab sub-kategori dinamis yang otomatis menyesuaikan konteks jenis menu yang sedang aktif. Memecah komponen UI `Menu.tsx` menjadi sub-komponen kecil yang masing-masing di bawah 20 baris sesuai aturan clean-code.

**Tech Stack:** React 18, TypeScript, Tailwind CSS, Lucide React, Vite.

**Spec:** Kebutuhan pengguna untuk menambahkan menu makanan dan memisahkan kategori makanan vs minuman pada komponen [`src/components/Menu.tsx`](file:///home/mysteriasec/Documents/Github/project/src/components/Menu.tsx).

## Global Constraints

- Fungsi tidak boleh melebihi 20 baris per fungsi (aturan `user_global`).
- Tidak ada abstraksi atau helper functions berlebihan untuk pemakaian tunggal.
- Zero linting errors (`npm run lint`), Zero type errors (`npm run typecheck`).
- Desain mengikuti konsep warna brand One Pool and Cafe: `bg-void-950`, `bg-void-900`, `text-parchment-100`, dan aksen `gold-500`.

## Review Focus

1. **Reset Sub-kategori saat Pindah Tipe:** Ketika pengguna memilih sub-kategori tertentu di Minuman (misal 'Coffee') lalu berganti tab ke 'Makanan', filter sub-kategori harus otomatis kembali ke 'all' agar tidak menghasilkan daftar kosong (*empty state* yang tidak terduga).
2. **Kesesuaian Foto & Aspect Ratio:** Gambar menu makanan harus tetap mempertahankan aspect ratio `aspect-[3/4]` dan object-cover yang serasi dengan kartu minuman yang sudah ada tanpa distorsi.
3. **Responsivitas Layar HP:** Tombol toggle tipe menu dan barisan tab kategori tidak boleh saling menumpuk atau terpotong di layar smartphone kecil (lebar 320px–375px).
4. **Format Rupiah Konsisten:** Seluruh harga makanan harus menggunakan helper format IDR standar yang sama (`new Intl.NumberFormat('id-ID', ...)`).
5. **Fallback Gambar Aman:** Setiap item makanan harus memiliki URL gambar valid atau fallback visual yang elegan jika gambar belum tersedia di server.

---

### Task 1: Perluasan Tipe Data & Dataset Menu Makanan

**Files:**
- Modify: `src/components/Menu.tsx:3-125`

**Interfaces:**
- Produces:
  ```ts
  export type ItemType = 'drink' | 'food';
  export type MenuCategory = 'all' | 'coffee' | 'non-coffee' | 'milk-matcha' | 'main-course' | 'snack';

  export interface MenuItem {
    id: string;
    name: string;
    description: string;
    price: number;
    itemType: ItemType;
    category: MenuCategory;
    image: string;
  }
  ```

- [ ] **Step 1: Definisikan type union dan field `itemType` pada interface `MenuItem`**
  Perbarui interface `MenuItem` agar menyertakan `itemType: 'drink' | 'food'` dan batasi union `category`.

- [ ] **Step 2: Tandai seluruh 13 menu minuman yang sudah ada dengan `itemType: 'drink'`**
  Tambahkan properti `itemType: 'drink'` pada setiap item menu minuman (Berry Pink, Blue Ocean Mojito, Grand Forest, Summer Mojito, Sunrise Mojito, Coffee Gula Aren, Coffee Latte, Vanilla Coffee, Hazelnut Coffee, Taro Coffee, Milk Taro, Milk Matcha, Matcha Brown Sugar Latte).

- [ ] **Step 3: Tambahkan dataset menu makanan realistik untuk cafe billiard**
  Tambahkan data makanan dengan `itemType: 'food'`, mencakup:
  - **Makanan Berat (main-course):**
    - *Nasi Goreng Spesial One Pool* (Rp 25.000) - Nasi goreng racikan khas kafe disajikan dengan telur mata sapi, kerupuk, dan acar segar.
    - *Mie Nyemek Juara* (Rp 22.000) - Mie kuah kental gurih pedas manis dengan sayuran segar dan topping sosis.
    - *Rice Bowl Ayam Teriyaki* (Rp 26.000) - Daging ayam fillet saus teriyaki gurih manis di atas nasi pulen hangat.
  - **Cemilan & Snack Teman Billiard (snack):**
    - *Crispy French Fries* (Rp 18.000) - Kentang goreng renyah bumbu gurih disajikan dengan saus sambal dan mayones.
    - *Platter Combo One Pool* (Rp 28.000) - Kombinasi sosis panggang, nugget renyah, dan kentang goreng porsi sharing.
    - *Roti Bakar Cokelat Keju* (Rp 18.000) - Roti panggang empuk dengan lumeran cokelat manis dan taburan keju parut melimpah.
    - *Cireng Crispy Bumbu Rujak* (Rp 15.000) - Cireng kenyal renyah di luar disajikan bersama cocolan bumbu rujak pedas manis.

- [ ] **Step 4: Jalankan typecheck untuk memastikan konsistensi tipe**
  Run: `PATH=/usr/bin:/bin:$PATH npm run typecheck`
  Expected: Command keluar dengan kode 0 (tanpa type error).

- [ ] **Step 5: Commit perubahan data model**
  ```bash
  git add src/components/Menu.tsx
  git commit -m "feat(menu): extend MenuItem with itemType and add food dataset"
  ```

---

### Task 2: Implementasi Navigasi Filter Hirarkis (Tipe & Kategori)

**Files:**
- Modify: `src/components/Menu.tsx:120-215`

**Interfaces:**
- Produces:
  - `MenuTypeToggle({ activeType, onSelectType }: { activeType: string; onSelectType: (t: string) => void })`
  - `CategoryTabs({ categories, activeCategory, onSelectCategory }: { categories: CategoryOption[]; activeCategory: string; onSelectCategory: (c: string) => void })`
  - State management pada komponen `Menu`:
    - `activeType: 'all' | 'food' | 'drink'`
    - `activeCategory: string`

- [ ] **Step 1: Definisikan skema kategori dinamis per tipe menu**
  Buat pemetaan kategori:
  - Kategori Minuman: `Semua Minuman ('all')`, `Coffee ('coffee')`, `Fresh Drink ('non-coffee')`, `Milk & Matcha ('milk-matcha')`.
  - Kategori Makanan: `Semua Makanan ('all')`, `Makanan Berat ('main-course')`, `Cemilan / Snack ('snack')`.
  - Kategori Global (saat 'all' aktif): Menampilkan sub-kategori ringkas atau tombol 'Semua'.

- [ ] **Step 2: Buat komponen `MenuTypeToggle` (< 20 baris)**
  Rancang tombol segmented switch modern (Semua | Makanan | Minuman) dengan aksen gold aktif dan void netral.

- [ ] **Step 3: Sesuaikan komponen `CategoryTabs` (< 20 baris)**
  Jadikan `CategoryTabs` komponen murni yang menerima array kategori sesuai jenis menu yang dipilih.

- [ ] **Step 4: Perbarui filter state di komponen utama `Menu`**
  Tambahkan logika penyaringan:
  ```ts
  const itemsByType = activeType === 'all' ? menuItems : menuItems.filter((i) => i.itemType === activeType);
  const filteredItems = activeCategory === 'all' ? itemsByType : itemsByType.filter((i) => i.category === activeCategory);
  ```
  Sertakan handler perpindahan tipe: jika `activeType` berganti, otomatis set `activeCategory('all')`.

- [ ] **Step 5: Verifikasi perilaku filter & tipe TypeScript**
  Run: `PATH=/usr/bin:/bin:$PATH npm run typecheck`
  Expected: PASS

- [ ] **Step 6: Commit perubahan filter hirarkis**
  ```bash
  git add src/components/Menu.tsx
  git commit -m "feat(menu): add two-tier category and itemType filtering"
  ```

---

### Task 3: Penyempurnaan Card Tampilan Menu & Clean Code Compliance

**Files:**
- Modify: `src/components/Menu.tsx`

**Interfaces:**
- Produces:
  - `MenuItemCard({ item }: { item: MenuItem })` (maksimal 20 baris)
  - `ItemBadge({ itemType, category }: { itemType: ItemType; category: MenuCategory })` (badge penanda jenis makanan/minuman)

- [ ] **Step 1: Tambahkan label badge penanda jenis menu pada kartu**
  Tambahkan badge kecil di sudut gambar atau samping nama untuk mempermudah pengunjung membedakan makanan vs minuman saat melihat tab 'Semua'.

- [ ] **Step 2: Audit batas maksimal 20 baris per fungsi di `Menu.tsx`**
  Pastikan setiap fungsi (`MenuHeader`, `MenuTypeToggle`, `CategoryTabs`, `ItemImage`, `MenuItemCard`, `Menu`) tetap ringkas (< 20 baris) sesuai panduan Global Rules.

- [ ] **Step 3: Pastikan responsivitas grid dan spacing pada mobile**
  Gunakan layout `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 lg:gap-8` yang rapi dan konsisten dengan padding visual sebelumnya.

- [ ] **Step 4: Jalankan linter dan typecheck**
  Run: `PATH=/usr/bin:/bin:$PATH npm run lint && PATH=/usr/bin:/bin:$PATH npm run typecheck`
  Expected: Zero warnings, zero errors.

- [ ] **Step 5: Commit penyempurnaan kartu menu**
  ```bash
  git add src/components/Menu.tsx
  git commit -m "refactor(menu): enhance item cards and enforce clean code modularity"
  ```

---

### Task 4: Verifikasi Build Produksi & Audit Tampilan

**Files:**
- Build output: `dist/`

- [ ] **Step 1: Jalankan build produksi Vite**
  Run: `PATH=/usr/bin:/bin:$PATH npm run build`
  Expected: Build sukses (`built in ...s`) tanpa error aset atau kompilasi.

- [ ] **Step 2: Verifikasi bundle & aset statis**
  Pastikan seluruh gambar menu dan komponen di-bundle dengan benar ke direktori `dist/`.

- [ ] **Step 3: Final review dan persiapan commit/push**
  Cek `git status` dan pastikan working tree bersih.
