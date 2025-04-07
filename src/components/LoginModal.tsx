
import React, { useState } from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogDescription,
  DialogTrigger,
  DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Facebook, Twitter, Mail, Loader2 } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

interface LoginModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onOpenChange }) => {
  const { login, signup, isLoading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [activeTab, setActiveTab] = useState<'login' | 'signup'>('login');

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    await login('email', { email, password });
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    await signup({ email, password, name });
  };

  const handleSocialLogin = async (provider: 'google' | 'facebook' | 'twitter') => {
    await login(provider);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-white">
        <DialogHeader>
          <DialogTitle className="text-2xl">
            {activeTab === 'login' ? 'Login to BuildPrice' : 'Sign up for BuildPrice'}
          </DialogTitle>
          <DialogDescription>
            {activeTab === 'login' 
              ? 'Sign in to add products to your cart and create estimates' 
              : 'Create an account to save your estimates and track prices'}
          </DialogDescription>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as 'login' | 'signup')} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>
          
          <TabsContent value="login">
            <form onSubmit={handleEmailLogin} className="space-y-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email" 
                  placeholder="youremail@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={isLoading}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={isLoading}
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-construction-blue hover:bg-construction-darkBlue"
                disabled={isLoading}
              >
                {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Mail className="mr-2 h-4 w-4" />}
                Sign in with Email
              </Button>
            </form>
          </TabsContent>
          
          <TabsContent value="signup">
            <form onSubmit={handleSignup} className="space-y-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="signup-name">Name</Label>
                <Input
                  id="signup-name"
                  type="text" 
                  placeholder="Your Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  disabled={isLoading}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="signup-email">Email</Label>
                <Input
                  id="signup-email"
                  type="email" 
                  placeholder="youremail@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={isLoading}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="signup-password">Password</Label>
                <Input
                  id="signup-password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={isLoading}
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-construction-blue hover:bg-construction-darkBlue"
                disabled={isLoading}
              >
                {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                Create Account
              </Button>
            </form>
          </TabsContent>
        </Tabs>

        <div className="relative my-4">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              Or continue with
            </span>
          </div>
        </div>
        
        <div className="grid grid-cols-3 gap-2">
          <Button
            variant="outline"
            onClick={() => handleSocialLogin('google')}
            disabled={isLoading}
            className="text-red-500 border-red-200 hover:bg-red-50"
          >
            <svg className="mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20.283 10.356h-8.327v3.451h4.792c-.446 2.193-2.313 3.453-4.792 3.453a5.27 5.27 0 0 1-5.279-5.28 5.27 5.27 0 0 1 5.279-5.279c1.259 0 2.397.447 3.29 1.178l2.6-2.599c-1.584-1.381-3.615-2.233-5.89-2.233a8.908 8.908 0 0 0-8.934 8.934 8.907 8.907 0 0 0 8.934 8.934c4.467 0 8.529-3.249 8.529-8.934 0-.528-.081-1.097-.202-1.625z"></path>
            </svg>
            Google
          </Button>
          <Button
            variant="outline"
            onClick={() => handleSocialLogin('facebook')}
            disabled={isLoading}
            className="text-blue-600 border-blue-200 hover:bg-blue-50"
          >
            <Facebook className="mr-2 h-4 w-4" />
            Facebook
          </Button>
          <Button
            variant="outline"
            onClick={() => handleSocialLogin('twitter')}
            disabled={isLoading}
            className="text-blue-400 border-blue-200 hover:bg-blue-50"
          >
            <Twitter className="mr-2 h-4 w-4" />
            Twitter
          </Button>
        </div>

        <DialogFooter className="mt-4 text-xs text-gray-500">
          By continuing, you agree to BuildPrice's Terms of Service and Privacy Policy.
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default LoginModal;
