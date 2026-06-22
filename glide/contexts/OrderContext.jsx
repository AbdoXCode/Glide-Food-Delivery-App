import React, { useEffect } from "react";
import { StyleSheet } from "react-native";
import useUser from "../hooks/useUser";
import { getOrderDetails, getOrdersByUserId } from "../services/api";

export const OrderContext = React.createContext();
export default function OrderProvider({ children }) {
  const [orders, setOrders] = React.useState([]);
  const [orderDetailsList, setOrderDetailsList] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const { user } = useUser();

  async function fetchOrders(userId) {
    console.log("Fetching orders for userId:", userId);
    try {
      const orders = await getOrdersByUserId(userId);
      setOrders(orders);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching orders in OrderProvider:", error);
    } finally {
      setLoading(false);
    }
  }

  async function fetchOrderDetails(orderId) {
    try {
      const orderDetails = await getOrderDetails(orderId);
      setOrderDetailsList(orderDetails);
      return orderDetails;
    } catch (error) {
      console.error("Error fetching order details in OrderProvider:", error);
      throw error;
    }
  }

  useEffect(() => {
    fetchOrders(user?.user.id);
  }, [user]);

  return (
    <OrderContext.Provider
      value={{
        orders,
        loading,
        orderDetailsList,
        fetchOrders,
        fetchOrderDetails,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
}

const styles = StyleSheet.create({});
