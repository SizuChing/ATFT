import { useState } from "react";
import { Zap, TrendingUp } from "lucide-react";
import { useScrollFadeUp } from "@/hooks/useScrollFadeUp";

const contractFeatures = [
  "K 線學習預測模型（1分～12小時多時間框架）",
  "根據前 6 根 K 線，預測第 7 根走勢",
  "自動判斷做多 / 做空方向",
  "50+ 全球市場指標聯動分析",
  "即時動態調整風控與獲利率",
];

const contractStats = [
  { label: "最高單筆獲利率", value: "2.25%" },
  { label: "多空比觸發暫停", value: "1:15" },
  { label: "同方向差價限制", value: ">1.5%" },
  { label: "分析市場指標數", value: "50+" },
  { label: "支援時間框架", value: "7 種" },
  { label: "決策判斷閾值", value: "66%" },
];

const spotFeatures = [
  "AI 智能選幣與最佳買入時機判斷",
  "多維度市場數據交叉分析",
  "自動化買賣策略執行",
  "支援主流幣種組合投資",
  "風險分散機制與動態調倉",
];

const spotStats = [
  { label: "支援幣種", value: "20+" },
  { label: "歷史回測年數", value: "5年+" },
  { label: "最大回撤控制", value: "<8%" },
  { label: "平均月化報酬", value: "穩健" },
  { label: "調倉頻率", value: "動態" },
  { label: "風控等級", value: "多層" },
];

const ProductsSection = () => {
  const [tab, setTab] = useState<"contract" | "spot">("contract");
  const ref = useScrollFadeUp();

  const features = tab === "contract" ? contractFeatures : spotFeatures;
  const stats = tab === "contract" ? contractStats : spotStats;
  const title = tab === "contract" ? "AI 智能合約交易系統" : "AI 智能現貨交易系統";
  const desc =
    tab === "contract"
      ? "透過第四代量化 AI 引擎，針對加密貨幣合約市場進行全自動化交易，以 K 線學習預測模型為核心，結合多市場指標聯動分析。"
      : "運用 AI 深度學習技術，在現貨市場中進行智能選幣與最佳時機判斷，實現穩健增長的自動化現貨投資策略。";

  return (
    <section id="products" className="py-20 lg:py-32 px-6 lg:px-12" style={{ background: "hsl(270 100% 6%)" }}>
      <div ref={ref} className="max-w-7xl mx-auto opacity-0">
        <div className="text-center mb-12">
          <span className="text-xs tracking-[4px] uppercase text-primary mb-3 block">Trading Systems</span>
          <h2 className="font-heading-cn text-2xl sm:text-3xl lg:text-4xl text-foreground">交易系統</h2>
        </div>

        {/* Tabs */}
        <div className="flex justify-center gap-3 mb-12">
          {[
            { key: "contract" as const, label: "AI 智能合約交易", icon: Zap },
            { key: "spot" as const, label: "AI 智能現貨交易", icon: TrendingUp },
          ].map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm transition-all duration-300 ${
                tab === t.key
                  ? "gradient-primary text-foreground glow-box"
                  : "card-glass text-white-80 hover:text-foreground"
              }`}
            >
              <t.icon size={16} />
              {t.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left - features */}
          <div className="card-glass rounded-2xl p-8">
            <h3 className="font-heading-cn text-xl text-foreground mb-3">{title}</h3>
            <p className="text-white-80 text-sm mb-6 leading-relaxed">{desc}</p>
            <ul className="space-y-3">
              {features.map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm text-white-80">
                  <span className="text-primary mt-0.5">▸</span>
                  {f}
                </li>
              ))}
            </ul>
            <div className="flex flex-wrap gap-2 mt-6">
              {(tab === "contract"
                ? ["K線學習", "多空自動判斷", "風控機制", "BTC/ETH"]
                : ["智能選幣", "動態調倉", "穩健增長", "多幣種"]
              ).map((tag) => (
                <span key={tag} className="text-xs px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Right - stats */}
          <div className="grid grid-cols-2 gap-4">
            {stats.map((s) => (
              <div key={s.label} className="card-glass rounded-xl p-5 flex flex-col justify-between hover:-translate-y-1 transition-all duration-300 glow-box-hover">
                <p className="text-white-40 text-xs mb-2">{s.label}</p>
                <p className="font-mono-num text-2xl text-primary">{s.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;
