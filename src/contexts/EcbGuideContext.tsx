import { createContext, useContext, useState, useCallback, type ReactNode } from "react";

interface EcbGuideContextType {
  isOpen: boolean;
  open: () => void;
  close: () => void;
}

const EcbGuideContext = createContext<EcbGuideContextType | null>(null);

export const EcbGuideProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);

  const open = useCallback(() => {
    setIsOpen(true);
    document.body.style.overflow = "hidden";
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
    document.body.style.overflow = "";
  }, []);

  return (
    <EcbGuideContext.Provider value={{ isOpen, open, close }}>
      {children}
    </EcbGuideContext.Provider>
  );
};

export const useEcbGuide = () => {
  const ctx = useContext(EcbGuideContext);
  if (!ctx) throw new Error("useEcbGuide must be used within EcbGuideProvider");
  return ctx;
};
