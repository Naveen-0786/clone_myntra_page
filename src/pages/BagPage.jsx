import { ShoppingBag, Trash2, ArrowRight, Tag } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function BagPage() {
  const { bag, removeFromBag, bagTotal } = useCart();
  const delivery = bagTotal >= 499 ? 0 : 49;
  const total = bagTotal + delivery;

  if (bag.length === 0) return (
    <div className="max-w-[600px] mx-auto px-4 py-24 text-center">
      <ShoppingBag size={64} className="mx-auto text-myntra-border mb-5" />
      <h2 className="text-xl font-black text-myntra-dark mb-2">Your Bag is Empty</h2>
      <p className="text-sm text-myntra-gray mb-6">Looks like you haven't added anything yet.</p>
      <Link to="/" className="bg-myntra-pink text-white font-bold text-sm px-8 py-3 rounded-sm hover:bg-opacity-90 transition-all inline-block">
        CONTINUE SHOPPING
      </Link>
    </div>
  );

  return (
    <div className="max-w-[1100px] mx-auto px-4 py-6 min-h-screen">
      <h1 className="text-lg font-black text-myntra-dark mb-5">My Bag ({bag.length} item{bag.length > 1 ? 's' : ''})</h1>
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Items */}
        <div className="flex-1 space-y-3">
          {bag.map(item => (
            <div key={item.id} className="bg-white rounded-lg p-4 flex gap-4 border border-myntra-border hover:shadow-sm transition-shadow animate-fade-in-up">
              <img src={item.image} alt={item.name} className="w-20 h-24 object-cover rounded-lg flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-myntra-dark">{item.company}</p>
                <p className="text-xs text-myntra-gray truncate mt-0.5">{item.name}</p>
                <div className="flex items-baseline gap-2 mt-2">
                  <span className="text-sm font-black text-myntra-dark">₹{item.price.toLocaleString()}</span>
                  {item.discount > 0 && <>
                    <span className="text-xs line-through text-myntra-gray">₹{item.originalPrice.toLocaleString()}</span>
                    <span className="text-xs font-bold text-myntra-orange">{item.discount}% OFF</span>
                  </>}
                </div>
                {item.returnDays && (
                  <p className="text-[10px] text-myntra-green font-semibold mt-1.5">{item.returnDays} Day Return Policy</p>
                )}
              </div>
              <button onClick={() => removeFromBag(item.id)} className="text-myntra-gray hover:text-red-500 transition-colors self-start mt-1 flex-shrink-0">
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="w-full lg:w-72 flex-shrink-0">
          {/* Coupon */}
          <div className="bg-white rounded-lg p-4 border border-myntra-border mb-3">
            <div className="flex items-center gap-2 text-sm text-myntra-pink font-bold cursor-pointer hover:opacity-80">
              <Tag size={14} /> Apply Coupon
            </div>
          </div>

          {/* Price Details */}
          <div className="bg-white rounded-lg p-4 border border-myntra-border">
            <h3 className="text-xs font-bold text-myntra-gray uppercase tracking-widest mb-4">Price Details ({bag.length} item{bag.length > 1 ? 's' : ''})</h3>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-myntra-dark">Total MRP</span>
                <span className="font-semibold">₹{bag.reduce((s, i) => s + i.originalPrice, 0).toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-myntra-dark">Discount on MRP</span>
                <span className="font-semibold text-myntra-green">-₹{(bag.reduce((s, i) => s + i.originalPrice, 0) - bagTotal).toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-myntra-dark">Delivery Charges</span>
                <span className={`font-semibold ${delivery === 0 ? 'text-myntra-green' : ''}`}>{delivery === 0 ? 'FREE' : `₹${delivery}`}</span>
              </div>
              <hr className="border-myntra-border" />
              <div className="flex justify-between text-sm font-black text-myntra-dark">
                <span>Total Amount</span>
                <span>₹{total.toLocaleString()}</span>
              </div>
            </div>
            {delivery === 0 && (
              <p className="text-[10px] text-myntra-green font-semibold mt-3 bg-green-50 rounded px-2 py-1.5">🎉 Yay! You get FREE delivery on this order!</p>
            )}
            <button className="w-full mt-4 bg-myntra-pink text-white font-black text-sm py-3 rounded-sm flex items-center justify-center gap-2 hover:bg-opacity-90 transition-all hover:shadow-lg hover:shadow-pink-200 active:scale-95">
              PLACE ORDER <ArrowRight size={15} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
