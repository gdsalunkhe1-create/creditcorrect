import { ERROR_TYPES } from "../data";

export default function IssueGrid() {
  return (
    <section className="section" id="issues">
      <div className="wrap">
        <div className="section-head">
          <h2>What we find on most reports</h2>
          <p>
            These are the errors we see again and again — each one can sit
            quietly on a report for years, unnoticed until a loan
            application gets rejected.
          </p>
        </div>
        <div className="errors-grid">
          {ERROR_TYPES.map((e) => (
            <div className="error-card" key={e.title}>
              <div className="error-icon">
                <e.icon size={20} strokeWidth={1.75} />
              </div>
              <h3>{e.title}</h3>
              <p>{e.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
