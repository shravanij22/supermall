
import type { ComponentType } from 'react';
import type { Page, PageParams } from './App';

// Fix: Added View type for admin dashboard navigation.
export type View = 'dashboard' | 'shops' | 'offers' | 'categories' | 'comparison';

export interface Shop {
  id: string;
  name: string;
  category: string;
  floor: number;
  logoUrl: string;
  description: string;
  coverImageUrl: string;
}

export interface Product {
  id: string;
  name: string;
  shopId: string;
  price: number;
  features: string[];
  imageUrl: string;
  description: string;
  sizeOptions?: string[];
  colorOptions?: string[];
}

export interface Offer {
  id:string;
  title: string;
  shopId: string;
  description: string;
  discount: string;
  validUntil: string;
}

export interface CartItem extends Product {
  quantity: number;
  selectedSize?: string;
  selectedColor?: string;
}

export interface Order {
  id: string;
  date: string;
  items: CartItem[];
  total: number;
  status: 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
}

export interface AppContextType {
  cart: CartItem[];
  wishlist: Product[];
  orders: Order[];
  addToCart: (product: Product, quantity: number, selectedSize?: string, selectedColor?: string) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: string) => void;
  placeOrder: (cart: CartItem[]) => void;
  isProductInWishlist: (productId: string) => boolean;
}

export interface NavigationProps {
  navigateTo: (page: Page, params?: PageParams) => void;
}
