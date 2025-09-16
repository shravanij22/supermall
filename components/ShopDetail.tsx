import React, { useState, useEffect } from 'react';
import { getShopById, getProductsByShopId } from '../services/firebaseService';
import { type Shop, type Product, type NavigationProps } from '../types';
import { useAppContext } from '../context/AppContext';
import Card from './common/Card';
import Button from './common/Button';
import { ShoppingCartIcon, HeartIcon } from './icons';

interface ShopDetailProps extends NavigationProps {
  shopId: string;
}

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
    const { addToCart, addToWishlist, isProductInWishlist, removeFromWishlist } = useAppContext();
    const [selectedSize, setSelectedSize] = useState<string | undefined>(product.sizeOptions?.[0]);
    const [selectedColor, setSelectedColor] = useState<string | undefined>(product.colorOptions?.[0]);

    const handleAddToCart = () => {
        addToCart(product, 1, selectedSize, selectedColor);
        // Could add a toast notification here
    };

    const handleWishlistToggle = () => {
        if (isProductInWishlist(product.id)) {
            removeFromWishlist(product.id);
        } else {
            addToWishlist(product);
        }
    };

    return (
        <Card className="flex flex-col">
            <img src={product.imageUrl} alt={product.name} className="w-full h-48 object-cover rounded-lg mb-4" />
            <h3 className="text-lg font-bold text-gray-800">{product.name}</h3>
            <p className="text-2xl font-extrabold text-indigo-600 my-2">₹{product.price.toFixed(2)}</p>
            <p className="text-sm text-gray-600 mb-4 flex-grow">{product.description}</p>
            
            <div className="space-y-3 mb-4">
                {product.sizeOptions && (
                    <select value={selectedSize} onChange={(e) => setSelectedSize(e.target.value)} className="w-full p-2 border rounded bg-white">
                        {product.sizeOptions.map(size => <option key={size} value={size}>{size}</option>)}
                    </select>
                )}
                {product.colorOptions && (
                    <select value={selectedColor} onChange={(e) => setSelectedColor(e.target.value)} className="w-full p-2 border rounded bg-white">
                        {product.colorOptions.map(color => <option key={color} value={color}>{color}</option>)}
                    </select>
                )}
            </div>

            <div className="mt-auto flex gap-2">
                <Button onClick={handleAddToCart} className="w-full">
                    <ShoppingCartIcon className="h-5 w-5" /> Add to Cart
                </Button>
                <Button variant="secondary" onClick={handleWishlistToggle} className="px-3">
                    <HeartIcon className={`h-5 w-5 ${isProductInWishlist(product.id) ? 'text-red-500 fill-current' : ''}`} />
                </Button>
            </div>
        </Card>
    );
};

const ShopDetail: React.FC<ShopDetailProps> = ({ shopId }) => {
  const [shop, setShop] = useState<Shop | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchShopData = async () => {
      setLoading(true);
      const shopData = await getShopById(shopId);
      const productsData = await getProductsByShopId(shopId);
      setShop(shopData || null);
      setProducts(productsData);
      setLoading(false);
    };
    fetchShopData();
  }, [shopId]);

  if (loading) return <div className="text-center p-8">Loading shop details...</div>;
  if (!shop) return <div className="text-center p-8 text-red-500">Shop not found.</div>;

  return (
    <div className="space-y-8">
      <Card className="!p-0 overflow-hidden">
        <div className="h-48 md:h-64 bg-cover bg-center" style={{ backgroundImage: `url(${shop.coverImageUrl})` }} />
        <div className="p-6 flex items-center">
             <img src={shop.logoUrl} alt={`${shop.name} logo`} className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg -mt-16" />
             <div className="ml-6">
                <h1 className="text-4xl font-bold text-gray-900">{shop.name}</h1>
                <p className="text-gray-600">{shop.description}</p>
             </div>
        </div>
      </Card>
      
      <h2 className="text-2xl font-bold text-gray-800">Products</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ShopDetail;