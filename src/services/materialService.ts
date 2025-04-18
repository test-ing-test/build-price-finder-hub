import { Material } from '../context/CartContext';

// Company information - can be updated here
export const companyInfo = {
  name: "BuildPrice Pro",
  phone: "+1 (800) 555-9876",
  email: "info@buildpricepro.com"
};

// Mock data for materials
const materials: Material[] = [
  {
    id: '1',
    name: 'Portland Cement',
    category: 'Cement & Concrete',
    price: 12.99,
    unit: 'Bag (94 lb)',
    supplier: 'BuildWell Supplies',
    contact: '+1 (555) 123-4567',
    image: '/placeholder.svg'
  },
  {
    id: '2',
    name: 'Oak Hardwood Flooring',
    category: 'Flooring',
    price: 5.99,
    unit: 'sq ft',
    supplier: 'Flooring Masters',
    contact: '+1 (555) 234-5678',
    image: '/placeholder.svg'
  },
  {
    id: '3',
    name: 'Drywall Sheet',
    category: 'Drywall',
    price: 14.50,
    unit: 'Sheet (4×8 ft)',
    supplier: 'Drywall Direct',
    contact: '+1 (555) 345-6789',
    image: '/placeholder.svg'
  },
  {
    id: '4',
    name: 'Quartz Countertop',
    category: 'Countertops',
    price: 65.00,
    unit: 'sq ft',
    supplier: 'Stone Creations',
    contact: '+1 (555) 456-7890',
    image: '/placeholder.svg'
  },
  {
    id: '5',
    name: 'Copper Plumbing Pipe',
    category: 'Plumbing',
    price: 21.75,
    unit: '10 ft length',
    supplier: 'Plumbing Plus',
    contact: '+1 (555) 567-8901',
    image: '/placeholder.svg'
  },
  {
    id: '6',
    name: 'Fiberglass Insulation',
    category: 'Insulation',
    price: 19.95,
    unit: 'Roll (100 sq ft)',
    supplier: 'Insulation Experts',
    contact: '+1 (555) 678-9012',
    image: '/placeholder.svg'
  },
  {
    id: '7',
    name: 'Vinyl Siding',
    category: 'Exterior',
    price: 7.85,
    unit: 'sq ft',
    supplier: 'Exterior Solutions',
    contact: '+1 (555) 789-0123',
    image: '/placeholder.svg'
  },
  {
    id: '8',
    name: 'Structural Lumber 2×4',
    category: 'Lumber',
    price: 5.25,
    unit: '8 ft length',
    supplier: 'Timber Traders',
    contact: '+1 (555) 890-1234',
    image: '/placeholder.svg'
  },
  {
    id: '9',
    name: 'Ceramic Floor Tile',
    category: 'Flooring',
    price: 2.49,
    unit: 'sq ft',
    supplier: 'Tile Town',
    contact: '+1 (555) 901-2345',
    image: '/placeholder.svg'
  },
  {
    id: '10',
    name: 'Granite Countertop',
    category: 'Countertops',
    price: 45.00,
    unit: 'sq ft',
    supplier: 'Stone Creations',
    contact: '+1 (555) 456-7890',
    image: '/placeholder.svg'
  },
  {
    id: '11',
    name: 'PVC Plumbing Pipe',
    category: 'Plumbing',
    price: 8.99,
    unit: '10 ft length',
    supplier: 'Plumbing Plus',
    contact: '+1 (555) 567-8901',
    image: '/placeholder.svg'
  },
  {
    id: '12',
    name: 'Spray Foam Insulation',
    category: 'Insulation',
    price: 89.95,
    unit: 'Kit (covers 200 sq ft)',
    supplier: 'Insulation Experts',
    contact: '+1 (555) 678-9012',
    image: '/placeholder.svg'
  },
  {
    id: '13',
    name: 'Ceramic Wall Tile',
    category: 'Flooring',
    price: 3.25,
    unit: 'sq ft',
    supplier: 'Tile Town',
    contact: '+1 (555) 901-2345',
    image: '/placeholder.svg'
  },
  {
    id: '14',
    name: 'Laminate Countertop',
    category: 'Countertops',
    price: 25.00,
    unit: 'sq ft',
    supplier: 'Stone Creations',
    contact: '+1 (555) 456-7890',
    image: '/placeholder.svg'
  },
  {
    id: '15',
    name: 'Concrete Mix',
    category: 'Cement & Concrete',
    price: 6.75,
    unit: 'Bag (60 lb)',
    supplier: 'BuildWell Supplies',
    contact: '+1 (555) 123-4567',
    image: '/placeholder.svg'
  },
  {
    id: '16',
    name: 'Metal Roofing',
    category: 'Roofing',
    price: 4.50,
    unit: 'sq ft',
    supplier: 'Roofing Solutions',
    contact: '+1 (555) 987-6543',
    image: '/placeholder.svg'
  },
  {
    id: '17',
    name: 'Asphalt Shingles',
    category: 'Roofing',
    price: 32.99,
    unit: 'Bundle (33.3 sq ft)',
    supplier: 'Roofing Solutions',
    contact: '+1 (555) 987-6543',
    image: '/placeholder.svg'
  },
  {
    id: '18',
    name: 'LED Recessed Lighting',
    category: 'Electrical',
    price: 18.49,
    unit: 'Each',
    supplier: 'Electric Depot',
    contact: '+1 (555) 444-3333',
    image: '/placeholder.svg'
  },
  {
    id: '19',
    name: 'Circuit Breaker',
    category: 'Electrical',
    price: 8.99,
    unit: 'Each',
    supplier: 'Electric Depot',
    contact: '+1 (555) 444-3333',
    image: '/placeholder.svg'
  },
  {
    id: '20',
    name: 'Bathroom Vanity',
    category: 'Bathroom',
    price: 249.99,
    unit: 'Each',
    supplier: 'Fixture World',
    contact: '+1 (555) 222-1111',
    image: '/placeholder.svg'
  }
];

// Get all materials
export const getAllMaterials = (): Material[] => {
  return materials;
};

// Get material by ID
export const getMaterialById = (id: string): Material | undefined => {
  return materials.find(material => material.id === id);
};

// Get materials by category
export const getMaterialsByCategory = (category: string): Material[] => {
  return materials.filter(material => material.category === category);
};

// Get all unique categories
export const getCategories = (): string[] => {
  return Array.from(new Set(materials.map(material => material.category)));
};

// Search materials by name
export const searchMaterials = (query: string): Material[] => {
  const lowercaseQuery = query.toLowerCase();
  return materials.filter(material => 
    material.name.toLowerCase().includes(lowercaseQuery) ||
    material.category.toLowerCase().includes(lowercaseQuery)
  );
};
