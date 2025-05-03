import React from 'react';
import { OrderStatus } from '../../shared/types/orders';

interface StatusBadgeProps {
  status: OrderStatus;
}

const orderStatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const getStatusStyles = (status: OrderStatus) => {
    switch (status) {
      case 'Paid':
        return 'bg-yellow-100 text-yellow-800';
      case 'Delivered':
        return 'bg-orange-100 text-orange-800';
      case 'Completed':
        return 'bg-green-100 text-green-800';
      case 'Pending':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <span 
      className={`${getStatusStyles(status)} px-2.5 py-0.5 rounded-md text-xs font-medium`}
    >
      {status}
    </span>
  );
};

export default orderStatusBadge;