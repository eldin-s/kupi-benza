import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { moderateScale, verticalScale } from "react-native-size-matters";

const OutlineButton = ({ children }) => {
  return (
    <TouchableOpacity style={styles.button}>
      <Text style={styles.text}>{children}</Text>
    </TouchableOpacity>
  );
};

export default OutlineButton;

const styles = StyleSheet.create({
  button: {
    borderWidth: 1,
    borderColor: "#ff4605",
    padding: moderateScale(14),
    borderRadius: moderateScale(14),
    width: "100%",
    marginVertical: verticalScale(16),
    alignItems: "center",
  },

  text: {
    fontFamily: "Montserrat-Bold",
    letterSpacing: 0.05,
    color: "#fff",
  },
});
