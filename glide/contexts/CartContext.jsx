import React from "react";
import { StyleSheet } from "react-native";

export const CartContext = React.createContext();

export default function CartProvider({ children }) {
  const [cartItems, setCartItems] = React.useState([]);

  return (
    <CartContext.Provider value={{ cartItems, setCartItems }}>
      {children}
    </CartContext.Provider>
  );
}

const styles = StyleSheet.create({});
