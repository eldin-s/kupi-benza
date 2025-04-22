import { StyleSheet, View } from "react-native";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link, Stack, useRouter } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useTheme } from "../providers/ThemeProvider";
import signinGoogle from "../components/forms/signin-google";
import DefaultText from "../components/ui/DefaultText";
import CustomGoogleSignInButton from "../components/forms/custom-google-button";
import { useAuth } from "../providers/AuthProvider";
import { useEffect } from "react";

const Login = () => {
  const { theme } = useTheme();
  const { session, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && session) {
      setTimeout(() => {
        router.replace("/(tabs)/profile");
      }, 50);
    }
  }, [loading, session]);

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
        <Link href={"/"} style={{ textAlign: "center" }}>
          <Ionicons name="arrow-back" size={24} color={theme.text} />
        </Link>
      </View>

      <CustomGoogleSignInButton onPress={signinGoogle} />

      <DefaultText
        style={{
          textAlign: "center",
        }}
      >
        Da li ste admin?{" "}
        <Link href={"/admin-login"}>
          <DefaultText color={theme.primary}>Prijavi se kao admin</DefaultText>
        </Link>
      </DefaultText>
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
    gap: verticalScale(10),
    padding: moderateScale(10),
    position: "relative",
  },
});
