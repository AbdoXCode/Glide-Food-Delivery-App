import { createContext, useEffect, useState } from "react";
import {
  getMenuByRestaurantId,
  getPopularRestaurants,
  getRestaurantById,
  getRestaurants,
  recommendRestaurants,
} from "../services/api";

import useUser from "../hooks/useUser";
export const RestaurantContext = createContext();

export default function RestaurantProvider({ children }) {
  const [restaurants, setRestaurants] = useState([]);
  const [popularRestaurants, setPopularRestaurants] = useState([]);
  const [recommendedRestaurants, setRecommendedRestaurants] = useState([]);

  const { user } = useUser();
  async function fetchRestaurants() {
    try {
      const data = await getRestaurants();
      setRestaurants(data);
    } catch (error) {
      console.error("Error fetching restaurants:", error);
    }
  }

  async function fetchPopularRestaurants() {
    try {
      const data = await getPopularRestaurants();
      setPopularRestaurants(data);
    } catch (error) {
      console.error("Error fetching popular restaurants:", error);
    }
  }

  async function fetchRecommendedRestaurants(userId) {
    try {
      const data = await recommendRestaurants(userId);
      setRecommendedRestaurants(data);
    } catch (error) {
      console.error("Error fetching recommended restaurants:", error);
    }
  }

  async function fetchRestaurantDetails(id) {
    try {
      const restaurant = await getRestaurantById(id);
      return restaurant;
    } catch (error) {
      console.error("Error fetching restaurant details:", error);
      throw error;
    }
  }

  async function fetchRestaurantMenu(id) {
    try {
      const menu = await getMenuByRestaurantId(id);
      return menu;
    } catch (error) {
      console.error("Error fetching restaurant menu:", error);
      throw error;
    }
  }

  useEffect(() => {
    fetchRestaurants();
    fetchPopularRestaurants();
  }, []);

  useEffect(() => {
    if (user && user?.user?.id) {
      fetchRecommendedRestaurants(user?.user?.id);
    }
  }, [user]);

  return (
    <RestaurantContext.Provider
      value={{
        restaurants,
        popularRestaurants,
        recommendedRestaurants,
        fetchRestaurantDetails,
        fetchRestaurantMenu,
      }}
    >
      {children}
    </RestaurantContext.Provider>
  );
}
