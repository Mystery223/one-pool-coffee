import { useState } from 'react';

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

const menuItems: MenuItem[] = [
  {
    id: '1',
    name: 'Berry Pink',
    description: 'Perpaduan segar sari buah beri manis dingin dan sensasi citrus lemon yang menyegarkan.',
    price: 19000,
    itemType: 'drink',
    category: 'non-coffee',
    image: '/img/Berry_pink.jpeg',
  },
  {
    id: '2',
    name: 'Blue Ocean Mojito',
    description: 'Kesegaran sirup blue curacao berpadu soda berkarbonasi, daun mint segar, dan perasan jeruk nipis dingin.',
    price: 18000,
    itemType: 'drink',
    category: 'non-coffee',
    image: '/img/Blue_ocean.jpeg',
  },
  {
    id: '3',
    name: 'Grand Forest',
    description: 'Sensasi segar sirup melon hijau berpadu irisan jeruk nipis asli, daun mint, dan yakult menyejukkan.',
    price: 22000,
    itemType: 'drink',
    category: 'non-coffee',
    image: '/img/Grand_forest.jpeg',
  },
  {
    id: '4',
    name: 'Summer Mojito',
    description: 'Mocktail musim panas dengan ekstrak water melon, soda sparkling, daun mint, dan sentuhan lemon segar.',
    price: 18000,
    itemType: 'drink',
    category: 'non-coffee',
    image: '/img/Summer_mojito.jpeg',
  },
  {
    id: '5',
    name: 'Sunrise Mojito',
    description: 'Gradasi eksotis sari jeruk manis dan stroberi berpadu soda dingin dengan garnish irisan lemon pilihan.',
    price: 25000,
    itemType: 'drink',
    category: 'non-coffee',
    image: '/img/Sunrise_mojito.jpeg',
  },
  {
    id: '6',
    name: 'Coffee Gula Aren',
    description: 'Espresso pekat bertemu susu segar, menghasilkan kopi susu iced yang sempurna dan nikmat.',
    price: 20000,
    itemType: 'drink',
    category: 'coffee',
    image: '/img/foto-7.jpeg',
  },
  {
    id: '7',
    name: 'Coffee Latte',
    description: 'Kopi latte iced dengan milk foam tebal, tekstur lembut, dan aroma kopi yang kuat.',
    price: 19000,
    itemType: 'drink',
    category: 'coffee',
    image: '/img/foto-8.jpeg',
  },
  {
    id: '8',
    name: 'Vanilla Coffee',
    description: 'Espresso dan susu segar dipadu sirup vanilla premium, manis lembut dengan aroma harum yang menggoda.',
    price: 19000,
    itemType: 'drink',
    category: 'coffee',
    image: '/img/foto-9.jpeg',
  },
  {
    id: '9',
    name: 'Hazelnut Coffee',
    description: 'Kopi latte iced dengan sentuhan hazelnut yang kaya, menghadirkan rasa nutty yang memanjakan lidah.',
    price: 19000,
    itemType: 'drink',
    category: 'coffee',
    image: '/img/foto-10.jpeg',
  },
  {
    id: '10',
    name: 'Taro Coffee',
    description: 'Perpaduan unik espresso dengan taro ungu yang creamy menjadikan rasa kopi yang berbeda dari biasanya.',
    price: 20000,
    itemType: 'drink',
    category: 'coffee',
    image: '/img/foto-11.jpeg',
  },
  {
    id: '11',
    name: 'Milk Taro',
    description: 'Minuman taro lembut berpadu susu segar dingin yang gurih manis memanjakan.',
    price: 19000,
    itemType: 'drink',
    category: 'milk-matcha',
    image: '/img/foto-2.jpeg',
  },
  {
    id: '12',
    name: 'Milk Matcha',
    description: 'Matcha otentik khas Jepang dengan susu segar creamy yang harum dan menenangkan.',
    price: 20000,
    itemType: 'drink',
    category: 'milk-matcha',
    image: '/img/foto-1.jpeg',
  },
  {
    id: '13',
    name: 'Matcha Brown Sugar Latte',
    description: 'Perpaduan mewah matcha gurih, gula aren legit, dan susu dingin segar pilihan.',
    price: 20000,
    itemType: 'drink',
    category: 'milk-matcha',
    image: '/img/foto-4.jpeg',
  },
  {
    id: '14',
    name: 'Nasi Goreng Spesial One Pool',
    description: 'Nasi goreng racikan khas kafe disajikan dengan telur mata sapi, kerupuk, dan acar segar.',
    price: 25000,
    itemType: 'food',
    category: 'main-course',
    image: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: '15',
    name: 'Mie Nyemek Juara',
    description: 'Mie kuah kental gurih pedas manis dengan sayuran segar dan irisan topping lezat.',
    price: 22000,
    itemType: 'food',
    category: 'main-course',
    image: 'https://images.unsplash.com/photo-1612927601601-6638404737ce?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: '16',
    name: 'Rice Bowl Ayam Teriyaki',
    description: 'Daging ayam fillet saus teriyaki gurih manis di atas nasi pulen hangat yang menggugah selera.',
    price: 26000,
    itemType: 'food',
    category: 'main-course',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: '17',
    name: 'Crispy French Fries',
    description: 'Kentang goreng renyah bumbu gurih disajikan hangat dengan cocolan saus sambal dan mayones.',
    price: 18000,
    itemType: 'food',
    category: 'snack',
    image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: '18',
    name: 'Platter Combo One Pool',
    description: 'Kombinasi sosis panggang, nugget renyah, dan kentang goreng porsi sharing teman main billiard.',
    price: 28000,
    itemType: 'food',
    category: 'snack',
    image: 'https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: '19',
    name: 'Roti Bakar Cokelat Keju',
    description: 'Roti panggang empuk dengan lumeran cokelat manis dan taburan keju parut melimpah.',
    price: 18000,
    itemType: 'food',
    category: 'snack',
    image: 'https://images.unsplash.com/photo-1584776296944-ab6fb57b0bdd?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: '20',
    name: 'Cireng Crispy Bumbu Rujak',
    description: 'Cireng kenyal berbalut tepung renyah disajikan dengan cocolan bumbu rujak pedas manis.',
    price: 15000,
    itemType: 'food',
    category: 'snack',
    image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80',
  },
];

interface CategoryTabItem {
  key: MenuCategory;
  label: string;
}

const drinkCategories: CategoryTabItem[] = [
  { key: 'all', label: 'Semua Minuman' },
  { key: 'coffee', label: 'Coffee' },
  { key: 'non-coffee', label: 'Fresh Drink' },
  { key: 'milk-matcha', label: 'Milk & Matcha' },
];

const foodCategories: CategoryTabItem[] = [
  { key: 'all', label: 'Semua Makanan' },
  { key: 'main-course', label: 'Makanan Utama' },
  { key: 'snack', label: 'Cemilan & Snack' },
];

const typeTabs = [
  { key: 'all', label: 'Semua Menu' },
  { key: 'drink', label: 'Minuman' },
  { key: 'food', label: 'Makanan' },
];

const formatPrice = (price: number) =>
  new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(price);

const categoryLabels: Record<MenuCategory, string> = {
  all: '',
  coffee: 'Coffee',
  'non-coffee': 'Fresh Drink',
  'milk-matcha': 'Milk & Matcha',
  'main-course': 'Makanan Utama',
  snack: 'Snack',
};

function MenuHeader() {
  return (
    <div className="text-center mb-10">
      <h2 className="font-display text-3xl sm:text-5xl text-parchment-100 font-bold">
        Daftar Menu Favorit
      </h2>
      <p className="mt-3 text-parchment-200 text-sm sm:text-base max-w-lg mx-auto leading-relaxed">
        Pilihan kopi racikan, minuman segar, dan hidangan lezat untuk menemani santai dan permainan billiard Anda.
      </p>
    </div>
  );
}

function MenuTypeToggle({ active, onSelect }: { active: string; onSelect: (key: string) => void }) {
  return (
    <div className="flex items-center justify-center gap-2 mb-6 p-1 bg-void-900 border border-void-800 rounded-lg max-w-xs mx-auto">
      {typeTabs.map((t) => (
        <button
          key={t.key}
          onClick={() => onSelect(t.key)}
          className={`flex-1 py-2 text-xs tracking-wider uppercase font-semibold transition-all rounded ${
            active === t.key ? 'bg-gold-500 text-void-950 shadow-md shadow-gold-500/20' : 'text-parchment-300 hover:text-gold-300'
          }`}
        >
          {t.label}
        </button>
      ))}
    </div>
  );
}

interface CategoryTabsProps {
  categories: CategoryTabItem[];
  active: MenuCategory;
  onSelect: (key: MenuCategory) => void;
}

function CategoryTabs({ categories, active, onSelect }: CategoryTabsProps) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2.5 mb-10">
      {categories.map((c) => (
        <button
          key={c.key}
          onClick={() => onSelect(c.key)}
          className={`px-4 py-2 text-xs tracking-wider uppercase font-semibold transition-all rounded ${
            active === c.key
              ? 'bg-gold-500 text-void-950 shadow-md shadow-gold-500/20'
              : 'bg-void-900 border border-void-800 text-parchment-200 hover:border-gold-500/50 hover:text-gold-300'
          }`}
        >
          {c.label}
        </button>
      ))}
    </div>
  );
}

function ItemBadge({ itemType, category }: { itemType: ItemType; category: MenuCategory }) {
  return (
    <div className="absolute top-3 left-3 z-10 flex gap-1.5">
      <span className="px-2.5 py-1 text-[10px] tracking-wider uppercase font-bold bg-void-950/85 backdrop-blur-sm text-gold-400 border border-gold-500/30 rounded">
        {itemType === 'food' ? 'Makanan' : 'Minuman'}
      </span>
      {category !== 'all' && (
        <span className="px-2.5 py-1 text-[10px] tracking-wider uppercase font-semibold bg-void-900/80 backdrop-blur-sm text-parchment-200 border border-void-700/60 rounded">
          {categoryLabels[category]}
        </span>
      )}
    </div>
  );
}

function ItemImage({ src, alt, item }: { src: string; alt: string; item: MenuItem }) {
  return (
    <div className="relative aspect-[3/4] overflow-hidden bg-void-950">
      <ItemBadge itemType={item.itemType} category={item.category} />
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
        loading="lazy"
      />
    </div>
  );
}

function ItemContent({ item }: { item: MenuItem }) {
  return (
    <div className="p-5 flex-1 flex flex-col justify-between">
      <div>
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-display text-base sm:text-lg text-parchment-100 font-semibold leading-snug">{item.name}</h3>
          <span className="text-gold-400 font-semibold text-sm whitespace-nowrap">{formatPrice(item.price)}</span>
        </div>
        <p className="mt-2 text-xs sm:text-sm text-parchment-300 leading-relaxed font-normal">{item.description}</p>
      </div>
    </div>
  );
}

function MenuItemCard({ item }: { item: MenuItem }) {
  return (
    <article className="group bg-void-900 border border-void-800/80 hover:border-gold-500/40 transition-all rounded-lg overflow-hidden flex flex-col shadow-md">
      <ItemImage src={item.image} alt={item.name} item={item} />
      <ItemContent item={item} />
    </article>
  );
}

function useFilteredMenu() {
  const [activeType, setActiveType] = useState('all');
  const [activeCategory, setActiveCategory] = useState<MenuCategory>('all');
  const handleTypeSelect = (type: string) => { setActiveType(type); setActiveCategory('all'); };
  const currentCategories = activeType === 'food' ? foodCategories : drinkCategories;
  const itemsByType = activeType === 'all' ? menuItems : menuItems.filter((i) => i.itemType === activeType);
  const filteredItems = activeCategory === 'all' ? itemsByType : itemsByType.filter((i) => i.category === activeCategory);
  return { activeType, activeCategory, currentCategories, filteredItems, handleTypeSelect, setActiveCategory };
}

export default function Menu() {
  const { activeType, activeCategory, currentCategories, filteredItems, handleTypeSelect, setActiveCategory } = useFilteredMenu();
  return (
    <section id="menu" className="py-16 sm:py-24 lg:py-28 bg-void-950 border-t border-void-800/80">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <MenuHeader />
        <MenuTypeToggle active={activeType} onSelect={handleTypeSelect} />
        {activeType !== 'all' && <CategoryTabs categories={currentCategories} active={activeCategory} onSelect={setActiveCategory} />}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 lg:gap-8">
          {filteredItems.map((item) => (
            <MenuItemCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
