
import { Material } from '../context/CartContext';
import { getAllMaterials } from './materialService';

// Mock function to simulate online search
// In a real application, this would connect to an external API
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
      price: 15.99,
      unit: 'Bag (94 lb)',
      supplier: 'Online Supplier A',
      contact: '+1 (555) 111-2222',
      image: '/placeholder.svg'
    },
    {
      id: 'online-2',
      name: `${query} Hardwood Flooring`,
      category: 'Flooring',
      price: 8.50,
      unit: 'sq ft',
      supplier: 'Online Supplier B',
      contact: '+1 (555) 222-3333',
      image: '/placeholder.svg'
    },
    {
      id: 'online-3',
      name: `${query} Insulation`,
      category: 'Insulation',
      price: 22.75,
      unit: 'Roll (100 sq ft)',
      supplier: 'Online Supplier C',
      contact: '+1 (555) 333-4444',
      image: '/placeholder.svg'
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
