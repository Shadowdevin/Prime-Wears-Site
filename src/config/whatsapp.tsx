import React from 'react';

/**
 * Prime Wears WhatsApp Configuration
 * Centralized configuration for all WhatsApp Business contact numbers,
 * international formats, and message generators.
 */

export interface WhatsAppContact {
  id: 'number1' | 'number2';
  title: string;
  chatLabel: string;
  orderLabel: string;
  rawNumber: string;
  internationalNumber: string;
  waMeBaseUrl: string;
  displayFormatted: string;
  roleDescription: string;
}

export const WHATSAPP_CONFIG: Record<'number1' | 'number2', WhatsAppContact> = {
  number1: {
    id: 'number1',
    title: 'WhatsApp Number 1',
    chatLabel: 'Chat on WhatsApp — Number 1',
    orderLabel: 'WhatsApp Number 1',
    rawNumber: '08066825239',
    internationalNumber: '2348066825239',
    waMeBaseUrl: 'https://wa.me/2348066825239',
    displayFormatted: '0806 682 5239 (+234 806 682 5239)',
    roleDescription: 'Bespoke Tailoring & Atelier Concierge'
  },
  number2: {
    id: 'number2',
    title: 'WhatsApp Number 2',
    chatLabel: 'Chat on WhatsApp — Number 2',
    orderLabel: 'WhatsApp Number 2',
    rawNumber: '09052473964',
    internationalNumber: '2349052473964',
    waMeBaseUrl: 'https://wa.me/2349052473964',
    displayFormatted: '0905 247 3964 (+234 905 247 3964)',
    roleDescription: 'Showroom & Customer Inquiries'
  }
};

/**
 * Default general enquiry message for the floating button
 */
export const DEFAULT_WHATSAPP_ENQUIRY_MESSAGE =
  'Hello Prime Wears! 👋 I would like to make an enquiry about your products.';

/**
 * Builds the product-specific WhatsApp ordering message required by the brand.
 * 
 * Format:
 * Hello Prime Wears! 👋
 * 
 * I'm interested in this [PRODUCT NAME]. How do I check out?
 * 
 * Product link: [FULL PRODUCT URL]
 * 
 * Product image: [FULL PRODUCT IMAGE URL]
 */
export function buildProductWhatsAppMessage(product: {
  name: string;
  url: string;
  imageUrl: string;
}): string {
  return `Hello Prime Wears! 👋\n\nI'm interested in this ${product.name}. How do I check out?\n\nProduct link: ${product.url}\n\nProduct image: ${product.imageUrl}`;
}

/**
 * Generates the full canonical product link pointing to the live web application.
 */
export function getProductShareableUrl(productId: string, experience?: string): string {
  if (typeof window === 'undefined') {
    return `https://primewears.ng/#/native?product=${encodeURIComponent(productId)}`;
  }
  const origin = window.location.origin;
  const basePath = window.location.pathname.replace(/\/$/, '');
  const exp = experience === 'casual' ? 'casual' : 'native';
  return `${origin}${basePath}/#/${exp}?product=${encodeURIComponent(productId)}`;
}

/**
 * Generates the full public URL for a product image.
 */
export function getProductAbsoluteImageUrl(imagePath?: string): string {
  if (!imagePath) return '';
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    return imagePath;
  }
  if (typeof window === 'undefined') {
    return `https://primewears.ng${imagePath.startsWith('/') ? '' : '/'}${imagePath}`;
  }
  const origin = window.location.origin;
  const cleanPath = imagePath.startsWith('/') ? imagePath : `/${imagePath}`;
  return `${origin}${cleanPath}`;
}

/**
 * Constructs the final https://wa.me link with URL-encoded text parameter.
 */
export function createWhatsAppUrl(
  contactId: 'number1' | 'number2',
  message: string
): string {
  const contact = WHATSAPP_CONFIG[contactId];
  return `${contact.waMeBaseUrl}?text=${encodeURIComponent(message)}`;
}

/**
 * Opens WhatsApp in a new tab/window without auto-submitting
 * (the customer will press Send inside their WhatsApp application).
 */
export function openWhatsAppChat(
  contactId: 'number1' | 'number2',
  message: string
): void {
  const targetUrl = createWhatsAppUrl(contactId, message);
  if (typeof window !== 'undefined') {
    window.open(targetUrl, '_blank', 'noopener,noreferrer');
  }
}

/**
 * High-quality SVG icon for WhatsApp with the official silhouette
 */
export const WhatsAppIcon: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    aria-hidden="true"
  >
    <path d="M17.472 14.382c-.301-.15-1.78-.878-2.056-.978-.275-.1-.476-.15-.677.15-.2.302-.777.978-.952 1.18-.176.2-.351.226-.652.076-.301-.15-1.27-.468-2.42-1.493-.895-.798-1.5-1.783-1.676-2.084-.175-.301-.019-.464.132-.614.135-.135.301-.351.451-.527.15-.175.2-.301.301-.501.1-.2.05-.376-.025-.527-.076-.15-.677-1.63-.928-2.231-.244-.586-.492-.507-.677-.516-.176-.01-.376-.01-.577-.01-.2 0-.526.076-.802.376s-1.053 1.029-1.053 2.509 1.078 2.91 1.228 3.111c.15.2 2.122 3.24 5.141 4.544.718.31 1.278.496 1.716.635.722.23 1.379.197 1.9.12.58-.088 1.78-.727 2.032-1.429.25-.702.25-1.304.175-1.429-.075-.125-.276-.2-.577-.35zM12.04 2C6.516 2 2.028 6.488 2.028 12.012c0 1.87.519 3.62 1.424 5.125L2 22l5.006-1.408c1.451.839 3.125 1.317 4.908 1.317 5.524 0 10.012-4.488 10.012-10.012A9.989 9.989 0 0 0 12.04 2zm0 18.232a8.214 8.214 0 0 1-4.195-1.147l-.3-.178-3.116.877.88-3.036-.195-.312a8.21 8.21 0 0 1-1.26-4.424c0-4.544 3.697-8.241 8.241-8.241 4.544 0 8.241 3.697 8.241 8.241 0 4.544-3.697 8.241-8.241 8.241z" />
  </svg>
);
