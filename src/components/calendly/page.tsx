import { InlineWidget } from "react-calendly";

export default function CalendlySection() {
  return (
    <div className="lg:px-0 px-6 flex justify-center">
      <InlineWidget
        url="https://calendly.com/berryboost/30min?hide_gdpr_banner=true"
        styles={{
          height: "700px",
          width: "100%",
        }}
        className="no-scrollbar"
        pageSettings={{
          hideEventTypeDetails: false,
          hideLandingPageDetails: false,
          backgroundColor: "#ffffff",
          primaryColor: "#ff0000",
          textColor: "#000000",
        }}
      />
    </div>
  );
}
