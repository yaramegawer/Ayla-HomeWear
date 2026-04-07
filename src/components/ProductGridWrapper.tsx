import React, { ReactElement, useCallback, useEffect, useState } from "react";
import { productApi, Product, ProductsResponse } from "../services/productApi";
import { useAppDispatch, useAppSelector } from "../hooks";
import {
  setShowingProducts,
  setTotalProducts,
} from "../features/shop/shopSlice";

const ProductGridWrapper = ({
  searchQuery,
  sortCriteria,
  category,
  page,
  limit,
  children,
}: {
  searchQuery?: string;
  sortCriteria?: string;
  category?: string;
  page?: number;
  limit?: number;
  children:
    | ReactElement<{ products: Product[] }>
    | ReactElement<{ products: Product[] }>[];
}) => {
  const [products, setProducts] = useState<Product[]>([]);
  const { totalProducts } = useAppSelector((state) => state.shop);
  const dispatch = useAppDispatch();

  // Memoize the function to prevent unnecessary re-renders
  const getProducts = useCallback(
    async (query: string, sort: string, pageNum: number) => {
      try {
        let response: ProductsResponse;
        
        if (query) {
          response = await productApi.searchProducts(query, pageNum);
        } else {
          response = await productApi.getAllProducts(pageNum, category);
        }

        let filteredProducts = response.products;

        // Apply client-side sorting if needed
        if (sort === "price-asc") {
          filteredProducts = [...filteredProducts].sort((a, b) => a.price - b.price);
        } else if (sort === "price-desc") {
          filteredProducts = [...filteredProducts].sort((a, b) => b.price - a.price);
        } else if (sort === "popularity") {
          // No popularity field, keep original order
        }

        // Update pagination info
        // setPagination(response.pagination); // Not needed for current implementation
        
        // Update Redux state
        if (totalProducts !== response.pagination.totalProducts) {
          dispatch(setTotalProducts(response.pagination.totalProducts));
        }

        // Apply limit if specified
        if (limit) {
          const limitedProducts = filteredProducts.slice(0, limit);
          setProducts(limitedProducts);
          dispatch(setShowingProducts(limitedProducts.length));
        } else {
          setProducts(filteredProducts);
          dispatch(setShowingProducts(filteredProducts.length));
        }
      } catch (error) {
        console.error("Failed to fetch products:", error);
        setProducts([]);
        dispatch(setShowingProducts(0));
      }
    },
    [category, totalProducts, dispatch]
  );

  useEffect(() => {
    getProducts(searchQuery || "", sortCriteria || "", page || 1);
  }, [searchQuery, sortCriteria, page, getProducts]);

  // Clone the children and pass the products as props
  const childrenWithProps = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, { 
        products: products
      });
    }
    return null;
  });

  return childrenWithProps;
};
export default ProductGridWrapper;
