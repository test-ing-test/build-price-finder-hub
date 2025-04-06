
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import { ExternalLink } from 'lucide-react';
import { Material } from '@/context/CartContext';

interface ProductComparisonProps {
  products: Material[];
}

const ProductComparison: React.FC<ProductComparisonProps> = ({ products }) => {
  if (!products || products.length === 0) {
    return null;
  }

  // Get external URL for online product
  const getExternalUrl = (material: Material) => {
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

  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle>Price Comparison</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Product</TableHead>
              <TableHead>Supplier</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Unit</TableHead>
              <TableHead>Source</TableHead>
              <TableHead>Link</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id}>
                <TableCell className="font-medium">{product.name}</TableCell>
                <TableCell>{product.supplier}</TableCell>
                <TableCell>
                  {product.isOnline ? '₹' : '$'}{product.price.toFixed(2)}
                </TableCell>
                <TableCell>{product.unit}</TableCell>
                <TableCell>{product.isOnline ? 'Online' : 'Local'}</TableCell>
                <TableCell>
                  {product.isOnline && (
                    <a 
                      href={getExternalUrl(product)} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-blue-500 hover:text-blue-700"
                    >
                      Visit <ExternalLink className="h-3 w-3 ml-1" />
                    </a>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default ProductComparison;
