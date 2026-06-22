import { Ionicons } from "@expo/vector-icons";
import { Redirect, Tabs } from "expo-router";
import { colors } from "../../constants/theme";
import useUser from "../../hooks/useUser";

export default function ScreensLayout() {
  const { user, loading } = useUser();

  if (loading) return null;

  if (!user) {
    return <Redirect href="/(auth)" />;
  }
  return (
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
  );
}
