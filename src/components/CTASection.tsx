import { Landmark, FileText } from "lucide-react";
import { useScrollFadeUp } from "@/hooks/useScrollFadeUp";
import { useLanguage } from "@/contexts/LanguageContext";

const CTASection = () => {
  const ref = useScrollFadeUp();
  const { t } = useLanguage();

  return (
    <section className="py-20 lg:py-32 px-6 lg:px-12">
      <div ref={ref} className="max-w-4xl mx-auto text-center opacity-0">
        <h2 className="font-heading-cn text-2xl sm:text-3xl lg:text-4xl text-foreground mb-4">{t("cta.title")}</h2>
        <p className="text-white-80 text-sm sm:text-base max-w-xl mx-auto mb-8 leading-relaxed">
          {t("cta.desc1")}<br />{t("cta.desc2")}
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <a href="https://www.europecharteredbank.com/home.html" target="_blank" rel="noopener noreferrer"
            className="gradient-primary text-foreground px-8 py-3 rounded-full glow-box hover:-translate-y-0.5 transition-all duration-200 flex items-center gap-2">
            <Landmark size={18} /> {t("cta.btn1")}
          </a>
          <a href="/ecb-guide" target="_blank" rel="noopener noreferrer"
            className="card-glass text-white-80 px-8 py-3 rounded-full hover:text-foreground hover:-translate-y-0.5 transition-all duration-200 flex items-center gap-2">
            <FileText size={18} /> {t("cta.btn2")}
          </a>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
