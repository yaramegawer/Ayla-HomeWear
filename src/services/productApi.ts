import customFetch from '../axios/custom';

// Simple cache implementation
const cache = new Map<string, { data: any; timestamp: number }>();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

const getCachedData = (key: string) => {
  const cached = cache.get(key);
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return cached.data;
  }
  return null;
};

const setCachedData = (key: string, data: any) => {
  cache.set(key, { data, timestamp: Date.now() });
};

// Product interface definition (matches backend schema)
export interface Product {
  id: string;
  _id: string;
  name: string;
  price: number;
  quantity: number;
  color: string[];
  size: string[];
  description?: string;
  images: Array<{
    id: string;
    url: string;
  }>;
  defaultImage: {
    id: string;
    url: string;
  };
  cloudFolder: string;
  category: string;
  season: string;
  stock: number;
  discount: number;
  colorStock: Array<{
    color: string;
    stock: number;
  }>;
  createdAt?: string;
  updatedAt?: string;
}

export interface ProductsResponse {
  success: boolean;
  products: Product[];
  pagination: {
    totalProducts: number;
    totalPages: number;
    currentPage: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
}

export const productApi = {
  // Get all products with pagination
  getAllProducts: async (page: number = 1, category?: string, season?: string): Promise<ProductsResponse> => {
    const params = new URLSearchParams();
    params.append('page', page.toString());
    
    // Add category and season filters to request params
    if (category) {
      params.append('category', category);
    }
    if (season) {
      params.append('season', season);
    }
    
    const cacheKey = `products_${params.toString()}`;
    
    // Check cache first
    const cachedData = getCachedData(cacheKey);
    if (cachedData) {
      return cachedData;
    }
    
    const response = await customFetch.get(`/product?${params.toString()}`);
    const data = response.data;

    // Cache the response
    setCachedData(cacheKey, data);

    // Backend now handles filtering and pagination, so we can return the data directly
    return data;
  },

  // Get single product by ID
  getProductById: async (id: string): Promise<Product> => {
    const response = await customFetch.get(`/product/${id}`);
    // Backend returns { success: true, product: {...} }
    return response.data.product;
  },

  // Search products
  searchProducts: async (query: string, page: number = 1): Promise<ProductsResponse> => {
    const cacheKey = `search_${query}_${page}`;
    
    // Check cache first
    const cachedData = getCachedData(cacheKey);
    if (cachedData) {
      return cachedData;
    }
    
    const response = await customFetch.get(`/product?page=${page}`);
    const data = response.data;

    // Filter products by search query (client-side search)
    if (query && data.products) {
      data.products = data.products.filter((product: Product) =>
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        (product.description && product.description.toLowerCase().includes(query.toLowerCase()))
      );
      
      // Update pagination for search results
      const searchCount = data.products.length;
      data.pagination.totalProducts = searchCount;
      data.pagination.totalPages = Math.ceil(searchCount / 20);
    }

    // Cache the response
    setCachedData(cacheKey, data);
    
    return data;
  }
};
