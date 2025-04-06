
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Plus, Minus } from 'lucide-react';
import { useCart, Material } from '@/context/CartContext';

interface MaterialCardProps {
  material: Material;
}

const MaterialCard: React.FC<MaterialCardProps> = ({ material }) => {
  const { addToCart, items, updateQuantity } = useCart();
  
  const cartItem = items.find(item => item.material.id === material.id);
  const quantity = cartItem ? cartItem.quantity : 0;

  return (
    <Card className="overflow-hidden transition-shadow duration-300 hover:shadow-md h-full flex flex-col">
      <Link to={`/material/${material.id}`} className="flex-grow">
        <div className="aspect-square w-full overflow-hidden bg-gray-100">
          <img 
            src={material.image} 
            alt={material.name} 
            className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>
        <CardContent className="p-4">
          <h3 className="font-semibold text-lg truncate">{material.name}</h3>
          <p className="text-sm text-gray-500 mb-2">{material.category}</p>
          <div className="flex justify-between items-center">
            <div>
              <span className="text-lg font-bold text-construction-blue">
                ${material.price.toFixed(2)}
              </span>
              <span className="text-sm text-gray-500 ml-1">/ {material.unit}</span>
            </div>
          </div>
        </CardContent>
      </Link>
      <CardFooter className="p-4 pt-0">
        {quantity === 0 ? (
          <Button 
            className="w-full bg-construction-blue hover:bg-construction-darkBlue"
            onClick={() => addToCart(material, 1)}
          >
            <ShoppingCart className="mr-2 h-4 w-4" />
            Add to Cart
          </Button>
        ) : (
          <div className="flex w-full items-center justify-between">
            <Button 
              size="icon" 
              variant="outline"
              onClick={() => updateQuantity(material.id, quantity - 1)}
            >
              <Minus className="h-4 w-4" />
            </Button>
            <span className="font-medium">{quantity}</span>
            <Button 
              size="icon" 
              variant="outline"
              onClick={() => updateQuantity(material.id, quantity + 1)}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        )}
      </CardFooter>
    </Card>
  );
};

export default MaterialCard;
