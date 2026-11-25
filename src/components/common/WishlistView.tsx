import React from 'react';
import { useCart } from '../../context/CartContext';
import { PRODUCTS } from '../../data/products';
import { Product } from '../../types';
import { ProductCard } from './ProductCard';
import { Heart, ShoppingBag, ArrowRight, ArrowLeft } from 'lucide-react';

interface WishlistViewProps {
  onSelectProduct: (product: Product) => void;
  onNavigate: (route: string) => void;
  onOpenCustomOrder: (product?: Product) => void;
  onBack?: () => void;
}

export const WishlistView: React.FC<WishlistViewProps> = ({
  onSelectProduct,
  onNavigate,
  onOpenCustomOrder,
  onBack
}) => {
  const { wishlist } = useCart();

  const wishlistedProducts = PRODUCTS.filter((p) => wishlist.includes(p.id));

  return (
    <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="border-b border-neutral-200 pb-6 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-amber-700 uppercase tracking-widest mb-1">
              <Heart className="w-4 h-4 fill-amber-700" />
              <span>Your Saved Favorites</span>
            </div>
            <h1 className="text-3xl font-bold text-neutral-900 font-serif-luxury uppercase">
              Wishlist ({wishlistedProducts.length})
            </h1>
          </div>
          <button
            onClick={() => (onBack ? onBack() : onNavigate('home'))}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-100 hover:bg-neutral-200 text-neutral-800 text-xs font-bold uppercase tracking-wider transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Shopping</span>
          </button>
        </div>

        {wishlistedProducts.length === 0 ? (
          <div className="py-24 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-neutral-100 flex items-center justify-center mx-auto text-neutral-400">
              <Heart className="w-8 h-8" />
            </div>
            <h2 className="text-xl font-bold text-neutral-900 font-serif-luxury">
              Your wishlist is currently empty
            </h2>
            <p className="text-xs text-neutral-500 max-w-sm mx-auto leading-relaxed">
              Explore bespoke Nigerian Senator attire or the latest casual swag knitwear and save items you love.
            </p>
            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                onClick={() => onNavigate('native')}
                className="py-2.5 px-5 bg-neutral-900 text-white rounded text-xs font-bold uppercase tracking-wider hover:bg-black transition-colors"
              >
                Browse Native Wears
              </button>
              <button
                onClick={() => onNavigate('casual')}
                className="py-2.5 px-5 bg-neutral-100 text-neutral-800 rounded text-xs font-bold uppercase tracking-wider hover:bg-neutral-200 transition-colors"
              >
                Browse Casual Swag
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {wishlistedProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onSelect={onSelectProduct}
                onCustomOrder={() => onOpenCustomOrder(product)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
