import { Redirect, Stack } from "expo-router";
import useUser from "../../hooks/useUser";

export default function AuthLayout() {
  const { user, loading } = useUser();

  if (loading) return null;

  if (user) {
    return <Redirect href="/(tabs)/home" />;
  }
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    />
  );
}
