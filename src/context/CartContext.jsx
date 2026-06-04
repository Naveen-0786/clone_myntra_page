import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [bag, setBag] = useState(() => {
    try { return JSON.parse(localStorage.getItem('myntra_bag') || '[]'); } catch { return []; }
  });
  const [wishlist, setWishlist] = useState(() => {
    try { return JSON.parse(localStorage.getItem('myntra_wishlist') || '[]'); } catch { return []; }
  });
  const [toast, setToast] = useState(null);

  useEffect(() => { localStorage.setItem('myntra_bag', JSON.stringify(bag)); }, [bag]);
  useEffect(() => { localStorage.setItem('myntra_wishlist', JSON.stringify(wishlist)); }, [wishlist]);

  const showToast = (msg, type = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 2500);
  };

  const addToBag = (product) => {
    if (!bag.find(i => i.id === product.id)) {
      setBag(prev => [...prev, product]);
      showToast(`${product.name.slice(0, 28)}... added to Bag!`);
    } else {
      showToast('Already in Bag', 'info');
    }
  };

  const removeFromBag = (id) => setBag(prev => prev.filter(i => i.id !== id));

  const toggleWishlist = (product) => {
    if (wishlist.find(i => i.id === product.id)) {
      setWishlist(prev => prev.filter(i => i.id !== product.id));
      showToast('Removed from Wishlist', 'info');
    } else {
      setWishlist(prev => [...prev, product]);
      showToast('Added to Wishlist ❤️');
    }
  };

  const isWishlisted = (id) => wishlist.some(i => i.id === id);
  const bagTotal = bag.reduce((sum, i) => sum + i.price, 0);

  return (
    <CartContext.Provider value={{ bag, wishlist, addToBag, removeFromBag, toggleWishlist, isWishlisted, bagTotal, toast }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
