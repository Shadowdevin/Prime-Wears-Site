import React, { useState, useEffect, useRef } from 'react';
import { SHOWROOM_MANNEQUINS } from '../../data/products';
import { ASSETS } from '../../data/assets';
import { ShowroomMannequin, Product } from '../../types';
import { useCart } from '../../context/CartContext';
import {
  Play,
  Pause,
  RotateCw,
  Sun,
  Moon,
  Sparkles,
  ShoppingBag,
  Eye,
  Sliders,
  ChevronLeft,
  ChevronRight,
  Maximize2
} from 'lucide-react';

interface ShowroomEngineProps {
  onSelectProductById: (productId: string) => void;
  onScrollToCatalog: () => void;
  onExploreNewArrivals: () => void;
}

export const ShowroomEngine: React.FC<ShowroomEngineProps> = ({
  onSelectProductById,
  onScrollToCatalog,
  onExploreNewArrivals
}) => {
  const { addToCart } = useCart();

  // Showroom View Mode: 'runway' (wide walking glide) | 'spotlight' (focused model turntable)
  const [viewMode, setViewMode] = useState<'runway' | 'spotlight'>('runway');
  const [isPlayingMotion, setIsPlayingMotion] = useState(true);
  const [activeModelIndex, setActiveModelIndex] = useState(0);
  const [rotationAngle, setRotationAngle] = useState(0); // 0 = front, 90 = side, 180 = back, 270 = angle
  const [lightingPreset, setLightingPreset] = useState<'pearl' | 'ash' | 'warm'>('pearl');
  const [reducedMotion, setReducedMotion] = useState(false);
  const [runwayOffset, setRunwayOffset] = useState(0);

  // Check for prefers-reduced-motion
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) {
      setReducedMotion(true);
      setIsPlayingMotion(false);
    }
  }, []);

  // Runway subtle smooth motion ticker
  useEffect(() => {
    if (!isPlayingMotion || reducedMotion || viewMode !== 'runway') return;

    const interval = setInterval(() => {
      setRunwayOffset((prev) => (prev >= 100 ? 0 : prev + 0.15));
    }, 50);

    return () => clearInterval(interval);
  }, [isPlayingMotion, reducedMotion, viewMode]);

  const activeMannequin: ShowroomMannequin = SHOWROOM_MANNEQUINS[activeModelIndex] || SHOWROOM_MANNEQUINS[0];

  const handleNextModel = () => {
    setActiveModelIndex((idx) => (idx + 1) % SHOWROOM_MANNEQUINS.length);
    setRotationAngle(0);
  };

  const handlePrevModel = () => {
    setActiveModelIndex((idx) => (idx - 1 + SHOWROOM_MANNEQUINS.length) % SHOWROOM_MANNEQUINS.length);
    setRotationAngle(0);
  };

  const handleRotateTurntable = () => {
    setRotationAngle((deg) => (deg + 90) % 360);
  };

  return (
    <div
      className={`relative w-full overflow-hidden transition-colors duration-700 select-none ${
        lightingPreset === 'pearl'
          ? 'bg-[#f4f4f7] text-neutral-900'
          : lightingPreset === 'ash'
          ? 'bg-[#e5e5ea] text-neutral-900'
          : 'bg-[#ede8df] text-neutral-900'
      }`}
    >
      {/* Studio Floor Grid & Lighting Atmosphere */}
      <div className="absolute inset-0 bg-showroom-grid opacity-30 pointer-events-none" />
      <div className="absolute top-0 inset-x-0 h-48 bg-gradient-to-b from-white/80 via-white/40 to-transparent pointer-events-none" />
      <div className="absolute bottom-0 inset-x-0 h-36 bg-gradient-to-t from-black/5 to-transparent pointer-events-none" />

      {/* Showroom Ambient Spotlight Ring */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[900px] h-[550px] bg-white/70 rounded-full blur-3xl pointer-events-none" />

      {/* Main Hero Header Bar */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-14 pb-4">
        <div className="max-w-2xl">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xs uppercase tracking-[0.25em] font-bold text-neutral-700">
              Prime Wears Showroom 01
            </span>
            <span className="text-neutral-400">·</span>
            <span className="text-xs uppercase tracking-wider text-amber-600 font-semibold flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" />
              Moving Virtual Mannequins
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold font-serif-luxury tracking-tight text-neutral-950 uppercase leading-none">
            FASHION THAT DEFINES YOUR PRESENCE.
          </h1>

          <p className="text-sm sm:text-base text-neutral-600 mt-4 leading-relaxed font-normal">
            Discover contemporary essentials designed for confidence, comfort and effortless style. High-gauge knit polos, heavy French terry fleece, and tactical tailored joggers.
          </p>

          <div className="flex flex-wrap items-center gap-3 mt-6">
            <button
              onClick={onScrollToCatalog}
              className="py-3 px-6 bg-neutral-950 hover:bg-black text-white text-xs font-bold uppercase tracking-wider rounded-md shadow-lg transition-all"
            >
              Shop The Collection
            </button>
            <button
              onClick={onExploreNewArrivals}
              className="py-3 px-6 bg-white hover:bg-neutral-50 text-neutral-900 border border-neutral-300 text-xs font-bold uppercase tracking-wider rounded-md shadow-xs transition-all"
            >
              Explore New Arrivals
            </button>
          </div>
        </div>
      </div>

      {/* Showroom Interactive Stage Area */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Showroom Controls Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-3 bg-white/80 backdrop-blur-md p-3 rounded-lg border border-neutral-200/90 shadow-sm mb-4">
          <div className="flex items-center gap-2 text-xs">
            <span className="font-bold text-neutral-800 uppercase tracking-wider text-[11px] mr-1">
              Studio Mode:
            </span>
            <button
              onClick={() => setViewMode('runway')}
              className={`px-3 py-1.5 rounded text-xs font-semibold transition-colors ${
                viewMode === 'runway'
                  ? 'bg-neutral-950 text-white shadow-xs'
                  : 'text-neutral-600 hover:bg-neutral-100'
              }`}
            >
              Runway Showcase (8 Mannequins)
            </button>
            <button
              onClick={() => setViewMode('spotlight')}
              className={`px-3 py-1.5 rounded text-xs font-semibold transition-colors ${
                viewMode === 'spotlight'
                  ? 'bg-neutral-950 text-white shadow-xs'
                  : 'text-neutral-600 hover:bg-neutral-100'
              }`}
            >
              360° Mannequin Turntable
            </button>
          </div>

          <div className="flex items-center gap-3 text-xs">
            {/* Play/Pause Motion */}
            <button
              onClick={() => setIsPlayingMotion(!isPlayingMotion)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-neutral-100 hover:bg-neutral-200 text-neutral-800 font-medium transition-colors"
              title={isPlayingMotion ? 'Pause Showroom Movement' : 'Resume Showroom Movement'}
            >
              {isPlayingMotion ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              <span>{isPlayingMotion ? 'Pause Motion' : 'Play Walk'}</span>
            </button>

            {/* Lighting Preset */}
            <div className="hidden sm:flex items-center bg-neutral-100 p-0.5 rounded border border-neutral-200">
              <button
                onClick={() => setLightingPreset('pearl')}
                className={`px-2 py-1 rounded text-[11px] font-semibold transition-colors ${
                  lightingPreset === 'pearl' ? 'bg-white text-neutral-900 shadow-xs' : 'text-neutral-500'
                }`}
              >
                Pearl Grey
              </button>
              <button
                onClick={() => setLightingPreset('ash')}
                className={`px-2 py-1 rounded text-[11px] font-semibold transition-colors ${
                  lightingPreset === 'ash' ? 'bg-white text-neutral-900 shadow-xs' : 'text-neutral-500'
                }`}
              >
                Studio Ash
              </button>
              <button
                onClick={() => setLightingPreset('warm')}
                className={`px-2 py-1 rounded text-[11px] font-semibold transition-colors ${
                  lightingPreset === 'warm' ? 'bg-white text-neutral-900 shadow-xs' : 'text-neutral-500'
                }`}
              >
                Warm Atelier
              </button>
            </div>

            {/* Reduced motion toggle */}
            <button
              onClick={() => {
                setReducedMotion(!reducedMotion);
                if (!reducedMotion) setIsPlayingMotion(false);
              }}
              className={`px-2.5 py-1.5 rounded text-[11px] font-semibold border ${
                reducedMotion
                  ? 'bg-amber-100 border-amber-300 text-amber-900'
                  : 'bg-white border-neutral-200 text-neutral-600 hover:bg-neutral-50'
              }`}
            >
              {reducedMotion ? 'Reduced Motion: ON' : 'Reduced Motion: OFF'}
            </button>
          </div>
        </div>

        {/* VIEW MODE 1: RUNWAY SHOWCASE WITH 8 MANNEQUINS */}
        {viewMode === 'runway' && (
          <div className="relative rounded-xl overflow-hidden border border-neutral-200/90 bg-neutral-200/60 shadow-xl">
            {/* Virtual Stage Container */}
            <div className="relative aspect-[16/9] min-h-[420px] max-h-[640px] w-full flex items-center justify-center overflow-hidden">
              {/* Floor Plane Reflection */}
              <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-neutral-300/80 to-transparent" />
              <div className="absolute bottom-6 inset-x-12 h-1 bg-neutral-400/30 rounded-full blur-xs" />

              {/* The Reference Mannequins Showcase Asset */}
              <div
                className="relative w-full h-full flex items-center justify-center transition-transform duration-700 ease-out"
                style={{
                  transform:
                    isPlayingMotion && !reducedMotion
                      ? `translateX(${Math.sin((runwayOffset * Math.PI) / 50) * 12}px) scale(1.01)`
                      : 'none'
                }}
              >
                <img
                  src={ASSETS.showroomMannequinsAll}
                  alt="Prime Wears Virtual Showroom Mannequins in Motion"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover sm:object-contain object-bottom drop-shadow-2xl"
                />

                {/* Interactive Hotspot Indicators for Mannequins */}
                <div className="absolute inset-0 pointer-events-none">
                  {SHOWROOM_MANNEQUINS.map((model, idx) => (
                    <button
                      key={model.id}
                      onClick={() => {
                        setActiveModelIndex(idx);
                        setViewMode('spotlight');
                      }}
                      className="pointer-events-auto absolute group focus:outline-none"
                      style={{
                        left: `${model.positionX}%`,
                        top: idx < 4 ? '35%' : '60%'
                      }}
                      aria-label={`Inspect ${model.outfitTitle}`}
                    >
                      <div className="relative flex items-center justify-center">
                        <span className="w-5 h-5 rounded-full bg-neutral-900/90 text-white text-[10px] font-bold flex items-center justify-center shadow-lg group-hover:scale-125 transition-transform border border-white/60">
                          +
                        </span>
                        {/* Hover Tooltip Card */}
                        <div className="absolute bottom-7 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none bg-neutral-950 text-white p-2.5 rounded shadow-xl text-left whitespace-nowrap min-w-[170px] z-30">
                          <span className="text-[10px] uppercase font-bold text-amber-400 block">
                            {model.gender.toUpperCase()} MODEL
                          </span>
                          <span className="text-xs font-semibold block">{model.outfitTitle}</span>
                          <span className="text-xs font-semibold text-amber-300 block mt-0.5">
                            Price Coming Soon
                          </span>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Runway Model Carousel Strip */}
            <div className="p-4 bg-white/95 border-t border-neutral-200/90 flex items-center gap-3 overflow-x-auto">
              <span className="text-[11px] font-bold text-neutral-500 uppercase tracking-widest whitespace-nowrap mr-2">
                Showroom Roster:
              </span>
              {SHOWROOM_MANNEQUINS.map((m, idx) => (
                <button
                  key={m.id}
                  onClick={() => {
                    setActiveModelIndex(idx);
                    setViewMode('spotlight');
                  }}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-md border border-neutral-200 hover:border-neutral-400 bg-neutral-50 text-left whitespace-nowrap transition-colors shrink-0"
                >
                  <span
                    className="w-3 h-3 rounded-full border border-neutral-300"
                    style={{ backgroundColor: m.colorHex }}
                  />
                  <div className="text-[11px]">
                    <span className="font-bold text-neutral-800 block">{m.colorName}</span>
                    <span className="text-amber-700 text-[10px] font-semibold">Price Coming Soon</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* VIEW MODE 2: 360° TURNTABLE & OUTFIT INSPECTION */}
        {viewMode === 'spotlight' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 bg-white rounded-xl border border-neutral-200/90 shadow-xl overflow-hidden p-6 sm:p-8">
            {/* Turntable Mannequin Stage (7 Cols) */}
            <div className="lg:col-span-7 bg-[#ededf2] rounded-lg p-6 relative flex flex-col items-center justify-between min-h-[460px] border border-neutral-200">
              {/* Studio Backdrop Ring */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full bg-white/80 blur-2xl pointer-events-none" />

              {/* Angle / Rotation Badge */}
              <div className="w-full flex items-center justify-between z-10 text-xs">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-neutral-800 uppercase tracking-wider text-[11px]">
                    {activeMannequin.name}
                  </span>
                  <span className="text-neutral-400">·</span>
                  <span className="text-neutral-600 capitalize">
                    {rotationAngle === 0
                      ? 'Front View'
                      : rotationAngle === 90
                      ? 'Right Profile'
                      : rotationAngle === 180
                      ? 'Back Drape'
                      : 'Left Angle'}
                  </span>
                </div>

                <button
                  onClick={handleRotateTurntable}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-white hover:bg-neutral-100 text-neutral-800 font-bold shadow-xs transition-colors"
                >
                  <RotateCw className="w-3.5 h-3.5 text-amber-600" />
                  <span>Rotate 90° ({rotationAngle}°)</span>
                </button>
              </div>

              {/* Mannequin Graphic Representation */}
              <div
                className="relative my-4 flex items-center justify-center transition-all duration-500 ease-out"
                style={{
                  transform: `rotateY(${rotationAngle}deg)`,
                  transformStyle: 'preserve-3d'
                }}
              >
                {/* Visual Representation of the garment on turntable */}
                <div className="relative w-64 sm:w-80 aspect-[3/4] flex items-center justify-center">
                  <img
                    src={
                      activeMannequin.colorHex === '#ffffff'
                        ? ASSETS.poloWhite
                        : activeMannequin.colorHex === '#dfceb9' || activeMannequin.colorHex === '#ded1bf'
                        ? ASSETS.poloBeige
                        : activeMannequin.colorHex === '#141416' || activeMannequin.colorHex === '#121214'
                        ? ASSETS.poloBlack
                        : ASSETS.showroomMannequinsAll
                    }
                    alt={activeMannequin.outfitTitle}
                    className="w-full h-full object-contain drop-shadow-xl"
                  />
                  {/* Subtle pedestal underneath */}
                  <div className="absolute -bottom-4 w-48 h-6 bg-neutral-300/70 rounded-full blur-xs" />
                </div>
              </div>

              {/* Prev / Next Model Navigation */}
              <div className="w-full flex items-center justify-between z-10 pt-2">
                <button
                  onClick={handlePrevModel}
                  className="flex items-center gap-1 px-3 py-1.5 rounded bg-white text-neutral-800 text-xs font-semibold shadow-xs hover:bg-neutral-100 transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Previous Model</span>
                </button>

                <div className="flex items-center gap-1">
                  {SHOWROOM_MANNEQUINS.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveModelIndex(i)}
                      className={`w-2 h-2 rounded-full transition-all ${
                        activeModelIndex === i ? 'w-5 bg-neutral-900' : 'bg-neutral-300'
                      }`}
                    />
                  ))}
                </div>

                <button
                  onClick={handleNextModel}
                  className="flex items-center gap-1 px-3 py-1.5 rounded bg-white text-neutral-800 text-xs font-semibold shadow-xs hover:bg-neutral-100 transition-colors"
                >
                  <span>Next Model</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Mannequin Specs & Purchase Module (5 Cols) */}
            <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
              <div>
                <div className="flex items-center justify-between text-xs text-neutral-500 mb-2">
                  <span className="uppercase tracking-widest font-bold text-amber-600">
                    Prime Showroom Ensemble
                  </span>
                  <span className="text-emerald-700 font-semibold">Available for Order</span>
                </div>

                <h2 className="text-2xl font-bold text-neutral-900 font-serif-luxury leading-snug">
                  {activeMannequin.outfitTitle}
                </h2>

                <div className="mt-2 flex items-baseline gap-2">
                  <span className="text-sm font-bold uppercase tracking-wider text-amber-800 bg-amber-50 px-3 py-1 rounded border border-amber-200">
                    Price Coming Soon
                  </span>
                  <span className="text-xs text-neutral-500">
                    (Includes Free Delivery in Nigeria)
                  </span>
                </div>

                <p className="text-xs text-neutral-600 mt-4 leading-relaxed">
                  {activeMannequin.description} Crafted with Prime Wears bespoke attention to knit tension, double-needle seams, and anti-shrinkage pre-wash treatment.
                </p>

                {/* Color Swatch */}
                <div className="mt-5 space-y-2">
                  <span className="text-xs font-semibold text-neutral-700 block">
                    Showroom Color: <strong className="text-neutral-900">{activeMannequin.colorName}</strong>
                  </span>
                  <div className="flex items-center gap-2">
                    <span
                      className="w-6 h-6 rounded-full border-2 border-neutral-900 shadow-sm"
                      style={{ backgroundColor: activeMannequin.colorHex }}
                    />
                  </div>
                </div>

                {/* Sizing grid */}
                <div className="mt-5 space-y-2">
                  <span className="text-xs font-semibold text-neutral-700 block">
                    Available Sizes:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {activeMannequin.availableSizes.map((sz) => (
                      <span
                        key={sz}
                        className="px-3 py-1 bg-neutral-100 rounded text-xs font-bold text-neutral-800"
                      >
                        {sz}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="space-y-3 pt-4 border-t border-neutral-200">
                <button
                  onClick={() => onSelectProductById(activeMannequin.productRefId)}
                  className="w-full py-3 bg-neutral-950 hover:bg-black text-white font-bold text-xs uppercase tracking-wider rounded-md shadow-md flex items-center justify-center gap-2 transition-all"
                >
                  <Eye className="w-4 h-4 text-amber-400" />
                  <span>View Complete Garment Specifications</span>
                </button>

                <button
                  onClick={() => setViewMode('runway')}
                  className="w-full py-2.5 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 font-semibold text-xs uppercase tracking-wider rounded-md text-center transition-colors"
                >
                  Return to 8-Model Runway View
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
