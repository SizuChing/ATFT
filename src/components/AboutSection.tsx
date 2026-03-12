import { Brain, Globe, Shield } from "lucide-react";
import { useScrollFadeUp } from "@/hooks/useScrollFadeUp";
import { useLanguage } from "@/contexts/LanguageContext";
import aiftHexagon from "@/assets/aift-hexagon.png";

const AboutSection = () => {
  const ref = useScrollFadeUp();
  const { t } = useLanguage();

  const features = [
    { icon: Brain, titleKey: "about.feat1.title", descKey: "about.feat1.desc" },
    { icon: Globe, titleKey: "about.feat2.title", descKey: "about.feat2.desc" },
    { icon: Shield, titleKey: "about.feat3.title", descKey: "about.feat3.desc" },
  ];

  return (
    <section id="about" className="py-20 lg:py-32 px-6 lg:px-12">
      <div ref={ref} className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-20 opacity-0">
        <div className="flex-shrink-0 flex items-center justify-center">
          <img src={aiftHexagon} alt="AIFT" className="w-48 h-48 lg:w-64 lg:h-64 animate-pulse-glow object-contain" />
        </div>

        <div className="flex-1">
          <span className="text-xs tracking-[4px] uppercase text-primary mb-3 block">{t("about.label")}</span>
          <h2 className="font-heading-cn text-2xl sm:text-3xl lg:text-4xl text-foreground mb-4">{t("about.title")}</h2>
          <p className="text-white-80 text-sm sm:text-base leading-relaxed mb-8">{t("about.desc")}</p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {features.map((f) => (
              <div key={f.titleKey} className="card-glass rounded-xl p-5 hover:-translate-y-1 hover:border-primary/50 transition-all duration-300 glow-box-hover">
                <f.icon className="w-8 h-8 text-primary mb-3" />
                <h3 className="text-foreground text-sm font-medium mb-1">{t(f.titleKey)}</h3>
                <p className="text-white-40 text-xs">{t(f.descKey)}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
