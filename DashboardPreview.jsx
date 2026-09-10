import { CheckCircle2, Circle, ArrowRight } from "lucide-react";
import { RECENT_ACTIVITY } from "../data";

export default function DashboardPreview() {
  return (
    <section className="section">
      <div className="wrap dash-preview-wrap">
        <div className="section-head">
          <h2>See your progress, not just a promise</h2>
          <p>
            Once your case is underway, you get a clear view of where things
            stand — an illustrative example of that view below.
          </p>
        </div>

        <div className="dash-shell">
          <div className="dash-greeting">
            Good afternoon <span className="dash-tag">Example</span>
          </div>

          <div className="dash-stat-row">
            <div className="dash-stat">
              <div className="dash-stat-label">Credit score</div>
              <div className="dash-stat-value">742</div>
            </div>
            <div className="dash-stat">
              <div className="dash-stat-label">Issues found</div>
              <div className="dash-stat-value">3</div>
            </div>
            <div className="dash-stat">
              <div className="dash-stat-label">Active disputes</div>
              <div className="dash-stat-value">2</div>
            </div>
          </div>

          <div className="dash-activity">
            <div className="dash-activity-label">Recent activity</div>
            {RECENT_ACTIVITY.map((item) => (
              <div className="dash-activity-row" key={item.label}>
                {item.done ? (
                  <CheckCircle2 size={16} strokeWidth={2} className="dash-activity-done" />
                ) : (
                  <Circle size={16} strokeWidth={2} className={item.current ? "dash-activity-current" : ""} />
                )}
                <span>{item.label}</span>
              </div>
            ))}
          </div>

          <a className="btn-secondary dash-cta" href="#contact">
            Get started <ArrowRight size={15} strokeWidth={2} />
          </a>
        </div>
      </div>
    </section>
  );
}
