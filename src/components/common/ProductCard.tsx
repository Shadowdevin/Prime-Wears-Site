import React, { useState } from 'react';
import { Product } from '../../types';
import { useCart } from '../../context/CartContext';
import { Heart, Plus, Sparkles } from 'lucide-react';
import { WhatsAppIcon } from '../../config/whatsapp';
import { WhatsAppNumberSelectModal } from './WhatsAppNumberSelectModal';

interface ProductCardProps {
  product: Product;
  onSelect: (product: Product) => void;
  onCustomOrder?: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onSelect,
  onCustomOrder
}) => {
  const { addToCart, isWishlisted, toggleWishlist } = useCart();
  const wishlisted = isWishlisted(product.id);
  const [isWhatsAppModalOpen, setIsWhatsAppModalOpen] = useState(false);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    // Default to first available color and size
    const defaultColor = product.colors[0]?.name || 'Standard';
    const defaultSize = product.sizes[0] || 'Standard';
    addToCart(product, defaultColor, defaultSize, 1);
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  return (
    <div
      onClick={() => onSelect(product)}
      className="group relative flex flex-col bg-white border border-neutral-200/90 hover:border-neutral-400 transition-all duration-300 cursor-pointer overflow-hidden rounded-md"
    >
      {/* Image Container with 4:3 or 1:1 Aspect Ratio and Neutral Background */}
      <div className="relative aspect-[4/5] sm:aspect-[3/4] w-full overflow-hidden bg-neutral-100 flex items-center justify-center">
        <img
          src={product.images[0]}
          alt={product.name}
          referrerPolicy="no-referrer"
          className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
        />

        {/* Subtle Text Kicker (No Pill Badges) */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5 text-[11px] font-medium tracking-wider text-neutral-800 bg-white/90 backdrop-blur-sm px-2 py-0.5 rounded-sm shadow-xs uppercase">
          {product.isCustomizable ? (
            <>
              <Sparkles className="w-3 h-3 text-amber-500" />
              <span>Bespoke Available</span>
            </>
          ) : product.bestseller ? (
            <span>Bestseller</span>
          ) : (
            <span>{product.stockStatus === 'made_to_order' ? 'Handcrafted' : 'Ready to Ship'}</span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={handleWishlist}
          aria-label={wishlisted ? 'Remove from wishlist' : 'Save to wishlist'}
          className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-sm transition-all ${
            wishlisted
              ? 'bg-neutral-900 text-amber-400'
              : 'bg-white/80 text-neutral-700 hover:text-neutral-950 hover:bg-white shadow-xs'
          }`}
        >
          <Heart className={`w-4 h-4 ${wishlisted ? 'fill-amber-400' : ''}`} />
        </button>

        {/* Quick Actions Hover Drawer */}
        <div className="absolute inset-x-3 bottom-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center gap-2">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setIsWhatsAppModalOpen(true);
            }}
            className="flex-1 py-2 px-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold uppercase tracking-wider rounded shadow-md flex items-center justify-center gap-1.5 transition-colors"
          >
            <WhatsAppIcon className="w-3.5 h-3.5" />
            <span>Order on WhatsApp</span>
          </button>

          <button
            onClick={() => onSelect(product)}
            className="py-2 px-3 bg-white/95 hover:bg-white text-neutral-900 text-xs font-semibold uppercase tracking-wider rounded shadow-md transition-colors"
          >
            Details
          </button>
        </div>
      </div>

      {/* Product Card Metadata */}
      <div className="p-4 flex flex-col flex-1 justify-between bg-white">
        <div>
          {/* Category & Color Swatches */}
          <div className="flex items-center justify-between text-xs text-neutral-500 mb-1">
            <span className="uppercase tracking-widest text-[11px] font-semibold text-neutral-600">
              {product.category}
            </span>
            {product.colors.length > 1 && (
              <div className="flex items-center gap-1">
                {product.colors.slice(0, 4).map((c, idx) => (
                  <span
                    key={idx}
                    title={c.name}
                    className="w-2.5 h-2.5 rounded-full border border-neutral-300"
                    style={{ backgroundColor: c.hex }}
                  />
                ))}
                {product.colors.length > 4 && (
                  <span className="text-[10px] text-neutral-400">+{product.colors.length - 4}</span>
                )}
              </div>
            )}
          </div>

          {/* Product Name */}
          <h3 className="text-sm font-semibold text-neutral-900 group-hover:text-amber-600 transition-colors line-clamp-1">
            {product.name}
          </h3>

          <p className="text-xs text-neutral-500 line-clamp-2 mt-1 leading-relaxed">
            {product.shortDescription}
          </p>
        </div>

        {/* Pricing & WhatsApp Order CTA */}
        <div className="mt-3 pt-2.5 border-t border-neutral-100">
          <div className="flex items-center justify-between">
            <div className="flex items-baseline gap-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200/70">
                Price Coming Soon
              </span>
            </div>
            <span className="text-[11px] text-neutral-500 font-medium">
              {product.sizes.length} sizes
            </span>
          </div>

          {/* Dedicated Order on WhatsApp Button on Every Product Card */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setIsWhatsAppModalOpen(true);
            }}
            className="mt-3 w-full py-2.5 px-3 bg-neutral-900 hover:bg-neutral-950 text-white font-bold text-xs uppercase tracking-wider rounded-lg border border-neutral-800 hover:border-amber-400/80 flex items-center justify-center gap-2 transition-all shadow-xs group/btn"
          >
            <div className="w-5 h-5 rounded-full bg-emerald-600 flex items-center justify-center text-white shrink-0 group-hover/btn:scale-110 transition-transform">
              <WhatsAppIcon className="w-3.5 h-3.5" />
            </div>
            <span className="group-hover/btn:text-amber-300 transition-colors">Order on WhatsApp</span>
          </button>
        </div>
      </div>

      {/* Product-Specific WhatsApp Number Selection Popup */}
      <WhatsAppNumberSelectModal
        isOpen={isWhatsAppModalOpen}
        onClose={() => setIsWhatsAppModalOpen(false)}
        product={product}
        mode="product_order"
      />
    </div>
  );
};
