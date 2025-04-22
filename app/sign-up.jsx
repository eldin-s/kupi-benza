import { Button, StyleSheet, TextInput, View } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import SignupForm from "../components/forms/signup-form";
import { Link, Stack } from "expo-router";
import { useTheme } from "../providers/ThemeProvider";
import Ionicons from "@expo/vector-icons/Ionicons";
import Input from "../components/ui/Input";
import DefaultText from "../components/ui/DefaultText";
import PrimaryButton from "../components/ui/PrimaryButton";
import { getFontSize } from "../utils.js/getFontSize";

const ACCESS_PASS = "security_protect_!-1@2"

const Signup = () => {
  const { theme } = useTheme();
  const [inputPass, setInputPass] = useState("");
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [error, setError] = useState("");

  const handleAccess = () => {
    if (inputPass === ACCESS_PASS) {
      setIsAuthorized(true);
      setError("");
    } else {
      setError("Lozinka nije tacna. Pokusajte ponovo.");
    }
  };

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

      {!isAuthorized ? (
        <View style={{ padding: 20, alignItems: "center", gap: verticalScale(6), }}>
          <DefaultText style={{ fontSize: getFontSize(24), marginBottom: 10 }}>
            Ograničen pristup!
          </DefaultText>
          <DefaultText style={{ marginBottom: 10 }}>
            Pristup je ograničen samo za "Admin" korisnike. Ukoliko imate pristup Administratora, molimo unesinte ispod lozinku za pristup. 
          </DefaultText>
          <DefaultText style={{ marginBottom: 10 }}>
            Ukoliko želite dobiti "Admin" pristup, kontaktirajte: admin@kupibenza.com
          </DefaultText>

          <TextInput
            value={inputPass}
            onChangeText={setInputPass}
            placeholder="Pristup lozinka"
            placeholderTextColor={theme.text}
            secureTextEntry
            style={{
              borderWidth: 1,
              borderColor: theme.text,
              padding: 10,
              width: 200,
              marginBottom: 10,
              color: theme.text,
            }}
          />
          {error ? <DefaultText style={{ color: "red" }}>{error}</DefaultText> : null}
          <PrimaryButton onPress={handleAccess}>
            Potvrdi
          </PrimaryButton>
        </View>
      ) : (
        <SignupForm />
      )}
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