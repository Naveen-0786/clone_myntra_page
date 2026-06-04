import { Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { useCart } from '../context/CartContext';

export default function WishlistPage() {
  const { wishlist } = useCart();
  if (wishlist.length === 0) return (
    <div className="max-w-[600px] mx-auto px-4 py-24 text-center">
      <Heart size={64} className="mx-auto text-myntra-border mb-5" />
      <h2 className="text-xl font-black text-myntra-dark mb-2">Your Wishlist is Empty</h2>
      <p className="text-sm text-myntra-gray mb-6">Save your favourite items for later.</p>
      <Link to="/" className="bg-myntra-pink text-white font-bold text-sm px-8 py-3 rounded-sm hover:bg-opacity-90 transition-all inline-block">
        EXPLORE PRODUCTS
      </Link>
    </div>
  );
  return (
    <div className="max-w-[1400px] mx-auto px-4 py-6 min-h-screen">
      <h1 className="text-lg font-black text-myntra-dark mb-5">My Wishlist ({wishlist.length} item{wishlist.length > 1 ? 's' : ''})</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
        {wishlist.map((p, i) => <ProductCard key={p.id} product={p} delay={i * 80} />)}
      </div>
    </div>
  );
}
