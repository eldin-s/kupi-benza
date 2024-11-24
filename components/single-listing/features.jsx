import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import { getFontSize } from "../../utils.js/getFontSize";
import { useTheme } from "../../providers/ThemeProvider";

const Features = () => {
  const { theme } = useTheme();
  return (
    <View style={[styles.container, { backgroundColor: theme.bgShade }]}>
      <Text style={[styles.title, { color: theme.text }]}>Oprema:</Text>

      <View style={styles.column}>
        <Text style={[styles.label, { color: theme.text }]}>
          Branici u boji auta
        </Text>
        <Text style={[styles.label, { color: theme.text }]}>Servo volan</Text>
        <Text style={[styles.label, { color: theme.text }]}>
          Multifuncionalni volan
        </Text>
        <Text style={[styles.label, { color: theme.text }]}>
          Daljinsko zakljucavanje
        </Text>
        <Text style={[styles.label, { color: theme.text }]}>Putni racunar</Text>
        <Text style={[styles.label, { color: theme.text }]}>
          Tonirana stakla
        </Text>
        <Text style={[styles.label, { color: theme.text }]}>
          Elektricni odizaci
        </Text>
        <Text style={[styles.label, { color: theme.text }]}>
          Elektricni retrovizori
        </Text>
        <Text style={[styles.label, { color: theme.text }]}>
          Grejaci retrovizora
        </Text>
        <Text style={[styles.label, { color: theme.text }]}>
          Sedista to visini
        </Text>
        <Text style={[styles.label, { color: theme.text }]}>
          Elektro podesiva sedista
        </Text>
        <Text style={[styles.label, { color: theme.text }]}>
          Grejanje sedista
        </Text>
        <Text style={[styles.label, { color: theme.text }]}>
          Svetla za maglu
        </Text>
        <Text style={[styles.label, { color: theme.text }]}>
          Senzori za svetla
        </Text>
        <Text style={[styles.label, { color: theme.text }]}>
          Senzori za kisu
        </Text>
        <Text style={[styles.label, { color: theme.text }]}>
          Parking senzori
        </Text>
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
