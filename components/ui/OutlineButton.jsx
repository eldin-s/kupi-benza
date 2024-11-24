import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { moderateScale, scale } from "react-native-size-matters";

const OutlineButton = ({ children, icon, onPress, background, textColor }) => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        !icon && { gap: 0 },
        { backgroundColor: background },
      ]}
      onPress={onPress}
    >
      {icon && <>{icon}</>}
      {children && (
        <Text style={[styles.text, { color: textColor }]}>{children}</Text>
      )}
    </TouchableOpacity>
  );
};

export default OutlineButton;

const styles = StyleSheet.create({
  button: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ff4605",
    padding: moderateScale(10),
    borderRadius: moderateScale(14),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: scale(6),
  },

  text: {
    fontFamily: "Montserrat-Bold",
    letterSpacing: 0.05,
  },
});
