import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { CartItem } from '@/types';
import { getProductById } from '@/mocks/products';

interface CartState {
  items: CartItem[];
  addItem: (productId: string, quantity: number, shade?: string) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getCartItemsCount: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (productId, quantity, shade) => {
        const { items } = get();
        const existingItem = items.find(item => item.productId === productId);

        if (existingItem) {
          set({
            items: items.map(item => 
              item.productId === productId 
                ? { ...item, quantity: item.quantity + quantity } 
                : item
            ),
          });
        } else {
          set({
            items: [...items, { productId, quantity, shade }],
          });
        }
      },

      removeItem: (productId) => {
        const { items } = get();
        set({
          items: items.filter(item => item.productId !== productId),
        });
      },

      updateQuantity: (productId, quantity) => {
        const { items } = get();
        if (quantity <= 0) {
          set({
            items: items.filter(item => item.productId !== productId),
          });
        } else {
          set({
            items: items.map(item => 
              item.productId === productId 
                ? { ...item, quantity } 
                : item
            ),
          });
        }
      },

      clearCart: () => {
        set({ items: [] });
      },

      getCartTotal: () => {
        const { items } = get();
        return items.reduce((total, item) => {
          const product = getProductById(item.productId);
          return total + (product?.price || 0) * item.quantity;
        }, 0);
      },

      getCartItemsCount: () => {
        const { items } = get();
        return items.reduce((count, item) => count + item.quantity, 0);
      },
    }),
    {
      name: 'cart-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);