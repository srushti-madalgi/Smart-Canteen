
import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { ShoppingCart, LogOut, Clock } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export function Navbar() {
  const { isAuthenticated, logout, user } = useAuth();
  const { items } = useCart();
  const navigate = useNavigate();

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link
            to="/"
            className="text-xl font-semibold hover:opacity-80 transition-opacity"
          >
            Smart Canteen
          </Link>

          <div className="flex items-center gap-4">
            {isAuthenticated ? (
              <>
                <span className="text-sm text-muted-foreground">
                  Welcome, {user?.name}
                </span>
                <Link to="/menu">
                  <Button variant="ghost">Menu</Button>
                </Link>
                <Link to="/order-history">
                  <Button variant="ghost" size="icon">
                    <Clock className="h-5 w-5" />
                  </Button>
                </Link>
                <Link to="/cart" className="relative">
                  <Button variant="ghost" size="icon">
                    <ShoppingCart className="h-5 w-5" />
                    {totalItems > 0 && (
                      <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground rounded-full w-5 h-5 text-xs flex items-center justify-center">
                        {totalItems}
                      </span>
                    )}
                  </Button>
                </Link>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => {
                    logout();
                    navigate('/');
                  }}
                >
                  <LogOut className="h-5 w-5" />
                </Button>
              </>
            ) : (
              <Link to="/login">
                <Button>Login</Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
