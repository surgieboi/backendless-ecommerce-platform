export interface Cart {
  totalPrice: number;
  totalWeight: number;
  currency: string;
  discount: number;
  items: CartItem[];
}

export interface CartItem {
  id: string;
  image: string;
  quantity: number;
  title: string;
  price: number;
  grams: number;
  variantInfo?: VariantInfo[];
  sku?: string;
  subTotal: number;
}

export interface VariantInfo {
  id: string;
  name: string;
  value: string;
}

export interface DolaObject {
  cart: Cart;
  merchantId: string;
}

export interface IframeExtended extends HTMLIFrameElement {
  loading?: 'lazy' | 'eager' | 'auto';
}
