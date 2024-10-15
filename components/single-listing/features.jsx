import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import { getFontSize } from "../../utils.js/getFontSize";

const Features = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>OPREMA</Text>

      <View style={styles.column}>
        <Text style={styles.label}>Branici u boji auta</Text>
        <Text style={styles.label}>Servo volan</Text>
        <Text style={styles.label}>Multifuncionalni volan</Text>
        <Text style={styles.label}>Daljinsko zakljucavanje</Text>
        <Text style={styles.label}>Putni racunar</Text>
        <Text style={styles.label}>Tonirana stakla</Text>
        <Text style={styles.label}>Elektricni odizaci</Text>
        <Text style={styles.label}>Elektricni retrovizori</Text>
        <Text style={styles.label}>Grejaci retrovizora</Text>
        <Text style={styles.label}>Sedista to visini</Text>
        <Text style={styles.label}>Elektro podesiva sedista</Text>
        <Text style={styles.label}>Grejanje sedista</Text>
        <Text style={styles.label}>Svetla za maglu</Text>
        <Text style={styles.label}>Senzori za svetla</Text>
        <Text style={styles.label}>Senzori za kisu</Text>
        <Text style={styles.label}>Parking senzori</Text>
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
    padding: moderateScale(16),
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
