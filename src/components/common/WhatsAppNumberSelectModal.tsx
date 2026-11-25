import React, { useState } from 'react';
import { Product } from '../../types';
import {
  WHATSAPP_CONFIG,
  WhatsAppIcon,
  openWhatsAppChat,
  buildProductWhatsAppMessage,
  getProductShareableUrl,
  getProductAbsoluteImageUrl,
  DEFAULT_WHATSAPP_ENQUIRY_MESSAGE
} from '../../config/whatsapp';
import { X, CheckCircle2, ExternalLink, ShieldCheck, MessageCircle, ChevronDown, ChevronUp, Copy, Check } from 'lucide-react';

interface WhatsAppNumberSelectModalProps {
  isOpen: boolean;
  onClose: () => void;
  product?: Product | null;
  mode?: 'enquiry' | 'product_order';
  selectedColor?: string;
  selectedSize?: string;
}

export const WhatsAppNumberSelectModal: React.FC<WhatsAppNumberSelectModalProps> = ({
  isOpen,
  onClose,
  product,
  mode = product ? 'product_order' : 'enquiry',
  selectedColor,
  selectedSize
}) => {
  const [showPreview, setShowPreview] = useState(false);
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const isProductMode = mode === 'product_order' && product;

  // Resolve message
  let activeMessage = DEFAULT_WHATSAPP_ENQUIRY_MESSAGE;
  let fullProductUrl = '';
  let fullImageUrl = '';

  if (isProductMode && product) {
    fullProductUrl = getProductShareableUrl(product.id, product.experience);
    fullImageUrl = getProductAbsoluteImageUrl(product.images[0]);
    activeMessage = buildProductWhatsAppMessage({
      name: product.name,
      url: fullProductUrl,
      imageUrl: fullImageUrl
    });
  }

  const handleSelectNumber = (contactId: 'number1' | 'number2') => {
    openWhatsAppChat(contactId, activeMessage);
    onClose();
  };

  const handleCopyMessage = () => {
    navigator.clipboard.writeText(activeMessage);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="relative bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden border border-neutral-200 transform transition-all text-neutral-900 my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header with Black & Gold Branding & WhatsApp Accent */}
        <div className="bg-gradient-to-r from-neutral-950 via-neutral-900 to-neutral-950 p-5 text-white border-b border-amber-500/30 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-lg shadow-emerald-950/40 ring-2 ring-emerald-500/30">
              <WhatsAppIcon className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] uppercase font-bold tracking-widest text-amber-400">
                  Prime Wears Concierge
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              </div>
              <h3 className="text-base font-bold font-serif-luxury tracking-wide text-white">
                {isProductMode ? 'Order on WhatsApp' : 'Chat on WhatsApp'}
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="Close dialog"
            className="p-1.5 rounded-full text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 sm:p-6 space-y-5">
          {/* Product Snapshot if in product order mode */}
          {isProductMode && product ? (
            <div className="bg-neutral-50 rounded-xl p-3 border border-neutral-200 flex items-center gap-3">
              <img
                src={product.images[0]}
                alt={product.name}
                className="w-16 h-20 object-cover rounded-lg bg-neutral-200 shrink-0 border border-neutral-200"
              />
              <div className="flex-1 min-w-0">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-neutral-500 block truncate">
                  {product.category}
                </span>
                <h4 className="text-xs font-bold text-neutral-900 truncate">
                  {product.name}
                </h4>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-[10px] font-semibold text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                    Price Coming Soon
                  </span>
                  {(selectedSize || selectedColor) && (
                    <span className="text-[10px] text-neutral-500 truncate">
                      {selectedColor && `Color: ${selectedColor}`} {selectedSize && `· Size: ${selectedSize}`}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <p className="text-xs text-neutral-600 leading-relaxed">
              Connect directly with our luxury tailoring atelier and showroom desk. Select which official WhatsApp concierge number you would like to chat with:
            </p>
          )}

          {/* Action Prompt */}
          <div className="space-y-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-700 block">
              {isProductMode ? 'Select WhatsApp Number to Order:' : 'Select WhatsApp Number to Chat:'}
            </span>
            <p className="text-[11px] text-neutral-500">
              Tap either number below to open WhatsApp with your pre-filled inquiry.
            </p>
          </div>

          {/* WhatsApp Number Buttons (As requested by Prompt) */}
          <div className="space-y-3">
            {/* Number 1 Option */}
            <button
              type="button"
              onClick={() => handleSelectNumber('number1')}
              className="w-full group p-3.5 bg-neutral-900 hover:bg-neutral-950 text-white rounded-xl border border-neutral-800 hover:border-amber-400/80 transition-all shadow-md hover:shadow-lg flex items-center justify-between text-left"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-10 h-10 rounded-lg bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-sm group-hover:scale-105 transition-transform">
                  <WhatsAppIcon className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-white group-hover:text-amber-300 transition-colors">
                      {isProductMode ? WHATSAPP_CONFIG.number1.orderLabel : WHATSAPP_CONFIG.number1.chatLabel}
                    </span>
                    <span className="text-[10px] bg-amber-400/20 text-amber-300 font-semibold px-1.5 py-0.2 rounded border border-amber-400/30">
                      Primary
                    </span>
                  </div>
                  <p className="text-xs font-mono text-neutral-300 mt-0.5 tracking-tight">
                    {WHATSAPP_CONFIG.number1.displayFormatted}
                  </p>
                  <span className="text-[10px] text-neutral-400 block truncate">
                    {WHATSAPP_CONFIG.number1.roleDescription}
                  </span>
                </div>
              </div>

              <div className="w-8 h-8 rounded-full bg-neutral-800 group-hover:bg-amber-400 group-hover:text-neutral-950 text-neutral-300 flex items-center justify-center shrink-0 transition-colors ml-2">
                <ExternalLink className="w-4 h-4" />
              </div>
            </button>

            {/* Number 2 Option */}
            <button
              type="button"
              onClick={() => handleSelectNumber('number2')}
              className="w-full group p-3.5 bg-neutral-900 hover:bg-neutral-950 text-white rounded-xl border border-neutral-800 hover:border-amber-400/80 transition-all shadow-md hover:shadow-lg flex items-center justify-between text-left"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-10 h-10 rounded-lg bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-sm group-hover:scale-105 transition-transform">
                  <WhatsAppIcon className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-white group-hover:text-amber-300 transition-colors">
                      {isProductMode ? WHATSAPP_CONFIG.number2.orderLabel : WHATSAPP_CONFIG.number2.chatLabel}
                    </span>
                  </div>
                  <p className="text-xs font-mono text-neutral-300 mt-0.5 tracking-tight">
                    {WHATSAPP_CONFIG.number2.displayFormatted}
                  </p>
                  <span className="text-[10px] text-neutral-400 block truncate">
                    {WHATSAPP_CONFIG.number2.roleDescription}
                  </span>
                </div>
              </div>

              <div className="w-8 h-8 rounded-full bg-neutral-800 group-hover:bg-amber-400 group-hover:text-neutral-950 text-neutral-300 flex items-center justify-center shrink-0 transition-colors ml-2">
                <ExternalLink className="w-4 h-4" />
              </div>
            </button>
          </div>

          {/* Expandable Message Preview */}
          <div className="border border-neutral-200 rounded-xl overflow-hidden bg-neutral-50/70">
            <button
              type="button"
              onClick={() => setShowPreview(!showPreview)}
              className="w-full p-2.5 text-xs text-neutral-600 hover:text-neutral-900 flex items-center justify-between font-medium transition-colors"
            >
              <span className="flex items-center gap-1.5 text-[11px]">
                <MessageCircle className="w-3.5 h-3.5 text-amber-600" />
                <span>View message that will be populated</span>
              </span>
              {showPreview ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>

            {showPreview && (
              <div className="p-3 bg-white border-t border-neutral-200 text-xs space-y-2 animate-fadeIn">
                <div className="p-2.5 bg-neutral-100 rounded-lg font-mono text-[11px] text-neutral-800 whitespace-pre-wrap leading-relaxed border border-neutral-200">
                  {activeMessage}
                </div>
                <div className="flex items-center justify-between text-[10px] text-neutral-500 pt-1">
                  <span>Customer will press Send inside WhatsApp</span>
                  <button
                    type="button"
                    onClick={handleCopyMessage}
                    className="inline-flex items-center gap-1 text-amber-800 hover:text-amber-950 font-bold"
                  >
                    {copied ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                    <span>{copied ? 'Copied' : 'Copy Text'}</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Footer Assurance Badges */}
          <div className="pt-2 border-t border-neutral-100 flex items-center justify-between text-[11px] text-neutral-500">
            <span className="flex items-center gap-1 text-emerald-700 font-medium">
              <ShieldCheck className="w-3.5 h-3.5" />
              Official Verified Atelier
            </span>
            <span>Immediate Response</span>
          </div>
        </div>
      </div>
    </div>
  );
};
