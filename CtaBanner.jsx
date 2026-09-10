export default function CtaBanner({ startingFeeText }) {
  return (
    <section className="section" id="pricing">
      <div className="wrap">
        <div className="pricing-card">
          <div>
            <h2>One consulting fee. No surprises.</h2>
            <p>
              We review your full report and file disputes for every
              genuine error we find — not a per-dispute charge that adds
              up as we go.
            </p>
            <ul className="pricing-includes">
              <li>Full Credit Health Report review</li>
              <li>Dispute filing for every confirmed error</li>
              <li>Follow-up with the bureau until resolved</li>
              <li>Plain-language explanation of what was wrong</li>
            </ul>
          </div>
          <div className="pricing-amount-block">
            <p className="pricing-amount-label">Consulting fee</p>
            <p className="pricing-amount">{startingFeeText}</p>
            <a className="btn-primary" href="#contact">
              Request a free review
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
