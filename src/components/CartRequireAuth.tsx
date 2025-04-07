
import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import LoginModal from './LoginModal';
import { toast } from 'sonner';

interface CartRequireAuthProps {
  children: React.ReactNode;
  onAddToCart: () => void;
}

const CartRequireAuth: React.FC<CartRequireAuthProps> = ({ children, onAddToCart }) => {
  const { isAuthenticated } = useAuth();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const handleAddToCart = () => {
    if (isAuthenticated) {
      onAddToCart();
    } else {
      toast.error("Please login to add items to cart", {
        description: "You need to login before adding items to your cart"
      });
      setIsLoginModalOpen(true);
    }
  };

  return (
    <>
      {React.Children.map(children, child => {
        if (React.isValidElement(child) && typeof child.type !== 'string') {
          return React.cloneElement(child as React.ReactElement<any>, {
            onClick: handleAddToCart,
          });
        }
        return child;
      })}
      <LoginModal isOpen={isLoginModalOpen} onOpenChange={setIsLoginModalOpen} />
    </>
  );
};

export default CartRequireAuth;
