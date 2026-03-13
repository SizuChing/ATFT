import { useState, useEffect, useRef, useMemo } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

/* ─── data ─── */
const KLINE_DATA = [
  { tf: "1M", dir: "bear" as const, conf: 68 },
  { tf: "3M", dir: "bull" as const, conf: 72 },
  { tf: "5M", dir: "bull" as const, conf: 79 },
  { tf: "15M", dir: "bear" as const, conf: 82 },
  { tf: "30M", dir: "bear" as const, conf: 77 },
  { tf: "60M", dir: "bull" as const, conf: 81 },
  { tf: "4H", dir: "bear" as const, conf: 74 },
  { tf: "12H", dir: "bear" as const, conf: 88 },
];

type IndicatorItem = { name: string; i18nKey?: string; price: number; decimals: number };
const INDICATOR_GROUPS_DATA: { i18nLabel: string; color: string; items: IndicatorItem[] }[] = [
  { i18nLabel: "dash.ind.crypto", color: "purple", items: [
    { name: "BTC", price: 67432.50, decimals: 2 }, { name: "ETH", price: 3521.80, decimals: 2 },
    { name: "XRP", price: 0.5284, decimals: 4 }, { name: "BNB", price: 584.30, decimals: 2 },
    { name: "SOL", price: 142.65, decimals: 2 }, { name: "DOGE", price: 0.1247, decimals: 4 },
    { name: "ADA", price: 0.4523, decimals: 4 }, { name: "AVAX", price: 35.82, decimals: 2 },
  ]},
  { i18nLabel: "dash.ind.forex", color: "blue", items: [
    { name: "USD/TWD", price: 31.42, decimals: 2 }, { name: "EUR/USD", price: 1.0847, decimals: 4 },
    { name: "USD/JPY", price: 154.32, decimals: 2 }, { name: "GBP/USD", price: 1.2634, decimals: 4 },
    { name: "USD/CNY", price: 7.2451, decimals: 4 }, { name: "USD/CHF", price: 0.8923, decimals: 4 },
    { name: "USD/CAD", price: 1.3642, decimals: 4 }, { name: "USD/KRW", price: 1342.5, decimals: 1 },
  ]},
  { i18nLabel: "dash.ind.commodity", color: "orange", items: [
    { name: "Gold", i18nKey: "dash.ind.gold", price: 2348.60, decimals: 2 },
    { name: "Silver", i18nKey: "dash.ind.silver", price: 27.84, decimals: 2 },
    { name: "Oil", i18nKey: "dash.ind.oil", price: 78.52, decimals: 2 },
    { name: "Gas", i18nKey: "dash.ind.gas", price: 2.134, decimals: 3 },
    { name: "Copper", i18nKey: "dash.ind.copper", price: 4.312, decimals: 3 },
  ]},
  { i18nLabel: "dash.ind.index", color: "green", items: [
    { name: "SP500", price: 5214.08, decimals: 2 }, { name: "NASDAQ", price: 16340.2, decimals: 1 },
    { name: "DOW", price: 38852.3, decimals: 1 }, { name: "DAX", price: 18432.5, decimals: 1 },
    { name: "NIKKEI", price: 38274.0, decimals: 1 }, { name: "TOPIX", price: 2697.1, decimals: 1 },
    { name: "FTSE", price: 8164.3, decimals: 1 },
  ]},
  { i18nLabel: "dash.ind.economic", color: "gray", items: [
    { name: "CPI", price: 3.4, decimals: 1 }, { name: "PPI", price: 2.2, decimals: 1 },
    { name: "GDP", price: 3.1, decimals: 1 }, { name: "VIX", price: 13.45, decimals: 2 },
    { name: "NFP", i18nKey: "dash.ind.nonfarm", price: 272, decimals: 0 },
    { name: "Yield", i18nKey: "dash.ind.yield", price: 4.28, decimals: 2 },
  ]},
];

type TabKey = "prediction" | "indicators" | "voting";

/* ─── helpers ─── */
const TAG_COLORS: Record<string, string> = {
  purple: "bg-purple-500/20 text-purple-300 border-purple-500/40",
  blue: "bg-blue-500/20 text-blue-300 border-blue-500/40",
  orange: "bg-orange-500/20 text-orange-300 border-orange-500/40",
  green: "bg-emerald-500/20 text-emerald-300 border-emerald-500/40",
  gray: "bg-gray-500/20 text-gray-300 border-gray-500/40",
};

const STATUS_COLORS: Record<string, string> = {
  red: "bg-red-500/20 text-red-400 border-red-500/40",
  purple: "bg-purple-500/20 text-purple-300 border-purple-500/40",
  green: "bg-emerald-500/20 text-emerald-300 border-emerald-500/40",
  number: "text-purple-300",
  active: "text-emerald-400",
};

/* ─── seeded random for stable candle data ─── */
function seededRandom(seed: number) {
  let s = seed;
  return () => { s = (s * 16807) % 2147483647; return (s - 1) / 2147483646; };
}

function generateCandleData(seed: number, dir: "bull" | "bear") {
  const rng = seededRandom(seed);
  let price = 40 + rng() * 20;
  const candles = [];
  for (let i = 0; i < 6; i++) {
    const isBull = rng() > 0.45;
    const bodySize = 3 + rng() * 8;
    const wickUp = 1 + rng() * 4;
    const wickDown = 1 + rng() * 4;
    const open = price;
    const close = isBull ? open + bodySize : open - bodySize;
    const high = Math.max(open, close) + wickUp;
    const low = Math.min(open, close) - wickDown;
    candles.push({ open, close, high, low, bull: isBull });
    price = close + (rng() - 0.5) * 3;
  }
  const lastClose = candles[5].close;
  const predBody = 3 + rng() * 6;
  const predOpen = lastClose + (rng() - 0.5) * 2;
  const predClose = dir === "bull" ? predOpen + predBody : predOpen - predBody;
  const predHigh = Math.max(predOpen, predClose) + 1 + rng() * 3;
  const predLow = Math.min(predOpen, predClose) - 1 - rng() * 3;
  candles.push({ open: predOpen, close: predClose, high: predHigh, low: predLow, bull: dir === "bull" });
  return candles;
}

/* ─── useCountUp ─── */
function useCountUp(target: number, duration: number, start: boolean) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!start) return;
    let raf: number;
    const t0 = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - t0) / duration, 1);
      setVal(Math.round(target * p));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, duration, start]);
  return val;
}

/* ─── useInView ─── */
function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

/* ─── Mini K-line SVG ─── */
function MiniKLine({ dir, seed }: { dir: "bull" | "bear"; seed: number }) {
  const candles = useMemo(() => generateCandleData(seed, dir), [seed, dir]);
  const allPrices = candles.flatMap(c => [c.high, c.low]);
  const minP = Math.min(...allPrices);
  const maxP = Math.max(...allPrices);
  const range = maxP - minP || 1;
  const toY = (p: number) => 4 + ((maxP - p) / range) * 52;
  const candleW = 8;
  const gap = 4;
  const svgW = 7 * (candleW + gap) + gap;

  return (
    <svg viewBox={`0 0 ${svgW} 60`} className="w-full h-14">
      {candles.map((c, i) => {
        const x = gap + i * (candleW + gap);
        const isPred = i === 6;
        const bodyTop = toY(Math.max(c.open, c.close));
        const bodyBot = toY(Math.min(c.open, c.close));
        const bodyH = Math.max(bodyBot - bodyTop, 1);
        const wickTop = toY(c.high);
        const wickBot = toY(c.low);
        const color = c.bull ? "#a855f7" : "#4b5563";
        const predColor = c.bull ? "#d946ef" : "#9ca3af";

        if (isPred) {
          return (
            <g key={i}>
              <rect x={x - 2} y={bodyTop - 2} width={candleW + 4} height={bodyH + 4} rx="3"
                fill={c.bull ? "rgba(217,70,239,0.15)" : "rgba(156,163,175,0.1)"} className="animate-[predGlow_1.5s_ease-in-out_infinite]" />
              <line x1={x + candleW / 2} y1={wickTop} x2={x + candleW / 2} y2={wickBot}
                stroke={predColor} strokeWidth="1.2" strokeDasharray="2 2" className="animate-[predBlink_1s_ease-in-out_infinite]" />
              <rect x={x} y={bodyTop} width={candleW} height={bodyH} rx="1.5"
                fill={c.bull ? "rgba(217,70,239,0.3)" : "rgba(107,114,128,0.3)"}
                stroke={predColor} strokeWidth="1.2" strokeDasharray="3 2"
                className="animate-[predBlink_1s_ease-in-out_infinite]" />
              <text x={x + candleW / 2} y={bodyTop - 5} textAnchor="middle" fontSize="6" fill={predColor}
                className="animate-[predBlink_1s_ease-in-out_infinite]">?</text>
            </g>
          );
        }

        return (
          <g key={i}>
            <line x1={x + candleW / 2} y1={wickTop} x2={x + candleW / 2} y2={wickBot}
              stroke={color} strokeWidth="1" />
            <rect x={x} y={bodyTop} width={candleW} height={bodyH} rx="1"
              fill={c.bull ? "#a855f7" : "#4b5563"} stroke={color} strokeWidth="0.5" />
          </g>
        );
      })}
    </svg>
  );
}

/* ─── KLine Card ─── */
function KLineCard({ data, index, visible, active, onClick, seed, bullLabel, bearLabel }: {
  data: typeof KLINE_DATA[0]; index: number; visible: boolean; active: boolean;
  onClick: () => void; seed: number; bullLabel: string; bearLabel: string;
}) {
  const conf = useCountUp(data.conf, 1200, visible);
  const isBull = data.dir === "bull";

  return (
    <div
      onClick={onClick}
      className={`relative cursor-pointer rounded-xl border p-3 transition-all duration-500 
        ${active ? "border-purple-500 shadow-[0_0_20px_rgba(180,60,220,0.6)]" : "border-purple-500/20"}
        bg-[hsl(270,100%,5%)] hover:border-purple-500/50`}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(20px)",
        transitionDelay: `${index * 80}ms`,
      }}
    >
      <div className="text-center font-mono text-xs text-purple-400 mb-1">{data.tf}</div>
      <MiniKLine dir={data.dir} seed={seed} />
      <div className="flex items-center justify-between mt-2">
        <span className={`text-[10px] sm:text-xs font-medium ${isBull ? "text-fuchsia-400" : "text-gray-400"}`}>
          {isBull ? bullLabel : bearLabel}
        </span>
        <span className="font-mono text-sm text-purple-200">{conf}%</span>
      </div>
    </div>
  );
}

/* ─── Indicator Tag ─── */
function IndicatorTag({ item, displayName, color, delay, visible }: {
  item: IndicatorItem; displayName: string; color: string; delay: number; visible: boolean;
}) {
  const [changePct, setChangePct] = useState(() => +(Math.random() * 4 - 1.5).toFixed(2));
  const [price, setPrice] = useState(item.price);

  useEffect(() => {
    const iv = setInterval(() => {
      const delta = (Math.random() * 3 - 1).toFixed(2);
      setChangePct(+delta);
      setPrice(prev => {
        const jitter = prev * (parseFloat(delta) / 100) * 0.3;
        return +(prev + jitter).toFixed(item.decimals);
      });
    }, 3000 + Math.random() * 2000);
    return () => clearInterval(iv);
  }, [item.decimals]);

  const isPositive = changePct >= 0;

  return (
    <div
      className={`inline-flex items-center gap-1 sm:gap-2 rounded-lg border px-1.5 sm:px-2.5 py-1 sm:py-1.5 text-[10px] sm:text-xs transition-all duration-300 ${TAG_COLORS[color]}`}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(8px)",
        transitionDelay: `${delay}ms`,
      }}
    >
      <span className="font-medium whitespace-nowrap">{displayName}</span>
      <span className="font-mono text-[9px] sm:text-[11px] opacity-80 hidden sm:inline">{price.toLocaleString(undefined, { minimumFractionDigits: item.decimals, maximumFractionDigits: item.decimals })}</span>
      <span className={`font-mono text-[9px] sm:text-[10px] transition-colors duration-300 whitespace-nowrap ${isPositive ? "text-emerald-400" : "text-red-400"}`}>
        {isPositive ? "▲" : "▼"}{Math.abs(changePct).toFixed(2)}%
      </span>
    </div>
  );
}

/* ─── Donut Chart ─── */
function DonutChart({ visible, bullPct, bearishLabel, bullishLabel, bearishSignal, bullishSignal }: {
  visible: boolean; bullPct: number;
  bearishLabel: string; bullishLabel: string; bearishSignal: string; bullishSignal: string;
}) {
  const r = 54;
  const c = 2 * Math.PI * r;
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!visible) return;
    let raf: number;
    const t0 = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - t0) / 1200, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setProgress(eased);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [visible]);

  const [displayBull, setDisplayBull] = useState(bullPct);
  useEffect(() => {
    if (progress < 1) return;
    let raf: number;
    const from = displayBull;
    const to = bullPct;
    const t0 = performance.now();
    const dur = 600;
    const tick = (now: number) => {
      const p = Math.min((now - t0) / dur, 1);
      setDisplayBull(from + (to - from) * p);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [bullPct, progress]);

  const activeBull = progress < 1 ? bullPct : displayBull;
  const activeBear = 100 - activeBull;
  const bullLen = (activeBull / 100) * c * progress;
  const bearLen = (activeBear / 100) * c * progress;
  const isBearish = activeBear > activeBull;

  return (
    <div className="relative w-48 h-48 mx-auto">
      <svg viewBox="0 0 128 128" className="w-full h-full -rotate-90">
        <circle cx="64" cy="64" r={r} fill="none" stroke="hsl(270 50% 12%)" strokeWidth="12" />
        <circle cx="64" cy="64" r={r} fill="none" stroke="#d946ef" strokeWidth="12"
          strokeDasharray={`${bullLen} ${c - bullLen}`} strokeLinecap="round" className="transition-all duration-500" />
        <circle cx="64" cy="64" r={r} fill="none" stroke="#6b7280" strokeWidth="12"
          strokeDasharray={`${bearLen} ${c - bearLen}`} strokeDashoffset={`-${bullLen}`} strokeLinecap="round" className="transition-all duration-500" />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className={`text-2xl font-bold transition-colors duration-300 ${isBearish ? "text-red-400" : "text-fuchsia-400"}`}>
          {isBearish ? bearishLabel : bullishLabel}
        </span>
        <span className="text-xs text-gray-400 mt-1">{isBearish ? bearishSignal : bullishSignal}</span>
      </div>
    </div>
  );
}

/* ─── Progress Loop ─── */
function ProgressLoop({ visible, label }: { visible: boolean; label: string }) {
  const [pct, setPct] = useState(0);
  useEffect(() => {
    if (!visible) return;
    const iv = setInterval(() => setPct(p => (p >= 100 ? 0 : p + 0.5)), 50);
    return () => clearInterval(iv);
  }, [visible]);
  return (
    <div className="mt-3">
      <div className="text-xs text-gray-400 mb-1">{label}</div>
      <div className="h-1 w-full rounded-full bg-purple-500/10 overflow-hidden">
        <div className="h-full bg-purple-500/60 rounded-full transition-all duration-100" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

/* ─── StatusCard ─── */
function StatusCard({ label, value, colorCls, index, visible, isNumber, target, isActive }: {
  label: string; value: string; colorCls: string; index: number; visible: boolean;
  isNumber?: boolean; target?: number; isActive?: boolean;
}) {
  const countVal = useCountUp(isNumber ? (target ?? 0) : 0, 1200, visible && !!isNumber);
  const barWidth = useMemo(() => 40 + Math.random() * 50, []);

  return (
    <div
      className="rounded-xl border border-purple-500/20 bg-[hsl(270,100%,5%)] p-3 transition-all duration-500"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(16px)",
        transitionDelay: `${index * 80}ms`,
      }}
    >
      <div className="text-xs text-gray-400 mb-2">{label}</div>
      {isNumber ? (
        <div className="font-mono text-xl text-purple-300">{countVal}%</div>
      ) : isActive ? (
        <div className="flex items-center gap-2 text-emerald-400 text-sm font-medium">
          <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
          Active
        </div>
      ) : (
        <div className={`inline-block rounded-md border px-2 py-0.5 text-sm font-medium ${colorCls}`}>
          {value}
        </div>
      )}
      <div className="mt-3 h-0.5 w-full rounded-full bg-purple-500/10 overflow-hidden">
        <div
          className="h-full bg-purple-500/40 rounded-full transition-all duration-1000 ease-out"
          style={{ width: visible ? `${barWidth}%` : "0%", transitionDelay: `${index * 80 + 400}ms` }}
        />
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════ MAIN ═══════════════════════════════════════════ */
const AIPredictionDashboard = () => {
  const { t } = useLanguage();
  const { ref: sectionRef, visible } = useInView(0.08);
  const [activeCard, setActiveCard] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<TabKey>("prediction");
  const [bullPct, setBullPct] = useState(45);

  useEffect(() => {
    const iv = setInterval(() => {
      setBullPct(prev => {
        const delta = (Math.random() - 0.5) * 4;
        return Math.min(55, Math.max(35, +(prev + delta).toFixed(1)));
      });
    }, 4000);
    return () => clearInterval(iv);
  }, []);

  const TABS = [
    { key: "prediction" as TabKey, label: "Prediction", sub: t("dash.tab.prediction") },
    { key: "indicators" as TabKey, label: "Indicators", sub: t("dash.tab.indicators") },
    { key: "voting" as TabKey, label: "Voting", sub: t("dash.tab.voting") },
  ];

  const statusCards = [
    { label: t("dash.status.direction"), value: t("dash.status.direction.v"), colorCls: STATUS_COLORS.red },
    { label: t("dash.status.strength"), value: t("dash.status.strength.v"), colorCls: STATUS_COLORS.purple },
    { label: t("dash.status.confidence"), value: "89%", colorCls: "", isNumber: true, target: 89 },
    { label: t("dash.status.volatility"), value: t("dash.status.volatility.v"), colorCls: STATUS_COLORS.green },
    { label: t("dash.status.system"), value: "Active", colorCls: "", isActive: true },
    { label: t("dash.status.risk"), value: t("dash.status.risk.v"), colorCls: STATUS_COLORS.green },
  ];

  const votingRows = [
    { label: t("dash.vote.judgment"), value: t("dash.vote.judgment.v"), cls: "bg-red-500/20 text-red-400 border-red-500/40" },
    { label: t("dash.vote.strategyDir"), value: t("dash.vote.strategyDir.v"), cls: "bg-red-500/20 text-red-400 border-red-500/40" },
    { label: t("dash.vote.confidenceLevel"), value: t("dash.vote.confidenceLevel.v"), cls: "bg-yellow-500/20 text-yellow-400 border-yellow-500/40" },
  ];

  const descLines = t("dash.desc").split("\n");

  return (
    <section ref={sectionRef} className="relative w-full py-20 overflow-hidden" style={{ background: "hsl(270 100% 3%)" }}>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-purple-600/5 blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-4 md:px-8 relative z-10">

        {/* ─── Header ─── */}
        <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-8"
          style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(30px)", transition: "all 0.7s ease" }}>
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/10 px-3 py-1 text-xs text-purple-300 mb-4">
              <span className="h-1.5 w-1.5 rounded-full bg-purple-400 animate-pulse" />
              {t("dash.live")}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-3 font-heading-cn">
              {t("dash.title")}
            </h2>
            <p className="text-sm text-gray-400 max-w-xl leading-relaxed">
              {descLines.map((line, i) => (
                <span key={i}>{line}{i < descLines.length - 1 && <br />}</span>
              ))}
            </p>
          </div>
          <div className="flex items-center gap-2 mt-4 md:mt-2">
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.6)]" />
            <span className="text-xs text-emerald-400 font-medium tracking-wide">{t("dash.systemActive")}</span>
          </div>
        </div>

        {/* ─── Tabs ─── */}
        <div className="flex gap-0.5 sm:gap-1 mb-8 rounded-xl bg-[hsl(270,100%,5%)] border border-purple-500/15 p-1 w-full sm:w-fit overflow-x-auto"
          style={{ opacity: visible ? 1 : 0, transition: "opacity 0.5s ease 0.3s" }}>
          {TABS.map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`relative flex-1 sm:flex-none px-3 sm:px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 min-w-0
                ${activeTab === tab.key
                  ? "bg-purple-500/20 text-purple-200 shadow-[0_0_15px_rgba(168,85,247,0.2)]"
                  : "text-gray-500 hover:text-gray-300 hover:bg-purple-500/5"
                }`}
            >
              <span className="font-mono text-[11px] sm:text-xs block truncate">{tab.label}</span>
              <span className="block text-[9px] sm:text-[10px] mt-0.5 opacity-70 truncate">{tab.sub}</span>
              {activeTab === tab.key && (
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 sm:w-8 h-0.5 rounded-full bg-purple-400" />
              )}
            </button>
          ))}
        </div>

        {/* ─── Tab Content ─── */}
        <div className="min-h-[400px]">

          {/* Tab: Prediction */}
          {activeTab === "prediction" && (
            <div className="animate-[fadeTab_0.4s_ease]">
              <div className="mb-10">
                <h3 className="text-base sm:text-lg font-semibold text-purple-200 mb-1">
                  K-Line Prediction Matrix<span className="text-gray-500 font-normal hidden sm:inline">｜{t("dash.kline.title")}</span>
                </h3>
                <p className="text-[11px] sm:text-xs text-gray-500 mb-4 sm:mb-5">{t("dash.kline.desc")}</p>
                <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2 sm:gap-3">
                  {KLINE_DATA.map((d, i) => (
                    <KLineCard key={d.tf} data={d} index={i} visible={visible} active={activeCard === i}
                      onClick={() => setActiveCard(activeCard === i ? null : i)} seed={1000 + i * 137}
                      bullLabel={t("dash.kline.bull")} bearLabel={t("dash.kline.bear")} />
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-base sm:text-lg font-semibold text-purple-200 mb-1">
                  Strategy Status<span className="text-gray-500 font-normal hidden sm:inline">｜{t("dash.strategy.title")}</span>
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-3 mt-4">
                  {statusCards.map((card, i) => (
                    <StatusCard key={card.label} label={card.label} value={card.value}
                      colorCls={card.colorCls} index={i} visible={visible}
                      isNumber={card.isNumber} target={card.target} isActive={card.isActive} />
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Tab: Indicators */}
          {activeTab === "indicators" && (
            <div className="animate-[fadeTab_0.4s_ease]">
              <div className="rounded-2xl border border-purple-500/15 bg-[hsl(270,100%,4%)] p-4 sm:p-6">
                <h3 className="text-base sm:text-lg font-semibold text-purple-200 mb-1">{t("dash.ind.title")}</h3>
                <p className="text-[11px] sm:text-xs text-gray-500 mb-4 sm:mb-5">{t("dash.ind.desc")}</p>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-1">
                  {INDICATOR_GROUPS_DATA.map((group, gi) => {
                    let offset = 0;
                    for (let k = 0; k < gi; k++) offset += INDICATOR_GROUPS_DATA[k].items.length;
                    return (
                      <div key={group.i18nLabel} className="mb-4">
                        <div className="text-[11px] sm:text-xs text-gray-500 mb-2 font-medium uppercase tracking-wider">{t(group.i18nLabel)}</div>
                        <div className="flex flex-wrap gap-1.5 sm:gap-2">
                          {group.items.map((item, ii) => (
                            <IndicatorTag key={item.name} item={item}
                              displayName={item.i18nKey ? t(item.i18nKey) : item.name}
                              color={group.color}
                              delay={(offset + ii) * 30} visible={visible} />
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>

                <ProgressLoop visible={visible} label={t("dash.ind.analyzing")} />
              </div>
            </div>
          )}

          {/* Tab: Voting */}
          {activeTab === "voting" && (
            <div className="animate-[fadeTab_0.4s_ease]">
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 sm:gap-6">
                <div className="lg:col-span-3 rounded-2xl border border-purple-500/15 bg-[hsl(270,100%,4%)] p-4 sm:p-6">
                  <h3 className="text-base sm:text-lg font-semibold text-purple-200 mb-1">{t("dash.vote.title")}</h3>
                  <p className="text-[11px] sm:text-xs text-gray-500 mb-4 sm:mb-5">{t("dash.vote.desc")}</p>

                  <div className="flex flex-col sm:flex-row items-center gap-6">
                    <DonutChart visible={visible} bullPct={bullPct}
                      bearishLabel={t("dash.vote.bearish")} bullishLabel={t("dash.vote.bullish")}
                      bearishSignal={t("dash.vote.bearishSignal")} bullishSignal={t("dash.vote.bullishSignal")} />
                    <div className="flex-1 w-full">
                      <div className="flex items-center gap-3 mb-4 justify-center sm:justify-start">
                        <span className="flex items-center gap-1.5 text-xs">
                          <span className="h-2.5 w-2.5 rounded-sm bg-fuchsia-500" />
                          <span className="text-fuchsia-400 font-mono">{bullPct.toFixed(1)}% {t("dash.vote.bull")}</span>
                        </span>
                        <span className="flex items-center gap-1.5 text-xs">
                          <span className="h-2.5 w-2.5 rounded-sm bg-gray-500" />
                          <span className="text-gray-400 font-mono">{(100 - bullPct).toFixed(1)}% {t("dash.vote.bear")}</span>
                        </span>
                      </div>

                      <div className="space-y-3">
                        {votingRows.map(row => (
                          <div key={row.label} className="flex items-center justify-between">
                            <span className="text-xs sm:text-sm text-gray-400">{row.label}</span>
                            <span className={`rounded-md border px-2 py-0.5 text-xs font-medium ${row.cls}`}>{row.value}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <p className="text-[10px] sm:text-[11px] text-gray-600 mt-5 text-center">
                    {t("dash.vote.note")}
                  </p>
                </div>

                <div className="lg:col-span-2 rounded-2xl border border-purple-500/15 bg-[hsl(270,100%,4%)] p-4 sm:p-6">
                  <h4 className="text-sm font-semibold text-purple-200 mb-3">{t("dash.vote.breakdown")}</h4>
                  <div className="space-y-2">
                    {KLINE_DATA.map(d => {
                      const isBull = d.dir === "bull";
                      return (
                        <div key={d.tf} className="flex items-center gap-3">
                          <span className="font-mono text-[11px] text-gray-400 w-8 text-right">{d.tf}</span>
                          <div className="flex-1 h-1.5 rounded-full bg-purple-500/10 overflow-hidden">
                            <div
                              className={`h-full rounded-full transition-all duration-1000 ${isBull ? "bg-fuchsia-500/60" : "bg-gray-500/60"}`}
                              style={{ width: visible ? `${d.conf}%` : "0%" }}
                            />
                          </div>
                          <span className={`text-[11px] font-mono w-8 text-right ${isBull ? "text-fuchsia-400" : "text-gray-400"}`}>
                            {d.conf}%
                          </span>
                          <span className={`text-[10px] ${isBull ? "text-fuchsia-400" : "text-gray-500"}`}>
                            {isBull ? "▲" : "▼"}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                  <div className="mt-4 pt-3 border-t border-purple-500/10">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-500">{t("dash.vote.bullCount")}</span>
                      <span className="font-mono text-fuchsia-400">3 / 8</span>
                    </div>
                    <div className="flex items-center justify-between text-xs mt-1">
                      <span className="text-gray-500">{t("dash.vote.bearCount")}</span>
                      <span className="font-mono text-gray-400">5 / 8</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* ─── Footer note ─── */}
        <p className="text-center text-[10px] sm:text-xs text-gray-600 italic mt-8 max-w-2xl mx-auto leading-relaxed">
          {t("dash.footer1")}<br />
          {t("dash.footer2")}
        </p>
      </div>
    </section>
  );
};

export default AIPredictionDashboard;
