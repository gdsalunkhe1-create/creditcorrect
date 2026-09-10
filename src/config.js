// ── Edit these before going live ──────────────────────────────────────
// Everything a non-developer needs to change lives in this one file.

// WhatsApp number customers reach when they tap "Chat on WhatsApp".
// Format: country code + number, no spaces, no plus sign, no leading zero.
// Example for +91 98765 43210 -> "919876543210"
export const WHATSAPP_NUMBER = "911234567890"; // TODO: replace with real number

// Pre-filled message that opens in WhatsApp when the button is tapped.
export const WHATSAPP_MESSAGE =
  "Hi, I'd like to get my CIBIL report reviewed by CreditCorrect.";

// Text shown on the pricing line. Keep the ₹ symbol and "starting from" framing
// until you decide whether to quote a flat fee instead.
export const STARTING_FEE_TEXT = "Starting from ₹[XXX]"; // TODO: replace with real amount

// Supabase project connection (for the lead form). Leave blank until the
// Supabase project is created — the form will show a friendly message
// instead of failing silently.
export const SUPABASE_URL = ""; // TODO: fill in after creating the Supabase project
export const SUPABASE_ANON_KEY = ""; // TODO: fill in after creating the Supabase project

// Contact details shown in the footer.
export const SUPPORT_PHONE_DISPLAY = "+91 [XXXXX XXXXX]"; // TODO: replace
export const SUPPORT_EMAIL = "support@creditcorrect.in"; // TODO: confirm this is real
export const BUSINESS_NAME = "CreditCorrect";
export const PARENT_COMPANY_LINE = "A Capital Volts Financial Services initiative";

// Simple client-side password gate for the internal Credit Health Report
// tool at /internal. NOTE: this is a light deterrent, not real security —
// anyone who inspects the site's JavaScript can find this value. It's
// fine for keeping the page out of casual/accidental view while it's
// low-volume and internal-only, but before this handles real ongoing
// volume of customer PII, switch to proper Supabase auth (login with
// email/password, gated by a real backend check) rather than this.
export const INTERNAL_TOOL_PASSWORD = "changeme123"; // TODO: change this
