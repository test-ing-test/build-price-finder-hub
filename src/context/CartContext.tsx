
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { toast } from "sonner";

export interface Material {
  id: string;
  name: string;
  category: string;
  price: number;
  unit: string;
  supplier: string;
  contact: string;
  image: string;
}

export interface CartItem {
  material: Material;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (material: Material, quantity: number) => void;
  removeFromCart: (materialId: string) => void;
  updateQuantity: (materialId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);

  const addToCart = (material: Material, quantity: number) => {
    setItems(prevItems => {
      const existingItemIndex = prevItems.findIndex(item => item.material.id === material.id);
      
      if (existingItemIndex >= 0) {
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex].quantity += quantity;
        toast.success(`Updated ${material.name} quantity in cart`);
        return updatedItems;
      } else {
        toast.success(`Added ${material.name} to cart`);
        return [...prevItems, { material, quantity }];
      }
    });
  };

  const removeFromCart = (materialId: string) => {
    setItems(prevItems => {
      const materialToRemove = prevItems.find(item => item.material.id === materialId);
      if (materialToRemove) {
        toast.info(`Removed ${materialToRemove.material.name} from cart`);
      }
      return prevItems.filter(item => item.material.id !== materialId);
    });
  };

  const updateQuantity = (materialId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(materialId);
      return;
    }
    
    setItems(prevItems => 
      prevItems.map(item => 
        item.material.id === materialId 
          ? { ...item, quantity } 
          : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
    toast.info("Cart cleared");
  };

  const totalItems = items.reduce((total, item) => total + item.quantity, 0);
  
  const totalPrice = items.reduce(
    (total, item) => total + item.material.price * item.quantity, 
    0
  );

  return (
    <CartContext.Provider 
      value={{ 
        items, 
        addToCart, 
        removeFromCart, 
        updateQuantity, 
        clearCart,
        totalItems,
        totalPrice
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
