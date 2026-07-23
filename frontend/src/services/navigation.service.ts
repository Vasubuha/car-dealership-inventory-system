export const navigationService = {
  scrollToSection(sectionId: string): boolean {
    if (!sectionId) return false;
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      return true;
    }
    return false;
  },

  navigateToMarketplaceSection(
    navigateFn: (path: string) => void,
    sectionId: string,
    isCurrentHome: boolean
  ): void {
    if (isCurrentHome) {
      this.scrollToSection(sectionId);
    } else {
      navigateFn(`/home#${sectionId}`);
    }
  },
};
