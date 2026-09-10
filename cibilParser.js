// ─────────────────────────────────────────────────────────────────────────
// CIBIL.com report parser — v1, built fresh for CreditCorrect.
//
// IMPORTANT: this has NOT yet been run against a real CIBIL.com PDF. It's
// built from the known general structure of these reports (labeled fields
// per account, a payment-history grid, a score section). The very first
// real report you run through this will likely surface field-extraction
// bugs — mismatched labels, extra whitespace, a layout variant this
// doesn't expect yet. That's expected and normal for a v1 parser; note
// what came back wrong/empty and we'll tighten the regexes against the
// real text. Don't treat this as production-hardened yet.
// ─────────────────────────────────────────────────────────────────────────

function cleanText(raw) {
  return raw
    .replace(/Page \d+ of \d+/gi, "")
    .replace(/TransUnion CIBIL.*$/gim, "")
    .replace(/\r/g, "")
    .replace(/[ \t]+/g, " ")
    .replace(/\n{3,}/g, "\n\n");
}

function matchFirst(text, patterns) {
  for (const re of patterns) {
    const m = text.match(re);
    if (m) return m[1] ? m[1].trim() : m[0].trim();
  }
  return "";
}

function extractScore(text) {
  const m = text.match(/CIBIL\s*Score\s*[:\-]?\s*(\d{3})(?!\d)/i);
  return m ? m[1] : "";
}

function extractCustomerName(text) {
  return matchFirst(text, [
    /Name\s*[:\-]?\s*(?:MR\.?|MRS\.?|MS\.?|DR\.?)?\s*([A-Z][A-Z .]{3,60})\n/,
    /Consumer Name\s*[:\-]?\s*([A-Z][A-Z .]{3,60})\n/,
  ]);
}

function extractReportDate(text) {
  return matchFirst(text, [
    /as of Date\s*[:\-]?\s*(\d{1,2}[\/\-]\d{1,2}[\/\-]\d{2,4})/i,
    /Date\s*[:\-]?\s*(\d{1,2}[\/\-]\d{1,2}[\/\-]\d{2,4})/i,
  ]);
}

// Splits the report into per-account chunks. CIBIL.com reports repeat a
// "MEMBER NAME" (lender) label at the start of every account block — used
// here as the anchor to slice the document up.
function splitAccountBlocks(text) {
  const anchor = /MEMBER NAME\s*[:\-]?/gi;
  const indices = [];
  let m;
  while ((m = anchor.exec(text))) indices.push(m.index);

  const blocks = [];
  for (let i = 0; i < indices.length; i++) {
    const start = indices[i];
    const end = i + 1 < indices.length ? indices[i + 1] : text.length;
    blocks.push(text.slice(start, end));
  }
  return blocks;
}

function field(block, label, opts = {}) {
  const { numeric = false } = opts;
  const re = new RegExp("(?:" + label + ")\\s*[:\\-]?\\s*([^\\n]{1,80})");
  const m = block.match(re);
  if (!m) return numeric ? 0 : "";
  let val = m[1].trim();
  if (numeric) {
    val = val.replace(/[,₹\s]/g, "");
    const n = parseFloat(val);
    return isNaN(n) ? 0 : n;
  }
  return val;
}

function parseAccountBlock(block) {
  return {
    lender: field(block, "MEMBER NAME"),
    accountType: field(block, "ACCOUNT TYPE|TYPE OF ACCOUNT"),
    accountNumber: field(block, "ACCOUNT NUMBER"),
    ownership: field(block, "OWNERSHIP"),
    dateOpened: field(block, "DATE OPENED|DATE OF DISBURSAL|DISBURSED DATE"),
    dateClosed: field(block, "DATE CLOSED"),
    lastPaymentDate: field(block, "DATE OF LAST PAYMENT|LAST PAYMENT DATE"),
    dateReported: field(block, "DATE REPORTED"),
    sanctionedAmount: field(block, "SANCTIONED AMOUNT|HIGH CREDIT", { numeric: true }),
    currentBalance: field(block, "CURRENT BALANCE", { numeric: true }),
    amountOverdue: field(block, "AMOUNT OVERDUE", { numeric: true }),
    status: field(block, "ACCOUNT STATUS|CREDIT FACILITY STATUS"),
    writtenOffAmount: field(block, "WRITTEN[- ]OFF AMOUNT", { numeric: true }),
    settlementAmount: field(block, "SETTLEMENT AMOUNT", { numeric: true }),
    suitFiled: field(block, "SUIT[- ]FILED"),
  };
}

// Internal-consistency flags only — things detectable from the report's
// own fields contradicting each other. This can NOT detect "this account
// isn't mine" or "this loan was actually settled" — those require
// comparing against the customer's own records/documents, which is a
// separate step in the workflow, not something the PDF alone can tell you.
function flagAccount(acc) {
  const flags = [];
  const statusLower = (acc.status || "").toLowerCase();

  if (statusLower.includes("closed") && acc.amountOverdue > 0) {
    flags.push("Marked Closed but still shows an overdue amount — worth checking.");
  }
  if (statusLower.includes("written") && acc.currentBalance === 0 && acc.amountOverdue === 0) {
    flags.push("Marked Written-off but balance and overdue both show ₹0 — confirm write-off amount is recorded correctly.");
  }
  if (statusLower.includes("closed") && !acc.dateClosed) {
    flags.push("Marked Closed but no closed date is recorded.");
  }
  if (!acc.status) {
    flags.push("No account status could be read — check this entry manually.");
  }
  return flags;
}

export function parseCibilReport(rawText) {
  const text = cleanText(rawText);
  const score = extractScore(text);
  const customerName = extractCustomerName(text);
  const reportDate = extractReportDate(text);

  const blocks = splitAccountBlocks(text);
  const accounts = blocks.map(parseAccountBlock).map((acc) => ({
    ...acc,
    flags: flagAccount(acc),
  }));

  return {
    customerName,
    score,
    reportDate,
    accounts,
    accountCount: accounts.length,
    flaggedCount: accounts.filter((a) => a.flags.length > 0).length,
  };
}
