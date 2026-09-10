import { TRUST_POINTS } from "../data";

export default function TrustIndicators() {
  return (
    <section className="trust-section">
      <div className="wrap">
        <div className="trust-grid">
          {TRUST_POINTS.map((t) => (
            <div className="trust-card" key={t.title}>
              <div className="trust-card-icon">
                <t.icon size={18} strokeWidth={1.75} />
              </div>
              <div className="trust-card-title">{t.title}</div>
              <p className="trust-card-body">{t.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
