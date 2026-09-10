import { useState } from "react";
import { supabase } from "../lib/supabaseClient";

function LeadForm() {
  const [form, setForm] = useState({ name: "", phone: "", city: "" });
  const [status, setStatus] = useState("idle");

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!supabase) {
      setStatus("unconfigured");
      return;
    }
    if (!form.name.trim() || !form.phone.trim()) {
      setStatus("error");
      return;
    }

    setStatus("sending");
    const { error } = await supabase.from("leads").insert({
      name: form.name.trim(),
      phone: form.phone.trim(),
      city: form.city.trim() || null,
      source: "landing_page",
    });

    if (error) {
      setStatus("error");
      return;
    }

    setStatus("success");
    setForm({ name: "", phone: "", city: "" });
  }

  if (status === "success") {
    return (
      <div className="form-msg success">
        Thanks — we've got your details and will reach out shortly.
      </div>
    );
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <div className="field">
        <label htmlFor="name">Your name</label>
        <input id="name" type="text" value={form.name} onChange={(e) => update("name", e.target.value)} required />
      </div>
      <div className="field">
        <label htmlFor="phone">Phone number</label>
        <input id="phone" type="tel" value={form.phone} onChange={(e) => update("phone", e.target.value)} required />
      </div>
      <div className="field">
        <label htmlFor="city">City (optional)</label>
        <input id="city" type="text" value={form.city} onChange={(e) => update("city", e.target.value)} />
      </div>

      {status === "unconfigured" && (
        <div className="form-msg error">
          The lead form isn't connected to a database yet — add your Supabase
          project details to src/config.js to activate it.
        </div>
      )}
      {status === "error" && (
        <div className="form-msg error">
          Something went wrong sending your details. Please try WhatsApp instead.
        </div>
      )}

      <button className="btn-primary" type="submit" disabled={status === "sending"}>
        {status === "sending" ? "Sending…" : "Request a free review"}
      </button>
    </form>
  );
}

export default function ContactSection({ whatsappHref }) {
  return (
    <section className="section" id="contact">
      <div className="wrap">
        <div className="section-head">
          <h2>Get your report reviewed</h2>
          <p>Share a few details and we'll get in touch, or start the conversation on WhatsApp directly.</p>
        </div>
        <div className="contact-grid">
          <LeadForm />
          <div className="whatsapp-panel">
            <h3>Prefer to talk it through first?</h3>
            <p>
              Message us on WhatsApp with your question — no form, no
              waiting. We typically respond the same day.
            </p>
            <a className="btn-whatsapp" href={whatsappHref} target="_blank" rel="noreferrer">
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
