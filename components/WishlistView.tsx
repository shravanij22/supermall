import React from 'react';
import { useAppContext } from '../context/AppContext';
import { type NavigationProps, Product } from '../types';
import Card from './common/Card';
import Button from './common/Button';
import { HeartIcon, ShoppingCartIcon, TrashIcon } from './icons';

const WishlistItemCard: React.FC<{ product: Product }> = ({ product }) => {
    const { removeFromWishlist, addToCart } = useAppContext();

    const handleMoveToCart = () => {
        addToCart(product, 1);
        removeFromWishlist(product.id);
    }
    
    return (
        <Card className="flex items-center gap-4">
            <img src={product.imageUrl} alt={product.name} className="w-24 h-24 object-cover rounded-lg"/>
            <div className="flex-grow">
                <h3 className="font-bold text-lg">{product.name}</h3>
                <p className="text-gray-600">{product.description}</p>
            </div>
            <div className="text-right space-y-2">
                <p className="text-xl font-bold text-indigo-600">₹{product.price.toFixed(2)}</p>
                <div className="flex gap-2">
                    <Button variant="secondary" onClick={() => removeFromWishlist(product.id)}>
                        <TrashIcon className="h-5 w-5" /> Remove
                    </Button>
                    <Button onClick={handleMoveToCart}>
                        <ShoppingCartIcon className="h-5 w-5" /> Move to Cart
                    </Button>
                </div>
            </div>
        </Card>
    );
};


const WishlistView: React.FC<NavigationProps> = ({ navigateTo }) => {
  const { wishlist } = useAppContext();

  if (wishlist.length === 0) {
    return (
        <div className="text-center py-20">
            <HeartIcon className="h-16 w-16 mx-auto text-gray-400" />
            <h2 className="mt-4 text-2xl font-bold text-gray-800">Your Wishlist is Empty</h2>
            <p className="mt-2 text-gray-600">Save items you love by clicking the heart icon.</p>
            <Button onClick={() => navigateTo('home')} className="mt-6">
                Discover Products
            </Button>
        </div>
    )
  }

  return (
    <div className="space-y-6">
        <h1 className="text-4xl font-bold text-gray-900">My Wishlist</h1>
        <div className="space-y-4">
            {wishlist.map(product => (
                <WishlistItemCard key={product.id} product={product} />
            ))}
        </div>
    </div>
  );
};

export default WishlistView;