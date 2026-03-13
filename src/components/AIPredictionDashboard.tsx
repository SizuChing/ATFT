import { useState, useEffect, useRef, useCallback } from "react";

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

const INDICATOR_GROUPS = [
  { label: "加密貨幣", color: "purple", items: ["BTC", "ETH", "XRP", "BNB", "SOL", "DOGE", "ADA", "AVAX"] },
  { label: "外匯", color: "blue", items: ["USD", "EUR", "JPY", "GBP", "CNY", "CHF", "CAD", "KRW"] },
  { label: "商品", color: "orange", items: ["黃金", "白銀", "原油", "天然氣", "銅"] },
  { label: "股指", color: "green", items: ["SP500", "NASDAQ", "DOW", "DAX", "NIKKEI", "TOPIX", "FTSE"] },
  { label: "經濟指標", color: "gray", items: ["CPI", "PPI", "GDP", "VIX", "非農就業", "收益率曲線"] },
];

const STATUS_CARDS = [
  { label: "即時預測方向", value: "Bearish ▼", color: "red" },
  { label: "投票強度", value: "High", color: "purple" },
  { label: "AI Confidence", value: "89%", color: "number", target: 89 },
  { label: "市場波動狀態", value: "Normal", color: "green" },
  { label: "系統狀態", value: "● Active", color: "active" },
  { label: "風控狀態", value: "✓ Protected", color: "green" },
];

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
function MiniKLine({ dir }: { dir: "bull" | "bear" }) {
  // 6 real candles + 1 dashed prediction
  const candles = Array.from({ length: 6 }, (_, i) => {
    const isBull = Math.random() > 0.45;
    const y = 10 + Math.random() * 20;
    const h = 8 + Math.random() * 12;
    return { x: 6 + i * 14, y, h, bull: isBull };
  });
  const predY = 12 + Math.random() * 15;
  const predH = 10 + Math.random() * 10;

  return (
    <svg viewBox="0 0 108 50" className="w-full h-10">
      {candles.map((c, i) => (
        <g key={i}>
          <line x1={c.x + 3} y1={c.y - 4} x2={c.x + 3} y2={c.y + c.h + 4} stroke={c.bull ? "#a855f7" : "#6b7280"} strokeWidth="1" />
          <rect x={c.x} y={c.y} width="6" height={c.h} rx="1" fill={c.bull ? "#a855f7" : "#4b5563"} />
        </g>
      ))}
      {/* prediction candle */}
      <g className="animate-pulse">
        <line x1={90 + 3} y1={predY - 4} x2={90 + 3} y2={predY + predH + 4} stroke={dir === "bull" ? "#d946ef" : "#9ca3af"} strokeWidth="1" strokeDasharray="2 2" />
        <rect x={90} y={predY} width="6" height={predH} rx="1" fill={dir === "bull" ? "#d946ef" : "#6b7280"} opacity="0.6" strokeDasharray="3 2" stroke={dir === "bull" ? "#d946ef" : "#9ca3af"} strokeWidth="1" />
      </g>
    </svg>
  );
}

/* ─── KLine Card ─── */
function KLineCard({ data, index, visible, active, onClick }: {
  data: typeof KLINE_DATA[0]; index: number; visible: boolean; active: boolean;
  onClick: () => void;
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
      <MiniKLine dir={data.dir} />
      <div className="flex items-center justify-between mt-2">
        <span className={`text-xs font-medium ${isBull ? "text-fuchsia-400" : "text-gray-400"}`}>
          {isBull ? "▲ 看漲" : "▼ 看跌"}
        </span>
        <span className="font-mono text-sm text-purple-200">{conf}%</span>
      </div>
    </div>
  );
}

/* ─── Indicator Tag ─── */
function IndicatorTag({ item, color, delay, visible }: {
  item: string; color: string; delay: number; visible: boolean;
}) {
  const [up, setUp] = useState(Math.random() > 0.5);
  useEffect(() => {
    const iv = setInterval(() => setUp(Math.random() > 0.5), 3000 + Math.random() * 2000);
    return () => clearInterval(iv);
  }, []);

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-md border px-2 py-1 text-xs font-medium transition-all duration-300 ${TAG_COLORS[color]}`}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(8px)",
        transitionDelay: `${delay}ms`,
      }}
    >
      {item}
      <span className={`text-[10px] transition-colors duration-300 ${up ? "text-emerald-400" : "text-red-400"}`}>
        {up ? "▲" : "▼"}
      </span>
    </span>
  );
}

/* ─── Donut Chart ─── */
function DonutChart({ visible }: { visible: boolean }) {
  const bullPct = 45;
  const bearPct = 55;
  const r = 54;
  const c = 2 * Math.PI * r;
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!visible) return;
    let raf: number;
    const t0 = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - t0) / 1200, 1);
      const eased = 1 - Math.pow(1 - p, 3); // ease-out
      setProgress(eased);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [visible]);

  const bullLen = (bullPct / 100) * c * progress;
  const bearLen = (bearPct / 100) * c * progress;

  return (
    <div className="relative w-48 h-48 mx-auto">
      <svg viewBox="0 0 128 128" className="w-full h-full -rotate-90">
        <circle cx="64" cy="64" r={r} fill="none" stroke="hsl(270 50% 12%)" strokeWidth="12" />
        <circle cx="64" cy="64" r={r} fill="none" stroke="#d946ef" strokeWidth="12"
          strokeDasharray={`${bullLen} ${c - bullLen}`} strokeLinecap="round" />
        <circle cx="64" cy="64" r={r} fill="none" stroke="#6b7280" strokeWidth="12"
          strokeDasharray={`${bearLen} ${c - bearLen}`} strokeDashoffset={`-${bullLen}`} strokeLinecap="round" />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-2xl font-bold text-red-400">偏空</span>
        <span className="text-xs text-gray-400 mt-1">Bearish Signal</span>
      </div>
    </div>
  );
}

/* ─── Progress Loop ─── */
function ProgressLoop({ visible }: { visible: boolean }) {
  const [pct, setPct] = useState(0);
  useEffect(() => {
    if (!visible) return;
    const iv = setInterval(() => setPct(p => (p >= 100 ? 0 : p + 0.5)), 50);
    return () => clearInterval(iv);
  }, [visible]);
  return (
    <div className="mt-3">
      <div className="text-xs text-gray-400 mb-1">正在分析 50 項指標...</div>
      <div className="h-1 w-full rounded-full bg-purple-500/10 overflow-hidden">
        <div className="h-full bg-purple-500/60 rounded-full transition-all duration-100" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

/* ─── StatusCard ─── */
function StatusCard({ card, index, visible }: {
  card: typeof STATUS_CARDS[0]; index: number; visible: boolean;
}) {
  const isNumber = card.color === "number";
  const isActive = card.color === "active";
  const countVal = useCountUp(isNumber ? (card.target ?? 0) : 0, 1200, visible && isNumber);
  const barWidth = 40 + Math.random() * 50;

  return (
    <div
      className="rounded-xl border border-purple-500/20 bg-[hsl(270,100%,5%)] p-3 transition-all duration-500"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(16px)",
        transitionDelay: `${index * 80}ms`,
      }}
    >
      <div className="text-xs text-gray-400 mb-2">{card.label}</div>
      {isNumber ? (
        <div className="font-mono text-xl text-purple-300">{countVal}%</div>
      ) : isActive ? (
        <div className="flex items-center gap-2 text-emerald-400 text-sm font-medium">
          <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
          Active
        </div>
      ) : (
        <div className={`inline-block rounded-md border px-2 py-0.5 text-sm font-medium ${STATUS_COLORS[card.color]}`}>
          {card.value}
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
  const { ref: sectionRef, visible } = useInView(0.08);
  const [activeCard, setActiveCard] = useState<number | null>(null);

  return (
    <section ref={sectionRef} className="relative w-full py-20 overflow-hidden" style={{ background: "hsl(270 100% 3%)" }}>
      {/* subtle bg glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-purple-600/5 blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-4 md:px-8 relative z-10">

        {/* ─── Header ─── */}
        <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-12"
          style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(30px)", transition: "all 0.7s ease" }}>
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/10 px-3 py-1 text-xs text-purple-300 mb-4">
              <span className="h-1.5 w-1.5 rounded-full bg-purple-400 animate-pulse" />
              LIVE SYSTEM · 即時運算中
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-3 font-heading-cn">
              AI Prediction Dashboard
            </h2>
            <p className="text-sm text-gray-400 max-w-xl leading-relaxed">
              整合多時間框架 K 線、50 大市場指標與 AI 投票模型<br />
              將複雜市場分析轉化為清晰可視的智能交易決策依據
            </p>
          </div>
          <div className="flex items-center gap-2 mt-4 md:mt-2">
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.6)]" />
            <span className="text-xs text-emerald-400 font-medium tracking-wide">System Active</span>
          </div>
        </div>

        {/* ─── Module 1: K-Line Prediction Matrix ─── */}
        <div className="mb-12">
          <h3 className="text-lg font-semibold text-purple-200 mb-1">
            K-Line Prediction Matrix<span className="text-gray-500 font-normal">｜多時間框架 K 線預測</span>
          </h3>
          <p className="text-xs text-gray-500 mb-5">根據前六根 K 線走勢，AI 預測第七根 K 線市場方向</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
            {KLINE_DATA.map((d, i) => (
              <KLineCard key={d.tf} data={d} index={i} visible={visible} active={activeCard === i}
                onClick={() => setActiveCard(activeCard === i ? null : i)} />
            ))}
          </div>
        </div>

        {/* ─── Module 2 & 3: Two columns ─── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">

          {/* Left — 50 Indicators */}
          <div className="rounded-2xl border border-purple-500/15 bg-[hsl(270,100%,4%)] p-6">
            <h3 className="text-lg font-semibold text-purple-200 mb-1">50+ Global Market Indicators</h3>
            <p className="text-xs text-gray-500 mb-5">AI 同步分析超過 50 項全球金融商品，跨市場聯動提升預測精度</p>

            {INDICATOR_GROUPS.map((group, gi) => {
              let offset = 0;
              for (let k = 0; k < gi; k++) offset += INDICATOR_GROUPS[k].items.length;
              return (
                <div key={group.label} className="mb-4">
                  <div className="text-xs text-gray-500 mb-2">{group.label}</div>
                  <div className="flex flex-wrap gap-2">
                    {group.items.map((item, ii) => (
                      <IndicatorTag key={item} item={item} color={group.color}
                        delay={(offset + ii) * 30} visible={visible} />
                    ))}
                  </div>
                </div>
              );
            })}

            <ProgressLoop visible={visible} />
          </div>

          {/* Right — AI Voting Engine */}
          <div className="rounded-2xl border border-purple-500/15 bg-[hsl(270,100%,4%)] p-6">
            <h3 className="text-lg font-semibold text-purple-200 mb-1">AI Voting Decision Engine</h3>
            <p className="text-xs text-gray-500 mb-5">系統匯整各時間框架預測結果，當同方向比例超過 66% 時形成策略判斷</p>

            <DonutChart visible={visible} />

            <div className="flex items-center gap-1 mt-2 mb-1 justify-center">
              <span className="text-xs text-fuchsia-400">45% 看漲</span>
              <span className="text-xs text-gray-600 mx-2">|</span>
              <span className="text-xs text-gray-400">55% 看跌</span>
            </div>

            <div className="mt-6 space-y-3">
              {[
                { label: "當前 AI 判斷", value: "偏空", cls: "bg-red-500/20 text-red-400 border-red-500/40" },
                { label: "策略方向", value: "做空觀察", cls: "bg-red-500/20 text-red-400 border-red-500/40" },
                { label: "投票置信度", value: "中高", cls: "bg-yellow-500/20 text-yellow-400 border-yellow-500/40" },
              ].map(row => (
                <div key={row.label} className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">{row.label}</span>
                  <span className={`rounded-md border px-2 py-0.5 text-xs font-medium ${row.cls}`}>{row.value}</span>
                </div>
              ))}
            </div>

            <p className="text-[11px] text-gray-600 mt-5 text-center">
              當特定方向投票比例超過 66%，系統將自動形成明確進場方向判斷
            </p>
          </div>
        </div>

        {/* ─── Module 4: Strategy Status ─── */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-purple-200 mb-1">
            Strategy Status<span className="text-gray-500 font-normal">｜策略狀態總覽</span>
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mt-4">
            {STATUS_CARDS.map((card, i) => (
              <StatusCard key={card.label} card={card} index={i} visible={visible} />
            ))}
          </div>
        </div>

        {/* ─── Footer note ─── */}
        <p className="text-center text-xs text-gray-600 italic mt-8 max-w-2xl mx-auto leading-relaxed">
          根據多時間框架與跨市場指標整合結果，系統動態調整進場方向與交易節奏。<br />
          預測模型透過多維度交叉驗證機制，持續優化預測精度與策略表現。
        </p>
      </div>
    </section>
  );
};

export default AIPredictionDashboard;
