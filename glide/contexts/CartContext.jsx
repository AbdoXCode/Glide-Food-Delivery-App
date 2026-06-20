import React from "react";
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
      return [...prevItems, item]; // same restaurant
    });
    return result;
  }
  function removeFromCart(itemId) {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
  }
  function clearCart() {
    setCartItems([]);
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
  console.log("Cart Items:", cartItems);
  console.log("Total Price:", cartTotal());
  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
        cartTotal,
        cartLength,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

const styles = StyleSheet.create({});
