import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
  createContext,
  useContext,
} from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

// =========================================================
// CART CONTEXT — moved from context/CartContext.tsx
// =========================================================
export interface CartItem {
  id: number;
  title: string;
  price: number;
  image: string;
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Omit<CartItem, 'quantity'> & { quantity?: number }) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  totalItems: number;
  toast: string;
  appliedDiscount: number;
  setAppliedDiscount: (d: number) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const STORAGE_KEY = 'minora_cart';

function loadCart(): CartItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveCartToStorage(cart: CartItem[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>(loadCart);
  const [toast, setToast] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState(0);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    saveCartToStorage(cart);
  }, [cart]);

  const showToast = useCallback((message: string) => {
    setToast(message);
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(''), 2500);
  }, []);

  const addToCart = useCallback(
    (product: Omit<CartItem, 'quantity'> & { quantity?: number }) => {
      setCart((prev) => {
        const existing = prev.find((i) => i.id === product.id);
        if (existing) {
          return prev.map((i) =>
            i.id === product.id
              ? { ...i, quantity: i.quantity + (product.quantity ?? 1) }
              : i
          );
        }
        return [...prev, { ...product, quantity: product.quantity ?? 1 }];
      });
      showToast(`${product.title} added to cart!`);
    },
    [showToast]
  );

  const removeFromCart = useCallback((productId: number) => {
    setCart((prev) => prev.filter((i) => i.id !== productId));
  }, []);

  const updateQuantity = useCallback(
    (productId: number, quantity: number) => {
      if (quantity <= 0) {
        removeFromCart(productId);
        return;
      }
      setCart((prev) =>
        prev.map((i) => (i.id === productId ? { ...i, quantity } : i))
      );
    },
    [removeFromCart]
  );

  const totalItems = cart.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        totalItems,
        toast,
        appliedDiscount,
        setAppliedDiscount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used inside CartProvider');
  return ctx;
}

// =========================================================
// IMPORTS — components & pages
// =========================================================
import Navbar from './components/Navbar/page';
import CartToast from './components/CartToast/page';
import SearchOverlay from './components/SearchOverlay/page';
import ProductCard, { PRODUCTS } from './components/ProductCard/page';
import Newsletter from './components/Newsletter/page';
import Footer from './components/Footer/page';

import Shop from './pages/Shop/page';
import Cart from './pages/Cart/page';
import Login from './pages/Login/page';
import Signup from './pages/Signup/page';
import About from './pages/About/page';
import Contact from './pages/Contact/page';
import Dashboard from './pages/Dashboard/page';

// =========================================================
// HOME PAGE — inlined in App.tsx
// =========================================================
const trendingProducts = PRODUCTS.slice(0, 20);

function Home() {
  return (
    <>
      {/* Hero Section */}
      <section id="hero-section">
        <div className="container hero-wrapper">
          <div className="hero-text-block">
            <span className="hero-badge">New Collection 2026</span>
            <h1>
              Step into <br />
              <span>absolute</span> comfort.
            </h1>
            <p>
              Get more for less - Up to 70% OFF across all exclusive products.
              Experience premium quality.
            </p>
            <div className="hero-buttons">
              <Link to="/shop" className="link-button lg-button">
                Shop Now <i className="fa-solid fa-arrow-right"></i>
              </Link>
              <button className="explore-btn">Explore Brands</button>
            </div>
          </div>
          <div className="hero-image-block">
            <img
              src="/images/herobanner2.png"
              alt="Featured Shoes"
              className="hero-img"
            />
          </div>
        </div>
      </section>

      {/* Perks / Features Strip */}
      <section className="container relative" id="features-section">
        <div className="feature-box">
          <div className="feature-item">
            <div className="feature-icon">
              <i className="fa-solid fa-truck-fast"></i>
            </div>
            <div className="feature-text">
              <h4>Free Shipping</h4>
              <p>On all orders over $50</p>
            </div>
          </div>
          <div className="feature-item">
            <div className="feature-icon">
              <i className="fa-solid fa-arrow-rotate-left"></i>
            </div>
            <div className="feature-text">
              <h4>30 Days Return</h4>
              <p>Money back guarantee</p>
            </div>
          </div>
          <div className="feature-item">
            <div className="feature-icon">
              <i className="fa-solid fa-headset"></i>
            </div>
            <div className="feature-text">
              <h4>24/7 Support</h4>
              <p>Live chat or call</p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="page-section">
        <div className="container">
          <div className="text-center">
            <h2>Shop by Category</h2>
            <div></div>
          </div>
          <div className="category-row">
            <div className="category-col">
              <Link to="/shop" className="category-card">
                <img src="/images/category-men.jpg" alt="Men" />
                <div className="category-overlay"></div>
                <h3 className="category-title">Men</h3>
              </Link>
            </div>
            <div className="category-col">
              <Link to="/shop" className="category-card">
                <img src="/images/category-women.jpg" alt="Women" />
                <div className="category-overlay"></div>
                <h3 className="category-title">Women</h3>
              </Link>
            </div>
            <div className="category-col">
              <Link to="/shop" className="category-card">
                <img src="/images/category-kids.jpg" alt="Kids" />
                <div className="category-overlay"></div>
                <h3 className="category-title">Kids</h3>
              </Link>
            </div>
            <div className="category-col">
              <Link to="/shop" className="category-card">
                <img src="/images/special-offer.png" alt="Accessories" />
                <div className="category-overlay"></div>
                <h3 className="category-title">Accessories</h3>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Trending Products — 20 cards */}
      <section className="page-section">
        <div className="container">
          <div className="text-center">
            <h2>Trending Products</h2>
            <p>Top picks from our latest collection.</p>
          </div>
          <div className="card-container">
            {trendingProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="view-all-wrapper">
            <Link to="/shop" className="view-all-link">
              View All Products &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* Special Offer Banner */}
      <section className="promo-banner">
        <div className="container">
          <h2>Special Offer — Up to 70% Off!</h2>
          <p>
            Limited time deals on premium footwear. Don't miss out on our
            biggest sale of the year.
          </p>
          <Link to="/shop" className="link-button lg-button">
            Shop the Sale
          </Link>
        </div>
      </section>

      <Newsletter />
      <Footer />
    </>
  );
}

// =========================================================
// APP LAYOUT
// =========================================================
function AppLayout() {
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <>
      <div className="promo-bar">
        Free shipping on all orders over $50.{' '}
        <Link to="/shop">Shop Now</Link>
      </div>

      <Navbar onSearchOpen={() => setSearchOpen(true)} />

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </main>

      <SearchOverlay isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
      <CartToast />
    </>
  );
}

// =========================================================
// ROOT APP
// =========================================================
export default function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <AppLayout />
      </CartProvider>
    </BrowserRouter>
  );
}
