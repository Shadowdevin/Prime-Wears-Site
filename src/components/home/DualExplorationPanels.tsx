import React from 'react';
import { ASSETS } from '../../data/assets';
import { ArrowRight, Scissors, Sparkles } from 'lucide-react';

interface DualExplorationPanelsProps {
  onNavigateToNative: () => void;
  onNavigateToCasual: () => void;
}

export const DualExplorationPanels: React.FC<DualExplorationPanelsProps> = ({
  onNavigateToNative,
  onNavigateToCasual
}) => {
  return (
    <section className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
      <div className="text-center max-w-2xl mx-auto mb-10">
        <span className="text-xs uppercase tracking-[0.25em] font-bold text-amber-600 block mb-2">
          Two Distinct Worlds · One Prime Identity
        </span>
        <h2 className="text-3xl sm:text-4xl font-bold text-neutral-950 font-serif-luxury tracking-tight uppercase">
          Select Your Experience
        </h2>
        <p className="text-xs sm:text-sm text-neutral-600 mt-2 leading-relaxed">
          From the stately presence of bespoke Nigerian ceremonial attire to modern street swagger engineered in pure cotton.
        </p>
      </div>

      {/* Two Large Side-by-Side Panels (Vertical on mobile with Native Wears first) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-stretch">
        {/* LEFT PANEL: EXPLORE NATIVE WEARS (Default Experience) */}
        <div
          onClick={onNavigateToNative}
          className="group relative rounded-xl overflow-hidden cursor-pointer bg-neutral-900 border border-neutral-800 shadow-xl transition-all duration-500 hover:shadow-2xl hover:border-amber-500/50 flex flex-col justify-between min-h-[500px] sm:min-h-[580px]"
        >
          {/* Background Imagery with Warm Luxury Overlay */}
          <div className="absolute inset-0">
            <img
              src={ASSETS.nativeBurgundySenator}
              alt="Prime Wears Native Fashion"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105 opacity-85"
            />
            {/* Measured Scrim for WCAG AA readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/20" />
            <div className="absolute inset-0 bg-amber-950/20 mix-blend-color" />
          </div>

          {/* Top Badge */}
          <div className="relative z-10 p-6 sm:p-8 flex items-center justify-between">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-black/60 backdrop-blur-md rounded border border-amber-500/30 text-amber-300 text-xs font-bold uppercase tracking-widest">
              <Scissors className="w-3.5 h-3.5 text-amber-400" />
              <span>Native Atelier · Bespoke</span>
            </div>
            <span className="text-[11px] font-semibold text-neutral-300 tracking-wider uppercase">
              Default Experience
            </span>
          </div>

          {/* Bottom Card Content */}
          <div className="relative z-10 p-6 sm:p-8 space-y-4">
            <div className="space-y-2">
              <span className="text-xs font-bold text-amber-400 tracking-widest uppercase block">
                Nigerian Culture & Tailoring
              </span>
              <h3 className="text-2xl sm:text-4xl font-extrabold text-white font-serif-luxury tracking-tight uppercase leading-tight">
                EXPLORE NATIVE WEARS.
              </h3>
              <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed max-w-md">
                Discover native fashion designed around your personal style. Custom senator suits, regal agbada robes, and hand-lasted corporate shoes.
              </p>
            </div>

            <div className="pt-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onNavigateToNative();
                }}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 py-3 px-6 bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs uppercase tracking-wider rounded shadow-lg transition-all group-hover:translate-x-1"
              >
                <span>EXPLORE NATIVE WEARS</span>
                <ArrowRight className="w-4 h-4 text-neutral-950" />
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT PANEL: EXPLORE CASUAL SWAG */}
        <div
          onClick={onNavigateToCasual}
          className="group relative rounded-xl overflow-hidden cursor-pointer bg-neutral-900 border border-neutral-800 shadow-xl transition-all duration-500 hover:shadow-2xl hover:border-neutral-500 flex flex-col justify-between min-h-[500px] sm:min-h-[580px]"
        >
          {/* Background Imagery with Futuristic Showroom Lighting */}
          <div className="absolute inset-0">
            <img
              src={ASSETS.showroomMannequinsAll}
              alt="Prime Wears Casual Swag Mannequins"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105 opacity-85"
            />
            {/* Measured Scrim for WCAG AA readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/20" />
            <div className="absolute inset-0 bg-neutral-900/30" />
          </div>

          {/* Top Badge */}
          <div className="relative z-10 p-6 sm:p-8 flex items-center justify-between">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-black/60 backdrop-blur-md rounded border border-neutral-700 text-white text-xs font-bold uppercase tracking-widest">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Contemporary Swag · Showroom</span>
            </div>
            <span className="text-[11px] font-semibold text-neutral-300 tracking-wider uppercase">
              Virtual Runway
            </span>
          </div>

          {/* Bottom Card Content */}
          <div className="relative z-10 p-6 sm:p-8 space-y-4">
            <div className="space-y-2">
              <span className="text-xs font-bold text-neutral-300 tracking-widest uppercase block">
                Contemporary Urban Essentials
              </span>
              <h3 className="text-2xl sm:text-4xl font-extrabold text-white font-serif-luxury tracking-tight uppercase leading-tight">
                EXPLORE CASUAL SWAG.
              </h3>
              <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed max-w-md">
                Discover contemporary fashion made for confident self-expression. Heavy fleece hoodies, fine-gauge zip polos, and moving mannequin showcases.
              </p>
            </div>

            <div className="pt-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onNavigateToCasual();
                }}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 py-3 px-6 bg-white hover:bg-neutral-100 text-neutral-950 font-bold text-xs uppercase tracking-wider rounded shadow-lg transition-all group-hover:translate-x-1"
              >
                <span>EXPLORE CASUAL SWAG</span>
                <ArrowRight className="w-4 h-4 text-neutral-950" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
