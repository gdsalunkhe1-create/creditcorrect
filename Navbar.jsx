import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar({ whatsappHref }) {
  const [open, setOpen] = useState(false);

  const links = [
    { href: "#issues", label: "What we fix" },
    { href: "#how-it-works", label: "How it works" },
    { href: "#pricing", label: "Pricing" },
    { href: "#faq", label: "FAQ" },
  ];

  return (
    <nav className="nav">
      <div className="nav-inner">
        <span className="brand">
          Credit<span className="brand-mark">Correct</span>
        </span>

        <div className="nav-links">
          {links.map((l) => (
            <a key={l.href} href={l.href}>
              {l.label}
            </a>
          ))}
        </div>

        <a className="nav-cta nav-cta-desktop" href={whatsappHref} target="_blank" rel="noreferrer">
          Chat on WhatsApp
        </a>

        <button
          className="nav-hamburger"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div className="nav-mobile-panel">
          {links.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)}>
              {l.label}
            </a>
          ))}
          <a
            className="nav-cta"
            href={whatsappHref}
            target="_blank"
            rel="noreferrer"
            onClick={() => setOpen(false)}
          >
            Chat on WhatsApp
          </a>
        </div>
      )}
    </nav>
  );
}
