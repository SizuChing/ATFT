import { useState, useEffect, useRef } from "react";
// Review section assets: result-02, result-03, result-05
import {
  X, ChevronRight, ChevronDown, Menu, LayoutGrid, Building, PiggyBank, TrendingUp, ArrowLeft,
  ClipboardList, FileText, PenLine, KeyRound, User, Building2,
  MapPin, UserRound, Home, BarChart3, ScrollText, ShieldCheck, HelpCircle,
  type LucideIcon,
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useEcbGuide } from "@/contexts/EcbGuideContext";
import aiftLogo from "@/assets/aift-logo.png";
import passportImg from "@/assets/passport.webp";
import selfieImg from "@/assets/selfie.webp";
import step02Img from "@/assets/step02-signup.webp";
import step03Img from "@/assets/step03-signup.webp";
import auth01Img from "@/assets/auth-01.webp";
import auth02Img from "@/assets/auth-02.webp";
import auth03Img from "@/assets/auth-03.webp";
import auth04Img from "@/assets/auth-04.webp";
import auth05Img from "@/assets/auth-05.webp";
import agree01Img from "@/assets/agree-01.webp";
import agree02Img from "@/assets/agree-02.webp";
import agree03Img from "@/assets/agree-03.webp";
import deposit01Asset from "@/assets/deposit_01.png.asset.json";
import deposit02Asset from "@/assets/deposit_02.png.asset.json";
import deposit03Asset from "@/assets/deposit_03.png.asset.json";
import deposit04Asset from "@/assets/deposit_04.png.asset.json";
import deposit05Asset from "@/assets/deposit_05.png.asset.json";
import deposit06Asset from "@/assets/deposit_06.png.asset.json";
import deposit07Asset from "@/assets/deposit_07.png.asset.json";
import deposit08Asset from "@/assets/deposit_08.png.asset.json";
import deposit09Asset from "@/assets/deposit_09.png.asset.json";
import deposit10Asset from "@/assets/deposit_10.png.asset.json";
const depositImgs: Record<number, string> = {
  1: deposit01Asset.url, 2: deposit02Asset.url, 3: deposit03Asset.url,
  4: deposit04Asset.url, 5: deposit05Asset.url, 6: deposit06Asset.url,
  7: deposit07Asset.url, 8: deposit08Asset.url, 9: deposit09Asset.url,
  10: deposit10Asset.url,
};
const result02Img = "/images/result-02.webp";
const result03Img = "/images/result-03.webp";
const result05Img = "/images/result-05.webp";
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
  "depositIntro", "depositSteps",
  "fundIntro", "fundSteps",
] as const;

type SectionKey = (typeof sectionKeys)[number];
type ActivePage = "index" | SectionKey;

const sectionIcons: Record<SectionKey, LucideIcon> = {
  overview: ClipboardList, documents: FileText, signup: PenLine, login: KeyRound,
  account: User, corporate: Building2, corpAddress: MapPin, personal: UserRound,
  homeAddress: Home, review: BarChart3, consent: ScrollText, twoFactor: ShieldCheck, faq: HelpCircle,
  depositIntro: ClipboardList, depositSteps: PiggyBank,
  fundIntro: ClipboardList, fundSteps: TrendingUp,
};

type GroupKey = "ecb" | "deposit" | "fund";

const groups: { key: GroupKey; icon: LucideIcon; sections: SectionKey[] }[] = [
  {
    key: "ecb",
    icon: Building,
    sections: [
      "overview", "documents", "signup", "login", "account",
      "corporate", "corpAddress", "personal", "homeAddress",
      "review", "consent", "twoFactor", "faq",
    ],
  },
  { key: "deposit", icon: PiggyBank, sections: ["depositIntro", "depositSteps"] },
  { key: "fund",    icon: TrendingUp, sections: ["fundIntro", "fundSteps"] },
];

const sectionGroup = (sec: SectionKey): GroupKey => {
  for (const g of groups) if ((g.sections as readonly SectionKey[]).includes(sec)) return g.key;
  return "ecb";
};

const faqCategories = [
  { key: "opening", count: 3 },
  { key: "docs", count: 6 },
  { key: "process", count: 4 },
  { key: "reviewFaq", count: 4 },
  { key: "postApproval", count: 7 },
];

const EcbGuideOverlay = () => {
  const { isOpen, close, initialSection, initialDocTab } = useEcbGuide();
  const [visible, setVisible] = useState(false);
  const [animating, setAnimating] = useState(false);
  const [active, setActive] = useState<ActivePage>("index");
  const [docTab, setDocTab] = useState<"personal" | "corporate">("personal");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [expandedGroup, setExpandedGroup] = useState<GroupKey | null>(null);
  const [openSidebarGroups, setOpenSidebarGroups] = useState<Record<GroupKey, boolean>>({
    ecb: true, deposit: false, fund: false,
  });
  const { t } = useLanguage();
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      setVisible(true);
      requestAnimationFrame(() => setAnimating(true));
      if (initialSection && (sectionKeys as readonly string[]).includes(initialSection)) {
        setActive(initialSection as SectionKey);
        const g = sectionGroup(initialSection as SectionKey);
        setOpenSidebarGroups((prev) => ({ ...prev, [g]: true }));
      }
      if (initialDocTab) {
        setDocTab(initialDocTab);
      }
    } else {
      setAnimating(false);
      const timer = setTimeout(() => {
        setVisible(false);
      setActive("index");
      setDrawerOpen(false);
      setExpandedGroup(null);
      }, 400);
      return () => clearTimeout(timer);
    }
  }, [isOpen, initialSection, initialDocTab]);

  if (!visible) return null;

  const handleNav = (key: ActivePage) => {
    setActive(key);
    setDrawerOpen(false);
    if (key !== "index") {
      const g = sectionGroup(key as SectionKey);
      setOpenSidebarGroups((prev) => ({ ...prev, [g]: true }));
    }
    contentRef.current?.scrollTo({ top: 0 });
  };

  const groupSections = active === "index" ? [] : groups.find((g) => g.key === sectionGroup(active as SectionKey))!.sections;
  const idx = active === "index" ? -1 : groupSections.indexOf(active as SectionKey);
  const prev = idx > 0 ? groupSections[idx - 1] : null;
  const next = idx >= 0 && idx < groupSections.length - 1 ? groupSections[idx + 1] : null;

  const tryT = (key: string) => {
    const val = t(key);
    return val === key ? null : val;
  };

  /* ── Shared UI helpers ── */
  const Img = () => (
    <div
      className="border-2 border-dashed rounded-lg py-10 text-center text-[13px] my-4"
      style={{
        borderColor: "rgba(35,117,197,0.5)",
        background: "rgba(35,117,197,0.04)",
        color: "rgba(35,117,197,0.6)",
      }}
    >
      {t("guide.imgPlaceholder")}
    </div>
  );

  const Label = ({ num, prefix = "STEP" }: { num: number; prefix?: string }) => (
    <div
      className="inline-block font-mono text-xs font-bold text-white px-3.5 py-1 rounded mb-4"
      style={{ background: "#2375C5" }}
    >
      {prefix} {String(num).padStart(2, "0")}
    </div>
  );

  const Note = ({ text }: { text: string }) => (
    <p className="text-[#666666] text-xs leading-[1.8] mt-1">※ {text}</p>
  );

  const Divider = () => <div className="border-b border-[#EEEEEE] my-8" />;

  const renderNavBtns = () => {
    // Deposit & Fund custom navigation
    if (active === "depositIntro") {
      return (
        <div className="flex justify-between items-center mt-12 pt-6 border-t border-[rgba(35,117,197,0.2)]">
          <button onClick={() => handleNav("index")} className="card-glass px-5 py-2.5 rounded-lg text-sm text-white-80 hover:text-foreground transition-colors">
            ← {t("guide.backToHome") || "返回首頁"}
          </button>
          <button onClick={() => handleNav("depositSteps")} className="bg-[#75BE5A] hover:bg-[#65AE4A] px-5 py-2.5 rounded-lg text-sm text-foreground font-medium transition-all">
            {t("guide.nextStep")}：{t("guide.nav.depositSteps")} →
          </button>
        </div>
      );
    }
    if (active === "depositSteps") {
      return (
        <div className="flex justify-between items-center mt-12 pt-6 border-t border-[rgba(35,117,197,0.2)]">
          <button onClick={() => handleNav("index")} className="card-glass px-5 py-2.5 rounded-lg text-sm text-white-80 hover:text-foreground transition-colors">
            ← {t("guide.backToHome") || "返回首頁"}
          </button>
          <button onClick={() => handleNav("fundIntro")} className="bg-[#75BE5A] hover:bg-[#65AE4A] px-5 py-2.5 rounded-lg text-sm text-foreground font-medium transition-all">
            {t("guide.nextStep")}：{t("guide.group.fund.title")} →
          </button>
        </div>
      );
    }
    if (active === "fundIntro") {
      return (
        <div className="flex justify-between items-center mt-12 pt-6 border-t border-[rgba(35,117,197,0.2)]">
          <button onClick={() => handleNav("depositSteps")} className="card-glass px-5 py-2.5 rounded-lg text-sm text-white-80 hover:text-foreground transition-colors">
            ← {t("guide.nav.depositSteps")}
          </button>
          <button onClick={() => handleNav("fundSteps")} className="bg-[#75BE5A] hover:bg-[#65AE4A] px-5 py-2.5 rounded-lg text-sm text-foreground font-medium transition-all">
            {t("guide.nextStep")}：{t("guide.nav.fundSteps")} →
          </button>
        </div>
      );
    }
    if (active === "fundSteps") {
      return (
        <div className="flex justify-between items-center mt-12 pt-6 border-t border-[rgba(35,117,197,0.2)]">
          <button onClick={() => handleNav("depositIntro")} className="card-glass px-5 py-2.5 rounded-lg text-sm text-white-80 hover:text-foreground transition-colors">
            ← {t("guide.group.deposit.title")}
          </button>
          <button onClick={() => handleNav("index")} className="bg-[#75BE5A] hover:bg-[#65AE4A] px-5 py-2.5 rounded-lg text-sm text-foreground font-medium transition-all">
            {t("guide.backToHome") || "返回首頁"} →
          </button>
        </div>
      );
    }

    // Special 3-button layout for "account" section (branching to personal or corporate)
    if (active === "account") {
      return (
        <div className="flex justify-between items-start mt-12 pt-6 border-t border-[rgba(35,117,197,0.2)]">
          <button onClick={() => handleNav("signup")} className="card-glass px-5 py-2.5 rounded-lg text-sm text-white-80 hover:text-foreground transition-colors">
            ← {t("guide.nav.signup")}
          </button>
          <div className="flex flex-col gap-2 items-end">
            <button onClick={() => handleNav("personal")} className="bg-[#75BE5A] hover:bg-[#65AE4A] px-5 py-2.5 rounded-lg text-sm text-foreground font-medium hover:opacity-90 transition-all">
              {t("guide.acc.navPersonal")} →
            </button>
            <button onClick={() => handleNav("corporate")} className="border border-[#2375C5]/60 px-5 py-2.5 rounded-lg text-sm text-[#2375C5] hover:bg-[#2375C5]/10 transition-all">
              {t("guide.acc.navCorporate")} →
            </button>
          </div>
        </div>
      );
    }

    // Special 3-button layout for "personal" section
    if (active === "personal") {
      return (
        <div className="flex justify-between items-start mt-12 pt-6 border-t border-[rgba(35,117,197,0.2)]">
          <div className="flex flex-col gap-2">
            <button onClick={() => handleNav("account")} className="card-glass px-5 py-2.5 rounded-lg text-sm text-white-80 hover:text-foreground transition-colors">
              ← {t("guide.nav.account")}
            </button>
            <button onClick={() => handleNav("corpAddress")} className="card-glass px-5 py-2.5 rounded-lg text-sm text-white-80 hover:text-foreground transition-colors">
              ← {t("guide.nav.corpAddress")}
            </button>
          </div>
          <button onClick={() => handleNav("homeAddress")} className="bg-[#75BE5A] hover:bg-[#65AE4A] px-5 py-2.5 rounded-lg text-sm text-foreground font-medium hover:opacity-90 transition-all">
            {t("guide.nextStep")}：{t("guide.nav.homeAddress")} →
          </button>
        </div>
      );
    }

    return (
      <div className="flex justify-between items-center mt-12 pt-6 border-t border-[rgba(35,117,197,0.2)]">
        {prev ? (
          <button onClick={() => handleNav(prev)} className="card-glass px-5 py-2.5 rounded-lg text-sm text-white-80 hover:text-foreground transition-colors">
            ← {t(`guide.nav.${prev}`)}
          </button>
        ) : <div />}
        {next ? (
          <button onClick={() => handleNav(next)} className="bg-[#75BE5A] hover:bg-[#65AE4A] px-5 py-2.5 rounded-lg text-sm text-foreground font-medium hover:opacity-90 transition-all">
            {t("guide.nextStep")}：{t(`guide.nav.${next}`)} →
          </button>
        ) : <div />}
      </div>
    );
  };

  const renderSteps = (prefix: string, count: number, imgAfter: number[] = [], imgMap: Record<number, string> = {}) => (
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
            {imgAfter.includes(n) && (imgMap[n] ? <img src={imgMap[n]} alt={`Step ${n}`} className="rounded-lg my-4 max-w-md w-full" /> : <Img />)}
            {n < count && <Divider />}
          </div>
        );
      })}
    </>
  );

  /* ── Helper: render text with {highlighted} portions in red ── */
  const renderHighlighted = (text: string) => {
    const parts = text.split(/(\{[^}]+\})/g);
    return parts.map((part, i) => {
      if (part.startsWith("{") && part.endsWith("}")) {
        return <span key={i} className="text-[#F87171] font-medium">{part.slice(1, -1)}</span>;
      }
      return part;
    });
  };

  const HighlightedNote = ({ text }: { text: string }) => (
    <p className="text-white-40 text-xs leading-[1.8] mt-1">※ {renderHighlighted(text)}</p>
  );

  /* ── Custom DOC rendering with red-highlighted text ── */
  const renderDocCustom = (n: number) => {
    if (n === 1) {
      return (
        <div className="mb-8">
          <Label num={n} prefix="DOC" />
          <h3 className="text-foreground text-base font-medium mb-2">{t("guide.doc.d1.t")}</h3>
          <p className="text-white-40 text-sm leading-[1.9] whitespace-pre-line">{t("guide.doc.d1.d")}</p>
          <Note text={t("guide.doc.d1.n1")} />
          <Note text={t("guide.doc.d1.n2")} />
          <Note text={t("guide.doc.d1.n3")} />
          <img src={passportImg} alt="Passport example" className="rounded-lg my-4 max-w-xs" />
        </div>
      );
    }
    if (n === 2) {
      return (
        <div className="mb-8">
          <Label num={n} prefix="DOC" />
          <h3 className="text-foreground text-base font-medium mb-2">{t("guide.doc.d2.t")}</h3>
          <p className="text-white-40 text-sm leading-[1.9] whitespace-pre-line">{t("guide.doc.d2.d")}</p>
          <Note text={t("guide.doc.d2.n1")} />
          <Note text={t("guide.doc.d2.n2")} />
          <Note text={t("guide.doc.d2.n3")} />
          <img src={selfieImg} alt="Selfie example" className="rounded-lg my-4 max-w-[200px]" />
        </div>
      );
    }
    if (n === 3) {
      return (
        <div className="mb-8">
          <Label num={n} prefix="DOC" />
          <h3 className="text-foreground text-base font-medium mb-2">{t("guide.doc.d3.t")}</h3>
          <p className="text-white-40 text-sm leading-[1.9] mb-2">{t("guide.doc.d3.d")}</p>
          {[1, 2, 3, 4, 5].map((li) => {
            const item = tryT(`guide.doc.d3.i${li}`);
            return item ? <p key={li} className="text-white-40 text-sm leading-[1.9] ml-4">• {item}</p> : null;
          })}
          <HighlightedNote text={t("guide.doc.d3.n1")} />
          <HighlightedNote text={t("guide.doc.d3.n2")} />
          <HighlightedNote text={t("guide.doc.d3.n3")} />
        </div>
      );
    }
    if (n === 4) {
      return (
        <div className="mb-8">
          <Label num={n} prefix="DOC" />
          <h3 className="text-foreground text-base font-medium mb-2">{t("guide.doc.d4.t")}</h3>
          <p className="text-white-40 text-sm leading-[1.9] mb-2">{t("guide.doc.d4.d")}</p>
          <HighlightedNote text={t("guide.doc.d4.n1")} />
          <HighlightedNote text={t("guide.doc.d4.n2")} />
        </div>
      );
    }
    if (n === 5) {
      return (
        <div className="mb-8">
          <Label num={n} prefix="DOC" />
          <h3 className="text-foreground text-base font-medium mb-2">{t("guide.doc.d5.t")}</h3>
          <p className="text-white-40 text-sm leading-[1.9] mb-2">{t("guide.doc.d5.d")}</p>
          {[1, 2, 3].map((li) => {
            const item = tryT(`guide.doc.d5.i${li}`);
            return item ? <p key={li} className="text-white-40 text-sm leading-[1.9] ml-4">• {item}</p> : null;
          })}
          <HighlightedNote text={t("guide.doc.d5.n1")} />
          <HighlightedNote text={t("guide.doc.d5.n2")} />
          <HighlightedNote text={t("guide.doc.d5.n3")} />
        </div>
      );
    }
    return null;
  };

  const renderDocs = (docs: number[]) => (
    <>
      {docs.map((n, i) => {
        const custom = renderDocCustom(n);
        if (custom) return <div key={n}>{custom}{i < docs.length - 1 && <Divider />}</div>;
        return (
          <div key={n} className="mb-8">
            <Label num={n} prefix="DOC" />
            <h3 className="text-foreground text-base font-medium mb-2">{t(`guide.doc.d${n}.t`)}</h3>
            <p className="text-white-40 text-sm leading-[1.9] whitespace-pre-line">{t(`guide.doc.d${n}.d`)}</p>
            {[1, 2, 3, 4, 5].map((li) => {
              const item = tryT(`guide.doc.d${n}.i${li}`);
              return item ? <p key={li} className="text-white-40 text-sm leading-[1.9] ml-4">• {item}</p> : null;
            })}
            {[1, 2, 3].map((ni) => {
              const note = tryT(`guide.doc.d${n}.n${ni}`);
              return note ? <Note key={ni} text={note} /> : null;
            })}
            <Img />
            {i < docs.length - 1 && <Divider />}
          </div>
        );
      })}
    </>
  );

  const renderBullets = (prefix: string, count: number) => (
    <>
      {Array.from({ length: count }, (_, i) => {
        const item = tryT(`${prefix}.li${i + 1}`);
        return item ? <p key={i} className="text-white-40 text-sm leading-[1.9] ml-4">• {item}</p> : null;
      })}
    </>
  );

  const renderOverview = () => {
    const steps = [1, 2, 3, 4];
    return (
      <>
        {steps.map((n, i) => (
          <div key={n} className="mb-8">
            <Label num={n} />
            <h3 className="text-foreground text-base font-medium mb-2">{t(`guide.ov.s${n}.t`)}</h3>
            <p className="text-white-40 text-sm leading-[1.9] whitespace-pre-line">
              {t(`guide.ov.s${n}.d`)}
            </p>
            {n === 3 && (
              <p className="text-white-40 text-sm leading-[1.9] mt-2">
                {t("guide.ov.s3.warn1")}
                <span className="text-red-500 font-medium">{t("guide.ov.s3.warn2")}</span>
                。
              </p>
            )}
            {[1, 2, 3].map((ni) => {
              const note = tryT(`guide.ov.s${n}.n${ni}`);
              return note ? <Note key={ni} text={note} /> : null;
            })}
            {i < steps.length - 1 && <Divider />}
          </div>
        ))}
      </>
    );
  };

  const scrollToStep = (stepNum: number) => {
    const el = document.getElementById(`review-step-${stepNum}`);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const sectionLinkMap: Record<string, SectionKey> = {
    link1: "corporate",
    link2: "corpAddress",
    link3: "personal",
    link4: "homeAddress",
  };

  const renderReview = () => (
    <>
      <p className="text-white-40 text-sm leading-[1.9] mb-6">{t("guide.rev.intro")}</p>

      {/* STEP 01 */}
      <div id="review-step-1" className="mb-8">
        <Label num={1} />
        <h3 className="text-foreground text-base font-medium mb-2">{t("guide.rev.s1.t")}</h3>
        <p className="text-white-40 text-sm leading-[1.9] whitespace-pre-line mb-3">{t("guide.rev.s1.d")}</p>
        <p className="text-white-40 text-sm leading-[1.9] ml-4">• {t("guide.rev.s1.approved")}</p>
        <p className="text-white-40 text-sm leading-[1.9] ml-4">• {t("guide.rev.s1.rejected")}</p>
        <div className="mt-3 space-y-1">
          <p>
            <button onClick={() => scrollToStep(5)} className="text-[#4ADE80] font-medium text-sm hover:underline underline-offset-2">
              {t("guide.rev.s1.goApproved")}
            </button>
          </p>
          <p>
            <button onClick={() => scrollToStep(2)} className="text-[#F87171] font-medium text-sm hover:underline underline-offset-2">
              {t("guide.rev.s1.goRejected")}
            </button>
          </p>
        </div>
      </div>
      <Divider />

      {/* STEP 02 - red title */}
      <div id="review-step-2" className="mb-8">
        <Label num={2} />
        <h3 className="text-[#F87171] text-base font-medium mb-2">{t("guide.rev.s2.t")}</h3>
        <p className="text-white-40 text-sm leading-[1.9] whitespace-pre-line">{t("guide.rev.s2.d")}</p>
        <p className="text-white-40 text-xs leading-[1.8] mt-1">
          ※ {t("guide.rev.s2.n1").replace("「登入（Login）」", "").replace("「ログイン（Login）」", "").replace("\"Login\"", "")}
          <button onClick={() => handleNav("login")} className="text-[#2375C5] underline underline-offset-2 hover:opacity-80">
            {t("guide.nav.login")}
          </button>
        </p>
        <img src={result02Img} alt="Step 02" className="rounded-lg my-4 max-w-md w-full" />
      </div>
      <Divider />

      {/* STEP 03 */}
      <div id="review-step-3" className="mb-8">
        <Label num={3} />
        <h3 className="text-foreground text-base font-medium mb-2">{t("guide.rev.s3.t")}</h3>
        <p className="text-white-40 text-sm leading-[1.9] whitespace-pre-line">
          {t("guide.rev.s3.d").split("「Rejected」").map((part, i, arr) =>
            i < arr.length - 1 ? (
              <span key={i}>{part}<span className="text-[#F87171] font-medium">「Rejected」</span></span>
            ) : part
          )}
        </p>
        <img src={result03Img} alt="Step 03" className="rounded-lg my-4 max-w-md w-full" />
      </div>
      <Divider />

      {/* STEP 04 */}
      <div id="review-step-4" className="mb-8">
        <Label num={4} />
        <h3 className="text-foreground text-base font-medium mb-2">{t("guide.rev.s4.t")}</h3>
        <p className="text-white-40 text-sm leading-[1.9] whitespace-pre-line mb-3">{t("guide.rev.s4.d")}</p>
        <div className="ml-4 space-y-1">
          {(["link1", "link2", "link3", "link4"] as const).map((lk) => (
            <p key={lk}>
              <button onClick={() => handleNav(sectionLinkMap[lk])} className="text-[#2375C5] text-sm underline underline-offset-2 hover:opacity-80">
                • {t(`guide.rev.s4.${lk}`)}
              </button>
            </p>
          ))}
        </div>
        <p className="text-[#F87171] font-medium text-sm mt-3">{t("guide.rev.s4.warn")}</p>
      </div>
      <Divider />

      {/* STEP 05 */}
      <div id="review-step-5" className="mb-8">
        <Label num={5} />
        <h3 className="text-foreground text-base font-medium mb-2">{t("guide.rev.s5.t")}</h3>
        <p className="text-white-40 text-sm leading-[1.9] whitespace-pre-line">{t("guide.rev.s5.d")}</p>
        <p className="text-white-40 text-xs leading-[1.8] mt-1">
          ※ {t("guide.rev.s5.n1").replace("「登入（Login）」", "").replace("「ログイン（Login）」", "").replace("\"Login\"", "")}
          <button onClick={() => handleNav("login")} className="text-[#2375C5] underline underline-offset-2 hover:opacity-80">
            {t("guide.nav.login")}
          </button>
        </p>
        <img src={result05Img} alt="Step 05" className="rounded-lg my-4 max-w-md w-full" />
      </div>
    </>
  );

  const addressImgs = [
    "/images/address-01.webp",
    "/images/address-02.webp",
    "/images/address-03.webp",
    "/images/address-04.webp",
    "/images/address-05.webp",
  ];

  const individualImgs = [
    "/images/individual-01.webp",
    "/images/individual-02.webp",
    "/images/individual-03.webp",
    "/images/individual-04.webp",
    "/images/individual-05.webp",
  ];

  const corpAddressImgs = [
    "/images/corp-address-01.webp",
    "/images/corp-address-02.webp",
    "/images/corp-address-03.webp",
    "/images/corp-address-04.webp",
  ];

  const corporateImgs = [
    "/images/corporate-01.webp",
    "/images/corporate-02.webp",
    "/images/corporate-03.webp",
  ];

  const registerImages = [
    "/images/register-01.webp",
    "/images/register-02.webp",
    "/images/register-03.webp",
    "/images/register-04.webp",
  ];

  const renderAccount = () => (
    <>
      {/* STEP 01 */}
      <div className="mb-8">
        <Label num={1} />
        <h3 className="text-foreground text-base font-medium mb-2">{t("guide.acc.s1.t")}</h3>
        <p className="text-white-40 text-sm leading-[1.9] whitespace-pre-line">{t("guide.acc.s1.d")}</p>
        <Note text={t("guide.acc.s1.n1")} />
        <img src={registerImages[0]} alt="Step 1" className="rounded-lg my-4 max-w-md w-full" />
      </div>
      <Divider />
      {/* STEP 02 */}
      <div className="mb-8">
        <Label num={2} />
        <h3 className="text-foreground text-base font-medium mb-2">{t("guide.acc.s2.t")}</h3>
        <p className="text-white-40 text-sm leading-[1.9] whitespace-pre-line mb-4">{t("guide.acc.s2.d")}</p>
        <div className="card-glass rounded-lg overflow-hidden mb-4">
          <table className="w-full text-sm">
            <tbody>
              {[1, 2, 3].map((fi) => (
                <tr key={fi} className="border-b border-[rgba(35,117,197,0.1)] last:border-b-0">
                  <td className="px-4 py-3 font-mono text-foreground whitespace-nowrap">{t(`guide.acc.s2.f${fi}`)}</td>
                  <td className="px-4 py-3 text-white-40">{t(`guide.acc.s2.f${fi}d`)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-[#F87171] text-xs leading-[1.8]">※ {t("guide.acc.s2.warn")}</p>
        <Note text={t("guide.acc.s2.n1")} />
        <img src={registerImages[1]} alt="Step 2" className="rounded-lg my-4 max-w-md w-full" />
      </div>
      <Divider />
      {/* STEP 03 */}
      <div className="mb-8">
        <Label num={3} />
        <h3 className="text-foreground text-base font-medium mb-2">{t("guide.acc.s3.t")}</h3>
        <p className="text-white-40 text-sm leading-[1.9] whitespace-pre-line">{t("guide.acc.s3.d")}</p>
        <img src={registerImages[2]} alt="Step 3" className="rounded-lg my-4 max-w-md w-full" />
      </div>
      <Divider />
      {/* STEP 04 */}
      <div className="mb-8">
        <Label num={4} />
        <h3 className="text-foreground text-base font-medium mb-2">{t("guide.acc.s4.t")}</h3>
        <p className="text-white-40 text-sm leading-[1.9] whitespace-pre-line mb-4">{t("guide.acc.s4.d")}</p>
        <div className="space-y-2 ml-4">
          <p className="text-white-40 text-sm">• {t("guide.acc.s4.type1")}</p>
          <p className="text-white-40 text-sm">• {t("guide.acc.s4.type2")}</p>
        </div>
        <img src={registerImages[3]} alt="Step 4" className="rounded-lg my-4 max-w-md w-full" />
      </div>
    </>
  );

  const renderCorporate = () => (
    <>
      <p className="text-white-40 text-xs leading-[1.8] mb-6">※ {t("guide.corp.topNote")}</p>

      {/* STEP 01 */}
      <div className="mb-8">
        <Label num={1} />
        <h3 className="text-foreground text-base font-medium mb-2">{t("guide.corp.s1.t")}</h3>
        <p className="text-white-40 text-sm leading-[1.9] mb-2">{t("guide.corp.s1.d")}</p>
        <img src={corporateImgs[0]} alt="Step 01" className="rounded-lg my-4 max-w-md w-full" />
      </div>
      <Divider />

      {/* STEP 02 */}
      <div className="mb-8">
        <Label num={2} />
        <h3 className="text-foreground text-base font-medium mb-2">{t("guide.corp.s2.t")}</h3>
        <p className="text-white-40 text-sm leading-[1.9] mb-3">{t("guide.corp.s2.d")}</p>
        <p className="text-xs leading-[1.8] mt-1">
          <span className="text-red-500 font-medium">※ {t("guide.corp.s2.n1")}</span>
        </p>
        <img src={corporateImgs[1]} alt="Step 02" className="rounded-lg my-4 max-w-md w-full" />
      </div>
      <Divider />

      {/* STEP 03 */}
      <div className="mb-8">
        <Label num={3} />
        <h3 className="text-foreground text-base font-medium mb-2">{t("guide.corp.s3.t")}</h3>
        <p className="text-white-40 text-sm leading-[1.9] mb-3">{t("guide.corp.s3.d")}</p>
        <p className="text-xs leading-[1.8] mt-1">
          <span className="text-red-500 font-medium">※ {t("guide.corp.s3.n1")}</span>
        </p>
        <p className="text-xs leading-[1.8] mt-1">
          <span className="text-red-500 font-medium">※ {t("guide.corp.s3.n2")}</span>
        </p>
        <p className="text-xs leading-[1.8] mt-1">
          <span className="text-red-500 font-medium">※ {t("guide.corp.s3.n3")}</span>
        </p>
        <img src={corporateImgs[2]} alt="Step 03" className="rounded-lg my-4 max-w-md w-full" />
      </div>
    </>
  );

  const renderCorpAddress = () => (
    <>
      <p className="text-white-40 text-xs leading-[1.8] mb-6">※ {t("guide.ca.topNote")}</p>

      {/* STEP 01 */}
      <div className="mb-8">
        <Label num={1} />
        <h3 className="text-foreground text-base font-medium mb-2">{t("guide.ca.s1.t")}</h3>
        <p className="text-white-40 text-sm leading-[1.9] mb-2">{t("guide.ca.s1.d")}</p>
        <img src={corpAddressImgs[0]} alt="Step 01" className="rounded-lg my-4 max-w-md w-full" />
      </div>
      <Divider />

      {/* STEP 02 */}
      <div className="mb-8">
        <Label num={2} />
        <h3 className="text-foreground text-base font-medium mb-2">{t("guide.ca.s2.t")}</h3>
        <p className="text-white-40 text-sm leading-[1.9] mb-3">{t("guide.ca.s2.d")}</p>
        <div className="card-glass rounded-lg p-4 mb-3 space-y-1">
          {[1, 2, 3, 4, 5].map((fi) => (
            <p key={fi} className="text-white-40 text-sm leading-[1.9]">{t(`guide.ca.s2.f${fi}`)}</p>
          ))}
        </div>
        <p className="text-muted-foreground text-xs leading-[1.8] mt-2">⚠️ {t("guide.ca.s2.optional")}</p>
        <img src={corpAddressImgs[1]} alt="Step 02" className="rounded-lg my-4 max-w-md w-full" />
      </div>
      <Divider />

      {/* STEP 03 */}
      <div className="mb-8">
        <Label num={3} />
        <h3 className="text-foreground text-base font-medium mb-2">{t("guide.ca.s3.t")}</h3>
        <p className="text-white-40 text-sm leading-[1.9] mb-3">{t("guide.ca.s3.d")}</p>
        <div className="ml-4 space-y-1">
          {[1, 2, 3].map((di) => (
            <p key={di} className="text-white-40 text-sm leading-[1.9]">• {t(`guide.ca.s3.doc${di}`)}</p>
          ))}
        </div>
        <p className="text-xs leading-[1.8] mt-3">
          <span className="text-red-500 font-medium">※ {t("guide.ca.s3.n1")}</span>
        </p>
        <p className="text-xs leading-[1.8] mt-1">
          <span className="text-red-500 font-medium">※ {t("guide.ca.s3.n2")}</span>
        </p>
        <img src={corpAddressImgs[2]} alt="Step 03" className="rounded-lg my-4 max-w-md w-full" />
      </div>
      <Divider />

      {/* STEP 04 */}
      <div className="mb-8">
        <Label num={4} />
        <h3 className="text-foreground text-base font-medium mb-2">{t("guide.ca.s4.t")}</h3>
        <p className="text-white-40 text-sm leading-[1.9] mb-3">{t("guide.ca.s4.d")}</p>
        <p className="text-xs leading-[1.8] mt-1">
          <span className="text-red-500 font-medium">※ {t("guide.ca.s4.n1")}</span>
        </p>
        <p className="text-xs leading-[1.8] mt-1">
          <span className="text-red-500 font-medium">※ {t("guide.ca.s4.n2")}</span>
        </p>
        <p className="text-xs leading-[1.8] mt-1">
          <span className="text-red-500 font-medium">※ {t("guide.ca.s4.n3")}</span>
        </p>
        <img src={corpAddressImgs[3]} alt="Step 04" className="rounded-lg my-4 max-w-md w-full" />
      </div>
    </>
  );

  const renderPersonal = () => (
    <>
      {/* Top note */}
      <p className="text-white-40 text-xs leading-[1.8] mb-6">※ {t("guide.per.topNote")}</p>

      {/* STEP 01 */}
      <div className="mb-8">
        <Label num={1} />
        <h3 className="text-foreground text-base font-medium mb-2">{t("guide.per.s1.t")}</h3>
        <p className="text-white-40 text-sm leading-[1.9] mb-2">{t("guide.per.s1.d")}</p>
        <p className="text-white-40 text-sm leading-[1.9] ml-4">• {t("guide.per.s1.personal")}</p>
        <p className="text-white-40 text-sm leading-[1.9] ml-4">• {t("guide.per.s1.corporate")}</p>
        <img src={individualImgs[0]} alt="Step 01" className="rounded-lg my-4 max-w-md w-full" />
      </div>
      <Divider />

      {/* STEP 02 */}
      <div className="mb-8">
        <Label num={2} />
        <h3 className="text-foreground text-base font-medium mb-2">{t("guide.per.s2.t")}</h3>
        <p className="text-white-40 text-sm leading-[1.9] mb-3">{t("guide.per.s2.d")}</p>
        <div className="card-glass rounded-lg p-4 mb-3 space-y-1">
          {[1, 2, 3, 4, 5].map((fi) => (
            <p key={fi} className="text-white-40 text-sm leading-[1.9]">{t(`guide.per.s2.f${fi}`)}</p>
          ))}
        </div>
        <img src={individualImgs[1]} alt="Step 02" className="rounded-lg my-4 max-w-md w-full" />
      </div>
      <Divider />

      {/* STEP 03 */}
      <div className="mb-8">
        <Label num={3} />
        <h3 className="text-foreground text-base font-medium mb-2">{t("guide.per.s3.t")}</h3>
        <p className="text-white-40 text-sm leading-[1.9] mb-3">{t("guide.per.s3.d")}</p>
        <div className="card-glass rounded-lg p-4 mb-3 space-y-1">
          {[1, 2].map((fi) => (
            <p key={fi} className="text-white-40 text-sm leading-[1.9]">{t(`guide.per.s3.f${fi}`)}</p>
          ))}
        </div>
        <img src={individualImgs[2]} alt="Step 03" className="rounded-lg my-4 max-w-md w-full" />
      </div>
      <Divider />

      {/* STEP 04 */}
      <div className="mb-8">
        <Label num={4} />
        <h3 className="text-foreground text-base font-medium mb-2">{t("guide.per.s4.t")}</h3>
        <p className="text-white-40 text-sm leading-[1.9] mb-3">{t("guide.per.s4.d")}</p>
        <p className="text-xs leading-[1.8] mt-1">
          <span className="text-red-500 font-medium">※ {t("guide.per.s4.n1")}</span>
        </p>
        <p className="text-white-40 text-xs leading-[1.8] mt-1">※ {t("guide.per.s4.n2")}</p>
        <p className="text-white-40 text-xs leading-[1.8] mt-1">※ {t("guide.per.s4.n3")}</p>
        <p className="text-white-40 text-xs leading-[1.8] mt-1">※ {t("guide.per.s4.n4")}</p>
        <img src={individualImgs[3]} alt="Step 04" className="rounded-lg my-4 max-w-md w-full" />
      </div>
      <Divider />

      {/* STEP 05 */}
      <div className="mb-8">
        <Label num={5} />
        <h3 className="text-foreground text-base font-medium mb-2">{t("guide.per.s5.t")}</h3>
        <p className="text-white-40 text-sm leading-[1.9] mb-3">{t("guide.per.s5.d")}</p>
        <p className="text-xs leading-[1.8] mt-1">
          <span className="text-red-500 font-medium">※ {t("guide.per.s5.n1")}</span>
        </p>
        <p className="text-xs leading-[1.8] mt-1">
          <span className="text-red-500 font-medium">※ {t("guide.per.s5.n2")}</span>
        </p>
        <p className="text-white-40 text-xs leading-[1.8] mt-1">※ {t("guide.per.s5.n3")}</p>
        <img src={individualImgs[4]} alt="Step 05" className="rounded-lg my-4 max-w-md w-full" />
      </div>
    </>
  );

  const renderHomeAddress = () => (
    <>
      {/* Top note */}
      <p className="text-white-40 text-xs leading-[1.8] mb-6">※ {t("guide.ha.topNote")}</p>

      {/* STEP 01 */}
      <div className="mb-8">
        <Label num={1} />
        <h3 className="text-foreground text-base font-medium mb-2">{t("guide.ha.s1.t")}</h3>
        <p className="text-white-40 text-sm leading-[1.9] mb-2">{t("guide.ha.s1.d")}</p>
        <p className="text-white-40 text-sm leading-[1.9] ml-4">• {t("guide.ha.s1.personal")}</p>
        <p className="text-white-40 text-sm leading-[1.9] ml-4">• {t("guide.ha.s1.corporate")}</p>
        <img src={addressImgs[0]} alt="Step 01" className="rounded-lg my-4 max-w-md w-full" />
      </div>
      <Divider />

      {/* STEP 02 */}
      <div className="mb-8">
        <Label num={2} />
        <h3 className="text-foreground text-base font-medium mb-2">{t("guide.ha.s2.t")}</h3>
        <p className="text-white-40 text-sm leading-[1.9] mb-3">{t("guide.ha.s2.d")}</p>
        <div className="card-glass rounded-lg p-4 mb-3 space-y-1">
          {[1, 2, 3, 4, 5, 6, 7].map((fi) => (
            <p key={fi} className="text-white-40 text-sm leading-[1.9]">{t(`guide.ha.s2.f${fi}`)}</p>
          ))}
        </div>
        <p className="text-muted-foreground text-xs leading-[1.8] mt-2">⚠️ {t("guide.ha.s2.optional")}</p>
        <img src={addressImgs[1]} alt="Step 02" className="rounded-lg my-4 max-w-md w-full" />
      </div>
      <Divider />

      {/* STEP 03 */}
      <div className="mb-8">
        <Label num={3} />
        <h3 className="text-foreground text-base font-medium mb-2">{t("guide.ha.s3.t")}</h3>
        <p className="text-white-40 text-sm leading-[1.9] mb-3">{t("guide.ha.s3.d")}</p>
        <div className="ml-4 space-y-1">
          {[1, 2, 3, 4, 5].map((di) => (
            <p key={di} className="text-white-40 text-sm leading-[1.9]">• {t(`guide.ha.s3.doc${di}`)}</p>
          ))}
        </div>
        <p className="text-xs leading-[1.8] mt-3">
          <span className="text-red-500 font-medium">※ {t("guide.ha.s3.n1")}</span>
        </p>
        <p className="text-xs leading-[1.8] mt-1">
          <span className="text-red-500 font-medium">※ {t("guide.ha.s3.n2")}</span>
        </p>
        <img src={addressImgs[2]} alt="Step 03" className="rounded-lg my-4 max-w-md w-full" />
      </div>
      <Divider />

      {/* STEP 04 */}
      <div className="mb-8">
        <Label num={4} />
        <h3 className="text-foreground text-base font-medium mb-2">{t("guide.ha.s4.t")}</h3>
        <p className="text-white-40 text-sm leading-[1.9] mb-3">{t("guide.ha.s4.d")}</p>
        <p className="text-xs leading-[1.8] mt-1">
          <span className="text-red-500 font-medium">※ {t("guide.ha.s4.n1")}</span>
        </p>
        <p className="text-xs leading-[1.8] mt-1">
          <span className="text-red-500 font-medium">※ {t("guide.ha.s4.n2")}</span>
        </p>
        <p className="text-xs leading-[1.8] mt-1">
          <span className="text-red-500 font-medium">※ {t("guide.ha.s4.n3")}</span>
        </p>
        <img src={addressImgs[3]} alt="Step 04" className="rounded-lg my-4 max-w-md w-full" />
      </div>
      <Divider />

      {/* STEP 05 */}
      <div className="mb-8">
        <Label num={5} />
        <h3 className="text-foreground text-base font-medium mb-2">{t("guide.ha.s5.t")}</h3>
        <p className="text-white-40 text-sm leading-[1.9] mb-3">{t("guide.ha.s5.d")}</p>
        <p className="text-white-40 text-sm leading-[1.9] ml-4">• {t("guide.ha.s5.personal")}</p>
        <p className="text-white-40 text-sm leading-[1.9] ml-4 whitespace-pre-line">• {t("guide.ha.s5.corporate")}</p>
        <p className="text-white-40 text-sm leading-[1.9] mt-3">{t("guide.ha.s5.email")}</p>
        <p className="text-red-500 font-medium text-sm mt-2">※ {t("guide.ha.s5.warn")}</p>
        <img src={addressImgs[4]} alt="Step 05" className="rounded-lg my-4 max-w-md w-full" />
      </div>
    </>
  );

  const renderContent = () => {
    switch (active) {
      case "overview": return renderOverview();
      case "documents":
        return (
          <>
            <div className="flex gap-2 mb-8">
              {(["personal", "corporate"] as const).map((tab) => (
                <button key={tab} onClick={() => setDocTab(tab)}
                  className={`px-5 py-2 rounded-lg text-sm transition-all ${docTab === tab ? "bg-[#75BE5A] hover:bg-[#65AE4A] text-foreground" : "card-glass text-white-80 hover:text-foreground"}`}>
                  {t(`guide.doc.tab.${tab}`)}
                </button>
              ))}
            </div>
            {docTab === "personal" ? renderDocs([1, 2, 3]) : renderDocs([1, 2, 3, 4, 5])}
          </>
        );
      case "signup": return renderSteps("su", 3, [2, 3], { 2: step02Img, 3: step03Img });
      case "login":
        return (
          <>
            {Array.from({ length: 4 }, (_, i) => {
              const n = i + 1;
              return (
                <div key={n} className="mb-8">
                  <Label num={n} />
                  <h3 className="text-foreground text-base font-medium mb-2">{t(`guide.lg.s${n}.t`)}</h3>
                  <p className="text-white-40 text-sm leading-[1.9] whitespace-pre-line">{t(`guide.lg.s${n}.d`)}</p>
                  {n === 3 && (
                    <p className="text-[#F87171] text-xs leading-[1.8] mt-1">※ {t("guide.lg.s3.warn")}</p>
                  )}
                  <img src={`/images/login-0${n}.webp`} alt={`Step ${n}`} className="rounded-lg my-4 max-w-md w-full" />
                  {n < 4 && <Divider />}
                </div>
              );
            })}
          </>
        );
      case "account":
        return renderAccount();
      case "corporate":
        return renderCorporate();
      case "corpAddress":
        return renderCorpAddress();
      case "personal":
        return renderPersonal();
      case "homeAddress":
        return renderHomeAddress();
      case "review":
        return renderReview();
      case "consent":
        return (<><p className="text-white-40 text-sm leading-[1.9] whitespace-pre-line mb-6">{t("guide.con.intro")}</p>{renderSteps("con", 3, [1, 2, 3], { 1: agree01Img, 2: agree02Img, 3: agree03Img })}</>);
      case "twoFactor": return renderSteps("tf", 5, [1, 2, 3, 4, 5], { 1: auth01Img, 2: auth02Img, 3: auth03Img, 4: auth04Img, 5: auth05Img });
      case "depositIntro":
        return (
          <div className="rounded-lg p-5 mb-4" style={{ background: "rgba(35,117,197,0.12)", border: "1px solid rgba(35,117,197,0.35)" }}>
            <p className="text-foreground text-sm leading-[1.9] whitespace-pre-line">⚠️ {t("guide.depositIntro.tip")}</p>
          </div>
        );
      case "depositSteps":
        return (
          <>
            {Array.from({ length: 10 }, (_, i) => {
              const n = i + 1;
              return (
                <div key={n} className="mb-8">
                  <Label num={n} />
                  <h3 className="text-foreground text-base font-medium mb-2">{t(`guide.td.s${n}.t`)}</h3>
                  <p className="text-white-40 text-sm leading-[1.9] whitespace-pre-line">{t(`guide.td.s${n}.d`)}</p>
                  <Img />
                  {n < 10 && <Divider />}
                </div>
              );
            })}
          </>
        );
      case "fundIntro":
        return (
          <div className="rounded-lg p-5 mb-4" style={{ background: "rgba(35,117,197,0.12)", border: "1px solid rgba(35,117,197,0.35)" }}>
            <p className="text-foreground text-sm leading-[1.9] whitespace-pre-line">⚠️ {t("guide.fundIntro.tip")}</p>
          </div>
        );
      case "fundSteps":
        return (
          <>
            {Array.from({ length: 13 }, (_, i) => {
              const n = i + 1;
              return (
                <div key={n} className="mb-8">
                  <Label num={n} />
                  <h3 className="text-foreground text-base font-medium mb-2">{t(`guide.fd.s${n}.t`)}</h3>
                  <p className="text-white-40 text-sm leading-[1.9] whitespace-pre-line">{t(`guide.fd.s${n}.d`)}</p>
                  {n === 4 && (
                    <div className="card-glass rounded-lg overflow-hidden my-4">
                      <table className="w-full text-sm">
                        <tbody>
                          {["daysElapsed","annualizedReturn","units","price","totalCapital","cumulativeProfit","currentRoi","annualizedReturn2"].map((k) => (
                            <tr key={k} className="border-b border-[rgba(35,117,197,0.1)] last:border-b-0">
                              <td className="px-4 py-3 font-mono text-foreground whitespace-nowrap">{t(`guide.fd.s4.${k}.t`)}</td>
                              <td className="px-4 py-3 text-white-40">{t(`guide.fd.s4.${k}.d`)}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                  {n === 6 && (
                    <>
                      <p className="text-[#F87171] text-xs leading-[1.8] mt-2">※ {t("guide.fd.s6.warn")}</p>
                      <div className="rounded-lg p-4 my-4" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}>
                        <p className="text-foreground text-sm font-medium mb-2">{t("guide.fd.s6.exTitle")}</p>
                        <p className="text-white-40 text-sm leading-[1.9] whitespace-pre-line">{t("guide.fd.s6.exBody")}</p>
                      </div>
                    </>
                  )}
                  <Img />
                  {n < 13 && <Divider />}
                </div>
              );
            })}
          </>
        );
      case "faq":
        return (
          <div className="space-y-8">
            {faqCategories.map((cat, ci) => (
              <div key={cat.key}>
                <h3 className="text-[#2375C5] font-bold text-sm mb-3">{t(`guide.faq.c${ci + 1}.t`)}</h3>
                <Accordion type="multiple" className="space-y-2">
                  {Array.from({ length: cat.count }, (_, qi) => (
                    <AccordionItem key={qi} value={`${cat.key}-${qi}`} className="card-glass rounded-lg border-none overflow-hidden">
                      <AccordionTrigger className="px-5 py-3 text-sm text-foreground hover:bg-[rgba(35,117,197,0.08)] hover:no-underline [&[data-state=open]>svg]:rotate-180">
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
      default: return null;
    }
  };

  const sidebarNav = (mobile = false) => (
    <nav className={mobile ? "py-4" : "flex-1 overflow-y-auto py-4"}>
      {/* Index / Home button */}
      <button onClick={() => handleNav("index")}
        className={`w-full text-left ${mobile ? "px-6 py-3" : "px-5 py-2.5"} text-sm flex items-center gap-3 transition-colors relative ${
          active === "index"
            ? `text-${mobile ? "primary" : "foreground"} bg-[rgba(35,117,197,0.12)]`
            : "text-white-80 hover:text-foreground hover:bg-[rgba(35,117,197,0.06)]"
        }`}>
        {!mobile && active === "index" && (
          <span className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-6 rounded-r bg-[#2375C5]" />
        )}
        <LayoutGrid size={16} />
        <span>{t("guide.nav.index")}</span>
      </button>
      <div className={`border-b border-[rgba(35,117,197,0.3)] ${mobile ? "mx-6 my-2" : "mx-5 my-2"}`} />
      {groups.map((g) => {
        const GIcon = g.icon;
        const open = openSidebarGroups[g.key];
        return (
          <div key={g.key} className="mb-1">
            <button
              onClick={() => setOpenSidebarGroups((prev) => ({ ...prev, [g.key]: !prev[g.key] }))}
              className={`w-full text-left ${mobile ? "px-6 py-3" : "px-5 py-3"} flex items-center gap-3 transition-colors text-foreground font-bold text-sm`}
              style={{ background: "rgba(255,255,255,0.06)" }}
            >
              <GIcon size={16} className="text-[#2375C5]" />
              <span className="flex-1">{t(`guide.group.${g.key}.title`)}</span>
              <ChevronDown size={14} className="transition-transform" style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)" }} />
            </button>
            {open && g.sections.map((key) => {
              const Icon = sectionIcons[key];
              return (
                <button key={key} onClick={() => handleNav(key)}
                  className={`w-full text-left ${mobile ? "pl-10 pr-6 py-2.5" : "pl-9 pr-5 py-2"} text-sm flex items-center gap-3 transition-colors relative ${
                    active === key
                      ? `text-${mobile ? "primary" : "foreground"} bg-[rgba(35,117,197,0.12)]`
                      : "text-white-80 hover:text-foreground hover:bg-[rgba(35,117,197,0.06)]"
                  }`}>
                  {!mobile && active === key && (
                    <span className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-6 rounded-r bg-[#2375C5]" />
                  )}
                  <Icon size={14} />
                  <span>{t(`guide.nav.${key}`)}</span>
                </button>
              );
            })}
          </div>
        );
      })}
    </nav>
  );

  return (
    <div
      className="ecb-theme fixed inset-0 z-[9999] flex bg-[#1A2F4A] text-foreground"
      style={{
        transform: animating ? "translateX(0)" : "translateX(100%)",
        transition: "transform 0.4s ease",
      }}
    >
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col w-[260px] min-h-screen border-r border-[rgba(35,117,197,0.3)] bg-[#1E3A5C]">
        <div className="p-6 border-b border-[rgba(35,117,197,0.3)]">
          <div className="flex items-center gap-3">
            <img src={aiftLogo} alt="AIFT" className="h-7" />
          </div>
          <p className="text-xs text-white-40 mt-2">{t("guide.sidebarTitle")}</p>
        </div>
        {sidebarNav()}
        <div className="p-4 border-t border-[rgba(35,117,197,0.3)]">
          <button onClick={close} className="flex items-center gap-2 text-sm text-white-80 hover:text-foreground transition-colors">
            <X size={14} />
            {t("guide.close") || "關閉"}
          </button>
        </div>
      </aside>

      {/* Mobile top bar */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 h-14 bg-[#1E3A5C]/95 backdrop-blur-xl border-b border-[rgba(35,117,197,0.3)] flex items-center justify-between px-4">
        <button onClick={() => handleNav("index")} className="flex items-center gap-2">
          <img src={aiftLogo} alt="AIFT" className="h-6" />
          <span className="text-xs text-white-40">{t("guide.sidebarTitle")}</span>
        </button>
        <div className="flex items-center gap-3">
          <button onClick={() => setDrawerOpen(!drawerOpen)} className="text-foreground">
            {drawerOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
          <button onClick={close} className="text-white-80 hover:text-foreground text-sm flex items-center gap-1">
            <X size={16} /> {t("guide.close") || "關閉"}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {drawerOpen && (
        <div className="lg:hidden fixed inset-0 z-40 bg-[#1E3A5C]/95 backdrop-blur-xl pt-14 overflow-y-auto">
          {sidebarNav(true)}
        </div>
      )}

      {/* Main content */}
      <main ref={contentRef} className="flex-1 overflow-y-auto pt-14 lg:pt-0">
        {/* Breadcrumb */}
        <div className="sticky top-0 z-30 bg-[#1E3A5C]/90 backdrop-blur-md border-b border-[rgba(35,117,197,0.3)] px-6 lg:px-10 py-3">
          <div className="flex items-center gap-2 text-xs text-[#64CFC3]">
            <button onClick={close} className="hover:text-foreground transition-colors">{t("guide.breadcrumb.home")}</button>
            <ChevronRight size={12} />
            <button onClick={() => handleNav("index")} className="hover:text-foreground transition-colors">{t("guide.breadcrumb.manual")}</button>
            {active !== "index" && (
              <>
                <ChevronRight size={12} />
                <span className="text-foreground">{t(`guide.nav.${active}`)}</span>
              </>
            )}
          </div>
        </div>

        {active === "index" ? (
          <div className="px-6 lg:px-10 py-8 max-w-3xl mx-auto">
            <div key="index" className="animate-fade-up">
              {/* Index header */}
              <div className="text-center mb-6">
                <h1 className="font-heading-cn text-3xl lg:text-[40px] text-foreground mb-2 tracking-tight leading-[1.1]">
                  {t("guide.index.title")}
                </h1>
                <p className="text-[#2375C5] text-lg lg:text-xl font-medium mb-3">
                  {t("guide.index.subtitle")}
                </p>
                <p className="text-white-40 text-sm leading-relaxed">
                  {t("guide.index.desc1")}<br />
                  {t("guide.index.desc2")}
                </p>
              </div>

              {/* 3 category big cards */}
              {!expandedGroup && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {groups.map((g) => {
                    const GIcon = g.icon;
                    return (
                      <button
                        key={g.key}
                        onClick={() => setExpandedGroup(g.key)}
                        className="group relative text-left transition-all duration-[250ms] hover:-translate-y-1 overflow-hidden"
                        style={{
                          background: "#FFFFFF",
                          border: "1px solid #E0E4EA",
                          borderRadius: 12,
                          padding: 32,
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.borderColor = "#2375C5";
                          e.currentTarget.style.background = "#F0F4FA";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.borderColor = "#E0E4EA";
                          e.currentTarget.style.background = "#FFFFFF";
                        }}
                      >
                        <span className="absolute left-0 top-0 bottom-0 w-1" style={{ background: "#2375C5" }} />
                        <GIcon size={40} className="text-[#2375C5] mb-4" />
                        <h3 className="text-[#333333] font-bold mb-1" style={{ fontSize: 18 }}>{t(`guide.group.${g.key}.title`)}</h3>
                        <p className="text-[#666666]" style={{ fontSize: 13 }}>{t(`guide.group.${g.key}.sub`)}</p>
                      </button>
                    );
                  })}
                </div>
              )}

              {/* Sub-cards for expanded group */}
              {expandedGroup && (
                <div>
                  <button
                    onClick={() => setExpandedGroup(null)}
                    className="flex items-center gap-2 text-sm text-white-80 hover:text-foreground transition-colors mb-4"
                  >
                    <ArrowLeft size={14} /> {t("guide.backToCats") || "返回分類"}
                  </button>
                  <h2 className="text-foreground text-xl font-bold mb-4">{t(`guide.group.${expandedGroup}.title`)}</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                    {groups.find((g) => g.key === expandedGroup)!.sections.map((key) => {
                      const Icon = sectionIcons[key];
                      return (
                        <button
                          key={key}
                          onClick={() => handleNav(key)}
                          className="group flex items-center gap-3 h-14 px-5 rounded-lg text-left transition-all duration-[250ms] hover:-translate-y-[3px]"
                          style={{ background: "#FFFFFF", border: "1px solid #E0E4EA" }}
                          onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#2375C5"; e.currentTarget.style.background = "#F0F4FA"; }}
                          onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#E0E4EA"; e.currentTarget.style.background = "#FFFFFF"; }}
                        >
                          <Icon size={20} className="text-[#2375C5] shrink-0" />
                          <span className="text-[#333333] text-sm font-medium">{t(`guide.nav.${key}`)}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="px-6 lg:px-10 py-10 max-w-4xl">
            <h1 className="font-heading-cn text-2xl lg:text-[32px] text-foreground mb-2">
              {t(`guide.${active}.pt`)}
            </h1>
            <p className="text-white-40 text-sm leading-[1.9] mb-6">{t(`guide.${active}.desc`)}</p>
            <div className="border-b border-[rgba(35,117,197,0.2)] mb-8" />

            <div key={active} className="animate-fade-up">
              {renderContent()}
            </div>

            {renderNavBtns()}
          </div>
        )}
      </main>
    </div>
  );
};

export default EcbGuideOverlay;
