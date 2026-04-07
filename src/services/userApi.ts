import customFetch from '../axios/custom';

export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData {
  userName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface ForgetPasswordData {
  email: string;
}

export interface ResetPasswordData {
  email: string;
  password: string;
  confirmPassword: string;
  forgetCode: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  token?: string;
}

export const userApi = {
  // Register user
  register: async (userData: RegisterData): Promise<AuthResponse> => {
    const response = await customFetch.post('/user/register', userData);
    return response.data;
  },

  // Login user
  login: async (credentials: LoginData): Promise<AuthResponse> => {
    const response = await customFetch.post('/user/login', credentials);
    return response.data;
  },

  // Request password reset code
  forgetPassword: async (data: ForgetPasswordData): Promise<AuthResponse> => {
    const response = await customFetch.patch('/user/forgetCode', data);
    return response.data;
  },

  // Reset password with code
  resetPassword: async (data: ResetPasswordData): Promise<AuthResponse> => {
    const response = await customFetch.patch('/user/resetPassword', data);
    return response.data;
  }
};
