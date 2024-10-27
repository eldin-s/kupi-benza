import { StyleSheet } from "react-native";
import SigninForm from "../components/forms/signin-form";
import { moderateScale } from "react-native-size-matters";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link, Stack } from "expo-router";

const Login = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      <Link href={"/"} style={{ color: "#fff", textAlign: "center" }}>
        {"<"}- Vrati se na pocetnu
      </Link>
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
  },
});
