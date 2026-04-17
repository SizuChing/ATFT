import { Landmark, FileText, Mail } from "lucide-react";
import { useScrollFadeUp } from "@/hooks/useScrollFadeUp";
import { useLanguage } from "@/contexts/LanguageContext";
import { useEcbGuide } from "@/contexts/EcbGuideContext";

const ECBSection = () => {
  const ref = useScrollFadeUp();
  const { t } = useLanguage();
  const { open } = useEcbGuide();

  const flowStepKeys = ["ecb.flow.s1", "ecb.flow.s2", "ecb.flow.s3", "ecb.flow.s4", "ecb.flow.s5"];
  const pointKeys = ["ecb.p1", "ecb.p2", "ecb.p3", "ecb.p4"];

  return (
    <section id="ecb" className="py-20 lg:py-32 px-6 lg:px-12">
      <div ref={ref} className="max-w-7xl mx-auto opacity-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <span className="inline-flex items-center gap-2 text-xs px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 mb-4">
              <Landmark size={14} /> {t("ecb.badge")}
            </span>
            <h2 className="font-heading-cn text-2xl sm:text-3xl lg:text-4xl text-foreground mb-4">
              {t("ecb.title")}<br />{t("ecb.title2")}
            </h2>
            <p className="text-white-80 text-sm leading-relaxed mb-6">{t("ecb.desc")}</p>
            <ul className="space-y-3 mb-8">
              {pointKeys.map((key) => (
                <li key={key} className="flex items-start gap-2 text-sm text-white-80">
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
              <button onClick={open}
                className="card-glass text-white-80 text-sm px-6 py-2.5 rounded-full hover:text-foreground hover:-translate-y-0.5 transition-all duration-200 flex items-center gap-2">
                <FileText size={16} /> {t("ecb.btn2")}
              </button>
            </div>
          </div>

          <div className="space-y-6">
            <div className="card-glass rounded-2xl p-8">
              <h3 className="font-heading-cn text-lg text-foreground mb-6">{t("ecb.flow.title")}</h3>
              <div className="space-y-5">
                {flowStepKeys.map((key, i) => (
                  <div key={key} className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full border border-primary/40 flex items-center justify-center flex-shrink-0 text-primary font-mono-num text-xs">
                      {i + 1}
                    </div>
                    <p className="text-white-80 text-sm pt-1">{t(key)}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="card-glass rounded-2xl p-6 mt-4">
              <h3 className="font-heading-cn text-base text-foreground mb-5">{t("ecb.tier.title")}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Left option — Under 1M */}
                <div
                  className="rounded-xl p-6 flex flex-col"
                  style={{
                    background: "rgba(21, 0, 40, 0.6)",
                    border: "1px solid rgba(180, 60, 220, 0.3)",
                  }}
                >
                  <span className="self-start inline-flex items-center gap-1 text-[11px] px-2.5 py-1 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 mb-4">
                    {t("ecb.tier.under.badge")}
                  </span>
                  <h4 className="font-heading-cn text-foreground mb-3" style={{ fontSize: "20px", lineHeight: 1.3 }}>
                    {t("ecb.tier.under.t1")}
                    <br />
                    {t("ecb.tier.under.t2")}
                  </h4>
                  <p className="text-white-60 mb-5 flex-1" style={{ fontSize: "13px", lineHeight: 1.7 }}>
                    {t("ecb.tier.under.desc")}
                  </p>
                  <a
                    href="https://www.europecharteredbank.com/home.html"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="gradient-primary text-foreground text-sm rounded-md flex items-center justify-center gap-2 hover:-translate-y-0.5 transition-all duration-200 w-full"
                    style={{ height: "44px" }}
                  >
                    <Landmark size={16} /> {t("ecb.tier.under.btn")}
                  </a>
                </div>

                {/* Right option — Above 1M */}
                <div
                  className="rounded-xl p-6 flex flex-col"
                  style={{
                    background: "rgba(21, 0, 40, 0.6)",
                    border: "1px solid rgba(180, 120, 0, 0.3)",
                  }}
                >
                  <span className="self-start inline-flex items-center gap-1 text-[11px] px-2.5 py-1 rounded-full bg-amber-500/15 text-amber-300 border border-amber-500/30 mb-4">
                    {t("ecb.tier.over.badge")}
                  </span>
                  <h4 className="font-heading-cn text-foreground mb-3" style={{ fontSize: "20px", lineHeight: 1.3 }}>
                    {t("ecb.tier.over.t1")}
                    <br />
                    {t("ecb.tier.over.t2")}
                  </h4>
                  <p className="text-white-60 mb-5 flex-1" style={{ fontSize: "13px", lineHeight: 1.7 }}>
                    {t("ecb.tier.over.desc")}
                  </p>
                  <a
                    href="mailto:Aift@Aift.com"
                    className="text-foreground text-sm rounded-md inline-flex items-center justify-center gap-2 w-full border border-primary/60 bg-primary/10 hover:bg-primary/20 hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
                    style={{ height: "44px" }}
                  >
                    <Mail size={16} /> {t("ecb.tier.over.btn")}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ECBSection;
