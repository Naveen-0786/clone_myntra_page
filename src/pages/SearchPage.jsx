import { useLocation } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { products } from '../data/products';
import { Search } from 'lucide-react';

export default function SearchPage() {
  const { search } = useLocation();
  const q = new URLSearchParams(search).get('q') || '';
  const results = products.filter(p =>
    p.name.toLowerCase().includes(q.toLowerCase()) ||
    p.company.toLowerCase().includes(q.toLowerCase()) ||
    p.category.toLowerCase().includes(q.toLowerCase())
  );

  return (
    <div className="max-w-[1400px] mx-auto px-4 py-6 min-h-screen">
      <div className="flex items-center gap-2 mb-5">
        <Search size={16} className="text-myntra-gray" />
        <p className="text-sm text-myntra-gray">
          Search results for "<span className="font-bold text-myntra-dark">{q}</span>"
          {' '}&mdash; {results.length} item{results.length !== 1 ? 's' : ''}
        </p>
      </div>
      {results.length === 0 ? (
        <div className="text-center py-24">
          <div className="text-5xl mb-4">🔍</div>
          <p className="text-lg font-bold text-myntra-dark">No results found for "{q}"</p>
          <p className="text-sm text-myntra-gray mt-2">Try different keywords or browse categories</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {results.map((p, i) => <ProductCard key={p.id} product={p} delay={i * 60} />)}
        </div>
      )}
    </div>
  );
}
