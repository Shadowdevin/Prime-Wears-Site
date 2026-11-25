import React, { createContext, useContext, useState, useEffect } from 'react';
import { CustomOrder, ContemporaryOrder, QuoteStatus, ShippingStatus, OrderMilestone } from '../types';
import { ASSETS } from '../data/assets';

interface OrderLookupResult {
  type: 'bespoke' | 'contemporary';
  bespokeOrder?: CustomOrder;
  contemporaryOrder?: ContemporaryOrder;
}

interface OrderContextType {
  customOrders: CustomOrder[];
  contemporaryOrders: ContemporaryOrder[];
  createCustomOrder: (order: Omit<CustomOrder, 'id' | 'createdAt' | 'quoteStatus'>) => CustomOrder;
  createContemporaryOrder: (order: Omit<ContemporaryOrder, 'id' | 'createdAt' | 'timeline' | 'shippingStatus'>) => ContemporaryOrder;
  updateOrderStatus: (orderId: string, status: QuoteStatus, quoteAmount?: number, notes?: string) => void;
  updateContemporaryStatus: (orderId: string, status: ShippingStatus, carrier?: string, trackingNumber?: string) => void;
  deleteCustomOrder: (orderId: string) => void;
  getOrderById: (orderId: string) => CustomOrder | undefined;
  lookupOrder: (referenceNumber: string) => OrderLookupResult | null;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

const ORDERS_STORAGE_KEY = 'prime_wears_custom_orders_v2';
const CONTEMPORARY_ORDERS_KEY = 'prime_wears_contemporary_orders_v2';

const INITIAL_ORDERS: CustomOrder[] = [
  {
    id: 'PW-ORD-2026-N8921',
    createdAt: '2026-10-24T14:30:00Z',
    customerName: 'Barrister Babatunde Adeleke',
    email: 'babatunde.adeleke@lexchambers.ng',
    phone: '+234 803 456 7890',
    deliveryAddress: 'Plot 12A, Victoria Garden City, Lekki Phase 1',
    deliveryCity: 'Lagos',
    deliveryState: 'Lagos State',
    orderType: 'native_tailoring',
    garmentCategory: 'senator',
    selectedDesignId: 'pw-nat-001',
    selectedDesignName: 'The Burgundy Rosette Senator Two-Piece',
    referenceImage: ASSETS.nativeBurgundySenator,
    modificationsDescription: 'Deep navy-blue Italian wool fabric with French cuffs, concealed placket, and custom mother-of-pearl buttons. Ensure 2-inch turn-up hem on trousers.',
    measurements: {
      unit: 'in',
      shoulder: 19.5,
      chest: 42.0,
      neck: 16.5,
      sleeveLength: 26.0,
      garmentLength: 38.0,
      waist: 34.0,
      trouserLength: 42.5,
      thigh: 25.0,
      inseam: 32.0
    },
    fabricPreference: 'Super 160s Italian Cashmere Wool',
    colorPreference: 'Deep Royal Navy with Silver Stitching',
    quantity: 1,
    requestedCompletionDate: '2026-11-15',
    specialInstructions: 'Commissioned for the Nigerian Bar Association Gala. Fitting scheduled in Victoria Island.',
    quoteStatus: 'quotation_sent',
    quotedAmountNGN: 110000,
    adminNotes: 'Fabric swatches approved by client. Ready for pattern cut upon deposit confirmation.',
    carrier: 'Prime Wears White-Glove Logistics',
    trackingNumber: 'PW-EXP-9921-LOS',
    fulfillmentHub: 'Uyo Master Atelier Flagship',
    timeline: [
      {
        title: 'Bespoke Commission Received',
        description: 'Measurements & style dossier logged into the master atelier ledger.',
        timestamp: '2026-10-24 14:30',
        location: 'Uyo Flagship Atelier',
        completed: true
      },
      {
        title: 'Fabric Swatch & Master Tailor Review',
        description: 'Super 160s Cashmere Wool selected and approved by Lead Master Tailor.',
        timestamp: '2026-10-25 10:15',
        location: 'Uyo Textile Vault',
        completed: true
      },
      {
        title: 'Quotation Dispatched to Client',
        description: 'Official atelier bespoke quote sent via email & WhatsApp concierge.',
        timestamp: '2026-10-25 16:00',
        location: 'Client Concierge Desk',
        completed: true,
        current: true
      },
      {
        title: 'Precision Pattern Cutting',
        description: 'Individual paper patterns drafted to Barrister Adeleke’s exact silhouette.',
        timestamp: 'Pending Client Authorization',
        location: 'Uyo Cutting Floor',
        completed: false
      },
      {
        title: 'Hand-Assembly & Structural Basting',
        description: 'Chest canvas shaping, collar forming, and internal horn button stitching.',
        timestamp: 'Estimated: 2026-11-04',
        location: 'Uyo Master Tailoring Bench',
        completed: false
      },
      {
        title: 'First Basting Fitting / Quality Inspection',
        description: 'Hand pressing, tension checks, and sleeve-pitch verification.',
        timestamp: 'Estimated: 2026-11-10',
        location: 'Victoria Island Concierge Suite',
        completed: false
      },
      {
        title: 'White-Glove Delivery',
        description: 'Packaged in breathable cedar garment bag and hand-delivered.',
        timestamp: 'Estimated: 2026-11-15',
        location: 'Plot 12A, VGC, Lekki',
        completed: false
      }
    ]
  },
  {
    id: 'PW-ORD-2026-N8922',
    createdAt: '2026-10-25T09:15:00Z',
    customerName: 'Chief Emeka Okonkwo',
    email: 'chief.okonkwo@transcorpenergy.com',
    phone: '+234 802 987 6543',
    deliveryAddress: '7 Maitama Drive, Ministers Hill',
    deliveryCity: 'Abuja',
    deliveryState: 'FCT',
    orderType: 'native_tailoring',
    garmentCategory: 'agbada',
    selectedDesignId: 'pw-nat-005',
    selectedDesignName: 'The Grand Imperial Agbada 3-Piece',
    referenceImage: ASSETS.agbadaChampagneQuatrefoil,
    modificationsDescription: 'Champagne Quatrefoil heavy damask Agbada with custom gold bullion crest on the neck and back yoke. Inner senator with concealed buttons and zip at collar.',
    measurements: {
      unit: 'cm',
      shoulder: 52,
      chest: 116,
      agbadaSpan: 165,
      garmentLength: 145,
      waist: 104,
      trouserLength: 108,
      neck: 44
    },
    fabricPreference: 'Heavyweight Swiss Damask Brocade',
    colorPreference: 'Champagne Quatrefoil with Rich Amber Gold Embroidery',
    quantity: 2,
    requestedCompletionDate: '2026-11-20',
    specialInstructions: 'One set for Chief and one matching set for his son (measurements supplemented).',
    quoteStatus: 'under_review',
    quotedAmountNGN: 320000,
    adminNotes: 'Reviewing gold bullion thread availability in the Calabar & Uyo workshops.',
    carrier: 'DHL Express Nigeria VIP Courier',
    trackingNumber: 'DHL-VIP-881940-ABJ',
    fulfillmentHub: 'Calabar Luxury Flagship Studio',
    timeline: [
      {
        title: 'Grand Agbada Commission Logged',
        description: 'Imperial 3-Piece ensemble request logged for Chief Okonkwo.',
        timestamp: '2026-10-25 09:15',
        location: 'Calabar Marian Atelier',
        completed: true,
        current: true
      },
      {
        title: 'Embroidery Vector Digitization',
        description: 'Translating custom Quatrefoil gold crest into high-density bullion stitching.',
        timestamp: 'In Progress',
        location: 'Calabar Design Lab',
        completed: false
      },
      {
        title: 'Swiss Damask Sourcing & Inspection',
        description: 'Inspecting 16 meters of imported champagne damask under daylight bulbs.',
        timestamp: 'Estimated: 2026-10-30',
        location: 'Calabar Fabric Vault',
        completed: false
      },
      {
        title: 'Wingspan Tailoring & Braid Application',
        description: '165cm ceremonial wingspan hand-joined with French seams.',
        timestamp: 'Estimated: 2026-11-08',
        location: 'Calabar Master Tailoring Bench',
        completed: false
      },
      {
        title: 'Final Steam Press & Luxury Presentation Box',
        description: 'Gold-embossed royal presentation box with cedar accessories.',
        timestamp: 'Estimated: 2026-11-18',
        location: 'Calabar Dispatch Hub',
        completed: false
      }
    ]
  },
  {
    id: 'PW-SUIT-2026-4402',
    createdAt: '2026-10-22T10:00:00Z',
    customerName: 'Engr. Tariye Briggs',
    email: 'tariye.briggs@deepsea-engineering.com',
    phone: '+234 809 111 2233',
    deliveryAddress: '15 Trans Amadi Industrial Layout',
    deliveryCity: 'Port-Harcourt',
    deliveryState: 'Rivers State',
    orderType: 'bespoke_suit',
    garmentCategory: 'suit',
    selectedDesignId: 'pw-suit-002',
    selectedDesignName: 'The Diplomat Double-Breasted Wool Blazer & Trouser',
    referenceImage: ASSETS.suitNavyGoldButtons,
    modificationsDescription: 'Midnight navy double-breasted 6x2 silhouette with custom solid brass military buttons and crimson silk inner lining.',
    measurements: {
      unit: 'in',
      shoulder: 20.0,
      chest: 44.0,
      neck: 17.0,
      sleeveLength: 26.5,
      garmentLength: 31.0,
      waist: 36.0,
      trouserLength: 43.0,
      thigh: 26.0,
      inseam: 33.0
    },
    fabricPreference: 'Super 180s Huddersfield English Wool',
    colorPreference: 'Midnight Navy with Gold Accent Buttons',
    quantity: 1,
    requestedCompletionDate: '2026-11-05',
    specialInstructions: 'Fitting at the Port-Harcourt Olu Obasanjo Studio.',
    quoteStatus: 'ready_for_fitting',
    quotedAmountNGN: 185000,
    adminNotes: 'Suit canvas assembled. Waiting for Engr. Briggs to visit the Port-Harcourt Studio for basting check.',
    carrier: 'Prime Wears PH Concierge Fleet',
    trackingNumber: 'PW-PH-4402-EXP',
    fulfillmentHub: 'Port-Harcourt Luxury Studio (GRA Phase 2)',
    timeline: [
      {
        title: 'Savile Row Commission Registered',
        description: 'Double-breasted navy pattern registered in Port-Harcourt ledger.',
        timestamp: '2026-10-22 10:00',
        location: 'PH GRA Phase 2 Studio',
        completed: true
      },
      {
        title: 'Huddersfield Wool Sourced & Inspected',
        description: 'Super 180s English worsted wool cleared from customs and inspected.',
        timestamp: '2026-10-23 11:30',
        location: 'PH Textile Archive',
        completed: true
      },
      {
        title: 'Canvas Structure & Lapel Roll Construction',
        description: 'Full floating horsehair canvas pad-stitched by hand into chest and peak lapels.',
        timestamp: '2026-10-26 15:45',
        location: 'PH Master Tailoring Bench',
        completed: true
      },
      {
        title: 'Ready for Basting Fitting',
        description: 'Outfit prepared with white basting thread for client silhouette calibration.',
        timestamp: '2026-10-28 09:00',
        location: 'PH VIP Fitting Lounge',
        completed: true,
        current: true
      },
      {
        title: 'Final Hand Finishing & Buttonhole Milanaise Stitch',
        description: 'Mother of pearl and solid brass buttons stitched with waxed silk cord.',
        timestamp: 'Scheduled post-fitting',
        location: 'PH Atelier Bench',
        completed: false
      }
    ]
  },
  {
    id: 'PW-HH-2026-1920',
    createdAt: '2026-10-20T16:20:00Z',
    customerName: 'HRH Prince Oladipo Adeyemi',
    email: 'prince.adeyemi@royalheritage.ng',
    phone: '+234 803 999 8877',
    deliveryAddress: 'Palace Enclave, Old GRA',
    deliveryCity: 'Port-Harcourt',
    deliveryState: 'Rivers State',
    orderType: 'his_highness',
    garmentCategory: 'his-highness',
    selectedDesignId: 'pw-hh-001',
    selectedDesignName: 'The Royal Asymmetrical Commander Regalia',
    referenceImage: ASSETS.hisHighnessRoyalBlue,
    modificationsDescription: 'His Highness package with royal blue wool, custom ceremonial braided epaulette aiguillette chain, mandarin high collar, and gold crested heraldry buttons.',
    measurements: {
      unit: 'in',
      shoulder: 20.5,
      chest: 43.5,
      neck: 17.5,
      sleeveLength: 27.0,
      garmentLength: 40.0,
      waist: 35.0,
      trouserLength: 43.0,
      thigh: 25.5
    },
    fabricPreference: 'High-Density Royal Worsted Wool & Bullion Gold Trim',
    colorPreference: 'Cobalt Royal Blue with Heavy Gold Aiguillette',
    quantity: 1,
    requestedCompletionDate: '2026-11-12',
    specialInstructions: 'Includes matching ceremonial trousers and complimentary shoe horn.',
    quoteStatus: 'in_production',
    quotedAmountNGN: 240000,
    adminNotes: 'Gold bullion tassel shoulder chain imported and fitted to tunic front.',
    carrier: 'Prime Wears Royal Courier Diplomatic Service',
    trackingNumber: 'PW-DIP-1920-ROYAL',
    fulfillmentHub: 'Uyo Master Atelier Flagship',
    timeline: [
      {
        title: 'Royal Commission Placed',
        description: 'His Highness package commission logged for Prince Adeyemi.',
        timestamp: '2026-10-20 16:20',
        location: 'Uyo VIP Client Salon',
        completed: true
      },
      {
        title: 'Gold Bullion Chains & Epaulette Fabrication',
        description: 'Double braided aiguillette chain hand-assembled by gold bullion artisan.',
        timestamp: '2026-10-23 14:00',
        location: 'Uyo Regalia Guild',
        completed: true
      },
      {
        title: 'Asymmetrical High-Collar Assembly in Progress',
        description: 'Mandarin collar and diagonal 5-button front flap currently on sewing table.',
        timestamp: '2026-10-27 11:00',
        location: 'Uyo Master Atelier Bench 3',
        completed: true,
        current: true
      },
      {
        title: 'Quality Verification & Silk Steam Pressing',
        description: 'Anti-crease treatment and gold tassel alignment inspection.',
        timestamp: 'Estimated: 2026-11-06',
        location: 'Uyo Finishing Bay',
        completed: false
      },
      {
        title: 'Dispatched to Royal Residence',
        description: 'Chauffeured delivery to Palace Enclave, Old GRA.',
        timestamp: 'Estimated: 2026-11-12',
        location: 'In Transit',
        completed: false
      }
    ]
  },
  {
    id: 'PW-ORD-2026-S7734',
    createdAt: '2026-10-26T11:45:00Z',
    customerName: 'Dr. Kelechi Nwosu',
    email: 'dr.nwosu@stnicholas.org',
    phone: '+234 814 332 1109',
    deliveryAddress: '23 Banana Island Road, Ikoyi',
    deliveryCity: 'Lagos',
    deliveryState: 'Lagos State',
    orderType: 'corporate_shoes',
    garmentCategory: 'corporate-shoe',
    selectedDesignId: 'pw-shoe-001',
    selectedDesignName: 'Handcrafted Double Monkstrap - Burnished Mahogany',
    referenceImage: ASSETS.nativeBurgundySenator,
    modificationsDescription: 'Hand-painted museum patina with dark toe burnishing and initials "KN" hot stamped on the insole in gold foil.',
    shoeSpecs: {
      unit: 'in',
      shoeSizeEU: 43,
      footLength: 11.2,
      footWidth: 'standard',
      materialPreference: 'Hand-burnished Italian Crust Calfskin',
      monogramInitials: 'KN'
    },
    colorPreference: 'Burnished Mahogany & Espresso edges',
    quantity: 1,
    requestedCompletionDate: '2026-11-10',
    specialInstructions: 'Please include cedar shoe trees and matching shoe horn.',
    quoteStatus: 'approved',
    quotedAmountNGN: 125000,
    adminNotes: 'Shoe last prepared. First lasting underway in Calabar Cordwainer Studio.',
    carrier: 'DHL Express Nigeria',
    trackingNumber: 'DHL-COR-7734-LOS',
    fulfillmentHub: 'Calabar Cordwainer Workshop',
    timeline: [
      {
        title: 'Bespoke Cordwainer Order Confirmed',
        description: 'Double monkstrap commission registered with monogram initials "KN".',
        timestamp: '2026-10-26 11:45',
        location: 'Calabar Cordwainer Workshop',
        completed: true
      },
      {
        title: 'Italian Crust Calfskin Selected',
        description: 'Full-grain raw crust leather chosen for custom hand patina gradient.',
        timestamp: '2026-10-27 09:30',
        location: 'Calabar Leather Tannery Annex',
        completed: true
      },
      {
        title: 'Lasting & Goodyear Welt Assembly',
        description: 'Upper pulled tightly over wooden last size 43 standard width.',
        timestamp: '2026-10-28 08:30',
        location: 'Calabar Lasting Bench',
        completed: true,
        current: true
      },
      {
        title: 'Museum Patina Hand-Painting',
        description: 'Multiple coats of alcohol dye applied with wool dauber and bone tool.',
        timestamp: 'Estimated: 2026-11-02',
        location: 'Calabar Finishing Room',
        completed: false
      },
      {
        title: 'High-Shine Glacage & Cedar Packing',
        description: 'Mirror shine applied to toe box and packaged with brass-handled shoe trees.',
        timestamp: 'Estimated: 2026-11-08',
        location: 'Calabar Dispatch Hub',
        completed: false
      }
    ]
  }
];

const INITIAL_CONTEMPORARY_ORDERS: ContemporaryOrder[] = [
  {
    id: 'PW-RTW-2026-8814',
    createdAt: '2026-10-26T15:20:00Z',
    customerName: 'Somtochukwu Eze',
    email: 'somto.eze@fintechlagos.io',
    phone: '+234 806 777 4411',
    deliveryAddress: 'Penthouse B, Ocean View Towers, Victoria Island',
    deliveryCity: 'Lagos',
    deliveryState: 'Lagos State',
    subtotal: 75000,
    deliveryFee: 4500,
    totalAmount: 79500,
    paymentMethod: 'card',
    shippingStatus: 'in_transit',
    carrier: 'DHL Express Nigeria (Priority Air Logistics)',
    trackingNumber: 'DHL-NG-9840214-VI',
    estimatedDeliveryDate: '2026-10-29',
    fulfillmentHub: 'Uyo Flagship Central Warehouse',
    items: [
      {
        productId: 'pw-cas-001',
        name: '"Wear Your Prime" Heavyweight Hoodie 450 GSM',
        image: ASSETS.poloBlack,
        color: 'Obsidian Black',
        size: 'L',
        quantity: 1,
        price: 45000
      },
      {
        productId: 'pw-cas-003',
        name: 'The Executive Zip Knit Polo',
        image: ASSETS.poloWhite,
        color: 'Chalk White',
        size: 'L',
        quantity: 1,
        price: 30000
      }
    ],
    timeline: [
      {
        title: 'Order Placed & Verified',
        description: 'Payment authorized. Order confirmed into Prime Wears dispatch system.',
        timestamp: '2026-10-26 15:20',
        location: 'Prime Wears Digital Commerce Hub',
        completed: true
      },
      {
        title: 'Quality Inspection & Garment Prep',
        description: 'Garments steamed, anti-tamper security tags affixed, and folded in silk paper.',
        timestamp: '2026-10-27 09:40',
        location: 'Uyo Central Warehouse (Brooks Ave)',
        completed: true
      },
      {
        title: 'Dispatched with DHL Express',
        description: 'Handed over to DHL Express Air Courier at Victor Attah International Airport.',
        timestamp: '2026-10-27 17:15',
        location: 'Victor Attah International Airport (Uyo)',
        completed: true
      },
      {
        title: 'In Transit — Arrived at Lagos Hub',
        description: 'Package arrived at DHL Murtala Muhammed International hub, sorted for Victoria Island route.',
        timestamp: '2026-10-28 11:30',
        location: 'DHL Ikeja Sorting Center, Lagos',
        completed: true,
        current: true
      },
      {
        title: 'Out for Final Delivery',
        description: 'Courier assigned for white-glove doorstep delivery to Penthouse B.',
        timestamp: 'Estimated: 2026-10-29 Morning',
        location: 'Victoria Island Route',
        completed: false
      }
    ]
  },
  {
    id: 'PW-RTW-2026-3042',
    createdAt: '2026-10-28T09:05:00Z',
    customerName: 'David Alaba',
    email: 'david.alaba@culturecraft.com',
    phone: '+234 812 445 6678',
    deliveryAddress: '24 Marina Road, Calabar',
    deliveryCity: 'Calabar',
    deliveryState: 'Cross River',
    subtotal: 52000,
    deliveryFee: 2500,
    totalAmount: 54500,
    paymentMethod: 'transfer',
    shippingStatus: 'processing',
    carrier: 'Prime Wears Local Dispatch Fleet',
    trackingNumber: 'PW-LCL-3042-CAL',
    estimatedDeliveryDate: '2026-10-30',
    fulfillmentHub: 'Calabar Marian Road Showroom',
    items: [
      {
        productId: 'pw-cas-005',
        name: 'Prime Signature Leather-Patch Baseball Cap',
        image: ASSETS.capRed,
        color: 'Crimson Burgundy',
        size: 'Adjustable',
        quantity: 1,
        price: 18000
      },
      {
        productId: 'pw-cas-004',
        name: 'The Diplomat Relaxed Fit Chino Trouser',
        image: ASSETS.poloBeige,
        color: 'Warm Sand',
        size: '34',
        quantity: 1,
        price: 34000
      }
    ],
    timeline: [
      {
        title: 'Payment Transfer Logged',
        description: 'Bank transfer verified via Zenith Bank reference PW-RTW-2026-3042.',
        timestamp: '2026-10-28 09:05',
        location: 'Calabar Marian Hub',
        completed: true
      },
      {
        title: 'Picking from Flagship Inventory',
        description: 'Cap and relaxed chino picked from Calabar Marian Road stockroom.',
        timestamp: '2026-10-28 11:20',
        location: 'Calabar Stockroom',
        completed: true,
        current: true
      },
      {
        title: 'Embossed Gift Packaging',
        description: 'Placing cap in protective magnetic hardbox with custom sticker seals.',
        timestamp: 'Pending Packaging',
        location: 'Calabar Dispatch Bay',
        completed: false
      },
      {
        title: 'Out for Local Delivery in Calabar',
        description: 'Direct courier dispatch to 24 Marina Road.',
        timestamp: 'Estimated: 2026-10-30',
        location: 'Calabar Local Route',
        completed: false
      }
    ]
  }
];

export const OrderProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [customOrders, setCustomOrders] = useState<CustomOrder[]>(() => {
    try {
      const saved = localStorage.getItem(ORDERS_STORAGE_KEY);
      return saved ? JSON.parse(saved) : INITIAL_ORDERS;
    } catch {
      return INITIAL_ORDERS;
    }
  });

  const [contemporaryOrders, setContemporaryOrders] = useState<ContemporaryOrder[]>(() => {
    try {
      const saved = localStorage.getItem(CONTEMPORARY_ORDERS_KEY);
      return saved ? JSON.parse(saved) : INITIAL_CONTEMPORARY_ORDERS;
    } catch {
      return INITIAL_CONTEMPORARY_ORDERS;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(customOrders));
    } catch (e) {
      console.error('Failed to save bespoke orders to localStorage', e);
    }
  }, [customOrders]);

  useEffect(() => {
    try {
      localStorage.setItem(CONTEMPORARY_ORDERS_KEY, JSON.stringify(contemporaryOrders));
    } catch (e) {
      console.error('Failed to save contemporary orders to localStorage', e);
    }
  }, [contemporaryOrders]);

  const createCustomOrder = (
    orderData: Omit<CustomOrder, 'id' | 'createdAt' | 'quoteStatus'>
  ): CustomOrder => {
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    let prefix = 'PW-ORD';
    if (orderData.orderType === 'corporate_shoes') prefix = 'PW-SHOE';
    if (orderData.orderType === 'bespoke_suit') prefix = 'PW-SUIT';
    if (orderData.orderType === 'his_highness') prefix = 'PW-HH';

    const id = `${prefix}-${new Date().getFullYear()}-${randomSuffix}`;
    const nowStr = new Date().toISOString();

    const newOrder: CustomOrder = {
      ...orderData,
      id,
      createdAt: nowStr,
      quoteStatus: 'under_review',
      carrier: 'Prime Wears Atelier Courier',
      trackingNumber: `PW-TRK-${randomSuffix}`,
      fulfillmentHub: orderData.deliveryState.toLowerCase().includes('cross river')
        ? 'Calabar Flagship Showroom'
        : orderData.deliveryState.toLowerCase().includes('rivers')
        ? 'Port-Harcourt Luxury Studio'
        : 'Uyo Master Atelier Flagship',
      timeline: [
        {
          title: 'Custom Commission Registered',
          description: `Bespoke ${orderData.garmentCategory} request received with client measurements and style details.`,
          timestamp: new Date().toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' }),
          location: 'Master Atelier Reception',
          completed: true,
          current: true
        },
        {
          title: 'Master Tailor Silhouette & Fabric Evaluation',
          description: 'Evaluating fabric drape, yardage requirements, and pattern adjustments.',
          timestamp: 'Scheduled within 24 hours',
          location: 'Atelier Cutting Bench',
          completed: false
        },
        {
          title: 'Official Atelier Quotation Generation',
          description: 'Custom quote with direct deposit & fittings plan sent to client.',
          timestamp: 'Pending Tailor Signoff',
          location: 'Concierge Desk',
          completed: false
        },
        {
          title: 'Hand-Tailoring & Embroidery Execution',
          description: 'Artisanal cutting, basting, and hand-stitched detailing.',
          timestamp: 'Scheduled post-authorization',
          location: 'Workshop',
          completed: false
        },
        {
          title: 'Final Quality Inspection & White-Glove Dispatch',
          description: 'Cedar-scented packaging and scheduled courier transport.',
          timestamp: `Target: ${orderData.requestedCompletionDate || 'To be scheduled'}`,
          location: 'Dispatch Suite',
          completed: false
        }
      ]
    };

    setCustomOrders((prev) => [newOrder, ...prev]);
    return newOrder;
  };

  const createContemporaryOrder = (
    orderData: Omit<ContemporaryOrder, 'id' | 'createdAt' | 'timeline' | 'shippingStatus'>
  ): ContemporaryOrder => {
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const id = `PW-RTW-${new Date().getFullYear()}-${randomSuffix}`;
    const nowStr = new Date().toISOString();
    const estDelivery = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

    const hub = orderData.deliveryState.toLowerCase().includes('cross river')
      ? 'Calabar Marian Road Showroom'
      : orderData.deliveryState.toLowerCase().includes('rivers')
      ? 'Port-Harcourt Luxury Studio (GRA)'
      : 'Uyo Flagship Central Hub';

    const newOrder: ContemporaryOrder = {
      ...orderData,
      id,
      createdAt: nowStr,
      shippingStatus: 'order_confirmed',
      carrier: 'DHL Express Nigeria',
      trackingNumber: `DHL-NG-${randomSuffix}`,
      estimatedDeliveryDate: estDelivery,
      fulfillmentHub: hub,
      timeline: [
        {
          title: 'Order Confirmed',
          description: `Contemporary order logged with ${orderData.items.length} item(s). Payment via ${orderData.paymentMethod}.`,
          timestamp: new Date().toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' }),
          location: hub,
          completed: true,
          current: true
        },
        {
          title: 'Inventory Picking & Quality Inspection',
          description: 'Inspecting seams, fabric weight, and hardware before boxing.',
          timestamp: 'Estimated: Within 12-24 hours',
          location: `${hub} Stockroom`,
          completed: false
        },
        {
          title: 'Luxury Box Packaging & Courier Handoff',
          description: 'Dispatched with premium seals and tamper-proof courier pouch.',
          timestamp: 'Estimated: Tomorrow',
          location: 'Dispatch Bay',
          completed: false
        },
        {
          title: 'Doorstep Courier Delivery',
          description: `Hand-delivered to ${orderData.deliveryAddress}, ${orderData.deliveryCity}.`,
          timestamp: `Estimated: ${estDelivery}`,
          location: 'Destination Address',
          completed: false
        }
      ]
    };

    setContemporaryOrders((prev) => [newOrder, ...prev]);
    return newOrder;
  };

  const updateOrderStatus = (
    orderId: string,
    status: QuoteStatus,
    quoteAmount?: number,
    notes?: string
  ) => {
    setCustomOrders((prev) =>
      prev.map((order) => {
        if (order.id === orderId) {
          return {
            ...order,
            quoteStatus: status,
            quotedAmountNGN: quoteAmount !== undefined ? quoteAmount : order.quotedAmountNGN,
            adminNotes: notes !== undefined ? notes : order.adminNotes
          };
        }
        return order;
      })
    );
  };

  const updateContemporaryStatus = (
    orderId: string,
    status: ShippingStatus,
    carrier?: string,
    trackingNumber?: string
  ) => {
    setContemporaryOrders((prev) =>
      prev.map((order) => {
        if (order.id === orderId) {
          return {
            ...order,
            shippingStatus: status,
            carrier: carrier || order.carrier,
            trackingNumber: trackingNumber || order.trackingNumber
          };
        }
        return order;
      })
    );
  };

  const deleteCustomOrder = (orderId: string) => {
    setCustomOrders((prev) => prev.filter((order) => order.id !== orderId));
  };

  const getOrderById = (orderId: string) => {
    return customOrders.find((order) => order.id === orderId);
  };

  const lookupOrder = (referenceNumber: string): OrderLookupResult | null => {
    const cleanRef = referenceNumber.trim().toUpperCase();
    if (!cleanRef) return null;

    // Search custom orders
    const foundBespoke = customOrders.find(
      (o) => o.id.toUpperCase() === cleanRef || o.id.toUpperCase().replace(/-/g, '') === cleanRef.replace(/-/g, '')
    );
    if (foundBespoke) {
      return { type: 'bespoke', bespokeOrder: foundBespoke };
    }

    // Search contemporary orders
    const foundContemporary = contemporaryOrders.find(
      (o) => o.id.toUpperCase() === cleanRef || o.id.toUpperCase().replace(/-/g, '') === cleanRef.replace(/-/g, '')
    );
    if (foundContemporary) {
      return { type: 'contemporary', contemporaryOrder: foundContemporary };
    }

    return null;
  };

  return (
    <OrderContext.Provider
      value={{
        customOrders,
        contemporaryOrders,
        createCustomOrder,
        createContemporaryOrder,
        updateOrderStatus,
        updateContemporaryStatus,
        deleteCustomOrder,
        getOrderById,
        lookupOrder
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export const useOrders = () => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error('useOrders must be used within an OrderProvider');
  }
  return context;
};

