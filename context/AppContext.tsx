
import React, { createContext, useState, useContext, ReactNode, useCallback } from 'react';
import { type AppContextType, type Product, type CartItem, type Order } from '../types';

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);

  const addToCart = useCallback((product: Product, quantity: number, selectedSize?: string, selectedColor?: string) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id && item.selectedColor === selectedColor && item.selectedSize === selectedSize);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...prevCart, { ...product, quantity, selectedSize, selectedColor }];
    });
  }, []);

  const removeFromCart = useCallback((productId: string) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  }, []);

  const updateCartQuantity = useCallback((productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
    } else {
      setCart(prevCart =>
        prevCart.map(item => (item.id === productId ? { ...item, quantity } : item))
      );
    }
  }, [removeFromCart]);

  const isProductInWishlist = useCallback((productId: string) => {
    return wishlist.some(item => item.id === productId);
  }, [wishlist]);

  const addToWishlist = useCallback((product: Product) => {
    setWishlist(prevWishlist => {
      if (isProductInWishlist(product.id)) {
        return prevWishlist;
      }
      return [...prevWishlist, product];
    });
  }, [isProductInWishlist]);

  const removeFromWishlist = useCallback((productId: string) => {
    setWishlist(prevWishlist => prevWishlist.filter(item => item.id !== productId));
  }, []);

  const placeOrder = useCallback((orderedItems: CartItem[]) => {
    const newOrder: Order = {
        id: `order-${Date.now()}`,
        date: new Date().toISOString(),
        items: orderedItems,
        total: orderedItems.reduce((acc, item) => acc + item.price * item.quantity, 0),
        status: 'Processing',
    };
    setOrders(prevOrders => [newOrder, ...prevOrders]);
    setCart([]); // Clear cart after placing order
  }, []);

  const value = {
    cart,
    wishlist,
    orders,
    addToCart,
    removeFromCart,
    updateCartQuantity,
    addToWishlist,
    removeFromWishlist,
    placeOrder,
    isProductInWishlist,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = (): AppContextType => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
