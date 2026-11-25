import { Product, ShowroomMannequin } from '../types';
import { ASSETS } from './assets';

export const PRODUCTS: Product[] = [
  // ==========================================
  // NATIVE WEARS COLLECTION
  // ==========================================
  {
    id: 'pw-nat-001',
    name: 'The Burgundy Rosette Senator Two-Piece',
    category: 'senator',
    experience: 'native',
    price: 95000,
    originalPrice: 115000,
    shortDescription: 'Signature burgundy pinstripe senator top with handcrafted leatherette rosette patch & tailored trousers.',
    description: 'A masterpiece of contemporary Nigerian menswear. Handcrafted from Super 160s pinstripe wool-cashmere blend with subtle luster. Features a concealed front placket, classic Mandarin collar, tailored cuffs, and an artisanal leather medallion chest patch. Paired with coordinating slim-tailored trousers featuring Italian brass side adjusters.',
    images: [
      ASSETS.nativeBurgundySenator,
      ASSETS.nativeSlateSenator,
      ASSETS.nativeNavyKaftan
    ],
    colors: [
      { name: 'Burgundy Wine', hex: '#631d27' },
      { name: 'Slate Grey', hex: '#68727b' },
      { name: 'Midnight Navy', hex: '#16233b' }
    ],
    sizes: ['Custom Tailored', 'M (Chest 38-40)', 'L (Chest 42-44)', 'XL (Chest 46-48)', 'XXL (Chest 50-52)'],
    tags: ['Senator', 'Custom Fit', 'Artisanal Pocket', 'Bestseller'],
    stockStatus: 'made_to_order',
    fabricDetails: 'Super 160s Cashmere-Wool Blend with Micro Pinstripe weave. Breathable, crease-resistant, 280 GSM.',
    careInstructions: 'Dry clean only. Warm steam press. Store on contoured wooden hanger with garment bag.',
    isCustomizable: true,
    featured: true,
    bestseller: true
  },
  {
    id: 'pw-nat-002',
    name: 'The Grand White Monarch Kaftan',
    category: 'kaftan',
    experience: 'native',
    price: 88000,
    originalPrice: 105000,
    shortDescription: 'Pristine optic white kaftan with intricate gold & slate diamond lattice embroidery.',
    description: 'Impeccable minimalism elevated by heritage Nigerian craftsmanship. Cut from heavy-drape Irish linen with a structured standing collar and a concealed vertical button placket. Accented by geometric diamond embroidery along the placket and chest pocket in amber-gold and slate threadwork.',
    images: [
      ASSETS.nativeWhiteKaftan,
      ASSETS.nativeSlateSenator
    ],
    colors: [
      { name: 'Optic White & Gold', hex: '#ffffff' },
      { name: 'Ivory Cream', hex: '#faf7ee' },
      { name: 'Slate Grey', hex: '#7a8288' }
    ],
    sizes: ['Custom Tailored', 'M (Chest 38-40)', 'L (Chest 42-44)', 'XL (Chest 46-48)', 'XXL (Chest 50-52)'],
    tags: ['Kaftan', 'Geometric Embroidery', 'Wedding Guest', 'Linen'],
    stockStatus: 'made_to_order',
    fabricDetails: '100% Premium Pure Irish Linen with dense mercerized gold embroidery thread.',
    careInstructions: 'Professional dry clean recommended. Starch lightly if crisp collar drape is desired.',
    isCustomizable: true,
    featured: true,
    newArrival: true
  },
  {
    id: 'pw-nat-003',
    name: 'The Slate Sovereign Senator Set',
    category: 'senator',
    experience: 'native',
    price: 92000,
    shortDescription: 'Refined cool-grey senator top with chain-link micro embroidery on placket and chest pocket.',
    description: 'The epitome of boardroom authority. Features a muted ash-slate hue crafted from crease-resistant tropical wool blend. The clean round neckline is framed with clean chain-link threadwork down the placket and across the pocket. Includes matching flat-front tailored trousers.',
    images: [
      ASSETS.nativeSlateSenator,
      ASSETS.nativeBurgundySenator
    ],
    colors: [
      { name: 'Ash Slate Grey', hex: '#6f7881' },
      { name: 'Charcoal Black', hex: '#222326' },
      { name: 'Navy Blue', hex: '#1b263b' }
    ],
    sizes: ['Custom Tailored', 'M (Chest 38-40)', 'L (Chest 42-44)', 'XL (Chest 46-48)', 'XXL (Chest 50-52)'],
    tags: ['Senator', 'Corporate Native', 'Minimalist', 'Embroidery'],
    stockStatus: 'made_to_order',
    fabricDetails: 'Lightweight Tropical Poly-Viscose Wool Blend with mechanical stretch and cooling properties.',
    careInstructions: 'Dry clean or delicate cold hand wash. Cool iron on reverse.',
    isCustomizable: true,
    featured: false,
    bestseller: true
  },
  {
    id: 'pw-nat-004',
    name: 'The Royal Azure Chevron Kaftan',
    category: 'kaftan',
    experience: 'native',
    price: 89000,
    shortDescription: 'Midnight navy pinstripe senator top with Aztec chevron placket and patterned internal collar.',
    description: 'A striking blend of tradition and modern flair. Deep midnight navy blue with fine vertical micro-stripes, highlighted by an Aztec chevron geometric embroidered motif along the front closure and pocket square. The collar interior is lined with vintage patterned brocade fabric.',
    images: [
      ASSETS.nativeNavyKaftan,
      ASSETS.nativeWhiteKaftan
    ],
    colors: [
      { name: 'Midnight Navy', hex: '#131e36' },
      { name: 'Deep Emerald', hex: '#0f2b20' },
      { name: 'Obsidian Black', hex: '#111215' }
    ],
    sizes: ['Custom Tailored', 'M (Chest 38-40)', 'L (Chest 42-44)', 'XL (Chest 46-48)', 'XXL (Chest 50-52)'],
    tags: ['Kaftan', 'Chevron Stitch', 'Evening Wear', 'Senator'],
    stockStatus: 'made_to_order',
    fabricDetails: 'Super 140s Pinstriped Wool-Silk blend with vintage jacquard collar lining.',
    careInstructions: 'Dry clean only. Steam press.',
    isCustomizable: true,
    featured: true
  },
  // ==========================================
  // GRAND AGBADA CEREMONIAL COLLECTION
  // ==========================================
  {
    id: 'pw-agb-001',
    name: 'The Obsidian Starburst Grand Agbada 3-Piece',
    category: 'agbada',
    experience: 'native',
    price: 185000,
    originalPrice: 220000,
    shortDescription: 'Regal obsidian black 3-piece Agbada with dense gold starburst grid placket & diamond crest motif.',
    description: 'An extraordinary ceremonial masterpiece. Crafted from heavyweight Swiss Damask with a structured shoulder line, deep folds, and intricate gold thread embroidery on the central placket and geometric diamond motif below. Includes matching tailored inner tunic and tapered trousers.',
    images: [
      ASSETS.agbadaBlackGoldGrid,
      ASSETS.agbadaOpticWhiteMonarch
    ],
    colors: [
      { name: 'Obsidian Black & Gold', hex: '#0f0f10' },
      { name: 'Midnight Charcoal', hex: '#1c1d21' }
    ],
    sizes: ['Custom Tailored', 'M (Wingspan 56")', 'L (Wingspan 60")', 'XL (Wingspan 64")'],
    tags: ['Agbada', '3-Piece', 'Gold Threadwork', 'Ceremonial', 'Bestseller'],
    stockStatus: 'made_to_order',
    fabricDetails: 'Super 150s Pure Wool & Heavyweight Swiss Cotton Damask with metallic gold thread embroidery.',
    careInstructions: 'Professional dry clean only. Hang on wide contoured Agbada hanger.',
    isCustomizable: true,
    featured: true,
    bestseller: true
  },
  {
    id: 'pw-agb-002',
    name: 'The Royal Champagne Quatrefoil Agbada',
    category: 'agbada',
    experience: 'native',
    price: 175000,
    originalPrice: 205000,
    shortDescription: 'Champagne-ivory Agbada with asymmetric angular collar & chocolate quatrefoil mandala motif.',
    description: 'A contemporary reinterpretation of monarchical native fashion. Features a sculpted champagne-beige silhouette with an asymmetric architectural collar framing an inner tunic. The chest is adorned with a framed chocolate brown floral-quatrefoil mandala with satellite emblems.',
    images: [
      ASSETS.agbadaChampagneQuatrefoil,
      ASSETS.agbadaImperialOliveLabyrinth
    ],
    colors: [
      { name: 'Champagne Beige', hex: '#e8dcbe' },
      { name: 'Warm Sand', hex: '#dfcfb1' }
    ],
    sizes: ['Custom Tailored', 'M (Wingspan 56")', 'L (Wingspan 60")', 'XL (Wingspan 64")'],
    tags: ['Agbada', 'Quatrefoil', 'Champagne', 'Bespoke'],
    stockStatus: 'made_to_order',
    fabricDetails: 'Pure Irish Linen & Cashmere blend with contrast silk-viscose embroidery.',
    careInstructions: 'Dry clean only. Gentle steam press.',
    isCustomizable: true,
    featured: true,
    newArrival: true
  },
  {
    id: 'pw-agb-003',
    name: 'The Platinum Orbit Lattice Agbada Ensemble',
    category: 'agbada',
    experience: 'native',
    price: 180000,
    originalPrice: 215000,
    shortDescription: 'Silver-grey architectural Agbada with twin orbital cutout accents & full coordinating inner shirt.',
    description: 'Designed in collaboration with master atelier cutters. Crisp platinum-grey fabric punctuated by high-precision geometric white lattice needlework and twin orbital circular appliqués. Accompanied by a tailored long-sleeve inner senator shirt with buttoned cuffs and matching trousers.',
    images: [
      ASSETS.agbadaSilverLatticeEnsemble,
      ASSETS.agbadaSlateEclipseLines
    ],
    colors: [
      { name: 'Platinum Silver Grey', hex: '#d3d7de' },
      { name: 'Muted Slate', hex: '#9ba2ab' }
    ],
    sizes: ['Custom Tailored', 'M (Wingspan 56")', 'L (Wingspan 60")', 'XL (Wingspan 64")'],
    tags: ['Agbada', 'Ensemble', 'Lattice Stitch', 'Modern Traditional'],
    stockStatus: 'made_to_order',
    fabricDetails: 'Lightweight tropical wool-viscose weave engineered for ceremonial comfort in warm climates.',
    careInstructions: 'Dry clean only.',
    isCustomizable: true,
    featured: true
  },
  {
    id: 'pw-agb-004',
    name: 'The Sovereign Silver Syari Medallion Agbada',
    category: 'agbada',
    experience: 'native',
    price: 178000,
    originalPrice: 210000,
    shortDescription: 'Light silver-white Agbada with folded lapel, gold piping border & floral star medallion.',
    description: 'A study in aristocratic balance. Features an asymmetric folded collar rimmed with lustrous gold piping, a delicate floral star crest medallion, and micro-ribbed vertical chest panels. Flawless wing drape that flows smoothly with every stride.',
    images: [
      ASSETS.agbadaSyariSilverMedallion,
      ASSETS.agbadaOpticWhiteMonarch
    ],
    colors: [
      { name: 'Silver Moon White', hex: '#eaeaea' },
      { name: 'Light Dove Grey', hex: '#c8cbd0' }
    ],
    sizes: ['Custom Tailored', 'Standard Free Fit (Wingspan 58"-64")', 'Generous Fit'],
    tags: ['Agbada', 'Gold Piping', 'Floral Star', 'Imperial'],
    stockStatus: 'made_to_order',
    fabricDetails: 'Fine-twill English wool with mercerized gold thread embroidery.',
    careInstructions: 'Dry clean only.',
    isCustomizable: true
  },
  {
    id: 'pw-agb-005',
    name: 'The Optic White Monarch Agbada 3-Piece',
    category: 'agbada',
    experience: 'native',
    price: 195000,
    originalPrice: 230000,
    shortDescription: 'Pure optic white 3-piece Agbada with dense tonal white-on-white knotwork relief embroidery.',
    description: 'The pinnacle of Nigerian wedding and chieftaincy attire. Cut from pristine optic white ceremonial fabric, featuring a full-length cascading robe, inner long-sleeve kaftan with standing collar, and flat-front trousers. Intricately embellished with 3D raised white-on-white geometric knotwork.',
    images: [
      ASSETS.agbadaOpticWhiteMonarch,
      ASSETS.agbadaSyariSilverMedallion
    ],
    colors: [
      { name: 'Pristine Optic White', hex: '#ffffff' },
      { name: 'Ivory Cream', hex: '#fcf8ee' }
    ],
    sizes: ['Custom Tailored', 'M (Wingspan 56")', 'L (Wingspan 60")', 'XL (Wingspan 64")'],
    tags: ['Agbada', '3-Piece', 'White Wedding', 'Chieftaincy', 'Bestseller'],
    stockStatus: 'made_to_order',
    fabricDetails: 'Heavyweight Austrian Cotton Jacquard & Brocade with raised tonal relief embroidery.',
    careInstructions: 'Dry clean only. Starch lightly.',
    isCustomizable: true,
    featured: true,
    bestseller: true
  },
  {
    id: 'pw-agb-006',
    name: 'The Eclipse Linear Slate Agbada',
    category: 'agbada',
    experience: 'native',
    price: 168000,
    shortDescription: 'Dove-slate Agbada with twin charcoal circular emblems & fine vertical stitch paneling.',
    description: 'Modern geometric elegance. Features an architectural asymmetric neckline with jewel button studs, flanked by twin charcoal orbital discs and thousands of precision vertical stitch lines.',
    images: [
      ASSETS.agbadaSlateEclipseLines,
      ASSETS.agbadaSilverLatticeEnsemble
    ],
    colors: [
      { name: 'Dove Slate Grey', hex: '#a8adb4' },
      { name: 'Charcoal Shadow', hex: '#31343b' }
    ],
    sizes: ['Custom Tailored', 'Free Fit'],
    tags: ['Agbada', 'Linear Embroidery', 'Minimalist'],
    stockStatus: 'made_to_order',
    fabricDetails: '100% Cotton-Linen Blend with mechanical stretch.',
    careInstructions: 'Dry clean or steam press.',
    isCustomizable: true
  },
  {
    id: 'pw-agb-007',
    name: 'The Imperial Olive Labyrinth Agbada',
    category: 'agbada',
    experience: 'native',
    price: 172000,
    shortDescription: 'Muted olive-khaki Agbada with bronze concentric square labyrinth embroidery.',
    description: 'Rich earth-toned majesty. Muted olive-khaki robe featuring an asymmetric wrapped collar with triple stud buttons and concentric stepped square labyrinth embroidery down the chest.',
    images: [
      ASSETS.agbadaImperialOliveLabyrinth,
      ASSETS.agbadaChampagneQuatrefoil
    ],
    colors: [
      { name: 'Muted Olive Khaki', hex: '#7c7a5c' },
      { name: 'Earthy Taupe', hex: '#948a75' }
    ],
    sizes: ['Custom Tailored', 'Free Fit'],
    tags: ['Agbada', 'Labyrinth', 'Earth Tone', 'Ceremonial'],
    stockStatus: 'made_to_order',
    fabricDetails: 'High-thread-count tropical blend with bronze rayon embroidery.',
    careInstructions: 'Dry clean only.',
    isCustomizable: true
  },
  {
    id: 'pw-agb-008',
    name: 'The Royal Sapphire Chevron Agbada',
    category: 'agbada',
    experience: 'native',
    price: 188000,
    originalPrice: 225000,
    shortDescription: 'Royal sapphire blue Agbada with gold border piping & interlocking chevron wave embroidery.',
    description: 'Electrifying royal presence. Saturated sapphire blue fabric rimmed with bright metallic gold border piping, framing an asymmetric neckline and a dense panel of interlocking chevron wave embroidery.',
    images: [
      ASSETS.agbadaRoyalBlue,
      ASSETS.agbadaBlackGoldGrid
    ],
    colors: [
      { name: 'Royal Sapphire Blue', hex: '#143cd4' },
      { name: 'Deep Cobalt', hex: '#0a238f' }
    ],
    sizes: ['Custom Tailored', 'Wingspan 58"-64"'],
    tags: ['Agbada', 'Royal Blue', 'Chevron Wave', 'Gold Piping'],
    stockStatus: 'made_to_order',
    fabricDetails: 'Super 160s Royal Wool-Silk blend with gold bullion threading.',
    careInstructions: 'Professional dry clean only.',
    isCustomizable: true,
    featured: true
  },

  // ==========================================
  // "HIS HIGHNESS PACKAGE" — ARISTOCRATIC REGALIA
  // ==========================================
  {
    id: 'pw-hh-001',
    name: 'His Highness Sovereign Azure Tassel Regalia',
    category: 'his-highness',
    experience: 'native',
    price: 245000,
    originalPrice: 290000,
    shortDescription: 'Royal electric blue asymmetric bandhgala with gold dome buttons & twin bullion tassel brooches.',
    description: 'An exclusive imperial package reserved for monarchs, traditional rulers, and high-society grooms. Handcrafted from Super 180s royal azure wool with a sculptural asymmetric Mandarin collar, polished 24K gold-plated dome buttons, and twin royal crest medallions bearing gold bullion fringe tassels connected by a sweeping curb chain. Includes tailored ceremonial trousers.',
    images: [
      ASSETS.hisHighnessRoyalBlue,
      ASSETS.hisHighnessBurgundy
    ],
    colors: [
      { name: 'Royal Azure Blue', hex: '#0e41ce' },
      { name: 'Imperial Midnight Navy', hex: '#0a1d52' }
    ],
    sizes: ['Bespoke Royal Cut', 'Custom Measurements Only'],
    tags: ['His Highness', 'Royal Regalia', 'Gold Bullion', 'Tassel Brooches', 'Aristocratic'],
    stockStatus: 'made_to_order',
    fabricDetails: 'Super 180s Pure Royal Wool with 24K Gold-Plated Heraldic Crest Buttons and Bullion Tassels.',
    careInstructions: 'Atelier specialist dry clean only. Includes cedar wood presentation box.',
    isCustomizable: true,
    featured: true,
    bestseller: true
  },
  {
    id: 'pw-hh-002',
    name: 'His Highness Imperial Crimson Zardozi Bandhgala',
    category: 'his-highness',
    experience: 'native',
    price: 260000,
    originalPrice: 310000,
    shortDescription: 'Deep crimson velvet bandhgala with hand-embroidered gold bullion zardozi shoulder foliage.',
    description: 'The pinnacle of regal splendor. Crafted from deep crimson silk-velvet with an imperial standing collar, mother-of-pearl and gold dome buttons, and a golden satin pocket square. The right shoulder features hundreds of hours of artisanal gold bullion zardozi threadwork depicting cascading royal laurel foliage.',
    images: [
      ASSETS.hisHighnessBurgundy,
      ASSETS.hisHighnessRoyalBlue
    ],
    colors: [
      { name: 'Imperial Crimson Velvet', hex: '#580e1a' },
      { name: 'Royal Obsidian Velvet', hex: '#121214' }
    ],
    sizes: ['Bespoke Royal Cut', 'Custom Measurements Only'],
    tags: ['His Highness', 'Zardozi Embroidery', 'Silk Velvet', 'Crown Prince'],
    stockStatus: 'made_to_order',
    fabricDetails: 'Pure Italian Silk Velvet with genuine gold bullion zardozi hand embroidery.',
    careInstructions: 'Specialist velvet dry clean only. Steam with non-contact diffuser.',
    isCustomizable: true,
    featured: true
  },

  // ==========================================
  // BESPOKE EXECUTIVE SUITE COLLECTION
  // ==========================================
  {
    id: 'pw-suit-001',
    name: 'The Sovereign Olive Pinstripe Double-Breasted Suit',
    category: 'suit',
    experience: 'native',
    price: 145000,
    originalPrice: 175000,
    shortDescription: 'Bespoke olive green pinstripe double-breasted 6-button suit with peak lapels & tailored trousers.',
    description: 'Impeccable Savile Row sartorial tailoring merged with contemporary Italian flair. Cut from 320 GSM English wool with subtle vertical chalk pinstripes in muted olive green. Features sharp peak lapels, ticket pocket, horn buttons, full canvas construction, and coordinating flat-front trousers.',
    images: [
      ASSETS.suitOlivePinstripe,
      ASSETS.suitNavyGoldButtons,
      ASSETS.suitBlushPink3Piece
    ],
    colors: [
      { name: 'Muted Olive Green', hex: '#5b6b47' },
      { name: 'Forest Charcoal', hex: '#233020' }
    ],
    sizes: ['Custom Tailored', '38R', '40R', '42R', '44R', '46L'],
    tags: ['Suite', 'Double-Breasted', 'Pinstripe', 'Full Canvas', 'Executive'],
    stockStatus: 'made_to_order',
    fabricDetails: '100% Super 150s English Wool with full horsehair canvas chest piece and Bemberg cupro lining.',
    careInstructions: 'Dry clean only. Store on wide contoured wooden hanger.',
    isCustomizable: true,
    featured: true,
    bestseller: true
  },
  {
    id: 'pw-suit-002',
    name: 'The Admiralty Navy Heraldic Double-Breasted Blazer Suit',
    category: 'suit',
    experience: 'native',
    price: 155000,
    originalPrice: 185000,
    shortDescription: 'Classic double-breasted navy blazer suit with six polished gold heraldic crest buttons.',
    description: 'Command boardroom and gala authority. Midnight navy double-breasted jacket with wide peak lapels, framed by six hand-polished gold heraldic crest buttons. Paired with coordinating dress trousers for a high-stature executive silhouette.',
    images: [
      ASSETS.suitNavyGoldButtons,
      ASSETS.suitOlivePinstripe
    ],
    colors: [
      { name: 'Admiralty Navy', hex: '#12254e' },
      { name: 'Midnight Obsidian', hex: '#0f131a' }
    ],
    sizes: ['Custom Tailored', '38R', '40R', '42R', '44R', '46L'],
    tags: ['Suite', 'Double-Breasted', 'Gold Buttons', 'Admiralty Navy'],
    stockStatus: 'made_to_order',
    fabricDetails: 'Super 160s Tasmanian Wool with solid brass heraldic buttons.',
    careInstructions: 'Dry clean only.',
    isCustomizable: true,
    featured: true
  },
  {
    id: 'pw-suit-003',
    name: 'The Rose Champagne 3-Piece Peak Lapel Tuxedo Suit',
    category: 'suit',
    experience: 'native',
    price: 168000,
    originalPrice: 198000,
    shortDescription: 'Dusty rose blush 3-piece suit with wide peak lapel jacket, double-breasted vest & trousers.',
    description: 'A showstopper for high-fashion weddings and red-carpet ceremonies. Sculpted in dusty rose blush wool with dramatic peaked lapels, a 6-button double-breasted horseshoe waistcoat vest, and slim tapered dress trousers. Designed to pair with floral or paisley silk ties.',
    images: [
      ASSETS.suitBlushPink3Piece,
      ASSETS.suitOlivePinstripe
    ],
    colors: [
      { name: 'Dusty Rose Blush', hex: '#b97a80' },
      { name: 'Champagne Sand', hex: '#d9c2a7' }
    ],
    sizes: ['Custom Tailored', '38R', '40R', '42R', '44R', '46L'],
    tags: ['Suite', '3-Piece', 'Peak Lapel', 'Horseshoe Vest', 'Wedding'],
    stockStatus: 'made_to_order',
    fabricDetails: 'Wool-Mohair blend for subtle sheen, crisp drape, and crease recovery.',
    careInstructions: 'Dry clean only.',
    isCustomizable: true,
    featured: true,
    newArrival: true
  },
  {
    id: 'pw-nat-006',
    name: 'The Minimalist Senator Two-Piece in Onyx',
    category: 'two-piece',
    experience: 'native',
    price: 82000,
    shortDescription: 'Clean-cut modern black native two-piece with asymmetric concealed placket.',
    description: 'Understated luxury for the contemporary gentleman. Clean lines, zero visual noise, and a sculptural shoulder silhouette. Crafted with tailored chest darting and a discreet single welt pocket.',
    images: [
      ASSETS.nativeSlateSenator,
      ASSETS.nativeBurgundySenator
    ],
    colors: [
      { name: 'Jet Black', hex: '#0a0a0a' },
      { name: 'Smoky Charcoal', hex: '#2c2e33' }
    ],
    sizes: ['Custom Tailored', 'S (Chest 36)', 'M (Chest 38-40)', 'L (Chest 42-44)', 'XL (Chest 46-48)'],
    tags: ['Two-Piece', 'Modern Native', 'Minimalist', 'Everyday Luxury'],
    stockStatus: 'made_to_order',
    fabricDetails: 'Breathable Italian Stretch Cotton Twill (97% Cotton, 3% Elastane) for effortless mobility.',
    careInstructions: 'Machine wash delicate cold or dry clean. Low heat tumble dry.',
    isCustomizable: true
  },

  // ==========================================
  // CORPORATE SHOES COLLECTION
  // ==========================================
  {
    id: 'pw-shoe-001',
    name: 'Handcrafted Double Monkstrap - Burnished Mahogany',
    category: 'shoes',
    experience: 'native',
    price: 110000,
    originalPrice: 130000,
    shortDescription: 'Full-grain Italian calfskin double buckle monkstraps with hand-painted patina.',
    description: 'Designed to elevate both bespoke Nigerian native attire and corporate suiting. Handcrafted using Goodyear welt construction with dual solid brass buckles, hand-burnished mahogany leather uppers, and stacked leather heel with rubber tap for all-day grip.',
    images: [
      ASSETS.nativeBurgundySenator, // visual pairing context
      ASSETS.nativeWhiteKaftan
    ],
    colors: [
      { name: 'Burnished Mahogany', hex: '#4e281b' },
      { name: 'Obsidian Black', hex: '#111111' },
      { name: 'Cognac Tan', hex: '#8a4b27' }
    ],
    sizes: ['EU 40 / UK 6.5', 'EU 41 / UK 7.5', 'EU 42 / UK 8', 'EU 43 / UK 9', 'EU 44 / UK 9.5', 'EU 45 / UK 10.5', 'EU 46 / UK 11.5'],
    tags: ['Monkstrap', 'Full Grain Leather', 'Goodyear Welt', 'Corporate'],
    stockStatus: 'in_stock',
    fabricDetails: '100% Full-Grain Italian Calfskin leather upper, vegetable-tanned leather insole and leather outsole.',
    careInstructions: 'Condition with beeswax leather balm every 3 months. Use cedar shoe trees between wears.',
    isCustomizable: true,
    bestseller: true
  },
  {
    id: 'pw-shoe-002',
    name: 'The Sovereign Wholecut Oxford - Obsidian Black',
    category: 'shoes',
    experience: 'native',
    price: 115000,
    shortDescription: 'Sculpted from a single flawless piece of Italian calf leather with closed lacing.',
    description: 'The pinnacle of black-tie sophistication. A seamless wholecut oxford cut from a single unbroken skin. Features chisel toe profile, bevelled waist, and Prime Wears gold foil stamped insole.',
    images: [
      ASSETS.nativeSlateSenator,
      ASSETS.nativeBurgundySenator
    ],
    colors: [
      { name: 'Obsidian Black', hex: '#0d0d0e' },
      { name: 'Deep Burgundy Wine', hex: '#45171e' }
    ],
    sizes: ['EU 40 / UK 6.5', 'EU 41 / UK 7.5', 'EU 42 / UK 8', 'EU 43 / UK 9', 'EU 44 / UK 9.5', 'EU 45 / UK 10.5'],
    tags: ['Wholecut Oxford', 'Formal', 'Italian Calfskin'],
    stockStatus: 'in_stock',
    fabricDetails: 'Hand-selected French Box Calf leather with calfskin glove lining.',
    careInstructions: 'Buff with high-gloss carnauba wax polish. Keep dry.',
    isCustomizable: true
  },
  {
    id: 'pw-shoe-003',
    name: 'Artisan Woven Loafer - Warm Cognac',
    category: 'shoes',
    experience: 'native',
    price: 98000,
    shortDescription: 'Hand-braided leather penny loafers crafted for breathable luxury and native styling.',
    description: 'An exceptional companion to Senator outfits and casual native kaftans. Features supple hand-woven leather strips providing exceptional breathability and flexible glove-like comfort.',
    images: [
      ASSETS.nativeBurgundySenator,
      ASSETS.nativeNavyKaftan
    ],
    colors: [
      { name: 'Warm Cognac', hex: '#7a3e1d' },
      { name: 'Ebony Black', hex: '#161616' }
    ],
    sizes: ['EU 41 / UK 7.5', 'EU 42 / UK 8', 'EU 43 / UK 9', 'EU 44 / UK 9.5', 'EU 45 / UK 10.5'],
    tags: ['Woven Loafer', 'Casual Luxury', 'Hand-Braided'],
    stockStatus: 'in_stock',
    fabricDetails: 'Braided vegetable-tanned nappa leather with cushioned memory foam arch support.',
    careInstructions: 'Wipe with damp cloth and apply neutral leather lotion.',
    isCustomizable: true
  },

  // ==========================================
  // CASUAL SWAG COLLECTION
  // ==========================================
  {
    id: 'pw-cas-001',
    name: 'Prime Luxury Zip Knit Polo - Optic White',
    category: 'polo',
    experience: 'casual',
    price: 48000,
    originalPrice: 58000,
    shortDescription: 'Fine-gauge textured knit polo with gold zip puller, contrast tipping and embroidered chest script.',
    description: 'A benchmark in luxury casualwear. Features our signature textured rib vertical knit structure in optic white, contrasted with black double racing stripes along the ribbed collar, cuffs, and hemline. Accented by a gold metal zipper with customized puller and "WEAR YOUR PRIME" typographic print on chest alongside the official PW monogram.',
    images: [
      ASSETS.poloWhite,
      ASSETS.poloBeige,
      ASSETS.poloBlack
    ],
    colors: [
      { name: 'Optic White', hex: '#fdfdfd', imageIndex: 0 },
      { name: 'Sand Dune Beige', hex: '#e3d2be', imageIndex: 1 },
      { name: 'Onyx Black & Gold', hex: '#1a1a1a', imageIndex: 2 }
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL', '3XL'],
    tags: ['Knit Polo', 'Zip Collar', 'Wear Your Prime', 'Bestseller'],
    stockStatus: 'in_stock',
    fabricDetails: '100% Long-Staple Pima Cotton fine-gauge rib knit. Silky tactile feel, anti-pilling, breathable.',
    careInstructions: 'Hand wash cold or gentle machine wash inside out. Dry flat. Do not wring.',
    featured: true,
    bestseller: true,
    newArrival: true
  },
  {
    id: 'pw-cas-002',
    name: 'Prime Luxury Zip Knit Polo - Sand Dune Beige',
    category: 'polo',
    experience: 'casual',
    price: 48000,
    originalPrice: 58000,
    shortDescription: 'Warm oatmeal ribbed knit polo with chocolate brown trim, gold zip and signature branding.',
    description: 'Effortlessly modern and warm in tone. The sand dune beige knit features mocha brown collar and sleeve cuff tipping, solid brass zipper closure, and signature "WEAR YOUR Prime" chest artwork with the PW Prime Wears brand lockup.',
    images: [
      ASSETS.poloBeige,
      ASSETS.poloWhite,
      ASSETS.poloBlack
    ],
    colors: [
      { name: 'Sand Dune Beige', hex: '#dfcfbb', imageIndex: 0 },
      { name: 'Optic White', hex: '#ffffff', imageIndex: 1 },
      { name: 'Onyx Black & Gold', hex: '#161616', imageIndex: 2 }
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL', '3XL'],
    tags: ['Knit Polo', 'Earth Tone', 'Signature Zip', 'Luxury Casual'],
    stockStatus: 'in_stock',
    fabricDetails: '100% Combed Cotton vertical rib knit with shape-retention elastomeric fibers in rib cuffs.',
    careInstructions: 'Cold hand wash recommended. Reshape while damp and dry flat on a towel.',
    featured: true,
    bestseller: true
  },
  {
    id: 'pw-cas-003',
    name: 'Prime Luxury Zip Knit Polo - Onyx & Metallic Gold',
    category: 'polo',
    experience: 'casual',
    price: 48000,
    originalPrice: 60000,
    shortDescription: 'Deep onyx textured knit polo with cream collar accents and metallic gold brushstroke script.',
    description: 'Bold nocturnal elegance. Inky black textured knit with cream contrast collar tipping, luxury gold zipper teeth, and "WEAR YOUR Prime" printed in radiant brushed gold script with the PW monogram emblem.',
    images: [
      ASSETS.poloBlack,
      ASSETS.poloWhite,
      ASSETS.poloBeige
    ],
    colors: [
      { name: 'Onyx Black & Gold', hex: '#111214', imageIndex: 0 },
      { name: 'Optic White', hex: '#ffffff', imageIndex: 1 },
      { name: 'Sand Dune Beige', hex: '#ded1bf', imageIndex: 2 }
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL', '3XL'],
    tags: ['Knit Polo', 'Gold Accent', 'Black Tie Casual', 'Bestseller'],
    stockStatus: 'in_stock',
    fabricDetails: 'Premium mercerized cotton yarn with subtle sheen and dense knit drape.',
    careInstructions: 'Wash inside out in cold water. Iron on reverse of gold print with warm iron.',
    featured: true,
    bestseller: true
  },
  {
    id: 'pw-cas-004',
    name: '"Wear Your Prime" Heavy Fleece Hoodie - Midnight Onyx',
    category: 'hoodie',
    experience: 'casual',
    price: 65000,
    originalPrice: 75000,
    shortDescription: '450 GSM ultra-dense loopback French terry hoodie with metallic gold brush script and PW logo.',
    description: 'As featured in our Studio Mannequin Showroom. Engineered with a structured double-layered hood, dropped shoulders, kangaroo pocket, ribbed cuffs, and gold-tipped cotton drawcords. Finished with "WEAR YOUR Prime" bold chest typography and embroidered sleeve emblem.',
    images: [
      ASSETS.showroomMannequinsAll,
      ASSETS.poloBlack
    ],
    colors: [
      { name: 'Midnight Onyx', hex: '#121213' },
      { name: 'Heather Gray', hex: '#8e939a' },
      { name: 'Chocolate Brown', hex: '#483023' }
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    tags: ['Hoodie', '450 GSM Fleece', 'Streetwear', 'Showroom Featured'],
    stockStatus: 'in_stock',
    fabricDetails: '450 GSM 100% Organic Cotton Heavyweight French Terry, brushed interior for supreme softness.',
    careInstructions: 'Machine wash cold with like colors. Hang dry or tumble dry low.',
    featured: true,
    newArrival: true
  },
  {
    id: 'pw-cas-005',
    name: '"Wear Your Prime" Heavy Fleece Hoodie - Heather Gray',
    category: 'hoodie',
    experience: 'casual',
    price: 65000,
    shortDescription: 'Classic ash heather gray heavyweight hoodie with royal blue script branding.',
    description: 'A versatile essential directly from the showroom line-up. Athletic heather gray cotton with royal blue "WEAR YOUR Prime" chest print and kangaroo pocket. Matches seamlessly with our tailored sweatpants.',
    images: [
      ASSETS.showroomMannequinsAll,
      ASSETS.poloWhite
    ],
    colors: [
      { name: 'Heather Gray', hex: '#9da3a9' },
      { name: 'Midnight Onyx', hex: '#161618' },
      { name: 'Chocolate Brown', hex: '#4d3427' }
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    tags: ['Hoodie', 'Heather Gray', 'Showroom Collection'],
    stockStatus: 'in_stock',
    fabricDetails: '85% Cotton, 15% Recycled Poly for enhanced warmth and pill resistance.',
    careInstructions: 'Machine wash cold. Do not bleach.',
    featured: false
  },
  {
    id: 'pw-cas-006',
    name: '"Wear Your Prime" Heavy Fleece Hoodie - Chocolate Brown',
    category: 'hoodie',
    experience: 'casual',
    price: 65000,
    shortDescription: 'Rich cocoa brown heavyweight hoodie with cream script and PW leg-patch embroidery.',
    description: 'A deeply saturated earth tone from the autumn runway collection. Heavy 450 GSM construction, ribbed side gussets for mobility, and tonal stitching throughout.',
    images: [
      ASSETS.showroomMannequinsAll,
      ASSETS.poloBeige
    ],
    colors: [
      { name: 'Chocolate Brown', hex: '#442c1d' },
      { name: 'Midnight Onyx', hex: '#121212' },
      { name: 'Heather Gray', hex: '#94999f' }
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    tags: ['Hoodie', 'Earth Tone', 'Heavyweight', 'Winter Swag'],
    stockStatus: 'in_stock',
    fabricDetails: '100% Heavy Organic Cotton Fleece with double-lined drawstring hood.',
    careInstructions: 'Wash cold inside out. Flat dry.',
    featured: true
  },
  {
    id: 'pw-cas-007',
    name: 'Prime Tactical Tailored Cargo Joggers - Onyx Black',
    category: 'trousers',
    experience: 'casual',
    price: 55000,
    originalPrice: 65000,
    shortDescription: 'Structured cotton-ripstop cargo trousers with tapered cuffed ankles and PW monogram badge.',
    description: 'The defining bottom worn by every model in our showroom. Features deep accordion cargo pockets on each thigh, elasticized drawstring waistband, concealed zip pockets, and elasticated ankle cuffs that sit cleanly above low-top sneakers.',
    images: [
      ASSETS.showroomMannequinsAll,
      ASSETS.poloBlack
    ],
    colors: [
      { name: 'Onyx Black', hex: '#101011' },
      { name: 'Olive Drab', hex: '#374130' }
    ],
    sizes: ['30 (S)', '32 (M)', '34 (L)', '36 (XL)', '38 (XXL)'],
    tags: ['Cargo Joggers', 'Tapered Ankle', 'Tactical', 'Showroom Essential'],
    stockStatus: 'in_stock',
    fabricDetails: 'Cotton Ripstop (98% Cotton, 2% Spandex) with reinforced double-needle stress points.',
    careInstructions: 'Machine wash cold. Warm iron if desired.',
    bestseller: true
  },

  // ==========================================
  // PRIME HEADWEAR CAPS COLLECTION
  // ==========================================
  {
    id: 'pw-cap-001',
    name: 'Prime Leather Patch Cap - Crimson Red',
    category: 'cap',
    experience: 'casual',
    price: 25000,
    shortDescription: 'Structured 6-panel cotton twill cap in vivid crimson red with genuine black leather PW logo patch.',
    description: 'An iconic street statement piece. Vibrant crimson red cotton twill constructed with a curved visor, embroidered eyelets for airflow, and an authentic debossed black leather patch featuring the white PW Prime Wears monogram. Adjustable brass strap buckle at back.',
    images: [
      ASSETS.capRed,
      ASSETS.capBlack,
      ASSETS.capOlive
    ],
    colors: [
      { name: 'Crimson Red', hex: '#d62227' },
      { name: 'Onyx Black', hex: '#1a1a1a' },
      { name: 'Olive Green', hex: '#485536' },
      { name: 'Crisp White', hex: '#f6f6f6' },
      { name: 'Mocha Brown', hex: '#583c27' }
    ],
    sizes: ['One Size (Adjustable 54-62cm)'],
    tags: ['Cap', 'Leather Patch', 'Accessories', 'Streetwear'],
    stockStatus: 'in_stock',
    fabricDetails: '100% Chino Cotton Twill with Genuine Full-Grain Leather front patch and brass hardware.',
    careInstructions: 'Spot clean only with soft damp sponge. Do not machine wash.',
    bestseller: true
  },
  {
    id: 'pw-cap-002',
    name: 'Prime Leather Patch Cap - Onyx Black',
    category: 'cap',
    experience: 'casual',
    price: 25000,
    shortDescription: 'Monochrome midnight black structured dad cap with tonal black leather PW branding.',
    description: 'The ultimate minimalist stealth accessory. All-black breathable cotton crown with tonal black leather crest, white debossed PW mark, and antique silver back clasp.',
    images: [
      ASSETS.capBlack,
      ASSETS.capRed,
      ASSETS.capWhite
    ],
    colors: [
      { name: 'Onyx Black', hex: '#111213' },
      { name: 'Crimson Red', hex: '#d62227' },
      { name: 'Olive Green', hex: '#485536' }
    ],
    sizes: ['One Size (Adjustable 54-62cm)'],
    tags: ['Cap', 'Stealth Black', 'Leather Patch'],
    stockStatus: 'in_stock',
    fabricDetails: '100% Heavyweight Cotton Twill with moisture-wicking internal sweatband.',
    careInstructions: 'Spot clean.',
    bestseller: true
  },
  {
    id: 'pw-cap-003',
    name: 'Prime Leather Patch Cap - Olive Green',
    category: 'cap',
    experience: 'casual',
    price: 25000,
    shortDescription: 'Military olive green cap with premium black leather PW patch.',
    description: 'Earth-toned refinement tailored for weekend outings. Olive green wash matched with our signature black leather square patch.',
    images: [
      ASSETS.capOlive,
      ASSETS.capBlack,
      ASSETS.capBrown
    ],
    colors: [
      { name: 'Olive Green', hex: '#495637' },
      { name: 'Onyx Black', hex: '#141415' },
      { name: 'Mocha Brown', hex: '#543825' }
    ],
    sizes: ['One Size (Adjustable 54-62cm)'],
    tags: ['Cap', 'Olive', 'Outdoor Luxury'],
    stockStatus: 'in_stock',
    fabricDetails: '100% Washed Cotton Twill with reinforced buckram crown support.',
    careInstructions: 'Spot clean.',
    featured: false
  },
  {
    id: 'pw-cap-004',
    name: 'Prime Leather Patch Cap - Crisp White',
    category: 'cap',
    experience: 'casual',
    price: 25000,
    shortDescription: 'Clean optic white cap with high-contrast black leather PW shield.',
    description: 'Clean, radiant, and sharp. Pairs effortlessly with our white zip knit polo for a pristine monochrome aesthetic.',
    images: [
      ASSETS.capWhite,
      ASSETS.capBlack,
      ASSETS.capRed
    ],
    colors: [
      { name: 'Crisp White', hex: '#ffffff' },
      { name: 'Onyx Black', hex: '#161616' }
    ],
    sizes: ['One Size (Adjustable 54-62cm)'],
    tags: ['Cap', 'Optic White', 'Summer Swag'],
    stockStatus: 'in_stock',
    fabricDetails: 'Treated stain-resistant cotton twill fabric.',
    careInstructions: 'Spot clean with mild soapy water.',
    featured: false
  },
  {
    id: 'pw-cap-005',
    name: 'Prime Leather Patch Cap - Mocha Brown',
    category: 'cap',
    experience: 'casual',
    price: 25000,
    shortDescription: 'Warm roasted coffee mocha brown cap with black leather PW insignia.',
    description: 'Rich warm undertones crafted to harmonize with our beige knit polo and chocolate brown fleece hoodie.',
    images: [
      ASSETS.capBrown,
      ASSETS.capOlive,
      ASSETS.capBlack
    ],
    colors: [
      { name: 'Mocha Brown', hex: '#583a24' },
      { name: 'Sand Beige', hex: '#c5b49f' }
    ],
    sizes: ['One Size (Adjustable 54-62cm)'],
    tags: ['Cap', 'Mocha', 'Autumn Palettes'],
    stockStatus: 'in_stock',
    fabricDetails: '100% Chino Cotton Twill with brushed peach finish.',
    careInstructions: 'Spot clean.',
    featured: false
  },

  // ==========================================
  // FEMALE NATIVE & CORPORATE COUTURE COLLECTION
  // "Her Majesty: The Matriarch & Muse"
  // ==========================================
  {
    id: 'pw-fem-001',
    name: 'The Saffron Peplum Bell-Sleeve Midi Ensemble',
    category: 'female-corporate',
    experience: 'native',
    price: 135000,
    originalPrice: 155000,
    shortDescription: 'Regal saffron-mustard sculpted peplum tunic with dramatic flare bell sleeves, fabric-covered buttons, and tailored front-slit skirt.',
    description: 'A symphony of poise and sovereign authority. Tailored from high-density Italian stretch ottoman crepe, this two-piece masterwork is engineered to accentuate the natural beauty and regal contour of womanhood. Features a contoured jewel neckline, a cinched belted waist that blossoms into architectural peplum wings, trailing elongated bell sleeves, and a matching column midi skirt with hand-stitched covered buttons and a walking vent.',
    images: [
      ASSETS.femaleSaffronBellSleeve,
      ASSETS.femaleMarigoldPencilTwoPiece
    ],
    colors: [
      { name: 'Saffron Gold', hex: '#d99e2b' },
      { name: 'Obsidian Black', hex: '#141416' },
      { name: 'Emerald Forest', hex: '#1b4332' }
    ],
    sizes: ['Custom Tailored', 'UK 8 (Bust 34 / Waist 26)', 'UK 10 (Bust 36 / Waist 28)', 'UK 12 (Bust 38 / Waist 30)', 'UK 14 (Bust 40 / Waist 32)', 'UK 16 (Bust 42 / Waist 35)', 'UK 18 (Bust 45 / Waist 38)'],
    tags: ['Peplum Set', 'Corporate Native', 'Bell Sleeves', 'Her Majesty', 'Bestseller'],
    stockStatus: 'made_to_order',
    fabricDetails: 'Heavyweight 320 GSM Italian Stretch Ottoman Crepe with silk lining & handmade covered dome buttons.',
    careInstructions: 'Specialist dry clean only. Steam iron on reverse at medium heat.',
    isCustomizable: true,
    featured: true,
    bestseller: true
  },
  {
    id: 'pw-fem-002',
    name: 'The Marigold Ruffle & Onyx Pencil Two-Piece',
    category: 'female-corporate',
    experience: 'native',
    price: 125000,
    originalPrice: 145000,
    shortDescription: 'Vibrant marigold v-neck blouse with statement puff sleeves and ruffled cascading peplum, paired with an executive onyx pencil skirt.',
    description: 'Designed for the woman whose very entrance commands the boardroom with grace and radiance. This dual-tone ensemble balances the sunny exuberance of golden marigold with the resolute discipline of deep onyx black. The top boasts an elegant V-neckline, voluminous gathered puff shoulders, vertical contrast buttons, and a double-tier flounce peplum that flatters all silhouettes.',
    images: [
      ASSETS.femaleMarigoldPencilTwoPiece,
      ASSETS.femaleSaffronBellSleeve
    ],
    colors: [
      { name: 'Marigold & Onyx', hex: '#eab308' },
      { name: 'Royal Ivory & Navy', hex: '#faf7ee' },
      { name: 'Crimson & Black', hex: '#991b1b' }
    ],
    sizes: ['Custom Tailored', 'UK 8', 'UK 10', 'UK 12', 'UK 14', 'UK 16', 'UK 18'],
    tags: ['Two-Piece', 'Puff Sleeves', 'Boardroom Couture', 'Ruffle Peplum', 'New Arrival'],
    stockStatus: 'made_to_order',
    fabricDetails: 'Double-face bonded wool gabardine top with structural stretch Milano knit pencil skirt.',
    careInstructions: 'Dry clean only. Store on wide-shoulder contoured hanger.',
    isCustomizable: true,
    featured: true,
    newArrival: true
  },
  {
    id: 'pw-fem-003',
    name: 'The Solstice Brocade Bow-Tie Flared Dress',
    category: 'female-native',
    experience: 'native',
    price: 140000,
    originalPrice: 165000,
    shortDescription: 'Sunlit textured jacquard A-line midi dress featuring an opulent pussy-bow necktie, balloon sleeves, and full circular flare skirt.',
    description: 'Celebrating the divine effervescence of femininity. Woven in a rich Swiss jacquard brocade with embossed floral topography, this sunshine yellow dress radiates dignity and jubilation. A graceful silk-blend bow tie anchors the collar, while a discreet gold zip closure descends into a full flared skirt that dances with every sovereign stride.',
    images: [
      ASSETS.femaleSolsticeBowAline,
      ASSETS.femaleGoldenBotanicalJacquardGown
    ],
    colors: [
      { name: 'Solstice Yellow', hex: '#eab308' },
      { name: 'Champagne Pearl', hex: '#fef08a' },
      { name: 'Imperial Magenta', hex: '#a21caf' }
    ],
    sizes: ['Custom Tailored', 'UK 8', 'UK 10', 'UK 12', 'UK 14', 'UK 16', 'UK 18', 'UK 20'],
    tags: ['A-Line Flare', 'Swiss Brocade', 'Pussy-Bow Collar', 'Ceremonial Native'],
    stockStatus: 'made_to_order',
    fabricDetails: 'High-density 340 GSM Swiss Floral Jacquard Brocade with spun luster threads and anti-static lining.',
    careInstructions: 'Delicate dry clean only. Cool steam.',
    isCustomizable: true,
    featured: true
  },
  {
    id: 'pw-fem-004',
    name: 'The Sahara Camel Peplum Jacket & Espresso Ball-Skirt',
    category: 'female-corporate',
    experience: 'native',
    price: 155000,
    originalPrice: 180000,
    shortDescription: 'Architectural camel-sand tailored peplum jacket with angular envelope flaps and cascading chocolate-espresso floor-length ball skirt.',
    description: 'The absolute zenith of modest luxury and matriarchal dignity. This couture pairing features a warm camel structured jacket with a minimalist round neck, triple chocolate-covered buttons, and sharp architectural peplum points. Below, a deep espresso floor-sweeping A-line skirt flows with dramatic volume, celebrating the stature and intellectual grace of the discerning woman.',
    images: [
      ASSETS.femaleCamelJacketEspressoBallSkirt,
      ASSETS.femaleAlabasterCorsetLaceUpSkirt
    ],
    colors: [
      { name: 'Sahara Camel & Espresso', hex: '#c59b6d' },
      { name: 'Powder Blue & Midnight Navy', hex: '#93c5fd' },
      { name: 'Alabaster & Charcoal', hex: '#f8fafc' }
    ],
    sizes: ['Custom Tailored', 'UK 8', 'UK 10', 'UK 12', 'UK 14', 'UK 16', 'UK 18', 'UK 20'],
    tags: ['Floor-Length Set', 'Architectural Cut', 'Modest Luxury', 'Executive Gala', 'Bestseller'],
    stockStatus: 'made_to_order',
    fabricDetails: 'Super 140s British Tropical Wool jacket paired with heavyweight Duchess Satin full ball skirt.',
    careInstructions: 'Specialist dry clean. Store in breathable canvas garment bag.',
    isCustomizable: true,
    featured: true,
    bestseller: true
  },
  {
    id: 'pw-fem-005',
    name: 'The Alabaster Corset Peplum & Lace-Up Column Skirt',
    category: 'female-corporate',
    experience: 'native',
    price: 145000,
    originalPrice: 168000,
    shortDescription: 'Alabaster ivory structured corset-waist top with chocolate contrast chevron, paired with a mocha column skirt featuring front lace-up detail.',
    description: 'An ode to classic tailoring reinvented for the contemporary queen. The alabaster short-sleeve top incorporates internal boning that comfortably sculpts the torso into a sharp basque waist, framed by contrast chocolate lapels. The coordinating mocha pencil skirt features a center-front eyelet lace-up detail with waxed silk cord, striking the perfect balance between corporate rigor and runway elegance.',
    images: [
      ASSETS.femaleAlabasterCorsetLaceUpSkirt,
      ASSETS.femaleCamelJacketEspressoBallSkirt
    ],
    colors: [
      { name: 'Alabaster Ivory & Mocha', hex: '#f5f5f4' },
      { name: 'Monochrome Noir & Blanc', hex: '#18181b' },
      { name: 'Dusty Rose & Wine', hex: '#fda4af' }
    ],
    sizes: ['Custom Tailored', 'UK 8', 'UK 10', 'UK 12', 'UK 14', 'UK 16', 'UK 18'],
    tags: ['Corset Peplum', 'Lace-Up Detail', 'Sculpted Silhouette', 'Power Dressing'],
    stockStatus: 'made_to_order',
    fabricDetails: 'Bonded Ottoman crepe with internal feather-light French spiral steel stays and silk lacing cord.',
    careInstructions: 'Professional dry clean only.',
    isCustomizable: true,
    featured: true
  },
  {
    id: 'pw-fem-006',
    name: 'The Sovereign Sapphire Mosaic Corset Ballgown',
    category: 'female-native',
    experience: 'native',
    price: 195000,
    originalPrice: 230000,
    shortDescription: 'Regal midnight navy ceremonial gown featuring a stained-glass mosaic botanical corset, square neck, and voluminous balloon sleeves.',
    description: 'Fit for empresses, queens, and celebrated cultural icons. This monarchical gown pairs a deep midnight sapphire duchess satin base with a breathtaking mosaic corset bodice reminiscent of hand-cut stained glass and iridescent leaf veins in turquoise, teal, and celadon. The gathered floor-length skirt drops gracefully, framed by puffed bishop sleeves that crown the wearer with timeless poise.',
    images: [
      ASSETS.femaleSapphireMosaicBallgown,
      ASSETS.femaleGoldenBotanicalJacquardGown
    ],
    colors: [
      { name: 'Sapphire & Stained Glass', hex: '#1e3a8a' },
      { name: 'Obsidian & Gold Leaf', hex: '#18181b' },
      { name: 'Imperial Emerald Mosaic', hex: '#064e3b' }
    ],
    sizes: ['Custom Tailored', 'UK 8', 'UK 10', 'UK 12', 'UK 14', 'UK 16', 'UK 18', 'UK 20', 'UK 22'],
    tags: ['Ballgown', 'Mosaic Corset', 'Royal Ceremonial', 'Coronation Regalia', 'Masterpiece'],
    stockStatus: 'made_to_order',
    fabricDetails: 'Hand-inlaid Italian Micro-Jacquard mosaic bodice with 380 GSM Japanese Duchess Satin skirt & sleeves.',
    careInstructions: 'Haute couture dry clean only. Hand-steam only.',
    isCustomizable: true,
    featured: true,
    bestseller: true
  },
  {
    id: 'pw-fem-007',
    name: 'The Golden Marigold Botanical Jacquard Monarch Gown',
    category: 'female-native',
    experience: 'native',
    price: 175000,
    originalPrice: 210000,
    shortDescription: 'Luminous tangerine-gold and ivory botanical jacquard sleeveless gown with regal box pleats and expansive ballroom volume.',
    description: 'A celebration of life, maternal dignity, and joyous triumph. Woven with metallic spun threads in warm tangerine, golden marigold, and pearlescent ivory, this sleeveless gown features a dignified jewel neckline, a nipped natural waistline, and deep architectural box pleats that produce a majestic, weightless bell silhouette as she moves.',
    images: [
      ASSETS.femaleGoldenBotanicalJacquardGown,
      ASSETS.femaleSapphireMosaicBallgown
    ],
    colors: [
      { name: 'Tangerine & Cream Jacquard', hex: '#ea580c' },
      { name: 'Gold & Ivory Brocade', hex: '#d97706' },
      { name: 'Silver & Rose Damask', hex: '#e2e8f0' }
    ],
    sizes: ['Custom Tailored', 'UK 8', 'UK 10', 'UK 12', 'UK 14', 'UK 16', 'UK 18', 'UK 20'],
    tags: ['Monarch Gown', 'Botanical Jacquard', 'Box Pleats', 'High Society Wedding', 'New Arrival'],
    stockStatus: 'made_to_order',
    fabricDetails: 'French Heavyweight Brocade Jacquard with woven metallic gold thread (360 GSM).',
    careInstructions: 'Specialist dry clean only. Keep stored in moisture-sealed cedar wardrobe bag.',
    isCustomizable: true,
    featured: true,
    newArrival: true
  },
  {
    id: 'pw-fem-008',
    name: 'The Royal Sapphire Military Button Peplum Suit',
    category: 'female-corporate',
    experience: 'native',
    price: 145000,
    originalPrice: 170000,
    shortDescription: 'Commanding sapphire blue peplum sheath dress with standing mandarin collar, gold heraldic military dome buttons, and column midi skirt.',
    description: 'A testament to executive stature and unwavering presence. Tailored from structured Italian stretch Ottoman wool in saturated royal sapphire blue, this dress features an aristocratic standing mandarin collar, single-breasted closure with polished 24K gold heraldic military dome buttons, structured gathered peplum flare at the hip, and an elongated column midi skirt engineered for graceful mobility.',
    images: [
      ASSETS.femaleSapphireMandarinPeplum,
      ASSETS.femaleRoyalPurpleCascadeRuffle
    ],
    colors: [
      { name: 'Royal Sapphire Blue', hex: '#1d4ed8' },
      { name: 'Imperial Cobalt', hex: '#1e3a8a' },
      { name: 'Onyx Black', hex: '#111827' }
    ],
    sizes: ['Custom Tailored', 'UK 8', 'UK 10', 'UK 12', 'UK 14', 'UK 16', 'UK 18', 'UK 20'],
    tags: ['Corporate Native', 'Military Buttons', 'Mandarin Collar', 'Peplum', 'Bestseller'],
    stockStatus: 'made_to_order',
    fabricDetails: 'Italian Stretch Ottoman Wool (330 GSM) with silk habotai lining and 24K gold-plated heraldic shank buttons.',
    careInstructions: 'Specialist dry clean only. Steam press on reverse.',
    isCustomizable: true,
    featured: true,
    bestseller: true,
    newArrival: true
  },
  {
    id: 'pw-fem-009',
    name: 'The Royal Amethyst Cascade Ruffle Column Dress',
    category: 'female-corporate',
    experience: 'native',
    price: 138000,
    originalPrice: 160000,
    shortDescription: 'Vibrant royal purple sheath dress with flutter sleeves, plunging V-neckline, asymmetric cascade ruffles, and front walking vent.',
    description: 'A poetic celebration of feminine allure and poise. Cut in radiant royal amethyst crepe, this figure-skimming pencil dress features flutter cap sleeves that delicately frame the shoulders, an elegant V-neckline, and an architectural cascade of gathered ruffles undulating down the right hip toward a front walking slit.',
    images: [
      ASSETS.femaleRoyalPurpleCascadeRuffle,
      ASSETS.femaleSapphireMandarinPeplum
    ],
    colors: [
      { name: 'Royal Amethyst Purple', hex: '#6b21a8' },
      { name: 'Deep Plum Wine', hex: '#581c87' },
      { name: 'Midnight Onyx', hex: '#0f172a' }
    ],
    sizes: ['Custom Tailored', 'UK 8', 'UK 10', 'UK 12', 'UK 14', 'UK 16', 'UK 18'],
    tags: ['Cascade Ruffle', 'Flutter Sleeve', 'Front Slit', 'Amethyst', 'Cocktail & Corporate'],
    stockStatus: 'made_to_order',
    fabricDetails: 'Heavy Italian Double-Face Crepe (320 GSM) with four-way stretch and anti-crease finish.',
    careInstructions: 'Delicate dry clean only. Store on padded contoured hanger.',
    isCustomizable: true,
    featured: true,
    newArrival: true
  },
  {
    id: 'pw-fem-010',
    name: 'The Haute Chocolate & Burgundy 3D Lace Corset Gown',
    category: 'female-native',
    experience: 'native',
    price: 215000,
    originalPrice: 250000,
    shortDescription: 'Couture espresso molded corset gown with illusion sweetheart neckline, bell lace sleeves, and 3D burgundy floral embroidery.',
    description: 'A breathtaking masterpiece of high-society ceremonial artistry. Designed for grand royal receptions and monumental milestone events. Handcrafted with an espresso brown sculpted corset basque waist, paired with sheer nude illusion sweetheart neckline and sheer illusion sleeves drenched in dimensional hand-beaded burgundy velvet flowers, crystals, and French corded lace cascading down a statuesque mermaid column skirt.',
    images: [
      ASSETS.femaleChocolateBurgundyLaceCorset,
      ASSETS.femaleSapphireMosaicBallgown
    ],
    colors: [
      { name: 'Espresso & Burgundy Velvet', hex: '#451a03' },
      { name: 'Mocha & Rose Gold', hex: '#78350f' },
      { name: 'Black Noir & Emerald', hex: '#064e3b' }
    ],
    sizes: ['Custom Tailored', 'UK 8', 'UK 10', 'UK 12', 'UK 14', 'UK 16', 'UK 18', 'UK 20'],
    tags: ['Haute Couture', '3D Floral Lace', 'Corset Basque', 'Illusion Sleeves', 'Gala Masterpiece'],
    stockStatus: 'made_to_order',
    fabricDetails: 'Molded French boned corset with hand-appliquéd 3D burgundy velvet floral lace and Austrian glass crystal beads.',
    careInstructions: 'Haute couture specialist dry clean only. Store in acid-free presentation box.',
    isCustomizable: true,
    featured: true,
    bestseller: true,
    newArrival: true
  },
  {
    id: 'pw-fem-011',
    name: 'The Celestial Sky Blue Floral Jacquard A-Line Dress',
    category: 'female-native',
    experience: 'native',
    price: 148000,
    originalPrice: 175000,
    shortDescription: 'Luminous sky-blue embossed damask jacquard skater dress with keyhole mandarin neck and box-pleated circular skirt.',
    description: 'Radiating youthfulness, dignity, and pristine beauty. Woven in an ethereal sky-blue and white floral damask jacquard, this dress features short tailored cap sleeves, a chic split-mandarin keyhole neckline, a precision-tailored basque bodice, and deep box pleats that expand into an enchanting circular flared skirt.',
    images: [
      ASSETS.femaleSkyBlueBrocadeAline,
      ASSETS.femaleSolsticeBowAline
    ],
    colors: [
      { name: 'Celestial Sky Blue', hex: '#7dd3fc' },
      { name: 'Ice Lavender', hex: '#c084fc' },
      { name: 'Pearlescent Ivory', hex: '#f8fafc' }
    ],
    sizes: ['Custom Tailored', 'UK 8', 'UK 10', 'UK 12', 'UK 14', 'UK 16', 'UK 18', 'UK 20'],
    tags: ['Damask Jacquard', 'A-Line Flare', 'Box Pleats', 'Sunday Splendor', 'New Arrival'],
    stockStatus: 'made_to_order',
    fabricDetails: '340 GSM Swiss Floral Embossed Damask Jacquard with soft structured cotton lining.',
    careInstructions: 'Delicate dry clean only. Medium steam iron on reverse.',
    isCustomizable: true,
    featured: true,
    newArrival: true
  },
  {
    id: 'pw-fem-012',
    name: 'The Imperial Crimson & Gold Batik Peplum Two-Piece',
    category: 'female-native',
    experience: 'native',
    price: 135000,
    originalPrice: 160000,
    shortDescription: 'High-status crimson red and antique gold geometric African wax batik peplum top with dramatic bell sleeves and matching skirt.',
    description: 'An exuberant tribute to sovereign African identity. Tailored from heavyweight crimson red and antique gold artisanal wax print, featuring a geometric starburst motif. The top has an elegant keyhole teardrop collar, an architectural flared peplum hem, and regal oversized bell sleeves, paired with a clean-cut matching knee-length pencil skirt.',
    images: [
      ASSETS.femaleCrimsonGoldAnkaraPeplum,
      ASSETS.femaleSaffronBellSleeve
    ],
    colors: [
      { name: 'Crimson & Antique Gold', hex: '#b91c1c' },
      { name: 'Emerald & Ochre', hex: '#047857' },
      { name: 'Royal Indigo & Bronze', hex: '#1e3a8a' }
    ],
    sizes: ['Custom Tailored', 'UK 8', 'UK 10', 'UK 12', 'UK 14', 'UK 16', 'UK 18', 'UK 20'],
    tags: ['African Batik', 'Bell Sleeves', 'Peplum Set', 'Cultural Dignity', 'Bestseller'],
    stockStatus: 'made_to_order',
    fabricDetails: 'Authentic 100% Cotton Dutch Wax Batik Print (280 GSM) with structural cotton facing.',
    careInstructions: 'Hand wash cold or gentle dry clean. Press with warm iron inside out.',
    isCustomizable: true,
    featured: true,
    bestseller: true
  },
  {
    id: 'pw-fem-013',
    name: 'The Terracotta Sculptural Stripe Basque Column Dress',
    category: 'female-corporate',
    experience: 'native',
    price: 142000,
    originalPrice: 165000,
    shortDescription: 'Warm caramel-terracotta column dress with mock collar, puff sleeves, and folded basque wings with crisp white racing stripes.',
    description: 'Sharp, modern, and undeniably sophisticated. Cut in rich roasted terracotta crepe with a mock neck collar and gathered puff sleeves. The focal point is the dual folded basque peplum wings flanking the waist, accented by clean white racing diagonal stripes that draw the eye into a statuesque silhouette over a tailored midi pencil skirt.',
    images: [
      ASSETS.femaleCaramelWhiteStripeBasque,
      ASSETS.femaleAlabasterCorsetLaceUpSkirt
    ],
    colors: [
      { name: 'Terracotta Caramel & White', hex: '#b45309' },
      { name: 'Chocolate & Cream', hex: '#78350f' },
      { name: 'Onyx & Blanc', hex: '#18181b' }
    ],
    sizes: ['Custom Tailored', 'UK 8', 'UK 10', 'UK 12', 'UK 14', 'UK 16', 'UK 18'],
    tags: ['Basque Wings', 'Mock Collar', 'Graphic Stripes', 'Executive Runway', 'New Arrival'],
    stockStatus: 'made_to_order',
    fabricDetails: 'Heavy Italian Stretch Milano Crepe (320 GSM) with contrast bonded white twill trim.',
    careInstructions: 'Professional dry clean only. Steam on reverse.',
    isCustomizable: true,
    featured: true,
    newArrival: true
  },
  {
    id: 'pw-fem-014',
    name: 'The Ivory Basque & Burgundy Tribal Handkerchief Ensemble',
    category: 'female-native',
    experience: 'native',
    price: 158000,
    originalPrice: 185000,
    shortDescription: 'Ivory basque bodice with cap sleeves paired with a burgundy and white tribal print handkerchief-hem asymmetric ball skirt.',
    description: 'Where modern sculptural tailoring harmonizes with indigenous African wax art. The structured ivory corset bodice is shaped with clean shoulder cap sleeves and an architectural peaked basque hem, floating above an expansive burgundy and optic white geometric tribal print ball skirt featuring dramatic handkerchief points that flutter gracefully with every step.',
    images: [
      ASSETS.femaleIvoryTribalAsymmetricSkirt,
      ASSETS.femaleChocolateBurgundyLaceCorset
    ],
    colors: [
      { name: 'Ivory & Burgundy Tribal', hex: '#881337' },
      { name: 'Ivory & Navy Tribal', hex: '#1e3a8a' },
      { name: 'Ivory & Forest Tribal', hex: '#14532d' }
    ],
    sizes: ['Custom Tailored', 'UK 8', 'UK 10', 'UK 12', 'UK 14', 'UK 16', 'UK 18', 'UK 20'],
    tags: ['Handkerchief Hem', 'Basque Bodice', 'Tribal Wax Print', 'Cultural Gala', 'Masterpiece'],
    stockStatus: 'made_to_order',
    fabricDetails: 'Bonded Ivory Ottoman Crepe bodice paired with 100% Super Wax Cotton handkerchief flare skirt.',
    careInstructions: 'Specialist dry clean only. Cool steam.',
    isCustomizable: true,
    featured: true,
    bestseller: true
  },
  {
    id: 'pw-fem-015',
    name: 'The Azure & Midnight Navy Asymmetric Pleated Dress',
    category: 'female-corporate',
    experience: 'native',
    price: 132000,
    originalPrice: 155000,
    shortDescription: 'Sky-blue tailored jewel-neck bodice with short puff sleeves and diagonal drop waist into a midnight navy circular pleated skirt.',
    description: 'A contemporary masterclass in color-blocking and movement. Crafted with a powder sky-blue structured bodice with puff shoulders and clean jewel neck, seamlessly transitioning across a dramatic diagonal drop-waistline into a richly gathered midnight navy circular pleated midi skirt.',
    images: [
      ASSETS.femaleSkyNavyColorblockedMidi,
      ASSETS.femaleSkyBlueBrocadeAline
    ],
    colors: [
      { name: 'Azure Blue & Midnight Navy', hex: '#38bdf8' },
      { name: 'Blush Pink & Burgundy', hex: '#f472b6' },
      { name: 'Ivory & Obsidian', hex: '#f8fafc' }
    ],
    sizes: ['Custom Tailored', 'UK 8', 'UK 10', 'UK 12', 'UK 14', 'UK 16', 'UK 18'],
    tags: ['Colorblocked', 'Diagonal Drop Waist', 'Pleated Skirt', 'Day-to-Evening', 'New Arrival'],
    stockStatus: 'made_to_order',
    fabricDetails: 'Premium Italian Crepe De Chine (300 GSM) with bonded diagonal seam and knife pleats.',
    careInstructions: 'Delicate dry clean only.',
    isCustomizable: true,
    featured: true,
    newArrival: true
  },
  {
    id: 'pw-fem-016',
    name: 'The Scarlet Ankara & Chantilly Lace Flounce Shirtdress',
    category: 'female-native',
    experience: 'native',
    price: 128000,
    originalPrice: 150000,
    shortDescription: 'Vibrant red, gold, and black Ankara mini dress with delicate sheer black lace illusion sleeves and tiered shoulder ruffles.',
    description: 'Flirty, regal, and culturally fearless. Crafted from a fiery scarlet red, gold, and black Ankara wax print with swirling circular fan motifs. Detailed with a tailored point shirt collar, contrast black button placket, winged shoulder ruffles, sheer black French Chantilly lace sleeves, and a playful flounce flared mini silhouette.',
    images: [
      ASSETS.femaleAnkaraBlackLaceMini,
      ASSETS.femaleCrimsonGoldAnkaraPeplum
    ],
    colors: [
      { name: 'Scarlet & Gold Fan Ankara', hex: '#dc2626' },
      { name: 'Indigo & Amber Ankara', hex: '#2563eb' },
      { name: 'Emerald & Gold Ankara', hex: '#16a34a' }
    ],
    sizes: ['Custom Tailored', 'UK 6', 'UK 8', 'UK 10', 'UK 12', 'UK 14', 'UK 16'],
    tags: ['Ankara Wax', 'Chantilly Lace', 'Shoulder Ruffles', 'Shirtdress', 'Youthful Luxury'],
    stockStatus: 'made_to_order',
    fabricDetails: 'Guaranteed Real Dutch Wax Cotton combined with sheer French Chantilly corded lace sleeves.',
    careInstructions: 'Delicate hand wash cold or gentle dry clean. Do not bleach.',
    isCustomizable: true,
    featured: true,
    newArrival: true
  }
];

// Virtual Showroom Mannequins (from the supplied reference photograph)
export const SHOWROOM_MANNEQUINS: ShowroomMannequin[] = [
  {
    id: 'mannequin-1',
    name: 'Model 01 (Male)',
    gender: 'male',
    outfitTitle: 'Prime Polo - Olive Green + Black Cargo Joggers',
    category: 'polo',
    colorName: 'Olive Green',
    colorHex: '#485536',
    description: 'Male mannequin in olive green v-collar Prime polo with white tipping, black cargo joggers, and clean white sneakers.',
    image: ASSETS.showroomMannequinsAll,
    price: 46000,
    availableSizes: ['S', 'M', 'L', 'XL', 'XXL'],
    productRefId: 'pw-cas-001',
    positionX: 10,
    zIndex: 1
  },
  {
    id: 'mannequin-2',
    name: 'Model 02 (Female)',
    gender: 'female',
    outfitTitle: 'Prime Polo - Navy Blue + Black Cargo Joggers',
    category: 'polo',
    colorName: 'Navy Blue',
    colorHex: '#1e3256',
    description: 'Female mannequin in royal navy blue polo with white tipping, black cargo joggers, and low-top white kicks.',
    image: ASSETS.showroomMannequinsAll,
    price: 46000,
    availableSizes: ['XS', 'S', 'M', 'L', 'XL'],
    productRefId: 'pw-cas-001',
    positionX: 22,
    zIndex: 2
  },
  {
    id: 'mannequin-3',
    name: 'Model 03 (Male)',
    gender: 'male',
    outfitTitle: 'Prime Polo - Beige Sand + Black Cargo Joggers',
    category: 'polo',
    colorName: 'Beige Sand',
    colorHex: '#dfceb9',
    description: 'Male mannequin in sand dune beige knit polo with chocolate brown trim, paired with black cargo trousers.',
    image: ASSETS.showroomMannequinsAll,
    price: 48000,
    availableSizes: ['S', 'M', 'L', 'XL', 'XXL'],
    productRefId: 'pw-cas-002',
    positionX: 35,
    zIndex: 1
  },
  {
    id: 'mannequin-4',
    name: 'Model 04 (Female)',
    gender: 'female',
    outfitTitle: 'Prime Polo - Black & White + Black Cargo Joggers',
    category: 'polo',
    colorName: 'Black Onyx',
    colorHex: '#121214',
    description: 'Female mannequin in black knit polo with white collar trims, black cargo joggers, hands casually in pocket.',
    image: ASSETS.showroomMannequinsAll,
    price: 48000,
    availableSizes: ['XS', 'S', 'M', 'L', 'XL'],
    productRefId: 'pw-cas-003',
    positionX: 48,
    zIndex: 2
  },
  {
    id: 'mannequin-5',
    name: 'Model 05 (Female)',
    gender: 'female',
    outfitTitle: 'Prime Polo - Blush Pink + Black Cargo Joggers',
    category: 'polo',
    colorName: 'Blush Pink',
    colorHex: '#ec6491',
    description: 'Female mannequin in eye-catching pink polo with white sleeve stripes, black cargo joggers, and shoulder bag.',
    image: ASSETS.showroomMannequinsAll,
    price: 46000,
    availableSizes: ['XS', 'S', 'M', 'L'],
    productRefId: 'pw-cas-001',
    positionX: 60,
    zIndex: 3
  },
  {
    id: 'mannequin-6',
    name: 'Model 06 (Male)',
    gender: 'male',
    outfitTitle: 'Prime Hoodie - Black + Black Cargo Joggers',
    category: 'hoodie',
    colorName: 'Black & Gold',
    colorHex: '#141416',
    description: 'Male mannequin in heavy fleece black hoodie with gold "Wear Your Prime" script and black cargo trousers.',
    image: ASSETS.showroomMannequinsAll,
    price: 65000,
    availableSizes: ['S', 'M', 'L', 'XL', 'XXL'],
    productRefId: 'pw-cas-004',
    positionX: 72,
    zIndex: 3
  },
  {
    id: 'mannequin-7',
    name: 'Model 07 (Male)',
    gender: 'male',
    outfitTitle: 'Prime Hoodie - Heather Gray + Matching Joggers',
    category: 'hoodie',
    colorName: 'Heather Gray',
    colorHex: '#9ca2a8',
    description: 'Male mannequin in full grey monochromatic fleece tracksuit with royal blue lettering and crisp white kicks.',
    image: ASSETS.showroomMannequinsAll,
    price: 65000,
    availableSizes: ['S', 'M', 'L', 'XL', 'XXL'],
    productRefId: 'pw-cas-005',
    positionX: 84,
    zIndex: 2
  },
  {
    id: 'mannequin-8',
    name: 'Model 08 (Female)',
    gender: 'female',
    outfitTitle: 'Prime Hoodie - Chocolate Brown + Matching Joggers',
    category: 'hoodie',
    colorName: 'Chocolate Brown',
    colorHex: '#4c3222',
    description: 'Female mannequin in full chocolate brown tracksuit with cream script and PW calf embroidery.',
    image: ASSETS.showroomMannequinsAll,
    price: 65000,
    availableSizes: ['XS', 'S', 'M', 'L', 'XL'],
    productRefId: 'pw-cas-006',
    positionX: 94,
    zIndex: 1
  }
];
