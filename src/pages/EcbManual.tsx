import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import EcbGuideOverlay from "@/components/EcbGuideOverlay";
import { useEcbGuide } from "@/contexts/EcbGuideContext";

const EcbManual = () => {
  const { openInline, setPopupHost } = useEcbGuide();
  const [params] = useSearchParams();

  useEffect(() => {
    setPopupHost(true);
    const section = params.get("section") ?? undefined;
    const docTabRaw = params.get("docTab");
    const docTab =
      docTabRaw === "personal" || docTabRaw === "corporate" ? docTabRaw : undefined;
    openInline({ section, docTab });
    document.title = "AIFT — ECB 操作說明手冊";
  }, [openInline, setPopupHost, params]);

  return (
    <div className="min-h-screen bg-[#1A2F4A]">
      <Helmet>
        <title>AIFT — ECB 操作說明手冊</title>
        <meta name="description" content="查閱 AIFT 的 ECB 銀行開戶與操作手冊，瞭解如何註冊帳號、提交文件及啟動 AI 自動化交易流程。" />
        <link rel="canonical" href="https://aift.lovable.app/ecb-manual" />
        <meta property="og:title" content="AIFT — ECB 操作說明手冊" />
        <meta property="og:description" content="查閱 AIFT 的 ECB 銀行開戶與操作手冊，瞭解如何註冊帳號、提交文件及啟動 AI 自動化交易流程。" />
        <meta property="og:url" content="https://aift.lovable.app/ecb-manual" />
        <meta property="og:type" content="article" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": [
            {
              "@type": "Question",
              "name": "開戶需要多長時間？",
              "acceptedAnswer": { "@type": "Answer", "text": "資料無誤的情況下，審查通常約 3 個工作天完成。若需補件或追加資料則可能延長。" }
            },
            {
              "@type": "Question",
              "name": "可以開設哪種帳戶？",
              "acceptedAnswer": { "@type": "Answer", "text": "ECB 支援個人帳戶（Individual）與公司帳戶（Corporate）兩種。" }
            },
            {
              "@type": "Question",
              "name": "如何申請開戶？",
              "acceptedAnswer": { "@type": "Answer", "text": "請聯繫客服人員取得專屬開戶連結與邀請碼，再依照說明完成申請。" }
            }
          ]
        })}</script>
      </Helmet>
      <EcbGuideOverlay />
    </div>
  );
};

export default EcbManual;