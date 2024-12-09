import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import { getFontSize } from "../../utils.js/getFontSize";
import { useTheme } from "../../providers/ThemeProvider";
import DefaultText from "../ui/DefaultText";

const Features = ({ features }) => {
  const { theme } = useTheme();
  return (
    <View style={[styles.container, { backgroundColor: theme.bgShade }]}>
      <Text style={[styles.title, { color: theme.text }]}>Oprema:</Text>

      <View style={styles.column}>
        {features?.map((feature, index) => (
          <DefaultText key={index}>{feature}</DefaultText>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginVertical: verticalScale(10),
    backgroundColor: "#19212f",
    borderRadius: moderateScale(14),
    paddingHorizontal: scale(20),
  },
  title: {
    fontSize: getFontSize(20),
    fontFamily: "Montserrat-Regular",
    color: "#fff",
    paddingLeft: verticalScale(10),
    paddingVertical: verticalScale(16),
    borderBottomWidth: 1,
    borderBottomColor: "#ff4605",
  },
  column: {
    flex: 1,
    paddingVertical: verticalScale(10),
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingVertical: 4,
  },
  label: {
    color: "#fff",
    fontFamily: "Montserrat-Regular",
  },
});

export default Features;
