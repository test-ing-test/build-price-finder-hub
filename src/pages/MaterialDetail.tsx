
import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import { getMaterialById } from '@/services/materialService';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
} from '@/components/ui/card';
import {
  ShoppingCart,
  Phone,
  Building,
  ArrowLeft,
  Plus,
  Minus,
  Check
} from 'lucide-react';
import { Input } from '@/components/ui/input';

const MaterialDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const material = id ? getMaterialById(id) : undefined;
  const { addToCart, items, updateQuantity } = useCart();
  const [quantity, setQuantity] = useState(1);
  
  const cartItem = material ? items.find(item => item.material.id === material.id) : undefined;
  const inCart = Boolean(cartItem);
  
  if (!material) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-3xl font-bold mb-4">Material Not Found</h1>
          <p className="mb-8">The material you're looking for doesn't exist or has been removed.</p>
          <Button asChild>
            <Link to="/materials">Back to Materials</Link>
          </Button>
        </div>
      </Layout>
    );
  }

  const handleAddToCart = () => {
    if (material) {
      addToCart(material, quantity);
    }
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value > 0) {
      setQuantity(value);
    }
  };

  const increaseQuantity = () => {
    setQuantity(prev => prev + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center mb-6 text-sm">
          <Link to="/materials" className="flex items-center text-construction-gray hover:text-construction-blue">
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to Materials
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Material Image */}
          <div className="bg-white p-4 rounded-lg border">
            <div className="aspect-square w-full overflow-hidden bg-gray-100 rounded-md">
              <img 
                src={material.image} 
                alt={material.name} 
                className="h-full w-full object-cover"
              />
            </div>
          </div>
          
          {/* Material Details */}
          <div>
            <h1 className="text-3xl font-bold mb-2">{material.name}</h1>
            <p className="text-construction-gray mb-4">{material.category}</p>
            
            <div className="flex items-baseline mb-6">
              <span className="text-3xl font-bold text-construction-blue">
                ${material.price.toFixed(2)}
              </span>
              <span className="text-construction-gray ml-2">/ {material.unit}</span>
            </div>
            
            {/* Add to Cart Section */}
            <Card className="mb-6">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">Add to Estimate</h3>
                
                <div className="flex items-center mb-4">
                  <Button 
                    variant="outline" 
                    size="icon"
                    onClick={decreaseQuantity}
                    disabled={quantity <= 1}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  
                  <Input 
                    type="number" 
                    value={quantity}
                    onChange={handleQuantityChange}
                    min="1"
                    className="mx-2 w-20 text-center"
                  />
                  
                  <Button 
                    variant="outline" 
                    size="icon"
                    onClick={increaseQuantity}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                
                {inCart ? (
                  <div className="flex space-x-4">
                    <Button 
                      className="bg-green-600 hover:bg-green-700 flex-1"
                      onClick={() => navigate('/cart')}
                    >
                      <Check className="mr-2 h-4 w-4" />
                      View in Cart
                    </Button>
                    <Button 
                      variant="outline"
                      onClick={() => updateQuantity(material.id, cartItem!.quantity + quantity)}
                      className="flex-1"
                    >
                      <Plus className="mr-2 h-4 w-4" />
                      Add More
                    </Button>
                  </div>
                ) : (
                  <Button 
                    className="w-full bg-construction-blue hover:bg-construction-darkBlue"
                    onClick={handleAddToCart}
                  >
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    Add to Cart
                  </Button>
                )}
              </CardContent>
            </Card>
            
            {/* Supplier Info */}
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">Supplier Information</h3>
                
                <div className="space-y-4">
                  <div className="flex items-start">
                    <Building className="h-5 w-5 text-construction-gray mr-2 mt-0.5" />
                    <div>
                      <p className="font-medium">Supplier</p>
                      <p className="text-construction-gray">{material.supplier}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Phone className="h-5 w-5 text-construction-gray mr-2 mt-0.5" />
                    <div>
                      <p className="font-medium">Contact</p>
                      <p className="text-construction-gray">{material.contact}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default MaterialDetail;
