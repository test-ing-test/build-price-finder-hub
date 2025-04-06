
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import { Material } from '@/context/CartContext';

interface ProductComparisonProps {
  products: Material[];
}

const ProductComparison: React.FC<ProductComparisonProps> = ({ products }) => {
  if (!products || products.length === 0) {
    return null;
  }

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
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default ProductComparison;
