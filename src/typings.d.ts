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
  discountedPrice: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface ProductInCart {
  id: string;
  _id: string;
  name: string;
  price: number;
  quantity: number;
  color: string;
  size: string;
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
  createdAt?: string;
  updatedAt?: string;
}

interface User {
  id: string;
  name: string;
  lastname: string;
  email: string;
  role: string;
  password: string;
}

interface Order {
  _id: string;
  customerName: string;
  phone: string;
  email: string;
  address: string;
  government: string;
  products: Array<{
    productId: string;
    quantity: number;
    price: number;
    color?: string;
    size?: string;
  }>;
  shippingCost: number;
  totalPrice: number;
  depositAmount: number;
  depositPaymentMethod: string;
  dueAmount: number;
  duePaymentMethod: string;
  orderDate: string;
  paymentStatus: string;
  depositConfirmed: boolean;
  paymentProof?: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

interface OrderResponse {
  success: boolean;
  message: string;
  data: Order;
  depositInfo: {
    amount: number;
    paymentMethod: string;
    instructions: string;
    whatsappLink: string;
  };
}
