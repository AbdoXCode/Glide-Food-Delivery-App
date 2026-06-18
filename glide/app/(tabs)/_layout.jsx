import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { colors } from "../../constants/theme";
import RestaurantProvider from "../../contexts/RestaurantContext";

export default function ScreensLayout() {
  return (
    <RestaurantProvider>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: "#000000", // selected tab text/icon
          tabBarInactiveTintColor: "#888", // unselected tab text/icon
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            title: "Home",
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <Ionicons
                name="home"
                size={24}
                color={focused ? colors.light.primaryColor : "#9CA3AF"}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="search"
          options={{
            href: null,
            headerShown: false,
          }}
        />
        <Tabs.Screen
          name="cart"
          options={{
            title: "Cart",
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <Ionicons
                name="cart"
                size={24}
                color={focused ? colors.light.primaryColor : "#9CA3AF"}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="orders"
          options={{
            title: "Orders",
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <Ionicons
                name="receipt"
                size={24}
                color={focused ? colors.light.primaryColor : "#9CA3AF"}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="account"
          options={{
            title: "Account",
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <Ionicons
                name="person"
                size={24}
                color={focused ? colors.light.primaryColor : "#9CA3AF"}
              />
            ),
          }}
        />
      </Tabs>
    </RestaurantProvider>
  );
}
