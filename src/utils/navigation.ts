import { Product } from '../types';

/**
 * Maps route identifiers to human-readable titles.
 */
export function getRouteTitle(route: string): string {
  switch (route) {
    case 'home':
      return 'Home';
    case 'native':
      return 'Native Wears';
    case 'women':
    case 'female':
    case 'female-wear':
      return "Women's Couture";
    case 'style-guide':
      return "Women's Style Guide";
    case 'agbada':
      return 'Grand Agbada';
    case 'his-highness':
      return 'His Highness Package';
    case 'suit':
      return 'Bespoke Suits';
    case 'shoes':
      return 'Corporate Shoes';
    case 'casual':
      return 'Casual Swag';
    case 'showroom':
      return '3D Virtual Showroom';
    case 'bespoke':
      return 'Bespoke Custom Studio';
    case 'track':
    case 'tracking':
      return 'Order Tracking';
    case 'wishlist':
      return 'Saved Wishlist';
    case 'admin':
      return 'Staff Portal';
    default:
      return 'Prime Wears';
  }
}

/**
 * Infers the primary collection title and route for any product.
 */
export function getProductCategoryInfo(product?: Product | null): { name: string; route: string } {
  if (!product) return { name: 'Catalog', route: 'native' };

  if (product.category === 'female-corporate' || product.category === 'female-native') {
    return { name: "Women's Couture", route: 'women' };
  }
  if (product.category === 'agbada') {
    return { name: 'Grand Agbada', route: 'agbada' };
  }
  if (product.category === 'his-highness') {
    return { name: 'His Highness Regalia', route: 'his-highness' };
  }
  if (product.category === 'suit') {
    return { name: 'Bespoke Suits', route: 'suit' };
  }
  if (product.category === 'shoes') {
    return { name: 'Corporate Shoes', route: 'shoes' };
  }
  if (['polo', 'hoodie', 'trousers', 'cap'].includes(product.category) || product.experience === 'casual') {
    return { name: 'Casual Swag', route: 'casual' };
  }
  return { name: 'Native Wears', route: 'native' };
}
