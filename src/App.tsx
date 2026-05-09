import { useState } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { CartProvider } from './context/CartContext';

import Navbar from './components/Navbar/page';
import CartToast from './components/CartToast/page';
import SearchOverlay from './components/SearchOverlay/page';
import ProductCard from './components/ProductCard/page';
import Newsletter from './components/Newsletter/page';
import Footer from './components/Footer/page';

import { PRODUCTS } from './data/products';

import Shop from './pages/Shop/page';
import Cart from './pages/Cart/page';
import Login from './pages/Login/page';
import Signup from './pages/Signup/page';
import About from './pages/About/page';
import Contact from './pages/Contact/page';
import Dashboard from './pages/Dashboard/page';

// =========================================================
// HOME PAGE — inlined directly in App.tsx
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

          {/* View All Products link */}
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
// APP LAYOUT — shared shell (promo bar, navbar, routes)
// =========================================================
function AppLayout() {
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <>
      {/* Top Promotion Bar */}
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
