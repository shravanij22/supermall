
import React, { useState, useEffect } from 'react';
import { getShops } from '../services/firebaseService';
import { type Shop, type NavigationProps } from '../types';
import Card from './common/Card';

const ShopCard: React.FC<{ shop: Shop; onClick: () => void }> = ({ shop, onClick }) => (
  <Card className="flex flex-col text-left cursor-pointer transition-transform transform hover:-translate-y-1" onClick={onClick}>
    <img src={shop.coverImageUrl} alt={`${shop.name}`} className="w-full h-32 object-cover rounded-t-xl -m-6 mb-0" />
    <div className="flex items-center pt-6">
        <img src={shop.logoUrl} alt={`${shop.name} logo`} className="w-16 h-16 rounded-full object-cover border-4 border-white shadow-md -mt-8" />
        <div className="ml-4">
            <h3 className="text-lg font-bold text-gray-900">{shop.name}</h3>
            <p className="text-sm text-indigo-600 font-semibold">{shop.category}</p>
        </div>
    </div>
    <p className="text-sm text-gray-600 mt-4 flex-grow">{shop.description}</p>
    <p className="text-xs text-gray-500 mt-2">Floor {shop.floor}</p>
  </Card>
);

const Home: React.FC<NavigationProps> = ({ navigateTo }) => {
    const [shops, setShops] = useState<Shop[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchShops = async () => {
            setLoading(true);
            const shopsData = await getShops();
            setShops(shopsData);
            setLoading(false);
        };
        fetchShops();
    }, []);

    return (
        <div className="space-y-8">
            <div className="text-center">
                <h1 className="text-4xl font-bold text-gray-900 tracking-tight">Welcome to Super Mall</h1>
                <p className="mt-2 text-lg text-gray-600">Your one-stop destination for shopping, dining, and fun.</p>
            </div>

            {loading ? (
                <div className="text-center p-8">Loading shops...</div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {shops.map(shop => (
                        <ShopCard key={shop.id} shop={shop} onClick={() => navigateTo('shop', { shopId: shop.id })} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Home;
