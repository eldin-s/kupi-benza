// components/ThemedText.js
import React from "react";
import { Text, StyleSheet } from "react-native";
import { useTheme } from "../../providers/ThemeProvider";

const fontStyles = {
  black: "Montserrat-Black",
  bold: "Montserrat-Bold",
  semibold: "Montserrat-SemiBold",
  medium: "Montserrat-Medium",
  regular: "Montserrat-Regular",
  light: "Montserrat-Light",
  thin: "Montserrat-Thin",
};

const DefaultText = ({
  style,
  weight = "regular",
  color,
  children,
  ...props
}) => {
  const { theme } = useTheme();
  const textColor = color || theme.text;

  return (
    <Text
      style={[
        styles.text,
        {
          color: textColor,
          fontFamily: fontStyles[weight] || fontStyles.regular,
        },
        style,
      ]}
      {...props}
    >
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    // Any default text styling you want, like fontFamily
  },
});

export default DefaultText;
