import { useState } from "react";
import { Zap, TrendingUp } from "lucide-react";
import { useScrollFadeUp } from "@/hooks/useScrollFadeUp";
import { useLanguage } from "@/contexts/LanguageContext";

const ProductsSection = () => {
  const [tab, setTab] = useState<"contract" | "spot">("contract");
  const ref = useScrollFadeUp();
  const { t } = useLanguage();

  const featureKeys = tab === "contract"
    ? ["products.contract.f1", "products.contract.f2", "products.contract.f3", "products.contract.f4", "products.contract.f5"]
    : ["products.spot.f1", "products.spot.f2", "products.spot.f3", "products.spot.f4", "products.spot.f5"];

  const tagKeys = tab === "contract"
    ? ["products.contract.tag1", "products.contract.tag2", "products.contract.tag3", "products.contract.tag4"]
    : ["products.spot.tag1", "products.spot.tag2", "products.spot.tag3", "products.spot.tag4"];

  const statKeys = tab === "contract"
    ? [
        { label: "products.stat.maxProfit", value: "products.stat.maxProfit.v" },
        { label: "products.stat.ratio", value: "products.stat.ratio.v" },
        { label: "products.stat.spread", value: "products.stat.spread.v" },
        { label: "products.stat.indicators", value: "products.stat.indicators.v" },
        { label: "products.stat.timeframes", value: "products.stat.timeframes.v" },
        { label: "products.stat.threshold", value: "products.stat.threshold.v" },
      ]
    : [
        { label: "products.stat.coins", value: "products.stat.coins.v" },
        { label: "products.stat.backtest", value: "products.stat.backtest.v" },
        { label: "products.stat.drawdown", value: "products.stat.drawdown.v" },
        { label: "products.stat.monthly", value: "products.stat.monthly.v" },
        { label: "products.stat.rebalance", value: "products.stat.rebalance.v" },
        { label: "products.stat.riskLevel", value: "products.stat.riskLevel.v" },
      ];

  const titleKey = tab === "contract" ? "products.contract.title" : "products.spot.title";
  const descKey = tab === "contract" ? "products.contract.desc" : "products.spot.desc";

  return (
    <section id="products" className="py-20 lg:py-32 px-6 lg:px-12" style={{ background: "hsl(270 100% 6%)" }}>
      <div ref={ref} className="max-w-7xl mx-auto opacity-0">
        <div className="text-center mb-12">
          <span className="text-xs tracking-[4px] uppercase text-primary mb-3 block">{t("products.label")}</span>
          <h2 className="font-heading-cn text-2xl sm:text-3xl lg:text-4xl text-foreground">{t("products.title")}</h2>
        </div>

        <div className="flex justify-center gap-3 mb-12">
          {[
            { key: "contract" as const, labelKey: "products.tab.contract", icon: Zap },
            { key: "spot" as const, labelKey: "products.tab.spot", icon: TrendingUp },
          ].map((item) => (
            <button
              key={item.key}
              onClick={() => setTab(item.key)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm transition-all duration-300 ${
                tab === item.key
                  ? "gradient-primary text-foreground glow-box"
                  : "card-glass text-white-80 hover:text-foreground"
              }`}
            >
              <item.icon size={16} />
              {t(item.labelKey)}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="card-glass rounded-2xl p-8">
            <h3 className="font-heading-cn text-xl text-foreground mb-3">{t(titleKey)}</h3>
            <p className="text-white-80 text-sm mb-6 leading-relaxed">{t(descKey)}</p>
            <ul className="space-y-3">
              {featureKeys.map((fk) => (
                <li key={fk} className="flex items-start gap-2 text-sm text-white-80">
                  <span className="text-primary mt-0.5">▸</span>
                  {t(fk)}
                </li>
              ))}
            </ul>
            <div className="flex flex-wrap gap-2 mt-6">
              {tagKeys.map((tk) => (
                <span key={tk} className="text-xs px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20">
                  {t(tk)}
                </span>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {statKeys.map((s) => (
              <div key={s.label} className="card-glass rounded-xl p-5 flex flex-col justify-between hover:-translate-y-1 transition-all duration-300 glow-box-hover">
                <p className="text-white-40 text-xs mb-2">{t(s.label)}</p>
                <p className="font-mono-num text-2xl text-primary">{t(s.value)}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;
