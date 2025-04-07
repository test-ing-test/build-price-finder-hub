
import React, { useState } from 'react';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { User, LogOut, Settings } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import LoginModal from './LoginModal';

const UserProfile: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  if (!isAuthenticated) {
    return (
      <>
        <Button 
          variant="default" 
          className="bg-construction-blue hover:bg-construction-darkBlue text-white"
          onClick={() => setIsLoginModalOpen(true)}
        >
          Login
        </Button>
        <LoginModal isOpen={isLoginModalOpen} onOpenChange={setIsLoginModalOpen} />
      </>
    );
  }

  // Get initials for avatar fallback
  const getInitials = () => {
    if (!user?.name) return 'U';
    return user.name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-10 w-10 rounded-full">
            <Avatar className="h-10 w-10 border-2 border-construction-blue/20">
              {user?.avatar ? (
                <AvatarImage src={user.avatar} alt={user?.name || 'User'} />
              ) : (
                <AvatarFallback className="bg-construction-blue text-white">
                  {getInitials()}
                </AvatarFallback>
              )}
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56 bg-white" align="end" forceMount>
          <DropdownMenuLabel>
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">{user?.name}</p>
              <p className="text-xs leading-none text-muted-foreground">
                {user?.email}
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <User className="mr-2 h-4 w-4" />
            <span>Profile</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Settings className="mr-2 h-4 w-4" />
            <span>Settings</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => logout()}>
            <LogOut className="mr-2 h-4 w-4" />
            <span>Log out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default UserProfile;
