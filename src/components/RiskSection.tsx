import { Scale, OctagonX, Target, Globe } from "lucide-react";
import { useScrollFadeUp } from "@/hooks/useScrollFadeUp";
import { useLanguage } from "@/contexts/LanguageContext";

const RiskSection = () => {
  const ref = useScrollFadeUp();
  const { t } = useLanguage();

  const cards = [
    { icon: Scale, titleKey: "risk.c1.title", descKey: "risk.c1.desc", statKey: "risk.c1.stat" },
    { icon: OctagonX, titleKey: "risk.c2.title", descKey: "risk.c2.desc", statKey: "risk.c2.stat" },
    { icon: Target, titleKey: "risk.c3.title", descKey: "risk.c3.desc", statKey: "risk.c3.stat" },
    { icon: Globe, titleKey: "risk.c6.title", descKey: "risk.c6.desc", statKey: "risk.c6.stat" },
  ];

  return (
    <section id="risk" className="py-20 lg:py-32 px-6 lg:px-12" style={{ background: "hsl(270 100% 6%)" }}>
      <div ref={ref} className="max-w-7xl mx-auto opacity-0">
        <div className="text-center mb-12">
          <span className="text-xs tracking-[4px] uppercase text-primary mb-3 block">{t("risk.label")}</span>
          <h2 className="font-heading-cn text-2xl sm:text-3xl lg:text-4xl text-foreground">{t("risk.title")}</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {cards.map((c) => (
            <div key={c.titleKey} className="card-glass rounded-xl p-6 hover:-translate-y-1 hover:border-primary/50 transition-all duration-300 glow-box-hover group">
              <c.icon className="w-8 h-8 text-primary mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-foreground font-medium mb-1">{t(c.titleKey)}</h3>
              <p className="text-white-40 text-sm mb-4">{t(c.descKey)}</p>
              <code className="font-mono-num text-xs text-primary bg-primary/10 px-3 py-1 rounded">{t(c.statKey)}</code>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RiskSection;
