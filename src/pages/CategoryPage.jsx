import { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { SlidersHorizontal, X } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { products } from '../data/products';

const catMap = { men: 'men', women: 'women', kids: 'kids', home: 'home', beauty: 'beauty', studio: 'all' };
const sortOptions = ['Recommended', 'New Arrivals', 'Price: Low to High', 'Price: High to Low', 'Customer Rating'];

export default function CategoryPage() {
  const { category } = useParams();
  const [sort, setSort] = useState('Recommended');
  const [showFilter, setShowFilter] = useState(false);
  const [priceRange, setPriceRange] = useState(20000);

  const catKey = catMap[category] || 'all';
  let filtered = catKey === 'all' ? products : products.filter(p => p.category === catKey);
  filtered = filtered.filter(p => p.price <= priceRange);

  if (sort === 'Price: Low to High') filtered = [...filtered].sort((a, b) => a.price - b.price);
  if (sort === 'Price: High to Low') filtered = [...filtered].sort((a, b) => b.price - a.price);
  if (sort === 'Customer Rating') filtered = [...filtered].sort((a, b) => b.rating - a.rating);

  const label = category ? category.charAt(0).toUpperCase() + category.slice(1) : 'All';

  return (
    <div className="max-w-[1400px] mx-auto px-4 py-6 min-h-screen">
      {/* Breadcrumb */}
      <p className="text-xs text-myntra-gray mb-4">Home &gt; <span className="text-myntra-dark font-semibold">{label}</span></p>

      <div className="flex items-center justify-between mb-5">
        <h1 className="text-lg font-black text-myntra-dark">{label.toUpperCase()} <span className="text-sm font-normal text-myntra-gray">({filtered.length} items)</span></h1>
        <div className="flex items-center gap-3">
          <button onClick={() => setShowFilter(o => !o)}
            className="flex items-center gap-1.5 text-xs font-bold border border-myntra-border px-3 py-2 rounded-md hover:border-myntra-pink hover:text-myntra-pink transition-all">
            <SlidersHorizontal size={13} /> FILTERS
          </button>
          <select value={sort} onChange={e => setSort(e.target.value)}
            className="text-xs font-bold border border-myntra-border px-3 py-2 rounded-md focus:outline-none focus:border-myntra-pink cursor-pointer">
            {sortOptions.map(o => <option key={o}>{o}</option>)}
          </select>
        </div>
      </div>

      <div className="flex gap-5">
        {/* Filter Panel */}
        {showFilter && (
          <aside className="w-56 flex-shrink-0 bg-white rounded-lg p-4 shadow-sm border border-myntra-border h-fit animate-slide-down sticky top-20">
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm font-bold text-myntra-dark">FILTERS</p>
              <button onClick={() => setShowFilter(false)}><X size={15} className="text-myntra-gray hover:text-myntra-pink" /></button>
            </div>
            <div>
              <p className="text-xs font-bold text-myntra-gray uppercase tracking-wider mb-2">Price Range</p>
              <input type="range" min={100} max={20000} step={100} value={priceRange}
                onChange={e => setPriceRange(Number(e.target.value))}
                className="w-full accent-myntra-pink" />
              <div className="flex justify-between text-xs text-myntra-gray mt-1">
                <span>₹100</span>
                <span className="font-bold text-myntra-pink">₹{priceRange.toLocaleString()}</span>
                <span>₹20,000</span>
              </div>
            </div>
          </aside>
        )}

        {/* Grid */}
        <div className="flex-1">
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <div className="text-5xl mb-4">🛍️</div>
              <p className="text-lg font-bold text-myntra-dark">No products found</p>
              <p className="text-sm text-myntra-gray mt-1">Try adjusting filters</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
              {filtered.map((p, i) => <ProductCard key={p.id} product={p} delay={i * 60} />)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
