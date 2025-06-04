import Ionicons from "@expo/vector-icons/Ionicons";
import { Tabs } from "expo-router";
import { StatusBar } from "expo-status-bar";
export default function TabLayout() {
  return (
    <>
      <StatusBar style="light" />
      <Tabs
        screenOptions={{
          headerStyle: {
            backgroundColor: "#0A0A0A",
          },
          headerShown: true,
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontSize: 24,
          },
          tabBarStyle: {
            backgroundColor: "#0A0A0A",
            borderTopWidth: 1,
            borderColor: "#988EE4",
          },
          tabBarActiveTintColor: "#988EE4",
          tabBarInactiveTintColor: "#fff",
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Swapi App",
            tabBarIcon: ({ color, focused }) => (
              <Ionicons
                name={focused ? "home-sharp" : "home-outline"}
                color={color}
                size={26}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="about"
          options={{
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <Ionicons
                name={
                  focused ? "information-circle" : "information-circle-outline"
                }
                color={color}
                size={26}
              />
            ),
          }}
        />
      </Tabs>
    </>
  );
}
