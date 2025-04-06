
import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { FirecrawlService } from '@/utils/FirecrawlService';
import { toast } from "sonner";

export const ApiKeyModal = () => {
  const [apiKey, setApiKey] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [isTesting, setIsTesting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsTesting(true);

    try {
      const isValid = await FirecrawlService.testApiKey(apiKey);
      if (isValid) {
        FirecrawlService.saveApiKey(apiKey);
        toast.success("API key saved successfully");
        setIsOpen(false);
      } else {
        toast.error("Invalid API key");
      }
    } catch (error) {
      console.error('Error testing API key:', error);
      toast.error("Failed to validate API key");
    } finally {
      setIsTesting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Set API Key</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Set Firecrawl API Key</DialogTitle>
          <DialogDescription>
            Enter your Firecrawl API key to enable web scraping functionality.
            You can get a key from the Firecrawl website.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="apiKey" className="text-right">
                API Key
              </Label>
              <Input
                id="apiKey"
                type="password"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                className="col-span-3"
                required
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" disabled={isTesting}>
              {isTesting ? "Testing..." : "Save"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
