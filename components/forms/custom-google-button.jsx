import { TouchableOpacity, Text, Image, StyleSheet } from "react-native";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import AntDesign from '@expo/vector-icons/AntDesign';
import DefaultText from "../ui/DefaultText";
import { moderateScale, scale } from "react-native-size-matters";

const CustomGoogleSignInButton = ({ onPress }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <AntDesign name="google" size={24} color="white" />
      <DefaultText weight="semibold">Prijavi se putem Google</DefaultText>
    </TouchableOpacity>
  );
};

export default CustomGoogleSignInButton;

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: scale(4),
    backgroundColor: "#4285F4",
    padding: moderateScale(12),
    borderRadius: 5,
  },
});
