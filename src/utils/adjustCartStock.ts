import type { ProductInCart } from '../typings';
import { productApi } from '../services/productApi';

export interface CartAdjustmentResult {
  adjustedCart: ProductInCart[];
  adjustments: Array<{
    productId: string;
    productName: string;
    color: string;
    originalQuantity: number;
    adjustedQuantity: number;
    maxAvailable: number;
    message: string;
  }>;
  hasAdjustments: boolean;
}

export const adjustCartToAvailableStock = async (cartItems: ProductInCart[]): Promise<CartAdjustmentResult> => {
  const adjustments: CartAdjustmentResult['adjustments'] = [];
  const adjustedCart = [...cartItems];

  // Group cart items by product ID
  const productGroups = adjustedCart.reduce((groups, item) => {
    const key = item._id;
    if (!groups[key]) {
      groups[key] = [];
    }
    groups[key].push(item);
    return groups;
  }, {} as Record<string, ProductInCart[]>);

  // Check each product's stock and adjust if needed
  for (const [productId, items] of Object.entries(productGroups)) {
    try {
      // Fetch current product data from API
      const product = await productApi.getProductById(productId);
      
      // Check each cart item and adjust if needed
      for (let i = 0; i < items.length; i++) {
        const cartItem = items[i];
        
        // Find color-specific stock
        const colorStock = product.colorStock?.find(cs => cs.color === cartItem.color);
        const availableStock = colorStock?.stock ?? 0;
        
        if (cartItem.quantity > availableStock && availableStock > 0) {
          // Adjust quantity to maximum available
          const originalQuantity = cartItem.quantity;
          const adjustedQuantity = availableStock;
          
          // Update the cart item
          const cartIndex = adjustedCart.findIndex(
            item => item.id === cartItem.id
          );
          
          if (cartIndex !== -1) {
            adjustedCart[cartIndex] = {
              ...adjustedCart[cartIndex],
              quantity: adjustedQuantity
            };
          }
          
          adjustments.push({
            productId: productId,
            productName: cartItem.name,
            color: cartItem.color || 'N/A',
            originalQuantity,
            adjustedQuantity,
            maxAvailable: availableStock,
            message: `${cartItem.name} (${cartItem.color}) quantity adjusted from ${originalQuantity} to ${availableStock} (maximum available)`
          });
        }
      }
    } catch (error) {
      console.warn(`Could not verify stock for product ${productId}. Keeping original quantity.`);
    }
  }

  return {
    adjustedCart,
    adjustments,
    hasAdjustments: adjustments.length > 0
  };
};
