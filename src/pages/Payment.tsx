
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CreditCard, ArrowLeft, Plus, Shield, Check } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
  AlertDialogFooter,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { useOrder } from "@/context/OrderContext";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

const WALLET_OPTIONS = [
  {
    id: "paytm",
    name: "Paytm",
    icon: "/placeholder.svg",
  },
  {
    id: "mobikwik",
    name: "Mobikwik",
    icon: "/placeholder.svg",
  },
  {
    id: "phonepe",
    name: "PhonePe",
    icon: "/placeholder.svg",
  },
  {
    id: "amazonpay",
    name: "AmazonPay",
    icon: "/placeholder.svg",
  },
];

const UPI_OPTIONS = [
  {
    id: "googlepay",
    name: "Google Pay",
    icon: "/placeholder.svg",
  },
  {
    id: "bhim",
    name: "BHIM UPI",
    icon: "/placeholder.svg",
  },
];

const Payment = () => {
  const navigate = useNavigate();
  const [showDialog, setShowDialog] = useState(false);
  const [successDialog, setSuccessDialog] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("card");
  const { items, total, clearCart } = useCart();
  const { placeOrder } = useOrder();
  
  // Check if we're using rupees by looking at first item
  const currency = items.length > 0 && items[0].currency ? items[0].currency : '$';

  const handleProcessPayment = () => {
    // Simulate payment processing
    setShowDialog(false);
    
    // Create the order
    const order = placeOrder(items, total, selectedPaymentMethod);
    
    // Show success dialog
    setSuccessDialog(true);
    
    // After successful payment, we will clear the cart
    clearCart();
    
    // Redirect to order status page after 2 seconds
    setTimeout(() => {
      navigate(`/order-status/${order.id}`);
    }, 2000);
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
              onClick={() => navigate('/cart')}
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-2xl font-semibold">PAYMENTS</h1>
          </div>
          
          <div className="mb-6 p-4 bg-white rounded-lg shadow-sm">
            <div className="flex justify-between items-center">
              <span className="text-lg font-medium">Total Amount</span>
              <span className="text-xl font-bold text-orange-500">{currency}{total.toFixed(2)}</span>
            </div>
          </div>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-sm text-muted-foreground font-normal">
                PAYMENT METHOD
              </CardTitle>
            </CardHeader>
            <CardContent>
              <RadioGroup 
                value={selectedPaymentMethod} 
                onValueChange={setSelectedPaymentMethod}
                className="space-y-4"
              >
                <div className="flex items-center space-x-2 border p-4 rounded-md">
                  <RadioGroupItem value="card" id="card" />
                  <Label htmlFor="card" className="flex items-center gap-2">
                    <CreditCard className="h-5 w-5" />
                    <span>Credit/Debit Card</span>
                  </Label>
                </div>
                <div className="flex items-center space-x-2 border p-4 rounded-md">
                  <RadioGroupItem value="upi" id="upi" />
                  <Label htmlFor="upi">UPI Payment</Label>
                </div>
                <div className="flex items-center space-x-2 border p-4 rounded-md">
                  <RadioGroupItem value="wallet" id="wallet" />
                  <Label htmlFor="wallet">Wallet</Label>
                </div>
                <div className="flex items-center space-x-2 border p-4 rounded-md">
                  <RadioGroupItem value="cod" id="cod" />
                  <Label htmlFor="cod">Cash on Delivery</Label>
                </div>
              </RadioGroup>
            </CardContent>
          </Card>

          <div className="space-y-8">
            {selectedPaymentMethod === "card" && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm text-muted-foreground font-normal">
                    SAVED CARDS
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button 
                    variant="outline" 
                    className="w-full justify-start gap-2 h-auto py-4"
                    onClick={() => setShowDialog(true)}
                  >
                    <Plus className="h-5 w-5" />
                    <span>ADD NEW CARD</span>
                  </Button>
                  <div className="flex gap-2 items-center">
                    <CreditCard className="h-6 w-6 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">
                      Visa, Mastercard, RuPay, and more
                    </span>
                  </div>
                </CardContent>
              </Card>
            )}

            {selectedPaymentMethod === "upi" && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm text-muted-foreground font-normal">
                    UPI OPTIONS
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {UPI_OPTIONS.map((upi) => (
                    <div 
                      key={upi.id}
                      className="flex items-center justify-between py-2 border-b last:border-b-0"
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={upi.icon}
                          alt={upi.name}
                          className="w-8 h-8 object-contain"
                        />
                        <span>{upi.name}</span>
                      </div>
                      <Button 
                        variant="ghost"
                        className="text-orange-500 hover:text-orange-600 hover:bg-orange-50"
                        onClick={() => setShowDialog(true)}
                      >
                        PAY NOW
                      </Button>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}

            {selectedPaymentMethod === "wallet" && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm text-muted-foreground font-normal">
                    WALLETS
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {WALLET_OPTIONS.map((wallet) => (
                    <div 
                      key={wallet.id}
                      className="flex items-center justify-between py-2 border-b last:border-b-0"
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={wallet.icon}
                          alt={wallet.name}
                          className="w-8 h-8 object-contain"
                        />
                        <span>{wallet.name}</span>
                      </div>
                      <Button 
                        variant="ghost"
                        className="text-orange-500 hover:text-orange-600 hover:bg-orange-50"
                        onClick={() => setShowDialog(true)}
                      >
                        PAY NOW
                      </Button>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}

            {selectedPaymentMethod === "cod" && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm text-muted-foreground font-normal">
                    CASH ON DELIVERY
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-md">
                    <Shield className="h-6 w-6 text-orange-500" />
                    <p className="text-sm">Pay when your order is delivered. Extra charges may apply.</p>
                  </div>
                  <Button 
                    className="w-full"
                    onClick={() => setShowDialog(true)}
                  >
                    PLACE ORDER
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>

      <AlertDialog open={showDialog} onOpenChange={setShowDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Payment</AlertDialogTitle>
            <AlertDialogDescription>
              {selectedPaymentMethod === "cod" 
                ? "Are you sure you want to place this order with cash on delivery?"
                : "This is a demo application. In a real application, you would be redirected to a secure payment page."
              }
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleProcessPayment}>
              {selectedPaymentMethod === "cod" ? "Place Order" : "Process Payment"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog open={successDialog} onOpenChange={setSuccessDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <Check className="h-5 w-5 text-green-500" />
              Payment Successful
            </AlertDialogTitle>
            <AlertDialogDescription>
              Your order has been placed successfully. You will be redirected to the order tracking page.
            </AlertDialogDescription>
          </AlertDialogHeader>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Payment;
