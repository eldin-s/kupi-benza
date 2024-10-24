import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import { getFontSize } from "../../utils.js/getFontSize";

const Informations = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Opšte informacije:</Text>

      <View style={styles.column}>
        <View style={styles.row}>
          <Text style={styles.label}>Stanje:</Text>
          <Text style={styles.value}>Polovno</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Model:</Text>
          <Text style={styles.value}>GLE 63 AMG</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Menjac:</Text>
          <Text style={styles.value}>Automatik</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Godiste:</Text>
          <Text style={styles.value}>2023</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Kilometraza:</Text>
          <Text style={styles.value}>2.300km</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Karoserija:</Text>
          <Text style={styles.value}>Dzip/Suv</Text>
        </View>
      </View>
      <View style={styles.column}>
        <View style={styles.row}>
          <Text style={styles.label}>Kubikaza:</Text>
          <Text style={styles.value}>3982cm</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Snaga:</Text>
          <Text style={styles.value}>450/612 (k@/KS)</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Klima:</Text>
          <Text style={styles.value}>Automatska</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Boja:</Text>
          <Text style={styles.value}>Crna</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Pogon:</Text>
          <Text style={styles.value}>4x4</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Gorivo:</Text>
          <Text style={styles.value}>Benzin</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginTop: verticalScale(10),
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
    color: "#ccc",
    fontFamily: "Montserrat-Regular",
  },
  value: {
    color: "#fff",
    fontFamily: "Montserrat-Bold",
  },
});

export default Informations;
