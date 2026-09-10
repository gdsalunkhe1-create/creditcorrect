import { JOURNEY_STAGES } from "../data";

export default function ProcessTimeline() {
  return (
    <section className="section section-tight">
      <div className="wrap">
        <div className="section-head">
          <h2>What happens to your dispute</h2>
          <p>Once filed, here's the path every case follows through to resolution.</p>
        </div>

        <div className="journey-track">
          {JOURNEY_STAGES.map((stage, i) => (
            <div className="journey-stage" key={stage.label}>
              <div className="journey-icon">
                <stage.icon size={16} strokeWidth={1.75} />
              </div>
              <span>{stage.label}</span>
              {i < JOURNEY_STAGES.length - 1 && <span className="journey-sep">→</span>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
