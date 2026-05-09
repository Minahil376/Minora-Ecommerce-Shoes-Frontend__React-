import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer>
      <div className="container">
        <div className="footer-grid">
          <div className="footer-col">
            <Link to="/" className="block">
              <img src="/images/Minoralogo3 .png" alt="Minora" />
            </Link>
            <p>
              Elevating everyday lifestyle with premium footwear, apparel, and
              accessories. Experience absolute comfort, anywhere.
            </p>
            <div className="footer-socials">
              <a href="#" className="footer-social-btn">
                <i className="fa-brands fa-facebook-f"></i>
              </a>
              <a href="#" className="footer-social-btn">
                <i className="fa-brands fa-twitter"></i>
              </a>
              <a href="#" className="footer-social-btn">
                <i className="fa-brands fa-instagram"></i>
              </a>
            </div>
          </div>

          <div className="footer-col">
            <h3>Quick Links</h3>
            <ul>
              <li>
                <Link to="/">
                  <i className="fa-solid fa-angle-right"></i>Home
                </Link>
              </li>
              <li>
                <Link to="/shop">
                  <i className="fa-solid fa-angle-right"></i>Shop All
                </Link>
              </li>
              <li>
                <Link to="/about">
                  <i className="fa-solid fa-angle-right"></i>About Us
                </Link>
              </li>
              <li>
                <Link to="/login">
                  <i className="fa-solid fa-angle-right"></i>Login
                </Link>
              </li>
            </ul>
          </div>

          <div className="footer-col">
            <h3>Customer Care</h3>
            <ul>
              <li>
                <a href="#">
                  <i className="fa-solid fa-angle-right"></i>My Account
                </a>
              </li>
              <li>
                <a href="#">
                  <i className="fa-solid fa-angle-right"></i>Order Tracking
                </a>
              </li>
              <li>
                <a href="#">
                  <i className="fa-solid fa-angle-right"></i>Return Policy
                </a>
              </li>
              <li>
                <a href="#">
                  <i className="fa-solid fa-angle-right"></i>FAQ
                </a>
              </li>
            </ul>
          </div>

          <div className="footer-col">
            <h3>Get in Touch</h3>
            <ul>
              <li>
                <i className="fa-solid fa-location-dot"></i>
                123 Fashion Blvd, Suite 400
                <br />
                New York, NY 10012, USA
              </li>
              <li>
                <i className="fa-solid fa-phone"></i>
                +1 (800) 123-4567
              </li>
              <li>
                <i className="fa-solid fa-envelope"></i>
                support@minora.com
              </li>
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
  );
}
