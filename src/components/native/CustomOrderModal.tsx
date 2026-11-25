import React, { useState } from 'react';
import { Product, GarmentMeasurements, ShoeMeasurements, MeasurementUnit } from '../../types';
import { PRODUCTS } from '../../data/products';
import { ASSETS } from '../../data/assets';
import { useOrders } from '../../context/OrderContext';
import {
  X,
  Upload,
  CheckCircle2,
  Ruler,
  Scissors,
  AlertCircle,
  FileCheck,
  ChevronRight,
  ChevronLeft,
  Sparkles,
  Camera,
  Wand2,
  Calculator,
  Check,
  ArrowDown,
  Package
} from 'lucide-react';
import { calculateSuggestedMeasurements, BodyBuild } from '../../utils/measurementSuggester';
import { WhatsAppIcon } from '../../config/whatsapp';

interface CustomOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedProduct?: Product | null;
  onOpenMeasurementGuide?: () => void;
  onTrackOrder?: (orderRef: string) => void;
}

export const CustomOrderModal: React.FC<CustomOrderModalProps> = ({
  isOpen,
  onClose,
  preselectedProduct,
  onOpenMeasurementGuide,
  onTrackOrder
}) => {
  const { createCustomOrder } = useOrders();

  if (!isOpen) return null;

  // Step Tracker: 1 = Design & Reference, 2 = Measurements & Specs, 3 = Preferences & Client Info, 4 = Review & Submit
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3 | 4>(1);

  // Design Choice
  const [designSource, setDesignSource] = useState<'catalog' | 'upload'>(
    preselectedProduct ? 'catalog' : 'catalog'
  );
  const [selectedProductId, setSelectedProductId] = useState<string>(
    preselectedProduct?.id || 'pw-nat-001'
  );
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);

  // Garment Category
  const [garmentType, setGarmentType] = useState<
    'senator' | 'kaftan' | 'agbada' | 'two-piece' | 'corporate-shoe' | 'female-native' | 'female-corporate'
  >(
    preselectedProduct?.category === 'shoes'
      ? 'corporate-shoe'
      : (preselectedProduct?.category === 'female-native' || preselectedProduct?.category === 'female-corporate')
      ? preselectedProduct.category
      : (preselectedProduct?.category as any) || 'senator'
  );

  // Desired Modifications
  const [modifications, setModifications] = useState('');

  // Unit: cm vs in
  const [unit, setUnit] = useState<MeasurementUnit>('in');

  // Garment Measurements State
  const [measurements, setMeasurements] = useState<GarmentMeasurements>({
    unit: 'in',
    shoulder: 19.5,
    chest: 42.0,
    neck: 16.5,
    sleeveLength: 26.0,
    garmentLength: 38.0,
    waist: 34.0,
    trouserLength: 42.0,
    thigh: 25.0,
    inseam: 32.0,
    agbadaSpan: 60.0
  });

  // Shoe Measurements State
  const [shoeSpecs, setShoeSpecs] = useState<ShoeMeasurements>({
    unit: 'in',
    shoeSizeEU: 43,
    footLength: 11.0,
    footWidth: 'standard',
    materialPreference: 'Full-Grain Italian Calfskin',
    monogramInitials: ''
  });

  // Fabric & Preferences
  const [fabricPreference, setFabricPreference] = useState('Super 160s Italian Cashmere Wool');
  const [colorPreference, setColorPreference] = useState('Deep Royal Navy with Silver Stitching');
  const [quantity, setQuantity] = useState(1);
  const [requestedDate, setRequestedDate] = useState('2026-11-20');
  const [specialInstructions, setSpecialInstructions] = useState('');

  // Customer Contact & Delivery
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [deliveryCity, setDeliveryCity] = useState('Uyo');
  const [deliveryState, setDeliveryState] = useState('Akwa Ibom');

  // Final Order State
  const [submittedOrderId, setSubmittedOrderId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Auto-Suggest Sizes State & Logic Gate Inputs
  const [isAutoSuggestOpen, setIsAutoSuggestOpen] = useState(true);
  const [heightMode, setHeightMode] = useState<'cm' | 'ft_in'>('cm');
  const [userHeightCm, setUserHeightCm] = useState<number>(175);
  const [heightFeet, setHeightFeet] = useState<number>(5);
  const [heightInchesInput, setHeightInchesInput] = useState<number>(9);

  const [weightMode, setWeightMode] = useState<'kg' | 'lbs'>('kg');
  const [userWeightKg, setUserWeightKg] = useState<number>(75);
  const [userWeightLbs, setUserWeightLbs] = useState<number>(165);

  const [buildPreference, setBuildPreference] = useState<BodyBuild>('tailored');
  const [suggestSuccessMsg, setSuggestSuccessMsg] = useState<string | null>(null);

  // Resolved active height & weight for the logic gates
  const activeHeightCm = heightMode === 'cm'
    ? userHeightCm
    : Math.round((heightFeet * 12 + heightInchesInput) * 2.54);

  const activeWeightKg = weightMode === 'kg'
    ? userWeightKg
    : Math.round(userWeightLbs / 2.20462);

  // Live Auto-Suggest Calculation
  const suggestedResult = calculateSuggestedMeasurements({
    heightCm: activeHeightCm,
    weightKg: activeWeightKg,
    build: buildPreference,
    garmentType,
    targetUnit: unit
  });

  const handleApplySuggested = () => {
    setMeasurements((prev) => ({
      ...prev,
      ...suggestedResult.measurements,
      unit: unit
    }));

    if (suggestedResult.shoeSpecs && garmentType === 'corporate-shoe') {
      setShoeSpecs((prev) => ({
        ...prev,
        ...suggestedResult.shoeSpecs
      }));
    }

    setSuggestSuccessMsg(
      `✓ Baseline sizes applied: ${suggestedResult.suggestedSizeCategory} (${unit === 'in' ? `${suggestedResult.measurements.chest}"` : `${suggestedResult.measurements.chest}cm`} Chest) for a ${activeHeightCm}cm / ${activeWeightKg}kg frame.`
    );
    setTimeout(() => {
      setSuggestSuccessMsg(null);
    }, 6000);
  };

  // Handle Image Upload with validation
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUploadError(null);
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      setUploadError('Image file is too large. Maximum supported size is 10MB.');
      return;
    }

    // Validate type
    const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/heic'];
    if (!validTypes.includes(file.type)) {
      setUploadError('Unsupported file format. Please upload JPG, PNG, or WEBP.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      setUploadedImage(event.target?.result as string);
      setUploadedFileName(file.name);
      setDesignSource('upload');
    };
    reader.readAsDataURL(file);
  };

  const removeUploadedImage = () => {
    setUploadedImage(null);
    setUploadedFileName(null);
  };

  const handleMeasurementChange = (field: keyof GarmentMeasurements, val: number) => {
    setMeasurements((prev) => ({
      ...prev,
      [field]: val
    }));
  };

  const handleUnitToggle = (newUnit: MeasurementUnit) => {
    if (newUnit === unit) return;
    setUnit(newUnit);
    // Convert values
    const factor = newUnit === 'cm' ? 2.54 : 1 / 2.54;
    const updated: any = { unit: newUnit };
    Object.keys(measurements).forEach((k) => {
      if (k !== 'unit' && typeof (measurements as any)[k] === 'number') {
        updated[k] = Math.round((measurements as any)[k] * factor * 10) / 10;
      }
    });
    setMeasurements(updated);
  };

  const handleSubmitCustomOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const selectedCatalogItem = PRODUCTS.find((p) => p.id === selectedProductId);
    const orderData = {
      customerName: clientName,
      email: clientEmail,
      phone: clientPhone,
      deliveryAddress,
      deliveryCity,
      deliveryState,
      orderType: garmentType === 'corporate-shoe'
        ? ('corporate_shoes' as const)
        : (garmentType === 'female-native' || garmentType === 'female-corporate')
        ? ('female_couture' as const)
        : ('native_tailoring' as const),
      garmentCategory: garmentType,
      selectedDesignId: designSource === 'catalog' ? selectedProductId : undefined,
      selectedDesignName: designSource === 'catalog' ? selectedCatalogItem?.name : 'Customer Uploaded Custom Design',
      referenceImage: designSource === 'upload' ? (uploadedImage || undefined) : selectedCatalogItem?.images[0],
      modificationsDescription: modifications,
      measurements: garmentType !== 'corporate-shoe' ? { ...measurements, unit } : undefined,
      shoeSpecs: garmentType === 'corporate-shoe' ? shoeSpecs : undefined,
      fabricPreference,
      colorPreference,
      quantity,
      requestedCompletionDate: requestedDate,
      specialInstructions
    };

    setTimeout(() => {
      const created = createCustomOrder(orderData);
      setSubmittedOrderId(created.id);
      setIsSubmitting(false);
    }, 1000);
  };

  const selectedProduct = PRODUCTS.find((p) => p.id === selectedProductId);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div className="relative bg-white w-full max-w-3xl rounded-lg shadow-2xl overflow-hidden border border-neutral-200 my-8">
        {/* Header */}
        <div className="p-5 border-b border-neutral-200 flex items-center justify-between bg-neutral-950 text-white">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-amber-500 text-neutral-950 rounded">
              <Scissors className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold uppercase tracking-wider font-serif-luxury">
                Bespoke Design & Measurement Studio
              </h2>
              <p className="text-xs text-neutral-400">
                Crafted to your personal measurements with master tailor review
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close custom order studio"
            className="p-1.5 rounded-full text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Progress Bar */}
        {!submittedOrderId && (
          <div className="px-6 py-3 bg-neutral-100 border-b border-neutral-200 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <span
                className={`w-5 h-5 rounded-full text-[11px] font-bold flex items-center justify-center ${
                  currentStep >= 1 ? 'bg-neutral-900 text-white' : 'bg-neutral-300 text-neutral-600'
                }`}
              >
                1
              </span>
              <span className={`font-semibold ${currentStep === 1 ? 'text-neutral-950' : 'text-neutral-500'}`}>
                Design Style
              </span>
            </div>
            <span className="text-neutral-300">·</span>

            <div className="flex items-center gap-2">
              <span
                className={`w-5 h-5 rounded-full text-[11px] font-bold flex items-center justify-center ${
                  currentStep >= 2 ? 'bg-neutral-900 text-white' : 'bg-neutral-300 text-neutral-600'
                }`}
              >
                2
              </span>
              <span className={`font-semibold ${currentStep === 2 ? 'text-neutral-950' : 'text-neutral-500'}`}>
                Measurements
              </span>
            </div>
            <span className="text-neutral-300">·</span>

            <div className="flex items-center gap-2">
              <span
                className={`w-5 h-5 rounded-full text-[11px] font-bold flex items-center justify-center ${
                  currentStep >= 3 ? 'bg-neutral-900 text-white' : 'bg-neutral-300 text-neutral-600'
                }`}
              >
                3
              </span>
              <span className={`font-semibold ${currentStep === 3 ? 'text-neutral-950' : 'text-neutral-500'}`}>
                Fabric & Details
              </span>
            </div>
            <span className="text-neutral-300">·</span>

            <div className="flex items-center gap-2">
              <span
                className={`w-5 h-5 rounded-full text-[11px] font-bold flex items-center justify-center ${
                  currentStep >= 4 ? 'bg-neutral-900 text-white' : 'bg-neutral-300 text-neutral-600'
                }`}
              >
                4
              </span>
              <span className={`font-semibold ${currentStep === 4 ? 'text-neutral-950' : 'text-neutral-500'}`}>
                Review
              </span>
            </div>
          </div>
        )}

        {/* Content Body */}
        {submittedOrderId ? (
          <div className="p-8 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-9 h-9" />
            </div>
            <h3 className="text-2xl font-bold text-neutral-900 font-serif-luxury">
              Custom Order Submitted Successfully
            </h3>
            <div className="inline-block px-3 py-1 bg-neutral-100 rounded border border-neutral-300 font-mono text-sm font-bold text-neutral-900 tracking-wider">
              {submittedOrderId}
            </div>
            <p className="text-xs text-neutral-600 max-w-md mx-auto leading-relaxed">
              Your bespoke specifications and measurements have been logged in our master atelier registry.
            </p>

            {/* Crucial requirement: No automatic fixed price charged before master tailor review */}
            <div className="bg-amber-50/90 border border-amber-300/80 p-4 rounded-lg max-w-md mx-auto text-left text-xs space-y-2">
              <div className="flex items-center gap-2 text-amber-900 font-bold">
                <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
                <span>Next Step: Master Tailor Quotation</span>
              </div>
              <p className="text-amber-800 leading-relaxed">
                As per Prime Wears bespoke policy, we <strong>do not automatically charge a fixed price</strong> for unquoted custom work. Our chief cutter will inspect your requested modifications, fabric availability, and measurements to confirm your exact quotation.
              </p>
              <p className="text-amber-800 leading-relaxed">
                You will receive your official quote & WhatsApp invoice within <strong>24 business hours</strong> before any payment is requested.
              </p>
            </div>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
              {onTrackOrder && submittedOrderId && (
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onTrackOrder(submittedOrderId);
                  }}
                  className="w-full sm:w-auto py-2.5 px-6 bg-amber-500 hover:bg-amber-400 text-neutral-950 text-xs font-bold uppercase tracking-wider rounded transition-colors shadow-md flex items-center justify-center gap-2"
                >
                  <Package className="w-4 h-4 text-neutral-950" />
                  <span>Track This Custom Order Now</span>
                </button>
              )}
              <button
                type="button"
                onClick={onClose}
                className="w-full sm:w-auto py-2.5 px-6 bg-neutral-950 text-white text-xs font-bold uppercase tracking-wider rounded hover:bg-black transition-colors"
              >
                Done
              </button>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-2 border-t border-neutral-100">
              <a
                href={`https://wa.me/2348066825239?text=${encodeURIComponent(`Hello Prime Wears! 👋 I just submitted bespoke custom order ${submittedOrderId || ''}.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto py-2 px-3.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded flex items-center justify-center gap-1.5 transition-colors"
              >
                <WhatsAppIcon className="w-3.5 h-3.5" />
                <span>Message Concierge (Number 1)</span>
              </a>
              <a
                href={`https://wa.me/2349052473964?text=${encodeURIComponent(`Hello Prime Wears! 👋 I just submitted bespoke custom order ${submittedOrderId || ''}.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto py-2 px-3.5 bg-neutral-900 hover:bg-neutral-950 text-white text-xs font-semibold rounded border border-neutral-800 flex items-center justify-center gap-1.5 transition-colors"
              >
                <WhatsAppIcon className="w-3.5 h-3.5" />
                <span>Message Concierge (Number 2)</span>
              </a>
            </div>
          </div>
        ) : (
          <div className="p-6 max-h-[70vh] overflow-y-auto">
            {/* STEP 1: STYLE REFERENCE & UPLOAD */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-bold text-neutral-900 uppercase tracking-wider mb-1">
                    1. Select Garment Type & Style Reference
                  </h3>
                  <p className="text-xs text-neutral-500">
                    Choose from our signature atelier catalogue or upload your own style photo.
                  </p>
                </div>

                {/* Garment Type Tabs */}
                <div>
                  <label className="block text-[11px] font-semibold text-neutral-700 mb-2">
                    Garment Category:
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
                    {[
                      { id: 'senator', label: 'Senator Suit' },
                      { id: 'kaftan', label: 'Royal Kaftan' },
                      { id: 'agbada', label: 'Grand Agbada' },
                      { id: 'two-piece', label: 'Modern 2-Piece' },
                      { id: 'female-native', label: '👑 Female Native' },
                      { id: 'female-corporate', label: '👑 Female Corporate' },
                      { id: 'corporate-shoe', label: 'Corporate Shoes' }
                    ].map((g) => (
                      <button
                        key={g.id}
                        type="button"
                        onClick={() => {
                          setGarmentType(g.id as any);
                          // Auto select first matching catalog item if available
                          const firstMatching = PRODUCTS.find((p) => {
                            if (g.id === 'corporate-shoe') return p.category === 'shoes';
                            if (g.id === 'female-native') return p.category === 'female-native';
                            if (g.id === 'female-corporate') return p.category === 'female-corporate';
                            return p.category === g.id;
                          });
                          if (firstMatching) setSelectedProductId(firstMatching.id);
                        }}
                        className={`py-2 px-2 text-xs font-semibold rounded border text-center transition-all ${
                          garmentType === g.id
                            ? 'bg-neutral-900 text-white border-neutral-900 shadow-sm'
                            : 'bg-white text-neutral-700 border-neutral-200 hover:border-neutral-400'
                        }`}
                      >
                        {g.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Source Selector: Existing Design vs Upload */}
                <div className="space-y-3">
                  <div className="flex items-center gap-4 text-xs font-semibold">
                    <button
                      type="button"
                      onClick={() => setDesignSource('catalog')}
                      className={`pb-1.5 border-b-2 transition-colors ${
                        designSource === 'catalog'
                          ? 'border-neutral-900 text-neutral-950 font-bold'
                          : 'border-transparent text-neutral-500 hover:text-neutral-800'
                      }`}
                    >
                      Pick From Prime Wears Catalog
                    </button>
                    <button
                      type="button"
                      onClick={() => setDesignSource('upload')}
                      className={`pb-1.5 border-b-2 transition-colors ${
                        designSource === 'upload'
                          ? 'border-neutral-900 text-neutral-950 font-bold'
                          : 'border-transparent text-neutral-500 hover:text-neutral-800'
                      }`}
                    >
                      Upload Your Custom Photo / Sketch
                    </button>
                  </div>

                  {designSource === 'catalog' ? (
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {PRODUCTS.filter(
                        (p) => {
                          if (garmentType === 'corporate-shoe') return p.category === 'shoes';
                          if (garmentType === 'female-native') return p.category === 'female-native';
                          if (garmentType === 'female-corporate') return p.category === 'female-corporate';
                          return p.experience === 'native' && p.category !== 'shoes' && p.category !== 'female-native' && p.category !== 'female-corporate';
                        }
                      ).map((item) => (
                        <div
                          key={item.id}
                          onClick={() => setSelectedProductId(item.id)}
                          className={`relative rounded-md border p-2 cursor-pointer transition-all ${
                            selectedProductId === item.id
                              ? 'border-neutral-950 bg-amber-50/40 ring-1 ring-neutral-950'
                              : 'border-neutral-200 hover:border-neutral-400 bg-white'
                          }`}
                        >
                          <img
                            src={item.images[0]}
                            alt={item.name}
                            className="w-full aspect-[4/5] object-cover rounded bg-neutral-100"
                          />
                          <h4 className="text-xs font-semibold text-neutral-900 mt-2 truncate">
                            {item.name}
                          </h4>
                          <span className="text-[11px] text-neutral-500 block">
                            {item.category}
                          </span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    /* Upload Interface with Mobile and Computer Support */
                    <div className="space-y-3">
                      <div className="border-2 border-dashed border-neutral-300 rounded-lg p-6 text-center hover:border-neutral-400 transition-colors bg-neutral-50/50">
                        {uploadedImage ? (
                          <div className="space-y-3">
                            <img
                              src={uploadedImage}
                              alt="Uploaded style reference"
                              className="max-h-56 mx-auto rounded-md shadow-md object-contain border border-neutral-200"
                            />
                            <div className="flex items-center justify-center gap-3 text-xs">
                              <span className="font-medium text-neutral-700 truncate max-w-xs">
                                {uploadedFileName || 'Custom reference photo'}
                              </span>
                              <button
                                type="button"
                                onClick={removeUploadedImage}
                                className="text-red-600 hover:underline font-semibold"
                              >
                                Remove & Replace
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div className="space-y-2">
                            <div className="w-12 h-12 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center mx-auto">
                              <Upload className="w-6 h-6" />
                            </div>
                            <div className="text-xs text-neutral-600">
                              <label
                                htmlFor="file-upload"
                                className="font-bold text-neutral-900 hover:text-amber-600 cursor-pointer underline mr-1"
                              >
                                Click to browse computer
                              </label>
                              <span>or tap to upload from phone gallery / camera</span>
                            </div>
                            <p className="text-[11px] text-neutral-400">
                              Supports JPG, PNG, WEBP up to 10MB
                            </p>
                            <input
                              id="file-upload"
                              type="file"
                              accept="image/png, image/jpeg, image/webp"
                              onChange={handleImageUpload}
                              className="hidden"
                            />
                          </div>
                        )}
                      </div>

                      {uploadError && (
                        <div className="p-3 bg-red-50 text-red-700 rounded text-xs flex items-center gap-2">
                          <AlertCircle className="w-4 h-4 shrink-0" />
                          <span>{uploadError}</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Custom Modifications Description */}
                <div>
                  <label className="block text-[11px] font-semibold text-neutral-700 mb-1">
                    Describe Desired Modifications (Optional):
                  </label>
                  <textarea
                    rows={3}
                    value={modifications}
                    onChange={(e) => setModifications(e.target.value)}
                    placeholder="e.g. Please alter placket embroidery to gold thread, change collar to Mandarin curve, add side slits, or specify pocket shape..."
                    className="w-full bg-white border border-neutral-300 rounded p-3 text-xs text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-neutral-900"
                  />
                </div>
              </div>
            )}

            {/* STEP 2: DYNAMIC MEASUREMENTS */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-neutral-100 pb-3">
                  <div>
                    <h3 className="text-sm font-bold text-neutral-900 uppercase tracking-wider">
                      2. Supply Your Measurements
                    </h3>
                    <p className="text-xs text-neutral-500">
                      Tailored specifically for {garmentType.replace('-', ' ')}
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    {/* Unit Switcher */}
                    <div className="flex items-center bg-neutral-100 p-1 rounded border border-neutral-200 text-xs">
                      <button
                        type="button"
                        onClick={() => handleUnitToggle('in')}
                        className={`px-3 py-1 rounded font-bold transition-all ${
                          unit === 'in' ? 'bg-white text-neutral-900 shadow-xs' : 'text-neutral-500'
                        }`}
                      >
                        Inches (in)
                      </button>
                      <button
                        type="button"
                        onClick={() => handleUnitToggle('cm')}
                        className={`px-3 py-1 rounded font-bold transition-all ${
                          unit === 'cm' ? 'bg-white text-neutral-900 shadow-xs' : 'text-neutral-500'
                        }`}
                      >
                        Centimeters (cm)
                      </button>
                    </div>

                    {/* Guide modal launcher */}
                    {onOpenMeasurementGuide && (
                      <button
                        type="button"
                        onClick={onOpenMeasurementGuide}
                        className="text-amber-800 hover:text-amber-950 flex items-center gap-1 text-xs font-semibold"
                      >
                        <Ruler className="w-3.5 h-3.5" />
                        <span>Visual Guide</span>
                      </button>
                    )}
                  </div>
                </div>

                {/* Auto-Suggest Sizes Feature (Height & Weight Logic Gate) */}
                <div className="bg-gradient-to-br from-amber-50/80 via-white to-amber-50/40 rounded-xl border border-amber-300/80 p-4 shadow-xs space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-amber-500/20 text-amber-900 flex items-center justify-center font-bold">
                        <Wand2 className="w-4 h-4 text-amber-700" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-900">
                            Auto-Suggest Baseline Sizes
                          </h4>
                          <span className="text-[10px] font-mono bg-amber-200/70 text-amber-900 font-semibold px-2 py-0.5 rounded-full border border-amber-300">
                            Anthropometric Logic Gate
                          </span>
                        </div>
                        <p className="text-[11px] text-neutral-600">
                          Enter your height & weight to pre-calculate standard tailored baseline measurements.
                        </p>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => setIsAutoSuggestOpen(!isAutoSuggestOpen)}
                      className="text-[11px] font-semibold text-amber-900 hover:text-amber-950 underline flex items-center gap-1"
                    >
                      {isAutoSuggestOpen ? 'Minimize' : 'Open Sizer'}
                    </button>
                  </div>

                  {isAutoSuggestOpen && (
                    <div className="pt-3 border-t border-amber-200/60 space-y-3">
                      {/* Inputs Row */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        {/* Height Input */}
                        <div className="bg-white/80 p-2.5 rounded-lg border border-amber-200/80">
                          <div className="flex items-center justify-between mb-1.5">
                            <label className="text-[11px] font-bold text-neutral-800">
                              Height
                            </label>
                            <div className="flex items-center bg-neutral-100 rounded text-[10px] p-0.5">
                              <button
                                type="button"
                                onClick={() => setHeightMode('cm')}
                                className={`px-1.5 py-0.5 rounded font-bold transition-all ${
                                  heightMode === 'cm' ? 'bg-white shadow-xs text-neutral-900' : 'text-neutral-500'
                                }`}
                              >
                                cm
                              </button>
                              <button
                                type="button"
                                onClick={() => setHeightMode('ft_in')}
                                className={`px-1.5 py-0.5 rounded font-bold transition-all ${
                                  heightMode === 'ft_in' ? 'bg-white shadow-xs text-neutral-900' : 'text-neutral-500'
                                }`}
                              >
                                ft / in
                              </button>
                            </div>
                          </div>

                          {heightMode === 'cm' ? (
                            <div className="relative">
                              <input
                                type="number"
                                min={140}
                                max={220}
                                value={userHeightCm}
                                onChange={(e) => setUserHeightCm(Math.max(120, Math.min(230, parseFloat(e.target.value) || 0)))}
                                className="w-full bg-white border border-neutral-300 rounded px-2.5 py-1.5 text-xs font-semibold text-neutral-900 focus:outline-none focus:border-amber-600 pr-9"
                              />
                              <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] font-mono text-neutral-400">
                                cm
                              </span>
                            </div>
                          ) : (
                            <div className="grid grid-cols-2 gap-1.5">
                              <div className="relative">
                                <input
                                  type="number"
                                  min={4}
                                  max={7}
                                  value={heightFeet}
                                  onChange={(e) => setHeightFeet(parseInt(e.target.value) || 5)}
                                  className="w-full bg-white border border-neutral-300 rounded px-2 py-1.5 text-xs font-semibold text-neutral-900 pr-6"
                                />
                                <span className="absolute right-2 top-1/2 -translate-y-1/2 text-[10px] text-neutral-400">
                                  ft
                                </span>
                              </div>
                              <div className="relative">
                                <input
                                  type="number"
                                  min={0}
                                  max={11}
                                  value={heightInchesInput}
                                  onChange={(e) => setHeightInchesInput(parseInt(e.target.value) || 0)}
                                  className="w-full bg-white border border-neutral-300 rounded px-2 py-1.5 text-xs font-semibold text-neutral-900 pr-6"
                                />
                                <span className="absolute right-2 top-1/2 -translate-y-1/2 text-[10px] text-neutral-400">
                                  in
                                </span>
                              </div>
                            </div>
                          )}
                          <span className="text-[10px] text-neutral-500 block mt-1">
                            {heightMode === 'cm' 
                              ? `≈ ${Math.floor((userHeightCm / 2.54) / 12)}' ${Math.round((userHeightCm / 2.54) % 12)}"`
                              : `≈ ${activeHeightCm} cm`}
                          </span>
                        </div>

                        {/* Weight Input */}
                        <div className="bg-white/80 p-2.5 rounded-lg border border-amber-200/80">
                          <div className="flex items-center justify-between mb-1.5">
                            <label className="text-[11px] font-bold text-neutral-800">
                              Weight
                            </label>
                            <div className="flex items-center bg-neutral-100 rounded text-[10px] p-0.5">
                              <button
                                type="button"
                                onClick={() => setWeightMode('kg')}
                                className={`px-1.5 py-0.5 rounded font-bold transition-all ${
                                  weightMode === 'kg' ? 'bg-white shadow-xs text-neutral-900' : 'text-neutral-500'
                                }`}
                              >
                                kg
                              </button>
                              <button
                                type="button"
                                onClick={() => setWeightMode('lbs')}
                                className={`px-1.5 py-0.5 rounded font-bold transition-all ${
                                  weightMode === 'lbs' ? 'bg-white shadow-xs text-neutral-900' : 'text-neutral-500'
                                }`}
                              >
                                lbs
                              </button>
                            </div>
                          </div>

                          {weightMode === 'kg' ? (
                            <div className="relative">
                              <input
                                type="number"
                                min={40}
                                max={180}
                                value={userWeightKg}
                                onChange={(e) => setUserWeightKg(Math.max(40, Math.min(200, parseFloat(e.target.value) || 0)))}
                                className="w-full bg-white border border-neutral-300 rounded px-2.5 py-1.5 text-xs font-semibold text-neutral-900 focus:outline-none focus:border-amber-600 pr-9"
                              />
                              <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] font-mono text-neutral-400">
                                kg
                              </span>
                            </div>
                          ) : (
                            <div className="relative">
                              <input
                                type="number"
                                min={90}
                                max={400}
                                value={userWeightLbs}
                                onChange={(e) => setUserWeightLbs(Math.max(80, Math.min(450, parseFloat(e.target.value) || 0)))}
                                className="w-full bg-white border border-neutral-300 rounded px-2.5 py-1.5 text-xs font-semibold text-neutral-900 focus:outline-none focus:border-amber-600 pr-9"
                              />
                              <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] font-mono text-neutral-400">
                                lbs
                              </span>
                            </div>
                          )}
                          <span className="text-[10px] text-neutral-500 block mt-1">
                            {weightMode === 'kg' 
                              ? `≈ ${Math.round(userWeightKg * 2.20462)} lbs`
                              : `≈ ${activeWeightKg} kg`}
                          </span>
                        </div>

                        {/* Fit Profile Selector */}
                        <div className="bg-white/80 p-2.5 rounded-lg border border-amber-200/80">
                          <label className="text-[11px] font-bold text-neutral-800 block mb-1.5">
                            Tailoring Ease / Cut
                          </label>
                          <select
                            value={buildPreference}
                            onChange={(e) => setBuildPreference(e.target.value as BodyBuild)}
                            className="w-full bg-white border border-neutral-300 rounded px-2.5 py-1.5 text-xs font-medium text-neutral-900 focus:outline-none focus:border-amber-600"
                          >
                            <option value="tailored">Standard Tailored Regular</option>
                            <option value="slim">Slim Cut (-1.5" Taper)</option>
                            <option value="relaxed">Relaxed / Traditional Nigerian (+2" Ease)</option>
                          </select>
                          <span className="text-[10px] text-neutral-500 block mt-1">
                            BMI: {suggestedResult.bmi} ({suggestedResult.bmi < 20 ? 'Lean' : suggestedResult.bmi < 25 ? 'Normal' : suggestedResult.bmi < 29 ? 'Athletic / Solid' : 'Regal / Robust'})
                          </span>
                        </div>
                      </div>

                      {/* Calculated Logic Gate Output Banner */}
                      <div className="bg-amber-100/70 border border-amber-300 rounded-lg p-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-neutral-900">
                              Suggested Base Tier:
                            </span>
                            <span className="bg-neutral-950 text-amber-300 font-mono text-xs font-bold px-2.5 py-0.5 rounded shadow-xs">
                              {suggestedResult.suggestedSizeLabel}
                            </span>
                          </div>
                          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-neutral-700">
                            <span><strong>Chest:</strong> {suggestedResult.measurements.chest}{unit}</span>
                            <span><strong>Shoulder:</strong> {suggestedResult.measurements.shoulder}{unit}</span>
                            <span><strong>Waist:</strong> {suggestedResult.measurements.waist}{unit}</span>
                            <span><strong>Sleeve:</strong> {suggestedResult.measurements.sleeveLength}{unit}</span>
                            <span><strong>Length:</strong> {suggestedResult.measurements.garmentLength}{unit}</span>
                            {garmentType === 'corporate-shoe' && (
                              <span><strong>Shoe:</strong> EU {suggestedResult.shoeSpecs?.shoeSizeEU}</span>
                            )}
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={handleApplySuggested}
                          className="py-2 px-4 bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs uppercase tracking-wider rounded-lg shadow-sm transition-all flex items-center justify-center gap-1.5 shrink-0 hover:scale-[1.02]"
                        >
                          <Calculator className="w-3.5 h-3.5" />
                          <span>Pre-Calculate & Apply</span>
                        </button>
                      </div>

                      {/* Applied feedback notification */}
                      {suggestSuccessMsg && (
                        <div className="p-2.5 bg-emerald-50 text-emerald-800 border border-emerald-300 rounded-lg text-xs flex items-center gap-2 font-medium animate-fadeIn">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                          <span>{suggestSuccessMsg}</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {garmentType === 'corporate-shoe' ? (
                  /* Corporate Shoes Measurement Form */
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[11px] font-semibold text-neutral-700 mb-1">
                          Standard Shoe Size (EU) *
                        </label>
                        <select
                          value={shoeSpecs.shoeSizeEU}
                          onChange={(e) =>
                            setShoeSpecs((prev) => ({
                              ...prev,
                              shoeSizeEU: parseInt(e.target.value)
                            }))
                          }
                          className="w-full bg-white border border-neutral-300 rounded px-3 py-2 text-xs text-neutral-900 focus:outline-none focus:border-neutral-900"
                        >
                          {[39, 40, 41, 42, 43, 44, 45, 46, 47].map((sz) => (
                            <option key={sz} value={sz}>
                              EU {sz} (approx UK {sz - 33.5})
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-[11px] font-semibold text-neutral-700 mb-1">
                          Foot Width Profile
                        </label>
                        <select
                          value={shoeSpecs.footWidth}
                          onChange={(e) =>
                            setShoeSpecs((prev) => ({
                              ...prev,
                              footWidth: e.target.value as any
                            }))
                          }
                          className="w-full bg-white border border-neutral-300 rounded px-3 py-2 text-xs text-neutral-900 focus:outline-none focus:border-neutral-900"
                        >
                          <option value="standard">Standard Width (D/E)</option>
                          <option value="wide">Wide Fit (EE/Comfort)</option>
                          <option value="narrow">Narrow Fit</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-[11px] font-semibold text-neutral-700 mb-1">
                          Exact Foot Length ({unit}) (Optional)
                        </label>
                        <input
                          type="number"
                          step="0.1"
                          value={shoeSpecs.footLength || ''}
                          onChange={(e) =>
                            setShoeSpecs((prev) => ({
                              ...prev,
                              footLength: parseFloat(e.target.value) || undefined
                            }))
                          }
                          placeholder={unit === 'in' ? '11.0' : '28.0'}
                          className="w-full bg-white border border-neutral-300 rounded px-3 py-2 text-xs text-neutral-900 focus:outline-none focus:border-neutral-900"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-semibold text-neutral-700 mb-1">
                          Monogram Insole Stamp (Max 3 Initials)
                        </label>
                        <input
                          type="text"
                          maxLength={3}
                          value={shoeSpecs.monogramInitials || ''}
                          onChange={(e) =>
                            setShoeSpecs((prev) => ({
                              ...prev,
                              monogramInitials: e.target.value.toUpperCase()
                            }))
                          }
                          placeholder="e.g. BTO"
                          className="w-full bg-white border border-neutral-300 rounded px-3 py-2 text-xs text-neutral-900 focus:outline-none focus:border-neutral-900 uppercase font-mono"
                        />
                      </div>
                    </div>
                  </div>
                ) : garmentType === 'female-native' || garmentType === 'female-corporate' ? (
                  /* Female Native & Corporate Couture Measurements Form */
                  <div className="space-y-4">
                    <div className="p-3 bg-neutral-50 rounded-lg border border-neutral-200 text-xs text-neutral-600 flex items-center justify-between">
                      <span className="font-semibold text-neutral-800">Couture Silhouette Profiling</span>
                      <span className="text-[11px] text-amber-700 font-medium">Bust, Natural Waist, High Hip & Full Hip Tailoring</span>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      <div>
                        <label className="block text-[11px] font-semibold text-neutral-700 mb-1">
                          Bust Circumference ({unit}) *
                        </label>
                        <input
                          type="number"
                          step="0.1"
                          value={measurements.bust || measurements.chest || ''}
                          onChange={(e) => {
                            const v = parseFloat(e.target.value) || 0;
                            handleMeasurementChange('bust', v);
                            handleMeasurementChange('chest', v);
                          }}
                          placeholder={unit === 'in' ? '36.0' : '91.5'}
                          className="w-full bg-white border border-neutral-300 rounded px-3 py-2 text-xs text-neutral-900 focus:outline-none focus:border-neutral-900"
                        />
                        <span className="text-[10px] text-neutral-400 mt-0.5 block">Apex circumference</span>
                      </div>

                      <div>
                        <label className="block text-[11px] font-semibold text-neutral-700 mb-1">
                          Natural Waist ({unit}) *
                        </label>
                        <input
                          type="number"
                          step="0.1"
                          value={measurements.waist || ''}
                          onChange={(e) =>
                            handleMeasurementChange('waist', parseFloat(e.target.value) || 0)
                          }
                          placeholder={unit === 'in' ? '28.0' : '71.0'}
                          className="w-full bg-white border border-neutral-300 rounded px-3 py-2 text-xs text-neutral-900 focus:outline-none focus:border-neutral-900"
                        />
                        <span className="text-[10px] text-neutral-400 mt-0.5 block">Narrowest waistline</span>
                      </div>

                      <div>
                        <label className="block text-[11px] font-semibold text-neutral-700 mb-1">
                          High Hip ({unit})
                        </label>
                        <input
                          type="number"
                          step="0.1"
                          value={measurements.highHip || ''}
                          onChange={(e) =>
                            handleMeasurementChange('highHip', parseFloat(e.target.value) || 0)
                          }
                          placeholder={unit === 'in' ? '33.0' : '84.0'}
                          className="w-full bg-white border border-neutral-300 rounded px-3 py-2 text-xs text-neutral-900 focus:outline-none focus:border-neutral-900"
                        />
                        <span className="text-[10px] text-neutral-400 mt-0.5 block">~4" below waist</span>
                      </div>

                      <div>
                        <label className="block text-[11px] font-semibold text-neutral-700 mb-1">
                          Full Hip / Seat ({unit}) *
                        </label>
                        <input
                          type="number"
                          step="0.1"
                          value={measurements.fullHip || ''}
                          onChange={(e) =>
                            handleMeasurementChange('fullHip', parseFloat(e.target.value) || 0)
                          }
                          placeholder={unit === 'in' ? '39.0' : '99.0'}
                          className="w-full bg-white border border-neutral-300 rounded px-3 py-2 text-xs text-neutral-900 focus:outline-none focus:border-neutral-900"
                        />
                        <span className="text-[10px] text-neutral-400 mt-0.5 block">Widest hip point</span>
                      </div>

                      <div>
                        <label className="block text-[11px] font-semibold text-neutral-700 mb-1">
                          Top / Peplum Length ({unit}) *
                        </label>
                        <input
                          type="number"
                          step="0.1"
                          value={measurements.garmentLength || ''}
                          onChange={(e) =>
                            handleMeasurementChange('garmentLength', parseFloat(e.target.value) || 0)
                          }
                          placeholder={unit === 'in' ? '25.0' : '63.5'}
                          className="w-full bg-white border border-neutral-300 rounded px-3 py-2 text-xs text-neutral-900 focus:outline-none focus:border-neutral-900"
                        />
                        <span className="text-[10px] text-neutral-400 mt-0.5 block">Shoulder to hem</span>
                      </div>

                      <div>
                        <label className="block text-[11px] font-semibold text-neutral-700 mb-1">
                          Skirt / Gown Length ({unit}) *
                        </label>
                        <input
                          type="number"
                          step="0.1"
                          value={measurements.skirtLength || ''}
                          onChange={(e) =>
                            handleMeasurementChange('skirtLength', parseFloat(e.target.value) || 0)
                          }
                          placeholder={unit === 'in' ? '36.0' : '91.5'}
                          className="w-full bg-white border border-neutral-300 rounded px-3 py-2 text-xs text-neutral-900 focus:outline-none focus:border-neutral-900"
                        />
                        <span className="text-[10px] text-neutral-400 mt-0.5 block">Waist to desired hem</span>
                      </div>

                      <div>
                        <label className="block text-[11px] font-semibold text-neutral-700 mb-1">
                          Shoulder Width ({unit}) *
                        </label>
                        <input
                          type="number"
                          step="0.1"
                          value={measurements.shoulder || ''}
                          onChange={(e) =>
                            handleMeasurementChange('shoulder', parseFloat(e.target.value) || 0)
                          }
                          placeholder={unit === 'in' ? '15.5' : '39.5'}
                          className="w-full bg-white border border-neutral-300 rounded px-3 py-2 text-xs text-neutral-900 focus:outline-none focus:border-neutral-900"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-semibold text-neutral-700 mb-1">
                          Sleeve Length ({unit}) *
                        </label>
                        <input
                          type="number"
                          step="0.1"
                          value={measurements.sleeveLength || ''}
                          onChange={(e) =>
                            handleMeasurementChange('sleeveLength', parseFloat(e.target.value) || 0)
                          }
                          placeholder={unit === 'in' ? '23.0' : '58.5'}
                          className="w-full bg-white border border-neutral-300 rounded px-3 py-2 text-xs text-neutral-900 focus:outline-none focus:border-neutral-900"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-semibold text-neutral-700 mb-1">
                          Neck Circumference ({unit})
                        </label>
                        <input
                          type="number"
                          step="0.1"
                          value={measurements.neck || ''}
                          onChange={(e) =>
                            handleMeasurementChange('neck', parseFloat(e.target.value) || 0)
                          }
                          placeholder={unit === 'in' ? '14.0' : '35.5'}
                          className="w-full bg-white border border-neutral-300 rounded px-3 py-2 text-xs text-neutral-900 focus:outline-none focus:border-neutral-900"
                        />
                      </div>
                    </div>
                  </div>
                ) : (
                  /* Dynamic Native Garment Measurements Form (Senator, Kaftan, Agbada, Two-Piece) */
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-[11px] font-semibold text-neutral-700 mb-1">
                        Shoulder ({unit}) *
                      </label>
                      <input
                        type="number"
                        step="0.1"
                        value={measurements.shoulder || ''}
                        onChange={(e) =>
                          handleMeasurementChange('shoulder', parseFloat(e.target.value) || 0)
                        }
                        className="w-full bg-white border border-neutral-300 rounded px-3 py-2 text-xs text-neutral-900 focus:outline-none focus:border-neutral-900"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-neutral-700 mb-1">
                        Chest ({unit}) *
                      </label>
                      <input
                        type="number"
                        step="0.1"
                        value={measurements.chest || ''}
                        onChange={(e) =>
                          handleMeasurementChange('chest', parseFloat(e.target.value) || 0)
                        }
                        className="w-full bg-white border border-neutral-300 rounded px-3 py-2 text-xs text-neutral-900 focus:outline-none focus:border-neutral-900"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-neutral-700 mb-1">
                        Neck ({unit})
                      </label>
                      <input
                        type="number"
                        step="0.1"
                        value={measurements.neck || ''}
                        onChange={(e) =>
                          handleMeasurementChange('neck', parseFloat(e.target.value) || 0)
                        }
                        className="w-full bg-white border border-neutral-300 rounded px-3 py-2 text-xs text-neutral-900 focus:outline-none focus:border-neutral-900"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-neutral-700 mb-1">
                        Sleeve Length ({unit}) *
                      </label>
                      <input
                        type="number"
                        step="0.1"
                        value={measurements.sleeveLength || ''}
                        onChange={(e) =>
                          handleMeasurementChange('sleeveLength', parseFloat(e.target.value) || 0)
                        }
                        className="w-full bg-white border border-neutral-300 rounded px-3 py-2 text-xs text-neutral-900 focus:outline-none focus:border-neutral-900"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-neutral-700 mb-1">
                        Top / Shirt Length ({unit}) *
                      </label>
                      <input
                        type="number"
                        step="0.1"
                        value={measurements.garmentLength || ''}
                        onChange={(e) =>
                          handleMeasurementChange('garmentLength', parseFloat(e.target.value) || 0)
                        }
                        className="w-full bg-white border border-neutral-300 rounded px-3 py-2 text-xs text-neutral-900 focus:outline-none focus:border-neutral-900"
                      />
                    </div>

                    {garmentType === 'agbada' && (
                      <div>
                        <label className="block text-[11px] font-semibold text-neutral-700 mb-1">
                          Agbada Wingspan ({unit}) *
                        </label>
                        <input
                          type="number"
                          step="0.1"
                          value={measurements.agbadaSpan || ''}
                          onChange={(e) =>
                            handleMeasurementChange('agbadaSpan', parseFloat(e.target.value) || 0)
                          }
                          className="w-full bg-white border border-neutral-300 rounded px-3 py-2 text-xs text-neutral-900 focus:outline-none focus:border-neutral-900"
                        />
                      </div>
                    )}

                    <div>
                      <label className="block text-[11px] font-semibold text-neutral-700 mb-1">
                        Trouser Waist ({unit}) *
                      </label>
                      <input
                        type="number"
                        step="0.1"
                        value={measurements.waist || ''}
                        onChange={(e) =>
                          handleMeasurementChange('waist', parseFloat(e.target.value) || 0)
                        }
                        className="w-full bg-white border border-neutral-300 rounded px-3 py-2 text-xs text-neutral-900 focus:outline-none focus:border-neutral-900"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-neutral-700 mb-1">
                        Trouser Length ({unit}) *
                      </label>
                      <input
                        type="number"
                        step="0.1"
                        value={measurements.trouserLength || ''}
                        onChange={(e) =>
                          handleMeasurementChange('trouserLength', parseFloat(e.target.value) || 0)
                        }
                        className="w-full bg-white border border-neutral-300 rounded px-3 py-2 text-xs text-neutral-900 focus:outline-none focus:border-neutral-900"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-neutral-700 mb-1">
                        Thigh ({unit})
                      </label>
                      <input
                        type="number"
                        step="0.1"
                        value={measurements.thigh || ''}
                        onChange={(e) =>
                          handleMeasurementChange('thigh', parseFloat(e.target.value) || 0)
                        }
                        className="w-full bg-white border border-neutral-300 rounded px-3 py-2 text-xs text-neutral-900 focus:outline-none focus:border-neutral-900"
                      />
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* STEP 3: PREFERENCES & CLIENT CONTACT */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-bold text-neutral-900 uppercase tracking-wider mb-1">
                    3. Fabric, Colour & Client Details
                  </h3>
                  <p className="text-xs text-neutral-500">
                    Select your preferred mill textiles and specify your delivery destination.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-semibold text-neutral-700 mb-1">
                      Fabric Quality *
                    </label>
                    <select
                      value={fabricPreference}
                      onChange={(e) => setFabricPreference(e.target.value)}
                      className="w-full bg-white border border-neutral-300 rounded px-3 py-2 text-xs text-neutral-900 focus:outline-none focus:border-neutral-900"
                    >
                      <option value="Super 160s Italian Cashmere Wool">
                        Super 160s Italian Cashmere Wool (Crease-Free)
                      </option>
                      <option value="100% Irish Linen">100% Crisp Irish Linen</option>
                      <option value="Heavyweight Swiss Damask Brocade">
                        Heavyweight Swiss Damask Brocade (Ceremonial)
                      </option>
                      <option value="Royal Voile & Cotton Blend">
                        Royal Voile & Cotton Blend (Breathable)
                      </option>
                      <option value="Full-Grain Italian Calfskin Leather">
                        Full-Grain Italian Calfskin Leather (For Shoes)
                      </option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-neutral-700 mb-1">
                      Colour & Thread Tone *
                    </label>
                    <input
                      type="text"
                      value={colorPreference}
                      onChange={(e) => setColorPreference(e.target.value)}
                      placeholder="e.g. Obsidian Black with Gold embroidery"
                      className="w-full bg-white border border-neutral-300 rounded px-3 py-2 text-xs text-neutral-900 focus:outline-none focus:border-neutral-900"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-neutral-700 mb-1">
                      Requested Completion Date *
                    </label>
                    <input
                      type="date"
                      value={requestedDate}
                      onChange={(e) => setRequestedDate(e.target.value)}
                      className="w-full bg-white border border-neutral-300 rounded px-3 py-2 text-xs text-neutral-900 focus:outline-none focus:border-neutral-900"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-neutral-700 mb-1">
                      Quantity of Outfits
                    </label>
                    <input
                      type="number"
                      min={1}
                      max={10}
                      value={quantity}
                      onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                      className="w-full bg-white border border-neutral-300 rounded px-3 py-2 text-xs text-neutral-900 focus:outline-none focus:border-neutral-900"
                    />
                  </div>
                </div>

                {/* Client Contact Info */}
                <div className="pt-4 border-t border-neutral-100 space-y-3">
                  <span className="text-xs font-bold text-neutral-900 uppercase tracking-wider block">
                    Contact & Delivery Location
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-semibold text-neutral-700 mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={clientName}
                        onChange={(e) => setClientName(e.target.value)}
                        placeholder="e.g. Babatunde Adeleke"
                        className="w-full bg-white border border-neutral-300 rounded px-3 py-2 text-xs text-neutral-900 focus:outline-none focus:border-neutral-900"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-neutral-700 mb-1">
                        WhatsApp / Phone *
                      </label>
                      <input
                        type="tel"
                        required
                        value={clientPhone}
                        onChange={(e) => setClientPhone(e.target.value)}
                        placeholder="+234 803 123 4567"
                        className="w-full bg-white border border-neutral-300 rounded px-3 py-2 text-xs text-neutral-900 focus:outline-none focus:border-neutral-900"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-neutral-700 mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={clientEmail}
                        onChange={(e) => setClientEmail(e.target.value)}
                        placeholder="client@domain.com"
                        className="w-full bg-white border border-neutral-300 rounded px-3 py-2 text-xs text-neutral-900 focus:outline-none focus:border-neutral-900"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-neutral-700 mb-1">
                        State *
                      </label>
                      <input
                        type="text"
                        required
                        value={deliveryState}
                        onChange={(e) => setDeliveryState(e.target.value)}
                        placeholder="e.g. Akwa Ibom (Uyo) / Cross River (Calabar) / Rivers (Port-Harcourt)"
                        className="w-full bg-white border border-neutral-300 rounded px-3 py-2 text-xs text-neutral-900 focus:outline-none focus:border-neutral-900"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-[11px] font-semibold text-neutral-700 mb-1">
                        Delivery Street Address
                      </label>
                      <input
                        type="text"
                        value={deliveryAddress}
                        onChange={(e) => setDeliveryAddress(e.target.value)}
                        placeholder="House, Street, Area / Estate"
                        className="w-full bg-white border border-neutral-300 rounded px-3 py-2 text-xs text-neutral-900 focus:outline-none focus:border-neutral-900"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 4: ORDER REVIEW */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-bold text-neutral-900 uppercase tracking-wider mb-1">
                    4. Review Custom Order Summary
                  </h3>
                  <p className="text-xs text-neutral-500">
                    Verify your reference, measurements, and preferences before submission.
                  </p>
                </div>

                <div className="bg-neutral-50 border border-neutral-200 rounded-lg p-5 space-y-4 text-xs">
                  {/* Selected reference thumbnail */}
                  <div className="flex gap-4 items-center border-b border-neutral-200 pb-4">
                    <img
                      src={
                        designSource === 'upload'
                          ? uploadedImage || ASSETS.logoGold
                          : selectedProduct?.images[0]
                      }
                      alt="Style Reference"
                      className="w-20 h-24 object-cover rounded bg-neutral-200 border border-neutral-300 shrink-0"
                    />
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-amber-600 block">
                        {garmentType.replace('-', ' ')}
                      </span>
                      <h4 className="text-sm font-bold text-neutral-900">
                        {designSource === 'upload'
                          ? 'Customer Provided Style Reference'
                          : selectedProduct?.name}
                      </h4>
                      {modifications && (
                        <p className="text-xs text-neutral-600 mt-1 italic">
                          &ldquo;{modifications}&rdquo;
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Measurements Summary Grid */}
                  <div>
                    <span className="font-bold text-neutral-800 uppercase tracking-wider block mb-2">
                      Measurements ({unit})
                    </span>
                    {garmentType === 'corporate-shoe' ? (
                      <div className="grid grid-cols-2 gap-2 text-neutral-600">
                        <div>Size: <strong>EU {shoeSpecs.shoeSizeEU}</strong></div>
                        <div>Width: <strong>{shoeSpecs.footWidth}</strong></div>
                        {shoeSpecs.footLength && (
                          <div>Foot Length: <strong>{shoeSpecs.footLength} {unit}</strong></div>
                        )}
                        {shoeSpecs.monogramInitials && (
                          <div>Monogram: <strong>{shoeSpecs.monogramInitials}</strong></div>
                        )}
                      </div>
                    ) : (
                      <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 text-neutral-600">
                        <div>Shoulder: <strong>{measurements.shoulder}</strong></div>
                        <div>Chest: <strong>{measurements.chest}</strong></div>
                        <div>Neck: <strong>{measurements.neck || '-'}</strong></div>
                        <div>Sleeve: <strong>{measurements.sleeveLength}</strong></div>
                        <div>Top Length: <strong>{measurements.garmentLength}</strong></div>
                        <div>Waist: <strong>{measurements.waist}</strong></div>
                        <div>Trouser Length: <strong>{measurements.trouserLength}</strong></div>
                        {garmentType === 'agbada' && (
                          <div>Wingspan: <strong>{measurements.agbadaSpan}</strong></div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Fabric and Destination */}
                  <div className="pt-2 border-t border-neutral-200 grid grid-cols-1 sm:grid-cols-2 gap-2 text-neutral-600">
                    <div>Fabric: <strong>{fabricPreference}</strong></div>
                    <div>Colour: <strong>{colorPreference}</strong></div>
                    <div>Target Date: <strong>{requestedDate}</strong></div>
                    <div>Recipient: <strong>{clientName || 'Valued Client'} ({clientPhone})</strong></div>
                    <div className="sm:col-span-2">Location: <strong>{deliveryAddress}, {deliveryState}</strong></div>
                  </div>

                  {/* Quoting Policy Reminder */}
                  <div className="bg-amber-100/60 p-3 rounded text-[11px] text-amber-900 border border-amber-300/60 flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                    <span>
                      <strong>Notice:</strong> This submission does not charge your card. Our master tailor will review fabric yardage, pattern difficulty, and embroidery details, and generate a bespoke quotation for your authorization.
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Footer Navigation Controls */}
        {!submittedOrderId && (
          <div className="p-4 bg-neutral-50 border-t border-neutral-200 flex items-center justify-between">
            {currentStep > 1 ? (
              <button
                type="button"
                onClick={() => setCurrentStep((s) => (s - 1) as any)}
                className="py-2 px-4 border border-neutral-300 text-neutral-700 text-xs font-semibold rounded hover:bg-neutral-100 flex items-center gap-1 transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Previous Step</span>
              </button>
            ) : (
              <div />
            )}

            {currentStep < 4 ? (
              <button
                type="button"
                onClick={() => {
                  if (currentStep === 1 && designSource === 'upload' && !uploadedImage) {
                    setUploadError('Please select an image file to proceed.');
                    return;
                  }
                  setCurrentStep((s) => (s + 1) as any);
                }}
                className="py-2.5 px-6 bg-neutral-900 hover:bg-black text-white text-xs font-bold uppercase tracking-wider rounded flex items-center gap-1.5 transition-colors"
              >
                <span>Continue</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="button"
                disabled={isSubmitting}
                onClick={handleSubmitCustomOrder}
                className="py-2.5 px-6 bg-amber-500 hover:bg-amber-400 text-neutral-950 text-xs font-bold uppercase tracking-wider rounded shadow-md flex items-center gap-1.5 transition-colors disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span>Submitting to Atelier...</span>
                ) : (
                  <>
                    <FileCheck className="w-4 h-4 text-neutral-950" />
                    <span>Submit For Master Tailor Quotation</span>
                  </>
                )}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
