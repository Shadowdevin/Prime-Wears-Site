import React from 'react';
import { useCart, formatNGN } from '../../context/CartContext';
import { X, Trash2, ShoppingBag, ArrowRight, ShieldCheck, Truck } from 'lucide-react';
import { WhatsAppIcon } from '../../config/whatsapp';

interface CartDrawerProps {
  onOpenCheckout: () => void;
  onNavigate: (route: string) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ onOpenCheckout, onNavigate }) => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    subtotal,
    deliveryFee,
    freeDeliveryThreshold
  } = useCart();

  if (!isCartOpen) return null;

  const totalAmount = subtotal + deliveryFee;
  const progressToFreeShipping = Math.min(100, (subtotal / freeDeliveryThreshold) * 100);
  const amountToFreeShipping = Math.max(0, freeDeliveryThreshold - subtotal);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs transition-opacity animate-fadeIn">
      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col border-l border-neutral-200">
          {/* Header */}
          <div className="p-5 border-b border-neutral-200 flex items-center justify-between bg-neutral-50">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-neutral-900" />
              <h2 className="text-base font-bold text-neutral-900 uppercase tracking-wider font-serif-luxury">
                Your Shopping Bag ({cart.length})
              </h2>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              aria-label="Close cart"
              className="p-1.5 rounded-full text-neutral-500 hover:text-black hover:bg-neutral-200 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Indicator */}
          <div className="px-5 py-3 bg-amber-50/70 border-b border-amber-200/60 text-xs">
            <div className="flex items-center justify-between text-amber-950 font-medium mb-1.5">
              <span className="flex items-center gap-1.5">
                <Truck className="w-3.5 h-3.5 text-amber-700" />
                <span className="font-bold text-amber-900">Complimentary Nationwide Nigerian Delivery</span>
              </span>
              <span className="text-[11px] font-bold text-amber-700">Prime Atelier</span>
            </div>
            <div className="w-full bg-amber-200/60 h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-amber-600 h-full rounded-full transition-all duration-300"
                style={{ width: `${progressToFreeShipping}%` }}
              />
            </div>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-5 divide-y divide-neutral-100">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-16 px-4">
                <div className="w-16 h-16 rounded-full bg-neutral-100 flex items-center justify-center mb-4 text-neutral-400">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h3 className="text-base font-bold text-neutral-900 font-serif-luxury">
                  Your bag is empty
                </h3>
                <p className="text-xs text-neutral-500 max-w-xs mt-1 leading-relaxed">
                  Explore bespoke native attire, handcrafted Italian calfskin monkstraps, or luxury knit polos.
                </p>
                <div className="flex flex-col sm:flex-row gap-2 mt-6 w-full max-w-xs">
                  <button
                    onClick={() => {
                      setIsCartOpen(false);
                      onNavigate('native');
                    }}
                    className="flex-1 py-2 px-3 bg-neutral-900 text-white rounded text-xs font-semibold uppercase tracking-wider hover:bg-black transition-colors"
                  >
                    Native Wears
                  </button>
                  <button
                    onClick={() => {
                      setIsCartOpen(false);
                      onNavigate('casual');
                    }}
                    className="flex-1 py-2 px-3 bg-neutral-100 text-neutral-800 rounded text-xs font-semibold uppercase tracking-wider hover:bg-neutral-200 transition-colors"
                  >
                    Casual Swag
                  </button>
                </div>
              </div>
            ) : (
              cart.map((item) => (
                <div key={item.id} className="py-4 flex gap-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-24 object-cover rounded bg-neutral-100 shrink-0"
                  />
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="text-xs font-bold text-neutral-900 line-clamp-2">
                          {item.name}
                        </h4>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          aria-label="Remove item"
                          className="text-neutral-400 hover:text-red-600 transition-colors p-1"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="text-[11px] text-neutral-500 space-y-0.5 mt-1">
                        <div>
                          <span>Color: </span>
                          <span className="font-semibold text-neutral-800">{item.color}</span>
                        </div>
                        <div>
                          <span>Size: </span>
                          <span className="font-semibold text-neutral-800">{item.size}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      {/* Stepper */}
                      <div className="flex items-center border border-neutral-200 rounded">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="px-2 py-0.5 text-xs text-neutral-600 hover:bg-neutral-100 font-bold"
                        >
                          -
                        </button>
                        <span className="px-2.5 py-0.5 text-xs font-bold text-neutral-900 tabular-nums">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="px-2 py-0.5 text-xs text-neutral-600 hover:bg-neutral-100 font-bold"
                        >
                          +
                        </button>
                      </div>

                      <span className="text-xs font-semibold text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                        Price Coming Soon
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Summary & Checkout */}
          {cart.length > 0 && (
            <div className="p-5 border-t border-neutral-200 bg-neutral-50 space-y-3">
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-neutral-600">
                  <span>Subtotal</span>
                  <span className="font-semibold text-amber-800">
                    Price Coming Soon
                  </span>
                </div>
                <div className="flex justify-between text-neutral-600">
                  <span>Estimated Delivery</span>
                  <span className="font-bold text-emerald-700 uppercase tracking-wide">
                    Complimentary
                  </span>
                </div>
                <div className="flex justify-between text-sm font-bold text-neutral-950 pt-2 border-t border-neutral-200">
                  <span>Total Amount</span>
                  <span className="text-sm font-bold text-amber-800">
                    Price Coming Soon
                  </span>
                </div>
              </div>

              <button
                onClick={() => {
                  setIsCartOpen(false);
                  onOpenCheckout();
                }}
                className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider rounded-md shadow-md flex items-center justify-center gap-2 transition-all"
              >
                <WhatsAppIcon className="w-4 h-4 text-white" />
                <span>Proceed to WhatsApp Checkout</span>
              </button>

              <div className="flex items-center justify-center gap-2 text-[11px] text-neutral-500 pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>100% Guaranteed Fit & Authentic Prime Wears Packaging</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
