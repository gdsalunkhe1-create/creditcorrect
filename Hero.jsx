export default function Hero({ whatsappHref }) {
  return (
    <header className="hero">
      <div className="wrap hero-grid">
        <div>
          <p className="hero-eyebrow-line">Credit report correction, done for you</p>
          <h1>Wrong entries on your CIBIL report shouldn't cost you a loan.</h1>
          <p className="hero-sub">
            We review your credit report, find the errors that aren't
            actually yours — settled loans marked overdue, accounts you
            never opened — and file the disputes to get them fixed.
          </p>
          <div className="hero-actions">
            <a className="btn-primary" href="#contact">
              Request a free review
            </a>
            <a className="btn-secondary" href={whatsappHref} target="_blank" rel="noreferrer">
              Chat on WhatsApp
            </a>
          </div>
        </div>
        <ReportCardVisual />
      </div>
    </header>
  );
}

function ReportCardVisual() {
  return (
    <div className="report-card" aria-hidden="true">
      <div className="report-card-head">
        <span className="report-card-head-title">CREDIT REPORT — SAMPLE ACCOUNT</span>
        <span className="report-card-head-score">Score 758</span>
      </div>
      <div className="report-row">
        <div className="report-row-top">
          <span className="report-row-account">HDFC Bank — Personal Loan</span>
        </div>
        <div>
          <span className="status-before">Overdue ₹12,400</span>
          <span className="status-arrow">→</span>
          <span className="status-after">Closed, Settled</span>
        </div>
        <div className="report-row-note">Loan was fully settled in March 2025</div>
      </div>
      <div className="report-row">
        <div className="report-row-top">
          <span className="report-row-account">Unknown Finance Co. — Consumer Loan</span>
        </div>
        <div>
          <span className="status-before">Active, ₹8,900 due</span>
          <span className="status-arrow">→</span>
          <span className="status-after">Removed from report</span>
        </div>
        <div className="report-row-note">Account did not belong to the customer</div>
      </div>
    </div>
  );
}
