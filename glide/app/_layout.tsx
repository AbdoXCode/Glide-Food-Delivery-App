import { router, Stack } from "expo-router";
import { useEffect } from "react";
import UserProvider from "../contexts/UserContext";
import useUser from "../hooks/useUser";

function NavigationHandler() {
  const { user, loading } = useUser();

  useEffect(() => {
    if (loading) return;

    if (user) {
      router.replace("/home");
    }
  }, [user, loading]);

  return null;
}
export default function RootLayout() {
  return (
    <UserProvider>
      <NavigationHandler />
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      />
    </UserProvider>
  );
}
