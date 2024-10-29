import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="signup" />
      <Stack.Screen name="index" />
      <Stack.Screen name="userDashboard" />
    </Stack>
  );
}
