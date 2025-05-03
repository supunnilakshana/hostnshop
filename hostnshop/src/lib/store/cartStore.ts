// src/lib/store/cartStore.ts
import {create} from "zustand";
import {persist} from "zustand/middleware";
import {ReadProductDTO} from "@/shared/dtos";

export interface CartItem {
  product: ReadProductDTO;
  quantity: number;
}

interface CartStore {
  items: CartItem[];
  addItem: (product: ReadProductDTO, quantity: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: () => number;
  totalPrice: () => number;
  applyPromoCode: (code: string) => Promise<boolean>;
  promoCode: string | null;
  discount: number;
  removePromoCode: () => void;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      promoCode: null,
      discount: 0,

      addItem: (product, quantity) => {
        const {items} = get();
        const existingItem = items.find(
          (item) => item.product.id === product.id
        );

        if (existingItem) {
          set({
            items: items.map((item) =>
              item.product.id === product.id
                ? {...item, quantity: item.quantity + quantity}
                : item
            ),
          });
        } else {
          set({items: [...items, {product, quantity}]});
        }
      },

      removeItem: (productId) => {
        const {items} = get();
        set({items: items.filter((item) => item.product.id !== productId)});
      },

      updateQuantity: (productId, quantity) => {
        const {items} = get();
        set({
          items: items.map((item) =>
            item.product.id === productId
              ? {...item, quantity: Math.max(1, quantity)}
              : item
          ),
        });
      },

      clearCart: () => set({items: [], promoCode: null, discount: 0}),

      totalItems: () => {
        const {items} = get();
        return items.reduce((total, item) => total + item.quantity, 0);
      },

      totalPrice: () => {
        const {items, discount} = get();
        const subtotal = items.reduce((total, item) => {
          const price = item.product.price;
          const discountedPrice =
            price * (1 - item.product.discount_percentage / 100);
          return total + discountedPrice * item.quantity;
        }, 0);

        return subtotal * (1 - discount / 100);
      },

      applyPromoCode: async (code) => {
        try {
          // Replace with actual API call to validate promo code
          const response = await fetch(`/api/promo-codes/validate`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({code}),
          });

          const data = await response.json();

          if (data.success) {
            set({
              promoCode: code,
              discount: data.data.discount_percentage,
            });
            return true;
          }
          return false;
        } catch (error) {
          console.error("Failed to apply promo code:", error);
          return false;
        }
      },

      removePromoCode: () => set({promoCode: null, discount: 0}),
    }),
    {
      name: "cart-storage",
    }
  )
);
