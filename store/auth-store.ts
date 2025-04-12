import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { User } from '@/types';

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  clearError: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      login: async (email, password) => {
        set({ isLoading: true, error: null });
        try {
          // Mock API call
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          // Mock successful login
          if (email === 'user@example.com' && password === 'password') {
            const user: User = {
              id: '1',
              name: 'Jane Doe',
              email: 'user@example.com',
              addresses: [],
            };
            const token = 'mock-jwt-token';
            
            set({ 
              user, 
              token, 
              isAuthenticated: true, 
              isLoading: false 
            });
          } else {
            set({ 
              error: 'Invalid email or password', 
              isLoading: false 
            });
          }
        } catch (error) {
          set({ 
            error: 'An error occurred during login', 
            isLoading: false 
          });
        }
      },

      signup: async (name, email, password) => {
        set({ isLoading: true, error: null });
        try {
          // Mock API call
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          // Mock successful signup
          const user: User = {
            id: '1',
            name,
            email,
            addresses: [],
          };
          const token = 'mock-jwt-token';
          
          set({ 
            user, 
            token, 
            isAuthenticated: true, 
            isLoading: false 
          });
        } catch (error) {
          set({ 
            error: 'An error occurred during signup', 
            isLoading: false 
          });
        }
      },

      logout: () => {
        set({ 
          user: null, 
          token: null, 
          isAuthenticated: false 
        });
      },

      clearError: () => {
        set({ error: null });
      },
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);