import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useMarketplace } from '../../context/MarketplaceContext';
import { navigationService } from '../../services/navigation.service';
import { MARKETPLACE_SECTIONS } from '../../constants/marketplaceSections';

export default function ScrollManager() {
  const location = useLocation();
  const { lastVisitedSection, setLastVisitedSection } = useMarketplace();

  useEffect(() => {
    if (location.pathname === '/home') {
      const hash = location.hash.replace('#', '');
      if (hash) {
        const scrolled = navigationService.scrollToSection(hash);
        if (scrolled) {
          setLastVisitedSection(hash);
          return;
        }
      }

      if (lastVisitedSection && lastVisitedSection !== MARKETPLACE_SECTIONS.HERO) {
        navigationService.scrollToSection(lastVisitedSection);
      }
    }
  }, [location.pathname, location.hash]);

  return null;
}
