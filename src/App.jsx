import { useState } from "react";
import {
  ShieldAlert,
  UserX,
  FileWarning,
  History,
  FileCheck2,
  FileSearch,
  Send,
  BadgeCheck,
  Landmark,
  ShieldCheck,
  BriefcaseBusiness,
} from "lucide-react";
import "./App.css";
import { supabase } from "./lib/supabaseClient";
import {
  WHATSAPP_NUMBER,
  WHATSAPP_MESSAGE,
  STARTING_FEE_TEXT,
  SUPPORT_PHONE_DISPLAY,
  SUPPORT_EMAIL,
  BUSINESS_NAME,
  PARENT_COMPANY_LINE,
} from "./config";

const whatsappHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  WHATSAPP_MESSAGE
)}`;

const ERROR_TYPES = [
  {
    icon: ShieldAlert,
    title: "Settled loans shown as overdue",
    body: "You closed the account, the bank confirmed it — but the bureau still shows a running overdue balance, quietly pulling your score down every month.",
  },
  {
    icon: UserX,
    title: "Accounts that aren't yours",
    body: "A loan or credit card opened with your PAN, but you never took it. These show up more often than most people expect, especially after identity mix-ups.",
  },
  {
    icon: FileWarning,
    title: "Written-off loans marked active",
    body: "The lender wrote off the debt years ago, but your report still lists it as a live, unpaid account — a red flag to anyone reviewing your file.",
  },
  {
    icon: History,
    title: "Wrong late-payment history",
    body: "A single missed EMI that was actually paid on time can sit on your report as a recorded default, dragging down an otherwise clean history.",
  },
];

const PROCESS_STEPS = [
  {
    icon: FileSearch,
    title: "Send us your CIBIL report",
    body: "Share your existing report, or we'll walk you through pulling a fresh one. Nothing gets filed without you seeing the findings first.",
  },
  {
    icon: FileCheck2,
    title: "We review it line by line",
    body: "Our Credit Health Report tool checks every account against what actually happened — payment history, closure status, ownership — and flags exactly what's wrong.",
  },
  {
    icon: Send,
    title: "We file the dispute",
    body: "For every error we find, we prepare and submit the correction request to the credit bureau on your behalf, citing the specific discrepancy.",
  },
  {
    icon: BadgeCheck,
    title: "Your report gets corrected",
    body: "The bureau investigates and updates your file. We track it through to resolution and let you know the moment it's fixed.",
  },
  {
    icon: Landmark,
    title: "Explore loan options, if you want to",
    body: "Once your report reflects the truth, we can connect you with lending options through Capital Volts — entirely optional, no obligation.",
    optional: true,
  },
];

const TRUST_POINTS = [
  { icon: BriefcaseBusiness, label: "A Capital Volts Financial Services initiative" },
  { icon: ShieldCheck, label: "Your report data is reviewed confidentially" },
  { icon: BadgeCheck, label: "Plain-language findings before anything is filed" },
];

const FAQS = [
  {
    q: "How long does a dispute usually take to resolve?",
    a: "Credit bureaus are required to investigate disputes within a set window once filed. We keep track of your case and follow up so it doesn't stall — timelines vary by bureau and how many lenders are involved.",
  },
  {
    q: "What if the error isn't actually a mistake?",
    a: "We review your report against your own records first. If something is correctly reported, we'll tell you plainly rather than file a dispute that won't hold up.",
  },
  {
    q: "Do I need to already have my CIBIL report?",
    a: "No — if you don't have one handy, we'll guide you through getting a current copy before we begin the review.",
  },
  {
    q: "Is this connected to taking a loan?",
    a: "No. Fixing your report is a standalone service. If you're later interested in loan options, Capital Volts can help — but it's entirely your choice.",
  },
];

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

function LeadForm() {
  const [form, setForm] = useState({ name: "", phone: "", city: "" });
  const [status, setStatus] = useState("idle"); // idle | sending | success | error | unconfigured

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
        <input
          id="name"
          type="text"
          value={form.name}
          onChange={(e) => update("name", e.target.value)}
          required
        />
      </div>
      <div className="field">
        <label htmlFor="phone">Phone number</label>
        <input
          id="phone"
          type="tel"
          value={form.phone}
          onChange={(e) => update("phone", e.target.value)}
          required
        />
      </div>
      <div className="field">
        <label htmlFor="city">City (optional)</label>
        <input
          id="city"
          type="text"
          value={form.city}
          onChange={(e) => update("city", e.target.value)}
        />
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

function Faq() {
  const [open, setOpen] = useState(null);
  return (
    <div>
      {FAQS.map((item, i) => (
        <div className="faq-item" key={item.q}>
          <div className="faq-q" onClick={() => setOpen(open === i ? null : i)}>
            <span>{item.q}</span>
            <span className="faq-q-icon">{open === i ? "–" : "+"}</span>
          </div>
          {open === i && <p className="faq-a">{item.a}</p>}
        </div>
      ))}
    </div>
  );
}

export default function App() {
  return (
    <div className="page">
      <nav className="nav">
        <div className="nav-inner">
          <span className="brand">
            Credit<span className="brand-mark">Correct</span>
          </span>
          <div className="nav-links">
            <a href="#errors">What we fix</a>
            <a href="#process">How it works</a>
            <a href="#pricing">Pricing</a>
            <a href="#faq">FAQ</a>
          </div>
          <a className="nav-cta" href={whatsappHref} target="_blank" rel="noreferrer">
            Chat on WhatsApp
          </a>
        </div>
      </nav>

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
        <div className="wrap">
          <div className="trust-bar">
            {TRUST_POINTS.map((t) => (
              <div className="trust-point" key={t.label}>
                <t.icon size={17} strokeWidth={1.75} />
                <span>{t.label}</span>
              </div>
            ))}
          </div>
        </div>
      </header>

      <section className="section" id="errors">
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

      <section className="section" id="process">
        <div className="wrap">
          <div className="section-head">
            <h2>How it works</h2>
            <p>Five steps, start to finish. The last one is entirely up to you.</p>
          </div>
          <div className="process-list">
            {PROCESS_STEPS.map((step, i) => (
              <div className={`process-step${step.optional ? " is-optional" : ""}`} key={step.title}>
                <div className="process-num-wrap">
                  <span className="process-num">{String(i + 1).padStart(2, "0")}</span>
                  <step.icon size={16} strokeWidth={1.75} className="process-icon" />
                </div>
                <div>
                  <h3>
                    {step.title}
                    {step.optional && <span className="process-tag">Optional</span>}
                  </h3>
                  <p>{step.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

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
              <p className="pricing-amount">{STARTING_FEE_TEXT}</p>
              <a className="btn-primary" href="#contact">
                Get started
              </a>
            </div>
          </div>
        </div>
      </section>

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

      <section className="section" id="faq">
        <div className="wrap">
          <div className="section-head">
            <h2>Common questions</h2>
          </div>
          <Faq />
        </div>
      </section>

      <footer className="footer">
        <div className="wrap footer-inner">
          <div>
            <p className="footer-brand">{BUSINESS_NAME}</p>
            <p className="footer-sub">{PARENT_COMPANY_LINE}</p>
          </div>
          <div className="footer-contact">
            <p>{SUPPORT_PHONE_DISPLAY}</p>
            <p>{SUPPORT_EMAIL}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
