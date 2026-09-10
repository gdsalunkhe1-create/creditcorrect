import {
  ShieldAlert,
  UserX,
  FileWarning,
  History,
  Layers,
  Search,
  FileCheck2,
  FileSearch,
  Send,
  BadgeCheck,
  Landmark,
  ShieldCheck,
  BriefcaseBusiness,
  Lock,
  Sparkles,
  UploadCloud,
  ScanSearch,
  FileStack,
  Activity,
} from "lucide-react";

export const ERROR_TYPES = [
  {
    icon: ShieldAlert,
    title: "Settled loans shown as overdue",
    body: "You closed the account, the bank confirmed it — but the bureau still shows a running overdue balance.",
  },
  {
    icon: UserX,
    title: "Accounts that aren't yours",
    body: "A loan or credit card opened with your PAN, but you never took it — more common than most people expect.",
  },
  {
    icon: FileWarning,
    title: "Written-off loans marked active",
    body: "The lender wrote off the debt years ago, but your report still lists it as a live, unpaid account.",
  },
  {
    icon: History,
    title: "Wrong late-payment history",
    body: "A single missed EMI that was actually paid on time can sit on your report as a recorded default.",
  },
  {
    icon: Layers,
    title: "Duplicate account entries",
    body: "The same loan reported twice by mistake, understating your available credit and confusing your score.",
  },
  {
    icon: Search,
    title: "Unknown credit enquiries",
    body: "A hard enquiry from a lender you never approached, sitting on your report and pulling your score down.",
  },
];

export const PROCESS_STEPS = [
  {
    icon: FileSearch,
    title: "Send us your CIBIL report",
    body: "Share your existing report, or we'll walk you through pulling a fresh one.",
  },
  {
    icon: FileCheck2,
    title: "We review it line by line",
    body: "Every account checked against what actually happened — status, closure, ownership.",
  },
  {
    icon: Send,
    title: "We file the dispute",
    body: "We prepare and submit the correction request to the bureau, citing the exact discrepancy.",
  },
  {
    icon: BadgeCheck,
    title: "Your report gets corrected",
    body: "The bureau investigates and updates your file. We track it through to resolution.",
  },
  {
    icon: Landmark,
    title: "Explore loan options, if you want to",
    body: "Once your report reflects the truth, we can connect you with lending options — entirely optional.",
    optional: true,
  },
];

export const TRUST_POINTS = [
  { icon: Lock, title: "Confidential by default", body: "Your report data is reviewed privately and never shared beyond what's needed to fix it." },
  { icon: ScanSearch, title: "Line-by-line review", body: "Every account on your report is checked, not just a scan for keywords." },
  { icon: BriefcaseBusiness, title: "Backed by Capital Volts", body: "A Capital Volts Financial Services initiative, not an anonymous service." },
  { icon: Sparkles, title: "Plain language findings", body: "You see exactly what's wrong, in plain English, before anything gets filed." },
  { icon: Activity, title: "Tracked to resolution", body: "We follow up with the bureau until each dispute is actually closed out." },
];

export const JOURNEY_STAGES = [
  { icon: UploadCloud, label: "Report uploaded" },
  { icon: ScanSearch, label: "Issues detected" },
  { icon: FileSearch, label: "Issue reviewed" },
  { icon: FileStack, label: "Dispute prepared" },
  { icon: Send, label: "Dispute submitted" },
  { icon: Activity, label: "Under review" },
  { icon: BadgeCheck, label: "Resolved" },
];

export const SAMPLE_ISSUES = [
  { label: "HDFC Bank Personal Loan — shown overdue after settlement", severity: "high" },
  { label: "Unknown Finance Co. — account not recognised", severity: "high" },
  { label: "Axis Bank Credit Card — late payment mismatch", severity: "medium" },
];

export const RECENT_ACTIVITY = [
  { label: "Report uploaded", done: true },
  { label: "3 issues identified", done: true },
  { label: "Dispute submitted to bureau", done: false, current: true },
];

export const FAQS = [
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
