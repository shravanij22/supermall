
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { SHOPS, OFFERS, PRODUCTS } from '../constants';
import Card from './common/Card';
import { BuildingStorefrontIcon, TagIcon, ListBulletIcon } from './icons';
import { type View } from '../types';

interface DashboardProps {
    setView: (view: View) => void;
}

const StatCard: React.FC<{ icon: React.ElementType; title: string; value: string | number; color: string; onClick?: () => void }> = ({ icon: Icon, title, value, color, onClick }) => (
    <Card className={`flex-1 cursor-pointer hover:scale-105 transform transition-transform`} onClick={onClick}>
        <div className="flex items-center">
            <div className={`p-3 rounded-full bg-${color}-100`}>
                <Icon className={`h-8 w-8 text-${color}-600`} />
            </div>
            <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">{title}</p>
                <p className="text-2xl font-bold text-gray-800">{value}</p>
            </div>
        </div>
    </Card>
);

const Dashboard: React.FC<DashboardProps> = ({ setView }) => {
  const shopsByFloor = SHOPS.reduce((acc, shop) => {
    const floor = `Floor ${shop.floor}`;
    if (!acc[floor]) {
      acc[floor] = 0;
    }
    acc[floor]++;
    return acc;
  }, {} as Record<string, number>);

  const chartData = Object.keys(shopsByFloor).map(floor => ({
    name: floor,
    shops: shopsByFloor[floor],
  }));

  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold text-gray-900">Dashboard</h1>
      
      <div className="flex gap-6">
          <StatCard icon={BuildingStorefrontIcon} title="Total Shops" value={SHOPS.length} color="indigo" onClick={() => setView('shops')} />
          <StatCard icon={TagIcon} title="Active Offers" value={OFFERS.length} color="amber" onClick={() => setView('offers')} />
          <StatCard icon={ListBulletIcon} title="Listed Products" value={PRODUCTS.length} color="emerald" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <Card className="lg:col-span-3">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Shops per Floor</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
              <XAxis dataKey="name" stroke="#6b7280" />
              <YAxis allowDecimals={false} stroke="#6b7280" />
              <Tooltip
                contentStyle={{
                  background: 'white',
                  border: '1px solid #e0e0e0',
                  borderRadius: '0.5rem',
                }}
              />
              <Legend />
              <Bar dataKey="shops" fill="#4f46e5" name="Number of Shops" barSize={40} radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card className="lg:col-span-2">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Recent Offers</h2>
            <ul className="space-y-4">
                {OFFERS.slice(0, 3).map(offer => {
                    const shop = SHOPS.find(s => s.id === offer.shopId);
                    return (
                        <li key={offer.id} className="flex items-center p-2 rounded-lg hover:bg-gray-50">
                            <div className="p-2 bg-amber-100 rounded-full">
                                <TagIcon className="h-6 w-6 text-amber-600" />
                            </div>
                            <div className="ml-3 flex-1">
                                <p className="font-semibold text-gray-700">{offer.title}</p>
                                <p className="text-sm text-gray-500">{shop?.name}</p>
                            </div>
                            <span className="text-sm font-bold text-amber-700">{offer.discount}</span>
                        </li>
                    );
                })}
            </ul>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
