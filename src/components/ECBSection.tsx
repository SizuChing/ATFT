import { Landmark, FileText } from "lucide-react";
import { useScrollFadeUp } from "@/hooks/useScrollFadeUp";

const steps = [
  "前往 ECB 官網完成帳號註冊與 KYC 驗證",
  "存入法幣或加密貨幣資產至 ECB 帳戶",
  "授權 AIFT 系統透過 API 串接您的交易帳戶",
  "一鍵啟動 AIFT AI，系統開始自動執行交易",
  "即時監控收益，隨時查閱交易報表與績效",
];

const ECBSection = () => {
  const ref = useScrollFadeUp();

  return (
    <section id="ecb" className="py-20 lg:py-32 px-6 lg:px-12">
      <div ref={ref} className="max-w-7xl mx-auto opacity-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left */}
          <div>
            <span className="inline-flex items-center gap-2 text-xs px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 mb-4">
              <Landmark size={14} /> 歐洲合法持牌銀行
            </span>
            <h2 className="font-heading-cn text-2xl sm:text-3xl lg:text-4xl text-foreground mb-4">
              與 Europe Chartered Bank<br />深度戰略合作
            </h2>
            <p className="text-white-80 text-sm leading-relaxed mb-6">
              ECB（歐洲特許銀行）是歐洲合法持牌的金融機構，為 AIFT 用戶提供安全、合規的資金存管與交易服務。
            </p>
            <ul className="space-y-3 mb-8">
              {[
                "歐洲合法持牌銀行，法幣與加密貨幣雙向支援",
                "AIFT AI 自動交易技術直接串接 ECB 帳戶",
                "資金合規存管，安全有保障",
                "一站式完成開戶、存款、自動交易全流程",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-white-80">
                  <span className="text-primary mt-0.5">•</span>
                  {item}
                </li>
              ))}
            </ul>
            <div className="flex flex-wrap gap-3">
              <a
                href="https://www.europecharteredbank.com/home.html"
                target="_blank"
                rel="noopener noreferrer"
                className="gradient-primary text-foreground text-sm px-6 py-2.5 rounded-full glow-box hover:-translate-y-0.5 transition-all duration-200 flex items-center gap-2"
              >
                <Landmark size={16} /> 前往 ECB 官網開戶
              </a>
              <a
                href="https://ecb-apply.support-banking.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="card-glass text-white-80 text-sm px-6 py-2.5 rounded-full hover:text-foreground hover:-translate-y-0.5 transition-all duration-200 flex items-center gap-2"
              >
                <FileText size={16} /> ECB 操作說明手冊
              </a>
            </div>
          </div>

          {/* Right - Flow card */}
          <div className="card-glass rounded-2xl p-8">
            <h3 className="font-heading-cn text-lg text-foreground mb-6">ECB 開戶 × AIFT 接入流程</h3>
            <div className="space-y-5">
              {steps.map((step, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full border border-primary/40 flex items-center justify-center flex-shrink-0 text-primary font-mono-num text-xs">
                    {i + 1}
                  </div>
                  <p className="text-white-80 text-sm pt-1">{step}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ECBSection;
