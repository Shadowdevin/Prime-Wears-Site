import React, { useState } from 'react';
import {
  ShoppingBag,
  Heart,
  Menu,
  X,
  ShieldCheck,
  Scissors,
  Sparkles,
  Ruler,
  Compass,
  Footprints,
  ChevronRight,
  MapPin,
  Crown,
  Briefcase,
  Package,
  ArrowLeft
} from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { ASSETS } from '../../data/assets';

interface NavbarProps {
  currentRoute: string;
  onNavigate: (route: string) => void;
  onOpenCustomOrder?: () => void;
  onBack?: () => void;
  canGoBack?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentRoute,
  onNavigate,
  onOpenCustomOrder,
  onBack,
  canGoBack = false,
}) => {
  const { totalItems, setIsCartOpen, wishlist, subtotal } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const mainNavItems = [
    { label: 'Explore Native', route: 'native', icon: Scissors, badge: 'Heritage' },
    { label: "Women's Couture", route: 'women', icon: Crown, badge: 'Her Majesty' },
    { label: 'Grand Agbada', route: 'agbada', icon: Crown, badge: 'Imperial' },
    { label: 'His Highness', route: 'his-highness', icon: Sparkles, badge: 'Regal' },
    { label: 'Bespoke Suits', route: 'suit', icon: Briefcase, badge: 'Savile Row' },
    { label: 'Casual Swag', route: 'casual', icon: Sparkles, badge: 'Runway' },
    { label: '3D Showroom', route: 'showroom', icon: Compass, badge: '360°' },
    { label: 'Track Order', route: 'track', icon: Package, badge: 'Live' },
    { label: 'Corporate Shoes', route: 'shoes', icon: Footprints },
    { label: 'Staff Portal', route: 'admin', icon: ShieldCheck },
  ];

  const handleNavClick = (route: string) => {
    onNavigate(route);
    setMobileMenuOpen(false);
  };

  return (
    <div className="sticky top-0 z-50 w-full shadow-2xl">
      {/* Main Luxury Top Header */}
      <header className="bg-neutral-950/98 backdrop-blur-xl border-b border-amber-500/20 text-white transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 sm:h-22 flex items-center justify-between gap-3">
          
          <div className="flex items-center gap-2 sm:gap-4 min-w-0 flex-1 sm:flex-initial">
            {/* Quick Back Button (Shown on tablets and desktop when not on Native/Home; on mobile BreadcrumbBackBar right beneath provides direct return) */}
            {currentRoute !== 'home' && currentRoute !== 'native' && onBack && (
              <button
                onClick={onBack}
                className="hidden sm:inline-flex p-2 px-3 py-1.5 rounded-lg bg-neutral-900/95 hover:bg-neutral-850 text-amber-300 hover:text-white border border-amber-500/40 hover:border-amber-400 font-bold text-xs transition-all items-center gap-1.5 shadow-md group shrink-0"
                title="Go back to previous page"
                aria-label="Go back to previous page"
              >
                <ArrowLeft className="w-4 h-4 text-amber-400 group-hover:-translate-x-0.5 transition-transform" />
                <span>Back</span>
              </button>
            )}

            {/* Brand Logo & Wordmark - Protected from overlapping */}
            <button
              onClick={() => handleNavClick('native')}
              className="flex items-center gap-2.5 sm:gap-4 text-left group focus-visible:outline-none min-w-0 py-1"
              aria-label="Prime Wears Home"
            >
              <div className="relative flex items-center justify-center shrink-0">
                <img
                  src={ASSETS.logoGold}
                  alt="Prime Wears Official Logo"
                  className="h-10 sm:h-14 md:h-16 w-auto object-contain transition-transform duration-300 group-hover:scale-105 filter drop-shadow-[0_2px_10px_rgba(212,175,55,0.4)]"
                />
              </div>
              <div className="flex flex-col justify-center min-w-0">
                <span className="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-wider sm:tracking-widest text-white font-serif-luxury leading-none truncate">
                  PRIME WEARS
                </span>
                <span className="text-[9px] sm:text-[11px] tracking-[0.24em] text-amber-400 uppercase font-semibold mt-0.5 sm:mt-1 truncate">
                  Culture & Swag
                </span>
              </div>
            </button>
          </div>

          {/* Desktop Navigation Links (Visible on large & medium screens) */}
          <nav className="hidden xl:flex items-center gap-1.5 2xl:gap-3 text-xs font-semibold tracking-wider uppercase">
            {mainNavItems.map((item) => {
              const isActive =
                currentRoute === item.route ||
                (item.route === 'shoes' && currentRoute === 'native');
              const Icon = item.icon;

              return (
                <button
                  key={item.route}
                  onClick={() => handleNavClick(item.route)}
                  className={`relative px-3 py-2 rounded-md transition-all flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-amber-500/15 text-amber-400 font-bold border border-amber-500/40 shadow-[0_0_15px_rgba(212,175,55,0.15)]'
                      : 'text-neutral-300 hover:text-white hover:bg-neutral-900 border border-transparent'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-amber-400' : 'text-neutral-400'}`} />
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className="text-[9px] px-1 py-0.2 rounded bg-neutral-800 text-amber-300 border border-neutral-700 font-mono lowercase">
                      {item.badge}
                    </span>
                  )}
                  {isActive && (
                    <span className="absolute -bottom-[1px] left-3 right-3 h-[2px] bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action Utilities - Clean and zero overlapping */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Shopping Bag Trigger (Shown on desktop & tablet; on mobile it lives in the menu drawer without blocking header) */}
            <button
              onClick={() => setIsCartOpen(true)}
              aria-label="Open Shopping Bag"
              className="hidden md:inline-flex items-center gap-2 px-3 sm:px-4 py-2 bg-neutral-900 hover:bg-neutral-800 text-white rounded-lg text-xs font-bold tracking-wider uppercase transition-all border border-amber-500/30 hover:border-amber-500/60 shadow-lg"
            >
              <ShoppingBag className="w-4 h-4 text-amber-400" />
              <span>Bag</span>
              <span className="w-5 h-5 rounded bg-amber-400 text-neutral-950 text-xs font-extrabold flex items-center justify-center tabular-nums">
                {totalItems}
              </span>
            </button>

            {/* Custom Tailoring CTA Button (Desktop) */}
            <button
              onClick={() => {
                if (onOpenCustomOrder) {
                  onOpenCustomOrder();
                } else {
                  handleNavClick('bespoke');
                }
              }}
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-neutral-950 rounded-lg text-xs font-bold uppercase tracking-wider transition-all shadow-md hover:shadow-amber-500/20"
            >
              <Scissors className="w-3.5 h-3.5 text-neutral-950" />
              <span>Custom Fit</span>
            </button>

            {/* Mobile / Tablet Menu Toggle with optional active cart badge */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden relative p-2.5 text-neutral-300 hover:text-white rounded-lg hover:bg-neutral-900 border border-neutral-800 transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-amber-400" /> : <Menu className="w-5 h-5" />}
              {totalItems > 0 && !mobileMenuOpen && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-amber-400 text-neutral-950 text-[10px] font-extrabold flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Mobile & Tablet Navigation Drawer (Expands on Hamburger click) */}
        {mobileMenuOpen && (
          <div className="xl:hidden border-t border-neutral-800 bg-neutral-950/98 px-4 pt-4 pb-8 space-y-4 shadow-2xl animate-fadeIn">
            {/* Mobile Quick Utility Actions: Bag & Saved Wishlist */}
            <div className="grid grid-cols-2 gap-2 pb-2 border-b border-neutral-800">
              <button
                onClick={() => {
                  setIsCartOpen(true);
                  setMobileMenuOpen(false);
                }}
                className="p-3 bg-neutral-900 hover:bg-neutral-850 border border-amber-500/30 rounded-xl flex items-center justify-between text-left group transition-all"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-amber-500/15 flex items-center justify-center text-amber-400 group-hover:scale-105 transition-transform">
                    <ShoppingBag className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-neutral-400 block font-semibold">Shopping</span>
                    <span className="text-xs font-bold text-white">My Bag</span>
                  </div>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-amber-400 text-neutral-950 text-xs font-black">
                  {totalItems}
                </span>
              </button>

              <button
                onClick={() => {
                  handleNavClick('wishlist');
                }}
                className="p-3 bg-neutral-900 hover:bg-neutral-850 border border-neutral-800 hover:border-neutral-700 rounded-xl flex items-center justify-between text-left group transition-all"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-neutral-800 flex items-center justify-center text-amber-400 group-hover:scale-105 transition-transform">
                    <Heart className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-neutral-400 block font-semibold">Saved</span>
                    <span className="text-xs font-bold text-white">Wishlist</span>
                  </div>
                </div>
                {wishlist.length > 0 && (
                  <span className="px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/40 text-xs font-bold">
                    {wishlist.length}
                  </span>
                )}
              </button>
            </div>

            <div className="text-[11px] font-bold text-amber-400 uppercase tracking-widest px-2">
              Browse Experiences & Collections
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {mainNavItems.map((item) => {
                const isActive =
                  currentRoute === item.route ||
                  (item.route === 'shoes' && currentRoute === 'native');
                const Icon = item.icon;

                return (
                  <button
                    key={item.route}
                    onClick={() => handleNavClick(item.route)}
                    className={`text-left px-4 py-3 rounded-lg text-sm font-semibold tracking-wide flex items-center justify-between transition-colors border ${
                      isActive
                        ? 'bg-amber-500 text-neutral-950 border-amber-400 font-bold shadow'
                        : 'bg-neutral-900 text-neutral-200 hover:bg-neutral-800 hover:text-white border-neutral-800'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className={`w-4 h-4 ${isActive ? 'text-neutral-950' : 'text-amber-400'}`} />
                      <span>{item.label}</span>
                    </div>
                    <ChevronRight className={`w-4 h-4 ${isActive ? 'text-neutral-950' : 'text-neutral-500'}`} />
                  </button>
                );
              })}
            </div>

            {/* Quick Action Drawer CTAs */}
            <div className="pt-3 border-t border-neutral-800/80 flex flex-col sm:flex-row gap-2">
              <button
                onClick={() => {
                  if (onOpenCustomOrder) {
                    onOpenCustomOrder();
                  } else {
                    handleNavClick('bespoke');
                  }
                  setMobileMenuOpen(false);
                }}
                className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs uppercase tracking-wider rounded-lg text-center flex items-center justify-center gap-2 shadow-lg"
              >
                <Scissors className="w-4 h-4 text-neutral-950" />
                <span>Submit Custom Measurement Order</span>
              </button>

              <button
                onClick={() => handleNavClick('showroom')}
                className="w-full py-3 bg-neutral-900 hover:bg-neutral-800 text-white border border-neutral-700 font-semibold text-xs uppercase tracking-wider rounded-lg text-center flex items-center justify-center gap-2"
              >
                <Compass className="w-4 h-4 text-amber-400" />
                <span>Launch 3D Virtual Showroom</span>
              </button>
            </div>

            {/* Flagship stores info in drawer */}
            <div className="pt-2 text-[11px] text-neutral-400 px-2 flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>Flagships: Uyo, Calabar, Port-Harcourt · Worldwide DHL Shipping</span>
            </div>
          </div>
        )}
      </header>
    </div>
  );
};
