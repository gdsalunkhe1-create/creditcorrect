import { PROCESS_STEPS } from "../data";

export default function HowItWorks() {
  return (
    <section className="section" id="how-it-works">
      <div className="wrap">
        <div className="section-head">
          <h2>How it works</h2>
          <p>Five steps, start to finish. The last one is entirely up to you.</p>
        </div>

        <div className="hiw-track">
          {PROCESS_STEPS.map((step, i) => (
            <div className={`hiw-node${step.optional ? " is-optional" : ""}`} key={step.title}>
              <div className="hiw-node-top">
                <div className="hiw-icon">
                  <step.icon size={20} strokeWidth={1.75} />
                </div>
                {i < PROCESS_STEPS.length - 1 && <div className="hiw-connector" aria-hidden="true" />}
              </div>
              <div className="hiw-num">{String(i + 1).padStart(2, "0")}</div>
              <h3>
                {step.title}
                {step.optional && <span className="process-tag">Optional</span>}
              </h3>
              <p>{step.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
