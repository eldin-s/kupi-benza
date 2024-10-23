import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { moderateScale, verticalScale } from "react-native-size-matters";

const PrimaryButton = ({ children, onPress, variant = "default" }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.button, variant === "light" ? styles.lightButton : null]}
    >
      <Text
        style={[styles.text, variant === "light" ? styles.lightText : null]}
      >
        {children}
      </Text>
    </TouchableOpacity>
  );
};

export default PrimaryButton;

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#ff4605",
    borderRadius: moderateScale(14),
    paddingVertical: moderateScale(12),
    alignItems: "center",
    marginBottom: verticalScale(14),
  },
  lightButton: {
    backgroundColor: "#fff",
  },
  text: {
    color: "#fff",
    letterSpacing: 0.5,
    fontFamily: "Montserrat-Bold",
  },
  lightText: {
    color: "#ff4605",
  },
});
