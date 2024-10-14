import { Stack } from "expo-router";

export default function ProfileLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: "#19212f",
        },
        headerTintColor: "#fff",
      }}
    >
      <Stack.Screen
        name="index"
        options={{ title: "Profile", headerShown: false }}
      />
      <Stack.Screen name="add-listing" options={{ title: "Dodaj Oglas" }} />
    </Stack>
  );
}
