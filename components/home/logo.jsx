import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import benzLogo from "../../assets/images/kupibenza-logo.png";
import { scale, verticalScale } from "react-native-size-matters";

const Logo = () => {
  return (
    <View
      style={{ marginHorizontal: scale(14), marginVertical: verticalScale(6) }}
    >
      <Image
        source={benzLogo}
        resizeMode="contain"
        style={{ width: scale(90), height: verticalScale(30) }}
      />
    </View>
  );
};

export default Logo;

const styles = StyleSheet.create({});
