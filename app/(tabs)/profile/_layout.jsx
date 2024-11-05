import { Stack } from "expo-router";
import { useTheme } from "../../../providers/ThemeProvider";

export default function ProfileLayout() {
  const { theme } = useTheme();
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.bgColor,
        },
        headerTintColor: theme.color,
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
