import { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, TrendingUp, Zap, Gift, Truck } from 'lucide-react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { products, bannerOffers } from '../data/products';

const heroSlides = [
  {
    title: 'End of Season Sale',
    subtitle: 'Up to 80% Off on Top Brands',
    cta: 'SHOP NOW',
    bg: 'from-rose-500 to-pink-600',
    accent: '#ff3f6c',
    image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1200&h=400&fit=crop',
    link: '/women',
  },
  {
    title: 'New Arrivals – Men\'s Edit',
    subtitle: 'Fresh styles for every occasion',
    cta: 'EXPLORE MEN',
    bg: 'from-indigo-600 to-blue-700',
    accent: '#4f46e5',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=400&fit=crop',
    link: '/men',
  },
  {
    title: 'Beauty Essentials',
    subtitle: 'Skincare, Makeup & Fragrance',
    cta: 'SHOP BEAUTY',
    bg: 'from-amber-500 to-orange-500',
    accent: '#ff905a',
    image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=1200&h=400&fit=crop',
    link: '/beauty',
  },
];

const categoryCards = [
  { label: 'Men', path: '/men', emoji: '👔', color: 'bg-blue-50', border: 'border-blue-200', img: 'https://images.unsplash.com/photo-1516257984-b1b4d707412e?w=200&h=250&fit=crop' },
  { label: 'Women', path: '/women', emoji: '👗', color: 'bg-pink-50', border: 'border-pink-200', img: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=200&h=250&fit=crop' },
  { label: 'Kids', path: '/kids', emoji: '🧒', color: 'bg-yellow-50', border: 'border-yellow-200', img: 'https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?w=200&h=250&fit=crop' },
  { label: 'Home', path: '/home', emoji: '🏠', color: 'bg-green-50', border: 'border-green-200', img: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=200&h=250&fit=crop' },
  { label: 'Beauty', path: '/beauty', emoji: '💄', color: 'bg-purple-50', border: 'border-purple-200', img: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=200&h=250&fit=crop' },
  { label: 'Studio', path: '/studio', emoji: '✨', color: 'bg-rose-50', border: 'border-rose-200', img: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=200&h=250&fit=crop' },
];

const perks = [
  { icon: Truck, label: 'Free Delivery', desc: 'On orders above ₹499', color: 'text-myntra-green' },
  { icon: Gift, label: '30 Day Returns', desc: 'Easy hassle-free returns', color: 'text-myntra-pink' },
  { icon: Zap, label: 'Secure Payments', desc: '100% safe & secure', color: 'text-blue-500' },
  { icon: TrendingUp, label: 'Latest Trends', desc: '50,000+ brands', color: 'text-myntra-orange' },
];

// Scroll-reveal hook
function useReveal() {
  const ref = useRef();
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { el.classList.add('visible'); obs.disconnect(); }
    }, { threshold: 0.12 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

export default function HomePage() {
  const [slide, setSlide] = useState(0);
  const [offerIdx, setOfferIdx] = useState(0);
  const revealTrending = useReveal();
  const revealCats = useReveal();
  const revealPerks = useReveal();

  // Auto-advance hero
  useEffect(() => {
    const t = setInterval(() => setSlide(s => (s + 1) % heroSlides.length), 4500);
    return () => clearInterval(t);
  }, []);

  // Offer ticker
  useEffect(() => {
    const t = setInterval(() => setOfferIdx(i => (i + 1) % bannerOffers.length), 3000);
    return () => clearInterval(t);
  }, []);

  const current = heroSlides[slide];

  return (
    <div className="min-h-screen">
      {/* Offer Ticker */}
      <div className="bg-myntra-dark text-white text-[11px] font-semibold text-center py-1.5 overflow-hidden relative">
        <div className="transition-all duration-500">{bannerOffers[offerIdx]}</div>
      </div>

      {/* Hero Slider */}
      <div className="relative overflow-hidden" style={{ height: 'clamp(200px, 38vw, 420px)' }}>
        {heroSlides.map((s, i) => (
          <div key={i} className={`absolute inset-0 transition-opacity duration-700 ${i === slide ? 'opacity-100' : 'opacity-0'}`}>
            <img src={s.image} alt={s.title} className="w-full h-full object-cover" />
            <div className={`absolute inset-0 bg-gradient-to-r ${s.bg} opacity-70`} />
            <div className="absolute inset-0 flex flex-col items-start justify-center px-10 md:px-20">
              <h1 className="text-2xl md:text-4xl font-black text-white mb-2 drop-shadow-lg">{s.title}</h1>
              <p className="text-sm md:text-lg text-white/90 mb-5 drop-shadow">{s.subtitle}</p>
              <Link to={s.link} className="bg-white font-black text-[11px] tracking-widest px-6 py-2.5 rounded-sm hover:bg-opacity-90 transition-all hover:scale-105 active:scale-95"
                style={{ color: s.accent }}>{s.cta}</Link>
            </div>
          </div>
        ))}

        {/* Controls */}
        <button onClick={() => setSlide(s => (s - 1 + heroSlides.length) % heroSlides.length)}
          className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-1.5 shadow hover:bg-white transition-all hover:scale-110">
          <ChevronLeft size={18} />
        </button>
        <button onClick={() => setSlide(s => (s + 1) % heroSlides.length)}
          className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-1.5 shadow hover:bg-white transition-all hover:scale-110">
          <ChevronRight size={18} />
        </button>

        {/* Dots */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
          {heroSlides.map((_, i) => (
            <button key={i} onClick={() => setSlide(i)}
              className={`rounded-full transition-all ${i === slide ? 'w-5 h-2 bg-white' : 'w-2 h-2 bg-white/50'}`} />
          ))}
        </div>
      </div>

      {/* Category Cards */}
      <div ref={revealCats} className="reveal max-w-[1400px] mx-auto px-4 mt-8">
        <h2 className="text-base font-black text-myntra-dark mb-4 tracking-wide">SHOP BY CATEGORY</h2>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
          {categoryCards.map((cat, i) => (
            <Link key={cat.label} to={cat.path}
              className={`cat-chip ${cat.color} ${cat.border} border rounded-xl overflow-hidden text-center flex flex-col group`}
              style={{ animationDelay: `${i * 60}ms` }}>
              <div className="overflow-hidden h-28 sm:h-32">
                <img src={cat.img} alt={cat.label} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-400" />
              </div>
              <div className="py-2 px-1">
                <span className="text-xs font-bold text-myntra-dark">{cat.emoji} {cat.label}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Perks */}
      <div ref={revealPerks} className="reveal max-w-[1400px] mx-auto px-4 mt-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {perks.map(p => (
            <div key={p.label} className="bg-white rounded-xl p-4 flex items-center gap-3 shadow-sm border border-myntra-border hover:shadow-md transition-shadow">
              <p.icon size={22} className={p.color} />
              <div>
                <p className="text-xs font-bold text-myntra-dark">{p.label}</p>
                <p className="text-[10px] text-myntra-gray">{p.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Trending Products */}
      <div ref={revealTrending} className="reveal max-w-[1400px] mx-auto px-4 mt-10 mb-8">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <TrendingUp size={18} className="text-myntra-pink" />
            <h2 className="text-base font-black text-myntra-dark tracking-wide">TRENDING NOW</h2>
          </div>
          <Link to="/men" className="text-xs font-bold text-myntra-pink hover:underline">View All →</Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {products.map((p, i) => (
            <ProductCard key={p.id} product={p} delay={i * 80} />
          ))}
        </div>
      </div>

      {/* Promotional Banner */}
      <div className="max-w-[1400px] mx-auto px-4 mb-10">
        <div className="rounded-2xl overflow-hidden relative h-36 md:h-48">
          <img src="https://images.unsplash.com/photo-1445205170230-053b83016050?w=1400&h=300&fit=crop" alt="promo" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-myntra-dark/90 to-transparent flex flex-col justify-center px-8">
            <p className="text-xs font-bold text-myntra-pink uppercase tracking-widest mb-1">Studio Picks</p>
            <h3 className="text-xl md:text-3xl font-black text-white mb-3">Curated Looks for You</h3>
            <Link to="/studio" className="bg-myntra-pink text-white text-[11px] font-black tracking-widest px-5 py-2 rounded-sm w-fit hover:bg-opacity-90 transition-all hover:scale-105">
              EXPLORE STUDIO ✨
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
