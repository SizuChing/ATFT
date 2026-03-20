import { useState } from "react";
import {
  Menu, X, ArrowLeft, ChevronRight,
  ClipboardList, FileText, PenLine, KeyRound, User, Building2,
  MapPin, UserRound, Home, BarChart3, ScrollText, ShieldCheck, HelpCircle,
  type LucideIcon,
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import aiftLogo from "@/assets/aift-logo.png";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const sectionKeys = [
  "overview", "documents", "signup", "login", "account",
  "corporate", "corpAddress", "personal", "homeAddress",
  "review", "consent", "twoFactor", "faq",
] as const;

type SectionKey = (typeof sectionKeys)[number];

const sectionIcons: Record<SectionKey, LucideIcon> = {
  overview: ClipboardList, documents: FileText, signup: PenLine, login: KeyRound,
  account: User, corporate: Building2, corpAddress: MapPin, personal: UserRound,
  homeAddress: Home, review: BarChart3, consent: ScrollText, twoFactor: ShieldCheck, faq: HelpCircle,
};

const faqCategories = [
  { key: "opening", count: 3 },
  { key: "docs", count: 6 },
  { key: "process", count: 4 },
  { key: "reviewFaq", count: 4 },
  { key: "postApproval", count: 7 },
];

const EcbGuide = () => {
  const [active, setActive] = useState<SectionKey>("overview");
  const [docTab, setDocTab] = useState<"personal" | "corporate">("personal");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { t } = useLanguage();

  const handleNav = (key: SectionKey) => {
    setActive(key);
    setDrawerOpen(false);
    window.scrollTo({ top: 0 });
  };

  const idx = sectionKeys.indexOf(active);
  const prev = idx > 0 ? sectionKeys[idx - 1] : null;
  const next = idx < sectionKeys.length - 1 ? sectionKeys[idx + 1] : null;

  // Try translation, return null if key is returned as-is (missing)
  const tryT = (key: string) => {
    const val = t(key);
    return val === key ? null : val;
  };

  /* ── Shared UI helpers ── */
  const Img = () => (
    <div
      className="border-2 border-dashed rounded-lg py-10 text-center text-[13px] my-4"
      style={{ borderColor: "rgba(180,60,220,0.4)", color: "rgba(180,60,220,0.6)" }}
    >
      {t("guide.imgPlaceholder")}
    </div>
  );

  const Label = ({ num, prefix = "STEP" }: { num: number; prefix?: string }) => (
    <div
      className="inline-block font-mono text-xs font-bold text-white px-3.5 py-1 rounded mb-4"
      style={{ background: "linear-gradient(135deg, #5B1F8A, #8B3DB8)" }}
    >
      {prefix} {String(num).padStart(2, "0")}
    </div>
  );

  const Note = ({ text }: { text: string }) => (
    <p className="text-white-40 text-xs leading-[1.8] mt-1">※ {text}</p>
  );

  const Divider = () => <div className="border-b border-[hsl(285_74%_55%/0.15)] my-8" />;

  const renderNavBtns = () => (
    <div className="flex justify-between items-center mt-12 pt-6 border-t border-[hsl(285_74%_55%/0.2)]">
      {prev ? (
        <button
          onClick={() => handleNav(prev)}
          className="card-glass px-5 py-2.5 rounded-lg text-sm text-white-80 hover:text-foreground transition-colors"
        >
          ← {t(`guide.nav.${prev}`)}
        </button>
      ) : <div />}
      {next ? (
        <button
          onClick={() => handleNav(next)}
          className="gradient-primary px-5 py-2.5 rounded-lg text-sm text-foreground font-medium hover:opacity-90 transition-all"
        >
          {t("guide.nextStep")}：{t(`guide.nav.${next}`)} →
        </button>
      ) : <div />}
    </div>
  );

  /* ── Step renderer ── */
  const renderSteps = (prefix: string, count: number, imgAfter: number[] = []) => (
    <>
      {Array.from({ length: count }, (_, i) => {
        const n = i + 1;
        return (
          <div key={n} className="mb-8">
            <Label num={n} />
            <h3 className="text-foreground text-base font-medium mb-2">{t(`guide.${prefix}.s${n}.t`)}</h3>
            <p className="text-white-40 text-sm leading-[1.9] whitespace-pre-line">{t(`guide.${prefix}.s${n}.d`)}</p>
            {[1, 2, 3].map((ni) => {
              const note = tryT(`guide.${prefix}.s${n}.n${ni}`);
              return note ? <Note key={ni} text={note} /> : null;
            })}
            {imgAfter.includes(n) && <Img />}
            {n < count && <Divider />}
          </div>
        );
      })}
    </>
  );

  /* ── Doc renderer ── */
  const renderDocs = (docs: number[]) => (
    <>
      {docs.map((n, i) => (
        <div key={n} className="mb-8">
          <Label num={n} prefix="DOC" />
          <h3 className="text-foreground text-base font-medium mb-2">{t(`guide.doc.d${n}.t`)}</h3>
          <p className="text-white-40 text-sm leading-[1.9] whitespace-pre-line">{t(`guide.doc.d${n}.d`)}</p>
          {[1, 2, 3, 4, 5].map((li) => {
            const item = tryT(`guide.doc.d${n}.i${li}`);
            return item ? <p key={li} className="text-white-40 text-sm leading-[1.9] ml-4">• {item}</p> : null;
          })}
          {[1, 2].map((ni) => {
            const note = tryT(`guide.doc.d${n}.n${ni}`);
            return note ? <Note key={ni} text={note} /> : null;
          })}
          <Img />
          {i < docs.length - 1 && <Divider />}
        </div>
      ))}
    </>
  );

  /* ── Bullet list renderer ── */
  const renderBullets = (prefix: string, count: number) => (
    <>
      {Array.from({ length: count }, (_, i) => {
        const item = tryT(`${prefix}.li${i + 1}`);
        return item ? <p key={i} className="text-white-40 text-sm leading-[1.9] ml-4">• {item}</p> : null;
      })}
    </>
  );

  /* ── Content dispatcher ── */
  const renderContent = () => {
    switch (active) {
      case "overview":
        return renderSteps("ov", 4);

      case "documents":
        return (
          <>
            <div className="flex gap-2 mb-8">
              {(["personal", "corporate"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setDocTab(tab)}
                  className={`px-5 py-2 rounded-lg text-sm transition-all ${
                    docTab === tab ? "gradient-primary text-foreground" : "card-glass text-white-80 hover:text-foreground"
                  }`}
                >
                  {t(`guide.doc.tab.${tab}`)}
                </button>
              ))}
            </div>
            {docTab === "personal" ? renderDocs([1, 2, 3]) : renderDocs([1, 2, 3, 4, 5])}
          </>
        );

      case "signup":
        return renderSteps("su", 3, [2, 3]);

      case "login":
        return renderSteps("lg", 2, [1, 2]);

      case "account":
        return (
          <>
            <p className="text-white-40 text-sm leading-[1.9] whitespace-pre-line mb-4">{t("guide.acc.intro")}</p>
            <Img />
          </>
        );

      case "corporate":
        return (
          <>
            <p className="text-white-40 text-sm leading-[1.9] mb-4">{t("guide.corp.intro")}</p>
            {renderBullets("guide.corp", 4)}
            <Img />
          </>
        );

      case "corpAddress":
        return (
          <>
            <p className="text-white-40 text-sm leading-[1.9] mb-4">{t("guide.ca.intro")}</p>
            {renderBullets("guide.ca", 3)}
            <Img />
          </>
        );

      case "personal":
        return (
          <>
            <p className="text-white-40 text-sm leading-[1.9] whitespace-pre-line mb-4">{t("guide.per.intro")}</p>
            <Img />
          </>
        );

      case "homeAddress":
        return (
          <>
            <p className="text-white-40 text-sm leading-[1.9] mb-4">{t("guide.ha.intro")}</p>
            {renderBullets("guide.ha", 5)}
            {tryT("guide.ha.note") && <Note text={t("guide.ha.note")} />}
            <Img />
          </>
        );

      case "review":
        return (
          <>
            <p className="text-white-40 text-sm leading-[1.9] mb-6">{t("guide.rev.intro")}</p>
            <h3 className="text-foreground text-sm font-medium mb-3">{t("guide.rev.statusTitle")}</h3>
            {(["approved", "rejected", "pending"] as const).map((s) => (
              <div key={s} className="card-glass rounded-lg p-4 mb-3">
                <span className={`font-mono text-sm font-bold ${
                  s === "approved" ? "text-[#4ADE80]" : s === "rejected" ? "text-[#F87171]" : "text-yellow-400"
                }`}>
                  {t(`guide.rev.${s}.label`)}
                </span>
                <p className="text-white-40 text-sm mt-1">{t(`guide.rev.${s}.desc`)}</p>
              </div>
            ))}
            <Img />
          </>
        );

      case "consent":
        return (
          <>
            <p className="text-white-40 text-sm leading-[1.9] whitespace-pre-line mb-4">{t("guide.con.intro")}</p>
            <Img />
          </>
        );

      case "twoFactor":
        return renderSteps("tf", 3, [2, 3]);

      case "faq":
        return (
          <div className="space-y-8">
            {faqCategories.map((cat, ci) => (
              <div key={cat.key}>
                <h3 className="text-primary font-bold text-sm mb-3">{t(`guide.faq.c${ci + 1}.t`)}</h3>
                <Accordion type="multiple" className="space-y-2">
                  {Array.from({ length: cat.count }, (_, qi) => (
                    <AccordionItem
                      key={qi}
                      value={`${cat.key}-${qi}`}
                      className="card-glass rounded-lg border-none overflow-hidden"
                    >
                      <AccordionTrigger className="px-5 py-3 text-sm text-foreground hover:bg-[hsl(285_74%_61%/0.08)] hover:no-underline [&[data-state=open]>svg]:rotate-180">
                        {t(`guide.faq.c${ci + 1}.q${qi + 1}`)}
                      </AccordionTrigger>
                      <AccordionContent className="px-5 pb-4 text-white-40 text-sm leading-[1.9]">
                        {t(`guide.faq.c${ci + 1}.a${qi + 1}`)}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            ))}
          </div>
        );

      default:
        return null;
    }
  };

  /* ── Sidebar content (shared between desktop & mobile) ── */
  const sidebarNav = (mobile = false) => (
    <nav className={mobile ? "py-4" : "flex-1 overflow-y-auto py-4"}>
      {sectionKeys.map((key) => (
        <button
          key={key}
          onClick={() => handleNav(key)}
          className={`w-full text-left ${mobile ? "px-6 py-3" : "px-5 py-2.5"} text-sm flex items-center gap-3 transition-colors relative ${
            active === key
              ? `text-${mobile ? "primary" : "foreground"} bg-[hsl(285_74%_61%/0.12)]`
              : "text-white-80 hover:text-foreground hover:bg-[hsl(285_74%_61%/0.06)]"
          }`}
        >
          {!mobile && active === key && (
            <span className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-6 rounded-r bg-primary" />
          )}
          {(() => { const Icon = sectionIcons[key]; return <Icon size={16} />; })()}
          <span>{t(`guide.nav.${key}`)}</span>
        </button>
      ))}
    </nav>
  );

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
        {sidebarNav()}
        <div className="p-4 border-t border-border">
          <a href="/" className="flex items-center gap-2 text-sm text-white-80 hover:text-foreground transition-colors">
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
          {sidebarNav(true)}
          <div className="px-6 py-4 border-t border-border">
            <a href="/" className="flex items-center gap-2 text-sm text-white-80">
              <ArrowLeft size={14} />
              {t("guide.backHome")}
            </a>
          </div>
        </div>
      )}

      {/* Main content */}
      <main className="flex-1 lg:ml-[260px] pt-14 lg:pt-0">
        {/* Breadcrumb */}
        <div className="sticky top-14 lg:top-0 z-30 bg-background/90 backdrop-blur-md border-b border-border px-6 lg:px-10 py-3">
          <div className="flex items-center gap-2 text-xs text-white-40">
            <a href="/" className="hover:text-foreground transition-colors">{t("guide.breadcrumb.home")}</a>
            <ChevronRight size={12} />
            <span>{t("guide.breadcrumb.manual")}</span>
            <ChevronRight size={12} />
            <span className="text-foreground">{t(`guide.nav.${active}`)}</span>
          </div>
        </div>

        <div className="px-6 lg:px-10 py-10 max-w-4xl">
          {/* Page title */}
          <h1 className="font-heading-cn text-2xl lg:text-[32px] text-foreground mb-2">
            {t(`guide.${active}.pt`)}
          </h1>
          <p className="text-white-40 text-sm leading-[1.9] mb-6">{t(`guide.${active}.desc`)}</p>
          <div className="border-b border-[hsl(285_74%_55%/0.2)] mb-8" />

          {/* Content with fade animation on section change */}
          <div key={active} className="animate-fade-up">
            {renderContent()}
          </div>

          {renderNavBtns()}
        </div>
      </main>
    </div>
  );
};

export default EcbGuide;
