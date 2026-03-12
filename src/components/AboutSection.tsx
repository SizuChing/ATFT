import { Brain, Globe, Shield } from "lucide-react";
import { useScrollFadeUp } from "@/hooks/useScrollFadeUp";

const features = [
  { icon: Brain, title: "第四代量化 AI", desc: "五大協同機制同時運行" },
  { icon: Globe, title: "多市場聯動分析", desc: "交叉參考 50+ 全球關鍵指標" },
  { icon: Shield, title: "智能風控機制", desc: "多重保護層確保資金安全" },
];

const AboutSection = () => {
  const ref = useScrollFadeUp();

  return (
    <section id="about" className="py-20 lg:py-32 px-6 lg:px-12">
      <div ref={ref} className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-20 opacity-0">
        {/* Left - Hexagon visual */}
        <div className="flex-shrink-0 flex items-center justify-center">
          <div
            className="w-48 h-48 lg:w-64 lg:h-64 flex items-center justify-center animate-pulse-glow rounded-2xl"
            style={{
              background: "linear-gradient(135deg, hsl(270 100% 8%), hsl(270 70% 33%))",
              clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
            }}
          >
            <span className="font-display text-5xl lg:text-6xl text-foreground tracking-wider">AIFT</span>
          </div>
        </div>

        {/* Right - Content */}
        <div className="flex-1">
          <span className="text-xs tracking-[4px] uppercase text-primary mb-3 block">About AIFT</span>
          <h2 className="font-heading-cn text-2xl sm:text-3xl lg:text-4xl text-foreground mb-4">
            AI 驅動的智能金融生態系統
          </h2>
          <p className="text-white-80 text-sm sm:text-base leading-relaxed mb-8">
            AI Financial Technology Ltd.（AIFT）是一家專注於人工智慧自動化交易技術的金融科技公司，
            結合第四代量化 AI 引擎，為投資者提供全方位的智能交易解決方案。
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {features.map((f) => (
              <div
                key={f.title}
                className="card-glass rounded-xl p-5 hover:-translate-y-1 hover:border-primary/50 transition-all duration-300 glow-box-hover"
              >
                <f.icon className="w-8 h-8 text-primary mb-3" />
                <h3 className="text-foreground text-sm font-medium mb-1">{f.title}</h3>
                <p className="text-white-40 text-xs">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
