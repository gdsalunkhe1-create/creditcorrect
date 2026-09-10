import { AlertTriangle, ArrowRight, Gauge, Layers, Flag, Activity } from "lucide-react";
import { SAMPLE_ISSUES } from "../data";

export default function ReportPreview() {
  return (
    <section className="section" id="preview">
      <div className="wrap">
        <div className="section-head">
          <h2>What your review actually looks like</h2>
          <p>An illustrative example of the summary you'd get back — not a generic sales graphic.</p>
        </div>

        <div className="rp-shell">
          <div className="rp-header">
            <span>Credit Report Review</span>
            <span className="rp-header-tag">Example</span>
          </div>

          <div className="rp-stats">
            <div className="rp-stat">
              <Gauge size={16} strokeWidth={1.75} />
              <div>
                <div className="rp-stat-label">Credit score</div>
                <div className="rp-stat-value">742</div>
              </div>
            </div>
            <div className="rp-stat">
              <Layers size={16} strokeWidth={1.75} />
              <div>
                <div className="rp-stat-label">Accounts</div>
                <div className="rp-stat-value">08</div>
              </div>
            </div>
            <div className="rp-stat">
              <Flag size={16} strokeWidth={1.75} />
              <div>
                <div className="rp-stat-label">Issues found</div>
                <div className="rp-stat-value">03</div>
              </div>
            </div>
            <div className="rp-stat">
              <Activity size={16} strokeWidth={1.75} />
              <div>
                <div className="rp-stat-label">Active disputes</div>
                <div className="rp-stat-value">02</div>
              </div>
            </div>
          </div>

          <div className="rp-issues">
            <div className="rp-issues-label">Potential issues</div>
            {SAMPLE_ISSUES.map((issue) => (
              <div className="rp-issue-row" key={issue.label}>
                <AlertTriangle
                  size={15}
                  strokeWidth={2}
                  className={issue.severity === "high" ? "rp-issue-icon-high" : "rp-issue-icon-med"}
                />
                <span>{issue.label}</span>
              </div>
            ))}
          </div>

          <a className="btn-primary rp-cta" href="#contact">
            Review my issues <ArrowRight size={16} strokeWidth={2} />
          </a>
        </div>
      </div>
    </section>
  );
}
