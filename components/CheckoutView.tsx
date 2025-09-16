import React from 'react';
import { useAppContext } from '../context/AppContext';
import { type NavigationProps } from '../types';
import Card from './common/Card';
import Button from './common/Button';

const CheckoutView: React.FC<NavigationProps> = ({ navigateTo }) => {
  const { cart, placeOrder } = useAppContext();

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const taxes = subtotal * 0.08;
  const total = subtotal + taxes;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    placeOrder(cart);
    navigateTo('orders');
  };

  return (
    <div className="space-y-6">
      <h1 className="text-4xl font-bold text-gray-900">Checkout</h1>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <h2 className="text-2xl font-bold mb-4">Shipping Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input name="firstName" placeholder="First Name" required className="w-full p-2 border rounded" />
              <input name="lastName" placeholder="Last Name" required className="w-full p-2 border rounded" />
              <textarea name="address" placeholder="Address" required className="w-full p-2 border rounded md:col-span-2" />
              <input name="city" placeholder="City" required className="w-full p-2 border rounded" />
              <input name="zip" placeholder="ZIP Code" required className="w-full p-2 border rounded" />
            </div>
          </Card>
          <Card>
            <h2 className="text-2xl font-bold mb-4">Payment Details</h2>
            <div className="space-y-4">
                <input name="card" placeholder="Card Number" required className="w-full p-2 border rounded" />
                <div className="grid grid-cols-2 gap-4">
                    <input name="expiry" placeholder="MM/YY" required className="w-full p-2 border rounded" />
                    <input name="cvc" placeholder="CVC" required className="w-full p-2 border rounded" />
                </div>
            </div>
          </Card>
        </div>

        <div className="lg:col-span-1">
          <Card className="space-y-4 sticky top-24">
            <h2 className="text-2xl font-bold">Your Order</h2>
            <ul className="space-y-2">
                {cart.map(item => (
                    <li key={item.id} className="flex justify-between items-center text-sm">
                        <span>{item.name} x {item.quantity}</span>
                        <span className="font-medium">₹{(item.price * item.quantity).toFixed(2)}</span>
                    </li>
                ))}
            </ul>
            <div className="border-t pt-4 mt-4 space-y-2">
                <div className="flex justify-between"><span>Subtotal</span><span>₹{subtotal.toFixed(2)}</span></div>
                <div className="flex justify-between"><span>Taxes</span><span>₹{taxes.toFixed(2)}</span></div>
                <div className="flex justify-between font-bold text-xl"><span>Total</span><span>₹{total.toFixed(2)}</span></div>
            </div>
            <Button type="submit" className="w-full mt-4">
              Place Order
            </Button>
          </Card>
        </div>
      </form>
    </div>
  );
};

export default CheckoutView;