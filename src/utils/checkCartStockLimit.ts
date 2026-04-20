import type { ProductInCart } from '../typings';
import { productApi } from '../services/productApi';

export interface StockLimitCheck {
  canAdd: boolean;
  maxAvailable: number;
  currentInCart: number;
  requestedQuantity: number;
  message: string;
}

export const checkCanAddToCart = async (
  cartItems: ProductInCart[], 
  productId: string, 
  color: string, 
  requestedQuantity: number
): Promise<StockLimitCheck> => {
  try {
    console.log('=== checkCanAddToCart Debug ===');
    console.log('Cart items:', cartItems);
    console.log('Product ID:', productId);
    console.log('Color:', color);
    console.log('Requested quantity:', requestedQuantity);
    
    // Find existing items in cart with same product and color
    const existingItems = cartItems.filter(
      item => item._id === productId && item.color === color
    );
    
    console.log('Existing items with same product & color:', existingItems);
    
    const currentInCart = existingItems.reduce((sum, item) => sum + item.quantity, 0);
    const totalRequested = currentInCart + requestedQuantity;
    
    console.log('Current in cart:', currentInCart);
    console.log('Total requested:', totalRequested);
    
    // Get current product data from API
    let product;
    try {
      product = await productApi.getProductById(productId);
      console.log('Product from API:', product);
      console.log('Product colorStock:', product.colorStock);
    } catch (error) {
      console.error('Failed to load product in validation:', error);
      // Return conservative fallback - don't allow adding if we can't verify stock
      return {
        canAdd: false,
        maxAvailable: 0,
        currentInCart,
        requestedQuantity,
        message: `Could not verify stock availability. Please try again.`
      };
    }
    
    // Find color-specific stock
    const colorStock = product.colorStock?.find(cs => cs.color === color);
    const maxAvailable = colorStock?.stock ?? 0;
    
    console.log('Color stock for', color, ':', colorStock);
    console.log('Max available:', maxAvailable);
    
    if (maxAvailable === 0) {
      return {
        canAdd: false,
        maxAvailable: 0,
        currentInCart,
        requestedQuantity,
        message: `This color is out of stock`
      };
    }
    
    if (totalRequested > maxAvailable) {
      const canAddMore = maxAvailable - currentInCart;
      return {
        canAdd: canAddMore > 0,
        maxAvailable,
        currentInCart,
        requestedQuantity,
        message: canAddMore > 0 
          ? `Only ${canAddMore} more can be added (max: ${maxAvailable}, already in cart: ${currentInCart})`
          : `Maximum quantity reached for this color (max: ${maxAvailable}, already in cart: ${currentInCart})`
      };
    }
    
    return {
      canAdd: true,
      maxAvailable,
      currentInCart,
      requestedQuantity,
      message: `Can add ${requestedQuantity} items`
    };
    
  } catch (error) {
    return {
      canAdd: false,
      maxAvailable: 0,
      currentInCart: 0,
      requestedQuantity,
      message: `Could not verify stock availability`
    };
  }
};
