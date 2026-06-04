import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
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
      <EcbGuideOverlay />
    </div>
  );
};

export default EcbManual;