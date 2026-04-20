import { createAsyncThunk } from '@reduxjs/toolkit';
import type { ProductInCart } from '../../typings';
import { checkCanAddToCart } from '../../utils/checkCartStockLimit';

export const addProductToCartWithValidation = createAsyncThunk(
  'cart/addProductToCartWithValidation',
  async (productData: ProductInCart, { getState, rejectWithValue }) => {
    try {
      const state = getState() as { cart: { productsInCart: ProductInCart[] } };
      const cartItems = state.cart.productsInCart;
      
      // Check stock limits before adding
      const stockCheck = await checkCanAddToCart(
        cartItems, 
        productData._id, 
        productData.color, 
        productData.quantity
      );
      
      if (!stockCheck.canAdd) {
        return rejectWithValue(stockCheck.message);
      }
      
      // If we can add some but not all, adjust quantity
      if (stockCheck.maxAvailable > 0 && stockCheck.maxAvailable < productData.quantity) {
        const adjustedProduct = {
          ...productData,
          quantity: stockCheck.maxAvailable
        };
        return adjustedProduct;
      }
      
      // Can add full quantity
      return productData;
      
    } catch (error) {
      return rejectWithValue('Failed to validate stock');
    }
  }
);
