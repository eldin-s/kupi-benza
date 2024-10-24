import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import { getFontSize } from "../../utils.js/getFontSize";

const CarCard = ({ listing }) => {
  const {
    car_images = [],
    model = "",
    power = "",
    car_state = "",
    production_year = "",
    price = "",
  } = listing || {};

  return (
    <View style={styles.container}>
      {/* CAR IMAGE */}
      <View style={styles.imageContainer}>
        {car_images[0] && (
          <Image
            source={{ uri: car_images[0] }}
            resizeMode="cover"
            style={styles.image}
          />
        )}
      </View>

      <View
        style={{
          padding: moderateScale(10),
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Text
          style={{
            color: "#fff",
            fontFamily: "Montserrat-Medium",
            textTransform: "uppercase",
          }}
        >
          {model}
        </Text>

        <Text
          style={{
            fontFamily: "Montserrat-SemiBold",
            color: "#fff",
            fontSize: getFontSize(12),
            backgroundColor: "#ff4605",
            paddingVertical: verticalScale(2),
            paddingHorizontal: scale(6),
            borderRadius: moderateScale(4),
          }}
        >
          Upit
        </Text>
      </View>
    </View>
  );
};

export default CarCard;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#19212f",
    borderRadius: moderateScale(14),
    borderRadius: moderateScale(14),
    width: "100%",
    overflow: "hidden",
  },
  imageContainer: {
    width: "100%",
    height: verticalScale(110),
  },
  image: {
    width: "100%",
    height: "100%",
  },
});
