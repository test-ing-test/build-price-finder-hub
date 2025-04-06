
import { Material } from '../context/CartContext';
import { getAllMaterials } from './materialService';

// Function to search for construction materials online
export const searchOnline = async (query: string): Promise<Material[]> => {
  console.log('Searching online for:', query);
  
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Mock online results - in real implementation this would be an actual API call
  const mockOnlineResults: Material[] = [
    {
      id: 'online-1',
      name: `${query} Premium Cement`,
      category: 'Cement & Concrete',
      price: 425.50, // Price in rupees
      unit: 'Bag (50 kg)',
      supplier: 'Online Supplier A',
      contact: '+91 8800123456',
      image: '/placeholder.svg',
      isOnline: true
    },
    {
      id: 'online-2',
      name: `${query} Hardwood Flooring`,
      category: 'Flooring',
      price: 2150.75, // Price in rupees
      unit: 'sq ft',
      supplier: 'Online Supplier B',
      contact: '+91 9988776655',
      image: '/placeholder.svg',
      isOnline: true
    },
    {
      id: 'online-3',
      name: `${query} Insulation`,
      category: 'Insulation',
      price: 1899.99, // Price in rupees
      unit: 'Roll (100 sq ft)',
      supplier: 'Online Supplier C',
      contact: '+91 7712345678',
      image: '/placeholder.svg',
      isOnline: true
    }
  ];
  
  return mockOnlineResults;
};

// Function to compare prices between local and online products
export const compareProducts = (localProducts: Material[], onlineProducts: Material[]): Material[] => {
  const combinedProducts = [...localProducts];
  
  // Add online products that don't exist in local database
  onlineProducts.forEach(onlineProduct => {
    const existsLocally = localProducts.some(
      localProduct => localProduct.name.toLowerCase() === onlineProduct.name.toLowerCase()
    );
    
    if (!existsLocally) {
      combinedProducts.push({
        ...onlineProduct,
        id: `online-${onlineProduct.id}`,
        isOnline: true
      });
    }
  });
  
  return combinedProducts;
};
