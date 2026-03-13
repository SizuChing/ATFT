import { useScrollFadeUp } from "@/hooks/useScrollFadeUp";
import { useLanguage } from "@/contexts/LanguageContext";
import ecbLogo from "@/assets/partner-ecb.png";
import binanceLogo from "@/assets/partner-binance.png";
import coinwLogo from "@/assets/partner-coinw.png";

const PartnersSection = () => {
  const ref = useScrollFadeUp();
  const { t } = useLanguage();

  const partners = [
    { logo: ecbLogo, nameKey: "partners.ecb.name", descKey: "partners.ecb.desc" },
    { logo: binanceLogo, nameKey: "partners.binance.name", descKey: "partners.binance.desc" },
    { logo: coinwLogo, nameKey: "partners.coinw.name", descKey: "partners.coinw.desc" },
  ];

  return (
    <section id="partners" className="py-20 lg:py-32 px-6 lg:px-12" style={{ background: "hsl(270 100% 6%)" }}>
      <div ref={ref} className="max-w-7xl mx-auto opacity-0">
        <div className="text-center mb-12">
          <span className="text-xs tracking-[4px] uppercase text-primary mb-3 block">{t("partners.label")}</span>
          <h2 className="font-heading-cn text-2xl sm:text-3xl lg:text-4xl text-foreground">{t("partners.title")}</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {partners.map((p) => (
            <div key={p.nameKey} className="card-glass rounded-2xl p-8 text-center hover:-translate-y-1 hover:border-primary/50 transition-all duration-300 glow-box-hover">
              <div className="w-16 h-16 rounded-xl bg-muted flex items-center justify-center mx-auto mb-4 overflow-hidden">
                <img src={p.logo} alt={t(p.nameKey)} className="w-full h-full object-contain" />
              </div>
              <h3 className="text-foreground font-medium mb-1">{t(p.nameKey)}</h3>
              <p className="text-white-40 text-sm">{t(p.descKey)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PartnersSection;
