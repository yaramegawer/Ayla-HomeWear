// Token management utilities
export const tokenManager = {
  // Store JWT token
  setToken: (token: string): void => {
    localStorage.setItem('token', token);
  },

  // Get JWT token
  getToken: (): string | null => {
    return localStorage.getItem('token');
  },

  // Remove JWT token
  removeToken: (): void => {
    localStorage.removeItem('token');
  },

  // Store user data
  setUser: (user: any): void => {
    localStorage.setItem('user', JSON.stringify(user));
  },

  // Get user data
  getUser: (): any | null => {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      try {
        return JSON.parse(userStr);
      } catch {
        return null;
      }
    }
    return null;
  },

  // Remove user data
  removeUser: (): void => {
    localStorage.removeItem('user');
  },

  // Clear all auth data
  clearAuth: (): void => {
    tokenManager.removeToken();
    tokenManager.removeUser();
  },

  // Check if token is expired (basic check)
  isTokenExpired: (): boolean => {
    const token = tokenManager.getToken();
    if (!token) return true;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const currentTime = Date.now() / 1000;
      return payload.exp < currentTime;
    } catch {
      return true;
    }
  },

  // Get token payload
  getTokenPayload: (): any | null => {
    const token = tokenManager.getToken();
    if (!token) return null;

    try {
      return JSON.parse(atob(token.split('.')[1]));
    } catch {
      return null;
    }
  }
};
