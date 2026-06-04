import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Search, User, Heart, ShoppingBag, X, ChevronDown, Sparkles, Menu } from 'lucide-react';
import { useCart } from '../context/CartContext';

const navLinks = [
  { label: 'Men', path: '/men', mega: ['T-Shirts', 'Shirts', 'Jeans', 'Trousers', 'Shoes', 'Watches', 'Jackets', 'Shorts'] },
  { label: 'Women', path: '/women', mega: ['Kurtas', 'Dresses', 'Tops', 'Sarees', 'Jeans', 'Footwear', 'Bags', 'Jewellery'] },
  { label: 'Kids', path: '/kids', mega: ['Boys Clothing', 'Girls Clothing', 'Footwear', 'Toys', 'School Bags', 'Accessories'] },
  { label: 'Home & Living', path: '/home', mega: ['Bedding', 'Curtains', 'Cushions', 'Kitchen', 'Decor', 'Lighting'] },
  { label: 'Beauty', path: '/beauty', mega: ['Lipstick', 'Foundation', 'Skincare', 'Haircare', 'Fragrance', 'Tools'] },
  { label: 'Studio', path: '/studio', isNew: true, mega: ['Trending Looks', 'Style Edit', 'Brand Stories', 'Celeb Style'] },
];

export default function Navbar() {
  const { bag, wishlist } = useCart();
  const [query, setQuery] = useState('');
  const [activeMenu, setActiveMenu] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const menuRef = useRef();
  const timerRef = useRef();

  useEffect(() => {
    setMobileOpen(false);
    setActiveMenu(null);
  }, [location]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) { navigate(`/search?q=${encodeURIComponent(query.trim())}`); setQuery(''); setSearchOpen(false); }
  };

  const onMouseEnter = (label) => {
    clearTimeout(timerRef.current);
    setActiveMenu(label);
  };
  const onMouseLeave = () => {
    timerRef.current = setTimeout(() => setActiveMenu(null), 150);
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm border-b border-myntra-border">
      {/* Top Nav */}
      <div className="max-w-[1400px] mx-auto px-4 h-14 flex items-center gap-6">
        {/* Logo */}
        <Link to="/" className="flex-shrink-0">
          <div className="flex items-center gap-1">
            <span className="text-2xl font-black text-myntra-pink tracking-tight">myntra</span>
          </div>
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center gap-6 flex-1" ref={menuRef}>
          {navLinks.map(link => (
            <div key={link.label} className="relative" onMouseEnter={() => onMouseEnter(link.label)} onMouseLeave={onMouseLeave}>
              <Link to={link.path} className="nav-link flex items-center gap-0.5 py-4">
                {link.label}
                {link.isNew && (
                  <sup className="ml-1 text-[9px] font-bold text-myntra-pink bg-myntra-light px-1 py-0.5 rounded-sm">NEW</sup>
                )}
              </Link>

              {/* Mega Menu */}
              {activeMenu === link.label && (
                <div className="mega-menu absolute top-full left-0 mt-0 bg-white shadow-2xl border-t-2 border-myntra-pink rounded-b-lg p-5 min-w-[220px] z-50">
                  <p className="text-xs font-bold text-myntra-gray uppercase tracking-wider mb-3">{link.label}</p>
                  <div className="grid grid-cols-2 gap-y-2 gap-x-6">
                    {link.mega.map(item => (
                      <Link key={item} to={`${link.path}?cat=${encodeURIComponent(item)}`}
                        className="text-sm text-myntra-dark hover:text-myntra-pink transition-colors py-1 border-b border-transparent hover:border-myntra-pink">
                        {item}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}

          {/* Divider + Extra Links */}
          <div className="w-px h-4 bg-myntra-border mx-1" />
          <Link to="/contact" className="nav-link text-[13px]">Contact</Link>
          <Link to="/about" className="nav-link text-[13px]">About</Link>
        </nav>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="hidden md:flex items-center bg-[#f5f5f6] rounded-md px-3 py-1.5 gap-2 w-56 lg:w-72 flex-shrink-0">
          <Search size={15} className="text-myntra-gray flex-shrink-0" />
          <input value={query} onChange={e => setQuery(e.target.value)}
            placeholder="Search for products, brands..."
            className="bg-transparent text-sm text-myntra-dark placeholder-myntra-gray focus:outline-none w-full search-input" />
          {query && <button type="button" onClick={() => setQuery('')}><X size={13} className="text-myntra-gray" /></button>}
        </form>

        {/* Action Icons */}
        <div className="flex items-center gap-4 ml-auto lg:ml-0">
          {/* Mobile search toggle */}
          <button className="md:hidden" onClick={() => setSearchOpen(o => !o)}>
            <Search size={20} className="text-myntra-dark" />
          </button>

          <Link to="/profile" className="hidden sm:flex flex-col items-center gap-0.5 group">
            <User size={20} className="text-myntra-dark group-hover:text-myntra-pink transition-colors" />
            <span className="text-[10px] text-myntra-gray group-hover:text-myntra-pink font-medium">Profile</span>
          </Link>

          <Link to="/wishlist" className="flex flex-col items-center gap-0.5 group relative">
            <Heart size={20} className="text-myntra-dark group-hover:text-myntra-pink transition-colors" />
            <span className="text-[10px] text-myntra-gray group-hover:text-myntra-pink font-medium hidden sm:block">Wishlist</span>
            {wishlist.length > 0 && (
              <span className="badge-count absolute -top-1.5 -right-1.5 bg-myntra-pink text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {wishlist.length}
              </span>
            )}
          </Link>

          <Link to="/bag" className="flex flex-col items-center gap-0.5 group relative">
            <ShoppingBag size={20} className="text-myntra-dark group-hover:text-myntra-pink transition-colors" />
            <span className="text-[10px] text-myntra-gray group-hover:text-myntra-pink font-medium hidden sm:block">Bag</span>
            {bag.length > 0 && (
              <span className="badge-count absolute -top-1.5 -right-1.5 bg-myntra-pink text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {bag.length}
              </span>
            )}
          </Link>

          {/* Mobile menu */}
          <button className="lg:hidden" onClick={() => setMobileOpen(o => !o)}>
            <Menu size={20} className="text-myntra-dark" />
          </button>
        </div>
      </div>

      {/* Mobile Search Bar */}
      {searchOpen && (
        <div className="md:hidden px-4 pb-3 animate-slide-down">
          <form onSubmit={handleSearch} className="flex items-center bg-[#f5f5f6] rounded-md px-3 py-2 gap-2">
            <Search size={15} className="text-myntra-gray" />
            <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search products, brands..."
              className="bg-transparent text-sm text-myntra-dark placeholder-myntra-gray focus:outline-none flex-1" autoFocus />
          </form>
        </div>
      )}

      {/* Mobile Nav Menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-white border-t border-myntra-border animate-slide-down px-4 py-3">
          <div className="grid grid-cols-3 gap-3">
            {navLinks.map(link => (
              <Link key={link.label} to={link.path}
                className="flex flex-col items-center gap-1 p-2 rounded-lg hover:bg-myntra-light transition-colors text-center">
                <span className="text-sm font-semibold text-myntra-dark">{link.label}</span>
                {link.isNew && <span className="text-[9px] bg-myntra-pink text-white px-1 rounded">NEW</span>}
              </Link>
            ))}
            <Link to="/contact" className="text-sm text-center py-2 font-semibold text-myntra-dark hover:text-myntra-pink">Contact</Link>
            <Link to="/about" className="text-sm text-center py-2 font-semibold text-myntra-dark hover:text-myntra-pink">About</Link>
          </div>
        </div>
      )}
    </header>
  );
}
