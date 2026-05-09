import { useState } from 'react';
import Newsletter from '../../components/Newsletter/page';
import Footer from '../../components/Footer/page';

export default function Contact() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    reason: 'support',
    message: '',
  });

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) {
    const { id, value } = e.target;
    setForm((prev) => ({ ...prev, [id]: value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    alert('Message sent! This is a demo.');
    setForm({ name: '', email: '', reason: 'support', message: '' });
  }

  return (
    <>
      {/* Page Hero */}
      <section className="page-section-alt text-center">
        <div className="container">
          <h1>Get in Touch</h1>
          <p>We'd love to hear from you. Please fill out the form below.</p>
        </div>
      </section>

      {/* Contact Form */}
      <section className="page-section">
        <div className="container">
          <div className="form-container">
            <form onSubmit={handleSubmit}>
              <div>
                <label htmlFor="name">Full Name</label>
                <input
                  type="text"
                  id="name"
                  placeholder="John Doe"
                  value={form.name}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  id="email"
                  placeholder="john@example.com"
                  value={form.email}
                  onChange={handleChange}
                />
              </div>

              <div className="select-container">
                <label htmlFor="reason">Reason for Contact</label>
                <select id="reason" value={form.reason} onChange={handleChange}>
                  <option value="support">Customer Support</option>
                  <option value="returns">Returns &amp; Exchanges</option>
                  <option value="business">Business Inquiry</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  placeholder="How can we help you today?"
                  value={form.message}
                  onChange={handleChange}
                ></textarea>
              </div>

              <button
                type="submit"
                id="contact-submit-btn"
                className="link-button lg-button"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>

      <Newsletter />
      <Footer />
    </>
  );
}
