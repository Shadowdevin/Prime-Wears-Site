import React, { useState, useRef, useEffect } from 'react';
import {
  WHATSAPP_CONFIG,
  WhatsAppIcon,
  openWhatsAppChat,
  DEFAULT_WHATSAPP_ENQUIRY_MESSAGE
} from '../../config/whatsapp';
import { X, MessageCircle, ExternalLink, ShieldCheck, ChevronRight } from 'lucide-react';

export const FloatingWhatsAppButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const popupRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Close on outside click
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        isOpen &&
        popupRef.current &&
        !popupRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen]);

  const handleSelectNumber = (contactId: 'number1' | 'number2') => {
    openWhatsAppChat(contactId, DEFAULT_WHATSAPP_ENQUIRY_MESSAGE);
    setIsOpen(false);
  };

  return (
    <aside aria-label="WhatsApp Concierge" className="fixed bottom-6 right-6 z-40 flex flex-col items-end">
      {/* Small Attractive Popup Menu */}
      {isOpen && (
        <div
          ref={popupRef}
          role="dialog"
          aria-modal="false"
          aria-label="WhatsApp Concierge Options"
          className="mb-3 w-80 max-w-[calc(100vw-2rem)] bg-white rounded-2xl shadow-2xl border border-neutral-200 overflow-hidden animate-fadeIn transform origin-bottom-right transition-all"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-neutral-950 via-neutral-900 to-neutral-950 text-white p-4 border-b border-amber-500/30 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center text-white shadow-sm ring-2 ring-emerald-500/30">
                <WhatsAppIcon className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 block">
                  Prime Wears Concierge
                </span>
                <h4 className="text-xs font-bold text-white">Chat on WhatsApp</h4>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              aria-label="Close popup"
              className="p-1 text-neutral-400 hover:text-white rounded-full hover:bg-neutral-800 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Prompt Message */}
          <div className="p-4 space-y-3 bg-neutral-50/70 border-b border-neutral-100">
            <p className="text-xs text-neutral-600 leading-relaxed">
              Hello! 👋 How may we assist you today? Select your preferred WhatsApp contact:
            </p>

            <div className="p-2.5 bg-white rounded-lg border border-neutral-200 text-[11px] font-mono text-neutral-700 leading-normal">
              &ldquo;{DEFAULT_WHATSAPP_ENQUIRY_MESSAGE}&rdquo;
            </div>
          </div>

          {/* The Two WhatsApp Number Options */}
          <div className="p-3 space-y-2.5 bg-white">
            {/* Option 1 */}
            <button
              type="button"
              onClick={() => handleSelectNumber('number1')}
              className="w-full p-3 bg-neutral-900 hover:bg-neutral-950 text-white rounded-xl border border-neutral-800 hover:border-amber-400/80 transition-all flex items-center justify-between text-left group shadow-xs"
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center text-white shrink-0 group-hover:scale-105 transition-transform">
                  <WhatsAppIcon className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-bold text-white group-hover:text-amber-300 transition-colors">
                      {WHATSAPP_CONFIG.number1.chatLabel}
                    </span>
                  </div>
                  <span className="text-[11px] font-mono text-neutral-300 block truncate">
                    {WHATSAPP_CONFIG.number1.displayFormatted}
                  </span>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-neutral-400 group-hover:text-amber-400 shrink-0 ml-1 transition-colors" />
            </button>

            {/* Option 2 */}
            <button
              type="button"
              onClick={() => handleSelectNumber('number2')}
              className="w-full p-3 bg-neutral-900 hover:bg-neutral-950 text-white rounded-xl border border-neutral-800 hover:border-amber-400/80 transition-all flex items-center justify-between text-left group shadow-xs"
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center text-white shrink-0 group-hover:scale-105 transition-transform">
                  <WhatsAppIcon className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-bold text-white group-hover:text-amber-300 transition-colors">
                      {WHATSAPP_CONFIG.number2.chatLabel}
                    </span>
                  </div>
                  <span className="text-[11px] font-mono text-neutral-300 block truncate">
                    {WHATSAPP_CONFIG.number2.displayFormatted}
                  </span>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-neutral-400 group-hover:text-amber-400 shrink-0 ml-1 transition-colors" />
            </button>
          </div>

          {/* Footer note */}
          <div className="px-4 py-2 bg-neutral-100 text-[10px] text-neutral-500 flex items-center justify-between">
            <span className="flex items-center gap-1 text-emerald-700 font-medium">
              <ShieldCheck className="w-3 h-3" />
              Direct Atelier Access
            </span>
            <span>Tap to open WhatsApp</span>
          </div>
        </div>
      )}

      {/* Floating Trigger Button */}
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Chat on WhatsApp with Prime Wears"
        className="group relative flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white shadow-2xl transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-emerald-400/40 ring-2 ring-amber-400/60"
      >
        {/* Subtle Pulse Ring */}
        <span className="absolute -inset-1 rounded-full bg-emerald-500/30 animate-ping pointer-events-none" />

        {/* Brand WhatsApp Icon */}
        <WhatsAppIcon className="w-8 h-8 sm:w-9 sm:h-9 relative z-10 transition-transform group-hover:rotate-6" />

        {/* Small Gold Notification Pill */}
        <span className="absolute -top-1 -right-1 flex h-4 w-4">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-4 w-4 bg-amber-500 text-[9px] font-bold text-neutral-950 items-center justify-center">
            2
          </span>
        </span>
      </button>
    </aside>
  );
};
