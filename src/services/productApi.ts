import customFetch from '../axios/custom';

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
    
    const response = await customFetch.get(`/product?${params.toString()}`);
    const data = response.data;
    
    console.log('Backend response:', data);

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

    return data;
  }
};
