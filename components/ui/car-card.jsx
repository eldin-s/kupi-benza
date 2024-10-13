import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";

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

      {/* CAR DETAILS */}
      <View style={{ padding: moderateScale(10) }}>
        <Text style={styles.text}>{model}</Text>

        <View
          style={{
            height: 1,
            backgroundColor: "#d1d5db",
            paddingHorizontal: scale(4),
          }}
        />

        <View style={styles.detailsContainer}>
          <View
            style={{
              flexDirection: "row",
              gap: scale(4),
            }}
          >
            <Text style={{ color: "white" }}>
              {production_year}
              <Text>. god</Text>
            </Text>

            {car_state === "Novo" && <Text style={styles.textNew}>NOVO</Text>}

            <Text style={{ color: "#fff" }}>
              {power} <Text>ks</Text>
            </Text>
          </View>

          <Text style={{ color: "#fff", alignItems: "self-end" }}>
            Cena {"\n"}
            <Text style={{ fontFamily: "Montserrat-Bold", color: "#ff4605" }}>
              UPIT
            </Text>
          </Text>
        </View>
      </View>
    </View>
  );
};

export default CarCard;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#19212f",
    borderRadius: moderateScale(14),
    marginBottom: verticalScale(20),
    borderRadius: moderateScale(14),
    overflow: "hidden",
  },
  imageContainer: {
    width: "100%",
    height: verticalScale(190),
  },
  image: {
    width: "100%",
    height: "100%",
  },
  text: {
    color: "#fff",
    fontFamily: "Montserrat-Medium",
    paddingBottom: verticalScale(10),
  },

  detailsContainer: {
    flexDirection: "row",
    gap: moderateScale(4),
    paddingVertical: verticalScale(4),
    alignItems: "flex-start",
    justifyContent: "space-between",
  },

  textNew: {
    backgroundColor: "#ff4605",
    paddingHorizontal: scale(4),
    borderRadius: moderateScale(4),
    fontFamily: "Montserrat-SemiBold",
    letterSpacing: 0.25,
    color: "#fff",
  },
});
