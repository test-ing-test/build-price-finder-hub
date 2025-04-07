import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Plus, Minus, Globe, ExternalLink } from 'lucide-react';
import { useCart, Material } from '@/context/CartContext';
import { Badge } from '@/components/ui/badge';
import CartRequireAuth from './CartRequireAuth';
import { useAuth } from '@/context/AuthContext';

interface MaterialCardProps {
  material: Material;
}

const MaterialCard: React.FC<MaterialCardProps> = ({ material }) => {
  const { addToCart, items, updateQuantity } = useCart();
  const { isAuthenticated } = useAuth();
  
  const cartItem = items.find(item => item.material.id === material.id);
  const quantity = cartItem ? cartItem.quantity : 0;

  // Get real external URL for online suppliers
  const getExternalUrl = () => {
    // Map supplier names to actual websites
    const supplierWebsites: Record<string, string> = {
      'Amazon India': 'https://www.amazon.in',
      'Flipkart': 'https://www.flipkart.com',
      'Industry Buying': 'https://www.industrybuying.com',
      'Online Supplier A': 'https://www.amazon.in',
      'Online Supplier B': 'https://www.flipkart.com',
      'Online Supplier C': 'https://www.industrybuying.com',
      'default': 'https://www.google.com/search'
    };
    
    const baseUrl = supplierWebsites[material.supplier] || supplierWebsites['default'];
    
    // For search-based sites, add the product name as a query parameter
    if (baseUrl === supplierWebsites['default']) {
      return `${baseUrl}?q=${encodeURIComponent(material.name + ' construction material')}`;
    }
    
    // For e-commerce sites, go to a search page with product name
    return `${baseUrl}/search?q=${encodeURIComponent(material.name)}`;
  };

  // Render the appropriate wrapper based on whether it's an online product
  const ContentWrapper = ({ children }: { children: React.ReactNode }) => {
    if (material.isOnline) {
      return (
        <a 
          href={getExternalUrl()} 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex-grow"
        >
          {children}
        </a>
      );
    }
    
    return (
      <Link to={`/material/${material.id}`} className="flex-grow">
        {children}
      </Link>
    );
  };

  // Ensure image is loaded properly
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = 'https://via.placeholder.com/400x400?text=Material+Image';
  };

  const handleAddToCart = () => {
    addToCart(material, 1);
  };

  return (
    <Card className="overflow-hidden transition-shadow duration-300 hover:shadow-md h-full flex flex-col">
      <ContentWrapper>
        <div className="aspect-square w-full overflow-hidden bg-gray-100 relative">
          <img 
            src={material.image || 'https://via.placeholder.com/400x400?text=Material+Image'} 
            alt={material.name} 
            className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
            onError={handleImageError}
          />
          {material.isOnline && (
            <Badge className="absolute top-2 right-2 bg-blue-500 text-white">
              <Globe className="h-3 w-3 mr-1" /> Online
            </Badge>
          )}
        </div>
        <CardContent className="p-4">
          <h3 className="font-semibold text-lg truncate">
            {material.name}
            {material.isOnline && (
              <ExternalLink className="h-4 w-4 inline ml-1" />
            )}
          </h3>
          <p className="text-sm text-gray-500 mb-2">{material.category}</p>
          <div className="flex justify-between items-center">
            <div>
              <span className="text-lg font-bold text-construction-blue">
                {material.isOnline ? '₹' : '$'}{material.price.toFixed(2)}
              </span>
              <span className="text-sm text-gray-500 ml-1">/ {material.unit}</span>
            </div>
          </div>
        </CardContent>
      </ContentWrapper>
      <CardFooter className="p-4 pt-0">
        {isAuthenticated && quantity > 0 ? (
          <div className="flex w-full items-center justify-between">
            <Button 
              size="icon" 
              variant="outline"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                updateQuantity(material.id, quantity - 1);
              }}
            >
              <Minus className="h-4 w-4" />
            </Button>
            <span className="font-medium">{quantity}</span>
            <Button 
              size="icon" 
              variant="outline"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                updateQuantity(material.id, quantity + 1);
              }}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        ) : (
          <CartRequireAuth onAddToCart={handleAddToCart}>
            <Button 
              className="w-full bg-construction-blue hover:bg-construction-darkBlue text-white"
            >
              <ShoppingCart className="mr-2 h-4 w-4" />
              Add to Cart
            </Button>
          </CartRequireAuth>
        )}
      </CardFooter>
    </Card>
  );
};

export default MaterialCard;
