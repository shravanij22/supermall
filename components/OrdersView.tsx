import React from 'react';
import { useAppContext } from '../context/AppContext';
import Card from './common/Card';
import { ClipboardDocumentListIcon } from './icons';

const OrdersView: React.FC = () => {
    const { orders } = useAppContext();

    const getStatusColor = (status: string) => {
        switch(status) {
            case 'Processing': return 'bg-blue-100 text-blue-800';
            case 'Shipped': return 'bg-yellow-100 text-yellow-800';
            case 'Delivered': return 'bg-green-100 text-green-800';
            case 'Cancelled': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    }

    if (orders.length === 0) {
        return (
             <div className="text-center py-20">
                <ClipboardDocumentListIcon className="h-16 w-16 mx-auto text-gray-400" />
                <h2 className="mt-4 text-2xl font-bold text-gray-800">No Orders Yet</h2>
                <p className="mt-2 text-gray-600">Your past orders will appear here.</p>
            </div>
        )
    }

    return (
        <div className="space-y-6">
            <h1 className="text-4xl font-bold text-gray-900">My Orders</h1>
            <div className="space-y-6">
                {orders.map(order => (
                    <Card key={order.id}>
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h2 className="text-xl font-bold">Order #{order.id.split('-')[1]}</h2>
                                <p className="text-sm text-gray-500">
                                    Date: {new Date(order.date).toLocaleDateString()}
                                </p>
                            </div>
                            <div className="text-right">
                               <span className={`px-3 py-1 text-sm font-semibold rounded-full ${getStatusColor(order.status)}`}>
                                   {order.status}
                               </span>
                               <p className="font-bold text-xl mt-1">₹{order.total.toFixed(2)}</p>
                            </div>
                        </div>
                        <div className="border-t pt-4">
                            <h3 className="font-semibold mb-2">Items:</h3>
                            <ul className="space-y-2">
                                {order.items.map(item => (
                                    <li key={item.id} className="flex items-center gap-4 text-sm">
                                        <img src={item.imageUrl} alt={item.name} className="w-12 h-12 object-cover rounded-md" />
                                        <div>
                                            <p className="font-medium">{item.name}</p>
                                            <p className="text-gray-600">Qty: {item.quantity}</p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default OrdersView;