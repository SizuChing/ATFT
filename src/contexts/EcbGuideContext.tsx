import { createContext, useContext, useState, useCallback, type ReactNode } from "react";

export type EcbGuideOpenOptions = {
  section?: string;
  docTab?: "personal" | "corporate";
};

interface EcbGuideContextType {
  isOpen: boolean;
  open: (opts?: EcbGuideOpenOptions) => void;
  close: () => void;
  initialSection: string | null;
  initialDocTab: "personal" | "corporate" | null;
}

const EcbGuideContext = createContext<EcbGuideContextType | null>(null);

export const EcbGuideProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [initialSection, setInitialSection] = useState<string | null>(null);
  const [initialDocTab, setInitialDocTab] = useState<"personal" | "corporate" | null>(null);

  const open = useCallback((opts?: EcbGuideOpenOptions) => {
    setInitialSection(opts?.section ?? null);
    setInitialDocTab(opts?.docTab ?? null);
    setIsOpen(true);
    document.body.style.overflow = "hidden";
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
    document.body.style.overflow = "";
  }, []);

  return (
    <EcbGuideContext.Provider value={{ isOpen, open, close, initialSection, initialDocTab }}>
      {children}
    </EcbGuideContext.Provider>
  );
};

export const useEcbGuide = () => {
  const ctx = useContext(EcbGuideContext);
  if (!ctx) throw new Error("useEcbGuide must be used within EcbGuideProvider");
  return ctx;
};
