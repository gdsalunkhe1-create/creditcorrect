export default function Footer({ whatsappHref, supportPhone, supportEmail, businessName, parentLine }) {
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer-grid">
          <div className="footer-brand-col">
            <p className="footer-brand">{businessName}</p>
            <p className="footer-sub">{parentLine}</p>
          </div>

          <div className="footer-col">
            <div className="footer-col-title">Product</div>
            <a href="#issues">What we fix</a>
            <a href="#how-it-works">How it works</a>
            <a href="#pricing">Pricing</a>
          </div>

          <div className="footer-col">
            <div className="footer-col-title">Support</div>
            <a href="#faq">FAQ</a>
            <a href={whatsappHref} target="_blank" rel="noreferrer">WhatsApp</a>
            <a href={`mailto:${supportEmail}`}>{supportEmail}</a>
          </div>

          <div className="footer-col">
            <div className="footer-col-title">Contact</div>
            <span className="footer-static">{supportPhone}</span>
            <span className="footer-static">{supportEmail}</span>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} {businessName}</span>
        </div>
      </div>
    </footer>
  );
}
