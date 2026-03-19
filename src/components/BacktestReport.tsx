import { useEffect, useRef, useState } from "react";
import { useScrollFadeUp } from "@/hooks/useScrollFadeUp";
import { useLanguage } from "@/contexts/LanguageContext";

const monthlyData = [
  {
    year: "2023",
    months: [4.88, 2.23, 10.14, -0.37, 4.16, 4.36, 0.62, -1.50, -1.55, 9.17, 3.68, 1.94],
    total: 37.76,
  },
  {
    year: "2024",
    months: [-1.42, -5.42, 4.85, 12.55, -9.13, 6.38, 7.91, 18.32, 5.76, 5.84, 2.25, 2.71],
    total: 50.60,
  },
  {
    year: "2025",
    months: [19.92, -0.60, 18.39, 8.65, 4.79, -2.41, -5.92, -6.74, 8.84, 12.48, 26.27, 4.51],
    total: 88.18,
  },
  {
    year: "2026",
    months: [-10.75, null, null, null, null, null, null, null, null, null, null, null],
    total: null,
  },
];

const monthHeaders = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const highlights = [
  { value: 37.76, label: "2023 年度回報" },
  { value: 50.60, label: "2024 年度回報" },
  { value: 88.18, label: "2025 年度回報" },
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
  const formatted = `${val >= 0 ? "" : ""}${val.toFixed(2)}%`;
  return (
    <span className={val >= 0 ? "text-[#4ADE80]" : "text-[#F87171]"}>
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
            <div key={h.label}>
              <AnimatedNumber target={h.value} />
              <p className="text-white-40 text-sm mt-2">{h.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BacktestReport;
