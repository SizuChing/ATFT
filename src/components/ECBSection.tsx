import { useState, useRef } from "react";
import { Landmark, FileText, User, Building2, Mail, Repeat, Bot, ShieldCheck, Briefcase, ArrowRight } from "lucide-react";
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
  const points = [
    { key: "ecb.p1", Icon: Repeat },
    { key: "ecb.p2", Icon: Bot },
    { key: "ecb.p3", Icon: ShieldCheck },
    { key: "ecb.p4", Icon: Briefcase },
  ];
  const flowShort = [
    { title: "註冊 KYC", desc: "完成帳號註冊與身份驗證" },
    { title: "存入資產", desc: "存入法幣或加密貨幣" },
    { title: "授權 AIFT", desc: "委託 AIFT 管理資金" },
    { title: "認購基金", desc: "選擇 AI 基金方案" },
    { title: "自動交易", desc: "即時查閱收益績效" },
  ];

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
                {/* Section 1: Bank intro (left card + right text) */}
                <div className="grid grid-cols-1 lg:grid-cols-[40fr_60fr] gap-8 items-stretch">
                  {/* Left — bank logo card */}
                  <div
                    className="rounded-2xl flex flex-col items-center justify-center text-center p-8"
                    style={{
                      background: "linear-gradient(160deg, rgba(40,0,70,0.9), rgba(15,0,30,0.95))",
                      border: "1px solid rgba(180,60,220,0.4)",
                      boxShadow: "0 0 40px rgba(180,60,220,0.25), inset 0 0 40px rgba(180,60,220,0.08)",
                      minHeight: "260px",
                    }}
                  >
                    <div className="font-heading text-foreground mb-2" style={{ fontSize: "56px", letterSpacing: "0.08em", textShadow: "0 0 20px rgba(180,60,220,0.6)" }}>
                      ECB
                    </div>
                    <div className="text-white-80 text-sm mb-1">Europe Chartered Bank</div>
                    <div className="text-white-60 text-xs mb-5">歐洲特許銀行</div>
                    <div className="text-[12px] px-3 py-1.5 rounded-full" style={{ color: "#d49bff", border: "1px solid rgba(180,60,220,0.5)", background: "rgba(180,60,220,0.08)" }}>
                      葛摩群島合規執照金融機構
                    </div>
                  </div>
                  {/* Right — content */}
                  <div className="flex flex-col">
                    <h3 className="font-heading-cn text-foreground mb-3" style={{ fontSize: "18px", lineHeight: 1.4 }}>
                      {t("ecb.title")} {t("ecb.title2")}
                    </h3>
                    <p className="text-white-80 mb-5" style={{ fontSize: "13px", lineHeight: 1.8 }}>
                      {t("ecb.desc")}
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                      {points.map(({ key, Icon }) => (
                        <div
                          key={key}
                          className="flex items-start gap-3 p-3 rounded-lg"
                          style={{ background: "rgba(180,60,220,0.06)", border: "1px solid rgba(180,60,220,0.2)" }}
                        >
                          <Icon size={18} className="text-primary mt-0.5 flex-shrink-0" />
                          <span className="text-white-80 text-[13px] leading-snug">{t(key)}</span>
                        </div>
                      ))}
                    </div>
                    <div className="flex flex-wrap gap-3 mt-auto">
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
                </div>

                {/* Section 2: Required documents */}
                <div className="mt-8 pt-8 border-t border-[rgba(180,60,220,0.2)]">
                  <h4 className="font-heading-cn text-base lg:text-lg text-foreground mb-1 text-center">
                    {t("ecb.docs.title")}
                  </h4>
                  <p className="text-white-60 text-sm mb-5 text-center">{t("ecb.docs.desc")}</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      { icon: User, title: "個人帳戶", tab: "personal" as const },
                      { icon: Building2, title: "公司帳戶", tab: "corporate" as const },
                    ].map(({ icon: Icon, title, tab }) => (
                      <button
                        key={tab}
                        type="button"
                        onClick={() => open({ section: "documents", docTab: tab })}
                        className="flex items-center gap-4 px-5 rounded-xl text-left transition-all duration-200 hover:-translate-y-[3px] group"
                        style={{
                          height: "100px",
                          background: "rgba(21, 0, 40, 0.6)",
                          border: "1px solid rgba(180,60,220,0.3)",
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.borderColor = "rgba(180,60,220,0.9)")}
                        onMouseLeave={(e) => (e.currentTarget.style.borderColor = "rgba(180,60,220,0.3)")}
                      >
                        <Icon size={36} className="text-primary flex-shrink-0" />
                        <div className="flex-1">
                          <div className="font-heading-cn text-foreground text-lg leading-tight">{title}</div>
                          <div className="text-white-60 text-xs mt-1">所需文件清單</div>
                        </div>
                        <div className="text-primary text-xs flex items-center gap-1 opacity-80 group-hover:opacity-100">
                          點擊查閱 <ArrowRight size={12} />
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Section 3: Investment flow timeline */}
                <div className="mt-8 pt-8 border-t border-[rgba(180,60,220,0.2)]">
                  <h3 className="font-heading-cn text-lg text-foreground mb-6 text-center">{t("ecb.flow.title")}</h3>
                  {/* Desktop horizontal timeline */}
                  <div className="hidden md:block relative">
                    <div
                      className="absolute left-0 right-0"
                      style={{ top: "20px", borderTop: "1px dashed rgba(180,60,220,0.4)", marginLeft: "10%", marginRight: "10%" }}
                    />
                    <div className="grid grid-cols-5 gap-2 relative">
                      {flowShort.map((step, i) => (
                        <div key={i} className="flex flex-col items-center text-center px-1">
                          <div
                            className="w-10 h-10 rounded-full flex items-center justify-center text-primary font-mono-num text-sm relative z-10"
                            style={{ background: "rgba(15,0,30,1)", border: "1px solid rgba(180,60,220,0.6)", boxShadow: "0 0 12px rgba(180,60,220,0.3)" }}
                          >
                            {i + 1}
                          </div>
                          <div className="text-foreground text-[13px] font-semibold mt-3 leading-tight">{step.title}</div>
                          <div className="text-white-60 text-[11px] mt-1 leading-snug">{step.desc}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                  {/* Mobile vertical */}
                  <div className="md:hidden flex flex-col gap-3">
                    {flowStepKeys.map((key, i) => (
                      <div key={key} className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-full border border-primary/60 flex items-center justify-center flex-shrink-0 text-primary font-mono-num text-xs">
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
