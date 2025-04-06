
import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ShoppingCart,
  Trash2,
  Plus,
  Minus,
  FileText,
  ArrowRight,
  Calculator,
  Building,
  Phone
} from 'lucide-react';
import { toast } from "sonner";

const Cart = () => {
  const { items, removeFromCart, updateQuantity, clearCart, totalPrice } = useCart();

  const handlePrint = () => {
    window.print();
    toast.success("Estimate prepared for printing");
  };

  const handleQuantityChange = (materialId: string, value: string) => {
    const quantity = parseInt(value);
    if (!isNaN(quantity) && quantity > 0) {
      updateQuantity(materialId, quantity);
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-2">Project Estimate</h1>
        <p className="text-construction-gray mb-8">
          Review your materials and get a cost estimate for your project
        </p>

        {items.length === 0 ? (
          <div className="text-center py-16">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gray-100 mb-6">
              <ShoppingCart className="h-10 w-10 text-construction-gray" />
            </div>
            <h2 className="text-2xl font-semibold mb-4">Your estimate is empty</h2>
            <p className="text-construction-gray max-w-md mx-auto mb-6">
              Start adding construction materials to create a cost estimate for your project.
            </p>
            <Button asChild className="bg-construction-blue hover:bg-construction-darkBlue">
              <Link to="/materials">Browse Materials</Link>
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items Table */}
            <div className="lg:col-span-2">
              <Card className="overflow-hidden">
                <CardHeader className="bg-gray-50 px-6">
                  <CardTitle className="flex items-center text-xl">
                    <FileText className="mr-2 h-5 w-5" />
                    Materials List
                  </CardTitle>
                </CardHeader>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[300px]">Material</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead>Quantity</TableHead>
                        <TableHead>Total</TableHead>
                        <TableHead className="w-[50px]"></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {items.map(item => (
                        <TableRow key={item.material.id}>
                          <TableCell className="font-medium">
                            <Link 
                              to={`/material/${item.material.id}`}
                              className="hover:text-construction-blue hover:underline"
                            >
                              {item.material.name}
                            </Link>
                            <div className="text-sm text-gray-500">{item.material.category}</div>
                          </TableCell>
                          <TableCell>
                            ${item.material.price.toFixed(2)} / {item.material.unit}
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-2 w-28">
                              <Button 
                                variant="outline" 
                                size="icon"
                                className="h-8 w-8"
                                onClick={() => updateQuantity(item.material.id, Math.max(1, item.quantity - 1))}
                              >
                                <Minus className="h-3 w-3" />
                              </Button>
                              
                              <Input
                                type="number"
                                min="1"
                                value={item.quantity}
                                onChange={(e) => handleQuantityChange(item.material.id, e.target.value)}
                                className="h-8 text-center px-2"
                              />
                              
                              <Button 
                                variant="outline" 
                                size="icon"
                                className="h-8 w-8"
                                onClick={() => updateQuantity(item.material.id, item.quantity + 1)}
                              >
                                <Plus className="h-3 w-3" />
                              </Button>
                            </div>
                          </TableCell>
                          <TableCell className="font-medium">
                            ${(item.material.price * item.quantity).toFixed(2)}
                          </TableCell>
                          <TableCell>
                            <Button 
                              variant="ghost" 
                              size="icon"
                              onClick={() => removeFromCart(item.material.id)}
                              className="h-8 w-8 text-red-500 hover:text-red-700 hover:bg-red-50"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
                <CardFooter className="justify-between border-t p-6">
                  <Button 
                    variant="outline" 
                    onClick={clearCart}
                    className="text-red-500 border-red-200 hover:bg-red-50 hover:text-red-600"
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Clear All
                  </Button>
                  <Button asChild>
                    <Link to="/materials">
                      <Plus className="mr-2 h-4 w-4" />
                      Add More Materials
                    </Link>
                  </Button>
                </CardFooter>
              </Card>

              {/* Supplier Information */}
              <Card className="mt-8">
                <CardHeader className="bg-gray-50 px-6">
                  <CardTitle className="flex items-center text-xl">
                    <Building className="mr-2 h-5 w-5" />
                    Supplier Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {items.map(item => (
                      <div key={`supplier-${item.material.id}`} className="flex items-start border-b pb-4 last:border-0 last:pb-0">
                        <div className="flex-1">
                          <p className="font-medium">{item.material.supplier}</p>
                          <div className="flex items-center text-construction-gray">
                            <Phone className="h-4 w-4 mr-2" />
                            {item.material.contact}
                          </div>
                        </div>
                        <div>
                          <p className="font-medium">Materials:</p>
                          <p className="text-construction-gray">{item.material.name}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <Card className="sticky top-24">
                <CardHeader className="bg-gray-50 px-6">
                  <CardTitle className="flex items-center text-xl">
                    <Calculator className="mr-2 h-5 w-5" />
                    Estimate Summary
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-construction-gray">Materials ({items.length})</span>
                      <span>${totalPrice.toFixed(2)}</span>
                    </div>
                    
                    <div className="border-t pt-4 flex justify-between font-bold text-lg">
                      <span>Total Estimate</span>
                      <span className="text-construction-blue">${totalPrice.toFixed(2)}</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col gap-4 border-t p-6">
                  <Button 
                    className="w-full bg-construction-blue hover:bg-construction-darkBlue"
                    onClick={handlePrint}
                  >
                    <FileText className="mr-2 h-4 w-4" />
                    Download Estimate
                  </Button>
                  
                  <p className="text-sm text-center text-construction-gray">
                    This is an estimate only. Contact suppliers directly for final pricing and ordering.
                  </p>
                </CardFooter>
              </Card>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Cart;
