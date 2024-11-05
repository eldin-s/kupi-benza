import { StyleSheet, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import SignupForm from "../components/forms/signup-form";
import { Link, Stack } from "expo-router";
import { useTheme } from "../providers/ThemeProvider";
import Ionicons from "@expo/vector-icons/Ionicons";

const Signup = () => {
  const { theme } = useTheme();
  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.bgColor }]}
    >
      <Stack.Screen options={{ headerShown: false }} />

      <View
        style={{
          position: "absolute",
          top: verticalScale(30),
          left: scale(10),
        }}
      >
        <Link href={"/log-in"} style={{ textAlign: "center" }}>
          <Ionicons name="arrow-back" size={24} color={theme.text} />
        </Link>
      </View>
      <SignupForm />
    </SafeAreaView>
  );
};

export default Signup;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
    padding: moderateScale(10),
  },
});
