
import { Material } from '../context/CartContext';
import { getAllMaterials } from './materialService';
import { FirecrawlService } from '../utils/FirecrawlService';
import { toast } from "sonner";

// Function to search for construction materials online
export const searchOnline = async (query: string): Promise<Material[]> => {
  console.log('Searching online for:', query);
  
  const apiKey = FirecrawlService.getApiKey();
  if (!apiKey) {
    console.log('No API key found, returning mock data');
    return getMockOnlineResults(query);
  }
  
  try {
    // Search major Indian construction material suppliers
    const searchUrls = [
      `https://www.amazon.in/s?k=${encodeURIComponent(query)}+construction+material`,
      `https://www.flipkart.com/search?q=${encodeURIComponent(query)}+construction+material`,
      `https://www.industrybuying.com/search/?q=${encodeURIComponent(query)}`
    ];
    
    const crawlUrl = searchUrls[0]; // Start with Amazon for testing
    
    console.log('Crawling:', crawlUrl);
    const crawlResult = await FirecrawlService.crawlWebsite(crawlUrl);
    
    if (crawlResult.success && crawlResult.data) {
      console.log('Crawl successful, processing results');
      // Process the scraped data and extract product information
      const scrapedProducts = processScrapedData(crawlResult.data, query);
      
      if (scrapedProducts.length > 0) {
        console.log('Processed scraped products:', scrapedProducts);
        return scrapedProducts;
      } else {
        console.log('No products found in scraped data, returning mock data');
        return getMockOnlineResults(query);
      }
    } else {
      console.log('Crawl failed, returning mock data');
      toast.error("Couldn't retrieve real-time data, showing estimated prices");
      return getMockOnlineResults(query);
    }
  } catch (error) {
    console.error('Error during online search:', error);
    toast.error("Error fetching online prices, showing estimated data");
    return getMockOnlineResults(query);
  }
};

// Process scraped data to extract product information
const processScrapedData = (data: any, query: string): Material[] => {
  try {
    const crawlData = data.data || [];
    console.log('Raw scraped data:', crawlData);
    
    // This is a simplified parser for demonstration
    // A real implementation would have more sophisticated extraction logic
    const products: Material[] = [];
    
    // Try to extract product information from the crawled data
    // This is highly dependent on the structure of the crawled pages
    crawlData.forEach((page: any, index: number) => {
      const content = page.content || {};
      const html = content.html || '';
      
      // Very naive extraction for demo purposes
      // In a real app, you'd use DOM parsing or more sophisticated extraction
      const productMatches = html.match(/<div[^>]*data-component-type="s-search-result"[^>]*>(.*?)<\/div>/gs);
      
      if (productMatches && productMatches.length > 0) {
        console.log(`Found ${productMatches.length} potential products on page ${index + 1}`);
        
        productMatches.slice(0, 3).forEach((productHtml: string, prodIndex: number) => {
          // Extract product name
          const nameMatch = productHtml.match(/<h2[^>]*>(.*?)<\/h2>/s);
          const name = nameMatch ? extractTextFromHtml(nameMatch[1]) : `${query} Product ${prodIndex + 1}`;
          
          // Extract price
          const priceMatch = productHtml.match(/₹([\d,]+\.\d{2}|[\d,]+)/);
          const price = priceMatch ? 
            parseFloat(priceMatch[1].replace(/,/g, '')) : 
            (Math.random() * 5000 + 500).toFixed(2);
          
          // Determine supplier based on URL
          let supplier = 'Online Supplier';
          if (page.url.includes('amazon')) {
            supplier = 'Amazon India';
          } else if (page.url.includes('flipkart')) {
            supplier = 'Flipkart';
          } else if (page.url.includes('industrybuying')) {
            supplier = 'Industry Buying';
          }
          
          products.push({
            id: `scraped-${index}-${prodIndex}`,
            name: name,
            category: determineCategoryFromName(name),
            price: typeof price === 'string' ? parseFloat(price) : price,
            unit: determineUnit(name),
            supplier: supplier,
            contact: '+91 8800123456', // Placeholder
            image: '/placeholder.svg', // Placeholder image
            isOnline: true,
          });
        });
      }
    });
    
    console.log('Extracted products:', products);
    return products.length > 0 ? products : [];
  } catch (error) {
    console.error('Error processing scraped data:', error);
    return [];
  }
};

// Helper to extract text from HTML
const extractTextFromHtml = (html: string): string => {
  return html.replace(/<[^>]*>/g, '').trim();
};

// Determine category based on product name
const determineCategoryFromName = (name: string): string => {
  const lowerName = name.toLowerCase();
  if (lowerName.includes('cement') || lowerName.includes('concrete')) {
    return 'Cement & Concrete';
  } else if (lowerName.includes('wood') || lowerName.includes('timber') || lowerName.includes('plywood')) {
    return 'Wood & Timber';
  } else if (lowerName.includes('paint') || lowerName.includes('primer')) {
    return 'Paint & Primers';
  } else if (lowerName.includes('brick') || lowerName.includes('block')) {
    return 'Bricks & Blocks';
  } else if (lowerName.includes('steel') || lowerName.includes('metal')) {
    return 'Steel & Metals';
  } else if (lowerName.includes('tile') || lowerName.includes('flooring')) {
    return 'Flooring';
  } else if (lowerName.includes('insulation')) {
    return 'Insulation';
  } else {
    return 'Other Materials';
  }
};

// Determine unit based on product name
const determineUnit = (name: string): string => {
  const lowerName = name.toLowerCase();
  if (lowerName.includes('cement') || lowerName.includes('concrete')) {
    return 'Bag (50 kg)';
  } else if (lowerName.includes('wood') || lowerName.includes('timber')) {
    return 'per ft';
  } else if (lowerName.includes('paint')) {
    return 'Liter';
  } else if (lowerName.includes('brick') || lowerName.includes('block')) {
    return 'per 1000';
  } else if (lowerName.includes('steel') || lowerName.includes('metal')) {
    return 'per Ton';
  } else if (lowerName.includes('tile') || lowerName.includes('flooring')) {
    return 'sq ft';
  } else {
    return 'Unit';
  }
};

// Fallback to mock data if scraping fails
const getMockOnlineResults = (query: string): Material[] => {
  // Simulate API delay
  console.log('Returning mock online results for:', query);
  
  // Mock online results - in real implementation this would be an actual API call
  const mockOnlineResults: Material[] = [
    {
      id: 'online-1',
      name: `${query} Premium Cement`,
      category: 'Cement & Concrete',
      price: 425.50, // Price in rupees
      unit: 'Bag (50 kg)',
      supplier: 'Amazon India',
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
      supplier: 'Flipkart',
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
      supplier: 'Industry Buying',
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
