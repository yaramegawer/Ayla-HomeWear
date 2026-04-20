import type { ProductInCart } from '../typings';
import { productApi } from '../services/productApi';

export interface StockValidationError {
  productId: string;
  productName: string;
  color: string;
  size: string;
  required: number;
  available: number;
  message: string;
}

export interface StockValidationResult {
  isValid: boolean;
  errors: StockValidationError[];
  warnings: string[];
}

export const validateCartStock = async (cartItems: ProductInCart[]): Promise<StockValidationResult> => {
  const errors: StockValidationError[] = [];
  const warnings: string[] = [];

  // Group cart items by product ID
  const productGroups = cartItems.reduce((groups, item) => {
    const key = item._id;
    if (!groups[key]) {
      groups[key] = [];
    }
    groups[key].push(item);
    return groups;
  }, {} as Record<string, ProductInCart[]>);

  // Check each product's stock
  for (const [productId, items] of Object.entries(productGroups)) {
    try {
      // Fetch current product data from API
      const product = await productApi.getProductById(productId);
      
      // Check each cart item against available stock
      for (const cartItem of items) {
        // Find color-specific stock
        const colorStock = product.colorStock?.find(cs => cs.color === cartItem.color);
        const availableStock = colorStock?.stock ?? 0;
        
        if (cartItem.quantity > availableStock) {
          errors.push({
            productId: productId,
            productName: cartItem.name,
            color: cartItem.color || 'N/A',
            size: cartItem.size || 'N/A',
            required: cartItem.quantity,
            available: availableStock,
            message: `Insufficient stock for ${cartItem.name} (color: ${cartItem.color}). Required: ${cartItem.quantity}, Available: ${availableStock}`
          });
        }
        
        // Add warnings for low stock
        if (availableStock > 0 && availableStock <= 5) {
          warnings.push(`Low stock warning: Only ${availableStock} items left for ${cartItem.name} (color: ${cartItem.color})`);
        }
      }
    } catch (error) {
      warnings.push(`Could not verify stock for product ${productId}. Please proceed with caution.`);
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings
  };
};

export const validateSingleProductStock = (
  product: any, 
  requestedQuantity: number, 
  selectedColor?: string
): StockValidationResult => {
  const errors: StockValidationError[] = [];
  const warnings: string[] = [];

  // Check main stock
  if (requestedQuantity > product.stock) {
    errors.push({
      productId: product._id,
      productName: product.name,
      color: selectedColor || 'N/A',
      size: 'N/A',
      required: requestedQuantity,
      available: product.stock,
      message: `Insufficient stock for ${product.name}. Required: ${requestedQuantity}, Available: ${product.stock}`
    });
  }

  // Check color-specific stock if color is selected
  if (selectedColor && product.colorStock) {
    const colorStock = product.colorStock.find((cs: any) => cs.color === selectedColor);
    const availableColorStock = colorStock?.stock ?? 0;
    
    if (requestedQuantity > availableColorStock) {
      errors.push({
        productId: product._id,
        productName: product.name,
        color: selectedColor,
        size: 'N/A',
        required: requestedQuantity,
        available: availableColorStock,
        message: `Insufficient stock for ${product.name} (color: ${selectedColor}). Required: ${requestedQuantity}, Available: ${availableColorStock}`
      });
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings
  };
};
