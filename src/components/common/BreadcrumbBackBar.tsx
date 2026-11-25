import React from 'react';
import { ArrowLeft, ChevronRight, Home } from 'lucide-react';
import { getRouteTitle } from '../../utils/navigation';

interface BreadcrumbBackBarProps {
  currentRoute: string;
  onBack: () => void;
  onNavigate: (route: string) => void;
  previousRouteTitle?: string;
}

export const BreadcrumbBackBar: React.FC<BreadcrumbBackBarProps> = ({
  currentRoute,
  onBack,
  onNavigate,
  previousRouteTitle
}) => {
  if (currentRoute === 'home') {
    return null;
  }

  const currentTitle = getRouteTitle(currentRoute);

  return (
    <div className="bg-neutral-900 border-b border-neutral-800 text-white py-2.5 px-4 sm:px-6 lg:px-8 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3 text-xs">
        {/* Left Side: Back Action & Breadcrumb Trail */}
        <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-neutral-800 hover:bg-neutral-700 text-amber-300 hover:text-amber-200 border border-neutral-700 font-semibold text-xs transition-colors shadow-xs group"
            title="Go back to previous page"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-amber-400 group-hover:-translate-x-0.5 transition-transform" />
            <span>Back{previousRouteTitle ? ` to ${previousRouteTitle}` : ''}</span>
          </button>

          <span className="text-neutral-700 hidden sm:inline">|</span>

          {/* Breadcrumb Hierarchy */}
          <nav aria-label="Breadcrumbs" className="flex items-center gap-1.5 text-neutral-400">
            <button
              onClick={() => onNavigate('native')}
              className="hover:text-amber-400 transition-colors flex items-center gap-1 font-medium"
            >
              <Home className="w-3 h-3 text-neutral-500" />
              <span>Home</span>
            </button>
            <ChevronRight className="w-3 h-3 text-neutral-600 shrink-0" />
            <span className="text-white font-bold uppercase tracking-wider text-[11px] truncate max-w-[200px] sm:max-w-none">
              {currentTitle}
            </span>
          </nav>
        </div>

        {/* Right Side: Quick Shortcut to Home */}
        <button
          onClick={() => onNavigate('native')}
          className="hidden md:inline-flex items-center gap-1 text-[11px] text-neutral-400 hover:text-amber-300 transition-colors"
        >
          <span>Return to Native &amp; Corporate Wears &rarr;</span>
        </button>
      </div>
    </div>
  );
};
