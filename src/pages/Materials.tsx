
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Layout from '@/components/Layout';
import MaterialCard from '@/components/MaterialCard';
import { 
  getAllMaterials, 
  getCategories, 
  getMaterialsByCategory, 
  searchMaterials 
} from '@/services/materialService';
import { Material } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SlidersHorizontal } from 'lucide-react';

const Materials = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [materials, setMaterials] = useState<Material[]>([]);
  const [filteredMaterials, setFilteredMaterials] = useState<Material[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [sort, setSort] = useState<string>('name-asc');
  const [localSearch, setLocalSearch] = useState('');
  
  const categories = ['all', ...getCategories()];
  const searchQuery = searchParams.get('search') || '';
  const categoryQuery = searchParams.get('category') || '';
  
  useEffect(() => {
    // Get initial materials based on URL parameters
    let initialMaterials: Material[] = [];
    
    if (searchQuery) {
      initialMaterials = searchMaterials(searchQuery);
      setLocalSearch(searchQuery);
    } else if (categoryQuery && categoryQuery !== 'all') {
      initialMaterials = getMaterialsByCategory(categoryQuery);
      setActiveCategory(categoryQuery);
    } else {
      initialMaterials = getAllMaterials();
    }
    
    setMaterials(initialMaterials);
    setFilteredMaterials(initialMaterials);
  }, [searchQuery, categoryQuery]);
  
  // Handle category change
  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    
    let filtered: Material[];
    if (category === 'all') {
      filtered = getAllMaterials();
      searchParams.delete('category');
    } else {
      filtered = getMaterialsByCategory(category);
      searchParams.set('category', category);
    }
    
    // Maintain search if present
    if (localSearch) {
      filtered = filtered.filter(material => 
        material.name.toLowerCase().includes(localSearch.toLowerCase())
      );
    }
    
    setMaterials(filtered);
    setFilteredMaterials(sortMaterials(filtered, sort));
    setSearchParams(searchParams);
  };
  
  // Handle search input
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (localSearch) {
      const filtered = materials.filter(material => 
        material.name.toLowerCase().includes(localSearch.toLowerCase()) ||
        material.category.toLowerCase().includes(localSearch.toLowerCase())
      );
      setFilteredMaterials(sortMaterials(filtered, sort));
      
      searchParams.set('search', localSearch);
    } else {
      setFilteredMaterials(sortMaterials(materials, sort));
      searchParams.delete('search');
    }
    
    setSearchParams(searchParams);
  };
  
  // Handle sort change
  const handleSortChange = (value: string) => {
    setSort(value);
    setFilteredMaterials(sortMaterials([...filteredMaterials], value));
  };
  
  // Sort materials function
  const sortMaterials = (materials: Material[], sortOption: string): Material[] => {
    switch (sortOption) {
      case 'name-asc':
        return [...materials].sort((a, b) => a.name.localeCompare(b.name));
      case 'name-desc':
        return [...materials].sort((a, b) => b.name.localeCompare(a.name));
      case 'price-asc':
        return [...materials].sort((a, b) => a.price - b.price);
      case 'price-desc':
        return [...materials].sort((a, b) => b.price - a.price);
      default:
        return materials;
    }
  };
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Construction Materials</h1>
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar / Filters */}
          <div className="lg:w-1/4">
            <div className="sticky top-24 bg-white p-6 rounded-lg border">
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <SlidersHorizontal className="mr-2 h-5 w-5" />
                Filters
              </h2>
              
              <div className="mb-6">
                <h3 className="font-medium mb-2">Search</h3>
                <form onSubmit={handleSearch} className="flex gap-2">
                  <Input
                    type="search"
                    placeholder="Search materials..."
                    value={localSearch}
                    onChange={(e) => setLocalSearch(e.target.value)}
                    className="flex-1"
                  />
                  <Button type="submit">Search</Button>
                </form>
              </div>
              
              <div className="mb-6">
                <h3 className="font-medium mb-2">Sort By</h3>
                <Select value={sort} onValueChange={handleSortChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select sort option" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="name-asc">Name (A-Z)</SelectItem>
                      <SelectItem value="name-desc">Name (Z-A)</SelectItem>
                      <SelectItem value="price-asc">Price (Low to High)</SelectItem>
                      <SelectItem value="price-desc">Price (High to Low)</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <h3 className="font-medium mb-2">Categories</h3>
                <div className="space-y-2">
                  {categories.map(category => (
                    <div key={category} className="flex items-center">
                      <Button
                        variant={activeCategory === category ? "default" : "ghost"}
                        className={`w-full justify-start ${activeCategory === category ? 'bg-construction-blue text-white' : 'text-gray-700'}`}
                        onClick={() => handleCategoryChange(category)}
                      >
                        {category === 'all' ? 'All Categories' : category}
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          {/* Main Content */}
          <div className="lg:w-3/4">
            {/* Mobile Tabs for Categories (visible only on mobile) */}
            <div className="lg:hidden mb-6">
              <Tabs defaultValue={activeCategory}>
                <TabsList className="w-full overflow-x-auto flex-nowrap">
                  {categories.map(category => (
                    <TabsTrigger 
                      key={category} 
                      value={category}
                      onClick={() => handleCategoryChange(category)}
                      className="flex-shrink-0"
                    >
                      {category === 'all' ? 'All' : category}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>
            </div>
            
            {/* Results Count & Sort (Mobile) */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
              <p className="text-gray-600">
                Showing {filteredMaterials.length} {filteredMaterials.length === 1 ? 'material' : 'materials'}
              </p>
              
              <div className="lg:hidden w-full sm:w-auto">
                <Select value={sort} onValueChange={handleSortChange}>
                  <SelectTrigger className="w-full sm:w-44">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="name-asc">Name (A-Z)</SelectItem>
                      <SelectItem value="name-desc">Name (Z-A)</SelectItem>
                      <SelectItem value="price-asc">Price (Low to High)</SelectItem>
                      <SelectItem value="price-desc">Price (High to Low)</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            {/* Materials Grid */}
            {filteredMaterials.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredMaterials.map(material => (
                  <MaterialCard key={material.id} material={material} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <h3 className="text-xl font-semibold mb-2">No materials found</h3>
                <p className="text-gray-600 mb-6">Try adjusting your search or filters</p>
                <Button onClick={() => {
                  setSearchParams({});
                  setLocalSearch('');
                  setActiveCategory('all');
                  setMaterials(getAllMaterials());
                  setFilteredMaterials(getAllMaterials());
                }}>
                  Clear all filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Materials;
