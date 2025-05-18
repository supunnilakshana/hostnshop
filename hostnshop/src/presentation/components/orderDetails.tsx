import React from 'react';
import Image from 'next/image';
import { Order} from '../../shared/types/orders';
import { MailIcon, PhoneIcon, ChartBarIcon, X } from 'lucide-react';

interface OrderDetailsProps {
  order: Order | null;
  onClose: () => void;
}

const OrderDetails: React.FC<OrderDetailsProps> = ({ order, onClose }) => {
  if (!order) return null;

  return (
    <div className="fixed inset-y-0 right-0 bg-white w-96 shadow-xl flex flex-col h-full overflow-auto">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b">
        <h2 className="text-lg font-medium">Order {order.id}</h2>
        <div className="flex items-center space-x-2">
          <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">
            Paid <span className="text-gray-500 ml-1">{order.date} · 13:52</span>
          </span>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Customer */}
      <div className="p-4 border-b">
        <div className="flex items-center">
          <div className="h-12 w-12 flex-shrink-0">
            <div className="h-12 w-12 rounded-full overflow-hidden bg-yellow-100">
              {order.customer.avatar ? (
                <Image
                  src={order.customer.avatar}
                  alt={order.customer.name}
                  width={48}
                  height={48}
                  className="h-12 w-12 object-cover"
                />
              ) : (
                <div className="h-12 w-12 flex items-center justify-center">
                  <span className="text-lg font-medium text-yellow-800">
                    {order.customer.name.charAt(0)}
                  </span>
                </div>
              )}
            </div>
          </div>
          <div className="ml-3">
            <h3 className="text-md font-medium">{order.customer.name}</h3>
          </div>
        </div>
        <div className="mt-4 flex space-x-2">
          <button className="p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200">
            <MailIcon className="h-5 w-5" />
          </button>
          <button className="p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200">
            <PhoneIcon className="h-5 w-5" />
          </button>
          <button className="p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200">
            <ChartBarIcon className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Order Items */}
      <div className="flex-1 p-4 overflow-auto">
        <h3 className="text-sm font-medium text-gray-500 mb-4">Order items</h3>
        <div className="space-y-4">
          {order.items.map((item) => (
            <div key={item.id} className="flex">
              <div className="h-16 w-16 bg-gray-100 rounded overflow-hidden flex-shrink-0">
                {item.imageUrl ? (
                  <Image
                    src={item.imageUrl}
                    alt={item.name}
                    width={64}
                    height={64}
                    className="h-16 w-16 object-cover"
                  />
                ) : (
                  <div className="h-16 w-16 flex items-center justify-center">
                    <span className="text-xs text-gray-500">No image</span>
                  </div>
                )}
              </div>
              <div className="ml-4 flex-1">
                <p className="text-sm">{item.name}</p>
                <p className="text-sm font-medium mt-1">${item.price.toFixed(2)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Total */}
      <div className="p-4 border-t">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Total</span>
          <span className="text-lg font-medium">${order.total.toFixed(2)}</span>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-4">
          <button 
            className="w-full py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Track
          </button>
          <button 
            className="w-full py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-yellow-100 hover:bg-yellow-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
          >
            Refund
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;