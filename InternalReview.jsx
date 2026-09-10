import { useState, useRef } from "react";
import {
  UploadCloud,
  FileText,
  ArrowLeft,
  AlertTriangle,
  CheckCircle2,
  User,
  Gauge,
  CalendarDays,
  Layers,
  Flag,
  Code2,
} from "lucide-react";
import "./internal.css";
import PasswordGate from "./PasswordGate";
import { extractTextFromPDF } from "./pdfText";
import { parseCibilReport } from "./cibilParser";

function fmtCurrency(n) {
  if (!n) return "₹0";
  return "₹" + Number(n).toLocaleString("en-IN");
}

function StatusBadge({ status }) {
  if (!status) return <span className="badge badge-neutral">Unknown</span>;
  const s = status.toLowerCase();
  let cls = "badge-neutral";
  if (s.includes("written")) cls = "badge-red";
  else if (s.includes("settl")) cls = "badge-teal";
  else if (s.includes("closed")) cls = "badge-slate";
  else if (s.includes("active")) cls = "badge-amber";
  return <span className={`badge ${cls}`}>{status}</span>;
}

function StatCard({ icon: Icon, label, value, tone }) {
  return (
    <div className={`stat-card${tone ? " tone-" + tone : ""}`}>
      <div className="stat-icon">
        <Icon size={18} strokeWidth={1.75} />
      </div>
      <div>
        <div className="stat-label">{label}</div>
        <div className="stat-value">{value}</div>
      </div>
    </div>
  );
}

function ReportView({ report }) {
  return (
    <div className="review-result">
      <div className="stat-grid">
        <StatCard icon={User} label="Customer" value={report.customerName || "Not detected"} />
        <StatCard icon={Gauge} label="Score" value={report.score || "Not detected"} />
        <StatCard icon={CalendarDays} label="Report date" value={report.reportDate || "Not detected"} />
        <StatCard icon={Layers} label="Accounts found" value={report.accountCount} />
        <StatCard
          icon={Flag}
          label="Flagged for review"
          value={report.flaggedCount}
          tone={report.flaggedCount > 0 ? "amber" : "teal"}
        />
      </div>

      {report.accountCount === 0 && (
        <div className="callout callout-amber">
          <AlertTriangle size={18} strokeWidth={1.75} />
          <p>
            No accounts were detected in this PDF. This usually means either
            the report layout doesn't match what the parser expects yet, or
            the PDF has no real text layer. Check the raw extracted text
            below to see what was actually read.
          </p>
        </div>
      )}

      <div className="table-card">
        <table className="review-table">
          <thead>
            <tr>
              <th>Lender</th>
              <th>Type</th>
              <th>Status</th>
              <th>Opened</th>
              <th>Closed</th>
              <th>Balance</th>
              <th>Overdue</th>
              <th>Flags</th>
            </tr>
          </thead>
          <tbody>
            {report.accounts.map((acc, i) => (
              <tr key={i} className={acc.flags.length ? "row-flagged" : ""}>
                <td className="cell-strong">{acc.lender || "—"}</td>
                <td>{acc.accountType || "—"}</td>
                <td><StatusBadge status={acc.status} /></td>
                <td>{acc.dateOpened || "—"}</td>
                <td>{acc.dateClosed || "—"}</td>
                <td>{fmtCurrency(acc.currentBalance)}</td>
                <td>{fmtCurrency(acc.amountOverdue)}</td>
                <td>
                  {acc.flags.length > 0 ? (
                    <div className="flag-badges">
                      {acc.flags.map((f, fi) => (
                        <span className="badge badge-amber flag-badge" key={fi} title={f}>
                          <AlertTriangle size={12} strokeWidth={2} />
                          Review
                        </span>
                      ))}
                    </div>
                  ) : (
                    <span className="badge badge-teal">
                      <CheckCircle2 size={12} strokeWidth={2} />
                      Clean
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {report.accounts.some((a) => a.flags.length > 0) && (
        <div className="flag-detail-list">
          <h3>Flag details</h3>
          {report.accounts
            .filter((a) => a.flags.length > 0)
            .map((a, i) => (
              <div className="flag-detail-row" key={i}>
                <span className="flag-detail-lender">{a.lender}</span>
                <ul>
                  {a.flags.map((f, fi) => (
                    <li key={fi}>{f}</li>
                  ))}
                </ul>
              </div>
            ))}
        </div>
      )}

      <p className="review-caveat">
        These flags only catch contradictions within the report itself. They
        can't tell you whether an account genuinely isn't the customer's, or
        whether a loan was actually settled — that needs checking against
        the customer's own records.
      </p>
    </div>
  );
}

function UploadArea({ onFile, fileName, status }) {
  const inputRef = useRef(null);
  const [dragOver, setDragOver] = useState(false);

  function handleDrop(e) {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) onFile(file);
  }

  return (
    <div
      className={`upload-box${dragOver ? " is-drag" : ""}`}
      onDragOver={(e) => {
        e.preventDefault();
        setDragOver(true);
      }}
      onDragLeave={() => setDragOver(false)}
      onDrop={handleDrop}
      onClick={() => inputRef.current?.click()}
    >
      <input
        ref={inputRef}
        type="file"
        accept="application/pdf"
        onChange={(e) => e.target.files?.[0] && onFile(e.target.files[0])}
        hidden
      />
      <div className="upload-icon">
        <UploadCloud size={28} strokeWidth={1.5} />
      </div>
      {status === "reading" ? (
        <p className="upload-status">Reading {fileName}…</p>
      ) : fileName ? (
        <p className="upload-filename">
          <FileText size={15} strokeWidth={1.75} /> {fileName}
        </p>
      ) : (
        <>
          <p className="upload-title">Drop a CIBIL.com PDF here</p>
          <p className="upload-sub">or click to browse</p>
        </>
      )}
    </div>
  );
}

function ReviewTool() {
  const [status, setStatus] = useState("idle");
  const [report, setReport] = useState(null);
  const [fileName, setFileName] = useState("");
  const [rawText, setRawText] = useState("");
  const [showRaw, setShowRaw] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  async function handleFile(file) {
    setFileName(file.name);
    setStatus("reading");
    setReport(null);
    setErrorMsg("");

    try {
      const { text, emptyPages, pageCount } = await extractTextFromPDF(file);
      setRawText(text);

      if (text.trim().length < 50) {
        setErrorMsg(
          `This PDF returned almost no readable text (0 of ${pageCount} pages had a text layer). It's likely a scanned or "printed to PDF" report — this version of the tool doesn't do OCR yet.`
        );
        setStatus("error");
        return;
      }

      const parsed = parseCibilReport(text);
      setReport(parsed);
      setStatus("idle");

      if (emptyPages.length > 0) {
        setErrorMsg(
          `Note: ${emptyPages.length} of ${pageCount} pages had little/no extractable text (pages: ${emptyPages.join(", ")}). Some fields may be incomplete if they fell on those pages.`
        );
      }
    } catch (err) {
      setErrorMsg("Couldn't read this PDF: " + err.message);
      setStatus("error");
    }
  }

  return (
    <div className="internal-page">
      <div className="internal-topbar">
        <a className="internal-back" href="/">
          <ArrowLeft size={15} strokeWidth={2} /> CreditCorrect
        </a>
        <span className="internal-topbar-tag">Internal</span>
      </div>

      <div className="internal-header">
        <h1>Credit Health Report review</h1>
        <p>Upload a CIBIL.com format PDF to review the customer's report.</p>
      </div>

      <UploadArea onFile={handleFile} fileName={fileName} status={status} />

      {errorMsg && (
        <div className="callout callout-red">
          <AlertTriangle size={18} strokeWidth={1.75} />
          <p>{errorMsg}</p>
        </div>
      )}

      {report && <ReportView report={report} />}

      {rawText && (
        <div className="raw-text-section">
          <button className="btn-ghost" onClick={() => setShowRaw((s) => !s)}>
            <Code2 size={15} strokeWidth={1.75} />
            {showRaw ? "Hide" : "Show"} raw extracted text
          </button>
          {showRaw && <pre className="raw-text">{rawText}</pre>}
        </div>
      )}
    </div>
  );
}

export default function InternalReview() {
  return (
    <PasswordGate>
      <ReviewTool />
    </PasswordGate>
  );
}
