import { StyleSheet, View } from "react-native";
import SigninForm from "../components/forms/signin-form";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link, Stack } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";

const Login = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      <View
        style={{
          position: "absolute",
          top: verticalScale(30),
          left: scale(10),
        }}
      >
        <Link href={"/"} style={{ color: "#fff", textAlign: "center" }}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </Link>
      </View>

      <SigninForm />
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
    backgroundColor: "#0f141e",
    padding: moderateScale(10),
    position: "relative",
  },
});
