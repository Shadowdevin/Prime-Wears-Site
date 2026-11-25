import React from 'react';
import { DualExplorationPanels } from './DualExplorationPanels';
import { PRODUCTS } from '../../data/products';
import { ASSETS } from '../../data/assets';
import { Product } from '../../types';
import { ProductCard } from '../common/ProductCard';
import { ArrowRight, Scissors, Sparkles, ShieldCheck, Award, Ruler, Crown } from 'lucide-react';

interface MainHomeProps {
  onNavigate: (route: string) => void;
  onSelectProduct: (product: Product) => void;
  onOpenCustomOrder: (product?: Product) => void;
  onOpenMeasurementGuide: () => void;
}

export const MainHome: React.FC<MainHomeProps> = ({
  onNavigate,
  onSelectProduct,
  onOpenCustomOrder,
  onOpenMeasurementGuide
}) => {
  // Curated spotlight items from both worlds
  const nativeHighlights = PRODUCTS.filter((p) => p.experience === 'native' && p.featured).slice(0, 3);
  const femaleHighlights = PRODUCTS.filter((p) => (p.category === 'female-native' || p.category === 'female-corporate') && p.featured).slice(0, 8);
  const casualHighlights = PRODUCTS.filter((p) => p.experience === 'casual' && p.featured).slice(0, 3);

  return (
    <div className="min-h-screen bg-white">
      {/* 1. Main Hero Section */}
      <section className="relative overflow-hidden bg-neutral-950 text-white min-h-[580px] sm:min-h-[660px] flex items-center">
        {/* Hero Background with Rich Editorial Fashion Layering */}
        <div className="absolute inset-0">
          <img
            src={ASSETS.nativeBurgundySenator}
            alt="Prime Wears Editorial Campaign"
            className="w-full h-full object-cover object-center opacity-45 scale-102"
          />
          {/* Measured gradient scrim */}
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/40" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 w-full">
          <div className="max-w-2xl space-y-6">
            <div className="inline-flex items-center gap-2.5 px-3 py-1 rounded bg-neutral-900/90 border border-amber-500/30 text-amber-300 text-xs font-bold uppercase tracking-widest">
              <Award className="w-3.5 h-3.5 text-amber-400" />
              <span>The Luxury Nigerian Fashion Atelier</span>
            </div>

            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold font-serif-luxury tracking-tight uppercase leading-[0.95] text-white">
              CRAFTED FOR DIGNITY. <br />
              <span className="text-gold-gradient">ENGINEERED FOR PRESENCE.</span>
            </h1>

            <p className="text-sm sm:text-base text-neutral-300 leading-relaxed max-w-xl font-normal">
              Prime Wears bridges bespoke Nigerian native tailoring and cutting-edge contemporary casual swag. Discover custom-molded senator suits, regal agbada robes, and fine-gauge knitwear.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={() => onNavigate('native')}
                className="py-3.5 px-7 bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs uppercase tracking-wider rounded-md shadow-xl transition-all flex items-center gap-2"
              >
                <span>EXPLORE NATIVE WEARS</span>
                <ArrowRight className="w-4 h-4 text-neutral-950" />
              </button>

              <button
                onClick={() => onNavigate('casual')}
                className="py-3.5 px-7 bg-white/10 hover:bg-white/20 text-white border border-white/20 font-bold text-xs uppercase tracking-wider rounded-md backdrop-blur-md transition-all flex items-center gap-2"
              >
                <span>EXPLORE CASUAL SWAG</span>
                <ArrowRight className="w-4 h-4 text-white" />
              </button>
            </div>

            {/* Micro Trust Indicators */}
            <div className="pt-6 border-t border-neutral-800 flex flex-wrap items-center gap-6 text-xs text-neutral-400">
              <span className="flex items-center gap-1.5">
                <Scissors className="w-4 h-4 text-amber-400" />
                Hand-cut in Uyo, Calabar & Port-Harcourt
              </span>
              <span className="flex items-center gap-1.5">
                <Ruler className="w-4 h-4 text-amber-400" />
                Precision Body Measurements
              </span>
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-amber-400" />
                Guaranteed Bespoke Drape
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Dual Side-by-Side Exploration Panels (Immediately follows hero) */}
      <DualExplorationPanels
        onNavigateToNative={() => onNavigate('native')}
        onNavigateToCasual={() => onNavigate('casual')}
      />

      {/* 3. Featured Atelier Highlights: Native Wears */}
      <section className="bg-neutral-50 py-16 border-t border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <span className="text-xs uppercase tracking-[0.25em] font-bold text-amber-700 block mb-1">
                Atelier Showcase
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-neutral-950 font-serif-luxury uppercase">
                Featured Native Designs
              </h2>
            </div>
            <button
              onClick={() => onNavigate('native')}
              className="text-xs font-bold uppercase tracking-wider text-neutral-900 hover:text-amber-700 inline-flex items-center gap-1.5"
            >
              <span>View All Native Wears</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {nativeHighlights.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onSelect={onSelectProduct}
                onCustomOrder={() => onOpenCustomOrder(product)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 3.5. Her Majesty: Female Native & Corporate Couture Showcase */}
      <section className="bg-gradient-to-b from-stone-900 via-neutral-950 to-stone-950 text-white py-20 border-t border-amber-500/20 relative overflow-hidden">
        {/* Subtle decorative glow */}
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-amber-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12 border-b border-neutral-800 pb-8">
            <div className="max-w-3xl space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-bold uppercase tracking-widest">
                <Crown className="w-3.5 h-3.5 text-amber-400" />
                <span>Her Majesty Collection • Native & Corporate Couture</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-serif-luxury tracking-tight uppercase leading-tight text-white">
                Praising the Sovereign Dignity & Grace of Womanhood
              </h2>
              <p className="text-sm sm:text-base text-neutral-300 leading-relaxed font-light">
                In every sculpted pleat and hand-finished seam, Prime Wears celebrates the sacred authority of the woman. She is at once the pillar of cultural ancestry and the fearless leader of modern enterprise. From executive boardroom peplum tailoring to floor-grazing golden jacquard box-pleat ballgowns, wear garments cut to dignify your stature.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <button
                onClick={() => onNavigate('women')}
                className="py-3 px-5 bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs uppercase tracking-wider rounded transition-all shadow-md hover:scale-[1.02] flex items-center gap-2"
              >
                <span>View All Women's Couture</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => onNavigate('style-guide')}
                className="py-3 px-5 bg-neutral-900 hover:bg-neutral-800 text-amber-300 border border-amber-500/30 font-bold text-xs uppercase tracking-wider rounded transition-colors"
              >
                <span>Style Guide for Women</span>
              </button>
            </div>
          </div>

          {/* Spotlight Pieces from the User's Haute Couture Attire Attachments */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {femaleHighlights.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onSelect={onSelectProduct}
                onCustomOrder={() => onOpenCustomOrder(product)}
              />
            ))}
          </div>

          {/* Quick Bespoke Banner for Women */}
          <div className="mt-12 bg-neutral-900/80 border border-neutral-800 rounded-xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-1 text-center md:text-left">
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-amber-400">
                Custom Tailoring & Fabric Pairing
              </span>
              <h3 className="text-lg sm:text-xl font-bold text-white uppercase font-serif-luxury">
                Need Exact Measurements Or A Custom Fabric Palette?
              </h3>
              <p className="text-xs text-neutral-400 max-w-xl">
                Submit your bust, waist, hip, and length measurements with our interactive auto-calculator, or consult our fabric pairing guide for formal galas and corporate summits.
              </p>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <button
                onClick={() => onOpenCustomOrder()}
                className="py-2.5 px-5 bg-white hover:bg-neutral-100 text-neutral-950 font-bold text-xs uppercase tracking-wider rounded transition-colors shadow-sm"
              >
                Commission Bespoke Dress
              </button>
              <button
                onClick={() => onNavigate('style-guide')}
                className="py-2.5 px-4 bg-transparent hover:bg-neutral-800 text-neutral-300 border border-neutral-700 font-semibold text-xs uppercase tracking-wider rounded transition-colors"
              >
                Fabric Guide
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Casual Swag Runway Teaser */}
      <section className="bg-white py-16 border-t border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <span className="text-xs uppercase tracking-[0.25em] font-bold text-neutral-500 block mb-1">
                Showroom Collection
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-neutral-950 font-serif-luxury uppercase">
                Contemporary Casual Swag
              </h2>
            </div>
            <button
              onClick={() => onNavigate('casual')}
              className="text-xs font-bold uppercase tracking-wider text-neutral-900 hover:text-amber-700 inline-flex items-center gap-1.5"
            >
              <span>Explore Virtual Showroom</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {casualHighlights.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onSelect={onSelectProduct}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 5. Brand Heritage & Philosophy Banner */}
      <section className="bg-neutral-950 text-white py-20 border-t border-neutral-900 relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <span className="text-xs uppercase tracking-[0.3em] font-bold text-amber-400 block">
            The Prime Wears Philosophy
          </span>
          <h2 className="text-3xl sm:text-5xl font-bold font-serif-luxury tracking-tight uppercase leading-tight">
            &ldquo;WEAR YOUR PRIME&rdquo; IS NOT A MOTTO. <br />
            IT IS A STANDARD OF LIVING.
          </h2>
          <p className="text-xs sm:text-sm text-neutral-400 max-w-2xl mx-auto leading-relaxed">
            Every garment that leaves our atelier carries the weight of generational Nigerian tailoring mastery. Whether you stand in a traditional chieftaincy assembly or walk through international business capitals, Prime Wears guarantees unmatched silhouette, drape, and pride.
          </p>
          <div className="pt-4 flex items-center justify-center gap-4">
            <button
              onClick={() => onOpenCustomOrder()}
              className="py-3 px-6 bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs uppercase tracking-wider rounded shadow-md transition-colors"
            >
              Commission Bespoke Tailoring
            </button>
            <button
              onClick={() => onNavigate('showroom')}
              className="py-3 px-6 bg-neutral-900 hover:bg-neutral-800 text-white border border-neutral-700 font-bold text-xs uppercase tracking-wider rounded transition-colors"
            >
              Enter Virtual Showroom
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
