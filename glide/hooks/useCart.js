import React from "react";
import { CartContext } from "../contexts/CartContext";

export default function useRestaurants() {
  const context = React.useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }

  return context;
}
