
import { useParams, useNavigate } from "react-router-dom";
import { useOrder } from "@/context/OrderContext";
import Navbar from "@/components/Navbar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, CheckCheck, ChefHat, ArrowLeft, ShoppingBag } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const OrderStatus = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const { getOrder } = useOrder();
  const navigate = useNavigate();
  
  const order = getOrder(orderId || "");
  
  if (!order) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white to-gray-100">
        <Navbar />
        <div className="container mx-auto px-4 py-20">
          <div className="max-w-md mx-auto text-center">
            <h1 className="text-2xl font-bold mb-4">Order Not Found</h1>
            <p className="text-muted-foreground mb-6">
              The order you're looking for doesn't exist or has been removed.
            </p>
            <Button onClick={() => navigate("/menu")}>Back to Menu</Button>
          </div>
        </div>
      </div>
    );
  }

  const statusSteps = [
    { id: "pending", label: "Order Placed", icon: ShoppingBag, active: true },
    { id: "preparing", label: "Preparing", icon: ChefHat, active: order.status !== "pending" },
    { id: "ready", label: "Ready for Pickup", icon: CheckCheck, active: order.status === "ready" || order.status === "completed" },
    { id: "completed", label: "Completed", icon: CheckCheck, active: order.status === "completed" },
  ];

  const formatTime = (date: Date) => {
    return new Date(date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const getStatusColor = () => {
    switch (order.status) {
      case "pending": return "bg-orange-500";
      case "preparing": return "bg-yellow-500";
      case "ready": return "bg-blue-500";
      case "completed": return "bg-green-500";
      case "cancelled": return "bg-red-500";
      default: return "bg-gray-500";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-100">
      <Navbar />
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => navigate(-1)}
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-2xl font-semibold">ORDER STATUS</h1>
          </div>
          
          <Card className="mb-8">
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Order #{order.id.substring(0, 6)}</CardTitle>
                  <CardDescription>
                    {new Date(order.orderDate).toLocaleDateString()} at {formatTime(order.orderDate)}
                  </CardDescription>
                </div>
                <Badge className={`${getStatusColor()} hover:${getStatusColor()}`}>
                  {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="relative">
                <div className="absolute left-[19px] top-0 bottom-0 w-[2px] bg-gray-200 z-0"></div>
                <ul className="relative z-10 space-y-6">
                  {statusSteps.map((step, index) => (
                    <li key={step.id} className="flex items-start gap-4">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                        step.active ? "bg-orange-500 text-white" : "bg-gray-200 text-gray-500"
                      }`}>
                        <step.icon className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="font-medium">{step.label}</h3>
                        {step.id === "preparing" && order.status !== "pending" && (
                          <p className="text-sm text-muted-foreground">
                            Your food is being prepared
                          </p>
                        )}
                        {step.id === "ready" && order.status === "ready" && (
                          <p className="text-sm text-muted-foreground">
                            Your order is ready for pickup
                          </p>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              
              {order.estimatedReadyTime && order.status !== "completed" && (
                <div className="mt-8 p-4 bg-orange-50 rounded-lg flex items-center gap-3">
                  <Clock className="h-5 w-5 text-orange-500" />
                  <div>
                    <p className="font-medium">Estimated Ready Time</p>
                    <p className="text-sm text-muted-foreground">
                      {formatTime(order.estimatedReadyTime)}
                    </p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {order.items.map((item) => (
                <div key={item.id} className="flex justify-between pb-2 border-b last:border-b-0 last:pb-0">
                  <div className="flex gap-2">
                    <span className="font-medium">{item.quantity}x</span>
                    <span>{item.name}</span>
                  </div>
                  <span>{item.currency}{(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
              
              <div className="pt-4 border-t">
                <div className="flex justify-between font-bold">
                  <span>Total</span>
                  <span>{order.items[0]?.currency || "₹"}{order.total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm text-muted-foreground mt-1">
                  <span>Payment Method</span>
                  <span>{order.paymentMethod === "cod" ? "Cash on Delivery" : order.paymentMethod.charAt(0).toUpperCase() + order.paymentMethod.slice(1)}</span>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full" onClick={() => navigate("/menu")}>
                Order More
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default OrderStatus;
