import { User, Package, Heart, MapPin, CreditCard, HelpCircle, LogOut } from 'lucide-react';
import { useCart } from '../context/CartContext';

const menuItems = [
  { icon: Package, label: 'Orders', desc: 'Check your order status' },
  { icon: Heart, label: 'Wishlist', desc: 'Your saved items' },
  { icon: MapPin, label: 'Saved Addresses', desc: 'Manage delivery addresses' },
  { icon: CreditCard, label: 'Payment Methods', desc: 'Cards & wallets' },
  { icon: HelpCircle, label: 'Help Centre', desc: 'FAQs and support' },
];

export default function ProfilePage() {
  const { bag, wishlist } = useCart();
  return (
    <div className="max-w-[900px] mx-auto px-4 py-8 min-h-screen">
      {/* Profile Header */}
      <div className="bg-gradient-to-r from-myntra-pink to-rose-400 rounded-2xl p-6 text-white mb-6 flex items-center gap-5">
        <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center">
          <User size={32} className="text-white" />
        </div>
        <div>
          <h2 className="text-xl font-black">Hello, Guest 👋</h2>
          <p className="text-sm text-white/80 mt-0.5">Welcome to Myntra</p>
        </div>
        <button className="ml-auto bg-white text-myntra-pink font-bold text-xs px-4 py-2 rounded-sm hover:bg-opacity-90 transition-all">
          LOGIN / SIGNUP
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {[{ label: 'Orders', val: 0, color: 'text-blue-500' }, { label: 'Wishlist', val: wishlist.length, color: 'text-myntra-pink' }, { label: 'Bag Items', val: bag.length, color: 'text-myntra-orange' }].map(s => (
          <div key={s.label} className="bg-white rounded-xl p-4 text-center border border-myntra-border">
            <p className={`text-2xl font-black ${s.color}`}>{s.val}</p>
            <p className="text-xs text-myntra-gray mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Menu */}
      <div className="bg-white rounded-xl border border-myntra-border overflow-hidden">
        {menuItems.map((item, i) => (
          <div key={item.label} className={`flex items-center gap-4 px-5 py-4 cursor-pointer hover:bg-myntra-light transition-colors ${i < menuItems.length - 1 ? 'border-b border-myntra-border' : ''}`}>
            <div className="w-9 h-9 rounded-full bg-myntra-light flex items-center justify-center flex-shrink-0">
              <item.icon size={16} className="text-myntra-pink" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-bold text-myntra-dark">{item.label}</p>
              <p className="text-xs text-myntra-gray">{item.desc}</p>
            </div>
            <span className="text-myntra-gray text-lg">›</span>
          </div>
        ))}
        <div className="flex items-center gap-4 px-5 py-4 cursor-pointer hover:bg-red-50 transition-colors">
          <div className="w-9 h-9 rounded-full bg-red-50 flex items-center justify-center flex-shrink-0">
            <LogOut size={16} className="text-red-400" />
          </div>
          <p className="text-sm font-bold text-red-400">Logout</p>
        </div>
      </div>
    </div>
  );
}
