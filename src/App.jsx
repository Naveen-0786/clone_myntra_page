import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Toast from './components/Toast';
import HomePage from './pages/HomePage';
import CategoryPage from './pages/CategoryPage';
import BagPage from './pages/BagPage';
import WishlistPage from './pages/WishlistPage';
import ProfilePage from './pages/ProfilePage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import StudioPage from './pages/StudioPage';
import SearchPage from './pages/SearchPage';

function Layout({ children }) {
  return (
    <div className="flex flex-col min-h-screen bg-[#f4f4f5]">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
      <Toast />
    </div>
  );
}

export default function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/men" element={<CategoryPage />} />
            <Route path="/women" element={<CategoryPage />} />
            <Route path="/kids" element={<CategoryPage />} />
            <Route path="/home" element={<CategoryPage />} />
            <Route path="/beauty" element={<CategoryPage />} />
            <Route path="/studio" element={<StudioPage />} />
            <Route path="/bag" element={<BagPage />} />
            <Route path="/wishlist" element={<WishlistPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/search" element={<SearchPage />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </CartProvider>
  );
}
