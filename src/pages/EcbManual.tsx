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
      </Helmet>
      <EcbGuideOverlay />
    </div>
  );
};

export default EcbManual;