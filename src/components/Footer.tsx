const Footer = () => {
  return (
    <footer className="border-t border-border py-12 px-6 lg:px-12" style={{ background: "hsl(270 100% 3%)" }}>
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          {/* Brand */}
          <div>
            <span className="font-display text-2xl text-foreground tracking-wider">AIFT</span>
            <p className="text-white-40 text-xs mt-2 leading-relaxed">
              AI Financial Technology Ltd.<br />
              專注於人工智慧自動化交易技術的金融科技公司
            </p>
          </div>

          {/* Trading */}
          <div>
            <h4 className="text-foreground text-sm font-medium mb-3">交易系統</h4>
            <ul className="space-y-2">
              <li><a href="#products" className="text-white-40 text-xs hover:text-foreground transition-colors">AI 智能合約交易</a></li>
              <li><a href="#products" className="text-white-40 text-xs hover:text-foreground transition-colors">AI 智能現貨交易</a></li>
              <li><a href="#how-it-works" className="text-white-40 text-xs hover:text-foreground transition-colors">運作原理</a></li>
              <li><a href="#risk" className="text-white-40 text-xs hover:text-foreground transition-colors">風控機制</a></li>
            </ul>
          </div>

          {/* Partners */}
          <div>
            <h4 className="text-foreground text-sm font-medium mb-3">合作夥伴</h4>
            <ul className="space-y-2">
              <li><a href="https://www.europecharteredbank.com/home.html" target="_blank" rel="noopener noreferrer" className="text-white-40 text-xs hover:text-foreground transition-colors">Europe Chartered Bank</a></li>
              <li><a href="#partners" className="text-white-40 text-xs hover:text-foreground transition-colors">Binance</a></li>
              <li><a href="#partners" className="text-white-40 text-xs hover:text-foreground transition-colors">CoinW</a></li>
            </ul>
          </div>

          {/* About */}
          <div>
            <h4 className="text-foreground text-sm font-medium mb-3">關於</h4>
            <ul className="space-y-2">
              <li><a href="#about" className="text-white-40 text-xs hover:text-foreground transition-colors">關於 AIFT</a></li>
              <li><a href="#ecb" className="text-white-40 text-xs hover:text-foreground transition-colors">ECB 合作</a></li>
              <li><a href="https://ecb-apply.support-banking.com/" target="_blank" rel="noopener noreferrer" className="text-white-40 text-xs hover:text-foreground transition-colors">ECB 操作手冊</a></li>
            </ul>
          </div>
        </div>

        {/* Risk disclaimer */}
        <div className="border border-destructive/30 rounded-lg p-4 mb-6">
          <p className="text-destructive text-xs leading-relaxed">
            ⚠️ 風險警示：加密貨幣交易具有高度風險，價格波動劇烈，可能導致部分或全部投資損失。過去的表現不代表未來的結果。請根據您的風險承受能力謹慎投資，並在必要時諮詢專業財務顧問。
          </p>
        </div>

        {/* Bottom */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-white-40 text-xs">
          <p>© 2025 AI Financial Technology Ltd. All rights reserved.</p>
          <p className="italic">Make you easy living.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
