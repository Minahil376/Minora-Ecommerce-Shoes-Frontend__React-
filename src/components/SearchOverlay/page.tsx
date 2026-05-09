import { useState, useEffect, useRef } from 'react';
import { PRODUCTS, type Product } from '../ProductCard/page';
import { useCart } from '../../App';

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FilterState {
  keyword: string;
  category: string;
  sort: string;
  priceMin: string;
  priceMax: string;
  rating: string;
  tag: string;
}

const defaultFilters: FilterState = {
  keyword: '',
  category: '',
  sort: '',
  priceMin: '',
  priceMax: '',
  rating: '',
  tag: '',
};

export default function SearchOverlay({ isOpen, onClose }: SearchOverlayProps) {
  const [filters, setFilters] = useState<FilterState>(defaultFilters);
  const [results, setResults] = useState<Product[]>([]);
  const [searched, setSearched] = useState(false);
  const [addedIds, setAddedIds] = useState<Set<number>>(new Set());
  const { addToCart } = useCart();
  const keywordRef = useRef<HTMLInputElement>(null);

  // Focus keyword input when overlay opens
  useEffect(() => {
    if (isOpen && keywordRef.current) {
      keywordRef.current.focus();
    }
  }, [isOpen]);

  // Close on Escape
  useEffect(() => {
    function handleKeydown(e: KeyboardEvent) {
      if (e.key === 'Escape' && isOpen) onClose();
    }
    document.addEventListener('keydown', handleKeydown);
    return () => document.removeEventListener('keydown', handleKeydown);
  }, [isOpen, onClose]);

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  function runSearch() {
    const keyword = filters.keyword.trim().toLowerCase();
    const minPrice = parseFloat(filters.priceMin) || 0;
    const maxPrice = parseFloat(filters.priceMax) || Infinity;
    const minRating = parseFloat(filters.rating) || 0;

    let filtered = PRODUCTS.filter((p) => {
      const matchKeyword = !keyword || p.title.toLowerCase().includes(keyword);
      const matchCategory = !filters.category || p.category === filters.category;
      const matchPrice = p.price >= minPrice && p.price <= maxPrice;
      const matchRating = p.rating >= minRating;
      const matchTag = !filters.tag || p.tag === filters.tag;
      return matchKeyword && matchCategory && matchPrice && matchRating && matchTag;
    });

    if (filters.sort === 'price-asc')  filtered.sort((a, b) => a.price - b.price);
    if (filters.sort === 'price-desc') filtered.sort((a, b) => b.price - a.price);
    if (filters.sort === 'name-asc')   filtered.sort((a, b) => a.title.localeCompare(b.title));
    if (filters.sort === 'name-desc')  filtered.sort((a, b) => b.title.localeCompare(a.title));
    if (filters.sort === 'rating')     filtered.sort((a, b) => b.rating - a.rating);

    setResults(filtered);
    setSearched(true);
  }

  function resetFilters() {
    setFilters(defaultFilters);
    setResults([]);
    setSearched(false);
  }

  function handleAddToCart(product: Product) {
    addToCart({ id: product.id, title: product.title, price: product.price, image: product.image });
    setAddedIds((prev) => new Set(prev).add(product.id));
    setTimeout(() => {
      setAddedIds((prev) => {
        const next = new Set(prev);
        next.delete(product.id);
        return next;
      });
    }, 1200);
  }

  function handleChange(field: keyof FilterState, value: string) {
    setFilters((prev) => ({ ...prev, [field]: value }));
  }

  if (!isOpen) return null;

  return (
    <div
      id="search-overlay"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div id="search-modal" className="form-container">
        <div className="flex justify-between items-center">
          <h2>Search Products</h2>
          <button id="search-close" aria-label="Close search" onClick={onClose}>
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>

        {/* Keyword */}
        <div className="newsletter-form" id="search-keyword-wrap">
          <i className="fa-solid fa-magnifying-glass"></i>
          <input
            type="text"
            id="search-keyword"
            placeholder="Search by name or keyword..."
            ref={keywordRef}
            value={filters.keyword}
            onChange={(e) => handleChange('keyword', e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') runSearch(); }}
          />
          <button type="button" id="search-submit-btn" onClick={runSearch}>
            Search
          </button>
        </div>

        {/* Category + Sort */}
        <div className="hero-layout">
          <div className="hero-content">
            <label>Category</label>
            <div className="select-container">
              <select
                id="filter-category"
                value={filters.category}
                onChange={(e) => handleChange('category', e.target.value)}
              >
                <option value="">All Categories</option>
                <option value="men">Men's Footwear</option>
                <option value="women">Women's Footwear</option>
                <option value="kids">Kids' Footwear</option>
                <option value="accessories">Accessories</option>
              </select>
            </div>
          </div>
          <div className="hero-content">
            <label>Sort By</label>
            <div className="select-container">
              <select
                id="filter-sort"
                value={filters.sort}
                onChange={(e) => handleChange('sort', e.target.value)}
              >
                <option value="">Default</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="name-asc">Name: A to Z</option>
                <option value="name-desc">Name: Z to A</option>
                <option value="rating">Top Rated</option>
              </select>
            </div>
          </div>
        </div>

        {/* Price Range */}
        <div>
          <label>Price Range</label>
          <div className="hero-layout">
            <div className="hero-content">
              <input
                type="number"
                id="filter-price-min"
                placeholder="Min price e.g. 50"
                value={filters.priceMin}
                onChange={(e) => handleChange('priceMin', e.target.value)}
              />
            </div>
            <div className="hero-content">
              <input
                type="number"
                id="filter-price-max"
                placeholder="Max price e.g. 200"
                value={filters.priceMax}
                onChange={(e) => handleChange('priceMax', e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Rating + Tag */}
        <div className="hero-layout">
          <div className="hero-content">
            <label>Min Rating</label>
            <div className="select-container">
              <select
                id="filter-rating"
                value={filters.rating}
                onChange={(e) => handleChange('rating', e.target.value)}
              >
                <option value="">Any Rating</option>
                <option value="4">4 Stars &amp; Above</option>
                <option value="3">3 Stars &amp; Above</option>
                <option value="2">2 Stars &amp; Above</option>
              </select>
            </div>
          </div>
          <div className="hero-content">
            <label>Product Tag</label>
            <div className="select-container">
              <select
                id="filter-tag"
                value={filters.tag}
                onChange={(e) => handleChange('tag', e.target.value)}
              >
                <option value="">All Tags</option>
                <option value="HOT">HOT</option>
                <option value="NEW">NEW</option>
                <option value="SALE">SALE</option>
              </select>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="hero-layout">
          <div className="hero-content">
            <button className="primary-button" id="apply-filters-btn" onClick={runSearch}>
              <i className="fa-solid fa-filter"></i> Apply Filters
            </button>
          </div>
          <div className="hero-content">
            <button className="primary-button" id="reset-filters-btn" onClick={resetFilters}>
              <i className="fa-solid fa-rotate-left"></i> Reset Filters
            </button>
          </div>
        </div>

        {/* Results */}
        {searched && (
          <div id="search-results-area">
            <h3>Search Results</h3>
            <div id="search-results-count">
              <p>
                <strong>{results.length}</strong> product(s) found.
              </p>
            </div>
            <div id="search-results-list" className="card-container">
              {results.length === 0 ? (
                <p className="table-empty">
                  No products match your search. Try different filters.
                </p>
              ) : (
                results.map((p) => (
                  <div className="card-wrapper" key={p.id}>
                    <div className="card">
                      <div className="card-image-box">
                        <span className="card-badge">{p.tag}</span>
                        <img src={`/images/${p.image}`} alt={p.title} />
                      </div>
                      <div className="card-content">
                        <h3 className="card-title">{p.title}</h3>
                        <div className="card-meta">
                          <p className="card-desc">
                            {p.category === 'men'
                              ? "Men's"
                              : p.category === 'women'
                              ? "Women's"
                              : p.category}{' '}
                            Footwear
                          </p>
                          <span className="card-price">${p.price.toFixed(2)}</span>
                        </div>
                        <button
                          className="primary-button"
                          onClick={() => handleAddToCart(p)}
                          disabled={addedIds.has(p.id)}
                        >
                          {addedIds.has(p.id) ? (
                            <><i className="fa-solid fa-check"></i> Added!</>
                          ) : (
                            <><i className="fa-solid fa-cart-plus"></i> Add to Cart</>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
