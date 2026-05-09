import { useState } from 'react';
import { Link } from 'react-router-dom';
import Newsletter from '../../components/Newsletter/page';
import Footer from '../../components/Footer/page';

export default function Signup() {
  const [form, setForm] = useState({
    firstname: '',
    lastname: '',
    email: '',
    phone: '',
    password: '',
    confirm_password: '',
    terms: false,
    subscribe: false,
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (form.password !== form.confirm_password) {
      alert('Passwords do not match.');
      return;
    }
    alert('Account created! This is a demo.');
  }

  return (
    <>
      {/* Sign Up Section */}
      <section id="signup-section" className="page-section">
        <div id="auth-wrapper-450">
          <div id="signup-form-container">
            <div>
              <h1>Create Account</h1>
              <p>Join Minora and enjoy exclusive benefits</p>
            </div>

            <form id="auth-form" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="firstname">First Name</label>
                <input
                  type="text"
                  id="firstname"
                  name="firstname"
                  placeholder="Enter your first name"
                  required
                  value={form.firstname}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label htmlFor="lastname">Last Name</label>
                <input
                  type="text"
                  id="lastname"
                  name="lastname"
                  placeholder="Enter your last name"
                  required
                  value={form.lastname}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Enter your email"
                  required
                  value={form.email}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label htmlFor="phone">Phone Number</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  placeholder="Enter your phone number"
                  value={form.phone}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Create a password"
                  required
                  value={form.password}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label htmlFor="confirm_password">Confirm Password</label>
                <input
                  type="password"
                  id="confirm_password"
                  name="confirm_password"
                  placeholder="Confirm your password"
                  required
                  value={form.confirm_password}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label>
                  <input
                    type="checkbox"
                    id="terms"
                    name="terms"
                    required
                    checked={form.terms}
                    onChange={handleChange}
                  />
                  I agree to the Terms &amp; Conditions
                </label>
              </div>

              <div>
                <label>
                  <input
                    type="checkbox"
                    id="subscribe"
                    name="subscribe"
                    checked={form.subscribe}
                    onChange={handleChange}
                  />
                  Subscribe to our newsletter for exclusive deals
                </label>
              </div>

              <button type="submit">Create Account</button>

              <div>
                <p>
                  Already have an account?{' '}
                  <Link to="/login">Sign In</Link>
                </p>
              </div>
            </form>
          </div>

          <div>
            <p>
              Your information is secure and will never be shared with third
              parties.
            </p>
          </div>
        </div>
      </section>

      <Newsletter />
      <Footer />
    </>
  );
}
