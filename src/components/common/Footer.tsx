import React, { useState } from 'react';
import { ASSETS } from '../../data/assets';
import { ArrowRight, CheckCircle2, Shield, Scissors, Sparkles, MapPin } from 'lucide-react';
import { WhatsAppIcon, WHATSAPP_CONFIG } from '../../config/whatsapp';

interface FooterProps {
  onNavigate: (route: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim() && email.includes('@')) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="bg-neutral-950 text-neutral-300 border-t border-neutral-900 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Brand Promise Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-12 border-b border-neutral-800">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-lg bg-neutral-900 border border-neutral-800 text-amber-400 shrink-0">
              <Scissors className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white uppercase tracking-wider">
                Bespoke Nigerian Tailoring
              </h4>
              <p className="text-xs text-neutral-400 mt-1 leading-relaxed">
                Precision measurements, master hand-cut fabrics, and heritage embroidery tailored to your exact physique.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="p-3 rounded-lg bg-neutral-900 border border-neutral-800 text-amber-400 shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white uppercase tracking-wider">
                Futuristic Casual Swag
              </h4>
              <p className="text-xs text-neutral-400 mt-1 leading-relaxed">
                Heavyweight 450 GSM French terry hoodies, fine-gauge zip knit polos, and tactical cargo joggers.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="p-3 rounded-lg bg-neutral-900 border border-neutral-800 text-amber-400 shrink-0">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white uppercase tracking-wider">
                Transparent Quoting System
              </h4>
              <p className="text-xs text-neutral-400 mt-1 leading-relaxed">
                Every custom tailoring order receives personal master-tailor review and confirmed quotation before billing.
              </p>
            </div>
          </div>
        </div>

        {/* Main Footer Links & Newsletter */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 py-12 border-b border-neutral-800">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-4">
              <img
                src={ASSETS.logoGold}
                alt="Prime Wears Logo"
                className="h-14 sm:h-16 w-auto object-contain filter drop-shadow-[0_2px_8px_rgba(212,175,55,0.25)]"
              />
              <div>
                <span className="text-2xl sm:text-3xl font-extrabold tracking-widest text-white font-serif-luxury block">
                  PRIME WEARS
                </span>
                <p className="text-xs text-neutral-400 tracking-wider font-medium mt-0.5">
                  The Dual-Experience Fashion House
                </p>
              </div>
            </div>
            <p className="text-xs text-neutral-400 leading-relaxed max-w-sm">
              Celebrating the dignified majesty of Nigerian traditional attire alongside cutting-edge contemporary street elegance. Wear your prime, wherever you stand.
            </p>
            <div className="pt-2 text-xs text-neutral-400 space-y-1.5">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>Uyo Flagship Atelier: 42 Brooks Avenue, Uyo, Akwa Ibom</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>Calabar Flagship Showroom: 18 Marian Road, Calabar, Cross River</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>Port-Harcourt Luxury Studio: 12 Olu Obasanjo Road, GRA Phase 2, Port-Harcourt</span>
              </div>
            </div>

            {/* Direct WhatsApp Concierge Links */}
            <div className="pt-2 flex flex-col sm:flex-row gap-3">
              <a
                href={WHATSAPP_CONFIG.number1.waMeBaseUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs text-neutral-300 hover:text-emerald-400 transition-colors"
              >
                <div className="w-5 h-5 rounded-full bg-emerald-600 flex items-center justify-center text-white shrink-0">
                  <WhatsAppIcon className="w-3 h-3" />
                </div>
                <span>WhatsApp 1: 0806 682 5239</span>
              </a>
              <a
                href={WHATSAPP_CONFIG.number2.waMeBaseUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs text-neutral-300 hover:text-emerald-400 transition-colors"
              >
                <div className="w-5 h-5 rounded-full bg-emerald-600 flex items-center justify-center text-white shrink-0">
                  <WhatsAppIcon className="w-3 h-3" />
                </div>
                <span>WhatsApp 2: 0905 247 3964</span>
              </a>
            </div>
          </div>

          {/* Native Wears Col */}
          <div>
            <h5 className="text-xs font-bold text-amber-400 uppercase tracking-widest mb-4">
              Native Wears
            </h5>
            <ul className="space-y-2 text-xs text-neutral-400">
              <li>
                <button
                  onClick={() => onNavigate('native')}
                  className="hover:text-white transition-colors"
                >
                  Senator Two-Piece Sets
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('native')}
                  className="hover:text-white transition-colors"
                >
                  Royal Grand Agbadas
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('native')}
                  className="hover:text-white transition-colors"
                >
                  Diamond Embroidered Kaftans
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('native')}
                  className="hover:text-white transition-colors"
                >
                  Corporate Handcrafted Shoes
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('bespoke')}
                  className="text-amber-400 hover:text-amber-300 font-semibold transition-colors"
                >
                  Book Bespoke Tailoring &rarr;
                </button>
              </li>
            </ul>
          </div>

          {/* Casual Swag Col */}
          <div>
            <h5 className="text-xs font-bold text-neutral-200 uppercase tracking-widest mb-4">
              Casual Swag
            </h5>
            <ul className="space-y-2 text-xs text-neutral-400">
              <li>
                <button
                  onClick={() => onNavigate('casual')}
                  className="hover:text-white transition-colors"
                >
                  Zip Knit Polos
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('casual')}
                  className="hover:text-white transition-colors"
                >
                  "Wear Your Prime" Hoodies
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('casual')}
                  className="hover:text-white transition-colors"
                >
                  Tactical Cargo Joggers
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('casual')}
                  className="hover:text-white transition-colors"
                >
                  Leather Patch Caps
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('showroom')}
                  className="text-neutral-200 hover:text-white font-semibold transition-colors"
                >
                  Interactive 3D Showroom &rarr;
                </button>
              </li>
            </ul>
          </div>

          {/* Newsletter / Admin Access */}
          <div>
            <h5 className="text-xs font-bold text-neutral-200 uppercase tracking-widest mb-4">
              Private Client Club
            </h5>
            <p className="text-xs text-neutral-400 mb-3">
              Receive private invitations to seasonal drops, fabric trunk shows, and get 10% off your first bespoke order.
            </p>
            {subscribed ? (
              <div className="p-3 bg-neutral-900 border border-amber-500/30 rounded-lg text-xs text-amber-400 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>Welcome. Use code <strong>PRIME10</strong> for 10% off.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    required
                    className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-3 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400"
                  />
                  <button
                    type="submit"
                    aria-label="Submit newsletter"
                    className="absolute right-1 top-1 bottom-1 px-3 bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold rounded text-xs flex items-center justify-center transition-colors"
                  >
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </form>
            )}

            <div className="mt-6 pt-4 border-t border-neutral-900 space-y-2">
              <button
                onClick={() => onNavigate('track')}
                className="text-[11px] text-amber-400 hover:text-amber-300 font-semibold transition-colors flex items-center gap-1.5"
              >
                <span>📦 Track Your Bespoke or Contemporary Order &rarr;</span>
              </button>
              <button
                onClick={() => onNavigate('admin')}
                className="text-[11px] text-neutral-500 hover:text-amber-400 transition-colors flex items-center gap-1.5"
              >
                <Shield className="w-3.5 h-3.5" />
                <span>Tailor & Admin Order Management Portal</span>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Credits & Legal */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-neutral-500 gap-4">
          <p>© {new Date().getFullYear()} PRIME WEARS ATELIER & CO. All Rights Reserved.</p>
          <div className="flex items-center gap-6">
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
            <span>Bespoke Measurement Guarantee</span>
            <span>Delivery Across 36 States & FCT</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
