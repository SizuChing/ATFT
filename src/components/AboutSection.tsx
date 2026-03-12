import { Brain, Globe, Shield } from "lucide-react";
import { useScrollFadeUp } from "@/hooks/useScrollFadeUp";
import { useLanguage } from "@/contexts/LanguageContext";
import aiftHexagonLogo from "@/assets/aift-hexagon-logo.png";

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
          <svg className="w-48 h-48 lg:w-64 lg:h-64" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="hexFill" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#00E5E5" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#00C8C8" stopOpacity="0.1" />
              </linearGradient>
              <filter id="hexGlow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="12" result="blur1" />
                <feGaussianBlur stdDeviation="4" in="SourceGraphic" result="blur2" />
                <feMerge>
                  <feMergeNode in="blur1" />
                  <feMergeNode in="blur2" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <clipPath id="hexClip">
                <polygon points="100,10 185,55 185,145 100,190 15,145 15,55" />
              </clipPath>
            </defs>
            <polygon
              points="100,10 185,55 185,145 100,190 15,145 15,55"
              fill="url(#hexFill)"
              stroke="#00E5E5"
              strokeWidth="2.5"
              filter="url(#hexGlow)"
            />
            <image
              href={aiftHexagonLogo}
              x="30" y="30"
              width="140" height="140"
              clipPath="url(#hexClip)"
              preserveAspectRatio="xMidYMid meet"
            />
          </svg>
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
