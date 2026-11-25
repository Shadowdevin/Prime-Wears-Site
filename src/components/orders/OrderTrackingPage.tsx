import React, { useState, useEffect } from 'react';
import { useOrders } from '../../context/OrderContext';
import { CustomOrder, ContemporaryOrder, QuoteStatus, ShippingStatus } from '../../types';
import {
  Search,
  Package,
  Scissors,
  Sparkles,
  Truck,
  CheckCircle2,
  Clock,
  MapPin,
  Phone,
  Mail,
  Copy,
  Check,
  Calendar,
  AlertCircle,
  ArrowRight,
  ShieldCheck,
  Printer,
  MessageCircle,
  HelpCircle,
  Ruler,
  Layers,
  Crown,
  Briefcase,
  ChevronRight,
  RefreshCw,
  ExternalLink
} from 'lucide-react';
import { ASSETS } from '../../data/assets';

interface OrderTrackingPageProps {
  initialOrderRef?: string;
  onNavigate?: (route: string) => void;
  onOpenCustomOrder?: () => void;
}

export const OrderTrackingPage: React.FC<OrderTrackingPageProps> = ({
  initialOrderRef,
  onNavigate,
  onOpenCustomOrder,
}) => {
  const { lookupOrder, customOrders, contemporaryOrders } = useOrders();

  const [searchInput, setSearchInput] = useState<string>(initialOrderRef || '');
  const [activeReference, setActiveReference] = useState<string>(initialOrderRef || '');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [copiedTracking, setCopiedTracking] = useState(false);
  const [errorNotFound, setErrorNotFound] = useState<string | null>(null);

  // Sync with prop when passed
  useEffect(() => {
    if (initialOrderRef) {
      setSearchInput(initialOrderRef);
      setActiveReference(initialOrderRef);
      setErrorNotFound(null);
    }
  }, [initialOrderRef]);

  // Demo order quick lookup buttons
  const sampleOrders = [
    {
      id: 'PW-ORD-2026-N8921',
      title: 'Burgundy Rosette Senator',
      type: 'Bespoke Native',
      status: 'Quote Sent'
    },
    {
      id: 'PW-ORD-2026-N8922',
      title: 'Grand Imperial Agbada',
      type: 'Bespoke Native',
      status: 'In Review'
    },
    {
      id: 'PW-SUIT-2026-4402',
      title: 'Savile Row Double-Breasted Suit',
      type: 'Bespoke Suit',
      status: 'Ready for Fitting'
    },
    {
      id: 'PW-HH-2026-1920',
      title: 'His Highness Regalia Package',
      type: 'Royal Regalia',
      status: 'In Master Production'
    },
    {
      id: 'PW-RTW-2026-8814',
      title: 'Contemporary Hoodie & Polo',
      type: 'Urban Swag',
      status: 'In Transit (DHL)'
    },
    {
      id: 'PW-ORD-2026-S7734',
      title: 'Double Monkstrap Shoe',
      type: 'Handcrafted Footwear',
      status: 'Lasting Bench'
    }
  ];

  const handleSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const clean = searchInput.trim().toUpperCase();
    if (!clean) return;

    const result = lookupOrder(clean);
    if (result) {
      setActiveReference(clean);
      setErrorNotFound(null);
    } else {
      setErrorNotFound(clean);
    }
  };

  const selectSample = (refId: string) => {
    setSearchInput(refId);
    setActiveReference(refId);
    setErrorNotFound(null);
  };

  const copyToClipboard = (text: string, type: 'id' | 'tracking') => {
    navigator.clipboard.writeText(text);
    if (type === 'id') {
      setCopiedId(text);
      setTimeout(() => setCopiedId(null), 2000);
    } else {
      setCopiedTracking(true);
      setTimeout(() => setCopiedTracking(false), 2000);
    }
  };

  const lookupResult = activeReference ? lookupOrder(activeReference) : null;
  const bespoke = lookupResult?.type === 'bespoke' ? lookupResult.bespokeOrder : null;
  const contemporary = lookupResult?.type === 'contemporary' ? lookupResult.contemporaryOrder : null;

  const getQuoteStatusLabel = (status: QuoteStatus) => {
    switch (status) {
      case 'under_review':
        return { label: 'Under Atelier Review', bg: 'bg-amber-100 text-amber-900 border-amber-300' };
      case 'quotation_sent':
        return { label: 'Quotation Ready & Sent', bg: 'bg-blue-100 text-blue-900 border-blue-300' };
      case 'approved':
        return { label: 'Approved & Sourced', bg: 'bg-purple-100 text-purple-900 border-purple-300' };
      case 'in_production':
        return { label: 'In Master Production', bg: 'bg-amber-500 text-neutral-950 border-amber-400 font-bold' };
      case 'ready_for_fitting':
        return { label: 'Ready for Flagship Fitting', bg: 'bg-emerald-100 text-emerald-900 border-emerald-300 font-bold' };
      case 'completed':
        return { label: 'Completed & Delivered', bg: 'bg-emerald-600 text-white border-emerald-700' };
      default:
        return { label: status, bg: 'bg-neutral-100 text-neutral-800 border-neutral-300' };
    }
  };

  const getShippingStatusLabel = (status: ShippingStatus) => {
    switch (status) {
      case 'order_confirmed':
        return { label: 'Order Confirmed', bg: 'bg-blue-100 text-blue-900 border-blue-300' };
      case 'processing':
        return { label: 'Quality Verification & Packing', bg: 'bg-amber-100 text-amber-900 border-amber-300' };
      case 'dispatched':
        return { label: 'Dispatched from Flagship', bg: 'bg-purple-100 text-purple-900 border-purple-300' };
      case 'in_transit':
        return { label: 'In Transit with Courier', bg: 'bg-amber-500 text-neutral-950 border-amber-400 font-bold' };
      case 'delivered':
        return { label: 'Delivered', bg: 'bg-emerald-600 text-white border-emerald-700 font-bold' };
      default:
        return { label: status, bg: 'bg-neutral-100 text-neutral-800 border-neutral-300' };
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="bg-neutral-50 min-h-screen text-neutral-900 pb-20">
      {/* 1. Hero Banner */}
      <section className="bg-gradient-to-b from-neutral-950 via-neutral-900 to-neutral-950 text-white py-14 px-4 sm:px-6 lg:px-8 border-b border-amber-500/20 relative overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-80 h-80 bg-amber-600/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-5xl mx-auto text-center relative z-10 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-800/90 border border-amber-500/30 text-amber-400 text-xs font-semibold uppercase tracking-widest">
            <Package className="w-3.5 h-3.5" />
            <span>Prime Wears Concierge Tracking Portal</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight font-serif-luxury text-white">
            Track Your Custom Commission
          </h1>

          <p className="text-sm sm:text-base text-neutral-400 max-w-2xl mx-auto leading-relaxed">
            Monitor the master tailoring progression, bespoke fabric sourcing, and white-glove courier dispatch of your Nigerian heritage regalia or contemporary pieces.
          </p>

          {/* Search Form */}
          <div className="max-w-2xl mx-auto pt-4">
            <form onSubmit={handleSearch} className="relative flex flex-col sm:flex-row gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
                <input
                  type="text"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  placeholder="Enter order reference (e.g. PW-ORD-2026-N8921)"
                  className="w-full bg-neutral-900 border border-neutral-700/80 rounded-lg pl-12 pr-4 py-3.5 text-sm sm:text-base text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 font-mono transition-all shadow-inner"
                />
              </div>
              <button
                type="submit"
                className="px-6 py-3.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-neutral-950 font-bold text-sm uppercase tracking-wider rounded-lg shadow-lg hover:shadow-amber-500/20 transition-all flex items-center justify-center gap-2 shrink-0"
              >
                <span>Track Order</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            {/* Quick Demo Reference Pills */}
            <div className="mt-4 text-left">
              <span className="text-[11px] uppercase tracking-wider text-neutral-400 font-semibold block mb-2">
                Click a sample order to test the tracker:
              </span>
              <div className="flex flex-wrap gap-2">
                {sampleOrders.map((item) => {
                  const isSelected = activeReference.toUpperCase() === item.id.toUpperCase();
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => selectSample(item.id)}
                      className={`text-xs px-2.5 py-1.5 rounded-md border font-mono flex items-center gap-1.5 transition-all ${
                        isSelected
                          ? 'bg-amber-400 text-neutral-950 border-amber-300 font-bold shadow'
                          : 'bg-neutral-900/90 text-neutral-300 hover:text-white hover:bg-neutral-800 border-neutral-700/70'
                      }`}
                    >
                      <span className="font-bold">{item.id}</span>
                      <span className="text-[10px] text-neutral-400 font-sans">({item.title})</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Main Tracking Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6">
        {/* Error notification if reference not found */}
        {errorNotFound && (
          <div className="bg-red-50 border border-red-200 text-red-800 p-4 rounded-xl shadow-lg mb-6 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
            <div className="flex-1 text-xs">
              <strong className="font-bold block text-sm text-red-900 mb-0.5">
                Order Reference Not Found: &ldquo;{errorNotFound}&rdquo;
              </strong>
              <p className="leading-relaxed">
                Please double-check the reference number on your booking SMS, WhatsApp quote, or receipt email. References generally follow the pattern <code>PW-ORD-2026-XXXX</code>, <code>PW-SUIT-2026-XXXX</code>, <code>PW-HH-2026-XXXX</code>, or <code>PW-RTW-2026-XXXX</code>.
              </p>
              <div className="mt-2.5 flex items-center gap-3">
                <button
                  onClick={() => selectSample('PW-ORD-2026-N8921')}
                  className="font-semibold text-red-900 underline hover:text-black"
                >
                  Load Sample Order &rarr;
                </button>
                <a
                  href="https://wa.me/2348034567890?text=Hello%20Prime%20Wears,%20I'm%20trying%20to%20find%20my%20order%20reference."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-red-900 underline hover:text-black inline-flex items-center gap-1"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>Contact Atelier Desk</span>
                </a>
              </div>
            </div>
          </div>
        )}

        {/* Loaded Order View */}
        {lookupResult && (bespoke || contemporary) ? (
          <div className="space-y-6">
            {/* Top Banner Card: ID + Status + Quick Copy */}
            <div className="bg-white rounded-xl shadow-md border border-neutral-200 p-5 sm:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-1.5">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xs uppercase tracking-widest font-bold text-neutral-500">
                    {lookupResult.type === 'bespoke' ? 'Bespoke Haute Couture Commission' : 'Contemporary Ready-To-Wear Order'}
                  </span>
                  <span className="text-neutral-300">·</span>
                  <span className="text-xs text-neutral-500">
                    Placed on {new Date((bespoke || contemporary)!.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <h2 className="text-2xl sm:text-3xl font-extrabold font-mono text-neutral-900 tracking-wider">
                    {(bespoke || contemporary)!.id}
                  </h2>
                  <button
                    onClick={() => copyToClipboard((bespoke || contemporary)!.id, 'id')}
                    className="p-1.5 rounded-lg border border-neutral-300 text-neutral-600 hover:text-neutral-950 hover:bg-neutral-100 transition-colors"
                    title="Copy Order Reference"
                  >
                    {copiedId === (bespoke || contemporary)!.id ? (
                      <Check className="w-4 h-4 text-emerald-600" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>

                <p className="text-xs text-neutral-600">
                  Client: <strong className="text-neutral-900">{(bespoke || contemporary)!.customerName}</strong> · Destination: <strong className="text-neutral-900">{(bespoke || contemporary)!.deliveryCity}, {(bespoke || contemporary)!.deliveryState}</strong>
                </p>
              </div>

              {/* Status Pill & Target Date */}
              <div className="flex flex-col sm:flex-row md:flex-col items-start md:items-end gap-2 shrink-0">
                {bespoke && (
                  <span className={`px-3.5 py-1.5 rounded-full text-xs font-semibold border flex items-center gap-1.5 shadow-sm ${getQuoteStatusLabel(bespoke.quoteStatus).bg}`}>
                    <span className="w-2 h-2 rounded-full bg-current animate-pulse" />
                    <span>{getQuoteStatusLabel(bespoke.quoteStatus).label}</span>
                  </span>
                )}
                {contemporary && (
                  <span className={`px-3.5 py-1.5 rounded-full text-xs font-semibold border flex items-center gap-1.5 shadow-sm ${getShippingStatusLabel(contemporary.shippingStatus).bg}`}>
                    <span className="w-2 h-2 rounded-full bg-current animate-pulse" />
                    <span>{getShippingStatusLabel(contemporary.shippingStatus).label}</span>
                  </span>
                )}

                <div className="text-xs text-neutral-500 flex items-center gap-1 mt-1">
                  <Clock className="w-3.5 h-3.5 text-amber-600" />
                  <span>
                    Target Completion: <strong className="text-neutral-900">{bespoke?.requestedCompletionDate || contemporary?.estimatedDeliveryDate || 'Scheduled with atelier'}</strong>
                  </span>
                </div>
              </div>
            </div>

            {/* Main Details Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* LEFT / CENTER: Milestones Pipeline + Outfit Details (2 Columns) */}
              <div className="lg:col-span-2 space-y-6">
                {/* 1. Interactive Milestones Pipeline */}
                <div className="bg-white rounded-xl shadow-md border border-neutral-200 p-6">
                  <div className="flex items-center justify-between pb-4 border-b border-neutral-200 mb-6">
                    <div>
                      <h3 className="text-base font-bold text-neutral-900 uppercase tracking-wider font-serif-luxury flex items-center gap-2">
                        <Scissors className="w-4 h-4 text-amber-600" />
                        <span>Tailoring & Logistics Timeline</span>
                      </h3>
                      <p className="text-xs text-neutral-500 mt-0.5">
                        Real-time status updates from our Uyo, Calabar, and Port-Harcourt flagships
                      </p>
                    </div>

                    <button
                      onClick={() => handleSearch()}
                      className="p-1.5 text-neutral-500 hover:text-neutral-900 rounded border border-neutral-200 hover:bg-neutral-50 text-xs flex items-center gap-1 transition-colors"
                      title="Refresh status"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">Refresh</span>
                    </button>
                  </div>

                  {/* Stepper Pipeline */}
                  <div className="relative pl-6 sm:pl-8 space-y-6 sm:space-y-8 before:absolute before:left-3 sm:before:left-4 before:top-2 before:bottom-2 before:w-0.5 before:bg-neutral-200">
                    {(bespoke?.timeline || contemporary?.timeline || []).map((step, idx) => {
                      const isCompleted = step.completed;
                      const isCurrent = step.current;

                      return (
                        <div key={idx} className="relative flex items-start gap-4">
                          {/* Dot / Check Icon on track */}
                          <div
                            className={`absolute -left-6 sm:-left-8 top-0.5 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-all shadow-md ${
                              isCompleted
                                ? isCurrent
                                  ? 'bg-amber-500 text-neutral-950 ring-4 ring-amber-200'
                                  : 'bg-emerald-600 text-white'
                                : 'bg-neutral-200 text-neutral-500 border border-neutral-300'
                            }`}
                          >
                            {isCompleted ? (
                              isCurrent ? (
                                <span className="w-2.5 h-2.5 rounded-full bg-neutral-950 animate-ping" />
                              ) : (
                                <Check className="w-3.5 h-3.5" />
                              )
                            ) : (
                              <span>{idx + 1}</span>
                            )}
                          </div>

                          {/* Content */}
                          <div className="flex-1 bg-neutral-50 p-4 rounded-lg border border-neutral-200/80 hover:border-amber-400/50 transition-colors">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1">
                              <h4
                                className={`text-sm font-bold ${
                                  isCurrent
                                    ? 'text-amber-800 font-extrabold'
                                    : isCompleted
                                    ? 'text-neutral-900'
                                    : 'text-neutral-500'
                                }`}
                              >
                                {step.title}
                              </h4>
                              <span className="text-[11px] font-mono text-neutral-500">
                                {step.timestamp}
                              </span>
                            </div>

                            <p className="text-xs text-neutral-600 leading-relaxed">
                              {step.description}
                            </p>

                            {step.location && (
                              <div className="mt-2 text-[11px] text-neutral-500 flex items-center gap-1.5 pt-2 border-t border-neutral-200/60">
                                <MapPin className="w-3 h-3 text-amber-600 shrink-0" />
                                <span>Facility: <strong>{step.location}</strong></span>
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* 2. Order Specifications Dossier */}
                <div className="bg-white rounded-xl shadow-md border border-neutral-200 p-6 space-y-5">
                  <div className="pb-3 border-b border-neutral-200">
                    <h3 className="text-base font-bold text-neutral-900 uppercase tracking-wider font-serif-luxury flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-amber-600" />
                      <span>{bespoke ? 'Garment & Fabric Specifications' : 'Contemporary Items Dossier'}</span>
                    </h3>
                  </div>

                  {/* Bespoke Garment Item */}
                  {bespoke && (
                    <div className="space-y-5">
                      <div className="flex flex-col sm:flex-row gap-5 items-start">
                        {bespoke.referenceImage && (
                          <div className="relative group shrink-0 w-32 sm:w-40 aspect-[3/4] bg-neutral-900 rounded-lg overflow-hidden border border-neutral-200 shadow-md">
                            <img
                              src={bespoke.referenceImage}
                              alt={bespoke.selectedDesignName || 'Garment Design'}
                              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
                            <div className="absolute bottom-2 left-2 right-2 bg-black/70 backdrop-blur-sm text-[10px] text-white px-2 py-0.5 rounded text-center font-medium">
                              Design Ref
                            </div>
                          </div>
                        )}

                        <div className="flex-1 space-y-3 text-xs">
                          <div>
                            <span className="text-[10px] uppercase font-bold tracking-widest text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                              {bespoke.garmentCategory.toUpperCase().replace('-', ' ')} COMMISSION
                            </span>
                            <h4 className="text-lg font-bold text-neutral-900 mt-1 font-serif-luxury">
                              {bespoke.selectedDesignName || 'Custom Bespoke Nigerian Ensemble'}
                            </h4>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-neutral-700">
                            <div>Fabric: <strong className="text-neutral-900">{bespoke.fabricPreference || 'Master Sourced'}</strong></div>
                            <div>Colour / Embroidery: <strong className="text-neutral-900">{bespoke.colorPreference}</strong></div>
                            <div>Quantity: <strong className="text-neutral-900">{bespoke.quantity} Outfit(s)</strong></div>
                            <div>Target Delivery: <strong className="text-neutral-900">{bespoke.requestedCompletionDate}</strong></div>
                          </div>

                          {bespoke.modificationsDescription && (
                            <div className="p-3 bg-neutral-50 rounded-lg border border-neutral-200">
                              <span className="font-semibold text-neutral-900 block mb-1">
                                Client Tailoring Modifications:
                              </span>
                              <p className="text-neutral-700 italic">
                                &ldquo;{bespoke.modificationsDescription}&rdquo;
                              </p>
                            </div>
                          )}

                          {bespoke.adminNotes && (
                            <div className="p-3 bg-amber-50/70 rounded-lg border border-amber-200 text-amber-900">
                              <span className="font-semibold block mb-0.5 flex items-center gap-1.5">
                                <ShieldCheck className="w-3.5 h-3.5 text-amber-700" />
                                Master Tailor Atelier Note:
                              </span>
                              <p className="text-amber-800">
                                {bespoke.adminNotes}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Tailoring Measurements Snapshot */}
                      {bespoke.measurements && (
                        <div className="pt-4 border-t border-neutral-200">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-xs font-bold text-neutral-900 uppercase tracking-wider flex items-center gap-1.5">
                              <Ruler className="w-3.5 h-3.5 text-amber-600" />
                              <span>Tailoring Measurements ({bespoke.measurements.unit})</span>
                            </span>
                          </div>

                          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2 text-xs">
                            {bespoke.measurements.shoulder !== undefined && (
                              <div className="p-2 bg-neutral-50 rounded border border-neutral-200">
                                <span className="text-[10px] text-neutral-500 uppercase block">Shoulder</span>
                                <strong className="text-neutral-900 font-mono">{bespoke.measurements.shoulder} {bespoke.measurements.unit}</strong>
                              </div>
                            )}
                            {bespoke.measurements.chest !== undefined && (
                              <div className="p-2 bg-neutral-50 rounded border border-neutral-200">
                                <span className="text-[10px] text-neutral-500 uppercase block">Chest</span>
                                <strong className="text-neutral-900 font-mono">{bespoke.measurements.chest} {bespoke.measurements.unit}</strong>
                              </div>
                            )}
                            {bespoke.measurements.neck !== undefined && (
                              <div className="p-2 bg-neutral-50 rounded border border-neutral-200">
                                <span className="text-[10px] text-neutral-500 uppercase block">Neck</span>
                                <strong className="text-neutral-900 font-mono">{bespoke.measurements.neck} {bespoke.measurements.unit}</strong>
                              </div>
                            )}
                            {bespoke.measurements.sleeveLength !== undefined && (
                              <div className="p-2 bg-neutral-50 rounded border border-neutral-200">
                                <span className="text-[10px] text-neutral-500 uppercase block">Sleeve</span>
                                <strong className="text-neutral-900 font-mono">{bespoke.measurements.sleeveLength} {bespoke.measurements.unit}</strong>
                              </div>
                            )}
                            {bespoke.measurements.garmentLength !== undefined && (
                              <div className="p-2 bg-neutral-50 rounded border border-neutral-200">
                                <span className="text-[10px] text-neutral-500 uppercase block">Top Length</span>
                                <strong className="text-neutral-900 font-mono">{bespoke.measurements.garmentLength} {bespoke.measurements.unit}</strong>
                              </div>
                            )}
                            {bespoke.measurements.waist !== undefined && (
                              <div className="p-2 bg-neutral-50 rounded border border-neutral-200">
                                <span className="text-[10px] text-neutral-500 uppercase block">Waist</span>
                                <strong className="text-neutral-900 font-mono">{bespoke.measurements.waist} {bespoke.measurements.unit}</strong>
                              </div>
                            )}
                            {bespoke.measurements.trouserLength !== undefined && (
                              <div className="p-2 bg-neutral-50 rounded border border-neutral-200">
                                <span className="text-[10px] text-neutral-500 uppercase block">Trouser</span>
                                <strong className="text-neutral-900 font-mono">{bespoke.measurements.trouserLength} {bespoke.measurements.unit}</strong>
                              </div>
                            )}
                            {bespoke.measurements.thigh !== undefined && (
                              <div className="p-2 bg-neutral-50 rounded border border-neutral-200">
                                <span className="text-[10px] text-neutral-500 uppercase block">Thigh</span>
                                <strong className="text-neutral-900 font-mono">{bespoke.measurements.thigh} {bespoke.measurements.unit}</strong>
                              </div>
                            )}
                            {bespoke.measurements.agbadaSpan !== undefined && (
                              <div className="p-2 bg-amber-50 rounded border border-amber-300">
                                <span className="text-[10px] text-amber-800 uppercase block font-semibold">Wingspan</span>
                                <strong className="text-amber-950 font-mono">{bespoke.measurements.agbadaSpan} {bespoke.measurements.unit}</strong>
                              </div>
                            )}
                          </div>
                        </div>
                      )}

                      {/* Shoe Specs Snapshot */}
                      {bespoke.shoeSpecs && (
                        <div className="pt-4 border-t border-neutral-200">
                          <span className="text-xs font-bold text-neutral-900 uppercase tracking-wider block mb-2">
                            Cordwainer Shoe Specifications
                          </span>
                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                            <div className="p-2 bg-neutral-50 rounded border border-neutral-200">
                              <span className="text-[10px] text-neutral-500 uppercase block">Size</span>
                              <strong className="text-neutral-900">EU {bespoke.shoeSpecs.shoeSizeEU}</strong>
                            </div>
                            <div className="p-2 bg-neutral-50 rounded border border-neutral-200">
                              <span className="text-[10px] text-neutral-500 uppercase block">Width</span>
                              <strong className="text-neutral-900 capitalize">{bespoke.shoeSpecs.footWidth || 'Standard'}</strong>
                            </div>
                            {bespoke.shoeSpecs.monogramInitials && (
                              <div className="p-2 bg-amber-50 rounded border border-amber-200">
                                <span className="text-[10px] text-amber-800 uppercase block font-semibold">Hot Foil Monogram</span>
                                <strong className="text-amber-950 font-mono">{bespoke.shoeSpecs.monogramInitials}</strong>
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Contemporary Order Items */}
                  {contemporary && (
                    <div className="space-y-4">
                      <div className="divide-y divide-neutral-200">
                        {contemporary.items.map((item, idx) => (
                          <div key={idx} className="py-3 first:pt-0 last:pb-0 flex items-center gap-4">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-16 h-20 object-cover rounded-lg bg-neutral-100 border border-neutral-200 shrink-0"
                            />
                            <div className="flex-1 text-xs">
                              <h4 className="font-bold text-neutral-900 text-sm">
                                {item.name}
                              </h4>
                              <div className="text-neutral-500 mt-0.5 space-x-2">
                                <span>Color: <strong className="text-neutral-700">{item.color}</strong></span>
                                <span>·</span>
                                <span>Size: <strong className="text-neutral-700">{item.size}</strong></span>
                                <span>·</span>
                                <span>Qty: <strong className="text-neutral-700">{item.quantity}</strong></span>
                              </div>
                              <div className="mt-1 font-semibold text-amber-800">
                                Price Coming Soon
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="pt-3 border-t border-neutral-200 flex justify-between items-center text-xs text-neutral-600">
                        <span>Payment Method: <strong className="uppercase text-neutral-900">{contemporary.paymentMethod}</strong></span>
                        <span>Total Items: <strong className="text-neutral-900">{contemporary.items.reduce((acc, i) => acc + i.quantity, 0)}</strong></span>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* RIGHT COLUMN: Logistics & Dispatch + Flagship Atelier + Concierge Support (1 Column) */}
              <div className="space-y-6">
                {/* 1. Logistics Card */}
                <div className="bg-white rounded-xl shadow-md border border-neutral-200 p-6 space-y-4">
                  <h3 className="text-sm font-bold text-neutral-900 uppercase tracking-wider font-serif-luxury flex items-center gap-2 pb-3 border-b border-neutral-200">
                    <Truck className="w-4 h-4 text-amber-600" />
                    <span>Logistics & Fulfillment</span>
                  </h3>

                  <div className="space-y-3 text-xs">
                    <div>
                      <span className="text-[11px] text-neutral-500 block">Fulfillment Hub:</span>
                      <strong className="text-neutral-900 text-sm block">
                        {(bespoke || contemporary)!.fulfillmentHub || 'Uyo Master Atelier Flagship'}
                      </strong>
                    </div>

                    <div>
                      <span className="text-[11px] text-neutral-500 block">Assigned Carrier:</span>
                      <strong className="text-neutral-900 block">
                        {(bespoke || contemporary)!.carrier || 'Prime Wears White-Glove Fleet'}
                      </strong>
                    </div>

                    {(bespoke || contemporary)!.trackingNumber && (
                      <div className="p-3 bg-neutral-50 rounded-lg border border-neutral-200">
                        <span className="text-[10px] text-neutral-500 uppercase tracking-wider font-semibold block mb-1">
                          Tracking Waybill Number:
                        </span>
                        <div className="flex items-center justify-between font-mono font-bold text-neutral-900">
                          <span>{(bespoke || contemporary)!.trackingNumber}</span>
                          <button
                            onClick={() => copyToClipboard((bespoke || contemporary)!.trackingNumber!, 'tracking')}
                            className="p-1 rounded text-neutral-600 hover:text-black hover:bg-neutral-200"
                            title="Copy Waybill"
                          >
                            {copiedTracking ? (
                              <Check className="w-3.5 h-3.5 text-emerald-600" />
                            ) : (
                              <Copy className="w-3.5 h-3.5" />
                            )}
                          </button>
                        </div>
                      </div>
                    )}

                    <div className="pt-2 border-t border-neutral-200">
                      <span className="text-[11px] text-neutral-500 block">Delivery Address:</span>
                      <strong className="text-neutral-900 block mt-0.5">
                        {(bespoke || contemporary)!.deliveryAddress}
                      </strong>
                      <span className="text-neutral-600 block">
                        {(bespoke || contemporary)!.deliveryCity}, {(bespoke || contemporary)!.deliveryState}
                      </span>
                    </div>

                    <div className="pt-2 border-t border-neutral-200 space-y-1 text-neutral-600">
                      <div className="flex items-center gap-1.5">
                        <Phone className="w-3 h-3 text-neutral-400" />
                        <span>{(bespoke || contemporary)!.phone}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Mail className="w-3 h-3 text-neutral-400" />
                        <span>{(bespoke || contemporary)!.email}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 2. Concierge Actions & Flagship Booking */}
                <div className="bg-gradient-to-br from-neutral-900 to-neutral-950 text-white rounded-xl shadow-lg border border-amber-500/30 p-6 space-y-4">
                  <div className="flex items-center gap-2 text-amber-400">
                    <ShieldCheck className="w-5 h-5" />
                    <h3 className="text-sm font-bold uppercase tracking-wider font-serif-luxury text-white">
                      Prime Wears Concierge
                    </h3>
                  </div>

                  <p className="text-xs text-neutral-300 leading-relaxed">
                    Have questions about fabric draping, or need to reschedule a personal fitting in Uyo, Calabar, or Port-Harcourt?
                  </p>

                  <div className="space-y-2 pt-1">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                      <a
                        href={`https://wa.me/2348066825239?text=${encodeURIComponent(`Hello Prime Wears! 👋 I'm tracking order ${(bespoke || contemporary)!.id}. Please provide an update.`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="py-2.5 px-3 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-lg flex items-center justify-center gap-1.5 transition-colors shadow text-center"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                        <span>WhatsApp 1 (08066825239)</span>
                      </a>
                      <a
                        href={`https://wa.me/2349052473964?text=${encodeURIComponent(`Hello Prime Wears! 👋 I'm tracking order ${(bespoke || contemporary)!.id}. Please provide an update.`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="py-2.5 px-3 bg-neutral-900 hover:bg-neutral-950 text-white text-xs font-bold rounded-lg flex items-center justify-center gap-1.5 transition-colors shadow border border-neutral-700 text-center"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                        <span>WhatsApp 2 (09052473964)</span>
                      </a>
                    </div>

                    <button
                      onClick={handlePrint}
                      className="w-full py-2.5 px-4 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 hover:text-white text-xs font-semibold rounded-lg flex items-center justify-center gap-2 transition-colors border border-neutral-700"
                    >
                      <Printer className="w-4 h-4 text-amber-400" />
                      <span>Print Order Dossier Slip</span>
                    </button>

                    <button
                      onClick={() => {
                        setActiveReference('');
                        setSearchInput('');
                        setErrorNotFound(null);
                      }}
                      className="w-full py-2 px-4 text-neutral-400 hover:text-white text-xs font-medium text-center transition-colors pt-1"
                    >
                      &larr; Track Another Order
                    </button>
                  </div>
                </div>

                {/* 3. Flagship Atelier Addresses */}
                <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-5 space-y-3 text-xs text-neutral-600">
                  <span className="font-bold text-neutral-900 uppercase tracking-wider block text-[11px]">
                    Atelier & Fitting Flagships:
                  </span>
                  <div className="space-y-2">
                    <div>
                      <strong className="text-neutral-900 block">Uyo Flagship Atelier:</strong>
                      <span>42 Brooks Avenue, Uyo, Akwa Ibom</span>
                    </div>
                    <div>
                      <strong className="text-neutral-900 block">Calabar Luxury Showroom:</strong>
                      <span>18 Marian Road, Calabar, Cross River</span>
                    </div>
                    <div>
                      <strong className="text-neutral-900 block">Port-Harcourt Private Studio:</strong>
                      <span>12 Olu Obasanjo Road, GRA Phase 2, Port-Harcourt</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : !errorNotFound ? (
          /* 3. Empty State Guide (When no order reference is actively selected) */
          <div className="bg-white rounded-2xl shadow-xl border border-neutral-200 p-8 sm:p-12 text-center max-w-4xl mx-auto space-y-8">
            <div className="w-20 h-20 rounded-full bg-amber-50 text-amber-600 border border-amber-200 flex items-center justify-center mx-auto shadow-inner">
              <Package className="w-10 h-10" />
            </div>

            <div className="space-y-2 max-w-lg mx-auto">
              <h2 className="text-2xl sm:text-3xl font-bold font-serif-luxury text-neutral-900">
                Awaiting Order Reference
              </h2>
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                Enter your reference number in the search bar above, or click any sample reference below to explore how the Prime Wears master tailoring pipeline operates.
              </p>
            </div>

            {/* Quick Demo Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-left">
              {sampleOrders.map((sample) => (
                <div
                  key={sample.id}
                  onClick={() => selectSample(sample.id)}
                  className="p-4 rounded-xl border border-neutral-200 hover:border-amber-500 bg-neutral-50/50 hover:bg-amber-50/20 transition-all cursor-pointer group shadow-sm hover:shadow-md"
                >
                  <div className="flex items-center justify-between text-[11px] mb-1">
                    <span className="font-mono font-bold text-neutral-900 group-hover:text-amber-700">
                      {sample.id}
                    </span>
                    <span className="px-2 py-0.5 rounded bg-neutral-200/80 text-neutral-700 text-[10px] font-semibold">
                      {sample.type}
                    </span>
                  </div>
                  <h4 className="text-xs font-bold text-neutral-900 mt-1 line-clamp-1">
                    {sample.title}
                  </h4>
                  <div className="mt-2 text-[11px] text-amber-800 font-medium flex items-center justify-between">
                    <span>Status: {sample.status}</span>
                    <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              ))}
            </div>

            {/* Explanatory Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 border-t border-neutral-200 text-left">
              <div className="space-y-1.5">
                <div className="w-8 h-8 rounded-lg bg-neutral-900 text-amber-400 flex items-center justify-center font-bold text-xs">
                  1
                </div>
                <h5 className="text-xs font-bold uppercase tracking-wider text-neutral-900">
                  Where do I find my reference?
                </h5>
                <p className="text-[11px] text-neutral-600 leading-relaxed">
                  Your reference was generated upon submitting your custom measurements or checking out. It was also messaged to your phone and email.
                </p>
              </div>

              <div className="space-y-1.5">
                <div className="w-8 h-8 rounded-lg bg-neutral-900 text-amber-400 flex items-center justify-center font-bold text-xs">
                  2
                </div>
                <h5 className="text-xs font-bold uppercase tracking-wider text-neutral-900">
                  White-Glove Fittings
                </h5>
                <p className="text-[11px] text-neutral-600 leading-relaxed">
                  When your piece reaches &ldquo;Ready for Fitting&rdquo;, our concierge will invite you to our Uyo, Calabar, or Port-Harcourt suites.
                </p>
              </div>

              <div className="space-y-1.5">
                <div className="w-8 h-8 rounded-lg bg-neutral-900 text-amber-400 flex items-center justify-center font-bold text-xs">
                  3
                </div>
                <h5 className="text-xs font-bold uppercase tracking-wider text-neutral-900">
                  DHL Worldwide Shipping
                </h5>
                <p className="text-[11px] text-neutral-600 leading-relaxed">
                  For clients outside our flagship cities, finished orders are dispatched in breathable cedar boxes via priority air express.
                </p>
              </div>
            </div>

            {onOpenCustomOrder && (
              <div className="pt-2">
                <button
                  type="button"
                  onClick={onOpenCustomOrder}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-neutral-900 hover:bg-black text-white text-xs font-bold uppercase tracking-wider rounded-lg transition-colors shadow-md"
                >
                  <Scissors className="w-4 h-4 text-amber-400" />
                  <span>Commission a New Custom Outfit</span>
                </button>
              </div>
            )}
          </div>
        ) : null}
      </div>
    </div>
  );
};
