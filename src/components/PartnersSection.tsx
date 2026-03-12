import { useScrollFadeUp } from "@/hooks/useScrollFadeUp";

const partners = [
  { name: "ECB", full: "Europe Chartered Bank", desc: "歐洲合法持牌銀行" },
  { name: "BINANCE", full: "全球最大加密交易所", desc: "AIFT 自動交易平台" },
  { name: "COINW", full: "國際知名加密交易所", desc: "AIFT 合約交易平台" },
];

const PartnersSection = () => {
  const ref = useScrollFadeUp();

  return (
    <section id="partners" className="py-20 lg:py-32 px-6 lg:px-12" style={{ background: "hsl(270 100% 6%)" }}>
      <div ref={ref} className="max-w-7xl mx-auto opacity-0">
        <div className="text-center mb-12">
          <span className="text-xs tracking-[4px] uppercase text-primary mb-3 block">Partners</span>
          <h2 className="font-heading-cn text-2xl sm:text-3xl lg:text-4xl text-foreground">合作夥伴</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {partners.map((p) => (
            <div
              key={p.name}
              className="card-glass rounded-2xl p-8 text-center hover:-translate-y-1 hover:border-primary/50 transition-all duration-300 glow-box-hover"
            >
              <div className="w-16 h-16 rounded-xl gradient-primary flex items-center justify-center mx-auto mb-4">
                <span className="font-display text-lg text-foreground tracking-wider">{p.name}</span>
              </div>
              <h3 className="text-foreground font-medium mb-1">{p.full}</h3>
              <p className="text-white-40 text-sm">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PartnersSection;
