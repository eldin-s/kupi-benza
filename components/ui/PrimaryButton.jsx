import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { moderateScale } from "react-native-size-matters";

const PrimaryButton = ({ children, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.button}>
      <Text style={styles.text}>{children}</Text>
    </TouchableOpacity>
  );
};

export default PrimaryButton;

const styles = StyleSheet.create({
  button: {
    width: "100%",
    backgroundColor: "#ff4605",
    borderRadius: moderateScale(14),
    paddingVertical: moderateScale(12),

    alignItems: "center",
  },

  text: {
    color: "#fff",
    letterSpacing: 0.5,
    fontFamily: "Montserrat-Bold",
  },
});
