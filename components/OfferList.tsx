
import React, { useState } from 'react';
import { OFFERS, SHOPS } from '../constants';
import Card from './common/Card';
import Button from './common/Button';
import Modal from './common/Modal';
import { PlusIcon, SparklesIcon, ArrowPathIcon } from './icons';
import { type Offer } from '../types';
import { generateOfferDescription } from '../services/geminiService';

const OfferCard: React.FC<{ offer: Offer }> = ({ offer }) => {
  const shop = SHOPS.find(s => s.id === offer.shopId);
  return (
    <Card className="flex flex-col">
      <div className="flex items-start justify-between">
          <div>
            <p className="text-sm font-bold text-amber-600">{offer.discount} OFF</p>
            <h3 className="text-xl font-bold text-gray-900 mt-1">{offer.title}</h3>
            <p className="text-sm text-indigo-600 font-semibold mt-1">{shop?.name}</p>
          </div>
          <img src={shop?.logoUrl} alt={`${shop?.name} logo`} className="w-16 h-16 rounded-full object-cover border-4 border-white shadow-md" />
      </div>
      <p className="text-sm text-gray-600 mt-4 flex-grow">{offer.description}</p>
      <div className="mt-4 pt-4 border-t border-gray-200">
        <p className="text-xs text-gray-500">Valid until: {new Date(offer.validUntil).toLocaleDateString()}</p>
      </div>
    </Card>
  );
};

const OfferList: React.FC = () => {
  const [offers, setOffers] = useState<Offer[]>(OFFERS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [aiDescription, setAiDescription] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [keywords, setKeywords] = useState('');

  const handleAddOffer = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newOffer: Offer = {
      id: `o${offers.length + 1}`,
      title: formData.get('title') as string,
      shopId: formData.get('shopId') as string,
      discount: formData.get('discount') as string,
      description: formData.get('description') as string,
      validUntil: formData.get('validUntil') as string,
    };
    setOffers(prev => [...prev, newOffer]);
    setIsModalOpen(false);
    setAiDescription('');
    setKeywords('');
  };

  const handleGenerateDescription = async () => {
    setIsGenerating(true);
    const description = await generateOfferDescription(keywords);
    setAiDescription(description);
    setIsGenerating(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-bold text-gray-900">Manage Offers</h1>
        <Button onClick={() => setIsModalOpen(true)}>
          <PlusIcon className="h-5 w-5" />
          Add Offer
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {offers.map(offer => (
          <OfferCard key={offer.id} offer={offer} />
        ))}
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add New Offer">
        <form onSubmit={handleAddOffer} className="space-y-4">
          <input name="title" placeholder="Offer Title" required className="w-full p-2 border rounded" />
          <select name="shopId" required className="w-full p-2 border rounded bg-white">
            <option value="">Select a Shop</option>
            {SHOPS.map(shop => <option key={shop.id} value={shop.id}>{shop.name}</option>)}
          </select>
          <input name="discount" placeholder="Discount (e.g., 25%)" required className="w-full p-2 border rounded" />
          <input name="validUntil" type="date" required className="w-full p-2 border rounded" />
          
          <div className="space-y-2 p-3 bg-indigo-50 rounded-lg border border-indigo-200">
            <label className="text-sm font-medium text-gray-700">Generate Description with AI</label>
            <div className="flex gap-2">
              <input 
                type="text"
                placeholder="Keywords (e.g., summer sale, shoes)"
                className="w-full p-2 border rounded"
                value={keywords}
                onChange={(e) => setKeywords(e.target.value)}
              />
              <Button type="button" onClick={handleGenerateDescription} disabled={isGenerating}>
                {isGenerating ? <ArrowPathIcon className="h-5 w-5 animate-spin" /> : <SparklesIcon className="h-5 w-5" />}
                Generate
              </Button>
            </div>
          </div>
          
          <textarea 
            name="description" 
            placeholder="Offer Description" 
            required 
            className="w-full p-2 border rounded"
            rows={4}
            value={aiDescription}
            onChange={(e) => setAiDescription(e.target.value)}
          />
          
          <div className="flex justify-end gap-2">
            <Button type="button" variant="secondary" onClick={() => setIsModalOpen(false)}>Cancel</Button>
            <Button type="submit">Save Offer</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default OfferList;
