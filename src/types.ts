export interface Cart {
  currency: string;
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
  sku: string;
  willBeShipped?: boolean;
}

export interface VariantInfo {
  id: string;
  name: string;
  value: string;
}

export interface IframeExtended extends HTMLIFrameElement {
  loading?: 'lazy' | 'eager' | 'auto';
}

export interface IDola {
  id: string;
  attachDola?: (cart: Cart, callback: () => void) => void;
  type?: string;
  orderCompleted: boolean;
  shopperID?: string;
}

export interface DolaExtendedWindow extends Window {
  Dolapay: IDola;
}

export interface IDataset {
  [key: string]: string | undefined;
}
