
import { useNavigate } from "react-router-dom";
import { useOrder } from "@/context/OrderContext";
import Navbar from "@/components/Navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Clock, ChevronRight } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const OrderHistory = () => {
  const { getUserOrders } = useOrder();
  const navigate = useNavigate();
  
  const orders = getUserOrders();
  const activeOrders = orders.filter(order => order.status !== "completed" && order.status !== "cancelled");
  const pastOrders = orders.filter(order => order.status === "completed" || order.status === "cancelled");
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending": return "bg-orange-500";
      case "preparing": return "bg-yellow-500";
      case "ready": return "bg-blue-500";
      case "completed": return "bg-green-500";
      case "cancelled": return "bg-red-500";
      default: return "bg-gray-500";
    }
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString();
  };

  const formatTime = (date: Date) => {
    return new Date(date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
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
              onClick={() => navigate('/menu')}
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-2xl font-semibold">ORDER HISTORY</h1>
          </div>
          
          <Tabs defaultValue="active" className="mb-8">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="active">Active Orders</TabsTrigger>
              <TabsTrigger value="past">Past Orders</TabsTrigger>
            </TabsList>
            
            <TabsContent value="active">
              {activeOrders.length === 0 ? (
                <Card>
                  <CardContent className="pt-6 text-center">
                    <p className="text-muted-foreground mb-4">You don't have any active orders</p>
                    <Button onClick={() => navigate("/menu")}>Go to Menu</Button>
                  </CardContent>
                </Card>
              ) : (
                <div className="space-y-4">
                  {activeOrders.map((order) => (
                    <Card key={order.id} className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => navigate(`/order-status/${order.id}`)}>
                      <CardContent className="p-4">
                        <div className="flex justify-between items-center mb-3">
                          <h3 className="font-semibold">Order #{order.id.substring(0, 6)}</h3>
                          <Badge className={`${getStatusColor(order.status)} hover:${getStatusColor(order.status)}`}>
                            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                          </Badge>
                        </div>
                        <div className="text-sm text-muted-foreground mb-3">
                          {formatDate(order.orderDate)} at {formatTime(order.orderDate)}
                        </div>
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm">
                              {order.items.length} item{order.items.length > 1 ? 's' : ''} • {order.items[0]?.currency || "₹"}{order.total.toFixed(2)}
                            </span>
                          </div>
                          <ChevronRight className="h-5 w-5 text-muted-foreground" />
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="past">
              {pastOrders.length === 0 ? (
                <Card>
                  <CardContent className="pt-6 text-center">
                    <p className="text-muted-foreground mb-4">You don't have any past orders</p>
                    <Button onClick={() => navigate("/menu")}>Go to Menu</Button>
                  </CardContent>
                </Card>
              ) : (
                <div className="space-y-4">
                  {pastOrders.map((order) => (
                    <Card key={order.id} className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => navigate(`/order-status/${order.id}`)}>
                      <CardContent className="p-4">
                        <div className="flex justify-between items-center mb-3">
                          <h3 className="font-semibold">Order #{order.id.substring(0, 6)}</h3>
                          <Badge className={`${getStatusColor(order.status)} hover:${getStatusColor(order.status)}`}>
                            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                          </Badge>
                        </div>
                        <div className="text-sm text-muted-foreground mb-3">
                          {formatDate(order.orderDate)} at {formatTime(order.orderDate)}
                        </div>
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm">
                              {order.items.length} item{order.items.length > 1 ? 's' : ''} • {order.items[0]?.currency || "₹"}{order.total.toFixed(2)}
                            </span>
                          </div>
                          <ChevronRight className="h-5 w-5 text-muted-foreground" />
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default OrderHistory;
