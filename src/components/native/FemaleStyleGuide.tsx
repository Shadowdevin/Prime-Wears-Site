import React, { useState } from 'react';
import {
  Sparkles,
  Crown,
  Heart,
  Scissors,
  Layers,
  Award,
  Check,
  ChevronRight,
  ShieldCheck,
  Compass,
  ArrowRight,
  BookOpen,
  Feather,
  Gem,
  Coffee,
  Briefcase
} from 'lucide-react';
import { ASSETS } from '../../data/assets';

interface FemaleStyleGuideProps {
  onOpenCustomOrder?: () => void;
  onExploreCollection?: () => void;
}

export const FemaleStyleGuide: React.FC<FemaleStyleGuideProps> = ({
  onOpenCustomOrder,
  onExploreCollection
}) => {
  const [activeOccasion, setActiveOccasion] = useState<
    'boardroom' | 'traditional' | 'gala' | 'hightea'
  >('boardroom');

  const [activeFabricIndex, setActiveFabricIndex] = useState<number>(0);

  const fabrics = [
    {
      id: 'jacquard-brocade',
      title: 'French & Swiss Floral Jacquard Brocade',
      subtitle: 'The Fabric of Monarchs & Matriarchs',
      weight: '340 - 380 GSM',
      drape: 'Structured, Voluminous, Resilient',
      texture: 'Raised botanical embossed relief with metallic filament warp',
      featuredImage: ASSETS.femaleGoldenBotanicalJacquardGown,
      summary:
        'A heavyweight, high-density masterpiece woven on specialized jacquard looms. The raised floral tapestry creates rich shadows and highlights that illuminate under daylight and evening chandeliers.',
      formalAdvice:
        'Pair with minimalist heirloom pearl drops or a single gold collar choker. Because the brocade carries magnificent visual gravity, avoid competing chunky necklaces. Match with pointed metallic pumps and a sleek satin envelope clutch.',
      casualAdvice:
        'For high tea or relaxed afternoon celebrations, tone down the drama by pairing a brocade A-line skirt with an ivory fine-gauge cashmere knit top and pointed-toe leather slingbacks.',
      colorPairings: ['Warm Tangerine + Ivory Pearl', 'Antique Gold + Obsidian', 'Emerald + Champagne'],
      idealOutfits: ['The Golden Marigold Monarch Gown', 'The Solstice Bow-Tie Flared Dress']
    },
    {
      id: 'ottoman-crepe',
      title: 'Italian Stretch Ottoman & Bonded Gabardine',
      subtitle: 'Architectural Authority & Uncompromising Poise',
      weight: '300 - 330 GSM',
      drape: 'Clean, Contour-Hugging, Wrinkle-Immune',
      texture: 'Fine horizontal ribbed Ottoman weave with 4-way micro-elasticity',
      featuredImage: ASSETS.femaleSaffronBellSleeve,
      summary:
        'Engineered for the modern woman whose presence commands respect. Italian Ottoman crepe provides sculpted structure without stiff discomfort, allowing seamless transition from a 9 AM keynote to an evening reception.',
      formalAdvice:
        'Emphasize the sculpted peplum waistline with a tonal leather belt or covered buttons. Anchor with sharp black patent-leather stilettos, architectural gold dome earrings, and an executive calfskin document bag.',
      casualAdvice:
        'Style the bell-sleeve peplum jacket over wide-leg ivory linen trousers or premium dark-wash denim, finished with square-toe designer leather mules and delicate layered chains.',
      colorPairings: ['Saffron Mustard + Jet Black', 'Sahara Camel + Espresso', 'Alabaster + Mocha'],
      idealOutfits: ['The Saffron Peplum Bell-Sleeve Ensemble', 'The Marigold Ruffle Two-Piece']
    },
    {
      id: 'asooke-mosaic',
      title: 'Hand-Inlaid Aso-Oke & Stained-Glass Corsetry',
      subtitle: 'African Heritage Reimagined as Fine Art',
      weight: '350 - 400 GSM',
      drape: 'Sculptural, Regal, Rigid Stature',
      texture: 'Hand-loomed raw silk-cotton with jewel-tone mosaic leaf inlays',
      featuredImage: ASSETS.femaleSapphireMosaicBallgown,
      summary:
        'A historic tribute to Yoruba cordwainers and master weavers. Each panel is individually loomed and assembled with stained-glass leaf tessellations in sapphire, teal, turquoise, and metallic gold thread.',
      formalAdvice:
        'Crown with a contemporary pleated Auto-Gele headwrap or an imperial braided chignon. Complement with authentic natural coral beads or lapis lazuli earrings, a crystal-embellished minaudière, and royal navy velvet heels.',
      casualAdvice:
        'Allow the mosaic corset bodice to take center stage at cultural salons by pairing it with sleek high-waisted palazzo trousers and refined gold bracelets.',
      colorPairings: ['Midnight Sapphire + Teal Leaf', 'Royal Blue + Brushed Gold', 'Deep Plum + Turquoise'],
      idealOutfits: ['The Sovereign Sapphire Mosaic Ballgown', 'The Alabaster Corset Peplum']
    },
    {
      id: 'duchess-satin-wool',
      title: 'Superfine British Tropical Wool & Duchess Satin',
      subtitle: 'Modest Grandeur & Fluid Statuesque Volume',
      weight: '280 - 360 GSM',
      drape: 'Fluid Cascade with Sculptural Tailoring',
      texture: 'Ultra-smooth matte wool bodice paired with luminous heavy satin flare',
      featuredImage: ASSETS.femaleCamelJacketEspressoBallSkirt,
      summary:
        'The timeless juxtaposition of British Savile Row precision with the sweeping grandeur of high-society African fashion. The matte jacket frame creates contrast against the gleaming, fluid floor-length skirt.',
      formalAdvice:
        'Keep the look stately with closed-toe pumps in chocolate or burgundy, a silk neck scarf tucked discreetly under the collar, and structured gold drop earrings.',
      casualAdvice:
        'Wear the camel peplum jacket unbuttoned over a cream silk slip top and cigarette trousers for an understated yet impeccably tailored daytime ensemble.',
      colorPairings: ['Warm Camel + Dark Espresso', 'Ivory Alabaster + Rich Chestnut', 'Slate Grey + Navy'],
      idealOutfits: ['The Sahara Camel & Espresso Ball-Skirt Set', 'The Alabaster Lace-Up Column Set']
    },
    {
      id: 'ankara-chantilly',
      title: 'Real Dutch Wax Ankara & French Chantilly Lace',
      subtitle: 'The Harmony of Tribal Geometry & Ethereal Delicacy',
      weight: '260 - 300 GSM',
      drape: 'Crisp Flare with Sheer Veil Illusion',
      texture: 'High-density wax-printed cotton paired with corded sheer floral lace',
      featuredImage: ASSETS.femaleAnkaraBlackLaceMini,
      summary:
        'A fearless collision of indigenous African textile heritage and Parisian couture femininity. Crisp 100% cotton wax resist provides architectural flare for ruffles and skirts, while sheer Chantilly lace illusion sleeves offer delicate sensuality with regal modesty.',
      formalAdvice:
        'Pair with minimalist black strappy heels, a sleek micro-box clutch in polished acrylic or brass, and geometric gold statement studs that mirror the circular Ankara patterns.',
      casualAdvice:
        'Dress down for an art gallery opening or Sunday rooftop brunch with pristine white leather sneakers or ankle-strap block heel sandals, complemented by a woven leather crossbody bag.',
      colorPairings: ['Scarlet Red + Onyx Lace', 'Crimson + Antique Gold', 'Imperial Cobalt + Black Chantilly'],
      idealOutfits: ['The Scarlet Ankara & Chantilly Lace Flounce Shirtdress', 'The Imperial Crimson & Gold Batik Peplum Two-Piece']
    },
    {
      id: 'basque-graphic-crepe',
      title: 'Italian Milano Crepe with Graphic Architectural Trim',
      subtitle: 'Modern Runway Authority & High-Speed Executive Elegance',
      weight: '320 - 350 GSM',
      drape: 'Sculptural, Weighty, Sharp Basque Contour',
      texture: 'Bonded matte twill crepe with laser-cut contrast racing stripe insets',
      featuredImage: ASSETS.femaleCaramelWhiteStripeBasque,
      summary:
        'Created for women who define industries. The weighted Milano weave holds clean diagonal basque points without sagging, framing the hips with razor-sharp graphic contrast that elongates the torso and creates an imposing yet poised silhouette.',
      formalAdvice:
        'Anchor with sleek two-tone white and camel stilettos, an ivory envelope document folio, and structured geometric gold cuff bracelets.',
      casualAdvice:
        'Transform into evening cocktail wear by swapping daytime pumps for metallic gold strappy sandals and a dark red velvet lip.',
      colorPairings: ['Terracotta Caramel + Crisp White', 'Royal Sapphire + Polished Gold', 'Deep Amethyst + Obsidian'],
      idealOutfits: ['The Terracotta Sculptural Stripe Basque Column Dress', 'The Royal Sapphire Military Button Peplum Suit']
    }
  ];

  const occasions = [
    {
      id: 'boardroom',
      title: 'Boardroom & Diplomatic Leadership',
      tagline: 'Intellectual sovereignty, unshakeable dignity, and executive presence.',
      silhouette: 'Sculpted Peplum Jackets with Pencil Column Skirts or Basque Flounces',
      recommendedFabric: 'Italian Ottoman Crepe & Bonded Gabardine (Crease-proof)',
      jewelry: 'Matte gold dome earrings, understated signet ring, Swiss timepiece',
      footwear: '3-inch closed-toe patent or calfskin pointed pumps in onyx or chocolate',
      colorStrategy: 'Commanding warm saffron with black contrast, or camel with espresso',
      proTip:
        'Ensure the peplum flare hits exactly at the high hip to elongate the torso and emphasize posture while seated at executive tables.'
    },
    {
      id: 'traditional',
      title: 'Royal Ceremonies & Cultural Engagements',
      tagline: 'Honoring heritage, ancestry, and monarchical pride.',
      silhouette: 'Mosaic Corseted Ballgowns, High-Waist A-Line Flared Robes',
      recommendedFabric: 'Hand-Inlaid Aso-Oke, Swiss Damask, and Heavy Duchess Satin',
      jewelry: 'Authentic Nigerian coral bead torque, filigree gold bangles, drop pearls',
      footwear: 'Embellished platform block heels or satin court shoes for steady comfort',
      colorStrategy: 'Regal jewel tones: Sapphire, Emerald, Imperial Gold, and Rich Ochre',
      proTip:
        'Coordinate your Gele or head adornment with the secondary thread in the mosaic embroidery rather than the main dress body to create elevated visual depth.'
    },
    {
      id: 'gala',
      title: 'State Galas & Red-Carpet Soirées',
      tagline: 'Breathtaking glamour with aristocratic restraint and poise.',
      silhouette: 'Floor-Sweeping Box-Pleated Monarch Gowns or Bell-Sleeve Peplum Sets',
      recommendedFabric: 'French Jacquard Brocade with Spun Metallic Gold Filament',
      jewelry: 'Diamond or moissanite drop earrings, structured brass/gold minaudière',
      footwear: 'D’Orsay stiletto pumps or metallic ankle-strap evening sandals',
      colorStrategy: 'Luminous tangerine gold, champagne ivory, and midnight obsidian',
      proTip:
        'When wearing a dress with expansive box pleats, keep arms bare or adorned with slender cuffs so the silhouette retains its statuesque hourglass balance.'
    },
    {
      id: 'hightea',
      title: 'Sunday Splendor, High Tea & Cultural Salons',
      tagline: 'Effervescent grace, joyous light, and elevated daytime ease.',
      silhouette: 'Circular Flared A-Line Midi Dresses with Pussy-Bow Collars',
      recommendedFabric: 'Textured Brocade with micro-floral relief or Italian Silk Crepe',
      jewelry: 'Dainty gold huggies, pearl rings, vintage brooch pinned to the bow tie',
      footwear: 'Block-heel slingbacks, patent leather Mary Janes, or elegant kitten heels',
      colorStrategy: 'Joyful sunlit hues: Marigold, pastel blush, champagne, and warm camel',
      proTip:
        'Let the pussy-bow necktie drape naturally or fasten it into a loose architectural knot for an effortlessly chic continental aesthetic.'
    }
  ];

  const currentFabric = fabrics[activeFabricIndex];
  const currentOccasion = occasions.find((o) => o.id === activeOccasion)!;

  return (
    <div className="bg-neutral-900 text-neutral-100 py-16 sm:py-24 border-t border-neutral-800 relative overflow-hidden">
      {/* Background radial warmth */}
      <div className="absolute top-0 left-1/3 w-[500px] h-[500px] bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-10 w-[600px] h-[600px] bg-amber-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16">
        {/* ========================================================= */}
        {/* 1. CAPTIVATING STORYLINE: PRAISING THE FEMALE NATURE & DIGNITY */}
        {/* ========================================================= */}
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-bold uppercase tracking-widest rounded-full">
            <Crown className="w-3.5 h-3.5 text-amber-400" />
            <span>Her Majesty · The Matriarch & Muse</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold font-serif-luxury text-white tracking-tight leading-tight">
            An Ode to the Sovereign Grace <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-200 to-amber-400">
              and Dignity of Womanhood
            </span>
          </h2>

          <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto" />

          {/* Captivating Poetic Narrative */}
          <div className="space-y-4 text-sm sm:text-base text-neutral-300 leading-relaxed max-w-3xl mx-auto font-light">
            <p>
              In the sacred tapestry of African civilization, a woman is never an afterthought—she is the foundation upon which dynasties stand, the heartbeat of culture, and the sacred custodian of grace. Her strength does not need to roar to be felt; it lives in the quiet stillness of her wisdom, the warmth of her counsel, and the regal authority with which she occupies every space.
            </p>
            <p>
              Whether she is steering high-stakes negotiations in the corporate boardroom, presiding over state affairs, or illuminating ceremonial family banquets in radiant native attire, her attire must rise to meet her spirit. It must honor her divine contour without confinement, dignify her intellectual power, and crown her inherent royalty.
            </p>
            <p className="text-amber-200/90 font-medium italic">
              &ldquo;Prime Wears Haute Couture for Women was conceived not merely as clothing, but as a coronation of her poise, her resilience, and her divine nature.&rdquo;
            </p>
          </div>

          {/* Highlights Metrics */}
          <div className="pt-4 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto text-left">
            <div className="p-4 bg-neutral-950/80 rounded-lg border border-neutral-800">
              <span className="text-amber-400 text-xs font-bold uppercase tracking-wider block">
                Bespoke Precision
              </span>
              <strong className="text-white text-base font-serif-luxury">
                Curved Basque Waist
              </strong>
              <p className="text-[11px] text-neutral-400 mt-1">
                Sculpts the silhouette while maintaining breathing comfort.
              </p>
            </div>
            <div className="p-4 bg-neutral-950/80 rounded-lg border border-neutral-800">
              <span className="text-amber-400 text-xs font-bold uppercase tracking-wider block">
                Master Fabrics
              </span>
              <strong className="text-white text-base font-serif-luxury">
                Swiss & Italian Mills
              </strong>
              <p className="text-[11px] text-neutral-400 mt-1">
                Weighted 300–400 GSM for flawless non-crease drape.
              </p>
            </div>
            <div className="p-4 bg-neutral-950/80 rounded-lg border border-neutral-800">
              <span className="text-amber-400 text-xs font-bold uppercase tracking-wider block">
                Heritage Art
              </span>
              <strong className="text-white text-base font-serif-luxury">
                Hand-Inlaid Mosaic
              </strong>
              <p className="text-[11px] text-neutral-400 mt-1">
                Centuries-old needlecraft fused with modern architecture.
              </p>
            </div>
            <div className="p-4 bg-neutral-950/80 rounded-lg border border-neutral-800">
              <span className="text-amber-400 text-xs font-bold uppercase tracking-wider block">
                Flagship Fittings
              </span>
              <strong className="text-white text-base font-serif-luxury">
                Uyo · Calabar · PH
              </strong>
              <p className="text-[11px] text-neutral-400 mt-1">
                Private styling salons with certified master seamstresses.
              </p>
            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* 2. STYLE GUIDE FOR WOMEN: FABRIC ENCYCLOPEDIA & PAIRING */}
        {/* ========================================================= */}
        <div className="bg-neutral-950 rounded-2xl border border-neutral-800 p-6 sm:p-10 shadow-2xl space-y-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-neutral-800">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-amber-400 mb-1">
                <BookOpen className="w-4 h-4" />
                <span>Atelier Master Knowledge</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold font-serif-luxury text-white">
                The Woman’s Fabric & Styling Guide
              </h3>
              <p className="text-xs sm:text-sm text-neutral-400 mt-1 max-w-2xl">
                Master the language of luxury textiles. Understand weight, drape, jewelry pairing, and how to transition effortlessly between boardroom formality and celebratory native elegance.
              </p>
            </div>

            {/* Fabric Selector Tabs */}
            <div className="flex flex-wrap gap-2">
              {fabrics.map((fabric, idx) => (
                <button
                  key={fabric.id}
                  onClick={() => setActiveFabricIndex(idx)}
                  className={`text-xs px-3.5 py-2 rounded-lg font-medium transition-all ${
                    activeFabricIndex === idx
                      ? 'bg-amber-500 text-neutral-950 font-bold shadow-md'
                      : 'bg-neutral-900 text-neutral-300 hover:text-white hover:bg-neutral-800 border border-neutral-800'
                  }`}
                >
                  {fabric.title.split('&')[0].trim()}
                </button>
              ))}
            </div>
          </div>

          {/* Active Fabric Spotlight Card */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Visual Thumbnail */}
            <div className="lg:col-span-5 relative group overflow-hidden rounded-xl border border-neutral-800 bg-neutral-900">
              <div className="aspect-[3/4] w-full overflow-hidden">
                <img
                  src={currentFabric.featuredImage}
                  alt={currentFabric.title}
                  className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 space-y-1">
                <span className="text-[11px] font-bold uppercase tracking-widest text-amber-300">
                  {currentFabric.subtitle}
                </span>
                <h4 className="text-lg font-bold text-white font-serif-luxury">
                  {currentFabric.title}
                </h4>
                <div className="flex items-center gap-2 text-xs text-neutral-300 pt-1">
                  <span>Weight: <strong>{currentFabric.weight}</strong></span>
                  <span>·</span>
                  <span>Drape: <strong>{currentFabric.drape}</strong></span>
                </div>
              </div>
            </div>

            {/* Detailed Fabric Breakdown */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <span className="text-xs uppercase tracking-widest font-bold text-amber-400 block mb-1">
                  Texture & Weave Characteristics
                </span>
                <h4 className="text-xl sm:text-2xl font-bold font-serif-luxury text-white">
                  {currentFabric.title}
                </h4>
                <p className="text-xs sm:text-sm text-neutral-300 mt-2 leading-relaxed">
                  {currentFabric.summary}
                </p>
                <div className="mt-3 p-3 bg-neutral-900 rounded-lg border border-neutral-800/80 text-xs text-neutral-400">
                  <span className="text-neutral-200 font-semibold">Tactile Feel: </span>
                  {currentFabric.texture}
                </div>
              </div>

              {/* Occasion Styling Breakdown Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                {/* Formal Styling Box */}
                <div className="p-4 bg-neutral-900/90 rounded-xl border border-neutral-800 space-y-2">
                  <div className="flex items-center gap-2 text-amber-300 font-bold uppercase tracking-wider text-[11px]">
                    <Crown className="w-3.5 h-3.5 text-amber-400" />
                    <span>Formal & State Protocol</span>
                  </div>
                  <p className="text-neutral-300 leading-relaxed">
                    {currentFabric.formalAdvice}
                  </p>
                </div>

                {/* Casual / Transition Box */}
                <div className="p-4 bg-neutral-900/90 rounded-xl border border-neutral-800 space-y-2">
                  <div className="flex items-center gap-2 text-amber-300 font-bold uppercase tracking-wider text-[11px]">
                    <Coffee className="w-3.5 h-3.5 text-amber-400" />
                    <span>Cocktail & Daytime Transition</span>
                  </div>
                  <p className="text-neutral-300 leading-relaxed">
                    {currentFabric.casualAdvice}
                  </p>
                </div>
              </div>

              {/* Recommended Color Palettes & Matching Prime Outfits */}
              <div className="pt-2 border-t border-neutral-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
                <div>
                  <span className="text-[11px] font-semibold text-neutral-400 block mb-1">
                    Atelier Color Harmonization:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {currentFabric.colorPairings.map((c, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-1 rounded bg-neutral-900 border border-neutral-800 text-neutral-200 text-[11px]"
                      >
                        {c}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <span className="text-[11px] font-semibold text-neutral-400 block mb-1">
                    Featured In Collection:
                  </span>
                  <div className="space-y-0.5 text-amber-300 font-medium">
                    {currentFabric.idealOutfits.map((outfit, i) => (
                      <div key={i} className="flex items-center gap-1.5">
                        <Check className="w-3 h-3 text-amber-400" />
                        <span>{outfit}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* 3. INTERACTIVE OCCASION & STYLING MATRIX */}
        {/* ========================================================= */}
        <div className="space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs uppercase tracking-[0.25em] font-bold text-amber-400 block">
              Event Calibration Matrix
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold font-serif-luxury text-white">
              Pairing Fabric by Occasion & Atmosphere
            </h3>
            <p className="text-xs text-neutral-400">
              Select an occasion to reveal expert recommendations for silhouette, fabric selection, jewelry, and footwear.
            </p>
          </div>

          {/* Occasion Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            {occasions.map((occ) => (
              <button
                key={occ.id}
                onClick={() => setActiveOccasion(occ.id as any)}
                className={`px-4 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 ${
                  activeOccasion === occ.id
                    ? 'bg-amber-500 text-neutral-950 shadow-lg shadow-amber-500/20'
                    : 'bg-neutral-950 text-neutral-300 hover:text-white hover:bg-neutral-850 border border-neutral-800'
                }`}
              >
                <span>{occ.title.split('&')[0]}</span>
              </button>
            ))}
          </div>

          {/* Occasion Recommendation Details Card */}
          <div className="bg-neutral-950 rounded-2xl border border-amber-500/30 p-6 sm:p-8 max-w-5xl mx-auto shadow-xl">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-neutral-800">
              <div>
                <span className="text-xs font-mono text-amber-400 uppercase tracking-widest block">
                  Curated Styling Blueprint
                </span>
                <h4 className="text-2xl font-bold font-serif-luxury text-white mt-1">
                  {currentOccasion.title}
                </h4>
                <p className="text-xs text-neutral-400 mt-1 italic">
                  &ldquo;{currentOccasion.tagline}&rdquo;
                </p>
              </div>

              {onOpenCustomOrder && (
                <button
                  onClick={onOpenCustomOrder}
                  className="py-2.5 px-5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-neutral-950 font-bold text-xs uppercase tracking-wider rounded-lg shadow transition-all flex items-center gap-1.5 shrink-0"
                >
                  <Scissors className="w-3.5 h-3.5" />
                  <span>Commission This Style</span>
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-6 text-xs">
              <div className="space-y-1.5 p-3 rounded-lg bg-neutral-900 border border-neutral-800">
                <span className="text-amber-400 font-bold uppercase tracking-wider block text-[10px]">
                  1. Ideal Silhouette
                </span>
                <strong className="text-white text-sm block">
                  {currentOccasion.silhouette}
                </strong>
              </div>

              <div className="space-y-1.5 p-3 rounded-lg bg-neutral-900 border border-neutral-800">
                <span className="text-amber-400 font-bold uppercase tracking-wider block text-[10px]">
                  2. Sourced Fabric
                </span>
                <strong className="text-white text-sm block">
                  {currentOccasion.recommendedFabric}
                </strong>
              </div>

              <div className="space-y-1.5 p-3 rounded-lg bg-neutral-900 border border-neutral-800">
                <span className="text-amber-400 font-bold uppercase tracking-wider block text-[10px]">
                  3. Jewelry & Adornment
                </span>
                <p className="text-neutral-300">
                  {currentOccasion.jewelry}
                </p>
              </div>

              <div className="space-y-1.5 p-3 rounded-lg bg-neutral-900 border border-neutral-800">
                <span className="text-amber-400 font-bold uppercase tracking-wider block text-[10px]">
                  4. Footwear Pairing
                </span>
                <p className="text-neutral-300">
                  {currentOccasion.footwear}
                </p>
              </div>
            </div>

            {/* Master Couturier Pro-Tip */}
            <div className="mt-6 p-4 bg-amber-500/10 rounded-xl border border-amber-500/30 text-xs text-amber-200 flex items-start gap-3">
              <Sparkles className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-amber-300 block mb-0.5">
                  Chief Couturier’s Styling Rule:
                </strong>
                <p className="text-neutral-300 leading-relaxed">
                  {currentOccasion.proTip}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* 4. BESPOKE SIZING & MEASUREMENT SPECIFICATIONS FOR WOMEN */}
        {/* ========================================================= */}
        <div className="bg-neutral-950 rounded-2xl border border-neutral-800 p-6 sm:p-8 max-w-5xl mx-auto space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-neutral-800">
            <div>
              <h4 className="text-xl font-bold font-serif-luxury text-white">
                Bespoke Tailoring Measurement Standards (Inches)
              </h4>
              <p className="text-xs text-neutral-400 mt-0.5">
                Each bespoke piece can be drafted precisely to your unique measurements or ordered in standard atelier sizing.
              </p>
            </div>

            <div className="text-xs text-amber-400 font-medium">
              Free fitting adjustments at all Prime Wears studios
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs tabular-nums text-neutral-300">
              <thead>
                <tr className="border-b border-neutral-800 text-[11px] uppercase tracking-wider text-neutral-400">
                  <th className="py-2.5 pr-4 font-bold text-white">UK Size</th>
                  <th className="py-2.5 px-3">Bust</th>
                  <th className="py-2.5 px-3">Waist</th>
                  <th className="py-2.5 px-3">High Hip</th>
                  <th className="py-2.5 px-3">Full Hip</th>
                  <th className="py-2.5 px-3">Shoulder</th>
                  <th className="py-2.5 px-3">Midi Length</th>
                  <th className="py-2.5 px-3">Maxi Length</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-850">
                {[
                  { size: 'UK 8 (S)', bust: '33 - 34"', waist: '26 - 27"', highHip: '32"', fullHip: '36 - 37"', shoulder: '14.5"', midi: '44"', maxi: '58"' },
                  { size: 'UK 10 (M)', bust: '35 - 36"', waist: '28 - 29"', highHip: '34"', fullHip: '38 - 39"', shoulder: '15.0"', midi: '44.5"', maxi: '59"' },
                  { size: 'UK 12 (M/L)', bust: '37 - 38"', waist: '30 - 31"', highHip: '36"', fullHip: '40 - 41"', shoulder: '15.5"', midi: '45"', maxi: '60"' },
                  { size: 'UK 14 (L)', bust: '39 - 41"', waist: '32 - 34"', highHip: '38"', fullHip: '42 - 44"', shoulder: '16.0"', midi: '45.5"', maxi: '60"' },
                  { size: 'UK 16 (XL)', bust: '42 - 44"', waist: '35 - 37"', highHip: '40"', fullHip: '45 - 47"', shoulder: '16.5"', midi: '46"', maxi: '61"' },
                  { size: 'UK 18 (2XL)', bust: '45 - 47"', waist: '38 - 40"', highHip: '43"', fullHip: '48 - 50"', shoulder: '17.0"', midi: '46.5"', maxi: '61"' },
                  { size: 'UK 20 (3XL)', bust: '48 - 50"', waist: '41 - 43"', highHip: '45"', fullHip: '51 - 53"', shoulder: '17.5"', midi: '47"', maxi: '62"' },
                ].map((row, idx) => (
                  <tr key={idx} className="hover:bg-neutral-900/60 transition-colors">
                    <td className="py-3 pr-4 font-bold text-amber-300 font-sans">{row.size}</td>
                    <td className="py-3 px-3">{row.bust}</td>
                    <td className="py-3 px-3">{row.waist}</td>
                    <td className="py-3 px-3">{row.highHip}</td>
                    <td className="py-3 px-3">{row.fullHip}</td>
                    <td className="py-3 px-3">{row.shoulder}</td>
                    <td className="py-3 px-3">{row.midi}</td>
                    <td className="py-3 px-3">{row.maxi}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="pt-4 border-t border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-xs text-neutral-400">
              Prefer an exact custom fit? Submit custom bust, waist, and hip measurements directly to our head seamstress.
            </span>
            {onOpenCustomOrder && (
              <button
                onClick={onOpenCustomOrder}
                className="py-2.5 px-6 bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs uppercase tracking-wider rounded transition-colors shadow-md shrink-0"
              >
                Submit Custom Measurements
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
