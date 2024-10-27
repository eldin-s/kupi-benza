import { StyleSheet, View } from "react-native";
import { Tabs } from "expo-router";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import TabBarBackground from "../../components/ui/TabBarBackground";

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
            backgroundColor: "transparent",
            borderTopWidth: 0,
            height: verticalScale(42),
            position: "absolute",
            left: scale(3),
            right: scale(3),
            bottom: verticalScale(6),
            borderRadius: moderateScale(14),
          },
          tabBarBackground: () => <TabBarBackground />,
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Home",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={<MaterialIcons name="home" size={28} color={"#fff"} />}
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
                    size={28}
                    color={"#fff"}
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
            tabBarIcon: ({ color }) => (
              <View
                style={{
                  position: "absolute",
                  top: verticalScale(-10),
                  borderRadius: 40,
                  padding: moderateScale(10),
                  backgroundColor: "#fff",
                  borderRadius: 60,
                }}
              >
                <TabIcon
                  icon={
                    <MaterialIcons name="search" size={30} color={"#19212f"} />
                  }
                  color={color}
                />
              </View>
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
                  <MaterialIcons name="settings" size={28} color={"#fff"} />
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
                    size={28}
                    color={"#fff"}
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
    padding: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  focusedContainer: {
    borderBottomWidth: 2,
    borderBottomColor: "#ff4605",
  },
});
