import { useEffect, useRef, useState } from "react";
import { useScrollFadeUp } from "@/hooks/useScrollFadeUp";
import { useLanguage } from "@/contexts/LanguageContext";

const monthlyData = [
  {
    year: "2023",
    months: [6.66, 3.38, 8.98, 2.26, 1.95, 3.08, 1.98, 0.52, 0.22, 3.83, 5.25, 4.36],
    total: 42.47,
  },
  {
    year: "2024",
    months: [3.08, 6.35, 5.50, 3.06, 5.31, 0.00, 3.60, 5.11, 4.18, 5.42, 9.89, 3.75],
    total: 55.25,
  },
  {
    year: "2025",
    months: [11.15, 10.61, 10.27, 6.33, 10.57, 2.42, 7.94, 5.29, 0.94, 6.41, 3.15, 6.19],
    total: 81.27,
  },
  {
    year: "2026",
    months: [4.99, 1.38, 0.54, null, null, null, null, null, null, null, null, null],
    total: null,
  },
];

const monthHeaders = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const highlights = [
  { value: 42.47, labelKey: "backtest.highlight1" },
  { value: 55.25, labelKey: "backtest.highlight2" },
  { value: 81.27, labelKey: "backtest.highlight3" },
];

function AnimatedNumber({ target, duration = 1500 }: { target: number; duration?: number }) {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const start = performance.now();
          const animate = (now: number) => {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setValue(eased * target);
            if (progress < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [target, duration]);

  return (
    <span ref={ref} className="font-mono-num text-3xl sm:text-4xl lg:text-5xl text-primary font-bold">
      {value.toFixed(2)}%
    </span>
  );
}

function CellValue({ val }: { val: number | null }) {
  if (val === null) return <span style={{ color: "rgba(255,255,255,0.3)" }}>-</span>;
  const formatted = `${val.toFixed(2)}%`;
  if (val === 0) return <span style={{ color: "rgba(255,255,255,0.3)" }}>{formatted}</span>;
  return (
    <span className={val > 0 ? "text-[#4ADE80]" : "text-[#F87171]"}>
      {formatted}
    </span>
  );
}

const BacktestReport = () => {
  const sectionRef = useScrollFadeUp();
  const { t } = useLanguage();
  const [visibleRows, setVisibleRows] = useState<boolean[]>([]);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          monthlyData.forEach((_, i) => {
            setTimeout(() => {
              setVisibleRows((prev) => {
                const next = [...prev];
                next[i] = true;
                return next;
              });
            }, i * 100);
          });
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="backtest"
      className="py-20 lg:py-32 px-6 lg:px-12"
      style={{ background: "linear-gradient(180deg, hsl(270 100% 4%), hsl(270 100% 6%))" }}
    >
      <div ref={sectionRef} className="max-w-7xl mx-auto opacity-0">
        {/* Header */}
        <div className="text-center mb-8 relative">
          <span className="text-xs tracking-[4px] uppercase text-primary mb-3 block">
            BACKTEST REPORT · {t("backtest.label")}
          </span>
          <h2 className="font-heading-cn text-2xl sm:text-3xl lg:text-4xl text-foreground mb-4">
            {t("backtest.title")}
          </h2>
          <p className="text-white-40 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
            {t("backtest.desc1")}
            <br />
            {t("backtest.desc2")}
          </p>

          {/* Disclaimer */}
          <p className="absolute top-0 right-0 text-[11px] max-w-[280px] text-right" style={{ color: "rgba(255,255,255,0.3)" }}>
            * {t("backtest.disclaimer")}
          </p>
        </div>

        {/* Table */}
        <div className="overflow-x-auto rounded-2xl border border-border" style={{ background: "rgba(21,0,40,0.8)" }}>
          {/* Table header label */}
          <div
            className="px-6 py-3 text-center text-sm font-bold text-foreground"
            style={{ background: "linear-gradient(135deg, #5B1F8A, #7B3DB8)" }}
          >
            {t("backtest.tableTitle")}
          </div>

          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="px-3 py-3 text-left text-white-80 font-medium whitespace-nowrap">{t("backtest.year")}</th>
                {monthHeaders.map((m) => (
                  <th key={m} className="px-2 py-3 text-center text-white-80 font-medium whitespace-nowrap">{m}</th>
                ))}
                <th className="px-3 py-3 text-center text-foreground font-bold whitespace-nowrap">Total</th>
              </tr>
            </thead>
            <tbody>
              {monthlyData.map((row, i) => (
                <tr
                  key={row.year}
                  className="border-b border-border/50 transition-all duration-500"
                  style={{
                    opacity: visibleRows[i] ? 1 : 0,
                    transform: visibleRows[i] ? "translateY(0)" : "translateY(12px)",
                  }}
                >
                  <td className="px-3 py-3 text-foreground font-bold whitespace-nowrap">{row.year}</td>
                  {row.months.map((val, j) => (
                    <td key={j} className="px-2 py-3 text-center whitespace-nowrap text-xs sm:text-sm">
                      <CellValue val={val} />
                    </td>
                  ))}
                  <td className="px-3 py-3 text-center whitespace-nowrap">
                    {row.total !== null ? (
                      <span className="text-foreground font-bold text-base">{row.total.toFixed(2)}%</span>
                    ) : (
                      <span style={{ color: "rgba(255,255,255,0.3)" }}>-</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Highlights */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-12 text-center">
          {highlights.map((h) => (
            <div key={h.labelKey}>
              <AnimatedNumber target={h.value} />
              <p className="text-white-40 text-sm mt-2">{t(h.labelKey)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BacktestReport;
