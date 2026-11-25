export interface FabricTextureProfile {
  id: string;
  name: string;
  description: string;
  weaveType: string;
  threadCount: string;
  weightGsm: string;
  luster: string;
  tactileFeel: string;
  origin: string;
  breathability: string;
  drape: string;
  recommendedCare: string;
  svgPattern: string; // SVG pattern representation
  overlayBlendMode: 'overlay' | 'soft-light' | 'multiply' | 'screen';
  defaultZoom: number;
}

export const FABRIC_TEXTURES: Record<string, FabricTextureProfile> = {
  cashmere_twill: {
    id: 'cashmere_twill',
    name: 'Super 160s Cashmere-Wool Twill',
    description: 'Ultra-fine double-twisted yarn woven in a 45° diagonal twill pattern. Renowned for its buttery hand-feel, subtle natural luster, and extraordinary crease recovery.',
    weaveType: '2/2 Diagonal Worsted Twill',
    threadCount: '160/2 Double Ply',
    weightGsm: '310 GSM (Bespoke Weight)',
    luster: 'Soft Silken Sheen',
    tactileFeel: 'Sumptuously smooth with gentle cashmere loft',
    origin: 'Biella Mill, Northern Italy',
    breathability: 'High (Micro-porous wool fibers)',
    drape: 'Structured fluid drape with sculpted silhouette',
    recommendedCare: 'Specialist dry clean, cedar wardrobe storage',
    svgPattern: `data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'><defs><linearGradient id='grad' x1='0%' y1='0%' x2='100%' y2='100%'><stop offset='0%' stop-color='%23ffffff' stop-opacity='0.22'/><stop offset='50%' stop-color='%23000000' stop-opacity='0.18'/><stop offset='100%' stop-color='%23ffffff' stop-opacity='0.15'/></linearGradient></defs><rect width='24' height='24' fill='none'/><path d='M0 6 L6 0 M0 18 L18 0 M6 24 L24 6 M18 24 L24 18' stroke='%23ffffff' stroke-opacity='0.28' stroke-width='1.5'/><path d='M0 12 L12 0 M12 24 L24 12' stroke='%23000000' stroke-opacity='0.32' stroke-width='1.2'/><path d='M0 0 L24 24' stroke='url(%23grad)' stroke-width='1' stroke-opacity='0.4'/></svg>`,
    overlayBlendMode: 'overlay',
    defaultZoom: 2.8,
  },

  jacquard_damask: {
    id: 'jacquard_damask',
    name: 'Imperial Jacquard Brocade Damask',
    description: 'High-density architectural jacquard weave designed for grand agbadas. Features raised relief motifs, interlaced metallic bullion threads, and an opulent regal sheen.',
    weaveType: 'Complex Multi-Heddle Jacquard Relief',
    threadCount: '240 High-Density Weft',
    weightGsm: '420 GSM (Imperial Grand Weight)',
    luster: 'Reflective Metallic & Luminous Gold Sheen',
    tactileFeel: 'Crisp, monumental drape with tactile embossed embroidery',
    origin: 'Heritage West African Brocade Atelier',
    breathability: 'Moderate-High (Breathable cotton warp base)',
    drape: 'Stately architectural drape with majestic wing spread',
    recommendedCare: 'Delicate steam press, professional garment hanger',
    svgPattern: `data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='36' height='36' viewBox='0 0 36 36'><defs><radialGradient id='gld' cx='50%' cy='50%' r='50%'><stop offset='0%' stop-color='%23ffd700' stop-opacity='0.45'/><stop offset='100%' stop-color='%23b8860b' stop-opacity='0.1'/></radialGradient></defs><rect width='36' height='36' fill='none'/><path d='M18 0 L36 18 L18 36 L0 18 Z' stroke='%23ffffff' stroke-width='1' stroke-opacity='0.25' fill='url(%23gld)'/><circle cx='18' cy='18' r='6' stroke='%23ffd700' stroke-width='1.2' stroke-opacity='0.5' fill='none'/><path d='M18 6 L18 30 M6 18 L30 18' stroke='%23ffffff' stroke-width='0.8' stroke-opacity='0.35'/><path d='M0 0 L12 12 M24 24 L36 36 M36 0 L24 12 M12 24 L0 36' stroke='%23000000' stroke-width='1' stroke-opacity='0.3'/></svg>`,
    overlayBlendMode: 'overlay',
    defaultZoom: 3.0,
  },

  irish_linen: {
    id: 'irish_linen',
    name: '100% Crisp Irish Flax Linen',
    description: 'Natural unadulterated flax fibers woven into a distinct slub crosshatch structure. Renowned for its crisp cooling properties, subtle natural striations, and immaculate standing collar hold.',
    weaveType: 'Plain Crosshatch Slub Weave',
    threadCount: '90/1 Single Pure Flax',
    weightGsm: '260 GSM (Tropical Luxury)',
    luster: 'Natural Matte with Fine Fiber Sheen',
    tactileFeel: 'Firm and textured initially, softening with bespoke wear',
    origin: 'Belfast Flax Guild, Ireland',
    breathability: 'Maximum Airflow (100% natural flax conduction)',
    drape: 'Crisp architectural lines with sharp trouser crease',
    recommendedCare: 'Warm water gentle cycle or dry clean. Starch to preference.',
    svgPattern: `data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20'><rect width='20' height='20' fill='none'/><path d='M0 4 L20 4 M0 10 L20 10 M0 16 L20 16' stroke='%23ffffff' stroke-width='1.2' stroke-opacity='0.3'/><path d='M4 0 L4 20 M10 0 L10 20 M16 0 L16 20' stroke='%23000000' stroke-width='1.2' stroke-opacity='0.25'/><circle cx='10' cy='10' r='1.5' fill='%23ffffff' fill-opacity='0.35'/></svg>`,
    overlayBlendMode: 'soft-light',
    defaultZoom: 2.6,
  },

  guinea_brocade: {
    id: 'guinea_brocade',
    name: 'Royal Guinea Brocade (Bazin Riche)',
    description: 'Premium mercerized long-staple Egyptian cotton finished with ancestral starching and hand-beating techniques for a vibrant, shimmering luster and distinct crisp whisper.',
    weaveType: 'High-Density Mercerized Damask',
    threadCount: '300 Double-Twist Cotton',
    weightGsm: '340 GSM',
    luster: 'High Luminous Shimmer',
    tactileFeel: 'Crisply starched, resonant, silky to the fingertips',
    origin: 'Kano & Bamako Artisan Guilds',
    breathability: 'Exceptional (Breathable pure combed cotton)',
    drape: 'Voluminous, standing folds with royal majesty',
    recommendedCare: 'Professional dry clean. Light spray starch when ironed.',
    svgPattern: `data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='28' height='28' viewBox='0 0 28 28'><rect width='28' height='28' fill='none'/><path d='M14 2 L26 14 L14 26 L2 14 Z' stroke='%23ffffff' stroke-width='1' stroke-opacity='0.35' fill='none'/><path d='M14 6 L22 14 L14 22 L6 14 Z' stroke='%23ffffff' stroke-width='0.6' stroke-opacity='0.4' fill='none'/><circle cx='14' cy='14' r='2' fill='%23ffd700' fill-opacity='0.4'/><line x1='0' y1='0' x2='28' y2='28' stroke='%23000000' stroke-width='0.8' stroke-opacity='0.25'/><line x1='28' y1='0' x2='0' y2='28' stroke='%23000000' stroke-width='0.8' stroke-opacity='0.25'/></svg>`,
    overlayBlendMode: 'overlay',
    defaultZoom: 2.8,
  },

  bullion_embroidery: {
    id: 'bullion_embroidery',
    name: 'Artisanal Bullion Thread & Corded Relief',
    description: 'Hand-guided embroidery featuring metallic gold and silver wound bullion cord, raised satin stitch, and intricate micro-chain patterns framing collars and chest plackets.',
    weaveType: 'Raised Multi-Strand Bullion Relief',
    threadCount: '18-Karat Gold/Silver Filament Cord',
    weightGsm: '500+ GSM (Accent Embroidery Area)',
    luster: 'Dazzling Specular Metallic Gilt',
    tactileFeel: 'Sculpted, three-dimensional tactile ridges',
    origin: 'Prime Wears Master Embroidery Guild, Nigeria',
    breathability: 'Concentrated decorative embellishment',
    drape: 'Firm ornamental stabilization',
    recommendedCare: 'Iron on reverse with press cloth. Do not apply direct hot iron.',
    svgPattern: `data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 32 32'><rect width='32' height='32' fill='none'/><path d='M2 16 Q8 6 16 16 T30 16' fill='none' stroke='%23ffd700' stroke-width='1.5' stroke-opacity='0.6'/><path d='M2 16 Q8 26 16 16 T30 16' fill='none' stroke='%23e6b800' stroke-width='1.5' stroke-opacity='0.5'/><circle cx='8' cy='16' r='1.5' fill='%23fff' fill-opacity='0.8'/><circle cx='24' cy='16' r='1.5' fill='%23fff' fill-opacity='0.8'/><circle cx='16' cy='16' r='2' fill='%23ffd700' fill-opacity='0.9'/></svg>`,
    overlayBlendMode: 'overlay',
    defaultZoom: 3.2,
  },

  tropical_wool: {
    id: 'tropical_wool',
    name: 'Breathable Tropical Wool-Poly Blend',
    description: 'Crease-resistant open weave engineered specifically for the West African climate. Features anti-wrinkle micro-fibers, natural moisture wicking, and sharp crease retention.',
    weaveType: 'Open-Plain Aerated Suiting Weave',
    threadCount: '120s High-Twist',
    weightGsm: '280 GSM',
    luster: 'Subtle Matte Finish',
    tactileFeel: 'Crisp, featherlight, and exceptionally breathable',
    origin: 'European Specialist Mill',
    breathability: 'Exceptional (Engineered climate aeration)',
    drape: 'Sharply tailored, holds trouser pleat all day',
    recommendedCare: 'Hand wash cold or gentle dry clean. Low steam.',
    svgPattern: `data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16'><rect width='16' height='16' fill='none'/><line x1='0' y1='2' x2='16' y2='2' stroke='%23ffffff' stroke-width='0.8' stroke-opacity='0.3'/><line x1='0' y1='10' x2='16' y2='10' stroke='%23ffffff' stroke-width='0.8' stroke-opacity='0.3'/><line x1='2' y1='0' x2='2' y2='16' stroke='%23000000' stroke-width='0.8' stroke-opacity='0.25'/><line x1='10' y1='0' x2='10' y2='16' stroke='%23000000' stroke-width='0.8' stroke-opacity='0.25'/></svg>`,
    overlayBlendMode: 'overlay',
    defaultZoom: 2.5,
  }
};

/**
 * Matches a product to its best native fabric texture profile
 */
export function getProductFabricProfile(product: {
  category?: string;
  name?: string;
  tags?: string[];
  fabricDetails?: string;
  experience?: string;
}): FabricTextureProfile {
  const text = `${product.name || ''} ${product.category || ''} ${product.fabricDetails || ''} ${(product.tags || []).join(' ')}`.toLowerCase();

  if (text.includes('agbada') || text.includes('his highness') || text.includes('highness') || text.includes('jacquard') || text.includes('damask')) {
    return FABRIC_TEXTURES.jacquard_damask;
  }
  if (text.includes('embroidery') || text.includes('bullion') || text.includes('monarch') || text.includes('gold')) {
    return FABRIC_TEXTURES.bullion_embroidery;
  }
  if (text.includes('linen') || text.includes('flax') || text.includes('kaftan') && text.includes('white')) {
    return FABRIC_TEXTURES.irish_linen;
  }
  if (text.includes('bazin') || text.includes('guinea') || text.includes('brocade')) {
    return FABRIC_TEXTURES.guinea_brocade;
  }
  if (text.includes('cashmere') || text.includes('senator') || text.includes('pinstripe') || text.includes('160s')) {
    return FABRIC_TEXTURES.cashmere_twill;
  }
  if (text.includes('suit') || text.includes('tropical') || text.includes('blazer')) {
    return FABRIC_TEXTURES.tropical_wool;
  }

  // Default to cashmere twill for native wear
  return FABRIC_TEXTURES.cashmere_twill;
}
