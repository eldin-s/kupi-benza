import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { scale, verticalScale } from "react-native-size-matters";
import { getFontSize } from "../../utils.js/getFontSize";
import amg from "../../assets/images/AMG-Logo.png";

const Facts = () => {
  return (
    <View style={styles.container}>
      <View style={styles.block}>
        <Text
          style={{
            color: "#fff",
            fontFamily: "Montserrat-Regular",
            fontSize: getFontSize(20),
          }}
        >
          DA LI STE {"\n"}
          <Text style={{ color: "#ff4605", fontFamily: "Montserrat-Bold" }}>
            ZNALI?
          </Text>
        </Text>

        <View style={styles.border} />

        <Image
          source={amg}
          resizeMode="contain"
          style={{ width: scale(120), height: verticalScale(16) }}
        />
      </View>

      <View
        style={{ marginTop: verticalScale(25), paddingHorizontal: scale(14) }}
      >
        <Text
          style={{
            color: "white",
            fontFamily: "Montserrat-SemiBold",
            fontSize: getFontSize(16),
          }}
        >
          Da li ste znali da je{" "}
          <Text style={{ color: "#ff4605" }}>AMG tjunirao i</Text>
          <Text style={{ color: "#ff4605" }}>dizel kombi</Text>
        </Text>

        <View style={styles.textSliderContainer}>
          <View style={styles.points} />
          <View style={styles.points} />
          <View style={styles.points} />
        </View>
      </View>

      <View style={styles.backgroundShape} />
    </View>
  );
};

export default Facts;

const styles = StyleSheet.create({
  container: {
    marginVertical: verticalScale(20),
  },
  block: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#0f141e",
    padding: scale(14),
  },
  border: {
    borderRightWidth: 1,
    borderRightColor: "#ff4605",
    width: 2,
    height: "100%",
  },
  textSliderContainer: {
    paddingHorizontal: scale(14),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
    marginTop: 4,
  },
  points: {
    width: 8,
    height: 8,
    borderWidth: 1,
    borderColor: "#ff4605",
    borderRadius: 3,
  },
  backgroundShape: {
    backgroundColor: "#19212f",
    width: scale(500),
    height: scale(500),
    position: "absolute",
    zIndex: -10,
    left: scale(-200),
    bottom: -20,
    borderRadius: 300,
  },
});
