import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Layout from '@/components/Layout';
import MaterialCard from '@/components/MaterialCard';
import ProductComparison from '@/components/ProductComparison';
import { ApiKeyModal } from '@/components/ApiKeyModal';
import { 
  getAllMaterials, 
  getCategories, 
  getMaterialsByCategory, 
  searchMaterials,
  companyInfo
} from '@/services/materialService';
import { searchOnline, compareProducts } from '@/services/searchService';
import { Material } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
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
import { SlidersHorizontal, Globe, BarChart2, Key } from 'lucide-react';
import { toast } from "sonner";
import { FirecrawlService } from '@/utils/FirecrawlService';

const Materials = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [materials, setMaterials] = useState<Material[]>([]);
  const [filteredMaterials, setFilteredMaterials] = useState<Material[]>([]);
  const [onlineResults, setOnlineResults] = useState<Material[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [sort, setSort] = useState<string>('name-asc');
  const [localSearch, setLocalSearch] = useState('');
  const [isSearchingOnline, setIsSearchingOnline] = useState(false);
  const [showComparison, setShowComparison] = useState(false);
  const [hasApiKey, setHasApiKey] = useState(false);
  
  const categories = ['all', ...getCategories()];
  const searchQuery = searchParams.get('search') || '';
  const categoryQuery = searchParams.get('category') || '';
  
  useEffect(() => {
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
  
  useEffect(() => {
    const apiKey = FirecrawlService.getApiKey();
    setHasApiKey(!!apiKey);
  }, []);
  
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
    
    if (localSearch) {
      filtered = filtered.filter(material => 
        material.name.toLowerCase().includes(localSearch.toLowerCase())
      );
    }
    
    setMaterials(filtered);
    setFilteredMaterials(sortMaterials(filtered, sort));
    setSearchParams(searchParams);
  };
  
  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (localSearch) {
      const filtered = materials.filter(material => 
        material.name.toLowerCase().includes(localSearch.toLowerCase()) ||
        material.category.toLowerCase().includes(localSearch.toLowerCase())
      );
      setFilteredMaterials(sortMaterials(filtered, sort));
      
      searchParams.set('search', localSearch);
      
      if (isSearchingOnline) {
        try {
          toast.info("Searching online for products...");
          
          const apiKey = FirecrawlService.getApiKey();
          if (!apiKey && !hasApiKey) {
            toast.error("API key required for real-time data. Using estimated prices.");
          }
          
          const onlineSearchResults = await searchOnline(localSearch);
          setOnlineResults(onlineSearchResults);
          
          if (onlineSearchResults.length > 0) {
            toast.success(`Found ${onlineSearchResults.length} products online`);
            const combinedResults = compareProducts(filtered, onlineSearchResults);
            setFilteredMaterials(sortMaterials(combinedResults, sort));
          } else {
            toast.info("No additional products found online");
          }
        } catch (error) {
          console.error("Error searching online:", error);
          toast.error("Error searching online");
        }
      }
    } else {
      setFilteredMaterials(sortMaterials(materials, sort));
      searchParams.delete('search');
    }
    
    setSearchParams(searchParams);
  };
  
  const handleSortChange = (value: string) => {
    setSort(value);
    setFilteredMaterials(sortMaterials([...filteredMaterials], value));
  };
  
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
        <h1 className="text-3xl font-bold mb-8">{companyInfo.name} - Construction Materials</h1>
        
        <div className="flex flex-col lg:flex-row gap-8">
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
                
                <div className="flex items-center space-x-2 mt-4">
                  <Switch 
                    id="search-online" 
                    checked={isSearchingOnline}
                    onCheckedChange={setIsSearchingOnline}
                  />
                  <label htmlFor="search-online" className="flex items-center cursor-pointer">
                    <Globe className="h-4 w-4 mr-1" />
                    Search online
                  </label>
                </div>
                
                {isSearchingOnline && (
                  <div className="flex items-center justify-between mt-2 text-sm text-gray-500">
                    <span className="flex items-center">
                      <Key className="h-3 w-3 mr-1" />
                      {hasApiKey ? "API key set" : "No API key (mock data)"}
                    </span>
                    <ApiKeyModal />
                  </div>
                )}
                
                {onlineResults.length > 0 && (
                  <div className="flex items-center space-x-2 mt-4">
                    <Switch 
                      id="show-comparison" 
                      checked={showComparison}
                      onCheckedChange={setShowComparison}
                    />
                    <label htmlFor="show-comparison" className="flex items-center cursor-pointer">
                      <BarChart2 className="h-4 w-4 mr-1" />
                      Show comparison
                    </label>
                  </div>
                )}
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
          
          <div className="lg:w-3/4">
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
            
            {showComparison && onlineResults.length > 0 && (
              <ProductComparison products={filteredMaterials} />
            )}
            
            {filteredMaterials.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
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
