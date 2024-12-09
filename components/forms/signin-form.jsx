import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { moderateScale, verticalScale } from "react-native-size-matters";
import { useForm } from "react-hook-form";
import Input from "../ui/Input";
import { PixelRatio } from "react-native";
import PrimaryButton from "../ui/PrimaryButton";
import { useState } from "react";
import { Link, Stack, useRouter } from "expo-router";
import { supabase } from "../../lib/supabase";
import { getFontSize } from "../../utils.js/getFontSize";
import { useTheme } from "../../providers/ThemeProvider";
import DefaultText from "../ui/DefaultText";

const SigninForm = () => {
  const { theme } = useTheme();
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

      if (error) {
        setError("Prijava je neuspešna! Proverite podatke i pokušajte ponovo.");
      }

      router.replace("/(tabs)/profile");
    } catch (err) {
      setError("Prijava je neuspešna! Proverite podatke i pokušajte ponovo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />

      <DefaultText
        style={styles.heading}
        color={theme.primary}
        weight="semibold"
      >
        Prijavi se
      </DefaultText>

      {error && <DefaultText color="#d66f6f">{error}</DefaultText>}

      <View style={styles.inputBox}>
        {/* Email Input */}
        <DefaultText style={styles.label}>Email:</DefaultText>
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
          <DefaultText style={styles.error} color="#f87171">
            {errors.email.message}
          </DefaultText>
        )}
      </View>

      <View style={styles.inputBox}>
        {/* Password Input */}
        <DefaultText style={styles.label}>Lozinka:</DefaultText>
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
        {errors.password && (
          <DefaultText style={styles.error} color="#f87171">
            {errors.password.message}
          </DefaultText>
        )}
      </View>

      <View style={{ marginTop: verticalScale(8) }}>
        <PrimaryButton onPress={handleSubmit(handleFormSubmit)}>
          {loading ? (
            <ActivityIndicator size="small" color={theme.text} />
          ) : (
            <Text>Prijavi se</Text>
          )}
        </PrimaryButton>
      </View>

      <DefaultText
        style={{
          textAlign: "center",
        }}
      >
        Nemate račun?{" "}
        <Link href={"/sign-up"}>
          <DefaultText color={theme.primary}>Registruj se</DefaultText>
        </Link>
      </DefaultText>
    </View>
  );
};

export default SigninForm;

const styles = StyleSheet.create({
  container: {
    gap: moderateScale(20),
  },
  heading: {
    textAlign: "center",
    fontSize: getFontSize(28),
    paddingVertical: moderateScale(10),
  },
  inputBox: {
    position: "relative",
  },
  label: {
    marginBottom: moderateScale(6),
  },
  error: {
    position: "absolute",
    bottom: moderateScale(-16),
  },
});
