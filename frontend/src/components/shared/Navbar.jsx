import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Car, Menu, X, ArrowRight, Sparkles, User, LogOut, ShoppingBag, Heart } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useMarketplace } from '../../context/MarketplaceContext';
import { navigationService } from '../../services/navigation.service';
import { GUEST_NAV_ITEMS, CUSTOMER_NAV_ITEMS, ADMIN_NAV_ITEMS } from '../../config/navigation';
import { MARKETPLACE_SECTIONS } from '../../constants/marketplaceSections';

export default function Navbar({ mode = 'public' }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const { user, isAuthenticated, logout, openLogin, openRegister } = useAuth();
  const { activeSection, setActiveSection, setLastVisitedSection } = useMarketplace();
  const navigate = useNavigate();
  const location = useLocation();

  const isCustomer = mode === 'customer' || (isAuthenticated && user?.role === 'customer');
  const isAdmin = mode === 'admin' || (isAuthenticated && user?.role === 'admin');

  const navLinks = isCustomer ? CUSTOMER_NAV_ITEMS : isAdmin ? ADMIN_NAV_ITEMS : GUEST_NAV_ITEMS;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // IntersectionObserver for Section Navigation on /home
  useEffect(() => {
    if (location.pathname !== '/home') return;

    const sections = Object.values(MARKETPLACE_SECTIONS);
    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          setActiveSection(id);
          setLastVisitedSection(id);
        }
      });
    };

    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -40% 0px',
      threshold: 0.2,
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    sections.forEach((secId) => {
      const el = document.getElementById(secId);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [location.pathname, setActiveSection, setLastVisitedSection]);

  const handleNavClick = (e, item) => {
    e.preventDefault();
    setMobileMenuOpen(false);

    if (item.isSection && item.sectionId) {
      const isHome = location.pathname === '/home';
      navigationService.navigateToMarketplaceSection(navigate, item.sectionId, isHome);
    } else {
      navigate(item.href);
    }
  };

  const handleOpenLogin = () => {
    setMobileMenuOpen(false);
    openLogin();
  };

  const handleOpenRegister = () => {
    setMobileMenuOpen(false);
    openRegister();
  };

  const handleLogout = () => {
    logout();
    navigate('/', { replace: true });
  };

  const isItemActive = (item) => {
    if (location.pathname === '/home' && item.isSection) {
      return activeSection === item.sectionId;
    }
    if (!item.isSection) {
      return location.pathname === item.href;
    }
    return false;
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/85 backdrop-blur-md border-b border-slate-200/80 shadow-xs py-3.5'
          : 'bg-white/60 backdrop-blur-xs py-5 border-b border-slate-100/60'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link
            to={isCustomer ? '/home' : isAdmin ? '/dashboard' : '/'}
            className="flex items-center gap-2.5 group focus:outline-none"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 p-0.5 shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-white rounded-[10px] flex items-center justify-center">
                <Car className="w-5 h-5 text-blue-600" />
              </div>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-heading font-extrabold text-xl tracking-tight text-slate-900 group-hover:text-blue-600 transition-colors">
                  Autovance
                </span>
                <span className="text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200">
                  {isCustomer ? 'Member' : isAdmin ? 'Admin OS' : 'Motors OS'}
                </span>
              </div>
              <span className="text-[11px] text-slate-500 font-medium tracking-wide -mt-1 hidden sm:inline">
                {isCustomer ? 'Marketplace Hub' : 'Dealership Inventory Platform'}
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-1 bg-slate-100/70 backdrop-blur-md px-4 py-1.5 rounded-full border border-slate-200/80">
            {navLinks.map((link) => {
              const active = isItemActive(link);
              return (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link)}
                  className={`px-3.5 py-1.5 text-xs font-semibold rounded-full transition-all duration-150 shadow-2xs ${
                    active
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                      : 'text-slate-600 hover:text-blue-600 hover:bg-white'
                  }`}
                >
                  {link.label}
                </a>
              );
            })}
          </nav>

          {/* Right Action / User Profile */}
          <div className="hidden md:flex items-center gap-3">
            {isAuthenticated && user ? (
              <div className="flex items-center gap-3 pl-2 border-l border-slate-200">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xs shadow-sm">
                    {user.username?.charAt(0).toUpperCase() || 'U'}
                  </div>
                  <div className="flex flex-col text-left">
                    <span className="text-xs font-bold text-slate-900 line-clamp-1">{user.username || 'Member'}</span>
                    <span className="text-[10px] text-blue-600 font-semibold uppercase tracking-wider">
                      {user.role || 'Customer'}
                    </span>
                  </div>
                </div>
                <button
                  onClick={handleLogout}
                  className="p-2 rounded-xl text-slate-500 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                  title="Logout"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <>
                <button
                  onClick={handleOpenLogin}
                  className="px-4 py-2 text-xs font-semibold text-slate-700 hover:text-blue-600 transition-colors"
                >
                  Sign In
                </button>
                <button
                  onClick={handleOpenRegister}
                  className="px-4 py-2 text-xs font-semibold text-slate-700 hover:text-blue-600 transition-colors"
                >
                  Register
                </button>
                <button
                  onClick={handleOpenLogin}
                  className="inline-flex items-center gap-2 px-4.5 py-2.5 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-md shadow-blue-500/20 active:scale-[0.98] transition-all duration-200"
                >
                  <Sparkles className="w-3.5 h-3.5 text-blue-200" />
                  <span>Get Started</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex md:hidden items-center gap-2">
            {isAuthenticated ? (
              <button
                onClick={handleLogout}
                className="p-2 rounded-lg text-rose-600 bg-rose-50 border border-rose-200 text-xs font-bold"
              >
                Logout
              </button>
            ) : (
              <button
                onClick={handleOpenLogin}
                className="px-3 py-1.5 rounded-lg text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-xs"
              >
                Get Started
              </button>
            )}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-700 hover:bg-slate-100 border border-slate-200"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 mt-3 shadow-xl">
          <nav className="flex flex-col gap-1">
            {navLinks.map((link) => {
              const active = isItemActive(link);
              return (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link)}
                  className={`px-4 py-2.5 text-sm font-medium rounded-lg transition-colors text-left ${
                    active
                      ? 'bg-blue-600 text-white font-bold'
                      : 'text-slate-700 hover:text-blue-600 hover:bg-slate-50'
                  }`}
                >
                  {link.label}
                </a>
              );
            })}
          </nav>
          <div className="mt-4 pt-4 border-t border-slate-100 grid grid-cols-2 gap-2">
            {isAuthenticated ? (
              <button
                onClick={handleLogout}
                className="col-span-2 w-full py-2.5 text-center text-xs font-bold text-rose-600 bg-rose-50 hover:bg-rose-100 rounded-lg border border-rose-200"
              >
                Logout Account
              </button>
            ) : (
              <>
                <button
                  onClick={handleOpenLogin}
                  className="w-full py-2.5 text-center text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg"
                >
                  Sign In
                </button>
                <button
                  onClick={handleOpenRegister}
                  className="w-full py-2.5 text-center text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg"
                >
                  Register
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
