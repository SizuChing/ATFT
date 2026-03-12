import { useState, useEffect } from "react";
import { Menu, X, Globe } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import aiftLogo from "@/assets/aift-logo.png";
import type { Locale } from "@/i18n/translations";

const navLinks = [
  { key: "nav.about", href: "#about" },
  { key: "nav.products", href: "#products" },
  { key: "nav.howItWorks", href: "#how-it-works" },
  { key: "nav.risk", href: "#risk" },
  { key: "nav.ecb", href: "#ecb" },
  { key: "nav.partners", href: "#partners" },
];

const localeLabels: Record<Locale, string> = {
  "zh-TW": "繁中",
  en: "EN",
  ja: "日本語",
};

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const { locale, setLocale, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 h-[70px] flex items-center justify-between px-6 lg:px-12 transition-all duration-300 border-b border-border ${
          scrolled ? "bg-background/95 backdrop-blur-[20px]" : "bg-background/85 backdrop-blur-[20px]"
        }`}
      >
        <div className="flex items-center gap-3">
          <span className="font-display text-2xl tracking-wider text-foreground">AIFT</span>
          <span className="hidden sm:block text-white-40 text-xs">AI Financial Technology Ltd.</span>
        </div>

        {/* Desktop nav */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-white-80 hover:text-foreground transition-colors duration-200"
            >
              {t(link.key)}
            </a>
          ))}

          {/* Language switcher */}
          <div className="relative">
            <button
              onClick={() => setLangOpen(!langOpen)}
              className="flex items-center gap-1.5 text-sm text-white-80 hover:text-foreground transition-colors"
            >
              <Globe size={15} />
              {localeLabels[locale]}
            </button>
            {langOpen && (
              <div className="absolute top-full right-0 mt-2 card-glass rounded-lg py-1 min-w-[100px] shadow-xl">
                {(Object.keys(localeLabels) as Locale[]).map((l) => (
                  <button
                    key={l}
                    onClick={() => { setLocale(l); setLangOpen(false); }}
                    className={`block w-full text-left px-4 py-2 text-sm transition-colors ${
                      l === locale ? "text-primary" : "text-white-80 hover:text-foreground"
                    }`}
                  >
                    {localeLabels[l]}
                  </button>
                ))}
              </div>
            )}
          </div>

          <a
            href="https://www.europecharteredbank.com/home.html"
            target="_blank"
            rel="noopener noreferrer"
            className="gradient-primary text-foreground text-sm px-5 py-2 rounded-full glow-box hover:-translate-y-0.5 transition-all duration-200"
          >
            {t("nav.cta")}
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          className="lg:hidden text-foreground"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile menu overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 bg-background/95 backdrop-blur-xl flex flex-col items-center justify-center gap-8 pt-[70px]">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-xl text-white-80 hover:text-foreground transition-colors"
              onClick={() => setMobileOpen(false)}
            >
              {t(link.key)}
            </a>
          ))}

          {/* Mobile language switcher */}
          <div className="flex gap-3">
            {(Object.keys(localeLabels) as Locale[]).map((l) => (
              <button
                key={l}
                onClick={() => { setLocale(l); setMobileOpen(false); }}
                className={`px-4 py-2 rounded-full text-sm transition-all ${
                  l === locale ? "gradient-primary text-foreground glow-box" : "card-glass text-white-80"
                }`}
              >
                {localeLabels[l]}
              </button>
            ))}
          </div>

          <a
            href="https://www.europecharteredbank.com/home.html"
            target="_blank"
            rel="noopener noreferrer"
            className="gradient-primary text-foreground px-8 py-3 rounded-full glow-box"
          >
            {t("nav.cta")}
          </a>
        </div>
      )}
    </>
  );
};

export default Navbar;
