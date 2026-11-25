import React, { useState } from 'react';
import { useCart, formatNGN } from '../../context/CartContext';
import { useOrders } from '../../context/OrderContext';
import { X, CheckCircle2, ShieldCheck, Copy, Check, Package, MessageCircle, ExternalLink } from 'lucide-react';
import { WHATSAPP_CONFIG, WhatsAppIcon, openWhatsAppChat } from '../../config/whatsapp';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOrderSuccess: (orderRef: string) => void;
  onTrackOrder?: (orderRef: string) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  onOrderSuccess,
  onTrackOrder
}) => {
  const { cart, subtotal, deliveryFee, clearCart } = useCart();
  const { createContemporaryOrder } = useOrders();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [state, setState] = useState('Lagos');
  const [city, setCity] = useState('');
  const [selectedWhatsAppContact, setSelectedWhatsAppContact] = useState<'number1' | 'number2'>('number1');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderCompleteRef, setOrderCompleteRef] = useState<string | null>(null);

  if (!isOpen) return null;

  const totalAmount = subtotal + deliveryFee;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      // Create contemporary order in OrderContext so it can be tracked
      const newOrder = createContemporaryOrder({
        customerName: fullName || 'Valued Client',
        email: email || 'client@primewears.ng',
        phone: phone || '+234 800 000 0000',
        deliveryAddress: address || 'Flagship Pickup',
        deliveryCity: city || 'Lagos',
        deliveryState: state || 'Lagos State',
        items: cart.map((item) => ({
          productId: item.productId,
          name: item.name,
          image: item.image,
          color: item.color,
          size: item.size,
          quantity: item.quantity,
          price: item.price
        })),
        subtotal,
        deliveryFee,
        totalAmount,
        paymentMethod: 'transfer',
        estimatedDeliveryDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        fulfillmentHub: state.toLowerCase().includes('cross river')
          ? 'Calabar Marian Road Showroom'
          : state.toLowerCase().includes('rivers')
          ? 'Port-Harcourt Luxury Studio (GRA)'
          : 'Uyo Flagship Central Hub'
      });

      const orderRef = newOrder.id;
      setOrderCompleteRef(orderRef);
      setIsSubmitting(false);

      // Construct itemized WhatsApp order message
      const itemsList = cart
        .map((i, idx) => `${idx + 1}. ${i.name} (Color: ${i.color}, Size: ${i.size}) x${i.quantity}`)
        .join('\n');

      const waOrderMsg = `Hello Prime Wears! 👋\n\nI want to complete my order through your WhatsApp concierge.\n\nOrder Ref: ${orderRef}\nCustomer: ${fullName || 'Client'}\nPhone: ${phone}\nDestination: ${address}, ${city}, ${state}\n\nItems Requested:\n${itemsList}\n\nPlease confirm availability and payment details. Thank you!`;

      openWhatsAppChat(selectedWhatsAppContact, waOrderMsg);

      clearCart();
      onOrderSuccess(orderRef);
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div className="relative bg-white w-full max-w-2xl rounded-lg shadow-2xl overflow-hidden border border-neutral-200 my-8">
        {/* Header */}
        <div className="p-5 border-b border-neutral-200 flex items-center justify-between bg-neutral-50">
          <div>
            <h2 className="text-base font-bold text-neutral-900 uppercase tracking-wider font-serif-luxury">
              {orderCompleteRef ? 'Order Confirmed' : 'Checkout & Delivery'}
            </h2>
            <p className="text-xs text-neutral-500">
              {orderCompleteRef ? 'Prime Wears Concierge Fulfillment' : 'Complete your luxury purchase securely'}
            </p>
          </div>
          <button
            onClick={onClose}
            aria-label="Close checkout"
            className="p-1.5 rounded-full text-neutral-500 hover:text-black hover:bg-neutral-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {orderCompleteRef ? (
          <div className="p-8 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-9 h-9" />
            </div>
            <h3 className="text-2xl font-bold text-neutral-900 font-serif-luxury">
              Thank You For Your Order
            </h3>
            <p className="text-xs text-neutral-600 max-w-md mx-auto leading-relaxed">
              Your order reference is <strong className="text-neutral-900 tracking-wider font-mono">{orderCompleteRef}</strong>. Our logistics concierge has dispatched your order to our Uyo, Calabar & Port-Harcourt fulfillment team.
            </p>

            <div className="bg-neutral-50 p-4 rounded-lg border border-neutral-200 max-w-md mx-auto text-left text-xs space-y-2">
              <div className="flex justify-between text-neutral-600">
                <span>Customer:</span>
                <span className="font-semibold text-neutral-900">{fullName}</span>
              </div>
              <div className="flex justify-between text-neutral-600">
                <span>Delivery Destination:</span>
                <span className="font-semibold text-neutral-900">{city}, {state}</span>
              </div>
              <div className="flex justify-between text-neutral-600">
                <span>Checkout Method:</span>
                <span className="font-semibold text-emerald-700 flex items-center gap-1">
                  <WhatsAppIcon className="w-3 h-3" />
                  <span>WhatsApp Concierge ({selectedWhatsAppContact === 'number1' ? 'Number 1' : 'Number 2'})</span>
                </span>
              </div>
              <div className="flex justify-between text-neutral-600">
                <span>Pricing Status:</span>
                <span className="font-bold text-amber-800">Price Coming Soon (Inquiry Logged)</span>
              </div>
            </div>

            <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-lg max-w-md mx-auto text-left text-xs space-y-2">
              <span className="font-bold text-emerald-950 flex items-center gap-1.5">
                <WhatsAppIcon className="w-4 h-4 text-emerald-700" />
                <span>WhatsApp Order Dispatched</span>
              </span>
              <p className="text-emerald-900 leading-relaxed text-[11px]">
                Your order details have been loaded into WhatsApp. If your chat did not open automatically, tap below to message either concierge desk directly:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => openWhatsAppChat('number1', `Hello Prime Wears! 👋 Inquiring on my order ref: ${orderCompleteRef}`)}
                  className="py-2 px-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded text-[11px] font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors"
                >
                  <WhatsAppIcon className="w-3.5 h-3.5" />
                  <span>Number 1 (08066825239)</span>
                </button>
                <button
                  type="button"
                  onClick={() => openWhatsAppChat('number2', `Hello Prime Wears! 👋 Inquiring on my order ref: ${orderCompleteRef}`)}
                  className="py-2 px-3 bg-neutral-900 hover:bg-neutral-950 text-white rounded text-[11px] font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors"
                >
                  <WhatsAppIcon className="w-3.5 h-3.5" />
                  <span>Number 2 (09052473964)</span>
                </button>
              </div>
            </div>

            <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
              {onTrackOrder && (
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onTrackOrder(orderCompleteRef);
                  }}
                  className="w-full sm:w-auto py-2.5 px-6 bg-amber-500 hover:bg-amber-400 text-neutral-950 text-xs font-bold uppercase tracking-wider rounded transition-colors shadow-md flex items-center justify-center gap-2"
                >
                  <Package className="w-4 h-4 text-neutral-950" />
                  <span>Track This Order Now</span>
                </button>
              )}
              <button
                type="button"
                onClick={onClose}
                className="w-full sm:w-auto py-2.5 px-6 bg-neutral-950 text-white text-xs font-bold uppercase tracking-wider rounded hover:bg-black transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Customer Information */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-neutral-900 uppercase tracking-wider border-b border-neutral-100 pb-1">
                1. Delivery & Contact Details
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-neutral-700 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Babatunde Adeleke"
                    className="w-full bg-white border border-neutral-300 rounded px-3 py-2 text-xs text-neutral-900 focus:outline-none focus:border-neutral-900"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-neutral-700 mb-1">
                    Phone Number (WhatsApp Active) *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+234 803 000 0000"
                    className="w-full bg-white border border-neutral-300 rounded px-3 py-2 text-xs text-neutral-900 focus:outline-none focus:border-neutral-900"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-neutral-700 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="client@example.com"
                    className="w-full bg-white border border-neutral-300 rounded px-3 py-2 text-xs text-neutral-900 focus:outline-none focus:border-neutral-900"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-neutral-700 mb-1">
                    State *
                  </label>
                  <select
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    className="w-full bg-white border border-neutral-300 rounded px-3 py-2 text-xs text-neutral-900 focus:outline-none focus:border-neutral-900"
                  >
                    <option value="Akwa Ibom">Akwa Ibom (Uyo Flagship)</option>
                    <option value="Cross River">Cross River (Calabar Showroom)</option>
                    <option value="Rivers">Rivers (Port-Harcourt Studio)</option>
                    <option value="Lagos">Lagos State</option>
                    <option value="FCT">Federal Capital Territory (Abuja)</option>
                    <option value="Delta">Delta State</option>
                    <option value="Edo">Edo State</option>
                    <option value="Enugu">Enugu State</option>
                    <option value="Other">Other State in Nigeria</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="sm:col-span-2">
                  <label className="block text-[11px] font-semibold text-neutral-700 mb-1">
                    Street Address / Estate / House No *
                  </label>
                  <input
                    type="text"
                    required
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="e.g. 42 Brooks Avenue, Uyo / 18 Marian Rd, Calabar / GRA, Port-Harcourt"
                    className="w-full bg-white border border-neutral-300 rounded px-3 py-2 text-xs text-neutral-900 focus:outline-none focus:border-neutral-900"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-neutral-700 mb-1">
                    City / Town *
                  </label>
                  <input
                    type="text"
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="e.g. Uyo / Calabar / Port-Harcourt"
                    className="w-full bg-white border border-neutral-300 rounded px-3 py-2 text-xs text-neutral-900 focus:outline-none focus:border-neutral-900"
                  />
                </div>
              </div>
            </div>

            {/* WhatsApp Concierge Checkout Selector */}
            <div className="space-y-3">
              <div className="flex items-center justify-between border-b border-neutral-100 pb-1">
                <h4 className="text-xs font-bold text-neutral-900 uppercase tracking-wider">
                  2. Choose WhatsApp Concierge for Checkout
                </h4>
                <span className="text-[11px] text-emerald-700 font-semibold flex items-center gap-1">
                  <WhatsAppIcon className="w-3.5 h-3.5 text-emerald-600" />
                  <span>WhatsApp Checkout Only</span>
                </span>
              </div>

              <p className="text-[11px] text-neutral-500">
                Prime Wears processes all bespoke and contemporary orders directly through our WhatsApp concierge. Choose which number to finalize your order with:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setSelectedWhatsAppContact('number1')}
                  className={`p-3.5 rounded-xl border text-left flex items-start gap-3 transition-all ${
                    selectedWhatsAppContact === 'number1'
                      ? 'border-neutral-950 bg-neutral-900 text-white shadow-md ring-1 ring-amber-400/40'
                      : 'border-neutral-200 bg-white text-neutral-800 hover:border-neutral-400'
                  }`}
                >
                  <div className="w-9 h-9 rounded-lg bg-emerald-600 flex items-center justify-center text-white shrink-0">
                    <WhatsAppIcon className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-bold block">{WHATSAPP_CONFIG.number1.orderLabel}</span>
                      <span className={`text-[9px] px-1.5 py-0.2 rounded font-semibold ${selectedWhatsAppContact === 'number1' ? 'bg-amber-400/30 text-amber-300' : 'bg-neutral-100 text-neutral-600'}`}>
                        Primary
                      </span>
                    </div>
                    <span className={`text-[11px] font-mono block mt-0.5 ${selectedWhatsAppContact === 'number1' ? 'text-neutral-300' : 'text-neutral-600'}`}>
                      {WHATSAPP_CONFIG.number1.displayFormatted}
                    </span>
                    <span className={`text-[10px] block mt-0.5 ${selectedWhatsAppContact === 'number1' ? 'text-neutral-400' : 'text-neutral-500'}`}>
                      {WHATSAPP_CONFIG.number1.roleDescription}
                    </span>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedWhatsAppContact('number2')}
                  className={`p-3.5 rounded-xl border text-left flex items-start gap-3 transition-all ${
                    selectedWhatsAppContact === 'number2'
                      ? 'border-neutral-950 bg-neutral-900 text-white shadow-md ring-1 ring-amber-400/40'
                      : 'border-neutral-200 bg-white text-neutral-800 hover:border-neutral-400'
                  }`}
                >
                  <div className="w-9 h-9 rounded-lg bg-emerald-600 flex items-center justify-center text-white shrink-0">
                    <WhatsAppIcon className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <span className="text-xs font-bold block">{WHATSAPP_CONFIG.number2.orderLabel}</span>
                    <span className={`text-[11px] font-mono block mt-0.5 ${selectedWhatsAppContact === 'number2' ? 'text-neutral-300' : 'text-neutral-600'}`}>
                      {WHATSAPP_CONFIG.number2.displayFormatted}
                    </span>
                    <span className={`text-[10px] block mt-0.5 ${selectedWhatsAppContact === 'number2' ? 'text-neutral-400' : 'text-neutral-500'}`}>
                      {WHATSAPP_CONFIG.number2.roleDescription}
                    </span>
                  </div>
                </button>
              </div>
            </div>

            {/* Order Cost Breakdown */}
            <div className="bg-neutral-50 p-4 rounded border border-neutral-200 space-y-2 text-xs">
              <div className="flex justify-between text-neutral-600">
                <span>Subtotal ({cart.length} items)</span>
                <span className="font-semibold text-amber-800">
                  Price Coming Soon
                </span>
              </div>
              <div className="flex justify-between text-neutral-600">
                <span>Nigerian Nationwide Delivery</span>
                <span className="font-semibold text-emerald-700">
                  Complimentary
                </span>
              </div>
              <div className="flex justify-between text-sm font-bold text-neutral-950 pt-2 border-t border-neutral-200">
                <span>Pricing Status</span>
                <span className="text-sm font-bold text-amber-800">Price Coming Soon</span>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider rounded-lg shadow-md transition-all flex items-center justify-center gap-2.5 disabled:opacity-70"
            >
              {isSubmitting ? (
                <span>Generating Order Reference & Opening WhatsApp...</span>
              ) : (
                <>
                  <WhatsAppIcon className="w-4 h-4 text-white" />
                  <span>
                    Proceed to WhatsApp ({selectedWhatsAppContact === 'number1' ? 'Number 1' : 'Number 2'}) · Complete Order
                  </span>
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
