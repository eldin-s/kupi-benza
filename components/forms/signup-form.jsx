import { useState } from "react";
import { useForm } from "react-hook-form";
import { ActivityIndicator, Alert, StyleSheet, Text, View } from "react-native";
import { moderateScale } from "react-native-size-matters";
import Input from "../ui/Input";
import PrimaryButton from "../ui/PrimaryButton";
import { Link, useRouter } from "expo-router";
import { getFontSize } from "../../utils.js/getFontSize";
import { signup } from "../../app/api/auth";

const SignupForm = () => {
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleFormSubmit = async (data) => {
    try {
      signup(data);
      router.replace("/(tabs)/profile");
    } catch (err) {
      Alert.alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Registruj se</Text>

      <View style={styles.inputBox}>
        {/* Name Input */}
        <Text style={styles.label}>Ime i Prezime:</Text>
        <Input
          control={control}
          name="fullName"
          placeholder="Unesite vaše ime i prezime"
          rules={{
            required: "Ime je obavezno.",
          }}
        />
        {errors.fullName && (
          <Text style={styles.error}>{errors.fullName.message}</Text>
        )}
      </View>

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
          <Text>Registruj se</Text>
        )}
      </PrimaryButton>

      <Text
        style={{
          textAlign: "center",
          color: "#fff",
          fontFamily: "Montserrat-Regular",
        }}
      >
        Već ste registrovani?{" "}
        <Link href={"/log-in"}>
          <Text style={{ color: "#ff4605" }}>Prijavi se</Text>
        </Link>
      </Text>
    </View>
  );
};

export default SignupForm;

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
