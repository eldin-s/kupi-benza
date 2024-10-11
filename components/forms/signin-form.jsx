import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { moderateScale } from "react-native-size-matters";
import { useForm } from "react-hook-form";
import Input from "../ui/Input";
import { PixelRatio } from "react-native";
import PrimaryButton from "../ui/PrimaryButton";
import { useState } from "react";
import { Link, Stack, useRouter } from "expo-router";
import { supabase } from "../../lib/supabase";

const fontScale = PixelRatio.getFontScale();
const getFontSize = (size) => size / fontScale;

const SigninForm = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleFormSubmit = async (data) => {
    try {
      setError("");
      setLoading(true);

      const { error } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      });
      // const response = await login(data);

      if (error) {
        console.log(error);
        setError(error.message);
      }

      router.replace("/(tabs)/profile");
    } catch (err) {
      console.log(err.message);
      setError("Prijava je neuspešna! Proverite podatke i probajte ponovo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />

      <Text style={styles.heading}>Prijavi se</Text>

      <View style={styles.inputBox}>
        {/* Email Input */}
        <Text style={styles.label}>Email:</Text>
        <Input
          control={control}
          name="email"
          placeholder="Unesite vaš email"
          keyboardType="email-address"
          autoCapitalize="none"
          rules={{
            required: "Email je obavezan.",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Unesite validan email.",
            },
          }}
        />
        {errors.email && (
          <Text style={styles.error}>{errors.email.message}</Text>
        )}
      </View>

      <View style={styles.inputBox}>
        {/* Password Input */}
        <Text style={styles.label}>Lozinka:</Text>
        <Input
          control={control}
          name="password"
          placeholder="Unesite vašu lozinku"
          secureTextEntry={true}
          rules={{
            required: "Lozinka je obavezna.",
            minLength: {
              value: 8,
              message: "Lozinka mora imati najmanje 8 karaktera.",
            },
          }}
        />
        {errors.email && (
          <Text style={styles.error}>{errors.email.message}</Text>
        )}
      </View>

      <PrimaryButton onPress={handleSubmit(handleFormSubmit)}>
        {loading ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : (
          <Text>Prijavi se</Text>
        )}
      </PrimaryButton>

      <Text
        style={{
          textAlign: "center",
          color: "#fff",
          fontFamily: "Montserrat-Regular",
        }}
      >
        Nemate račun?{" "}
        <Link href={"/sign-up"}>
          <Text style={{ color: "#ff4605" }}>Registruj se</Text>
        </Link>
      </Text>
    </View>
  );
};

export default SigninForm;

const styles = StyleSheet.create({
  container: {
    gap: moderateScale(20),
  },
  heading: {
    fontFamily: "Montserrat-SemiBold",
    color: "#ff4605",
    textAlign: "center",
    fontSize: getFontSize(28),
    paddingVertical: moderateScale(10),
  },
  inputBox: {
    position: "relative",
  },
  label: {
    color: "#fff",
    marginBottom: moderateScale(6),
  },
  error: {
    position: "absolute",
    bottom: moderateScale(-5),
    color: "#f87171",
  },
});
