import { useState } from "react";
import { Menu, X, ArrowLeft, ChevronRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import aiftLogo from "@/assets/aift-logo.png";

const sectionKeys = [
  "overview",
  "documents",
  "signup",
  "login",
  "account",
  "corporate",
  "corpAddress",
  "personal",
  "homeAddress",
  "review",
  "consent",
  "twoFactor",
  "faq",
] as const;

type SectionKey = (typeof sectionKeys)[number];

const sectionIcons: Record<SectionKey, string> = {
  overview: "📋",
  documents: "📄",
  signup: "✍️",
  login: "🔑",
  account: "👤",
  corporate: "🏢",
  corpAddress: "📍",
  personal: "🙍",
  homeAddress: "🏠",
  review: "📊",
  consent: "📝",
  twoFactor: "🔐",
  faq: "❓",
};

// Steps config per section (how many STEP blocks to show)
const sectionSteps: Partial<Record<SectionKey, number>> = {
  overview: 5,
  documents: 3,
  signup: 4,
  login: 3,
  account: 5,
  corporate: 4,
  corpAddress: 3,
  personal: 4,
  homeAddress: 3,
  review: 3,
  consent: 3,
  twoFactor: 4,
  faq: 0,
};

const EcbGuide = () => {
  const [active, setActive] = useState<SectionKey>("overview");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { t } = useLanguage();

  const handleNav = (key: SectionKey) => {
    setActive(key);
    setDrawerOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const stepCount = sectionSteps[active] ?? 0;

  return (
    <div className="min-h-screen bg-background text-foreground flex">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col w-[260px] min-h-screen border-r border-border bg-[hsl(270_100%_4%)] fixed top-0 left-0 z-40">
        <div className="p-6 border-b border-border">
          <a href="/" className="flex items-center gap-3">
            <img src={aiftLogo} alt="AIFT" className="h-7" />
          </a>
          <p className="text-xs text-white-40 mt-2">{t("guide.sidebarTitle")}</p>
        </div>

        <nav className="flex-1 overflow-y-auto py-4">
          {sectionKeys.map((key) => (
            <button
              key={key}
              onClick={() => handleNav(key)}
              className={`w-full text-left px-5 py-2.5 text-sm flex items-center gap-3 transition-colors relative ${
                active === key
                  ? "text-foreground bg-[hsl(285_74%_61%/0.12)]"
                  : "text-white-80 hover:text-foreground hover:bg-[hsl(285_74%_61%/0.06)]"
              }`}
            >
              {active === key && (
                <span className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-6 rounded-r bg-primary" />
              )}
              <span>{sectionIcons[key]}</span>
              <span>{t(`guide.nav.${key}`)}</span>
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-border">
          <a
            href="/"
            className="flex items-center gap-2 text-sm text-white-80 hover:text-foreground transition-colors"
          >
            <ArrowLeft size={14} />
            {t("guide.backHome")}
          </a>
        </div>
      </aside>

      {/* Mobile top bar */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 h-14 bg-background/95 backdrop-blur-xl border-b border-border flex items-center justify-between px-4">
        <a href="/" className="flex items-center gap-2">
          <img src={aiftLogo} alt="AIFT" className="h-6" />
          <span className="text-xs text-white-40">{t("guide.sidebarTitle")}</span>
        </a>
        <button onClick={() => setDrawerOpen(!drawerOpen)} className="text-foreground">
          {drawerOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile drawer */}
      {drawerOpen && (
        <div className="lg:hidden fixed inset-0 z-40 bg-background/95 backdrop-blur-xl pt-14 overflow-y-auto">
          <nav className="py-4">
            {sectionKeys.map((key) => (
              <button
                key={key}
                onClick={() => handleNav(key)}
                className={`w-full text-left px-6 py-3 text-sm flex items-center gap-3 transition-colors ${
                  active === key ? "text-primary bg-[hsl(285_74%_61%/0.1)]" : "text-white-80"
                }`}
              >
                <span>{sectionIcons[key]}</span>
                <span>{t(`guide.nav.${key}`)}</span>
              </button>
            ))}
          </nav>
          <div className="px-6 py-4 border-t border-border">
            <a href="/" className="flex items-center gap-2 text-sm text-white-80">
              <ArrowLeft size={14} />
              {t("guide.backHome")}
            </a>
          </div>
        </div>
      )}

      {/* Main content area */}
      <main className="flex-1 lg:ml-[260px] pt-14 lg:pt-0">
        {/* Breadcrumb */}
        <div className="sticky top-0 lg:top-0 z-30 bg-background/90 backdrop-blur-md border-b border-border px-6 lg:px-10 py-3">
          <div className="flex items-center gap-2 text-xs text-white-40">
            <a href="/" className="hover:text-foreground transition-colors">
              {t("guide.breadcrumb.home")}
            </a>
            <ChevronRight size={12} />
            <span>{t("guide.breadcrumb.manual")}</span>
            <ChevronRight size={12} />
            <span className="text-foreground">{t(`guide.nav.${active}`)}</span>
          </div>
        </div>

        {/* Content */}
        <div className="px-6 lg:px-10 py-10 max-w-4xl">
          <h1 className="font-heading-cn text-2xl lg:text-[32px] text-foreground mb-4">
            {t(`guide.nav.${active}`)}
          </h1>
          <p className="text-white-40 text-sm leading-[1.9] mb-8">
            {t(`guide.${active}.desc`)}
          </p>

          <div className="border-b border-[hsl(285_74%_55%/0.2)] mb-8" />

          {/* Steps */}
          {stepCount > 0 &&
            Array.from({ length: stepCount }, (_, i) => (
              <div key={i} className="mb-10 animate-fade-up" style={{ animationDelay: `${i * 100}ms` }}>
                <div className="inline-block gradient-primary text-foreground text-xs font-bold px-4 py-1.5 rounded mb-4">
                  STEP {String(i + 1).padStart(2, "0")}
                </div>
                <h3 className="text-foreground text-base font-medium mb-2">
                  {t(`guide.${active}.step${i + 1}.title`)}
                </h3>
                <p className="text-white-40 text-sm leading-[1.9] mb-4">
                  {t(`guide.${active}.step${i + 1}.desc`)}
                </p>

                {/* Image placeholder */}
                <div className="border-2 border-dashed border-[hsl(285_74%_55%/0.3)] rounded-lg h-48 flex items-center justify-center text-white-40 text-sm">
                  [ {t("guide.imgPlaceholder")} ]
                </div>

                {i < stepCount - 1 && (
                  <div className="border-b border-[hsl(285_74%_55%/0.15)] mt-8" />
                )}
              </div>
            ))}

          {/* FAQ section */}
          {active === "faq" && (
            <div className="space-y-6">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="card-glass rounded-lg p-5">
                  <h3 className="text-foreground text-sm font-medium mb-2">
                    {t(`guide.faq.q${i}`)}
                  </h3>
                  <p className="text-white-40 text-sm leading-[1.9]">
                    {t(`guide.faq.a${i}`)}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default EcbGuide;
