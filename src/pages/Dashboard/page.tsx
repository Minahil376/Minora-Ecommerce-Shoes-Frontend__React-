import { useRef } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar, Doughnut, Line } from 'react-chartjs-2';
import { Link } from 'react-router-dom';
import Newsletter from '../../components/Newsletter/page';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

// CSS design-system colours
const PRIMARY   = '#2B3467'; // --brand-primary-color   (dark navy)
const SECONDARY = '#e11d48'; // --brand-secondary-color (rose-600)
const THIRD     = '#f43f5e'; // --brand-third-color     (rose-500)
const FOURTH    = '#fecdd3'; // --brand-fourth-color    (rose-200)

const barData = {
  labels: months,
  datasets: [
    {
      label: 'Stock Added',
      data: [200, 180, 220, 260, 300, 280, 310, 290, 340, 320, 380, 400],
      backgroundColor: PRIMARY,
      borderRadius: 4,
    },
    {
      label: 'Stock Sold',
      data: [150, 160, 190, 230, 270, 250, 280, 260, 300, 290, 350, 370],
      backgroundColor: SECONDARY,
      borderRadius: 4,
    },
  ],
};

const doughnutData = {
  labels: ["Men's Footwear", "Women's Footwear", "Kids' Footwear", 'Accessories'],
  datasets: [
    {
      data: [45, 35, 12, 8],
      backgroundColor: [PRIMARY, SECONDARY, THIRD, FOURTH],
      borderWidth: 2,
      borderColor: '#ffffff',
    },
  ],
};

const lineData = {
  labels: months,
  datasets: [
    {
      label: 'Revenue ($)',
      data: [13500, 12000, 17000, 13000, 19500, 18000, 17500, 20500, 20000, 23500, 22500, 28500],
      borderColor: PRIMARY,
      backgroundColor: 'rgba(43,52,103,0.12)',
      fill: true,
      tension: 0.4,
      pointBackgroundColor: PRIMARY,
      pointBorderColor: '#ffffff',
      pointBorderWidth: 2,
      pointRadius: 4,
    },
  ],
};

const stockRecords = [
  { id: 1, name: 'Premium Running Shoe',     category: "Men's Footwear",   sku: 'MF-001', qty: 120, price: '$129.99', status: 'In Stock' },
  { id: 2, name: 'Classic Comfort Sneaker',  category: "Men's Footwear",   sku: 'MF-002', qty: 85,  price: '$79.99',  status: 'In Stock' },
  { id: 3, name: "Women's Open Toe Heels",   category: "Women's Footwear", sku: 'WF-001', qty: 8,   price: '$124.99', status: 'Low Stock' },
  { id: 4, name: 'Sport Athletic Shoe',      category: "Men's Footwear",   sku: 'MF-003', qty: 0,   price: '$109.99', status: 'Out of Stock' },
  { id: 5, name: "Women's Classic Party Heels", category: "Women's Footwear", sku: 'WF-002', qty: 67, price: '$99.99', status: 'In Stock' },
  { id: 6, name: 'Outdoor Adventure Boot',  category: "Men's Footwear",   sku: 'MF-008', qty: 45,  price: '$149.99', status: 'In Stock' },
];

export default function Dashboard() {
  const stockTableRef = useRef<HTMLElement>(null);
  const insertRef = useRef<HTMLElement>(null);
  const updateRef = useRef<HTMLElement>(null);
  const deleteRef = useRef<HTMLElement>(null);

  function scrollTo(ref: React.RefObject<HTMLElement | null>) {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  }

  return (
    <>
      {/* Page Hero */}
      <section className="page-section-alt text-center">
        <div className="container">
          <h1>Stock Dashboard</h1>
          <p>Manage your inventory — view, insert, update and delete stock records.</p>
        </div>
      </section>

      {/* KPI Stats Row */}
      <section className="page-section">
        <div className="container">
          <div className="features-row">
            <div className="feature-item-box text-center">
              <div className="feature-icon justify-center">
                <i className="fa-solid fa-boxes-stacked"></i>
              </div>
              <h4>1,240</h4>
              <p>Total Items</p>
            </div>
            <div className="feature-item-box text-center">
              <div className="feature-icon justify-center">
                <i className="fa-solid fa-circle-check"></i>
              </div>
              <h4>980</h4>
              <p>In Stock</p>
            </div>
            <div className="feature-item-box text-center">
              <div className="feature-icon justify-center">
                <i className="fa-solid fa-triangle-exclamation"></i>
              </div>
              <h4>48</h4>
              <p>Low Stock</p>
            </div>
            <div className="feature-item-box text-center">
              <div className="feature-icon justify-center">
                <i className="fa-solid fa-ban"></i>
              </div>
              <h4>12</h4>
              <p>Out of Stock</p>
            </div>
            <div className="feature-item-box text-center">
              <div className="feature-icon justify-center">
                <i className="fa-solid fa-dollar-sign"></i>
              </div>
              <h4>$84,320</h4>
              <p>Stock Value</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stock Action Cards */}
      <section className="page-section">
        <div className="container">
          <div className="text-center">
            <h2>Stock Management</h2>
            <p>Perform all stock operations from one place.</p>
          </div>
          <div className="card-container">
            <div className="card-wrapper">
              <div className="card">
                <div className="card-image-box">
                  <i className="fa-solid fa-eye fa-3x"></i>
                </div>
                <div className="card-content">
                  <h3 className="card-title">View All Stock</h3>
                  <p className="card-desc">Browse the complete inventory list with filters and search.</p>
                  <button className="primary-button" onClick={() => scrollTo(stockTableRef)}>
                    <i className="fa-solid fa-eye"></i> View Stock
                  </button>
                </div>
              </div>
            </div>

            <div className="card-wrapper">
              <div className="card">
                <div className="card-image-box">
                  <i className="fa-solid fa-plus fa-3x"></i>
                </div>
                <div className="card-content">
                  <h3 className="card-title">Insert New Stock</h3>
                  <p className="card-desc">Add a new product or restock an existing item to inventory.</p>
                  <button className="primary-button" onClick={() => scrollTo(insertRef)}>
                    <i className="fa-solid fa-plus"></i> Add Stock
                  </button>
                </div>
              </div>
            </div>

            <div className="card-wrapper">
              <div className="card">
                <div className="card-image-box">
                  <i className="fa-solid fa-pen-to-square fa-3x"></i>
                </div>
                <div className="card-content">
                  <h3 className="card-title">Update Stock</h3>
                  <p className="card-desc">Edit product details, pricing, or quantity for existing items.</p>
                  <button className="primary-button" onClick={() => scrollTo(updateRef)}>
                    <i className="fa-solid fa-pen-to-square"></i> Update Stock
                  </button>
                </div>
              </div>
            </div>

            <div className="card-wrapper">
              <div className="card">
                <div className="card-image-box">
                  <i className="fa-solid fa-trash fa-3x"></i>
                </div>
                <div className="card-content">
                  <h3 className="card-title">Delete Stock</h3>
                  <p className="card-desc">Remove discontinued or expired items from the inventory.</p>
                  <button className="primary-button" onClick={() => scrollTo(deleteRef)}>
                    <i className="fa-solid fa-trash"></i> Delete Stock
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="page-section">
        <div className="container">
          <div className="text-center">
            <h2>Quick Links</h2>
            <p>Jump to any section of the dashboard instantly.</p>
          </div>
          <div className="feature-box">
            <div className="feature-item">
              <div className="feature-icon">
                <i className="fa-solid fa-chart-line"></i>
              </div>
              <div className="feature-text">
                <h4><a href="#charts-section">Sales Analytics</a></h4>
                <p>View graphical reports</p>
              </div>
            </div>
            <div className="feature-item">
              <div className="feature-icon">
                <i className="fa-solid fa-table-list"></i>
              </div>
              <div className="feature-text">
                <h4><a href="#stock-table-section">Stock Table</a></h4>
                <p>Full inventory records</p>
              </div>
            </div>
            <div className="feature-item">
              <div className="feature-icon">
                <i className="fa-solid fa-file-export"></i>
              </div>
              <div className="feature-text">
                <h4><a href="#">Export Report</a></h4>
                <p>Download CSV / PDF</p>
              </div>
            </div>
            <div className="feature-item">
              <div className="feature-icon">
                <i className="fa-solid fa-bell"></i>
              </div>
              <div className="feature-text">
                <h4><a href="#">Alerts</a></h4>
                <p>Low stock notifications</p>
              </div>
            </div>
            <div className="feature-item">
              <div className="feature-icon">
                <i className="fa-solid fa-gear"></i>
              </div>
              <div className="feature-text">
                <h4><a href="#">Settings</a></h4>
                <p>Configure dashboard</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Charts Section */}
      <section className="page-section" id="charts-section">
        <div className="container">
          <div className="text-center">
            <h2>Stock Analytics</h2>
            <p>Graphical overview of your inventory and sales performance.</p>
          </div>
          <div className="hero-layout">
            <div className="hero-content">
              <h3>Monthly Stock Movement</h3>
              <p>Units added vs units sold per month.</p>
              <Bar data={barData} />
            </div>
            <div className="hero-image">
              <div>
                <h3>Stock by Category</h3>
                <p>Distribution across product categories.</p>
                <Doughnut data={doughnutData} />
              </div>
            </div>
          </div>

          <div className="newsletter-card">
            <div className="newsletter-text">
              <h3>Revenue Trend</h3>
              <p>Monthly revenue generated from stock sales over the year.</p>
            </div>
            <div className="newsletter-form-wrapper">
              <span className="hero-badge">2026 Data</span>
            </div>
          </div>
          <Line data={lineData} />
        </div>
      </section>

      {/* Stock Table Section */}
      <section className="page-section" id="stock-table-section" ref={stockTableRef}>
        <div className="container">
          <div className="text-center">
            <h2>All Stock Records</h2>
            <p>Complete inventory database with all product details.</p>
          </div>
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Product Name</th>
                  <th>Category</th>
                  <th>SKU</th>
                  <th>Qty</th>
                  <th>Price</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {stockRecords.map((row) => (
                  <tr key={row.id}>
                    <td>{row.id}</td>
                    <td>{row.name}</td>
                    <td>{row.category}</td>
                    <td>{row.sku}</td>
                    <td>{row.qty}</td>
                    <td>{row.price}</td>
                    <td className={row.status === 'In Stock' ? 'highlight-text font-extrabold' : ''}>
                      {row.status}
                    </td>
                    <td>
                      <button className="sm-button link-button">
                        <i className="fa-solid fa-pen"></i>
                      </button>
                      <button className="sm-button border-button">
                        <i className="fa-solid fa-trash"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Insert New Stock Section */}
      <section className="page-section" id="insert-section" ref={insertRef}>
        <div className="container">
          <div className="text-center">
            <h2>Insert New Stock</h2>
            <p>Add a new product to the inventory database.</p>
          </div>
          <div className="form-container">
            <form onSubmit={(e) => { e.preventDefault(); alert('Stock inserted! (demo)'); }}>
              <div>
                <label>Product Name</label>
                <input type="text" placeholder="e.g. Premium Running Shoe" />
              </div>
              <div>
                <label>Category</label>
                <div className="select-container">
                  <select>
                    <option>Men's Footwear</option>
                    <option>Women's Footwear</option>
                    <option>Kids' Footwear</option>
                    <option>Accessories</option>
                  </select>
                </div>
              </div>
              <div>
                <label>SKU</label>
                <input type="text" placeholder="e.g. MF-001" />
              </div>
              <div>
                <label>Quantity</label>
                <input type="number" placeholder="e.g. 100" />
              </div>
              <div>
                <label>Price ($)</label>
                <input type="number" placeholder="e.g. 129.99" />
              </div>
              <div>
                <label>Description</label>
                <textarea placeholder="Brief product description..."></textarea>
              </div>
              <button type="submit" className="primary-button">
                <i className="fa-solid fa-plus"></i> Insert Stock
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Update Stock Section */}
      <section className="page-section" id="update-section" ref={updateRef}>
        <div className="container">
          <div className="text-center">
            <h2>Update Stock</h2>
            <p>Search for a product by SKU or name and update its details.</p>
          </div>
          <div className="form-container">
            <form onSubmit={(e) => { e.preventDefault(); alert('Stock updated! (demo)'); }}>
              <div>
                <label>Search by SKU or Product Name</label>
                <input type="text" placeholder="e.g. MF-001 or Premium Running Shoe" />
              </div>
              <div>
                <label>New Quantity</label>
                <input type="number" placeholder="Enter updated quantity" />
              </div>
              <div>
                <label>New Price ($)</label>
                <input type="number" placeholder="Enter updated price" />
              </div>
              <div>
                <label>Stock Status</label>
                <div className="select-container">
                  <select>
                    <option>In Stock</option>
                    <option>Low Stock</option>
                    <option>Out of Stock</option>
                  </select>
                </div>
              </div>
              <button type="submit" className="primary-button">
                <i className="fa-solid fa-pen-to-square"></i> Update Stock
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Delete Stock Section */}
      <section className="page-section" id="delete-section" ref={deleteRef}>
        <div className="container">
          <div className="text-center">
            <h2>Delete Stock</h2>
            <p>Remove a product from the inventory. This action cannot be undone.</p>
          </div>
          <div className="form-container">
            <form onSubmit={(e) => { e.preventDefault(); alert('Stock deleted! (demo)'); }}>
              <div>
                <label>Search by SKU or Product Name</label>
                <input type="text" placeholder="e.g. MF-001 or Premium Running Shoe" />
              </div>
              <div>
                <label>Confirm Product Name</label>
                <input type="text" placeholder="Re-enter product name to confirm" />
              </div>
              <button type="submit" className="primary-button">
                <i className="fa-solid fa-trash"></i> Delete Stock
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Promo Banner */}
      <section className="promo-banner">
        <div className="container">
          <h2>Keep Your Inventory Updated</h2>
          <p>Regular stock audits help prevent overselling and improve customer satisfaction.</p>
          <a href="#stock-table-section" className="link-button lg-button">
            Go to Stock Table
          </a>
        </div>
      </section>

      {/* Dashboard Footer Quick Links override */}
      <Newsletter />
      <footer>
        <div className="container">
          <div className="footer-grid">
            <div className="footer-col">
              <Link to="/" className="block">
                <img src="/images/Minoralogo3 .png" alt="Minora" />
              </Link>
              <p>Elevating everyday lifestyle with premium footwear, apparel, and accessories. Experience absolute comfort, anywhere.</p>
              <div className="footer-socials">
                <a href="#" className="footer-social-btn"><i className="fa-brands fa-facebook-f"></i></a>
                <a href="#" className="footer-social-btn"><i className="fa-brands fa-twitter"></i></a>
                <a href="#" className="footer-social-btn"><i className="fa-brands fa-instagram"></i></a>
              </div>
            </div>
            <div className="footer-col">
              <h3>Quick Links</h3>
              <ul>
                <li><Link to="/"><i className="fa-solid fa-angle-right"></i>Home</Link></li>
                <li><Link to="/shop"><i className="fa-solid fa-angle-right"></i>Shop All</Link></li>
                <li><Link to="/about"><i className="fa-solid fa-angle-right"></i>About Us</Link></li>
                <li><Link to="/login"><i className="fa-solid fa-angle-right"></i>Login</Link></li>
              </ul>
            </div>
            <div className="footer-col">
              <h3>Dashboard</h3>
              <ul>
                <li><a href="#stock-table-section"><i className="fa-solid fa-angle-right"></i>View Stock</a></li>
                <li><a href="#insert-section"><i className="fa-solid fa-angle-right"></i>Insert Stock</a></li>
                <li><a href="#update-section"><i className="fa-solid fa-angle-right"></i>Update Stock</a></li>
                <li><a href="#delete-section"><i className="fa-solid fa-angle-right"></i>Delete Stock</a></li>
              </ul>
            </div>
            <div className="footer-col">
              <h3>Get in Touch</h3>
              <ul>
                <li><i className="fa-solid fa-location-dot"></i> 123 Fashion Blvd, Suite 400<br />New York, NY 10012, USA</li>
                <li><i className="fa-solid fa-phone"></i> +1 (800) 123-4567</li>
                <li><i className="fa-solid fa-envelope"></i> support@minora.com</li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2026 Minora Store. All rights reserved.</p>
            <div className="footer-payments">
              <i className="fa-brands fa-cc-visa"></i>
              <i className="fa-brands fa-cc-mastercard"></i>
              <i className="fa-brands fa-cc-paypal"></i>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
