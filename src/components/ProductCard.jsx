import { useState } from 'react';
import { Heart, Star, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function ProductCard({ product, delay = 0 }) {
  const { addToBag, toggleWishlist, isWishlisted } = useCart();
  const [imgLoaded, setImgLoaded] = useState(false);
  const wishlisted = isWishlisted(product.id);

  const stars = Array.from({ length: 5 }, (_, i) => i + 1);

  return (
    <div className="product-card bg-white rounded-lg overflow-hidden cursor-pointer group"
      style={{ animationDelay: `${delay}ms`, animation: 'fadeInUp 0.5s ease-out forwards', opacity: 0 }}>
      {/* Image */}
      <div className="relative overflow-hidden bg-gray-100 aspect-[3/4]">
        {!imgLoaded && (
          <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-shimmer bg-[length:200%_100%]" />
        )}
        <img src={product.image} alt={product.name}
          className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 ${imgLoaded ? 'opacity-100' : 'opacity-0'}`}
          onLoad={() => setImgLoaded(true)} />

        {/* Tag */}
        {product.tag && (
          <span className="absolute top-2 left-2 text-[10px] font-bold px-2 py-0.5 rounded-full bg-myntra-pink text-white uppercase tracking-wide">
            {product.tag}
          </span>
        )}

        {/* Wishlist */}
        <button onClick={(e) => { e.stopPropagation(); toggleWishlist(product); }}
          className={`absolute top-2 right-2 p-1.5 rounded-full bg-white shadow-md heart-btn ${wishlisted ? 'active' : ''}`}>
          <Heart size={16} fill={wishlisted ? '#ff3f6c' : 'none'} className={wishlisted ? 'text-myntra-pink' : 'text-myntra-gray'} />
        </button>

        {/* Return badge */}
        {product.returnDays && (
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent px-3 py-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <span className="text-[10px] text-white font-medium">{product.returnDays} Day Returns</span>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-3">
        <p className="text-xs font-bold text-myntra-dark truncate">{product.company}</p>
        <p className="text-xs text-myntra-gray truncate mt-0.5 leading-snug">{product.name}</p>

        {/* Rating */}
        {product.ratingCount > 0 && (
          <div className="flex items-center gap-1 mt-1.5">
            <div className="flex items-center gap-0.5 bg-myntra-green text-white text-[10px] font-bold px-1.5 py-0.5 rounded">
              <span>{product.rating}</span>
              <Star size={9} fill="white" />
            </div>
            <span className="text-[10px] text-myntra-gray">({product.ratingCount.toLocaleString()})</span>
          </div>
        )}

        {/* Price */}
        <div className="flex items-baseline gap-1.5 mt-2 flex-wrap">
          <span className="text-sm font-bold text-myntra-dark">₹{product.price.toLocaleString()}</span>
          {product.discount > 0 && (
            <>
              <span className="text-xs text-myntra-gray line-through">₹{product.originalPrice.toLocaleString()}</span>
              <span className="text-xs font-bold text-myntra-orange">({product.discount}% OFF)</span>
            </>
          )}
        </div>

        {/* Add to Bag */}
        <button onClick={() => addToBag(product)}
          className="btn-bag w-full mt-3 py-2 rounded-md text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-250">
          <ShoppingBag size={13} />
          Add to Bag
        </button>
      </div>
    </div>
  );
}
