import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { ProductInCart } from "../../typings";
import { addProductToCartWithValidation } from "./cartThunks";

type CartState = {
  productsInCart: ProductInCart[];
  subtotal: number;
};

const initialState: CartState = {
  productsInCart: [],
  subtotal: 0,
};

export const cartSlice = createSlice({
  name: "cart",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    addValidatedProductToCart: (state, action: PayloadAction<ProductInCart>) => {
      const existingProduct = state.productsInCart.find(
        (product) => product.id === action.payload.id && product.color === action.payload.color
      );
      if (existingProduct) {
        state.productsInCart = state.productsInCart.map((product) => {
          if (product.id === action.payload.id && product.color === action.payload.color) {
            return {
              ...product,
              quantity: product.quantity + action.payload.quantity,
            };
          }
          return product;
        });
      } else {
        state.productsInCart.push(action.payload);
      }
      cartSlice.caseReducers.calculateTotalPrice(state);
    },
    addProductToTheCart: (state, action: PayloadAction<ProductInCart>) => {
      const existingProduct = state.productsInCart.find(
        (product) => product.id === action.payload.id && product.color === action.payload.color
      );
      if (existingProduct) {
        state.productsInCart = state.productsInCart.map((product) => {
          if (product.id === action.payload.id && product.color === action.payload.color) {
            return {
              ...product,
              quantity: product.quantity + action.payload.quantity,
            };
          }
          return product;
        });
      } else {
        state.productsInCart.push(action.payload);
      }
      cartSlice.caseReducers.calculateTotalPrice(state);
    },
    removeProductFromTheCart: (
      state,
      action: PayloadAction<{ id: string }>
    ) => {
      state.productsInCart = state.productsInCart.filter(
        (product) => product.id !== action.payload.id
      );
      cartSlice.caseReducers.calculateTotalPrice(state);
    },
    updateProductQuantity: (
      state,
      action: PayloadAction<{ id: string; quantity: number }>
    ) => {
      state.productsInCart = state.productsInCart.map((product) => {
        if (product.id === action.payload.id) {
          return {
            ...product,
            quantity: action.payload.quantity,
          };
        }
        return product;
      });
      cartSlice.caseReducers.calculateTotalPrice(state);
    },
    calculateTotalPrice: (state) => {
      state.subtotal = state.productsInCart.reduce(
        (acc, product) => acc + product.price * product.quantity,
        0
      );
    },
    clearCart: (state) => {
      state.productsInCart = [];
      state.subtotal = 0;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addProductToCartWithValidation.fulfilled, (state, action) => {
        // Add the validated product to cart
        const product = action.payload;
        const existingProduct = state.productsInCart.find(
          (p) => p.id === product.id && p.color === product.color
        );
        
        if (existingProduct) {
          state.productsInCart = state.productsInCart.map((p) => {
            if (p.id === product.id && p.color === product.color) {
              return {
                ...p,
                quantity: p.quantity + product.quantity,
              };
            }
            return p;
          });
        } else {
          state.productsInCart.push(product);
        }
        
        cartSlice.caseReducers.calculateTotalPrice(state);
      });
  },
});

export const {
  addValidatedProductToCart,
  removeProductFromTheCart,
  updateProductQuantity,
  calculateTotalPrice,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
