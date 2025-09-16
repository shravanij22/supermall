
import React from 'react';
import Card from './common/Card';
// Fix: Removed CATEGORIES import as it's not exported from constants.
import { SHOPS } from '../constants';
// Fix: Imported icons needed for the local CATEGORIES constant.
import { DesktopComputerIcon, HomeIcon, TagIcon } from './icons';

// Fix: Defined CATEGORIES locally to avoid circular dependencies and fix import error.
const CATEGORIES = [
    { id: 'cat1', name: 'Electronics', icon: DesktopComputerIcon },
    { id: 'cat2', name: 'Fashion', icon: TagIcon },
    { id: 'cat3', name: 'Lifestyle', icon: HomeIcon },
];

const CategoryManagement: React.FC = () => {
    const floors = [...new Set(SHOPS.map(s => s.floor))].sort((a,b) => a-b);

    return (
        <div className="space-y-8">
            <h1 className="text-4xl font-bold text-gray-900">Categories & Floors</h1>
            
            <Card>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Shop Categories</h2>
                <div className="flex flex-wrap gap-4">
                    {CATEGORIES.map(category => (
                        <div key={category.id} className="flex items-center bg-gray-100 text-gray-800 text-sm font-medium px-4 py-2 rounded-full">
                           <category.icon className="w-5 h-5 mr-2 text-indigo-600"/>
                           {category.name}
                        </div>
                    ))}
                </div>
            </Card>

            <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-800">Floor Details</h2>
                {floors.map(floorNum => (
                    <Card key={floorNum}>
                        <h3 className="text-xl font-bold text-gray-700 mb-4">Floor {floorNum}</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {SHOPS.filter(s => s.floor === floorNum).map(shop => (
                                <div key={shop.id} className="p-3 bg-indigo-50 rounded-lg flex items-center space-x-3">
                                    <img src={shop.logoUrl} alt={shop.name} className="w-10 h-10 rounded-full object-cover"/>
                                    <div>
                                        <p className="font-semibold text-gray-800">{shop.name}</p>
                                        <p className="text-xs text-gray-500">{shop.category}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
}

export default CategoryManagement;
