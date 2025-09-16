
import React, { useState, useCallback } from 'react';
import { AppProvider } from './context/AppContext';
import Header from './components/Header';
import Home from './components/Home';
import ShopDetail from './components/ShopDetail';
import CartView from './components/CartView';
import WishlistView from './components/WishlistView';
import CheckoutView from './components/CheckoutView';
import OrdersView from './components/OrdersView';

export type Page = 'home' | 'shop' | 'cart' | 'wishlist' | 'checkout' | 'orders';
export type PageParams = { shopId?: string };

const App: React.FC = () => {
  const [page, setPage] = useState<Page>('home');
  const [params, setParams] = useState<PageParams>({});

  const navigateTo = (newPage: Page, newParams: PageParams = {}) => {
    setPage(newPage);
    setParams(newParams);
    window.scrollTo(0, 0);
  };

  const renderPage = useCallback(() => {
    switch (page) {
      case 'home':
        return <Home navigateTo={navigateTo} />;
      case 'shop':
        return <ShopDetail shopId={params.shopId!} navigateTo={navigateTo} />;
      case 'cart':
        return <CartView navigateTo={navigateTo} />;
      case 'wishlist':
        return <WishlistView navigateTo={navigateTo} />;
      case 'checkout':
        return <CheckoutView navigateTo={navigateTo} />;
      case 'orders':
        return <OrdersView />;
      default:
        return <Home navigateTo={navigateTo} />;
    }
  }, [page, params]);

  return (
    <AppProvider>
      <div className="bg-gray-50 min-h-screen font-sans">
        <Header navigateTo={navigateTo} />
        <main className="p-4 md:p-8">
          <div className="max-w-7xl mx-auto">
            {renderPage()}
          </div>
        </main>
        <footer className="bg-white mt-12 py-6 text-center text-gray-500 border-t">
            <p>&copy; 2024 Super Mall Inc. All rights reserved.</p>
        </footer>
      </div>
    </AppProvider>
  );
};

export default App;
