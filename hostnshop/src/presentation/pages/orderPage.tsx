'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { orders as initialOrders } from '../../shared/data/orderList';
import OrdersTable from '../../presentation/components/ordersTable';
import OrderDetails from '../../presentation/components/orderDetails';
import { Order } from '../../shared/types/orders';
import { Search } from 'lucide-react';
import MainWrapper from '../components/mainWrapper';

// Price range type for filter
type PriceRange = {
  min: number;
  max: number | null;
  label: string;
};

// Sort options type
type SortOption = {
  field: keyof Order | 'customer.name';
  direction: 'asc' | 'desc';
  label: string;
};

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>(initialOrders);
  const [selectedOrderIds, setSelectedOrderIds] = useState<string[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>('Any status');
  const [priceFilter, setPriceFilter] = useState<string>('$100–$1500');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortOption, setSortOption] = useState<string>('Sort by Date');
  
  // Define price ranges
  const priceRanges: Record<string, PriceRange> = {
    '$100–$1500': { min: 100, max: 1500, label: '$100–$1500' },
    '$1500–$5000': { min: 1500, max: 5000, label: '$1500–$5000' },
    '$5000+': { min: 5000, max: null, label: '$5000+' }
  };
  
  // Define sort options
  const sortOptions: Record<string, SortOption> = {
    'Sort by Date': { field: 'date', direction: 'desc', label: 'Sort by Date' },
    'Sort by Total': { field: 'total', direction: 'desc', label: 'Sort by Total' },
    'Sort by Status': { field: 'status', direction: 'asc', label: 'Sort by Status' }
  };

  // Filter and sort orders
  const filteredOrders = useMemo(() => {
    return initialOrders.filter(order => {
      // Status filter
      if (statusFilter !== 'Any status' && order.status !== statusFilter) {
        return false;
      }
      
      // Price filter
      const priceRange = priceRanges[priceFilter];
      if (priceRange) {
        if (order.total < priceRange.min) return false;
        if (priceRange.max !== null && order.total > priceRange.max) return false;
      }
      
      // Search query (search by order ID, customer name)
      if (searchQuery) {
        const searchLower = searchQuery.toLowerCase();
        const orderIdMatch = order.id.toLowerCase().includes(searchLower);
        const customerNameMatch = order.customer.name.toLowerCase().includes(searchLower);
        if (!orderIdMatch && !customerNameMatch) return false;
      }
      
      return true;
    }).sort((a, b) => {
      const option = sortOptions[sortOption];
      if (!option) return 0;
      
      // Special case for nested properties
      if (option.field === 'customer.name') {
        return option.direction === 'asc' 
          ? a.customer.name.localeCompare(b.customer.name)
          : b.customer.name.localeCompare(a.customer.name);
      }
      
      // Handle date comparison specially (convert to comparable format)
      if (option.field === 'date') {
        // Simple conversion for our format
        const getDateValue = (dateStr: string) => {
          const months: Record<string, number> = {
            'Jan': 1, 'Feb': 2, 'Mar': 3, 'Apr': 4, 'May': 5, 'Jun': 6,
            'Jul': 7, 'Aug': 8, 'Sep': 9, 'Oct': 10, 'Nov': 11, 'Dec': 12
          };
          
          const [month, day] = dateStr.split(' ');
          // Default to current year, this is simplified
          const currentYear = new Date().getFullYear();
          const monthNum = months[month] || 1;
          const dayNum = parseInt(day) || 1;
          
          return new Date(currentYear, monthNum - 1, dayNum).getTime();
        };
        
        const aValue = getDateValue(a.date);
        const bValue = getDateValue(b.date);
        
        return option.direction === 'asc' ? aValue - bValue : bValue - aValue;
      }
      
      // Regular property comparison
      const aValue = a[option.field];
      const bValue = b[option.field];
      
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return option.direction === 'asc' 
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }
      
      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return option.direction === 'asc' ? aValue - bValue : bValue - aValue;
      }
      
      return 0;
    });
  }, [initialOrders, statusFilter, priceFilter, searchQuery, sortOption]);
  
  // Update orders state when filtered orders change
  useEffect(() => {
    setOrders(filteredOrders);
  }, [filteredOrders]);

  const handleSelectOrder = (orderId: string, isSelected: boolean) => {
    if (isSelected) {
      setSelectedOrderIds([...selectedOrderIds, orderId]);
    } else {
      setSelectedOrderIds(selectedOrderIds.filter(id => id !== orderId));
    }
  };

  const handleSelectAll = (isSelected: boolean) => {
    if (isSelected) {
      setSelectedOrderIds(orders.map(order => order.id));
    } else {
      setSelectedOrderIds([]);
    }
  };

  const handleOrderClick = (order: Order) => {
    setSelectedOrder(order);
  };
  
  // Reset selected order IDs when filtered orders change
  useEffect(() => {
    setSelectedOrderIds([]);
  }, [statusFilter, priceFilter, searchQuery]);

  return (
    <MainWrapper>
         <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center">
            <h1 className="text-[16px] font-bold leading-4">Orders</h1>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search orders..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 text-[14px]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-3 w-3 text-gray-400" />
              </div>
            </div>
            <div className="relative">
              <img 
                src="/avatars/kristina-evans.jpg" 
                alt="Profile" 
                className="h-8 w-8 rounded-full"
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col bg-white rounded-lg shadow">
          {/* Filters */}
          <div className="px-6 py-4 border-b border-gray-200 flex justify-between">
            <div className="flex space-x-4">
              <select
                className="block pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option>Any status</option>
                <option>Paid</option>
                <option>Delivered</option>
                <option>Completed</option>
              </select>

              <select
                className="block pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                value={priceFilter}
                onChange={(e) => setPriceFilter(e.target.value)}
              >
                <option>$100–$1500</option>
                <option>$1500–$5000</option>
                <option>$5000+</option>
              </select>
            </div>

            <select
              className="block pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
            >
              <option>Sort by Date</option>
              <option>Sort by Total</option>
              <option>Sort by Status</option>
            </select>
          </div>

          {/* Table */}
          <OrdersTable
            orders={orders}
            selectedOrderIds={selectedOrderIds}
            onSelectOrder={handleSelectOrder}
            onSelectAll={handleSelectAll}
            onOrderClick={handleOrderClick}
          />
        </div>
      </div>

      {/* Order Details Sidebar */}
      <OrderDetails order={selectedOrder} onClose={() => setSelectedOrder(null)} />
    </div>
    </MainWrapper>
   
  );
}