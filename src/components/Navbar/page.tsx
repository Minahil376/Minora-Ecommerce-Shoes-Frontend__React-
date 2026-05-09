import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../../App';

interface NavbarProps {
  onSearchOpen: () => void;
}

export default function Navbar({ onSearchOpen }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const { totalItems } = useCart();
  const location = useLocation();
  const navMenuRef = useRef<HTMLDivElement>(null);
  const menuToggleRef = useRef<HTMLButtonElement>(null);

  const isActive = (path: string) => location.pathname === path;

  // Close menu on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (
        menuOpen &&
        navMenuRef.current &&
        menuToggleRef.current &&
        !navMenuRef.current.contains(e.target as Node) &&
        !menuToggleRef.current.contains(e.target as Node)
      ) {
        setMenuOpen(false);
      }
    }
    function handleKeydown(e: KeyboardEvent) {
      if (e.key === 'Escape') setMenuOpen(false);
    }
    document.addEventListener('click', handleClick);
    document.addEventListener('keydown', handleKeydown);
    return () => {
      document.removeEventListener('click', handleClick);
      document.removeEventListener('keydown', handleKeydown);
    };
  }, [menuOpen]);

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  return (
    <header>
      <div className="container">
        <nav>
          {/* Logo */}
          <div className="nav-brand">
            <Link to="/">
              <img src="/images/Minoralogo3 .png" alt="Minora Logo" />
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className={`nav-menu${menuOpen ? ' open' : ''}`} ref={navMenuRef}>
            <ul>
              <li><Link to="/" className={isActive('/') ? 'active' : ''}>Home</Link></li>
              <li><Link to="/shop" className={isActive('/shop') ? 'active' : ''}>Shop</Link></li>
              <li><Link to="/login" className={isActive('/login') ? 'active' : ''}>Login</Link></li>
              <li><Link to="/about" className={isActive('/about') ? 'active' : ''}>About</Link></li>
              <li><Link to="/contact" className={isActive('/contact') ? 'active' : ''}>Contact Us</Link></li>
              <li><Link to="/dashboard" className={isActive('/dashboard') ? 'active' : ''}>Dashboard</Link></li>
            </ul>
          </div>

          {/* Icons */}
          <div className="nav-icons">
            <Link to="/signup" className="nav-signup-btn">Sign Up</Link>
            <button id="search-toggle" aria-label="Search" onClick={onSearchOpen}>
              <i className="fa-solid fa-magnifying-glass"></i>
            </button>
            <Link to="/cart" className="relative">
              <i className="fa-solid fa-bag-shopping"></i>
              <span className="cart-badge">{totalItems}</span>
            </Link>
            <button
              className={`menu-toggle${menuOpen ? ' active' : ''}`}
              ref={menuToggleRef}
              onClick={(e) => {
                e.stopPropagation();
                setMenuOpen((prev) => !prev);
              }}
            >
              <i className="fa-solid fa-bars"></i>
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
}
