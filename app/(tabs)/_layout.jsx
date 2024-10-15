import { StyleSheet, View } from "react-native";
import { Tabs } from "expo-router";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

const TabIcon = ({ icon, focused }) => {
  return (
    <View style={[styles.container, focused && styles.focusedContainer]}>
      {icon}
    </View>
  );
};

const TabsLayout = () => {
  return (
    <>
      <Tabs
        screenOptions={{
          tabBarShowLabel: false,
          tabBarStyle: {
            backgroundColor: "#19212f",
          },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Home",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={
                  <MaterialIcons
                    name="home"
                    size={32}
                    color={focused ? "#19212f" : "#fff"}
                  />
                }
                color={color}
                focused={focused}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="parking"
          options={{
            title: "Parking",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={
                  <MaterialCommunityIcons
                    name="parking"
                    size={32}
                    color={focused ? "#19212f" : "#fff"}
                  />
                }
                color={color}
                focused={focused}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="search"
          options={{
            title: "Search",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={
                  <MaterialIcons
                    name="search"
                    size={32}
                    color={focused ? "#19212f" : "#fff"}
                  />
                }
                color={color}
                focused={focused}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="settings"
          options={{
            title: "Settings",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={
                  <MaterialIcons
                    name="settings"
                    size={32}
                    color={focused ? "#19212f" : "#fff"}
                  />
                }
                color={color}
                focused={focused}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: "Profile",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={
                  <MaterialIcons
                    name="account-circle"
                    size={32}
                    color={focused ? "#19212f" : "#fff"}
                  />
                }
                color={color}
                focused={focused}
              />
            ),
          }}
        />
      </Tabs>
    </>
  );
};

export default TabsLayout;

const styles = StyleSheet.create({
  container: {
    padding: 4,
    alignItems: "center",
    justifyContent: "center",
  },
  focusedContainer: {
    backgroundColor: "white",
    borderRadius: 100,
  },
});
