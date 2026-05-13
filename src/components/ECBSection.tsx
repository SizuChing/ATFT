import { useState, useRef, useEffect } from "react";
import { Landmark, FileText, User, Building2, Mail } from "lucide-react";
import { useScrollFadeUp } from "@/hooks/useScrollFadeUp";
import { useLanguage } from "@/contexts/LanguageContext";
import { useEcbGuide } from "@/contexts/EcbGuideContext";
import qrLine from "@/assets/qr-line.png";
import qrTelegram from "@/assets/qr-telegram.png";

const ECBSection = () => {
  const ref = useScrollFadeUp();
  const { t } = useLanguage();
  const { open } = useEcbGuide();
  const [mode, setMode] = useState<"self" | "assisted" | null>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const selectMode = (next: "self" | "assisted") => {
    setMode(next);
    if (typeof window !== "undefined" && window.innerWidth < 1024) {
      setTimeout(() => {
        contentRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    }
  };

  const flowStepKeys = ["ecb.flow.s1", "ecb.flow.s2", "ecb.flow.s3", "ecb.flow.s4", "ecb.flow.s5"];
  const pointKeys = ["ecb.p1", "ecb.p2", "ecb.p3", "ecb.p4"];

  return (
    <section id="ecb" className="py-20 lg:py-32 px-6 lg:px-12">
      <div ref={ref} className="max-w-7xl mx-auto opacity-0">
        <div className="text-center mb-10">
          <h2 className="font-heading-cn text-2xl sm:text-3xl lg:text-4xl text-foreground mb-4">
            {t("nav.ecb")}
          </h2>
          <p className="font-heading-cn text-base lg:text-lg text-white-80">{t("ecb.tier.title")}</p>
        </div>

        {/* Section: Mode selection */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-5xl mx-auto">
          <button
            type="button"
            onClick={() => selectMode("self")}
            className="text-left rounded-xl transition-all duration-300"
            style={{
              padding: "20px 24px",
              background: mode === "self" ? "rgba(40, 0, 70, 0.85)" : "rgba(21, 0, 40, 0.6)",
              border: mode === "self" ? "1px solid rgba(180, 60, 220, 0.9)" : "1px solid rgba(180, 60, 220, 0.3)",
              boxShadow: mode === "self" ? "0 0 24px rgba(180, 60, 220, 0.35)" : "none",
            }}
          >
            <span className="inline-flex items-center gap-1 text-[11px] px-2.5 py-1 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 mb-4">
              {t("ecb.tier.under.badge")}
            </span>
            <h4 className="font-heading-cn text-foreground mb-3" style={{ fontSize: "20px", lineHeight: 1.3 }}>
              {t("ecb.tier.under.t1")} {t("ecb.tier.under.t2")}
            </h4>
            <p className="text-white-60" style={{ fontSize: "13px", lineHeight: 1.6 }}>
              {t("ecb.tier.under.desc")}
            </p>
          </button>

          <button
            type="button"
            onClick={() => selectMode("assisted")}
            className="text-left rounded-xl transition-all duration-300"
            style={{
              padding: "20px 24px",
              background: mode === "assisted" ? "rgba(50, 30, 0, 0.85)" : "rgba(21, 0, 40, 0.6)",
              border: mode === "assisted" ? "1px solid rgba(220, 150, 40, 0.9)" : "1px solid rgba(180, 120, 0, 0.3)",
              boxShadow: mode === "assisted" ? "0 0 24px rgba(220, 150, 40, 0.35)" : "none",
            }}
          >
            <span className="inline-flex items-center gap-1 text-[11px] px-2.5 py-1 rounded-full bg-amber-500/15 text-amber-300 border border-amber-500/30 mb-4">
              {t("ecb.tier.over.badge")}
            </span>
            <h4 className="font-heading-cn text-foreground mb-3" style={{ fontSize: "20px", lineHeight: 1.3 }}>
              {t("ecb.tier.over.t1")} {t("ecb.tier.over.t2")}
            </h4>
            <p className="text-white-60" style={{ fontSize: "13px", lineHeight: 1.6 }}>
              {t("ecb.tier.over.desc")}
            </p>
          </button>
        </div>

        {/* Section: Dynamic content */}
        {mode && (
          <div
            ref={contentRef}
            key={mode}
            className="card-glass rounded-2xl max-w-6xl mx-auto animate-fade-in"
            style={{ padding: "28px 32px", marginTop: "24px", animationDuration: "0.4s" }}
          >
            {mode === "self" ? (
              <>
              <div className="grid grid-cols-1 lg:grid-cols-[60fr_40fr] gap-8 lg:gap-0">
              {/* Left */}
              <div>
                <h3 className="font-heading-cn text-foreground mb-3" style={{ fontSize: "18px", lineHeight: 1.4 }}>
                  {t("ecb.title")} {t("ecb.title2")}
                </h3>
                <p className="text-white-80 mb-5" style={{ fontSize: "13px", lineHeight: 1.7 }}>
                  {t("ecb.desc")}
                </p>
                <ul className="mb-6 flex flex-col" style={{ gap: "8px" }}>
                  {pointKeys.map((key) => (
                    <li key={key} className="flex items-start gap-2 text-white-80" style={{ fontSize: "13px", lineHeight: 1.6 }}>
                      <span className="text-primary mt-0.5">•</span>
                      {t(key)}
                    </li>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-3">
                  <a href="https://www.europecharteredbank.com/home.html" target="_blank" rel="noopener noreferrer"
                    className="gradient-primary text-foreground text-sm px-6 py-2.5 rounded-full glow-box hover:-translate-y-0.5 transition-all duration-200 flex items-center gap-2">
                    <Landmark size={16} /> {t("ecb.btn1")}
                  </a>
                  <button onClick={() => open()}
                    className="card-glass text-white-80 text-sm px-6 py-2.5 rounded-full hover:text-foreground hover:-translate-y-0.5 transition-all duration-200 flex items-center gap-2">
                    <FileText size={16} /> {t("ecb.btn2")}
                  </button>
                </div>
              </div>
              {/* Right — required documents */}
              <div className="lg:border-l lg:border-[rgba(180,60,220,0.2)]" style={{ paddingLeft: undefined }}>
                <div className="lg:pl-8">
                <h4 className="font-heading-cn text-base lg:text-lg text-foreground mb-2">
                  {t("ecb.docs.title")}
                </h4>
                <p className="text-white-60 text-sm mb-5">{t("ecb.docs.desc")}</p>
                <div className="flex flex-col gap-3">
                  <button
                    type="button"
                    onClick={() => open({ section: "documents", docTab: "personal" })}
                    className="text-foreground text-sm rounded-md inline-flex items-center justify-center gap-2 w-full border border-primary/60 bg-primary/5 hover:bg-primary/15 hover:border-primary transition-all duration-200 cursor-pointer"
                    style={{ height: "44px" }}
                  >
                    <User size={16} /> {t("ecb.docs.personal")}
                  </button>
                  <button
                    type="button"
                    onClick={() => open({ section: "documents", docTab: "corporate" })}
                    className="text-foreground text-sm rounded-md inline-flex items-center justify-center gap-2 w-full border border-primary/60 bg-primary/5 hover:bg-primary/15 hover:border-primary transition-all duration-200 cursor-pointer"
                    style={{ height: "44px" }}
                  >
                    <Building2 size={16} /> {t("ecb.docs.corporate")}
                  </button>
                </div>
                </div>
              </div>
              </div>
              {/* Divider + investment flow */}
              <div className="mt-8 pt-8 border-t border-[rgba(180,60,220,0.2)]">
                <h3 className="font-heading-cn text-lg text-foreground mb-4 text-center">{t("ecb.flow.title")}</h3>
                <div className="flex flex-col max-w-3xl mx-auto">
                  {flowStepKeys.map((key, i) => (
                    <div
                      key={key}
                      className="flex items-start gap-4 py-3"
                      style={{ borderBottom: i < flowStepKeys.length - 1 ? "1px solid rgba(180,60,220,0.1)" : "none" }}
                    >
                      <div className="w-8 h-8 rounded-full border border-primary/40 flex items-center justify-center flex-shrink-0 text-primary font-mono-num text-xs">
                        {i + 1}
                      </div>
                      <p className="text-white-80 text-sm pt-1">{t(key)}</p>
                    </div>
                  ))}
                </div>
              </div>
              </>
            ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-0">
              {/* Left — contact info */}
              <div className="flex flex-col justify-center lg:pr-8">
                <h4 className="font-heading-cn text-lg lg:text-xl text-foreground mb-3">
                  {t("ecb.contact.title")}
                </h4>
                <p className="text-white-60 mb-5" style={{ fontSize: "13px", lineHeight: 1.7 }}>
                  {t("ecb.contact.desc")}
                </p>
                <a
                  href="mailto:Aift@Aift.com"
                  className="gradient-primary text-foreground text-sm px-6 py-2.5 rounded-full glow-box hover:-translate-y-0.5 transition-all duration-200 inline-flex items-center justify-center gap-2 w-full"
                >
                  <Mail size={16} /> EMAIL 聯繫
                </a>
              </div>
              {/* Middle — LINE QR */}
              <div className="text-center lg:px-8 lg:border-l lg:border-[rgba(180,60,220,0.15)] flex flex-col items-center justify-center">
                <div className="font-heading-cn text-base text-foreground mb-3">LINE</div>
                <img
                  src={qrLine}
                  alt="LINE QR Code"
                  className="mx-auto block bg-white p-2"
                  style={{
                    width: "160px",
                    height: "160px",
                    border: "1px solid rgba(180, 60, 220, 0.4)",
                    borderRadius: "8px",
                  }}
                />
              </div>
              {/* Right — Telegram QR */}
              <div className="text-center lg:px-8 lg:border-l lg:border-[rgba(180,60,220,0.15)] flex flex-col items-center justify-center">
                <div className="font-heading-cn text-base text-foreground mb-3">Telegram</div>
                <img
                  src={qrTelegram}
                  alt="Telegram QR Code"
                  className="mx-auto block bg-white p-2"
                  style={{
                    width: "160px",
                    height: "160px",
                    border: "1px solid rgba(180, 60, 220, 0.4)",
                    borderRadius: "8px",
                  }}
                />
              </div>
            </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default ECBSection;
