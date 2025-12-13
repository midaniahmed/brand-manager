import { fetchBaseQuery } from '@reduxjs/toolkit/query';
import { AuthManager } from '@/core/services/auth/AuthManager';

export const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_CREATIVE_V1_BACKEND_URL,
  prepareHeaders: async (headers) => {
    try {
      const token = await AuthManager.getInstance().getToken();
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
    } catch (error) {
      console.error('Failed to get auth token:', error);
    }
    return headers;
  },
});
