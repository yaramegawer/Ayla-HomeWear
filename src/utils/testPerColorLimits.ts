// Test file to verify per-color limit functionality
import type { ProductInCart } from '../typings';
import { checkCanAddToCart } from './checkCartStockLimit';

// Mock cart with different colors of same product
const mockCart: ProductInCart[] = [
  {
    id: 'product1-small-black',
    _id: 'product1',
    name: 'Test Product',
    price: 100,
    quantity: 2,
    color: 'black',
    size: 'small',
    description: '',
    images: [],
    defaultImage: { id: '', url: '' },
    cloudFolder: '',
    category: 'test',
    season: 'all',
    stock: 10
  },
  {
    id: 'product1-medium-blue',
    _id: 'product1',
    name: 'Test Product',
    price: 100,
    quantity: 1,
    color: 'blue',
    size: 'medium',
    description: '',
    images: [],
    defaultImage: { id: '', url: '' },
    cloudFolder: '',
    category: 'test',
    season: 'all',
    stock: 10
  }
];


export const testPerColorLimits = async () => {
  console.log('=== Testing Per-Color Limits ===');
  
  // Test 1: Try to add 2 more black (cart has 2, max is 3)
  console.log('\nTest 1: Adding 2 more black (cart: 2, max: 3)');
  try {
    const result1 = await checkCanAddToCart(mockCart, 'product1', 'black', 2);
    console.log('Result:', result1);
    // Expected: canAdd: false, message about only 1 more can be added
  } catch (error) {
    console.error('Error:', error);
  }
  
  // Test 2: Try to add 1 more black (cart has 2, max is 3)
  console.log('\nTest 2: Adding 1 more black (cart: 2, max: 3)');
  try {
    const result2 = await checkCanAddToCart(mockCart, 'product1', 'black', 1);
    console.log('Result:', result2);
    // Expected: canAdd: true
  } catch (error) {
    console.error('Error:', error);
  }
  
  // Test 3: Try to add 3 blue (cart has 1, max is 5)
  console.log('\nTest 3: Adding 3 more blue (cart: 1, max: 5)');
  try {
    const result3 = await checkCanAddToCart(mockCart, 'product1', 'blue', 3);
    console.log('Result:', result3);
    // Expected: canAdd: true (total would be 4, which is <= 5)
  } catch (error) {
    console.error('Error:', error);
  }
  
  // Test 4: Try to add red (cart has 0, max is 8)
  console.log('\nTest 4: Adding 5 red (cart: 0, max: 8)');
  try {
    const result4 = await checkCanAddToCart(mockCart, 'product1', 'red', 5);
    console.log('Result:', result4);
    // Expected: canAdd: true
  } catch (error) {
    console.error('Error:', error);
  }
  
  console.log('\n=== Test Complete ===');
};
