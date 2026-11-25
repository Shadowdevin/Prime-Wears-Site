/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { CartProvider, useCart } from './context/CartContext';
import { OrderProvider } from './context/OrderContext';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { MainHome } from './components/home/MainHome';
import { NativeWearsPage } from './components/native/NativeWearsPage';
import { CasualSwagPage } from './components/casual/CasualSwagPage';
import { ShowroomEngine } from './components/casual/ShowroomEngine';
import { AdminPortal } from './components/admin/AdminPortal';
import { WishlistView } from './components/common/WishlistView';
import { ProductDetailModal } from './components/common/ProductDetailModal';
import { CustomOrderModal } from './components/native/CustomOrderModal';
import { MeasurementGuideModal } from './components/native/MeasurementGuideModal';
import { CartDrawer } from './components/cart/CartDrawer';
import { CheckoutModal } from './components/cart/CheckoutModal';
import { OrderTrackingPage } from './components/orders/OrderTrackingPage';
import { Product } from './types';
import { PRODUCTS } from './data/products';
import { CheckCircle2, X } from 'lucide-react';
import { FloatingWhatsAppButton } from './components/common/FloatingWhatsAppButton';
import { BreadcrumbBackBar } from './components/common/BreadcrumbBackBar';
import { getRouteTitle } from './utils/navigation';

const AppContent: React.FC = () => {
  const { toastMessage, clearToast, setIsCartOpen } = useCart();

  // Navigation State with Hash Synchronization & History Stack
  const [route, setRoute] = useState<string>(() => {
    const rawHash = window.location.hash.replace('#/', '').replace('#', '');
    const cleanRoute = rawHash.split('?')[0];
    return cleanRoute || 'native';
  });

  const [navigationHistory, setNavigationHistory] = useState<string[]>([]);

  const [activeTrackingRef, setActiveTrackingRef] = useState<string>(() => {
    const rawHash = window.location.hash;
    const match = rawHash.match(/[?&]ref=([^&]+)/);
    return match ? decodeURIComponent(match[1]) : '';
  });

  // Modal States
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isCustomOrderOpen, setIsCustomOrderOpen] = useState(false);
  const [customOrderPreselect, setCustomOrderPreselect] = useState<Product | null>(null);
  const [isMeasurementGuideOpen, setIsMeasurementGuideOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  // Sync hash routing & browser back/forward buttons
  useEffect(() => {
    const handleHashChange = () => {
      const rawHash = window.location.hash.replace('#/', '').replace('#', '');
      const cleanRoute = rawHash.split('?')[0] || 'native';
      setRoute(cleanRoute);

      const match = window.location.hash.match(/[?&]ref=([^&]+)/);
      if (match) {
        setActiveTrackingRef(decodeURIComponent(match[1]));
      }

      // Deep linking for products or browser back/forward navigation
      const productMatch = window.location.hash.match(/[?&]product=([^&]+)/) || window.location.search.match(/[?&]product=([^&]+)/);
      if (productMatch) {
        const prodId = decodeURIComponent(productMatch[1]);
        const found = PRODUCTS.find((p) => p.id === prodId);
        if (found) {
          setSelectedProduct(found);
        }
      } else {
        // If the URL has no product parameter anymore (e.g. user clicked browser back button), close product!
        setSelectedProduct(null);
      }
    };

    // Run on initial mount
    handleHashChange();

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [route]);

  const navigateTo = (newRoute: string, recordHistory = true) => {
    if (selectedProduct) {
      setSelectedProduct(null);
    }
    if (recordHistory && newRoute !== route) {
      setNavigationHistory((prev) => [...prev, route]);
    }
    setRoute(newRoute);
    window.location.hash = `#/${newRoute === 'home' ? '' : newRoute}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectProduct = (product: Product) => {
    setSelectedProduct(product);
    // Sync URL hash with product query param so browser Back/Forward closes and opens product
    const baseHash = `#/${route === 'home' ? '' : route}`;
    const targetHash = `${baseHash}?product=${encodeURIComponent(product.id)}`;
    if (window.location.hash !== targetHash) {
      window.location.hash = targetHash;
    }
  };

  const handleCloseProduct = () => {
    if (window.location.hash.includes('product=')) {
      const baseRoute = `#/${route === 'home' ? '' : route}`;
      if (window.history.length > 1) {
        window.history.back();
      } else {
        window.location.hash = baseRoute;
      }
    }
    setSelectedProduct(null);
  };

  const goBack = () => {
    // 1. If a product modal is open, closing it returns directly to the catalog
    if (selectedProduct) {
      handleCloseProduct();
      return;
    }

    // 2. If we have a navigation history stack, pop and return to the previous page
    if (navigationHistory.length > 0) {
      const prevRoute = navigationHistory[navigationHistory.length - 1];
      setNavigationHistory((prev) => prev.slice(0, -1));
      navigateTo(prevRoute, false);
      return;
    }

    // 3. Fall back to native if currently on a subpage
    if (route !== 'native') {
      navigateTo('native', false);
      return;
    }

    // 4. Browser history fallback
    if (window.history.length > 1) {
      window.history.back();
    }
  };

  const handleTrackOrder = (orderRef: string) => {
    setActiveTrackingRef(orderRef);
    setRoute('track');
    window.location.hash = `#/track?ref=${encodeURIComponent(orderRef)}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenCustomOrder = (product?: Product) => {
    setCustomOrderPreselect(product || null);
    setIsCustomOrderOpen(true);
  };

  const handleSelectProductById = (productId: string) => {
    const item = PRODUCTS.find((p) => p.id === productId);
    if (item) {
      handleSelectProduct(item);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-neutral-900 font-sans selection:bg-amber-200 selection:text-neutral-900">
      {/* Top Navbar */}
      <Navbar
        currentRoute={route}
        onNavigate={navigateTo}
        onOpenCustomOrder={() => handleOpenCustomOrder()}
        onBack={goBack}
        canGoBack={navigationHistory.length > 0 || route !== 'home'}
      />

      {/* Universal Page Back & Breadcrumb Navigation Bar (shown when not on home) */}
      <BreadcrumbBackBar
        currentRoute={route}
        onBack={goBack}
        onNavigate={navigateTo}
        previousRouteTitle={
          navigationHistory.length > 0
            ? getRouteTitle(navigationHistory[navigationHistory.length - 1])
            : 'Home'
        }
      />

      {/* Main Content Router */}
      <main className="flex-1">
        {(route === 'home' || route === 'native') && (
          <NativeWearsPage
            onSelectProduct={handleSelectProduct}
            onOpenCustomOrder={handleOpenCustomOrder}
            onOpenMeasurementGuide={() => setIsMeasurementGuideOpen(true)}
            onNavigate={navigateTo}
          />
        )}

        {route === 'shoes' && (
          <NativeWearsPage
            onSelectProduct={handleSelectProduct}
            onOpenCustomOrder={handleOpenCustomOrder}
            onOpenMeasurementGuide={() => setIsMeasurementGuideOpen(true)}
            initialSubCategory="shoes"
            onNavigate={navigateTo}
          />
        )}

        {(route === 'women' || route === 'female' || route === 'female-wear') && (
          <NativeWearsPage
            onSelectProduct={handleSelectProduct}
            onOpenCustomOrder={handleOpenCustomOrder}
            onOpenMeasurementGuide={() => setIsMeasurementGuideOpen(true)}
            initialSubCategory="female"
            onNavigate={navigateTo}
          />
        )}

        {route === 'style-guide' && (
          <NativeWearsPage
            onSelectProduct={handleSelectProduct}
            onOpenCustomOrder={handleOpenCustomOrder}
            onOpenMeasurementGuide={() => setIsMeasurementGuideOpen(true)}
            initialSubCategory="female"
            onNavigate={navigateTo}
          />
        )}

        {route === 'agbada' && (
          <NativeWearsPage
            onSelectProduct={handleSelectProduct}
            onOpenCustomOrder={handleOpenCustomOrder}
            onOpenMeasurementGuide={() => setIsMeasurementGuideOpen(true)}
            initialSubCategory="agbada"
            onNavigate={navigateTo}
          />
        )}

        {route === 'his-highness' && (
          <NativeWearsPage
            onSelectProduct={handleSelectProduct}
            onOpenCustomOrder={handleOpenCustomOrder}
            onOpenMeasurementGuide={() => setIsMeasurementGuideOpen(true)}
            initialSubCategory="his-highness"
            onNavigate={navigateTo}
          />
        )}

        {route === 'suit' && (
          <NativeWearsPage
            onSelectProduct={handleSelectProduct}
            onOpenCustomOrder={handleOpenCustomOrder}
            onOpenMeasurementGuide={() => setIsMeasurementGuideOpen(true)}
            initialSubCategory="suit"
            onNavigate={navigateTo}
          />
        )}

        {route === 'casual' && (
          <CasualSwagPage
            onSelectProduct={handleSelectProduct}
            onNavigate={navigateTo}
          />
        )}

        {route === 'showroom' && (
          <div className="py-6">
            <ShowroomEngine
              onSelectProductById={handleSelectProductById}
              onScrollToCatalog={() => navigateTo('casual')}
              onExploreNewArrivals={() => navigateTo('casual')}
            />
          </div>
        )}

        {route === 'bespoke' && (
          <div className="py-8">
            <NativeWearsPage
              onSelectProduct={handleSelectProduct}
              onOpenCustomOrder={handleOpenCustomOrder}
              onOpenMeasurementGuide={() => setIsMeasurementGuideOpen(true)}
              onNavigate={navigateTo}
            />
          </div>
        )}

        {(route === 'track' || route === 'tracking') && (
          <OrderTrackingPage
            initialOrderRef={activeTrackingRef}
            onNavigate={navigateTo}
            onOpenCustomOrder={handleOpenCustomOrder}
          />
        )}

        {route === 'admin' && <AdminPortal />}

        {route === 'wishlist' && (
          <WishlistView
            onSelectProduct={handleSelectProduct}
            onNavigate={navigateTo}
            onOpenCustomOrder={handleOpenCustomOrder}
            onBack={goBack}
          />
        )}
      </main>

      {/* Global Footer */}
      <Footer onNavigate={navigateTo} />

      {/* Interactive Global Modals */}

      <ProductDetailModal
        product={selectedProduct}
        onClose={handleCloseProduct}
        onOpenCustomOrder={(p) => handleOpenCustomOrder(p)}
        onOpenMeasurementGuide={() => setIsMeasurementGuideOpen(true)}
        previousPageName={getRouteTitle(route)}
        onNavigateToCategory={navigateTo}
      />

      <CustomOrderModal
        isOpen={isCustomOrderOpen || (route === 'bespoke' && !selectedProduct)}
        onClose={() => {
          setIsCustomOrderOpen(false);
          if (route === 'bespoke') navigateTo('native');
        }}
        preselectedProduct={customOrderPreselect}
        onOpenMeasurementGuide={() => setIsMeasurementGuideOpen(true)}
        onTrackOrder={handleTrackOrder}
      />

      <MeasurementGuideModal
        isOpen={isMeasurementGuideOpen}
        onClose={() => setIsMeasurementGuideOpen(false)}
      />

      <CartDrawer
        onOpenCheckout={() => setIsCheckoutOpen(true)}
        onNavigate={navigateTo}
      />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        onOrderSuccess={(ref) => {
          console.log('Order finalized', ref);
        }}
        onTrackOrder={handleTrackOrder}
      />

      {/* Floating WhatsApp Concierge Button (Fixed at bottom-right corner) */}
      <FloatingWhatsAppButton />

      {/* Toast Feedback Notification Banner */}
      {toastMessage && (
        <div className="fixed bottom-24 right-6 z-50 bg-neutral-950 text-white px-4 py-3 rounded-lg shadow-2xl border border-neutral-800 flex items-center gap-3 animate-fadeIn">
          <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
          <span className="text-xs font-medium">{toastMessage}</span>
          <button
            onClick={clearToast}
            aria-label="Dismiss message"
            className="text-neutral-400 hover:text-white p-1"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}
    </div>
  );
};

export default function App() {
  return (
    <CartProvider>
      <OrderProvider>
        <AppContent />
      </OrderProvider>
    </CartProvider>
  );
}
