
import { CartItem } from "./menu";

export type OrderStatus = "pending" | "preparing" | "ready" | "completed" | "cancelled";

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  total: number;
  status: OrderStatus;
  paymentMethod: string;
  paymentStatus: "pending" | "completed" | "failed";
  orderDate: Date;
  estimatedReadyTime?: Date;
}
