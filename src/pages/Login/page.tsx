import { useState } from 'react';
import { Link } from 'react-router-dom';
import Newsletter from '../../components/Newsletter/page';
import Footer from '../../components/Footer/page';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    alert('Login functionality is a demo.');
  }

  return (
    <>
      {/* Login Section */}
      <section id="signup-section" className="page-section">
        <div id="auth-wrapper-400">
          <div id="signup-form-container">
            <div>
              <h1>Welcome Back</h1>
              <p>Sign in to your Minora account</p>
            </div>

            <form id="auth-form" onSubmit={handleSubmit}>
              <div>
                <label>Email Address</label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div>
                <label>Password</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div>
                <label>
                  <input
                    type="checkbox"
                    checked={remember}
                    onChange={(e) => setRemember(e.target.checked)}
                  />
                  Remember me
                </label>
                <a href="#">Forgot password?</a>
              </div>

              <button type="submit">Sign In</button>
            </form>

            <div className="flex items-center" id="auth-divider">
              <hr className="flex" id="auth-divider-line" />
              <span id="auth-divider-text">Or</span>
              <hr className="flex" id="auth-divider-line" />
            </div>

            <div className="flex" id="auth-social-btns">
              <button type="button" className="explore-btn" id="auth-google-btn">
                <i className="fa-brands fa-google"></i>
              </button>
              <button type="button" className="explore-btn" id="auth-facebook-btn">
                <i className="fa-brands fa-facebook-f"></i>
              </button>
            </div>

            <div>
              <p>
                Don't have an account?{' '}
                <Link to="/signup">Create one</Link>
              </p>
            </div>
          </div>

          {/* Features Below Login */}
          <div className="features-row">
            <div className="feature-item-box">
              <i className="fa-solid fa-truck-fast"></i>
              <h4>Fast Shipping</h4>
              <p>Delivered quickly</p>
            </div>
            <div className="feature-item-box">
              <i className="fa-solid fa-shield"></i>
              <h4>Secure Payment</h4>
              <p>100% Protected</p>
            </div>
            <div className="feature-item-box">
              <i className="fa-solid fa-headset"></i>
              <h4>24/7 Support</h4>
              <p>Always here to help</p>
            </div>
          </div>
        </div>
      </section>

      <Newsletter />
      <Footer />
    </>
  );
}
