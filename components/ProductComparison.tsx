
import React, { useState, useEffect } from 'react';
import { getAllProducts, getShops } from '../services/firebaseService';
import { type Product, type Shop } from '../types';
import Button from './common/Button';
import Card from './common/Card';

const ProductComparison: React.FC = () => {
  const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [shops, setShops] = useState<Shop[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
      const fetchData = async () => {
          setLoading(true);
          const [productsData, shopsData] = await Promise.all([getAllProducts(), getShops()]);
          setAllProducts(productsData);
          setShops(shopsData);
          setLoading(false);
      };
      fetchData();
  }, []);

  const handleSelectProduct = (product: Product) => {
    setSelectedProducts(prev => {
      if (prev.find(p => p.id === product.id)) {
        return prev.filter(p => p.id !== product.id);
      }
      if (prev.length < 3) {
        return [...prev, product];
      }
      return prev;
    });
  };

  const getShopName = (shopId: string) => shops.find(s => s.id === shopId)?.name || 'Unknown Shop';

  if (loading) {
    return <div className="text-center p-8">Loading products...</div>;
  }

  return (
    <div className="space-y-6">
      <h1 className="text-4xl font-bold text-gray-900">Compare Products</h1>
      <p className="text-gray-600">Select up to 3 products from the list below to compare their features and price.</p>

      <Card>
        <h2 className="text-xl font-bold text-gray-800 mb-4">Select Products</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {allProducts.map(product => {
            const isSelected = selectedProducts.some(p => p.id === product.id);
            return (
              <div
                key={product.id}
                onClick={() => handleSelectProduct(product)}
                className={`p-4 border rounded-lg cursor-pointer transition-all ${
                  isSelected ? 'border-indigo-500 ring-2 ring-indigo-300 bg-indigo-50' : 'border-gray-200 hover:border-indigo-400'
                }`}
              >
                <img src={product.imageUrl} alt={product.name} className="w-full h-32 object-cover rounded-md mb-2" />
                <h3 className="font-semibold text-gray-800">{product.name}</h3>
                <p className="text-sm text-gray-500">₹{product.price.toFixed(2)}</p>
              </div>
            );
          })}
        </div>
      </Card>
      
      {selectedProducts.length > 0 && (
        <Card>
          <div className="flex justify-between items-center mb-4">
             <h2 className="text-xl font-bold text-gray-800">Comparison Table</h2>
             <Button variant="secondary" onClick={() => setSelectedProducts([])}>Clear Selection</Button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-50">
                  <th className="p-3 font-semibold text-left text-gray-600 border-b">Feature</th>
                  {selectedProducts.map(p => (
                    <th key={p.id} className="p-3 font-semibold text-center text-gray-600 border-b w-1/4">
                        <img src={p.imageUrl} alt={p.name} className="w-24 h-24 object-cover rounded-lg mx-auto mb-2"/>
                        {p.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="p-3 font-medium text-gray-700">Shop</td>
                  {selectedProducts.map(p => <td key={p.id} className="p-3 text-center text-gray-600">{getShopName(p.shopId)}</td>)}
                </tr>
                <tr className="border-b bg-gray-50">
                  <td className="p-3 font-medium text-gray-700">Price</td>
                  {selectedProducts.map(p => <td key={p.id} className="p-3 text-center text-lg font-bold text-indigo-700">₹{p.price.toFixed(2)}</td>)}
                </tr>
                <tr className="border-b">
                  <td className="p-3 font-medium text-gray-700 align-top">Features</td>
                  {selectedProducts.map(p => (
                    <td key={p.id} className="p-3 text-center text-gray-600">
                      <ul className="list-disc list-inside text-left">
                        {p.features.map((f, i) => <li key={i}>{f}</li>)}
                      </ul>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </Card>
      )}
    </div>
  );
};

export default ProductComparison;
