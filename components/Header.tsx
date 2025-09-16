
import React from 'react';
import { BuildingStorefrontIcon, ShoppingCartIcon, HeartIcon, UserIcon, ClipboardDocumentListIcon } from './icons';
import { type NavigationProps } from '../types';
import { useAppContext } from '../context/AppContext';

const Header: React.FC<NavigationProps> = ({ navigateTo }) => {
    const { cart, wishlist } = useAppContext();
    const cartItemCount = cart.reduce((acc, item) => acc + item.quantity, 0);

    const NavIcon: React.FC<{
        icon: React.ElementType,
        label: string,
        count?: number,
        onClick: () => void
    }> = ({ icon: Icon, label, count, onClick }) => (
        <button onClick={onClick} className="relative flex flex-col items-center text-gray-500 hover:text-indigo-600 transition-colors">
            <Icon className="h-6 w-6" />
            <span className="text-xs font-medium">{label}</span>
            {count !== undefined && count > 0 && (
                 <span className="absolute -top-2 -right-2 flex items-center justify-center h-5 w-5 bg-red-500 text-white text-xs rounded-full">
                    {count}
                </span>
            )}
        </button>
    );

    return (
        <header className="bg-white shadow-md sticky top-0 z-40">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div 
                        className="flex items-center cursor-pointer"
                        onClick={() => navigateTo('home')}
                    >
                        <div className="bg-indigo-600 p-2 rounded-lg">
                            <BuildingStorefrontIcon className="h-6 w-6 text-white" />
                        </div>
                        <h1 className="ml-3 text-xl font-bold text-gray-800">Super Mall</h1>
                    </div>
                    <div className="flex items-center space-x-6">
                        <NavIcon icon={ClipboardDocumentListIcon} label="Orders" onClick={() => navigateTo('orders')} />
                        <NavIcon icon={HeartIcon} label="Wishlist" count={wishlist.length} onClick={() => navigateTo('wishlist')} />
                        <NavIcon icon={ShoppingCartIcon} label="Cart" count={cartItemCount} onClick={() => navigateTo('cart')} />
                        <NavIcon icon={UserIcon} label="Account" onClick={() => { /* Implement account page */}} />
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
