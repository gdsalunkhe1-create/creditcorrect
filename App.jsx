import "./App.css";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import TrustIndicators from "./components/TrustIndicators";
import HowItWorks from "./components/HowItWorks";
import ReportPreview from "./components/ReportPreview";
import IssueGrid from "./components/IssueGrid";
import ProcessTimeline from "./components/ProcessTimeline";
import DashboardPreview from "./components/DashboardPreview";
import CtaBanner from "./components/CtaBanner";
import ContactSection from "./components/ContactSection";
import Faq from "./components/Faq";
import Footer from "./components/Footer";
import {
  WHATSAPP_NUMBER,
  WHATSAPP_MESSAGE,
  STARTING_FEE_TEXT,
  SUPPORT_PHONE_DISPLAY,
  SUPPORT_EMAIL,
  BUSINESS_NAME,
  PARENT_COMPANY_LINE,
} from "./config";

const whatsappHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

export default function App() {
  return (
    <div className="page">
      <Navbar whatsappHref={whatsappHref} />
      <Hero whatsappHref={whatsappHref} />
      <TrustIndicators />
      <IssueGrid />
      <HowItWorks />
      <ReportPreview />
      <ProcessTimeline />
      <DashboardPreview />
      <CtaBanner startingFeeText={STARTING_FEE_TEXT} />
      <ContactSection whatsappHref={whatsappHref} />
      <Faq />
      <Footer
        whatsappHref={whatsappHref}
        supportPhone={SUPPORT_PHONE_DISPLAY}
        supportEmail={SUPPORT_EMAIL}
        businessName={BUSINESS_NAME}
        parentLine={PARENT_COMPANY_LINE}
      />
    </div>
  );
}
