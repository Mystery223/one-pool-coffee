import { useState, useEffect } from 'react';
import { Star, ExternalLink } from 'lucide-react';

interface CustomerReview {
  id: string;
  name: string;
  role: string;
  rating: number;
  comment: string;
}

const reviewsData: CustomerReview[] = [
  {
    id: '1',
    name: 'Aditya Subagja',
    role: 'Pemain Billiard Rutin',
    rating: 5,
    comment: 'Tempatnya asyik buat main billiard bareng teman. Meja billiard-nya terawat mulus dan kopinya mantap, pas buat santai sore.',
  },
  {
    id: '2',
    name: 'Randi Taufik',
    role: 'Pengunjung Kafe',
    rating: 5,
    comment: 'Kopi Susu Gula Aren dan Summer Mojito-nya segar banget! Suasana adem, pelayanannya ramah, cocok buat nongkrong lama.',
  },
  {
    id: '3',
    name: 'Reka Sapitri',
    role: 'Pecinta Mocktail',
    rating: 5,
    comment: 'Pilihan minumannya variatif dan segar, terutama Berry Pink dan camilan French Fries-nya. Tempatnya bersih dan nyaman.',
  },
  {
    id: '4',
    name: 'David Pratama',
    role: 'Komunitas Billiard Garut',
    rating: 5,
    comment: 'Tempat billiard sekaligus kafe terbaik di area Leuwigoong. Parkirnya luas, WiFi kencang, dan harga menunya bersahabat.',
  },
];

const MAPS_URL = 'https://maps.app.goo.gl/x9fGnJ1axZM1LoiS7';

function ReviewsHeader() {
  return (
    <div className="text-center mb-10">
      <h2 className="font-display text-3xl sm:text-5xl text-parchment-100 font-bold">
        Ulasan Pengunjung
      </h2>
      <p className="mt-3 text-parchment-200 text-sm sm:text-base max-w-lg mx-auto leading-relaxed">
        Pengalaman nyata dari pengunjung tentang kualitas meja billiard, racikan menu, dan kenyamanan di One Pool and Coffee.
      </p>
    </div>
  );
}

function ReviewCardHeader() {
  return (
    <div className="flex items-center gap-1 mb-4">
      {[1, 2, 3, 4, 5].map((s) => (
        <Star key={s} className="w-4 h-4 fill-gold-400 text-gold-400" />
      ))}
    </div>
  );
}

function ReviewCard({ item }: { item: CustomerReview }) {
  return (
    <div className="bg-void-950 p-6 sm:p-7 rounded-lg border border-void-800/80 flex flex-col justify-between shadow-md h-full">
      <div>
        <ReviewCardHeader />
        <p className="text-parchment-200 text-sm sm:text-base leading-relaxed italic font-display">"{item.comment}"</p>
      </div>
      <div className="mt-5 pt-4 border-t border-void-800 flex items-center justify-between">
        <div>
          <p className="text-xs tracking-wider uppercase font-semibold text-parchment-100">{item.name}</p>
          <p className="text-[11px] text-parchment-300 mt-0.5">{item.role}</p>
        </div>
      </div>
    </div>
  );
}

function ReviewDots({ current, total, onSelect }: { current: number; total: number; onSelect: (i: number) => void }) {
  return (
    <div className="flex items-center justify-center gap-2 mt-5">
      {Array.from({ length: total }).map((_, i) => (
        <button
          key={i}
          onClick={() => onSelect(i)}
          aria-label={`Ulasan ${i + 1}`}
          className={`h-1.5 rounded-full transition-all duration-300 ${
            current === i ? 'w-6 bg-gold-400' : 'w-2 bg-void-700 hover:bg-void-600'
          }`}
        />
      ))}
    </div>
  );
}

function useAutoSlide(total: number, intervalMs = 4000) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(() => {
      setIndex((prev) => (prev === total - 1 ? 0 : prev + 1));
    }, intervalMs);
    return () => clearInterval(timer);
  }, [paused, total, intervalMs]);

  return { index, setIndex, setPaused };
}

function ReviewCarousel() {
  const total = reviewsData.length;
  const { index, setIndex, setPaused } = useAutoSlide(total);

  return (
    <div
      className="max-w-3xl mx-auto"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="min-h-[190px] transition-opacity duration-300">
        <ReviewCard item={reviewsData[index]} />
      </div>
      <ReviewDots current={index} total={total} onSelect={setIndex} />
    </div>
  );
}

function GoogleActions() {
  return (
    <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
      <a href={MAPS_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-5 py-2.5 bg-void-950 border border-gold-500/60 text-gold-300 hover:border-gold-400 hover:text-gold-200 text-xs tracking-wider uppercase font-semibold rounded transition-colors shadow-sm">
        <span>Lihat Semua di Google Maps</span>
        <ExternalLink className="w-3.5 h-3.5" />
      </a>
      <a href={MAPS_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-5 py-2.5 bg-gold-500 text-void-950 hover:bg-gold-400 text-xs tracking-wider uppercase font-semibold rounded transition-colors shadow-md">
        <Star className="w-3.5 h-3.5 fill-void-950" />
        <span>Beri Ulasan di Google</span>
      </a>
    </div>
  );
}

export default function Reviews() {
  return (
    <section id="reviews" className="py-16 sm:py-20 lg:py-24 bg-void-900 border-t border-void-800/80">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <ReviewsHeader />
        <ReviewCarousel />
        <GoogleActions />
      </div>
    </section>
  );
}
