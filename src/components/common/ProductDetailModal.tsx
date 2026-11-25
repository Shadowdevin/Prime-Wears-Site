import React, { useState, useRef, useEffect } from 'react';
import { Product } from '../../types';
import { useCart } from '../../context/CartContext';
import { 
  X, 
  Heart, 
  Shield, 
  Sparkles, 
  Check, 
  Scissors, 
  Ruler, 
  ArrowRight, 
  ArrowLeft,
  ChevronRight,
  ZoomIn, 
  ZoomOut, 
  Layers, 
  Maximize2,
  Info,
  RefreshCw
} from 'lucide-react';
import { getProductFabricProfile, FABRIC_TEXTURES, FabricTextureProfile } from '../../data/fabricTextures';
import { getProductCategoryInfo } from '../../utils/navigation';
import { WhatsAppIcon } from '../../config/whatsapp';
import { WhatsAppNumberSelectModal } from './WhatsAppNumberSelectModal';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onOpenCustomOrder?: (product: Product) => void;
  onOpenMeasurementGuide?: () => void;
  previousPageName?: string;
  onNavigateToCategory?: (route: string) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onOpenCustomOrder,
  onOpenMeasurementGuide,
  previousPageName,
  onNavigateToCategory
}) => {
  const { addToCart, isWishlisted, toggleWishlist } = useCart();

  if (!product) return null;

  const categoryInfo = getProductCategoryInfo(product);

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]?.name || '');
  const [selectedSize, setSelectedSize] = useState(product.sizes[0] || '');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'overview' | 'fabric' | 'sizing'>('overview');
  const [isWhatsAppModalOpen, setIsWhatsAppModalOpen] = useState(false);

  // Fabric Detail Zoom State
  const defaultProfile = getProductFabricProfile(product);
  const [selectedTextureKey, setSelectedTextureKey] = useState<string>(defaultProfile.id);
  const [isZoomActive, setIsZoomActive] = useState(false);
  const [zoomLevel, setZoomLevel] = useState<number>(defaultProfile.defaultZoom || 2.8);
  const [textureIntensity, setTextureIntensity] = useState<'subtle' | 'balanced' | 'intense'>('balanced');
  const [zoomMode, setZoomMode] = useState<'lens' | 'full'>('lens');
  const [mousePos, setMousePos] = useState({ x: 50, y: 40 });
  const [isHovering, setIsHovering] = useState(false);

  const imageContainerRef = useRef<HTMLDivElement>(null);
  const wishlisted = isWishlisted(product.id);

  // Update selected texture when product changes
  useEffect(() => {
    setSelectedTextureKey(getProductFabricProfile(product).id);
  }, [product]);

  // Handle keyboard Escape key to close modal and go back
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  // Prevent background body scrolling while modal is open
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  const activeTexture: FabricTextureProfile = FABRIC_TEXTURES[selectedTextureKey] || defaultProfile;

  const handleColorSelect = (colorName: string, imageIndex?: number) => {
    setSelectedColor(colorName);
    if (imageIndex !== undefined && product.images[imageIndex]) {
      setActiveImageIndex(imageIndex);
    }
  };

  const handleAddToCart = () => {
    addToCart(product, selectedColor, selectedSize, quantity);
  };

  // Mouse / Touch movement tracking for magnification loupe
  const handlePointerMove = (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
    if (!imageContainerRef.current) return;
    const rect = imageContainerRef.current.getBoundingClientRect();
    
    let clientX = 0;
    let clientY = 0;

    if ('touches' in e && e.touches.length > 0) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else if ('clientX' in e) {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    const x = Math.max(0, Math.min(100, ((clientX - rect.left) / rect.width) * 100));
    const y = Math.max(0, Math.min(100, ((clientY - rect.top) / rect.height) * 100));

    setMousePos({ x, y });
  };

  const getIntensityOpacity = () => {
    switch (textureIntensity) {
      case 'subtle': return 'opacity-35';
      case 'balanced': return 'opacity-70';
      case 'intense': return 'opacity-95';
      default: return 'opacity-70';
    }
  };

  const currentImage = product.images[activeImageIndex] || product.images[0];

  return (
    <div 
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fadeIn"
    >
      <div className="relative bg-white w-full max-w-5xl rounded-xl shadow-2xl overflow-hidden border border-neutral-300 my-8">
        {/* Modal Top Navigation Header Bar */}
        <div className="bg-neutral-50 px-4 sm:px-6 py-3 border-b border-neutral-200 flex items-center justify-between gap-3 text-xs">
          {/* Back Button with Arrow and Category / Previous Page Context */}
          <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
            <button
              onClick={onClose}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white hover:bg-neutral-900 text-neutral-800 hover:text-white border border-neutral-300 hover:border-neutral-900 font-bold text-xs uppercase tracking-wider transition-all shadow-2xs group"
              title="Go back to previous page (Esc)"
            >
              <ArrowLeft className="w-4 h-4 text-amber-600 group-hover:text-amber-400 group-hover:-translate-x-0.5 transition-transform" />
              <span>Back to {previousPageName || categoryInfo.name}</span>
            </button>

            {/* Breadcrumbs Trail */}
            <nav aria-label="Breadcrumb" className="hidden md:flex items-center gap-1.5 text-neutral-500 font-medium">
              <button
                onClick={() => {
                  onClose();
                  onNavigateToCategory?.('home');
                }}
                className="hover:text-amber-600 transition-colors"
              >
                Home
              </button>
              <ChevronRight className="w-3.5 h-3.5 text-neutral-400" />
              <button
                onClick={() => {
                  onClose();
                  onNavigateToCategory?.(categoryInfo.route);
                }}
                className="hover:text-amber-600 transition-colors"
              >
                {categoryInfo.name}
              </button>
              <ChevronRight className="w-3.5 h-3.5 text-neutral-400" />
              <span className="text-neutral-900 font-semibold line-clamp-1 max-w-[200px]">
                {product.name}
              </span>
            </nav>
          </div>

          {/* Right Side: Keyboard Shortcut Hint & Close Button */}
          <div className="flex items-center gap-3">
            <span className="hidden sm:inline-flex items-center gap-1 text-[11px] text-neutral-400">
              <span>Press</span>
              <kbd className="px-1.5 py-0.5 rounded bg-white border border-neutral-300 text-neutral-600 font-mono text-[10px] shadow-2xs">Esc</kbd>
              <span>to go back</span>
            </span>

            <button
              onClick={onClose}
              aria-label="Close product view"
              className="p-1.5 rounded-lg text-neutral-500 hover:text-neutral-950 hover:bg-neutral-200/80 transition-colors flex items-center gap-1"
              title="Close and return (Esc)"
            >
              <span className="hidden sm:inline text-xs font-medium">Close</span>
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[640px]">
          {/* Left Column: Gallery & Interactive Fabric Zoom Station (7 cols) */}
          <div className="lg:col-span-7 bg-neutral-900 text-white p-5 sm:p-6 flex flex-col justify-between relative select-none">
            
            {/* Top Toolbar: Fabric Zoom Controls & Mode Switcher */}
            <div className="flex flex-wrap items-center justify-between gap-2 mb-3 z-20">
              <div className="flex items-center gap-1.5 bg-neutral-800/90 backdrop-blur-md border border-neutral-700 rounded-lg p-1">
                <button
                  onClick={() => setIsZoomActive(!isZoomActive)}
                  className={`px-3 py-1.5 rounded-md text-xs font-semibold flex items-center gap-1.5 transition-all ${
                    isZoomActive 
                      ? 'bg-amber-400 text-neutral-950 shadow-md font-bold' 
                      : 'bg-neutral-700 text-neutral-200 hover:text-white hover:bg-neutral-600'
                  }`}
                  title="Toggle High-Resolution Fabric Weave Macro Zoom"
                >
                  <ZoomIn className="w-3.5 h-3.5" />
                  <span>{isZoomActive ? 'Macro Zoom Active' : 'Fabric Detail Zoom'}</span>
                </button>

                {isZoomActive && (
                  <>
                    <span className="h-4 w-px bg-neutral-700" />
                    <button
                      onClick={() => setZoomMode(zoomMode === 'lens' ? 'full' : 'lens')}
                      className="px-2.5 py-1 text-[11px] rounded text-neutral-300 hover:text-white hover:bg-neutral-700 flex items-center gap-1"
                      title={zoomMode === 'lens' ? 'Switch to Full Magnification Frame' : 'Switch to Circular Precision Loupe'}
                    >
                      <Maximize2 className="w-3 h-3 text-amber-400" />
                      <span>{zoomMode === 'lens' ? 'Loupe Lens' : 'Full Frame'}</span>
                    </button>
                  </>
                )}
              </div>

              {/* Magnification Level Indicator & Adjuster */}
              {isZoomActive && (
                <div className="flex items-center gap-1 bg-neutral-800/90 backdrop-blur-md border border-neutral-700 rounded-lg p-1 text-[11px]">
                  <span className="text-neutral-400 px-1.5 flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-amber-400" />
                    Scale:
                  </span>
                  {[2.0, 2.8, 3.6].map((scale) => (
                    <button
                      key={scale}
                      onClick={() => setZoomLevel(scale)}
                      className={`px-2 py-0.5 rounded font-mono font-bold transition-all ${
                        zoomLevel === scale
                          ? 'bg-amber-400 text-black'
                          : 'text-neutral-300 hover:bg-neutral-700'
                      }`}
                    >
                      {scale}x
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Main Image Frame with Interactive Zoom Loupe & Texture Overlay */}
            <div 
              ref={imageContainerRef}
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
              onMouseMove={handlePointerMove}
              onTouchStart={() => {
                setIsHovering(true);
                setIsZoomActive(true);
              }}
              onTouchMove={handlePointerMove}
              onTouchEnd={() => setIsHovering(false)}
              className={`relative aspect-[4/5] w-full rounded-lg overflow-hidden bg-neutral-950 border border-neutral-800 shadow-2xl ${
                isZoomActive ? 'cursor-crosshair' : 'cursor-zoom-in'
              }`}
              onClick={() => {
                if (!isZoomActive) setIsZoomActive(true);
              }}
            >
              {/* Normal Base Image */}
              <img
                src={currentImage}
                alt={product.name}
                referrerPolicy="no-referrer"
                className={`w-full h-full object-cover object-center transition-all duration-300 ${
                  isZoomActive && zoomMode === 'full' ? 'opacity-0' : 'opacity-100'
                }`}
              />

              {/* Full-Frame Macro Mode View */}
              {isZoomActive && zoomMode === 'full' && (
                <div 
                  className="absolute inset-0 overflow-hidden"
                  style={{
                    backgroundImage: `url(${currentImage})`,
                    backgroundPosition: `${mousePos.x}% ${mousePos.y}%`,
                    backgroundSize: `${zoomLevel * 100}%`,
                    backgroundRepeat: 'no-repeat'
                  }}
                >
                  {/* High-Resolution Micro Fabric Weave Texture Overlay */}
                  <div 
                    className={`absolute inset-0 pointer-events-none ${getIntensityOpacity()} transition-opacity`}
                    style={{
                      backgroundImage: `url("${activeTexture.svgPattern}")`,
                      backgroundSize: '24px 24px',
                      backgroundRepeat: 'repeat',
                      mixBlendMode: activeTexture.overlayBlendMode
                    }}
                  />

                  {/* Specular Thread Highlights & Luster Gradient */}
                  <div 
                    className="absolute inset-0 pointer-events-none opacity-40 mix-blend-color-dodge"
                    style={{
                      background: `radial-gradient(circle at ${mousePos.x}% ${mousePos.y}%, rgba(255,235,180,0.6) 0%, transparent 60%)`
                    }}
                  />
                </div>
              )}

              {/* Circular Precision Loupe Lens Mode */}
              {isZoomActive && zoomMode === 'lens' && isHovering && (
                <div
                  className="absolute pointer-events-none rounded-full shadow-[0_0_35px_rgba(0,0,0,0.8),0_0_0_3px_rgba(251,191,36,0.9),0_0_0_6px_rgba(0,0,0,0.4)] overflow-hidden z-30 transition-transform duration-75 ease-out"
                  style={{
                    width: '210px',
                    height: '210px',
                    left: `${mousePos.x}%`,
                    top: `${mousePos.y}%`,
                    transform: 'translate(-50%, -50%)',
                    backgroundImage: `url(${currentImage})`,
                    backgroundPosition: `${mousePos.x}% ${mousePos.y}%`,
                    backgroundSize: `${zoomLevel * 100}%`,
                    backgroundRepeat: 'no-repeat'
                  }}
                >
                  {/* High-Resolution SVG Fabric Pattern within Loupe */}
                  <div 
                    className={`absolute inset-0 ${getIntensityOpacity()}`}
                    style={{
                      backgroundImage: `url("${activeTexture.svgPattern}")`,
                      backgroundSize: '22px 22px',
                      backgroundRepeat: 'repeat',
                      mixBlendMode: activeTexture.overlayBlendMode
                    }}
                  />

                  {/* Tactile Thread Relief & Specular Glare */}
                  <div 
                    className="absolute inset-0 opacity-45 mix-blend-color-dodge"
                    style={{
                      background: 'radial-gradient(circle at 35% 35%, rgba(255,255,255,0.7) 0%, rgba(255,215,0,0.3) 40%, transparent 70%)'
                    }}
                  />

                  {/* Crosshair & Micro Measurement Scale inside lens */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-40">
                    <div className="w-10 h-px bg-amber-300" />
                    <div className="h-10 w-px bg-amber-300 absolute" />
                  </div>

                  {/* Lens HUD badge */}
                  <div className="absolute bottom-2 inset-x-0 text-center">
                    <span className="bg-neutral-950/85 backdrop-blur-xs text-amber-300 text-[9px] font-mono font-bold px-2 py-0.5 rounded-full border border-amber-400/40 tracking-wider">
                      {zoomLevel}x · {activeTexture.threadCount.split(' ')[0]}
                    </span>
                  </div>
                </div>
              )}

              {/* Bespoke Tag */}
              {product.isCustomizable && (
                <div className="absolute top-3 left-3 bg-neutral-900/90 text-amber-300 text-[10px] font-bold tracking-wider px-2.5 py-1 rounded flex items-center gap-1.5 uppercase border border-amber-400/30">
                  <Sparkles className="w-3 h-3 text-amber-400" />
                  <span>Bespoke Native Atelier</span>
                </div>
              )}

              {/* Fabric Inspection Active HUD Banner */}
              {isZoomActive ? (
                <div className="absolute bottom-3 inset-x-3 bg-neutral-950/90 backdrop-blur-md rounded-lg p-2.5 border border-amber-500/40 flex items-center justify-between z-20">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                    <div>
                      <p className="text-[11px] font-bold text-amber-200 tracking-wide leading-none">
                        {activeTexture.name}
                      </p>
                      <p className="text-[10px] text-neutral-400 font-mono mt-0.5">
                        {activeTexture.weaveType} · {activeTexture.weightGsm}
                      </p>
                    </div>
                  </div>
                  <span className="text-[10px] bg-amber-400/20 text-amber-300 font-semibold px-2 py-0.5 rounded border border-amber-400/30">
                    {zoomLevel}x Tactile Macro
                  </span>
                </div>
              ) : (
                <button
                  onClick={() => setIsZoomActive(true)}
                  className="absolute bottom-3 right-3 bg-neutral-950/85 hover:bg-neutral-900 backdrop-blur-md text-amber-300 hover:text-amber-200 text-xs font-semibold px-3 py-2 rounded-lg border border-neutral-700 hover:border-amber-400 transition-all flex items-center gap-2 shadow-lg"
                >
                  <ZoomIn className="w-4 h-4 text-amber-400" />
                  <span>Inspect Fabric Texture</span>
                </button>
              )}
            </div>

            {/* Bottom Controls: Thumbnail Selector & Native Material Switcher */}
            <div className="mt-4 space-y-3 z-10">
              {/* Product Thumbnail Selector */}
              {product.images.length > 1 && (
                <div className="flex items-center gap-2.5 overflow-x-auto pb-1">
                  <span className="text-[10px] font-mono uppercase text-neutral-400 tracking-wider shrink-0 mr-1">
                    Angles:
                  </span>
                  {product.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImageIndex(idx)}
                      className={`relative w-14 h-16 rounded border-2 overflow-hidden transition-all shrink-0 ${
                        activeImageIndex === idx
                          ? 'border-amber-400 scale-105 shadow-md shadow-amber-400/20'
                          : 'border-neutral-700 opacity-60 hover:opacity-100 hover:border-neutral-500'
                      }`}
                    >
                      <img src={img} alt={`View ${idx + 1}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}

              {/* Native Wear Texture Material Selector (Allows customer to inspect woven variations) */}
              <div className="pt-2 border-t border-neutral-800 flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-1.5 overflow-x-auto py-0.5">
                  <span className="text-[10px] text-neutral-400 uppercase font-mono tracking-wider flex items-center gap-1 mr-1">
                    <Layers className="w-3 h-3 text-amber-400" />
                    Texture Preset:
                  </span>
                  {Object.values(FABRIC_TEXTURES).map((tex) => (
                    <button
                      key={tex.id}
                      onClick={() => {
                        setSelectedTextureKey(tex.id);
                        if (!isZoomActive) setIsZoomActive(true);
                      }}
                      className={`px-2 py-1 rounded text-[10px] font-medium transition-all whitespace-nowrap ${
                        selectedTextureKey === tex.id
                          ? 'bg-amber-400 text-neutral-950 font-bold shadow-xs'
                          : 'bg-neutral-800 text-neutral-300 hover:bg-neutral-700 hover:text-white border border-neutral-700'
                      }`}
                    >
                      {tex.name.split(' ')[0]} {tex.name.split(' ')[1] || ''}
                    </button>
                  ))}
                </div>

                {/* Texture Intensity Stepper */}
                {isZoomActive && (
                  <div className="flex items-center gap-1 text-[10px] bg-neutral-800 rounded p-1 border border-neutral-700">
                    <span className="text-neutral-400 px-1">Relief:</span>
                    {(['subtle', 'balanced', 'intense'] as const).map((lvl) => (
                      <button
                        key={lvl}
                        onClick={() => setTextureIntensity(lvl)}
                        className={`capitalize px-1.5 py-0.5 rounded transition-all ${
                          textureIntensity === lvl
                            ? 'bg-amber-400 text-black font-bold'
                            : 'text-neutral-300 hover:text-white'
                        }`}
                      >
                        {lvl}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column: Contiguous Purchase, Specs & Fabric Detail Tabs (5 cols) */}
          <div className="lg:col-span-5 p-6 sm:p-7 flex flex-col justify-between bg-white text-neutral-900 overflow-y-auto max-h-[85vh]">
            <div>
              {/* Category & Status */}
              <div className="flex items-center justify-between text-xs text-neutral-500 mb-2">
                <span className="uppercase tracking-widest font-semibold text-neutral-600">
                  Prime {product.experience === 'native' ? 'Native Atelier' : 'Casual Swag'} · {product.category}
                </span>
                <span className="text-[11px] font-medium text-emerald-700 flex items-center gap-1 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  <Check className="w-3.5 h-3.5" />
                  {product.stockStatus === 'made_to_order' ? 'Handcrafted Upon Order' : 'Ready In Atelier'}
                </span>
              </div>

              {/* Title & Price */}
              <h2 className="text-2xl font-bold text-neutral-900 font-serif-luxury leading-tight">
                {product.name}
              </h2>

              <div className="flex items-center gap-3 mt-3">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-800 bg-amber-50 px-3 py-1 rounded border border-amber-300">
                  Price Coming Soon
                </span>
                <span className="text-xs text-neutral-500">
                  (Inclusive of bespoke packaging)
                </span>
              </div>

              {/* Description */}
              <p className="text-xs text-neutral-600 leading-relaxed mt-4">
                {product.description}
              </p>

              {/* Tab Navigation */}
              <div className="flex border-b border-neutral-200 mt-5 text-xs font-semibold">
                <button
                  onClick={() => setActiveTab('overview')}
                  className={`pb-2.5 mr-4 border-b-2 transition-colors flex items-center gap-1.5 ${
                    activeTab === 'overview'
                      ? 'border-neutral-950 text-neutral-950 font-bold'
                      : 'border-transparent text-neutral-500 hover:text-neutral-800'
                  }`}
                >
                  <span>Options</span>
                </button>
                <button
                  onClick={() => setActiveTab('fabric')}
                  className={`pb-2.5 mr-4 border-b-2 transition-colors flex items-center gap-1.5 ${
                    activeTab === 'fabric'
                      ? 'border-neutral-950 text-neutral-950 font-bold'
                      : 'border-transparent text-neutral-500 hover:text-neutral-800'
                  }`}
                >
                  <Sparkles className="w-3 h-3 text-amber-600" />
                  <span>Fabric & Weave</span>
                </button>
                <button
                  onClick={() => setActiveTab('sizing')}
                  className={`pb-2.5 border-b-2 transition-colors flex items-center gap-1.5 ${
                    activeTab === 'sizing'
                      ? 'border-neutral-950 text-neutral-950 font-bold'
                      : 'border-transparent text-neutral-500 hover:text-neutral-800'
                  }`}
                >
                  <Ruler className="w-3 h-3 text-neutral-500" />
                  <span>Sizing Guide</span>
                </button>
              </div>

              {/* Tab Contents */}
              <div className="mt-4">
                {activeTab === 'overview' && (
                  <div className="space-y-4">
                    {/* Color Swatches */}
                    <div>
                      <div className="flex justify-between items-center text-xs mb-2">
                        <span className="font-semibold text-neutral-700">
                          Selected Color: <span className="font-normal text-neutral-900">{selectedColor}</span>
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        {product.colors.map((c, i) => (
                          <button
                            key={i}
                            onClick={() => handleColorSelect(c.name, c.imageIndex)}
                            className={`p-0.5 rounded-full border-2 transition-all ${
                              selectedColor === c.name
                                ? 'border-neutral-900 scale-110 shadow-sm'
                                : 'border-neutral-300 hover:border-neutral-400'
                            }`}
                            title={c.name}
                          >
                            <span
                              className="w-5 h-5 rounded-full block border border-black/10"
                              style={{ backgroundColor: c.hex }}
                            />
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Size Selector */}
                    <div>
                      <div className="flex justify-between items-center text-xs mb-2">
                        <span className="font-semibold text-neutral-700">
                          Size: <span className="font-normal text-neutral-900">{selectedSize}</span>
                        </span>
                        {onOpenMeasurementGuide && (
                          <button
                            onClick={onOpenMeasurementGuide}
                            className="text-amber-800 hover:underline flex items-center gap-1 text-[11px] font-medium"
                          >
                            <Ruler className="w-3.5 h-3.5" />
                            <span>Measurement Guide</span>
                          </button>
                        )}
                      </div>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                        {product.sizes.map((s, idx) => (
                          <button
                            key={idx}
                            onClick={() => setSelectedSize(s)}
                            className={`py-2 px-2 text-xs font-semibold rounded border text-center transition-all ${
                              selectedSize === s
                                ? 'bg-neutral-950 text-white border-neutral-950 shadow-sm'
                                : 'bg-white text-neutral-700 border-neutral-200 hover:border-neutral-400'
                            }`}
                          >
                            {s}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Quantity Stepper */}
                    <div className="flex items-center gap-4 pt-1">
                      <span className="text-xs font-semibold text-neutral-700">Quantity:</span>
                      <div className="flex items-center border border-neutral-300 rounded overflow-hidden">
                        <button
                          onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                          className="px-3 py-1 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 text-sm font-bold"
                        >
                          -
                        </button>
                        <span className="px-4 py-1 text-xs font-bold text-neutral-900 tabular-nums">
                          {quantity}
                        </span>
                        <button
                          onClick={() => setQuantity((q) => q + 1)}
                          className="px-3 py-1 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 text-sm font-bold"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'fabric' && (
                  <div className="text-xs space-y-3">
                    {/* Active Fabric Texture Card */}
                    <div className="bg-neutral-900 text-white p-3.5 rounded-lg border border-neutral-800 relative overflow-hidden">
                      <div 
                        className="absolute inset-0 opacity-20 pointer-events-none"
                        style={{
                          backgroundImage: `url("${activeTexture.svgPattern}")`,
                          backgroundSize: '24px 24px',
                          mixBlendMode: 'overlay'
                        }}
                      />
                      <div className="relative z-10">
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-[10px] font-mono uppercase tracking-wider text-amber-400 font-bold">
                            Micro-Inspected Fabric Spec
                          </span>
                          <span className="text-[10px] bg-amber-400/20 text-amber-300 px-2 py-0.5 rounded font-mono border border-amber-400/30">
                            {activeTexture.threadCount}
                          </span>
                        </div>
                        <h4 className="text-sm font-bold text-white mb-1">
                          {activeTexture.name}
                        </h4>
                        <p className="text-[11px] text-neutral-300 leading-relaxed">
                          {activeTexture.description}
                        </p>

                        <div className="grid grid-cols-2 gap-2 mt-3 pt-2.5 border-t border-neutral-800 text-[11px]">
                          <div>
                            <span className="text-neutral-400 block text-[10px]">Weave Matrix</span>
                            <span className="font-semibold text-neutral-200">{activeTexture.weaveType}</span>
                          </div>
                          <div>
                            <span className="text-neutral-400 block text-[10px]">Fabric Weight</span>
                            <span className="font-semibold text-neutral-200">{activeTexture.weightGsm}</span>
                          </div>
                          <div>
                            <span className="text-neutral-400 block text-[10px]">Luster & Finish</span>
                            <span className="font-semibold text-neutral-200">{activeTexture.luster}</span>
                          </div>
                          <div>
                            <span className="text-neutral-400 block text-[10px]">Origin Mill</span>
                            <span className="font-semibold text-neutral-200">{activeTexture.origin}</span>
                          </div>
                        </div>

                        <button
                          onClick={() => {
                            setIsZoomActive(true);
                          }}
                          className="w-full mt-3 py-1.5 px-3 bg-amber-400 hover:bg-amber-300 text-neutral-950 font-bold text-[11px] uppercase tracking-wider rounded flex items-center justify-center gap-1.5 transition-colors"
                        >
                          <ZoomIn className="w-3.5 h-3.5" />
                          <span>Engage Macro Weave Zoom ({zoomLevel}x)</span>
                        </button>
                      </div>
                    </div>

                    <div className="bg-neutral-50 p-3 rounded-lg border border-neutral-200">
                      <span className="font-bold text-neutral-800 uppercase tracking-wider block mb-1">
                        Garment Fabric Composition
                      </span>
                      <p className="text-neutral-600 leading-relaxed">{product.fabricDetails}</p>
                    </div>

                    <div className="bg-neutral-50 p-3 rounded-lg border border-neutral-200">
                      <span className="font-bold text-neutral-800 uppercase tracking-wider block mb-1">
                        Master Tailor Care Guide
                      </span>
                      <p className="text-neutral-600 leading-relaxed">{product.careInstructions}</p>
                    </div>
                  </div>
                )}

                {activeTab === 'sizing' && (
                  <div className="text-xs space-y-3 bg-neutral-50 p-3.5 rounded-lg border border-neutral-200">
                    <p className="text-neutral-700 leading-relaxed">
                      All Prime Wears native pieces are cut with precision tailored ease. If you prefer a custom-molded fit, select our <strong>Custom Order Workflow</strong> to supply your neck, shoulder, chest, waist, and length measurements.
                    </p>
                    {onOpenMeasurementGuide && (
                      <button
                        onClick={onOpenMeasurementGuide}
                        className="inline-flex items-center gap-1.5 text-amber-800 font-bold hover:underline"
                      >
                        <Ruler className="w-3.5 h-3.5" />
                        <span>View Illustrated Body Measurement Guide &rarr;</span>
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="mt-6 pt-4 border-t border-neutral-200 space-y-2.5">
              {/* Primary Order on WhatsApp Action */}
              <button
                type="button"
                onClick={() => setIsWhatsAppModalOpen(true)}
                className="w-full py-3.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider rounded-lg shadow-md transition-all flex items-center justify-center gap-2.5 hover:shadow-lg hover:scale-[1.01]"
              >
                <WhatsAppIcon className="w-5 h-5 text-white" />
                <span>Order on WhatsApp</span>
              </button>

              <div className="flex items-center gap-3">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 py-2.5 px-4 bg-neutral-900 hover:bg-black text-white font-bold text-xs uppercase tracking-wider rounded-lg shadow-sm transition-all flex items-center justify-center gap-2"
                >
                  <span>Add To Bag · Price Coming Soon</span>
                </button>

                <button
                  onClick={() => toggleWishlist(product.id)}
                  aria-label="Wishlist"
                  className={`p-2.5 rounded-lg border transition-all ${
                    wishlisted
                      ? 'border-neutral-950 bg-neutral-950 text-amber-400'
                      : 'border-neutral-300 text-neutral-700 hover:border-neutral-900'
                  }`}
                >
                  <Heart className={`w-5 h-5 ${wishlisted ? 'fill-amber-400' : ''}`} />
                </button>
              </div>

              {/* Bespoke Tailoring Button if Customizable */}
              {product.isCustomizable && onOpenCustomOrder && (
                <button
                  onClick={() => {
                    onClose();
                    onOpenCustomOrder(product);
                  }}
                  className="w-full py-2.5 px-4 bg-amber-50 hover:bg-amber-100 border border-amber-300 text-amber-950 font-bold text-xs uppercase tracking-wider rounded-lg flex items-center justify-center gap-2 transition-colors"
                >
                  <Scissors className="w-4 h-4 text-amber-700" />
                  <span>Customize This Design With Your Measurements</span>
                  <ArrowRight className="w-3.5 h-3.5 text-amber-700" />
                </button>
              )}

              {/* Trust Badges */}
              <div className="flex items-center justify-between text-[11px] text-neutral-500 pt-1 pb-1">
                <span className="flex items-center gap-1">
                  <Shield className="w-3 h-3 text-amber-600" />
                  Master Tailor Quality Inspection
                </span>
                <span>DHL Express Delivery (1-3 Days)</span>
              </div>

              {/* Bottom Quick Return Action */}
              <button
                type="button"
                onClick={onClose}
                className="w-full py-2.5 px-4 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 font-bold text-xs uppercase tracking-wider rounded-lg flex items-center justify-center gap-2 transition-colors border border-neutral-300 shadow-2xs hover:border-neutral-400 group"
              >
                <ArrowLeft className="w-4 h-4 text-amber-700 group-hover:-translate-x-0.5 transition-transform" />
                <span>Back to {previousPageName || categoryInfo.name}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* WhatsApp Number Selection Popup */}
      <WhatsAppNumberSelectModal
        isOpen={isWhatsAppModalOpen}
        onClose={() => setIsWhatsAppModalOpen(false)}
        product={product}
        mode="product_order"
        selectedColor={selectedColor}
        selectedSize={selectedSize}
      />
    </div>
  );
};
