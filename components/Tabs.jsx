import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  StyleSheet,
} from "react-native";
import { useTheme } from "../providers/ThemeProvider";
import DefaultText from "./ui/DefaultText";
import AboutCar from "./dashboard/car-service/about-car";
import ScheduleService from "./dashboard/car-service/schedule-service";

const Tabs = ({ closeModal }) => {
  const { theme } = useTheme();
  const [selectedTab, setSelectedTab] = useState("about");
  const animatedValue = useState(new Animated.Value(0))[0];

  const handleTabPress = (tab) => {
    setSelectedTab(tab);
    Animated.timing(animatedValue, {
      toValue: tab === "about" ? 0 : 1,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const translateX = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [2, 206], // Adjust based on tab width
  });

  return (
    <View style={styles.container}>
      <View style={[styles.tabContainer, { backgroundColor: theme.bgShade }]}>
        <Animated.View
          style={[
            styles.activeBackground,
            { transform: [{ translateX }], backgroundColor: theme.bgColor },
          ]}
        />
        <TouchableOpacity
          style={styles.tab}
          onPress={() => handleTabPress("about")}
        >
          <DefaultText style={styles.tabText}>O VOZILU</DefaultText>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.tab}
          onPress={() => handleTabPress("service")}
        >
          <DefaultText style={styles.tabText}>ZAKAZI SERVIS</DefaultText>
        </TouchableOpacity>
      </View>
      {selectedTab === "about" ? (
        <AboutCar />
      ) : (
        <ScheduleService closeModal={closeModal} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  tabContainer: {
    flexDirection: "row",
    borderRadius: 16,
    position: "relative",
    overflow: "hidden",
    padding: 2,
    alignItems: "center",
  },
  activeBackground: {
    position: "absolute",
    width: 200, // Adjust width to fit tab
    height: "100%",
    borderRadius: 16,
  },
  tab: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 12,
  },
  tabText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  contentContainer: {
    marginTop: 20,
    padding: 20,
    backgroundColor: "#f9f9f9",
    borderRadius: 10,
    alignItems: "center",
  },
});

export default Tabs;
