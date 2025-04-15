
import { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import { useCart } from '@/context/CartContext';
import { MenuItem } from '@/types/menu';

// Hardcoded menu items
const MENU_ITEMS: MenuItem[] = [
  {
    id: '1',
    name: 'Butter Chicken',
    description: 'Creamy tomato sauce with tender chicken pieces',
    price: 249,
    image: 'https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    category: 'Main Course',
    currency: '₹',
  },
  {
    id: '2',
    name: 'Paneer Tikka',
    description: 'Grilled cottage cheese with spices and vegetables',
    price: 199,
    image: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    category: 'Starters',
    currency: '₹',
  },
  {
    id: '3',
    name: 'Masala Dosa',
    description: 'Crispy rice crepe filled with spiced potatoes',
    price: 129,
    image: 'https://cdn.tasteatlas.com/Images/Dishes/ba7bab747c7e41769dbc895a84626a23.jpg?mw=2000',
    category: 'South Indian',
    currency: '₹',
  },
  {
    id: '4',
    name: 'Chole Bhature',
    description: 'Spicy chickpea curry with fried bread',
    price: 159,
    image: 'https://tse1.mm.bing.net/th?id=OIP.P13hIX9w9Apt04zskDD69QHaFb&pid=Api&P=0&h=180',
    category: 'Main Course',
    currency: '₹',
  },
  {
    id: '5',
    name: 'Veg Biryani',
    description: 'Fragrant rice with mixed vegetables and spices',
    price: 189,
    image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    category: 'Rice',
    currency: '₹',
  },
  {
    id: '6',
    name: 'Gulab Jamun',
    description: 'Sweet milk solids dumplings soaked in sugar syrup',
    price: 99,
    image: 'https://tse1.mm.bing.net/th?id=OIP.D8wTJQTUfdxqXubUnLE33QHaFk&pid=Api&P=0&h=180',
    category: 'Desserts',
    currency: '₹',
  },
  {
    id: '7',
    name: 'Samosa',
    description: 'Crispy pastry filled with spiced potatoes and peas',
    price: 49,
    image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    category: 'Starters',
    currency: '₹',
  },
  {
    id: '8',
    name: 'Chicken Biryani',
    description: 'Aromatic rice with tender chicken and spices',
    price: 229,
    image: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    category: 'Rice',
    currency: '₹',
  },
  {
    id: '9',
    name: 'Masala Chai',
    description: 'Spiced Indian tea with milk',
    price: 49,
    image: 'https://images.unsplash.com/photo-1561336313-0bd5e0b27ec8?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    category: 'Beverages',
    currency: '₹',
  },
  {
    id: '10',
    name: 'Filter Coffee',
    description: 'South Indian style brewed coffee with milk',
    price: 59,
    image: 'https://images.unsplash.com/photo-1525480122447-64809d765ec4?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    category: 'Beverages',
    currency: '₹',
  },
  {
    id: '11',
    name: 'Mango Lassi',
    description: 'Sweet yogurt drink with mango pulp',
    price: 89,
    image: 'https://www.cookwithmanali.com/wp-content/uploads/2014/05/Mango-Lassi-Recipe.jpg',
    category: 'Beverages',
    currency: '₹',
  },
  {
    id: '12',
    name: 'Fresh Orange Juice',
    description: 'Freshly squeezed orange juice',
    price: 79,
    image: 'https://img.freepik.com/premium-photo/fresh-orange-juice_945894-6.jpg',
    category: 'Beverages',
    currency: '₹',
  },
];

const CATEGORIES = Array.from(new Set(MENU_ITEMS.map(item => item.category)));

const Menu = () => {
  const { addItem } = useCart();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredItems = selectedCategory
    ? MENU_ITEMS.filter(item => item.category === selectedCategory)
    : MENU_ITEMS;

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-100">
      <Navbar />
      <div className="container mx-auto px-4 py-20">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">Our Menu</h1>
          <div className="flex gap-2 overflow-x-auto pb-4">
            <Button
              variant={selectedCategory === null ? "default" : "outline"}
              onClick={() => setSelectedCategory(null)}
            >
              All
            </Button>
            {CATEGORIES.map(category => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredItems.map((item) => (
            <Card key={item.id} className="menu-item">
              <CardHeader>
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
              </CardHeader>
              <CardContent>
                <CardTitle>{item.name}</CardTitle>
                <CardDescription>{item.description}</CardDescription>
              </CardContent>
              <CardFooter className="flex justify-between items-center">
                <span className="text-lg font-semibold">
                  {item.currency}{item.price}
                </span>
                <Button onClick={() => addItem(item)}>Add to Cart</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Menu;
