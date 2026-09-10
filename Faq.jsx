import { useState } from "react";
import { FAQS } from "../data";

export default function Faq() {
  const [open, setOpen] = useState(null);
  return (
    <section className="section" id="faq">
      <div className="wrap">
        <div className="section-head">
          <h2>Common questions</h2>
        </div>
        <div>
          {FAQS.map((item, i) => (
            <div className="faq-item" key={item.q}>
              <button className="faq-q" onClick={() => setOpen(open === i ? null : i)}>
                <span>{item.q}</span>
                <span className="faq-q-icon">{open === i ? "–" : "+"}</span>
              </button>
              <div className={`faq-a-wrap${open === i ? " is-open" : ""}`}>
                <p className="faq-a">{item.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
