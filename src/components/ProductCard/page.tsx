import { useState } from 'react';
import { useCart } from '../../context/CartContext';
import type { Product } from '../../data/products';

interface ProductCardProps {
  product: Product;
}

function StarRating({ rating }: { rating: number }) {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5;
  return (
    <div>
      {Array.from({ length: full }).map((_, i) => (
        <i key={i} className="fa-solid fa-star"></i>
      ))}
      {half && <i className="fa-solid fa-star-half-stroke"></i>}
    </div>
  );
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  function handleAddToCart() {
    addToCart({
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.image,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  }

  return (
    <div className="card-wrapper">
      <div className="card">
        <div>
          <span className="card-badge">{product.tag}</span>
          <button className="card-action">
            <i className="fa-regular fa-heart"></i>
          </button>
          <div className="card-image-box">
            <img src={`/images/${product.image}`} alt={product.title} />
          </div>
          <div className="card-content">
            <h3 className="card-title">
              <a href="#">{product.title}</a>
            </h3>
            <div className="card-meta">
              <div>
                <p className="card-desc">
                  {product.category === 'men' ? "Men's" : "Women's"} Footwear
                </p>
                <div>
                  <StarRating rating={product.rating} />
                  {product.reviews && <span>({product.reviews})</span>}
                </div>
              </div>
              <span className="card-price">${product.price.toFixed(2)}</span>
            </div>
            <button
              className="primary-button"
              onClick={handleAddToCart}
              disabled={added}
            >
              {added ? (
                <><i className="fa-solid fa-check"></i> Added!</>
              ) : (
                <><i className="fa-solid fa-cart-plus"></i> Add to Cart</>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
