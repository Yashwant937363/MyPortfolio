import { createContext, useContext, useState, type ReactNode } from "react";

interface UIState {
  isHeroInView: boolean;
  setHeroInView: (inView: boolean) => void;
}

const UIContext = createContext<UIState | undefined>(undefined);

export const UIStateProvider = ({ children }: { children: ReactNode }) => {
  const [isHeroInView, setHeroInView] = useState(false);
  return (
    <UIContext.Provider value={{ isHeroInView, setHeroInView }}>
      {children}
    </UIContext.Provider>
  );
};

export const useUIState = () => {
  const context = useContext(UIContext);
  if (!context)
    throw new Error("useUIState must be used within a UIStateProvider");
  return context;
};
