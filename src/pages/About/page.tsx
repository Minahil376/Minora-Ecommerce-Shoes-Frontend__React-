import Newsletter from '../../components/Newsletter/page';
import Footer from '../../components/Footer/page';

export default function About() {
  return (
    <>
      {/* Page Hero */}
      <section className="page-section-alt text-center">
        <div className="container">
          <h1>About Our Journey</h1>
          <p>We are a professional team crafting the ultimate shopping experience.</p>
        </div>
      </section>

      {/* Who We Are */}
      <section className="page-section-alt">
        <div className="container">
          <div className="hero-layout">
            <div className="hero-content">
              <h2>Who We Are?</h2>
              <p>
                At Minora, footwear isn't just about what you wear — it's about
                how you move. We craft shoes that blend timeless design with
                modern comfort, creating styles that help you express confidence
                and individuality in every step. Each pair in our collection is
                built with care, using premium materials and expert craftsmanship
                to ensure both durability and style. From everyday essentials to
                standout statement pieces, we believe every shoe should tell your
                story. Our goal is to inspire confidence through designs that fit
                seamlessly into your lifestyle — comfortable, versatile, and
                effortlessly stylish. Because at Minora, footwear is more than a
                product; it's your identity, your energy, and your way to move
                through the world.
              </p>
            </div>
            <div className="hero-image">
              <img src="/images/about/about1.png" alt="Who We Are" />
            </div>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="page-section-alt">
        <div className="container">
          <div className="hero-layout">
            <div className="hero-content">
              <h2>Our Story</h2>
              <p>
                Minora was born from a simple idea: to design shoes that feel as
                exceptional as they look. What began as a small passion project
                soon grew into a brand that celebrates individuality and
                effortless style. Each silhouette, material, and sole reflects
                our belief that true footwear should express confidence without
                saying a word. Over time, Minora has evolved into a community
                loved by those who value comfort, authenticity, and timeless
                design. Every collection is thoughtfully created to blend quality
                with simplicity, giving you pairs that move with your lifestyle
                and help you express your story through every stride.
              </p>
            </div>
            <div className="hero-image">
              <img src="/images/about/about2.jpg" alt="Our Story" />
            </div>
          </div>
        </div>
      </section>

      {/* Our Mission */}
      <section className="page-section-alt">
        <div className="container">
          <div className="hero-layout">
            <div className="hero-content">
              <h2>Our Mission</h2>
              <p>
                At Minora, our mission is to redefine everyday footwear by
                crafting shoes that inspire self-expression and confidence. We
                want every individual to feel comfortable, bold, and unique —
                because style is not just about what you wear, it's about how you
                feel with every step. From clean minimalist sneakers to versatile
                performance boots, Minora designs for every mood and moment. Our
                goal is to create footwear that empowers — shoes that make you
                look good, feel good, and walk confidently every day.
              </p>
            </div>
            <div className="hero-image">
              <img src="/images/about/about3.jpg" alt="Our Mission" />
            </div>
          </div>
        </div>
      </section>

      {/* Global Stores Table */}
      <section className="page-section">
        <div className="container text-center">
          <h2>Our Global Stores</h2>
          <p>Find us anywhere.</p>
          <div className="flex justify-center">
            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>Location</th>
                    <th>Address</th>
                    <th>Contact Phone</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>New York Flagship</td>
                    <td>123 Fashion Ave, NY 10001</td>
                    <td>(555) 123-4567</td>
                    <td className="highlight-text font-extrabold">Open</td>
                  </tr>
                  <tr>
                    <td>London Boutique</td>
                    <td>45 Oxford St, London W1D 1DZ</td>
                    <td>+44 20 7123 4567</td>
                    <td className="highlight-text font-extrabold">Open</td>
                  </tr>
                  <tr>
                    <td>Tokyo Hub</td>
                    <td>Shinjuku City, Tokyo</td>
                    <td>+81 3 1234 5678</td>
                    <td>Coming Soon</td>
                  </tr>
                  <tr>
                    <td>Paris Showroom</td>
                    <td>Champs-Élysées, Paris</td>
                    <td>+33 1 23 45 67 89</td>
                    <td className="highlight-text font-extrabold">Open</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      <Newsletter />
      <Footer />
    </>
  );
}
