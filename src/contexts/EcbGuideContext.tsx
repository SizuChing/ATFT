import { createContext, useContext, useState, useCallback, useRef, type ReactNode } from "react";

export type EcbGuideOpenOptions = {
  section?: string;
  docTab?: "personal" | "corporate";
};

interface EcbGuideContextType {
  isOpen: boolean;
  open: (opts?: EcbGuideOpenOptions) => void;
  openInline: (opts?: EcbGuideOpenOptions) => void;
  close: () => void;
  initialSection: string | null;
  initialDocTab: "personal" | "corporate" | null;
  setPopupHost: (v: boolean) => void;
}

const EcbGuideContext = createContext<EcbGuideContextType | null>(null);

export const EcbGuideProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [initialSection, setInitialSection] = useState<string | null>(null);
  const [initialDocTab, setInitialDocTab] = useState<"personal" | "corporate" | null>(null);
  const popupHostRef = useRef(false);

  const openInline = useCallback((opts?: EcbGuideOpenOptions) => {
    setInitialSection(opts?.section ?? null);
    setInitialDocTab(opts?.docTab ?? null);
    setIsOpen(true);
    document.body.style.overflow = "hidden";
  }, []);

  const open = useCallback((opts?: EcbGuideOpenOptions) => {
    if (
      !popupHostRef.current &&
      typeof window !== "undefined" &&
      window.innerWidth >= 1024
    ) {
      const params = new URLSearchParams();
      if (opts?.section) params.set("section", opts.section);
      if (opts?.docTab) params.set("docTab", opts.docTab);
      const qs = params.toString();
      const url = `/ecb-manual${qs ? `?${qs}` : ""}`;
      const w = Math.min(1280, window.screen.availWidth);
      const h = Math.min(900, window.screen.availHeight);
      const left = Math.max(0, (window.screen.availWidth - w) / 2);
      const top = Math.max(0, (window.screen.availHeight - h) / 2);
      window.open(
        url,
        "ecb-manual",
        `popup=yes,noopener,width=${w},height=${h},left=${left},top=${top}`,
      );
      return;
    }
    openInline(opts);
  }, [openInline]);

  const close = useCallback(() => {
    if (popupHostRef.current && typeof window !== "undefined") {
      window.close();
      return;
    }
    setIsOpen(false);
    document.body.style.overflow = "";
  }, []);

  const setPopupHost = useCallback((v: boolean) => {
    popupHostRef.current = v;
  }, []);

  return (
    <EcbGuideContext.Provider value={{ isOpen, open, openInline, close, initialSection, initialDocTab, setPopupHost }}>
      {children}
    </EcbGuideContext.Provider>
  );
};

export const useEcbGuide = () => {
  const ctx = useContext(EcbGuideContext);
  if (!ctx) throw new Error("useEcbGuide must be used within EcbGuideProvider");
  return ctx;
};
