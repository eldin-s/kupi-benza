import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import { getFontSize } from "../../utils.js/getFontSize";
import { useTheme } from "../../providers/ThemeProvider";

const Informations = () => {
  const { theme } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.bgShade }]}>
      <Text style={[styles.title, { color: theme.text }]}>
        Opšte informacije:
      </Text>

      <View style={styles.column}>
        <View style={styles.row}>
          <Text style={[styles.label, { color: theme.text }]}>Stanje:</Text>
          <Text style={[styles.value, { color: theme.color }]}>Polovno</Text>
        </View>
        <View style={styles.row}>
          <Text style={[styles.label, { color: theme.text }]}>Model:</Text>
          <Text style={[styles.value, { color: theme.color }]}>GLE 63 AMG</Text>
        </View>
        <View style={styles.row}>
          <Text style={[styles.label, { color: theme.text }]}>Menjac:</Text>
          <Text style={[styles.value, { color: theme.color }]}>Automatik</Text>
        </View>
        <View style={styles.row}>
          <Text style={[styles.label, { color: theme.text }]}>Godiste:</Text>
          <Text style={[styles.value, { color: theme.color }]}>2023</Text>
        </View>
        <View style={styles.row}>
          <Text style={[styles.label, { color: theme.text }]}>
            Kilometraza:
          </Text>
          <Text style={[styles.value, { color: theme.color }]}>2.300km</Text>
        </View>
        <View style={styles.row}>
          <Text style={[styles.label, { color: theme.text }]}>Karoserija:</Text>
          <Text style={[styles.value, { color: theme.color }]}>Dzip/Suv</Text>
        </View>
      </View>
      <View style={styles.column}>
        <View style={styles.row}>
          <Text style={[styles.label, { color: theme.text }]}>Kubikaza:</Text>
          <Text style={[styles.value, { color: theme.color }]}>3982cm</Text>
        </View>
        <View style={styles.row}>
          <Text style={[styles.label, { color: theme.text }]}>Snaga:</Text>
          <Text style={[styles.value, { color: theme.color }]}>
            450/612 (k@/KS)
          </Text>
        </View>
        <View style={styles.row}>
          <Text style={[styles.label, { color: theme.text }]}>Klima:</Text>
          <Text style={[styles.value, { color: theme.color }]}>Automatska</Text>
        </View>
        <View style={styles.row}>
          <Text style={[styles.label, { color: theme.text }]}>Boja:</Text>
          <Text style={[styles.value, { color: theme.color }]}>Crna</Text>
        </View>
        <View style={styles.row}>
          <Text style={[styles.label, { color: theme.text }]}>Pogon:</Text>
          <Text style={[styles.value, { color: theme.color }]}>4x4</Text>
        </View>
        <View style={styles.row}>
          <Text style={[styles.label, { color: theme.text }]}>Gorivo:</Text>
          <Text style={[styles.value, { color: theme.color }]}>Benzin</Text>
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
