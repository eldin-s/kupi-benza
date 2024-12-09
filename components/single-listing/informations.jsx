import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import { getFontSize } from "../../utils.js/getFontSize";
import { useTheme } from "../../providers/ThemeProvider";

const Informations = ({ listing }) => {
  const { theme } = useTheme();

  const {
    car_state = "",
    model = "",
    transmission = "",
    production_year = "",
    mileage = "",
    car_type = "",
    engine_size = "",
    power = "",
    color = "",
    drivetrain = "",
    fuel_type = "",
  } = listing || {};

  return (
    <View style={[styles.container, { backgroundColor: theme.bgShade }]}>
      <Text style={[styles.title, { color: theme.text }]}>
        Opšte informacije:
      </Text>

      <View style={styles.column}>
        <View style={styles.row}>
          <Text style={[styles.label, { color: theme.text }]}>Stanje:</Text>
          <Text style={[styles.value, { color: theme.text }]}>{car_state}</Text>
        </View>
        <View style={styles.row}>
          <Text style={[styles.label, { color: theme.text }]}>Model:</Text>
          <Text style={[styles.value, { color: theme.text }]}>{model}</Text>
        </View>
        <View style={styles.row}>
          <Text style={[styles.label, { color: theme.text }]}>Menjac:</Text>
          <Text style={[styles.value, { color: theme.text }]}>
            {transmission}
          </Text>
        </View>
        <View style={styles.row}>
          <Text style={[styles.label, { color: theme.text }]}>Godiste:</Text>
          <Text style={[styles.value, { color: theme.text }]}>
            {production_year}
          </Text>
        </View>
        <View style={styles.row}>
          <Text style={[styles.label, { color: theme.text }]}>
            Kilometraža:
          </Text>
          <Text style={[styles.value, { color: theme.text }]}>{mileage}</Text>
        </View>
        <View style={styles.row}>
          <Text style={[styles.label, { color: theme.text }]}>Karoserija:</Text>
          <Text style={[styles.value, { color: theme.text }]}>{car_type}</Text>
        </View>
      </View>
      <View style={styles.column}>
        <View style={styles.row}>
          <Text style={[styles.label, { color: theme.text }]}>Kubikaza:</Text>
          <Text style={[styles.value, { color: theme.text }]}>
            {engine_size}
          </Text>
        </View>
        <View style={styles.row}>
          <Text style={[styles.label, { color: theme.text }]}>Snaga:</Text>
          <Text style={[styles.value, { color: theme.text }]}>
            {power} (/KS)
          </Text>
        </View>
        <View style={styles.row}>
          <Text style={[styles.label, { color: theme.text }]}>Klima:</Text>
          <Text style={[styles.value, { color: theme.text }]}>Automatska</Text>
        </View>
        <View style={styles.row}>
          <Text style={[styles.label, { color: theme.text }]}>Boja:</Text>
          <Text style={[styles.value, { color: theme.text }]}>{color}</Text>
        </View>
        <View style={styles.row}>
          <Text style={[styles.label, { color: theme.text }]}>Pogon:</Text>
          <Text style={[styles.value, { color: theme.text }]}>
            {drivetrain}
          </Text>
        </View>
        <View style={styles.row}>
          <Text style={[styles.label, { color: theme.text }]}>Gorivo:</Text>
          <Text style={[styles.value, { color: theme.text }]}>{fuel_type}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginTop: verticalScale(10),
    borderRadius: moderateScale(14),
    paddingHorizontal: scale(20),
  },
  title: {
    fontSize: getFontSize(20),
    fontFamily: "Montserrat-Regular",
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
    fontFamily: "Montserrat-Regular",
  },
  value: {
    fontFamily: "Montserrat-Bold",
  },
});

export default Informations;
