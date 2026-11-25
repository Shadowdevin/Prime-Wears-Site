export type ExperienceType = 'all' | 'native' | 'casual';

export interface Product {
  id: string;
  name: string;
  category: 'senator' | 'kaftan' | 'agbada' | 'two-piece' | 'shoes' | 'suit' | 'his-highness' | 'female-native' | 'female-corporate' | 'polo' | 'hoodie' | 'trousers' | 'cap' | 't-shirt';
  experience: 'native' | 'casual';
  price: number; // in NGN
  originalPrice?: number;
  description: string;
  shortDescription: string;
  images: string[];
  colors: {
    name: string;
    hex: string;
    imageIndex?: number;
  }[];
  sizes: string[];
  tags: string[];
  stockStatus: 'in_stock' | 'low_stock' | 'made_to_order';
  fabricDetails: string;
  careInstructions: string;
  isCustomizable?: boolean;
  featured?: boolean;
  bestseller?: boolean;
  newArrival?: boolean;
}

export interface CartItem {
  id: string; // generated unique cart item id
  productId: string;
  name: string;
  price: number;
  image: string;
  color: string;
  size: string;
  quantity: number;
  experience: 'native' | 'casual';
  customMeasurementsRef?: string;
}

export type MeasurementUnit = 'cm' | 'in';

export interface GarmentMeasurements {
  unit: MeasurementUnit;
  shoulder?: number;
  chest?: number;
  bust?: number;
  waist?: number;
  hip?: number;
  highHip?: number;
  fullHip?: number;
  sleeveLength?: number;
  garmentLength?: number;
  trouserLength?: number;
  skirtLength?: number;
  neck?: number;
  thigh?: number;
  inseam?: number;
  agbadaSpan?: number;
}

export interface ShoeMeasurements {
  unit: MeasurementUnit;
  shoeSizeEU: number;
  footLength?: number;
  footWidth?: 'narrow' | 'standard' | 'wide';
  materialPreference: string;
  monogramInitials?: string;
}

export type QuoteStatus = 
  | 'under_review' 
  | 'quotation_sent' 
  | 'approved' 
  | 'in_production' 
  | 'ready_for_fitting' 
  | 'completed';

export interface OrderMilestone {
  title: string;
  description: string;
  timestamp: string;
  location?: string;
  completed: boolean;
  current?: boolean;
}

export interface CustomOrder {
  id: string; // e.g. "PW-ORD-2026-N7892"
  createdAt: string;
  customerName: string;
  email: string;
  phone: string;
  deliveryAddress: string;
  deliveryCity: string;
  deliveryState: string;
  orderType: 'native_tailoring' | 'corporate_shoes' | 'bespoke_suit' | 'his_highness' | 'female_couture';
  garmentCategory: 'senator' | 'kaftan' | 'agbada' | 'two-piece' | 'corporate-shoe' | 'suit' | 'his-highness' | 'female-native' | 'female-corporate' | 'other';
  selectedDesignId?: string;
  selectedDesignName?: string;
  referenceImage?: string; // data URL or asset path
  modificationsDescription: string;
  measurements?: GarmentMeasurements;
  shoeSpecs?: ShoeMeasurements;
  fabricPreference?: string;
  colorPreference: string;
  quantity: number;
  requestedCompletionDate: string;
  specialInstructions?: string;
  quoteStatus: QuoteStatus;
  quotedAmountNGN?: number;
  adminNotes?: string;
  carrier?: string;
  trackingNumber?: string;
  fulfillmentHub?: string;
  timeline?: OrderMilestone[];
}

export type ShippingStatus = 
  | 'order_confirmed'
  | 'processing'
  | 'dispatched'
  | 'in_transit'
  | 'delivered';

export interface ContemporaryOrderItem {
  productId: string;
  name: string;
  image: string;
  color: string;
  size: string;
  quantity: number;
  price: number;
}

export interface ContemporaryOrder {
  id: string; // e.g. "PW-RTW-2026-8814"
  createdAt: string;
  customerName: string;
  email: string;
  phone: string;
  deliveryAddress: string;
  deliveryCity: string;
  deliveryState: string;
  items: ContemporaryOrderItem[];
  subtotal: number;
  deliveryFee: number;
  totalAmount: number;
  paymentMethod: 'transfer' | 'card' | 'cod';
  shippingStatus: ShippingStatus;
  carrier?: string;
  trackingNumber?: string;
  estimatedDeliveryDate: string;
  fulfillmentHub: string;
  timeline: OrderMilestone[];
}


export interface ShowroomMannequin {
  id: string;
  name: string;
  gender: 'male' | 'female';
  outfitTitle: string;
  category: string;
  colorName: string;
  colorHex: string;
  description: string;
  image: string;
  price: number;
  availableSizes: string[];
  productRefId: string;
  positionX: number; // percentage in scene
  zIndex: number;
}
