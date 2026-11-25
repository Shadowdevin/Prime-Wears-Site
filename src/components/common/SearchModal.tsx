import React, { useState, useMemo } from 'react';
import { Search, X, ArrowRight } from 'lucide-react';
import { Product } from '../../types';
import { PRODUCTS } from '../../data/products';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProduct: (product: Product) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectProduct
}) => {
  if (!isOpen) return null;

  const [query, setQuery] = useState('');
  const [filterExperience, setFilterExperience] = useState<'all' | 'native' | 'casual'>('all');

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((p) => {
      const matchesExp = filterExperience === 'all' || p.experience === filterExperience;
      const q = query.toLowerCase().trim();
      if (!q) return matchesExp;
      const matchesText =
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q));
      return matchesExp && matchesText;
    });
  }, [query, filterExperience]);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-start justify-center p-4 sm:p-6 pt-16 sm:pt-20 animate-fadeIn">
      <div className="relative bg-white w-full max-w-2xl rounded-lg shadow-2xl overflow-hidden border border-neutral-200">
        {/* Search Input Bar */}
        <div className="p-4 sm:p-5 border-b border-neutral-200 flex items-center gap-3">
          <Search className="w-5 h-5 text-neutral-400 shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search senator outfits, agbada, knit polos, hoodies, caps..."
            autoFocus
            className="w-full text-sm sm:text-base font-medium text-neutral-900 placeholder-neutral-400 focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-neutral-400 hover:text-neutral-700 text-xs px-1.5 py-0.5 rounded bg-neutral-100"
            >
              Clear
            </button>
          )}
          <button
            onClick={onClose}
            aria-label="Close search"
            className="p-1 rounded-full text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filter Segmented Controls */}
        <div className="px-5 py-2.5 bg-neutral-50 border-b border-neutral-200 flex items-center gap-2 overflow-x-auto text-xs">
          <span className="text-neutral-400 text-[11px] uppercase tracking-wider font-semibold mr-1">
            Filter:
          </span>
          <button
            onClick={() => setFilterExperience('all')}
            className={`px-3 py-1 rounded text-xs font-semibold whitespace-nowrap transition-colors ${
              filterExperience === 'all'
                ? 'bg-neutral-900 text-white'
                : 'bg-white text-neutral-600 hover:bg-neutral-200 border border-neutral-200'
            }`}
          >
            All Collections ({PRODUCTS.length})
          </button>
          <button
            onClick={() => setFilterExperience('native')}
            className={`px-3 py-1 rounded text-xs font-semibold whitespace-nowrap transition-colors ${
              filterExperience === 'native'
                ? 'bg-neutral-900 text-white'
                : 'bg-white text-neutral-600 hover:bg-neutral-200 border border-neutral-200'
            }`}
          >
            Native Wears & Shoes ({PRODUCTS.filter((p) => p.experience === 'native').length})
          </button>
          <button
            onClick={() => setFilterExperience('casual')}
            className={`px-3 py-1 rounded text-xs font-semibold whitespace-nowrap transition-colors ${
              filterExperience === 'casual'
                ? 'bg-neutral-900 text-white'
                : 'bg-white text-neutral-600 hover:bg-neutral-200 border border-neutral-200'
            }`}
          >
            Casual Swag & Caps ({PRODUCTS.filter((p) => p.experience === 'casual').length})
          </button>
        </div>

        {/* Search Results List */}
        <div className="max-h-[60vh] overflow-y-auto divide-y divide-neutral-100 p-2">
          {filteredProducts.length === 0 ? (
            <div className="py-12 text-center text-neutral-500">
              <p className="text-sm">No items found matching &ldquo;{query}&rdquo;</p>
              <p className="text-xs text-neutral-400 mt-1">
                Try searching for &quot;Senator&quot;, &quot;Kaftan&quot;, &quot;Polo&quot;, &quot;Hoodie&quot;, or &quot;Agbada&quot;.
              </p>
            </div>
          ) : (
            filteredProducts.map((p) => (
              <div
                key={p.id}
                onClick={() => {
                  onSelectProduct(p);
                  onClose();
                }}
                className="flex items-center gap-4 p-3 hover:bg-neutral-50 rounded-lg cursor-pointer transition-colors group"
              >
                <img
                  src={p.images[0]}
                  alt={p.name}
                  className="w-14 h-16 object-cover rounded bg-neutral-100 shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-amber-600">
                      {p.experience === 'native' ? 'Native Atelier' : 'Casual Swag'}
                    </span>
                    <span className="text-neutral-300">·</span>
                    <span className="text-[10px] uppercase text-neutral-500">{p.category}</span>
                  </div>
                  <h4 className="text-sm font-semibold text-neutral-900 group-hover:text-amber-600 truncate">
                    {p.name}
                  </h4>
                  <p className="text-xs text-neutral-500 truncate">{p.shortDescription}</p>
                </div>
                <div className="text-right shrink-0">
                  <span className="text-xs font-semibold uppercase tracking-wider text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                    Price Coming Soon
                  </span>
                  <ArrowRight className="w-4 h-4 text-neutral-400 group-hover:text-neutral-900 ml-auto mt-1 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
