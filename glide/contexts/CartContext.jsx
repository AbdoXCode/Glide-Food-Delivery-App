import { submitOrderApi, submitOrderItem } from "@/services/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect } from "react";
import { StyleSheet } from "react-native";

export const CartContext = React.createContext();

export default function CartProvider({ children }) {
  const [cartItems, setCartItems] = React.useState([]);

  function addToCart(item) {
    let result = {
      success: true,
      reason: null,
    };
    setCartItems((prevItems) => {
      if (prevItems.length === 0) {
        return [...prevItems, item];
      }

      const currentRestaurant = prevItems[0].restaurant_id;
      if (currentRestaurant !== item.restaurant_id) {
        result = {
          success: false,
          reason: "different_restaurant",
        };

        return prevItems;
      }

      const existingItem = prevItems.find(
        (cartItem) => cartItem.id === item.id,
      );

      if (existingItem) {
        return prevItems.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + item.quantity }
            : cartItem,
        );
      }

      return [...prevItems, item]; // same restaurant
    });
    return result;
  }
  function removeFromCart(itemId) {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
  }
  async function clearCart() {
    setCartItems([]);
    await AsyncStorage.removeItem("cart");
  }
  function cartTotal() {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0,
    );
  }
  function cartLength() {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  }

  function updateQuantity(id, quantity) {
    if (quantity === 0) {
      deleteCartItem(id);
      return;
    }
    setCartItems((items) =>
      items.map((item) => (item.id === id ? { ...item, quantity } : item)),
    );
  }

  function deleteCartItem(itemId) {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
  }
  async function saveCartToStorage() {
    try {
      await AsyncStorage.setItem("cart", JSON.stringify(cartItems));
    } catch (error) {
      console.error("Error saving cart to storage:", error);
    }
  }

  async function submitOrderItems(orderId, cartItems) {
    for (const item of cartItems) {
      console.log(item);
      await submitOrderItem(orderId, item.id, item.quantity, item.price);
    }
  }
  async function submitOrder(userId, restaurantId, status, total) {
    try {
      const response = await submitOrderApi(
        userId,
        restaurantId,
        status,
        total,
      );

      if (response.ok) {
        const orderId = response.id;
        await submitOrderItems(orderId, cartItems);
        await clearCart();
      }
    } catch (error) {
      console.error("Error submitting order:", error);
    }
  }

  // async function
  async function loadCartFromStorage() {
    try {
      const storedCart = await AsyncStorage.getItem("cart");
      if (storedCart) {
        setCartItems(JSON.parse(storedCart));
      }
    } catch (error) {
      console.error("Error loading cart from storage:", error);
    }
  }

  useEffect(() => {
    loadCartFromStorage();
  }, []);

  useEffect(() => {
    saveCartToStorage();
  }, [cartItems]);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
        cartTotal,
        cartLength,
        updateQuantity,
        deleteCartItem,
        submitOrder,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

const styles = StyleSheet.create({});
