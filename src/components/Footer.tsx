import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Mail, Loader2, CheckCircle, ArrowUp } from 'lucide-react';

function useNewsletter() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus('loading');
    const { error } = await supabase.from('newsletter_subscribers').insert({ email });
    if (error && error.code !== '23505') { setStatus('error'); return; }
    setStatus('success');
    setEmail('');
  };

  return { email, setEmail, status, handleSubmit };
}

function NewsletterForm() {
  const { email, setEmail, status, handleSubmit } = useNewsletter();

  if (status === 'success') {
    return (
      <div className="inline-flex items-center gap-2 px-4 py-2 bg-void-900 border border-gold-500/40 rounded text-gold-400 text-xs font-medium">
        <CheckCircle className="w-4 h-4" />
        <span>Terima kasih! Email Anda telah terdaftar.</span>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2.5 max-w-md w-full">
      <div className="relative flex-1">
        <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gold-400/80" />
        <input
          type="email"
          required
          placeholder="Masukkan email Anda"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 bg-void-900 border border-void-700 rounded text-parchment-100 placeholder:text-parchment-400/50 text-sm focus:border-gold-500"
        />
      </div>
      <button
        type="submit"
        disabled={status === 'loading'}
        className="px-5 py-2.5 bg-gold-500 text-void-950 text-xs tracking-wider uppercase font-semibold rounded hover:bg-gold-400 transition-colors flex items-center justify-center gap-1.5 whitespace-nowrap"
      >
        {status === 'loading' ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Berlangganan'}
      </button>
    </form>
  );
}

function FooterNewsletterSection() {
  return (
    <div className="pb-10 border-b border-void-800/80 flex flex-col md:flex-row items-center justify-between gap-6">
      <div className="text-center md:text-left">
        <h3 className="font-display text-xl text-parchment-100 font-semibold">Promo &amp; Info Terbaru</h3>
        <p className="mt-1 text-xs text-parchment-300">Dapatkan update diskon billiard dan event spesial langsung di inbox.</p>
      </div>
      <NewsletterForm />
    </div>
  );
}

function FooterBottom() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-parchment-300">
      <div className="flex items-center gap-2.5">
        <div className="w-7 h-7 rounded-full border border-gold-500/40 bg-void-900 overflow-hidden">
          <img src="/logo.jpeg" alt="Logo One Pool and Coffee" className="w-full h-full object-cover" />
        </div>
        <span className="font-display tracking-widest text-parchment-100 font-semibold text-xs">ONE POOL & COFFEE</span>
      </div>
      <p>&copy; {new Date().getFullYear()} One Pool and Coffee • Leuwigoong, Garut.</p>
      <button onClick={scrollToTop} className="inline-flex items-center gap-1.5 text-gold-400 hover:text-gold-300 transition-colors py-1">
        <span>Ke Atas</span>
        <ArrowUp className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="bg-void-950 border-t border-void-800/80">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-10">
        <FooterNewsletterSection />
        <FooterBottom />
      </div>
    </footer>
  );
}
