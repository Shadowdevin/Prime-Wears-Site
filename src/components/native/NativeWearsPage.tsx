import React, { useState, useMemo } from 'react';
import { PRODUCTS } from '../../data/products';
import { ASSETS } from '../../data/assets';
import { Product } from '../../types';
import { ProductCard } from '../common/ProductCard';
import { FemaleStyleGuide } from './FemaleStyleGuide';
import {
  Scissors,
  Sparkles,
  Ruler,
  Upload,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Crown,
  Briefcase,
  Layers,
  Award,
  ChevronDown,
  BookOpen,
  Heart
} from 'lucide-react';

interface NativeWearsPageProps {
  onSelectProduct: (product: Product) => void;
  onOpenCustomOrder: (product?: Product) => void;
  onOpenMeasurementGuide: () => void;
  initialSubCategory?: string;
  onNavigate?: (route: string) => void;
}

export const NativeWearsPage: React.FC<NativeWearsPageProps> = ({
  onSelectProduct,
  onOpenCustomOrder,
  onOpenMeasurementGuide,
  initialSubCategory = 'all',
  onNavigate
}) => {
  const [selectedSubCategory, setSelectedSubCategory] = useState<string>(initialSubCategory);
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc'>('featured');

  React.useEffect(() => {
    if (initialSubCategory) {
      setSelectedSubCategory(initialSubCategory);
    }

    if (window.location.hash.includes('style-guide')) {
      setTimeout(() => {
        document.getElementById('style-guide-section')?.scrollIntoView({ behavior: 'smooth' });
      }, 150);
    } else if (initialSubCategory === 'female' || window.location.hash.includes('women') || window.location.hash.includes('female')) {
      setTimeout(() => {
        document.getElementById('female-section')?.scrollIntoView({ behavior: 'smooth' });
      }, 150);
    }
  }, [initialSubCategory]);

  // Filter products belonging to Native experience
  const nativeProducts = useMemo(() => {
    let items = PRODUCTS.filter((p) => p.experience === 'native');

    if (selectedSubCategory !== 'all') {
      if (selectedSubCategory === 'female' || selectedSubCategory === 'female-wear' || selectedSubCategory === 'women') {
        items = items.filter((p) => p.category === 'female-native' || p.category === 'female-corporate');
      } else {
        items = items.filter((p) => p.category === selectedSubCategory);
      }
    }

    if (sortBy === 'price-asc') {
      items = [...items].sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      items = [...items].sort((a, b) => b.price - a.price);
    }

    return items;
  }, [selectedSubCategory, sortBy]);

  // Dedicated collection groups
  const femaleProducts = PRODUCTS.filter(
    (p) => p.category === 'female-native' || p.category === 'female-corporate'
  );
  const agbadaProducts = PRODUCTS.filter((p) => p.category === 'agbada');
  const hisHighnessProducts = PRODUCTS.filter((p) => p.category === 'his-highness');
  const suitProducts = PRODUCTS.filter((p) => p.category === 'suit');
  const corporateShoes = PRODUCTS.filter((p) => p.category === 'shoes');

  const scrollToCatalog = () => {
    document.getElementById('native-catalog-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-white">
      {/* 1. Native Wears Editorial Hero Section */}
      <section className="relative overflow-hidden bg-neutral-950 text-white min-h-[580px] sm:min-h-[640px] flex items-center">
        {/* Photographic Backdrop */}
        <div className="absolute inset-0">
          <img
            src={ASSETS.agbadaBlackGoldGrid}
            alt="Prime Wears Bespoke Nigerian Agbada"
            className="w-full h-full object-cover object-top opacity-55 scale-102"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-neutral-950 via-neutral-950/85 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-neutral-950/50" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-16 sm:pt-12 sm:pb-24 w-full">
          {/* Main Dual Fashion Experience Gateway Navigation */}
          <div className="mb-6 sm:mb-8 max-w-2xl">
            <div className="grid grid-cols-2 gap-2.5 sm:gap-4">
              {/* LEFT BUTTON — Default experience: Explore Native & Corporate Wears */}
              <button
                type="button"
                onClick={() => {
                  if (onNavigate) onNavigate('native');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="group relative flex items-center justify-center gap-2 px-3 sm:px-5 py-3 sm:py-3.5 rounded-xl bg-gradient-to-r from-neutral-900 via-neutral-950 to-neutral-900 border-2 border-amber-400 text-white font-bold text-xs sm:text-sm tracking-wide shadow-[0_0_20px_rgba(212,175,55,0.25)] ring-1 ring-amber-400/40 text-center min-h-[54px] sm:min-h-[58px] transition-all cursor-pointer"
                aria-current="page"
                title="Active Experience: Explore Native & Corporate Wears"
              >
                <Scissors className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-400 shrink-0 group-hover:rotate-12 transition-transform" />
                <span className="leading-tight text-white font-bold">
                  Explore Native &amp; Corporate Wears
                </span>
                <span className="hidden sm:inline-block w-2 h-2 rounded-full bg-amber-400 shadow-[0_0_8px_#f59e0b] shrink-0" />
              </button>

              {/* RIGHT BUTTON — Casual experience: Explore Casual Swag */}
              <button
                type="button"
                onClick={() => {
                  if (onNavigate) onNavigate('casual');
                }}
                className="group relative flex items-center justify-center gap-2 px-3 sm:px-5 py-3 sm:py-3.5 rounded-xl bg-neutral-900/90 hover:bg-neutral-850 border border-neutral-700 hover:border-amber-400/80 text-neutral-200 hover:text-white font-semibold text-xs sm:text-sm tracking-wide shadow-md hover:shadow-[0_0_15px_rgba(212,175,55,0.2)] text-center min-h-[54px] sm:min-h-[58px] transition-all cursor-pointer"
                title="Switch to Casual Swag Experience"
              >
                <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-400 shrink-0 group-hover:scale-110 transition-transform" />
                <span className="leading-tight">
                  Explore Casual Swag
                </span>
                <ArrowRight className="w-3.5 h-3.5 text-neutral-400 group-hover:text-amber-400 group-hover:translate-x-0.5 transition-all shrink-0 hidden sm:inline-block" />
              </button>
            </div>
          </div>

          <div className="max-w-2xl space-y-6 pr-4 sm:pr-0 pb-6 sm:pb-0">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/15 border border-amber-500/40 text-amber-300 text-xs font-bold uppercase tracking-widest rounded">
              <Scissors className="w-3.5 h-3.5 text-amber-400" />
              <span>Bespoke Nigerian Culture & Regal Tailoring</span>
            </div>

            {/* Prompt Mandated Headline */}
            <h1 className="text-4xl sm:text-6xl font-bold font-serif-luxury tracking-tight uppercase leading-none text-white">
              YOUR STYLE. <br />
              YOUR MEASUREMENTS. <br />
              <span className="text-gold-gradient">YOUR IDENTITY.</span>
            </h1>

            <p className="text-sm sm:text-base text-neutral-300 leading-relaxed font-normal">
              Inspired by contemporary Nigerian tailoring, Savile Row precision, and regal African heritage. Explore grand flowing Agbadas, the exclusive &ldquo;His Highness Package&rdquo;, sartorial bespoke suits, and hand-embroidered senator attire.
            </p>

            {/* Quick Experience Anchor Bar */}
            <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
              <button
                onClick={() => scrollToSection('agbada-section')}
                className="px-3 py-1.5 rounded-full bg-neutral-900/90 hover:bg-neutral-800 border border-amber-500/30 text-amber-300 font-semibold flex items-center gap-1.5 transition-colors"
              >
                <span>👑 Grand Agbadas</span>
                <ChevronDown className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => scrollToSection('his-highness-section')}
                className="px-3 py-1.5 rounded-full bg-amber-500/20 hover:bg-amber-500/30 border border-amber-400/50 text-amber-300 font-bold flex items-center gap-1.5 transition-colors"
              >
                <span>⚜️ His Highness Package</span>
                <ChevronDown className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => scrollToSection('suits-section')}
                className="px-3 py-1.5 rounded-full bg-neutral-900/90 hover:bg-neutral-800 border border-neutral-700 text-white font-semibold flex items-center gap-1.5 transition-colors"
              >
                <span>👔 Bespoke Suits</span>
                <ChevronDown className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => scrollToSection('female-section')}
                className="px-3 py-1.5 rounded-full bg-amber-500/25 hover:bg-amber-500/35 border border-amber-400/60 text-amber-200 font-bold flex items-center gap-1.5 transition-colors"
              >
                <span>👑 Women's Couture</span>
                <ChevronDown className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => scrollToSection('style-guide-section')}
                className="px-3 py-1.5 rounded-full bg-neutral-900/90 hover:bg-neutral-800 border border-neutral-700 text-neutral-300 hover:text-white font-semibold flex items-center gap-1.5 transition-colors"
              >
                <BookOpen className="w-3.5 h-3.5 text-amber-400" />
                <span>Style Guide for Women</span>
                <ChevronDown className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Primary Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={scrollToCatalog}
                className="py-3.5 px-7 bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs uppercase tracking-wider rounded-md shadow-xl transition-all flex items-center gap-2"
              >
                <span>1. EXPLORE OUR DESIGNS</span>
                <ArrowRight className="w-4 h-4 text-neutral-950" />
              </button>

              <button
                onClick={() => onOpenCustomOrder()}
                className="py-3.5 px-7 bg-white text-neutral-950 hover:bg-neutral-100 font-bold text-xs uppercase tracking-wider rounded-md shadow-lg transition-all flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-amber-600" />
                <span>2. CREATE YOUR STYLE</span>
              </button>
            </div>

            {/* Tailoring Attributes */}
            <div className="pt-6 border-t border-neutral-800 flex flex-wrap items-center gap-6 text-xs text-neutral-400">
              <button
                onClick={onOpenMeasurementGuide}
                className="flex items-center gap-1.5 hover:text-amber-400 transition-colors"
              >
                <Ruler className="w-4 h-4 text-amber-400" />
                <span>Interactive Measurement Guide &rarr;</span>
              </button>
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-amber-400" />
                Personal Master Cutter Review Before Billing
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Custom Style Commission Callout Box */}
      <section className="bg-amber-50/60 border-y border-amber-200/80 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-amber-500 text-neutral-950 rounded-lg shrink-0">
              <Upload className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-bold text-neutral-950 font-serif-luxury uppercase">
                Have Your Own Fabric Or Design Reference?
              </h3>
              <p className="text-xs text-neutral-600 mt-0.5 max-w-xl">
                Upload a photo from your phone or computer, select collar and embroidery modifications, supply your measurements in cm or inches, and receive a tailor quotation.
              </p>
            </div>
          </div>

          <button
            onClick={() => onOpenCustomOrder()}
            className="w-full md:w-auto py-3 px-6 bg-neutral-950 hover:bg-black text-white font-bold text-xs uppercase tracking-wider rounded-md shadow-md whitespace-nowrap transition-colors"
          >
            Launch Custom Design Studio
          </button>
        </div>
      </section>

      {/* 3. DEDICATED SECTION: GRAND AGBADA CEREMONIAL COLLECTION */}
      <section id="agbada-section" className="py-20 bg-neutral-950 text-white relative overflow-hidden">
        {/* Subtle decorative gold ambient glow */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 pb-6 border-b border-neutral-800">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-bold uppercase tracking-widest mb-3">
                <Crown className="w-3.5 h-3.5 text-amber-400" />
                <span>Monarchical African Heritage</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold font-serif-luxury uppercase text-white tracking-tight">
                Grand Agbada Collection
              </h2>
              <p className="text-xs sm:text-sm text-neutral-400 mt-2 max-w-2xl leading-relaxed">
                The ultimate ceremonial presence. From the obsidian starburst grid and white-on-white 3D knotwork to royal sapphire chevron embroidery, each Agbada is cut with generous flowing wingspan, tailored inner kaftan, and coordinating trousers.
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <button
                onClick={() => onOpenCustomOrder({ category: 'agbada' } as any)}
                className="py-3 px-6 bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs uppercase tracking-wider rounded shadow-xl transition-all flex items-center gap-2"
              >
                <Scissors className="w-4 h-4" />
                <span>Commission Custom Agbada</span>
              </button>
            </div>
          </div>

          {/* Agbada Showcase Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {agbadaProducts.map((product) => (
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

      {/* 4. DEDICATED SECTION: "HIS HIGHNESS PACKAGE" — ROYAL REGALIA */}
      <section id="his-highness-section" className="py-20 bg-gradient-to-b from-neutral-900 via-neutral-950 to-neutral-900 text-white relative border-y border-amber-500/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/20 border border-amber-400 text-amber-300 text-xs font-extrabold uppercase tracking-widest shadow-lg">
              <Crown className="w-4 h-4 text-amber-400" />
              <span>Imperial Court Protocol</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold font-serif-luxury uppercase tracking-tight text-white leading-tight">
              &ldquo;His Highness Package&rdquo;
            </h2>
            <p className="text-sm text-neutral-300 leading-relaxed">
              Curated exclusively for traditional monarchs, crown princes, high-society grooms, and VIP statesmen. Featuring asymmetric bandhgalas with 24K gold-plated dome buttons, double heraldic bullion fringe tassel brooches, curb chains, and master-hand-stitched zardozi gold foliage.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 max-w-5xl mx-auto">
            {hisHighnessProducts.map((product) => (
              <div
                key={product.id}
                className="bg-neutral-900/90 rounded-xl overflow-hidden border border-amber-500/40 shadow-2xl flex flex-col hover:border-amber-400 transition-all group"
              >
                <div
                  className="relative aspect-[3/4] overflow-hidden cursor-pointer bg-neutral-950"
                  onClick={() => onSelectProduct(product)}
                >
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded bg-black/80 backdrop-blur-md border border-amber-500/50 text-amber-300 text-[11px] font-bold uppercase tracking-wider">
                      👑 His Highness Package
                    </span>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <span className="text-xs font-semibold uppercase tracking-wider text-amber-300 block mb-1">
                      Price Coming Soon · Tailored to Order
                    </span>
                    <h3 className="text-xl font-bold font-serif-luxury text-white leading-snug">
                      {product.name}
                    </h3>
                  </div>
                </div>

                <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                  <p className="text-xs text-neutral-300 leading-relaxed">
                    {product.description}
                  </p>

                  <div className="pt-3 border-t border-neutral-800 space-y-2">
                    <div className="flex items-center gap-2 text-xs text-amber-300">
                      <Award className="w-4 h-4 text-amber-400" />
                      <span>{product.fabricDetails}</span>
                    </div>
                  </div>

                  <div className="pt-2 flex items-center gap-3">
                    <button
                      onClick={() => onOpenCustomOrder(product)}
                      className="flex-1 py-3 px-4 bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs uppercase tracking-wider rounded shadow transition-colors flex items-center justify-center gap-2"
                    >
                      <Scissors className="w-4 h-4 text-neutral-950" />
                      <span>Commission Highness Fit</span>
                    </button>
                    <button
                      onClick={() => onSelectProduct(product)}
                      className="py-3 px-4 bg-neutral-800 hover:bg-neutral-700 text-white font-semibold text-xs uppercase tracking-wider rounded border border-neutral-700 transition-colors"
                    >
                      Inspect Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. DEDICATED SECTION: BESPOKE EXECUTIVE SUITE COLLECTION */}
      <section id="suits-section" className="py-20 bg-neutral-100 text-neutral-950 border-t border-neutral-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 pb-6 border-b border-neutral-300">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-neutral-900 text-white text-xs font-bold uppercase tracking-widest mb-3">
                <Briefcase className="w-3.5 h-3.5 text-amber-400" />
                <span>Sartorial Savile Row & Italian Craft</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold font-serif-luxury uppercase text-neutral-950 tracking-tight">
                The Bespoke Suite Collection
              </h2>
              <p className="text-xs sm:text-sm text-neutral-600 mt-2 max-w-2xl leading-relaxed">
                Precision executive and black-tie suiting. Featuring full canvas construction, double-breasted silhouettes with heraldic gold buttons, olive pinstripes, and 3-piece wedding tuxedo ensembles with horseshoe waistcoats.
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <button
                onClick={() => onOpenCustomOrder({ category: 'suit' } as any)}
                className="py-3 px-6 bg-neutral-950 hover:bg-neutral-800 text-white font-bold text-xs uppercase tracking-wider rounded shadow transition-all flex items-center gap-2"
              >
                <Scissors className="w-4 h-4 text-amber-400" />
                <span>Commission Bespoke Suit</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {suitProducts.map((suit) => (
              <ProductCard
                key={suit.id}
                product={suit}
                onSelect={onSelectProduct}
                onCustomOrder={() => onOpenCustomOrder(suit)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 6. DEDICATED SECTION: HER MAJESTY — FEMALE NATIVE & CORPORATE COUTURE */}
      <section id="female-section" className="py-20 bg-neutral-950 text-white relative overflow-hidden border-t border-amber-500/30">
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-[450px] h-[450px] bg-amber-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 pb-6 border-b border-neutral-800">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-bold uppercase tracking-widest mb-3">
                <Crown className="w-3.5 h-3.5 text-amber-400" />
                <span>Her Majesty · The Matriarch & Muse</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-extrabold font-serif-luxury uppercase text-white tracking-tight leading-tight">
                Female Native & Corporate Wears
              </h2>
              <p className="text-xs sm:text-sm text-neutral-300 mt-2 max-w-3xl leading-relaxed">
                Praising the sovereign grace, divine strength, and unshakeable dignity of womanhood. From statuesque peplum bell-sleeve sets and executive monochrome pencil suits to radiant Swiss jacquard ballgowns and mosaic corsetry, every creation is an act of reverence for her royal contour.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <button
                onClick={() => scrollToSection('style-guide-section')}
                className="py-3 px-5 bg-neutral-900 hover:bg-neutral-800 text-white border border-neutral-700 text-xs font-semibold uppercase tracking-wider rounded transition-colors flex items-center gap-2"
              >
                <BookOpen className="w-4 h-4 text-amber-400" />
                <span>Women's Style Guide</span>
              </button>

              <button
                onClick={() => onOpenCustomOrder({ category: 'female-corporate' } as any)}
                className="py-3 px-6 bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs uppercase tracking-wider rounded shadow-xl transition-all flex items-center gap-2"
              >
                <Scissors className="w-4 h-4" />
                <span>Commission Female Couture</span>
              </button>
            </div>
          </div>

          {/* Female Outfits Showcase Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
            {femaleProducts.map((product) => (
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

      {/* 7. DEDICATED SECTION: STYLE GUIDE FOR WOMEN */}
      <section id="style-guide-section">
        <FemaleStyleGuide
          onOpenCustomOrder={() => onOpenCustomOrder({ category: 'female-corporate' } as any)}
          onExploreCollection={() => scrollToSection('female-section')}
        />
      </section>

      {/* 8. Main Native Product Catalogue (Filterable with all categories) */}
      <section id="native-catalog-section" className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 pb-6 border-b border-neutral-200">
          <div>
            <span className="text-xs uppercase tracking-[0.25em] font-bold text-amber-700 block mb-1">
              Prime Native Atelier
            </span>
            <h2 className="text-3xl font-bold text-neutral-950 font-serif-luxury uppercase">
              Full Native Outfits Catalogue
            </h2>
            <p className="text-xs text-neutral-500 mt-1">
              Select any design to order in standard sizing or customize with your bespoke measurements.
            </p>
          </div>

          {/* Interactive Filter Tabs (Functional Buttons) */}
          <div className="flex flex-wrap items-center gap-2 text-xs">
            {[
              { id: 'all', label: 'All Native Outfits' },
              { id: 'female', label: "👑 Women's Couture" },
              { id: 'female-corporate', label: "Women's Corporate" },
              { id: 'female-native', label: "Women's Native" },
              { id: 'agbada', label: 'Grand Agbadas 👑' },
              { id: 'his-highness', label: 'His Highness ⚜️' },
              { id: 'suit', label: 'Bespoke Suits 👔' },
              { id: 'senator', label: 'Senator Suits' },
              { id: 'kaftan', label: 'Kaftans' },
              { id: 'two-piece', label: 'Two-Piece Sets' },
              { id: 'shoes', label: 'Corporate Shoes' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedSubCategory(tab.id)}
                className={`px-3.5 py-1.5 rounded-md font-semibold whitespace-nowrap transition-all ${
                  selectedSubCategory === tab.id
                    ? 'bg-neutral-950 text-white shadow-sm'
                    : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                }`}
              >
                {tab.label}
              </button>
            ))}

            {/* Sort Selector */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="ml-auto bg-white border border-neutral-300 rounded px-3 py-1.5 text-xs text-neutral-800 font-semibold focus:outline-none"
            >
              <option value="featured">Sort: Featured</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {nativeProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onSelect={onSelectProduct}
              onCustomOrder={() => onOpenCustomOrder(product)}
            />
          ))}
        </div>
      </section>

      {/* 7. Dedicated Corporate Shoes Collection */}
      <section className="bg-neutral-950 text-white py-16 border-t border-neutral-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 pb-6 border-b border-neutral-800">
            <div>
              <span className="text-xs uppercase tracking-[0.25em] font-bold text-amber-400 block mb-1">
                Handcrafted Footwear
              </span>
              <h2 className="text-3xl font-bold font-serif-luxury uppercase text-white">
                Corporate Shoes Collection
              </h2>
              <p className="text-xs text-neutral-400 mt-1">
                Italian calfskin monkstraps, wholecut oxfords, and hand-woven loafers designed to complement native wear and formal suiting.
              </p>
            </div>

            <button
              onClick={() => onOpenCustomOrder({ category: 'shoes' } as any)}
              className="py-2.5 px-5 bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs uppercase tracking-wider rounded shadow transition-colors shrink-0"
            >
              Commission Bespoke Shoes
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {corporateShoes.map((shoe) => (
              <ProductCard
                key={shoe.id}
                product={shoe}
                onSelect={onSelectProduct}
                onCustomOrder={() => onOpenCustomOrder(shoe)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 8. The Prime Wears Tailoring Standard */}
      <section className="py-20 bg-neutral-50 border-t border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs uppercase tracking-[0.25em] font-bold text-amber-700 block mb-1">
              Atelier Protocol
            </span>
            <h2 className="text-3xl font-bold text-neutral-950 font-serif-luxury uppercase">
              How Custom Native Orders Work
            </h2>
            <p className="text-xs text-neutral-600 mt-2">
              We never use one-size-fits-all factory templates. Every bespoke outfit follows our 4-stage master cutter workflow.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 bg-white rounded-lg border border-neutral-200 shadow-xs space-y-3">
              <span className="text-2xl font-extrabold text-neutral-900 font-serif-luxury">01</span>
              <h4 className="text-sm font-bold text-neutral-900 uppercase tracking-wider">
                Measurement Capture
              </h4>
              <p className="text-xs text-neutral-600 leading-relaxed">
                Supply your measurements using our dynamic form (in inches or cm) or follow our illustrated guide.
              </p>
            </div>

            <div className="p-6 bg-white rounded-lg border border-neutral-200 shadow-xs space-y-3">
              <span className="text-2xl font-extrabold text-neutral-900 font-serif-luxury">02</span>
              <h4 className="text-sm font-bold text-neutral-900 uppercase tracking-wider">
                Tailor Quotation
              </h4>
              <p className="text-xs text-neutral-600 leading-relaxed">
                Our master tailor reviews fabric yardage and embroidery complexity to confirm your quotation before payment.
              </p>
            </div>

            <div className="p-6 bg-white rounded-lg border border-neutral-200 shadow-xs space-y-3">
              <span className="text-2xl font-extrabold text-neutral-900 font-serif-luxury">03</span>
              <h4 className="text-sm font-bold text-neutral-900 uppercase tracking-wider">
                Pattern Drafting & Cut
              </h4>
              <p className="text-xs text-neutral-600 leading-relaxed">
                Individually drafted paper pattern customized to your neck pitch, shoulder slope, and desired top drape.
              </p>
            </div>

            <div className="p-6 bg-white rounded-lg border border-neutral-200 shadow-xs space-y-3">
              <span className="text-2xl font-extrabold text-neutral-900 font-serif-luxury">04</span>
              <h4 className="text-sm font-bold text-neutral-900 uppercase tracking-wider">
                Fulfilling & Fitting
              </h4>
              <p className="text-xs text-neutral-600 leading-relaxed">
                Finished with hand-sewn buttonholes, steam-pressed, and delivered in Prime Wears garment bag across Nigeria.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
