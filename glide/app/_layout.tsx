import { router, Stack } from "expo-router";
import { useEffect } from "react";
import CartProvider from "../contexts/CartContext";
import OrdersProvider from "../contexts/OrderContext";
import RestaurantProvider from "../contexts/RestaurantContext";
import UserProvider from "../contexts/UserContext";
import useUser from "../hooks/useUser";

function NavigationHandler() {
  const { user, loading } = useUser();

  useEffect(() => {
    if (loading) return;

    if (user) {
      // router.dismissAll();
      router.replace("/home");
    }
  }, [user, loading]);

  return null;
}

export default function RootLayout() {
  return (
    <UserProvider>
      <RestaurantProvider>
        <CartProvider>
          <OrdersProvider>
            <NavigationHandler />
            <Stack screenOptions={{ headerShown: false }}>
              <Stack.Screen name="(auth)" />
              <Stack.Screen name="(tabs)" />
            </Stack>
          </OrdersProvider>
        </CartProvider>
      </RestaurantProvider>
    </UserProvider>
  );
}
