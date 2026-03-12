import { useLanguage } from "@/contexts/LanguageContext";
import aiftLogo from "@/assets/aift-logo.png";

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="border-t border-border py-12 px-6 lg:px-12" style={{ background: "hsl(270 100% 3%)" }}>
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          <div>
            <img src={aiftLogo} alt="AIFT" className="h-8" />
            <p className="text-white-40 text-xs mt-2 leading-relaxed">
              Al Financial Technologies Ltd.<br />{t("footer.brand.desc")}
            </p>
          </div>
          <div>
            <h4 className="text-foreground text-sm font-medium mb-3">{t("footer.col.trading")}</h4>
            <ul className="space-y-2">
              <li><a href="#products" className="text-white-40 text-xs hover:text-foreground transition-colors">{t("footer.link.contract")}</a></li>
              <li><a href="#products" className="text-white-40 text-xs hover:text-foreground transition-colors">{t("footer.link.spot")}</a></li>
              <li><a href="#how-it-works" className="text-white-40 text-xs hover:text-foreground transition-colors">{t("footer.link.howItWorks")}</a></li>
              <li><a href="#risk" className="text-white-40 text-xs hover:text-foreground transition-colors">{t("footer.link.risk")}</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-foreground text-sm font-medium mb-3">{t("footer.col.partners")}</h4>
            <ul className="space-y-2">
              <li><a href="https://www.europecharteredbank.com/home.html" target="_blank" rel="noopener noreferrer" className="text-white-40 text-xs hover:text-foreground transition-colors">Europe Chartered Bank</a></li>
              <li><a href="#partners" className="text-white-40 text-xs hover:text-foreground transition-colors">Binance</a></li>
              <li><a href="#partners" className="text-white-40 text-xs hover:text-foreground transition-colors">CoinW</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-foreground text-sm font-medium mb-3">{t("footer.col.about")}</h4>
            <ul className="space-y-2">
              <li><a href="#about" className="text-white-40 text-xs hover:text-foreground transition-colors">{t("footer.link.aboutAift")}</a></li>
              <li><a href="#ecb" className="text-white-40 text-xs hover:text-foreground transition-colors">{t("footer.link.ecb")}</a></li>
              <li><a href="https://ecb-apply.support-banking.com/" target="_blank" rel="noopener noreferrer" className="text-white-40 text-xs hover:text-foreground transition-colors">{t("footer.link.ecbManual")}</a></li>
            </ul>
          </div>
        </div>

        <div className="border border-destructive/30 rounded-lg p-4 mb-6">
          <p className="text-destructive text-xs leading-relaxed">{t("footer.risk")}</p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-white-40 text-xs">
          <p>{t("footer.copyright")}</p>
          <p className="italic">{t("footer.slogan")}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
