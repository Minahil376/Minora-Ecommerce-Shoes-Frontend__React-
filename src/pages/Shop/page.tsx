import { PRODUCTS } from '../../data/products';
import ProductCard from '../../components/ProductCard/page';
import Newsletter from '../../components/Newsletter/page';
import Footer from '../../components/Footer/page';

export default function Shop() {
  return (
    <>
      {/* Page Hero */}
      <section className="page-section-alt text-center">
        <div className="container">
          <h1>Shop Our Collection</h1>
          <p>Discover all our premium footwear and accessories in one place.</p>
        </div>
      </section>

      {/* All 36 Products */}
      <section className="page-section">
        <div className="container">
          <div className="text-center">
            <h2>All Products</h2>
            <div></div>
            <p>Browse our complete collection.</p>
          </div>

          <div className="card-container">
            {PRODUCTS.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      <Newsletter />
      <Footer />
    </>
  );
}
