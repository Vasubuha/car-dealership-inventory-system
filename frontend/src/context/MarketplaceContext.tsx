import { createContext, useContext, useState, type ReactNode } from 'react';
import { MARKETPLACE_SECTIONS } from '../constants/marketplaceSections';

interface MarketplaceContextValue {
  lastVisitedSection: string;
  activeSection: string;
  setLastVisitedSection: (section: string) => void;
  setActiveSection: (section: string) => void;
}

const MarketplaceContext = createContext<MarketplaceContextValue | undefined>(undefined);

export function MarketplaceProvider({ children }: { children: ReactNode }) {
  const [lastVisitedSection, setLastVisitedSection] = useState<string>(MARKETPLACE_SECTIONS.HERO);
  const [activeSection, setActiveSection] = useState<string>(MARKETPLACE_SECTIONS.HERO);

  return (
    <MarketplaceContext.Provider
      value={{
        lastVisitedSection,
        activeSection,
        setLastVisitedSection,
        setActiveSection,
      }}
    >
      {children}
    </MarketplaceContext.Provider>
  );
}

export function useMarketplace() {
  const context = useContext(MarketplaceContext);
  if (!context) {
    throw new Error('useMarketplace must be used within a MarketplaceProvider');
  }
  return context;
}
