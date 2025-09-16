import React, { useState, useEffect } from 'react';
import { getShops, addShop } from '../services/firebaseService';
import Card from './common/Card';
import Button from './common/Button';
import Modal from './common/Modal';
import { PlusIcon } from './icons';
import { type Shop } from '../types';

const ShopCard: React.FC<{ shop: Shop }> = ({ shop }) => (
  <Card className="flex flex-col items-center text-center">
    <img src={shop.logoUrl} alt={`${shop.name} logo`} className="w-24 h-24 rounded-full object-cover mb-4 ring-4 ring-gray-200" />
    <h3 className="text-lg font-bold text-gray-900">{shop.name}</h3>
    <p className="text-sm text-indigo-600 font-semibold">{shop.category}</p>
    <p className="text-xs text-gray-500 mt-1">Floor {shop.floor}</p>
    <p className="text-sm text-gray-600 mt-4 flex-grow">{shop.description}</p>
    <Button className="mt-4 w-full">View Details</Button>
  </Card>
);

const ShopList: React.FC = () => {
  const [shops, setShops] = useState<Shop[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchShops = async () => {
      setLoading(true);
      const shopsData = await getShops();
      setShops(shopsData);
      setLoading(false);
    };
    fetchShops();
  }, []);

  const filteredShops = shops.filter(shop =>
    shop.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    shop.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddShop = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData(e.currentTarget);
    const newShopData: Omit<Shop, 'id'> = {
      name: formData.get('name') as string,
      category: formData.get('category') as string,
      floor: parseInt(formData.get('floor') as string),
      description: formData.get('description') as string,
      logoUrl: `https://picsum.photos/seed/s${shops.length + 1}${Date.now()}/100`,
      coverImageUrl: `https://picsum.photos/seed/c${shops.length + 1}${Date.now()}/1200/400`,
    };

    try {
      const addedShop = await addShop(newShopData);
      setShops(prev => [...prev, addedShop]);
      setIsModalOpen(false);
    } catch (error) {
      console.error("Failed to add shop:", error);
      // Here you could show an error message to the user
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return <div className="text-center p-8">Loading shops...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-bold text-gray-900">Manage Shops</h1>
        <Button onClick={() => setIsModalOpen(true)}>
          <PlusIcon className="h-5 w-5" />
          Add Shop
        </Button>
      </div>

      <input
        type="text"
        placeholder="Search by name or category..."
        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredShops.map(shop => (
          <ShopCard key={shop.id} shop={shop} />
        ))}
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add New Shop">
        <form onSubmit={handleAddShop} className="space-y-4">
          <input name="name" placeholder="Shop Name" required className="w-full p-2 border rounded" />
          <input name="category" placeholder="Category" required className="w-full p-2 border rounded" />
          <input name="floor" type="number" placeholder="Floor" required className="w-full p-2 border rounded" />
          <textarea name="description" placeholder="Description" required className="w-full p-2 border rounded" />
          <div className="flex justify-end gap-2">
            <Button type="button" variant="secondary" onClick={() => setIsModalOpen(false)} disabled={isSubmitting}>Cancel</Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Saving...' : 'Save Shop'}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default ShopList;