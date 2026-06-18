import React from "react";
import { RestaurantContext } from "../contexts/RestaurantContext";

export default function useRestaurants() {
  const context = React.useContext(RestaurantContext);

  if (!context) {
    throw new Error("useRestaurants must be used within a RestaurantProvider");
  }

  return context;
}
