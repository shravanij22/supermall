import React from 'react';
import { useAppContext } from '../context/AppContext';
import { type NavigationProps } from '../types';
import Card from './common/Card';
import Button from './common/Button';
import { TrashIcon, PlusIcon, MinusIcon, ShoppingCartIcon } from './icons';

const CartView: React.FC<NavigationProps> = ({ navigateTo }) => {
  const { cart, removeFromCart, updateCartQuantity } = useAppContext();

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const taxes = subtotal * 0.08; // 8% tax
  const total = subtotal + taxes;

  if (cart.length === 0) {
    return (
        <div className="text-center py-20">
            <ShoppingCartIcon className="h-16 w-16 mx-auto text-gray-400" />
            <h2 className="mt-4 text-2xl font-bold text-gray-800">Your Cart is Empty</h2>
            <p className="mt-2 text-gray-600">Looks like you haven't added anything to your cart yet.</p>
            <Button onClick={() => navigateTo('home')} className="mt-6">
                Start Shopping
            </Button>
        </div>
    )
  }

  return (
    <div className="space-y-6">
        <h1 className="text-4xl font-bold text-gray-900">Your Cart</h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
            {cart.map(item => (
                <Card key={item.id} className="flex items-center gap-4">
                    <img src={item.imageUrl} alt={item.name} className="w-24 h-24 object-cover rounded-lg" />
                    <div className="flex-grow">
                        <h3 className="font-bold text-lg">{item.name}</h3>
                        <p className="text-sm text-gray-500">
                            {item.selectedColor && `Color: ${item.selectedColor}`}
                            {item.selectedSize && ` | Size: ${item.selectedSize}`}
                        </p>
                        <p className="text-indigo-600 font-semibold">₹{item.price.toFixed(2)}</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <Button variant="secondary" className="px-2 py-1" onClick={() => updateCartQuantity(item.id, item.quantity - 1)}><MinusIcon className="h-4 w-4"/></Button>
                        <span className="w-8 text-center font-semibold">{item.quantity}</span>
                         <Button variant="secondary" className="px-2 py-1" onClick={() => updateCartQuantity(item.id, item.quantity + 1)}><PlusIcon className="h-4 w-4"/></Button>
                    </div>
                    <p className="font-bold text-lg w-20 text-right">
                        ₹{(item.price * item.quantity).toFixed(2)}
                    </p>
                    <Button variant="danger" className="px-3 py-3" onClick={() => removeFromCart(item.id)}>
                        <TrashIcon className="h-5 w-5" />
                    </Button>
                </Card>
            ))}
            </div>

            <div className="lg:col-span-1">
                <Card className="space-y-4">
                    <h2 className="text-2xl font-bold">Order Summary</h2>
                    <div className="flex justify-between">
                        <span>Subtotal</span>
                        <span>₹{subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                        <span>Taxes (8%)</span>
                        <span>₹{taxes.toFixed(2)}</span>
                    </div>
                    <div className="border-t pt-4 mt-4 flex justify-between font-bold text-xl">
                        <span>Total</span>
                        <span>₹{total.toFixed(2)}</span>
                    </div>
                    <Button onClick={() => navigateTo('checkout')} className="w-full mt-4">
                        Proceed to Checkout
                    </Button>
                </Card>
            </div>
        </div>
    </div>
  );
};

export default CartView;