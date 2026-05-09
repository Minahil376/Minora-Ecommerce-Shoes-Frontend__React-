import { useState } from 'react';

export default function Newsletter() {
  const [email, setEmail] = useState('');

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (email) {
      alert('Thank you for subscribing!');
      setEmail('');
    }
  }

  return (
    <section className="newsletter-section">
      <div className="container">
        <div className="newsletter-card">
          <div className="newsletter-text">
            <h2>Subscribe to our Newsletter</h2>
            <p>Get updates on new drops, exclusive offers, and VIP sales.</p>
          </div>
          <div className="newsletter-form-wrapper">
            <form className="newsletter-form" onSubmit={handleSubmit}>
              <i className="fa-regular fa-envelope"></i>
              <input
                type="email"
                placeholder="Enter your email address"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button type="submit">Subscribe</button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
