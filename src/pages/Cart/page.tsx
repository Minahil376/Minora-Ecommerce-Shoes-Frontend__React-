import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import Newsletter from '../../components/Newsletter/page';
import Footer from '../../components/Footer/page';

const COUPONS: Record<string, number> = {
  SAVE10: 0.1,
  MINORA20: 0.2,
  WELCOME15: 0.15,
};

export default function Cart() {
  const { cart, removeFromCart, updateQuantity, appliedDiscount, setAppliedDiscount } =
    useCart();
  const [couponInput, setCouponInput] = useState('');
  const [couponMsg, setCouponMsg] = useState('');
  const [couponMsgColor, setCouponMsgColor] = useState('');
  const [couponApplied, setCouponApplied] = useState(false);

  // Totals calculation
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discount = subtotal * appliedDiscount;
  const discountedSubtotal = subtotal - discount;
  const tax = discountedSubtotal * 0.1;
  const shipping = discountedSubtotal > 50 ? 0 : 10;
  const total = discountedSubtotal + tax + shipping;

  function handleApplyCoupon() {
    const code = couponInput.trim().toUpperCase();
    if (!code) {
      setCouponMsg('Please enter a coupon code.');
      setCouponMsgColor('#e74c3c');
      return;
    }
    if (COUPONS[code] !== undefined) {
      setAppliedDiscount(COUPONS[code]);
      setCouponMsg(`Coupon applied! ${COUPONS[code] * 100}% discount.`);
      setCouponMsgColor('var(--brand-third-color)');
      setCouponApplied(true);
    } else {
      setAppliedDiscount(0);
      setCouponMsg('Invalid coupon code. Try SAVE10, MINORA20 or WELCOME15.');
      setCouponMsgColor('#e74c3c');
    }
  }

  function handleCheckout() {
    if (cart.length === 0) {
      alert('Your cart is empty');
      return;
    }
    alert('Thank you for your order! This is a demo — payment processing would happen here.');
  }

  return (
    <>
      {/* Page Hero */}
      <section className="page-section-alt text-center">
        <div className="container">
          <h1>Shopping Cart</h1>
          <p>Review your items and proceed to checkout.</p>
        </div>
      </section>

      {/* Cart Section */}
      <section className="page-section">
        <div className="container">
          <div id="cart-page-table-wrapper">
            {cart.length === 0 ? (
              <div id="empty-cart-message">
                <i className="fa-solid fa-shopping-bag"></i>
                <h3>Your cart is empty</h3>
                <p>Start shopping to add items to your cart</p>
                <Link to="/shop" className="link-button lg-button">
                  Continue Shopping
                </Link>
              </div>
            ) : (
              <table id="cart-table">
                <thead>
                  <tr id="cart-table-header">
                    <th>Remove</th>
                    <th>Image</th>
                    <th>Product</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Subtotal</th>
                  </tr>
                </thead>
                <tbody id="cart-items-container">
                  {cart.map((item) => (
                    <tr
                      key={item.id}
                      style={{ borderBottom: '1px solid var(--border-secondary-color)' }}
                    >
                      {/* Remove */}
                      <td style={{ padding: '20px', textAlign: 'center', verticalAlign: 'middle' }}>
                        <button
                          className="remove-btn"
                          style={{
                            background: 'transparent',
                            border: 'none',
                            cursor: 'pointer',
                            color: 'var(--text-muted-color)',
                            fontSize: '1.4rem',
                            lineHeight: 1,
                            transition: 'color 0.2s',
                          }}
                          title="Remove item"
                          onClick={() => removeFromCart(item.id)}
                          onMouseOver={(e) =>
                            ((e.currentTarget as HTMLButtonElement).style.color =
                              'var(--brand-secondary-color)')
                          }
                          onMouseOut={(e) =>
                            ((e.currentTarget as HTMLButtonElement).style.color =
                              'var(--text-muted-color)')
                          }
                        >
                          <i className="fa-regular fa-circle-xmark"></i>
                        </button>
                      </td>

                      {/* Image */}
                      <td style={{ padding: '20px', verticalAlign: 'middle' }}>
                        <img
                          src={`/images/${item.image}`}
                          alt={item.title}
                          style={{
                            width: '80px',
                            height: '80px',
                            objectFit: 'contain',
                            background: 'transparent',
                            borderRadius: 'var(--radius-md)',
                            padding: '6px',
                            display: 'block',
                          }}
                        />
                      </td>

                      {/* Product */}
                      <td style={{ padding: '20px', verticalAlign: 'middle' }}>
                        <span
                          style={{
                            fontWeight: 600,
                            color: 'var(--brand-primary-color)',
                            display: 'block',
                            marginBottom: '4px',
                          }}
                        >
                          {item.title}
                        </span>
                        <span style={{ fontSize: '0.8rem', color: 'var(--text-muted-color)' }}>
                          ID: #{item.id}
                        </span>
                      </td>

                      {/* Price */}
                      <td
                        style={{
                          padding: '20px',
                          textAlign: 'center',
                          verticalAlign: 'middle',
                          fontWeight: 600,
                          color: 'var(--text-primary-color)',
                        }}
                      >
                        ${item.price.toFixed(2)}
                      </td>

                      {/* Quantity */}
                      <td style={{ padding: '20px', textAlign: 'center', verticalAlign: 'middle' }}>
                        <div
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            background: '#eef0f3',
                            borderRadius: '12px',
                            padding: '4px',
                            gap: '4px',
                          }}
                        >
                          <button
                            style={{
                              width: '36px',
                              height: '36px',
                              background: '#e2e5ea',
                              border: 'none',
                              cursor: 'pointer',
                              color: '#333',
                              fontSize: '1.1rem',
                              fontWeight: 700,
                              borderRadius: '8px',
                              transition: 'background 0.2s',
                            }}
                            onClick={() =>
                              item.quantity > 1
                                ? updateQuantity(item.id, item.quantity - 1)
                                : removeFromCart(item.id)
                            }
                          >
                            &#8722;
                          </button>
                          <input
                            type="number"
                            value={item.quantity}
                            min={1}
                            style={{
                              width: '48px',
                              height: '36px',
                              textAlign: 'center',
                              border: 'none',
                              background: '#fff',
                              fontWeight: 600,
                              color: '#333',
                              fontSize: '0.95rem',
                              borderRadius: '8px',
                              boxShadow: '0 1px 4px rgba(0,0,0,0.08)',
                            }}
                            onChange={(e) => {
                              const qty = parseInt(e.target.value);
                              if (qty > 0) updateQuantity(item.id, qty);
                            }}
                          />
                          <button
                            style={{
                              width: '36px',
                              height: '36px',
                              background: '#e2e5ea',
                              border: 'none',
                              cursor: 'pointer',
                              color: '#333',
                              fontSize: '1.1rem',
                              fontWeight: 700,
                              borderRadius: '8px',
                              transition: 'background 0.2s',
                            }}
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          >
                            +
                          </button>
                        </div>
                      </td>

                      {/* Subtotal */}
                      <td
                        style={{
                          padding: '20px',
                          textAlign: 'center',
                          verticalAlign: 'middle',
                          fontWeight: 700,
                          color: 'var(--brand-secondary-color)',
                        }}
                      >
                        ${(item.price * item.quantity).toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          {/* Bottom Row */}
          <div id="cart-bottom-row">
            {/* Left: Continue Shopping + Coupon */}
            <div id="cart-left-col">
              <Link to="/shop" id="continue-shopping-btn">
                <i className="fa-solid fa-arrow-left"></i> Continue Shopping
              </Link>

              <div id="coupon-wrapper">
                <h3>Apply Coupon</h3>
                <div id="coupon-input-group">
                  <input
                    id="coupon-input"
                    type="text"
                    placeholder="Enter Your Coupon"
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value)}
                    disabled={couponApplied}
                  />
                  <button
                    id="coupon-btn"
                    onClick={handleApplyCoupon}
                    disabled={couponApplied}
                    style={couponApplied ? { opacity: 0.6 } : {}}
                  >
                    {couponApplied ? 'Applied' : 'Apply'}
                  </button>
                </div>
                {couponMsg && (
                  <p id="coupon-msg" style={{ color: couponMsgColor, display: 'block' }}>
                    {couponMsg}
                  </p>
                )}
              </div>
            </div>

            {/* Order Summary */}
            <div className="order-summary-wrapper">
              <div className="order-summary-card">
                <h3 className="order-summary-title">Order Summary</h3>

                <div className="summary-row">
                  <span>Subtotal</span>
                  <span id="subtotal">${subtotal.toFixed(2)}</span>
                </div>

                <div className="summary-row">
                  <span>
                    Shipping <span>(Standard)</span>
                  </span>
                  <span
                    id="shipping"
                    style={shipping === 0 ? { color: 'var(--brand-third-color)' } : {}}
                  >
                    {shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}
                  </span>
                </div>

                <div className="summary-row">
                  <span>Tax (10%)</span>
                  <span id="tax">${tax.toFixed(2)}</span>
                </div>

                {discount > 0 && (
                  <div id="discount-row" className="summary-row">
                    <span>Discount</span>
                    <span id="discount-amount">-${discount.toFixed(2)}</span>
                  </div>
                )}

                <div className="summary-total-row">
                  <span>Total</span>
                  <span id="total">${total.toFixed(2)}</span>
                </div>

                <button
                  className="primary-button"
                  id="checkout-btn"
                  onClick={handleCheckout}
                >
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Newsletter />
      <Footer />
    </>
  );
}
