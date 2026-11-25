import React, { useState, useMemo } from 'react';
import { ShowroomEngine } from './ShowroomEngine';
import { PRODUCTS } from '../../data/products';
import { ASSETS } from '../../data/assets';
import { Product } from '../../types';
import { ProductCard } from '../common/ProductCard';
import {
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Shield,
  Layers,
  Award,
  Flame,
  CheckCircle2,
  Mail
} from 'lucide-react';

interface CasualSwagPageProps {
  onSelectProduct: (product: Product) => void;
  onNavigate?: (route: string) => void;
}

export const CasualSwagPage: React.FC<CasualSwagPageProps> = ({
  onSelectProduct,
  onNavigate
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc'>('featured');
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterJoined, setNewsletterJoined] = useState(false);

  // Filter Casual Swag products
  const casualProducts = useMemo(() => {
    let items = PRODUCTS.filter((p) => p.experience === 'casual');

    if (selectedCategory !== 'all') {
      if (selectedCategory === 'polo') {
        items = items.filter((p) => p.category === 'polo');
      } else if (selectedCategory === 'hoodie') {
        items = items.filter((p) => p.category === 'hoodie');
      } else if (selectedCategory === 'trousers') {
        items = items.filter((p) => p.category === 'trousers');
      } else if (selectedCategory === 'cap') {
        items = items.filter((p) => p.category === 'cap');
      }
    }

    if (sortBy === 'price-asc') {
      items = [...items].sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      items = [...items].sort((a, b) => b.price - a.price);
    }

    return items;
  }, [selectedCategory, sortBy]);

  const newArrivals = PRODUCTS.filter((p) => p.experience === 'casual' && p.newArrival);
  const bestsellers = PRODUCTS.filter((p) => p.experience === 'casual' && p.bestseller);

  const handleSelectProductById = (productId: string) => {
    const found = PRODUCTS.find((p) => p.id === productId);
    if (found) {
      onSelectProduct(found);
    }
  };

  const scrollToCatalog = () => {
    document.getElementById('casual-catalog-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToNewArrivals = () => {
    document.getElementById('new-arrivals-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.includes('@')) {
      setNewsletterJoined(true);
      setNewsletterEmail('');
    }
  };

  return (
    <div className="min-h-screen bg-pearl-ash text-neutral-900">
      {/* Top Return Navigation Bar to Native & Corporate Wears */}
      <div className="bg-neutral-950 border-b border-amber-500/30 py-3 px-4 sm:px-6 lg:px-8 sticky top-18 sm:top-22 z-20 shadow-md">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => {
              if (onNavigate) {
                onNavigate('native');
              } else {
                window.location.hash = '#/native';
              }
            }}
            className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-lg bg-neutral-900 hover:bg-neutral-850 text-amber-300 hover:text-white border border-amber-500/50 hover:border-amber-400 font-bold text-xs sm:text-sm tracking-wide transition-all shadow-md group cursor-pointer"
            title="Return directly to Native & Corporate Wears"
          >
            <ArrowLeft className="w-4 h-4 text-amber-400 group-hover:-translate-x-1 transition-transform" />
            <span>&larr; Back to Native &amp; Corporate Wears</span>
          </button>

          <div className="hidden sm:flex items-center gap-2 text-xs font-semibold text-neutral-400">
            <span className="w-2 h-2 rounded-full bg-amber-400" />
            <span>Casual Swag Experience</span>
          </div>
        </div>
      </div>

      {/* 1. Animated Fashion Showroom Hero (Part 3) */}
      <ShowroomEngine
        onSelectProductById={handleSelectProductById}
        onScrollToCatalog={scrollToCatalog}
        onExploreNewArrivals={scrollToNewArrivals}
      />

      {/* 2. Brand Introduction Section (Part 4 #1) */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-neutral-300/80">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-5 space-y-3">
            <span className="text-xs uppercase tracking-[0.25em] font-bold text-neutral-500 block">
              Prime Wears Modern Lab
            </span>
            <h2 className="text-2xl sm:text-4xl font-bold text-neutral-950 font-serif-luxury uppercase tracking-tight">
              Contemporary Fashion Made For Confident Self-Expression
            </h2>
          </div>
          <div className="md:col-span-7 space-y-4 text-xs sm:text-sm text-neutral-600 leading-relaxed border-l-0 md:border-l border-neutral-300 md:pl-8">
            <p>
              Casual Swag by Prime Wears is engineered for individuals who demand high-level tailoring discipline even in their off-duty wardrobe. Every piece—from our textured vertical-rib zip polos to our 450 GSM French terry hoodies—is crafted to maintain an architectural silhouette that never slumps.
            </p>
            <p>
              Emblazoned with our signature &ldquo;WEAR YOUR PRIME&rdquo; brushstroke typography and the official PW monogram emblem, our pieces combine athletic utility with pure luxury restraint.
            </p>
          </div>
        </div>
      </section>

      {/* 3. Shop by Category Section (Part 4 #2) */}
      <section className="py-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-neutral-300/80">
        <div className="flex items-center justify-between mb-8">
          <div>
            <span className="text-xs uppercase tracking-[0.25em] font-bold text-neutral-500 block mb-1">
              Architecture of Style
            </span>
            <h3 className="text-2xl font-bold text-neutral-950 font-serif-luxury uppercase">
              Shop By Category
            </h3>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            {
              id: 'polo',
              title: 'Luxury Zip Knit Polos',
              desc: 'Fine-gauge rib cotton with gold zippers',
              img: ASSETS.poloBlack
            },
            {
              id: 'hoodie',
              title: 'Heavyweight Hoodies',
              desc: '450 GSM ultra-dense loopback French terry',
              img: ASSETS.showroomMannequinsAll
            },
            {
              id: 'trousers',
              title: 'Tactical Cargo Joggers',
              desc: 'Structured ripstop with PW logo patch',
              img: ASSETS.showroomMannequinsAll
            },
            {
              id: 'cap',
              title: 'Leather Patch Caps',
              desc: 'Curved visor dad caps in 5 colorways',
              img: ASSETS.capRed
            }
          ].map((cat) => (
            <div
              key={cat.id}
              onClick={() => {
                setSelectedCategory(cat.id);
                scrollToCatalog();
              }}
              className="group relative rounded-lg overflow-hidden border border-neutral-300/80 bg-white shadow-xs hover:shadow-lg transition-all cursor-pointer flex flex-col justify-between"
            >
              <div className="aspect-[4/3] w-full overflow-hidden bg-neutral-200">
                <img
                  src={cat.img}
                  alt={cat.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-4 bg-white flex-1 flex flex-col justify-between">
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-neutral-900 group-hover:text-amber-600 transition-colors">
                    {cat.title}
                  </h4>
                  <p className="text-[11px] text-neutral-500 mt-1 leading-snug">{cat.desc}</p>
                </div>
                <div className="pt-3 mt-2 border-t border-neutral-100 flex items-center justify-between text-[11px] font-bold text-neutral-900">
                  <span>Explore</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. New Arrivals Section (Part 4 #3) */}
      <section id="new-arrivals-section" className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2 h-2 rounded-full bg-amber-500" />
              <span className="text-xs uppercase tracking-[0.25em] font-bold text-neutral-600">
                Seasonal Drop
              </span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold text-neutral-950 font-serif-luxury uppercase">
              New Arrivals
            </h3>
          </div>
          <button
            onClick={scrollToCatalog}
            className="text-xs font-bold uppercase tracking-wider text-neutral-900 hover:text-amber-700 inline-flex items-center gap-1.5"
          >
            <span>View All ({casualProducts.length})</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {newArrivals.slice(0, 3).map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onSelect={onSelectProduct}
            />
          ))}
        </div>
      </section>

      {/* 5. Bestsellers Section (Part 4 #4) */}
      <section className="py-16 bg-white border-y border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Flame className="w-3.5 h-3.5 text-red-500" />
                <span className="text-xs uppercase tracking-[0.25em] font-bold text-neutral-600">
                  Client Favorites
                </span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-neutral-950 font-serif-luxury uppercase">
                Bestsellers & Showroom Hits
              </h3>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {bestsellers.slice(0, 3).map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onSelect={onSelectProduct}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 6. Complete Product Catalogue Section */}
      <section id="casual-catalog-section" className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 pb-4 border-b border-neutral-300">
          <div>
            <span className="text-xs uppercase tracking-[0.25em] font-bold text-neutral-500 block mb-1">
              Full Wardrobe
            </span>
            <h3 className="text-3xl font-bold text-neutral-950 font-serif-luxury uppercase">
              Casual Swag Catalogue
            </h3>
          </div>

          {/* Interactive Filters (Buttons) */}
          <div className="flex flex-wrap items-center gap-2 text-xs">
            {[
              { id: 'all', label: 'All Items' },
              { id: 'polo', label: 'Zip Polos' },
              { id: 'hoodie', label: 'Hoodies' },
              { id: 'trousers', label: 'Cargo Joggers' },
              { id: 'cap', label: 'Caps & Headwear' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedCategory(tab.id)}
                className={`px-3.5 py-1.5 rounded-md font-semibold whitespace-nowrap transition-all ${
                  selectedCategory === tab.id
                    ? 'bg-neutral-950 text-white shadow-sm'
                    : 'bg-white text-neutral-700 hover:bg-neutral-100 border border-neutral-300'
                }`}
              >
                {tab.label}
              </button>
            ))}

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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {casualProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onSelect={onSelectProduct}
            />
          ))}
        </div>
      </section>

      {/* 7. Featured Collections Showcase (Part 4 #5) */}
      <section className="bg-neutral-950 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs uppercase tracking-[0.25em] font-bold text-amber-400 block mb-1">
              Curated Capsules
            </span>
            <h3 className="text-3xl font-bold font-serif-luxury uppercase">
              Featured Prime Collections
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="relative rounded-xl overflow-hidden border border-neutral-800 p-8 flex flex-col justify-between min-h-[360px] bg-neutral-900 group">
              <div className="space-y-3 z-10">
                <span className="text-xs uppercase font-bold tracking-widest text-amber-400">
                  Capsule 01
                </span>
                <h4 className="text-2xl font-bold font-serif-luxury uppercase text-white">
                  The Monogram Knit Series
                </h4>
                <p className="text-xs text-neutral-300 max-w-sm leading-relaxed">
                  Engineered with fine-gauge vertical ribs, contrast sleeve tipping, and customized solid brass zippers. Available in Optic White, Sand Beige, and Onyx Gold.
                </p>
              </div>
              <div className="pt-6 z-10">
                <button
                  onClick={() => {
                    setSelectedCategory('polo');
                    scrollToCatalog();
                  }}
                  className="py-2.5 px-5 bg-white text-neutral-950 hover:bg-neutral-100 font-bold text-xs uppercase tracking-wider rounded inline-flex items-center gap-2"
                >
                  <span>Explore Knitwear</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <div className="relative rounded-xl overflow-hidden border border-neutral-800 p-8 flex flex-col justify-between min-h-[360px] bg-neutral-900 group">
              <div className="space-y-3 z-10">
                <span className="text-xs uppercase font-bold tracking-widest text-neutral-400">
                  Capsule 02
                </span>
                <h4 className="text-2xl font-bold font-serif-luxury uppercase text-white">
                  The 450 GSM Heavy Fleece Project
                </h4>
                <p className="text-xs text-neutral-300 max-w-sm leading-relaxed">
                  Ultra-heavyweight loopback French terry created for supreme drape, structured hoods that stay standing, and coordinating tailored tactical cargo joggers.
                </p>
              </div>
              <div className="pt-6 z-10">
                <button
                  onClick={() => {
                    setSelectedCategory('hoodie');
                    scrollToCatalog();
                  }}
                  className="py-2.5 px-5 bg-amber-500 text-neutral-950 hover:bg-amber-400 font-bold text-xs uppercase tracking-wider rounded inline-flex items-center gap-2"
                >
                  <span>Explore Fleece</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Brand Values Section (Part 4 #6) */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-neutral-300/80">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs uppercase tracking-[0.25em] font-bold text-neutral-500 block mb-1">
            The Prime Standard
          </span>
          <h3 className="text-3xl font-bold text-neutral-950 font-serif-luxury uppercase">
            Built On Uncompromising Values
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 bg-white rounded-lg border border-neutral-200 shadow-xs space-y-2">
            <Shield className="w-6 h-6 text-amber-600 mb-2" />
            <h4 className="text-xs font-bold text-neutral-900 uppercase tracking-wider">
              Architectural Tailoring
            </h4>
            <p className="text-xs text-neutral-600 leading-relaxed">
              Every seam is tensioned and measured so garments maintain their sharp structure even after repeated wears.
            </p>
          </div>

          <div className="p-6 bg-white rounded-lg border border-neutral-200 shadow-xs space-y-2">
            <Layers className="w-6 h-6 text-amber-600 mb-2" />
            <h4 className="text-xs font-bold text-neutral-900 uppercase tracking-wider">
              Long-Staple Fibres
            </h4>
            <p className="text-xs text-neutral-600 leading-relaxed">
              We exclusively source long-staple combed cotton and dense loopback yarns for breathable, anti-pilling wear.
            </p>
          </div>

          <div className="p-6 bg-white rounded-lg border border-neutral-200 shadow-xs space-y-2">
            <Sparkles className="w-6 h-6 text-amber-600 mb-2" />
            <h4 className="text-xs font-bold text-neutral-900 uppercase tracking-wider">
              Signature Metallic Gold
            </h4>
            <p className="text-xs text-neutral-600 leading-relaxed">
              Custom-cast brass pullers and gold embroidery accents that echo the prestigious heritage of our native atelier.
            </p>
          </div>

          <div className="p-6 bg-white rounded-lg border border-neutral-200 shadow-xs space-y-2">
            <Award className="w-6 h-6 text-amber-600 mb-2" />
            <h4 className="text-xs font-bold text-neutral-900 uppercase tracking-wider">
              Uyo, Calabar & Port-Harcourt Flagships
            </h4>
            <p className="text-xs text-neutral-600 leading-relaxed">
              Physical flagship studios in Uyo, Calabar, and Port-Harcourt offering fitting lounges, custom monogramming, and express nationwide delivery.
            </p>
          </div>
        </div>
      </section>

      {/* 9. Newsletter Signup (Part 4 #7) */}
      <section className="py-16 bg-neutral-100 border-b border-neutral-300/80">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <span className="text-xs uppercase tracking-[0.25em] font-bold text-amber-700 block">
            Be The First In The Showroom
          </span>
          <h3 className="text-2xl sm:text-3xl font-bold text-neutral-950 font-serif-luxury uppercase">
            Join The Prime Wears Collective
          </h3>
          <p className="text-xs text-neutral-600 max-w-md mx-auto leading-relaxed">
            Get instant notifications on limited hoodie drops, knitwear releases, and exclusive member discounts.
          </p>

          {newsletterJoined ? (
            <div className="p-4 bg-emerald-50 border border-emerald-300 rounded-lg text-xs text-emerald-800 flex items-center justify-center gap-2 max-w-md mx-auto">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>You are subscribed. Check your inbox for your 10% welcome coupon.</span>
            </div>
          ) : (
            <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
              <input
                type="email"
                required
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                placeholder="Enter your email address..."
                className="flex-1 bg-white border border-neutral-300 rounded px-4 py-2.5 text-xs text-neutral-900 focus:outline-none focus:border-neutral-900"
              />
              <button
                type="submit"
                className="py-2.5 px-6 bg-neutral-950 hover:bg-black text-white font-bold text-xs uppercase tracking-wider rounded shadow transition-colors"
              >
                Subscribe
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
};
