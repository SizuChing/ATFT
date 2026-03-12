import { Link2, BarChart3, Brain, Rocket } from "lucide-react";
import { useScrollFadeUp } from "@/hooks/useScrollFadeUp";

const steps = [
  { icon: Link2, num: "01", title: "連結交易所", desc: "透過 API 安全連結您的加密貨幣交易所帳戶" },
  { icon: BarChart3, num: "02", title: "AI 多市場分析", desc: "AI 同步分析 50+ 全球市場指標與趨勢數據" },
  { icon: Brain, num: "03", title: "智能決策判斷", desc: "量化模型計算最佳進出場時機與方向" },
  { icon: Rocket, num: "04", title: "自動執行獲利", desc: "系統全自動執行交易，即時獲利與風控" },
];

const HowItWorksSection = () => {
  const ref = useScrollFadeUp();

  return (
    <section id="how-it-works" className="py-20 lg:py-32 px-6 lg:px-12">
      <div ref={ref} className="max-w-7xl mx-auto opacity-0">
        <div className="text-center mb-16">
          <span className="text-xs tracking-[4px] uppercase text-primary mb-3 block">How It Works</span>
          <h2 className="font-heading-cn text-2xl sm:text-3xl lg:text-4xl text-foreground">運作原理</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {/* Connection line (desktop) */}
          <div className="hidden lg:block absolute top-12 left-[12%] right-[12%] h-px bg-gradient-to-r from-primary/0 via-primary/40 to-primary/0" />

          {steps.map((step) => (
            <div key={step.num} className="flex flex-col items-center text-center">
              <div className="w-24 h-24 rounded-full border-2 border-primary/40 flex items-center justify-center mb-6 animate-pulse-glow relative bg-background">
                <step.icon className="w-8 h-8 text-primary" />
                <span className="absolute -top-2 -right-2 font-mono-num text-xs text-primary bg-background border border-primary/30 rounded-full w-7 h-7 flex items-center justify-center">
                  {step.num}
                </span>
              </div>
              <h3 className="text-foreground font-medium mb-2">{step.title}</h3>
              <p className="text-white-40 text-sm max-w-[200px]">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
