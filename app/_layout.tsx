import { Stack } from "expo-router";

const routeScreenCategoriesOptions = {
  title: "Detalles del Item",
  headerStyle: { backgroundColor: "#988EE4" },
  headerTintColor: "#fff",
};
export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen
        name="DetailItemCategories"
        options={routeScreenCategoriesOptions}
      />
      <Stack.Screen name="+not-found" />
    </Stack>
  );
}
