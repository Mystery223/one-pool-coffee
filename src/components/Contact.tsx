import { MapPin, Phone, Mail, Clock, Instagram, ExternalLink } from 'lucide-react';

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className || 'w-4 h-4'} aria-hidden="true">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.29 0 .58.04.85.12V9.41a6.33 6.33 0 0 0-.85-.06 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V9.08a8.28 8.28 0 0 0 4.84 1.57v-3.45a4.85 4.85 0 0 1-1.07-.51Z" />
    </svg>
  );
}

const contactItems = [
  { icon: MapPin, title: 'Lokasi Kafe', text: 'Jl.Raya Leuwigoong No. 58, Desa/Kelurahan Leuwigoong, Kec. Leuwigoong, Kab. Garut, Jawa Barat 44192', href: 'https://maps.app.goo.gl/x9fGnJ1axZM1LoiS7' },
  { icon: Phone, title: 'Telepon & WhatsApp', text: '+62 815-6321-8948', href: 'https://wa.me/6281563218948?text=Halo%20One%20Pool%20and%20Cafe%2C%20saya%20ingin%20tanya%20informasi%20meja%20dan%20menu' },
  { icon: Mail, title: 'Email', text: 'projectag87@gmail.com', href: 'mailto:projectag87@gmail.com' },
  { icon: Clock, title: 'Jam Operasional', text: 'Senin – Minggu: 08:00 – 22:00 WIB' },
];

function ContactHeader() {
  return (
    <div className="text-center mb-12">
      <h2 className="font-display text-3xl sm:text-5xl text-parchment-100 font-bold">
        Lokasi &amp; Kontak
      </h2>
      <p className="mt-3 text-parchment-200 text-sm sm:text-base max-w-lg mx-auto leading-relaxed">
        Pintu kami selalu terbuka untuk Anda. Nikmati permainan billiard dan aneka minuman segar setiap hari.
      </p>
    </div>
  );
}

function ContactCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {contactItems.map((item) => (
        <div key={item.title} className="bg-void-900 border border-void-800 p-5 rounded hover:border-gold-500/40 transition-colors">
          <item.icon className="w-5 h-5 text-gold-400 mb-3" />
          <h3 className="text-xs tracking-wider uppercase text-parchment-300 font-semibold mb-1">{item.title}</h3>
          {item.href ? (
            <a href={item.href} target={item.href.startsWith('http') ? '_blank' : undefined} rel="noreferrer" className="text-sm text-parchment-100 hover:text-gold-300 font-medium transition-colors inline-flex items-center gap-1.5">
              {item.text}
              {item.href.startsWith('http') && <ExternalLink className="w-3.5 h-3.5 text-gold-400" />}
            </a>
          ) : (
            <p className="text-sm text-parchment-100 font-medium">{item.text}</p>
          )}
        </div>
      ))}
    </div>
  );
}

function SocialRow() {
  const socials = [
    { icon: Instagram, href: 'https://instagram.com/username', label: 'Instagram One Pool and Coffee' },
    { icon: TikTokIcon, href: 'https://tiktok.com/@username', label: 'TikTok One Pool and Coffee' },
  ];
  return (
    <div className="bg-void-900 border border-void-800 p-5 rounded flex items-center justify-between">
      <div>
        <h3 className="text-xs tracking-wider uppercase text-parchment-300 font-semibold mb-0.5">Ikuti Media Sosial</h3>
        <p className="text-xs text-parchment-200">Update promo &amp; acara terbaru</p>
      </div>
      <div className="flex gap-2">
        {socials.map((s, idx) => (
          <a
            key={idx}
            href={s.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={s.label}
            className="w-10 h-10 border border-void-700 rounded flex items-center justify-center hover:border-gold-500 hover:text-gold-300 text-parchment-200 transition-colors"
          >
            <s.icon className="w-4 h-4" />
          </a>
        ))}
      </div>
    </div>
  );
}

function MapView() {
  return (
    <div className="relative border border-void-800 rounded overflow-hidden min-h-[360px] bg-void-900 shadow-md">
      <iframe
        title="Peta Lokasi One Pool and Cafe"
        src="https://www.openstreetmap.org/export/embed.html?bbox=107.9489%2C-7.0962%2C107.9689%2C-7.0762&layer=mapnik&marker=-7.0861876%2C107.9589061"
        className="w-full h-full min-h-[360px] border-0"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
      <div className="absolute bottom-3 right-3 bg-void-950/90 border border-gold-500/40 px-3 py-1.5 rounded shadow">
        <a href="https://maps.app.goo.gl/x9fGnJ1axZM1LoiS7" target="_blank" rel="noreferrer" className="text-xs text-gold-300 hover:text-gold-200 font-medium inline-flex items-center gap-1.5">
          Petunjuk Arah Google Maps <ExternalLink className="w-3 h-3" />
        </a>
      </div>
    </div>
  );
}

export default function Contact() {
  return (
    <section id="contact" className="py-16 sm:py-24 lg:py-28 bg-void-950 border-t border-void-800/80">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <ContactHeader />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <div className="space-y-4">
            <ContactCards />
            <SocialRow />
          </div>
          <MapView />
        </div>
      </div>
    </section>
  );
}
