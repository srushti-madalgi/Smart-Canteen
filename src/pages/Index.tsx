
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-100">
      <Navbar />
      <div className="container mx-auto px-4">
        <div className="flex min-h-screen items-center justify-center">
          <div className="text-center space-y-6 fade-in">
            <h1 className="text-4xl font-bold sm:text-5xl md:text-6xl tracking-tight">
              Welcome to Smart Canteen
            </h1>
            <p className="text-xl text-muted-foreground max-w-[600px] mx-auto">
              Order your favorite meals with ease. Experience a seamless dining
              experience with our smart ordering system.
            </p>
            <div className="flex items-center justify-center gap-4">
              <Link to="/login">
                <Button size="lg">Get Started</Button>
              </Link>
              <Link to="/menu">
                <Button variant="outline" size="lg">
                  View Menu
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
