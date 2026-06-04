import { Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { products } from '../data/products';

const looks = [
  { title: 'Office Ready', img: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=400&h=500&fit=crop', items: 3 },
  { title: 'Weekend Vibes', img: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=400&h=500&fit=crop', items: 4 },
  { title: 'Party Night', img: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&h=500&fit=crop', items: 5 },
  { title: 'Gym & Active', img: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400&h=500&fit=crop', items: 3 },
];

export default function StudioPage() {
  return (
    <div className="max-w-[1400px] mx-auto px-4 py-6 min-h-screen">
      {/* Hero */}
      <div className="bg-gradient-to-r from-rose-500 to-pink-600 rounded-2xl p-8 mb-8 text-white text-center">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Sparkles size={20} />
          <span className="text-xs font-bold uppercase tracking-widest">Myntra Studio</span>
          <Sparkles size={20} />
        </div>
        <h1 className="text-3xl font-black mb-2">Curated Style Edits</h1>
        <p className="text-white/80 text-sm">Handpicked looks, trend reports & style inspiration — just for you.</p>
      </div>

      {/* Looks */}
      <h2 className="text-base font-black text-myntra-dark mb-4">TRENDING LOOKS</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        {looks.map(look => (
          <div key={look.title} className="product-card rounded-xl overflow-hidden cursor-pointer group">
            <div className="relative aspect-[3/4] overflow-hidden">
              <img src={look.img} alt={look.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-3 left-3">
                <p className="text-white font-black text-sm">{look.title}</p>
                <p className="text-white/70 text-[10px]">{look.items} items</p>
              </div>
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="bg-white text-myntra-pink font-bold text-xs px-4 py-2 rounded-sm">SHOP LOOK</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <h2 className="text-base font-black text-myntra-dark mb-4">STUDIO PICKS</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
        {products.slice(0, 6).map((p, i) => <ProductCard key={p.id} product={p} delay={i * 80} />)}
      </div>
    </div>
  );
}
