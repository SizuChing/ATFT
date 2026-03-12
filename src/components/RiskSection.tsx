import { Scale, OctagonX, Target, BarChart, RefreshCw, Globe } from "lucide-react";
import { useScrollFadeUp } from "@/hooks/useScrollFadeUp";

const cards = [
  { icon: Scale, title: "動態獲利率調整", desc: "根據市場波動即時調整獲利目標", stat: "最高 2.25%" },
  { icon: OctagonX, title: "多空比自動暫停", desc: "極端行情自動暫停交易保護資金", stat: "1:15 觸發" },
  { icon: Target, title: "差價限制防追高", desc: "避免在高波動時段追高買入", stat: ">1.5% 限制" },
  { icon: BarChart, title: "66% 門檻決策", desc: "信心度未達門檻不進行交易", stat: "信心 66%" },
  { icon: RefreshCw, title: "歷史數據回測驗證", desc: "所有策略經歷史數據嚴格驗證", stat: "5年+ 驗證" },
  { icon: Globe, title: "多市場交叉驗證", desc: "多指標交叉確認降低誤判風險", stat: "50+ 指標" },
];

const RiskSection = () => {
  const ref = useScrollFadeUp();

  return (
    <section id="risk" className="py-20 lg:py-32 px-6 lg:px-12" style={{ background: "hsl(270 100% 6%)" }}>
      <div ref={ref} className="max-w-7xl mx-auto opacity-0">
        <div className="text-center mb-12">
          <span className="text-xs tracking-[4px] uppercase text-primary mb-3 block">Risk Management</span>
          <h2 className="font-heading-cn text-2xl sm:text-3xl lg:text-4xl text-foreground">風控機制</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {cards.map((c) => (
            <div
              key={c.title}
              className="card-glass rounded-xl p-6 hover:-translate-y-1 hover:border-primary/50 transition-all duration-300 glow-box-hover group"
            >
              <c.icon className="w-8 h-8 text-primary mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-foreground font-medium mb-1">{c.title}</h3>
              <p className="text-white-40 text-sm mb-4">{c.desc}</p>
              <code className="font-mono-num text-xs text-primary bg-primary/10 px-3 py-1 rounded">{c.stat}</code>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RiskSection;
