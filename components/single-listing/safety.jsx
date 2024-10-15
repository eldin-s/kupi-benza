import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import { getFontSize } from "../../utils.js/getFontSize";

const Safety = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>SIGURNOST</Text>

      <View style={styles.column}>
        <Text style={styles.label}>Airbag za vozaca</Text>
        <Text style={styles.label}>ABS</Text>
        <Text style={styles.label}>Centralno zakljucavanje</Text>
        <Text style={styles.label}>Automatsko kocenje</Text>
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

export default Safety;
