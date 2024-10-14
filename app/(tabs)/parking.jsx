import { View, Text, StyleSheet, Image } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import construction from "../../assets/construction.png";
import { scale, verticalScale } from "react-native-size-matters";

const Parking = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={construction}
        style={{ width: scale(150), height: verticalScale(120) }}
      />
    </SafeAreaView>
  );
};

export default Parking;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0f141e",
    alignItems: "center",
    justifyContent: "center",
  },
});
