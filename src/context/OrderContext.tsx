
import React, { createContext, useContext, useState } from 'react';
import { Order, OrderStatus } from '@/types/order';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from './AuthContext';
import { v4 as uuidv4 } from 'uuid';

interface OrderContextType {
  orders: Order[];
  currentOrder: Order | null;
  placeOrder: (items: any[], total: number, paymentMethod: string) => Order;
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;
  getOrder: (orderId: string) => Order | undefined;
  getUserOrders: () => Order[];
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export function OrderProvider({ children }: { children: React.ReactNode }) {
  const [orders, setOrders] = useState<Order[]>([]);
  const [currentOrder, setCurrentOrder] = useState<Order | null>(null);
  const { toast } = useToast();
  const { user } = useAuth();

  const placeOrder = (items: any[], total: number, paymentMethod: string) => {
    if (!user) {
      throw new Error("User must be logged in to place an order");
    }

    const newOrder: Order = {
      id: uuidv4(),
      userId: user.id,
      items: [...items],
      total,
      status: "pending",
      paymentMethod,
      paymentStatus: "pending",
      orderDate: new Date(),
      estimatedReadyTime: new Date(Date.now() + 15 * 60000), // 15 minutes from now
    };

    setOrders((prevOrders) => [...prevOrders, newOrder]);
    setCurrentOrder(newOrder);

    toast({
      title: "Order Placed",
      description: `Your order #${newOrder.id.substring(0, 6)} has been placed and is being processed.`,
    });

    return newOrder;
  };

  const updateOrderStatus = (orderId: string, status: OrderStatus) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === orderId ? { ...order, status } : order
      )
    );

    if (currentOrder?.id === orderId) {
      setCurrentOrder((prev) => (prev ? { ...prev, status } : null));
    }

    toast({
      title: "Order Updated",
      description: `Your order status has been updated to: ${status}`,
    });
  };

  const getOrder = (orderId: string) => {
    return orders.find((order) => order.id === orderId);
  };

  const getUserOrders = () => {
    if (!user) return [];
    return orders.filter((order) => order.userId === user.id);
  };

  return (
    <OrderContext.Provider
      value={{
        orders,
        currentOrder,
        placeOrder,
        updateOrderStatus,
        getOrder,
        getUserOrders,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
}

export function useOrder() {
  const context = useContext(OrderContext);
  if (context === undefined) {
    throw new Error('useOrder must be used within an OrderProvider');
  }
  return context;
}
