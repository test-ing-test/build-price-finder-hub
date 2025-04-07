
import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Search, 
  ShoppingCart, 
  Menu, 
  X, 
  Home, 
  Grid, 
  Info, 
  Phone 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose
} from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/context/CartContext';
import UserProfile from './UserProfile';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { totalItems } = useCart();
  const location = useLocation();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/materials?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left">
                <div className="flex flex-col gap-4 mt-8">
                  <SheetClose asChild>
                    <Link to="/" className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-100">
                      <Home size={20} />
                      <span>Home</span>
                    </Link>
                  </SheetClose>
                  <SheetClose asChild>
                    <Link to="/materials" className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-100">
                      <Grid size={20} />
                      <span>Materials</span>
                    </Link>
                  </SheetClose>
                  <SheetClose asChild>
                    <Link to="/about" className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-100">
                      <Info size={20} />
                      <span>About</span>
                    </Link>
                  </SheetClose>
                  <SheetClose asChild>
                    <Link to="/contact" className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-100">
                      <Phone size={20} />
                      <span>Contact</span>
                    </Link>
                  </SheetClose>
                </div>
              </SheetContent>
            </Sheet>
            
            <Link to="/" className="text-2xl font-bold text-construction-blue">
              BuildPrice
            </Link>
          </div>
          
          <nav className="hidden md:flex space-x-6">
            <Link 
              to="/" 
              className={`font-medium ${location.pathname === '/' ? 'text-construction-blue' : 'text-gray-600 hover:text-construction-blue'}`}
            >
              Home
            </Link>
            <Link 
              to="/materials" 
              className={`font-medium ${location.pathname === '/materials' || location.pathname.startsWith('/material/') ? 'text-construction-blue' : 'text-gray-600 hover:text-construction-blue'}`}
            >
              Materials
            </Link>
            <Link 
              to="/about" 
              className={`font-medium ${location.pathname === '/about' ? 'text-construction-blue' : 'text-gray-600 hover:text-construction-blue'}`}
            >
              About
            </Link>
            <Link 
              to="/contact" 
              className={`font-medium ${location.pathname === '/contact' ? 'text-construction-blue' : 'text-gray-600 hover:text-construction-blue'}`}
            >
              Contact
            </Link>
          </nav>
          
          <div className="flex items-center space-x-3">
            <form onSubmit={handleSearch} className="relative hidden md:block">
              <Input
                type="search"
                placeholder="Search materials..."
                className="w-60 pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            </form>
            
            <Link to="/cart" className="relative">
              <Button variant="outline" size="icon">
                <ShoppingCart className="h-5 w-5" />
                {totalItems > 0 && (
                  <Badge 
                    className="absolute -top-2 -right-2 bg-construction-orange text-white"
                    variant="default"
                  >
                    {totalItems}
                  </Badge>
                )}
              </Button>
            </Link>
            
            <UserProfile />
          </div>
        </div>
      </header>
      
      {/* Mobile Search - Only visible on small screens */}
      <div className="md:hidden p-4 bg-gray-50 border-b">
        <form onSubmit={handleSearch} className="relative">
          <Input
            type="search"
            placeholder="Search materials..."
            className="w-full pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
        </form>
      </div>
      
      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>
      
      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">BuildPrice</h3>
              <p className="text-gray-300">
                Helping you find the best prices for construction materials. We connect buyers with suppliers for transparent pricing.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><Link to="/" className="text-gray-300 hover:text-white">Home</Link></li>
                <li><Link to="/materials" className="text-gray-300 hover:text-white">Materials</Link></li>
                <li><Link to="/about" className="text-gray-300 hover:text-white">About Us</Link></li>
                <li><Link to="/contact" className="text-gray-300 hover:text-white">Contact</Link></li>
                <li><Link to="/cart" className="text-gray-300 hover:text-white">Price Estimator</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Contact Us</h3>
              <address className="not-italic text-gray-300">
                <p>Email: info@buildprice.com</p>
                <p>Phone: (555) 123-4567</p>
                <p>Address: 123 Builder St, Construction City, CC 12345</p>
              </address>
            </div>
          </div>
          <div className="mt-8 pt-6 border-t border-gray-800 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} BuildPrice. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
