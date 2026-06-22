import React from "react";
import { OrderContext } from "../contexts/OrderContext";

export default function useOrders() {
  const context = React.useContext(OrderContext);

  if (!context) {
    throw new Error("useOrders must be used within a OrderProvider");
  }

  return context;
}
