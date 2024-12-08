import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import { getFontSize } from "../../utils.js/getFontSize";

const SearchSingleCard = ({ listing }) => {
  const {
    car_images = [],
    model = "",
    power = "",
    car_state = "",
    production_year = "",
    engine_size = "",
    price = "",
  } = listing.cars || {};

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

      <View style={{ flex: 1 }}>
        <View
          style={{
            padding: moderateScale(10),
            justifyContent: "space-between",
            flex: 1,
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

          {/* DETAILS */}
          <View style={{ flexDirection: "row", columnGap: scale(10) }}>
            <View
              style={{
                gap: scale(4),
              }}
            >
              <Text style={styles.detailsText}>{production_year} god.</Text>

              <Text style={styles.detailsText}>{engine_size}cm</Text>
            </View>

            <View
              style={{
                gap: scale(4),
              }}
            >
              <Text
                style={{
                  fontFamily: "Montserrat-SemiBold",
                  color: "#fff",
                  fontSize: getFontSize(12),
                  backgroundColor: "#ff4605",
                  paddingHorizontal: scale(4),
                  borderRadius: moderateScale(4),
                }}
              >
                NOVO
              </Text>
              <Text style={styles.detailsText}>{power}ks</Text>
            </View>
          </View>

          <View
            style={{
              flexDirection: "row",
              alignItems: "flex-end",
              justifyContent: "space-between",
              gap: scale(4),
            }}
          >
            <Text
              style={{
                fontFamily: "Montserrat-SemiBold",
                color: "#fff",
                fontSize: getFontSize(12),
                backgroundColor: "#ff4605",
                paddingHorizontal: scale(6),
                borderRadius: moderateScale(4),
              }}
            >
              GARANCIJA
            </Text>

            <View>
              <Text style={{ color: "#dddddd", fontSize: getFontSize(11) }}>
                cena
              </Text>
              <Text
                style={{
                  color: "#ff4605",
                  fontSize: getFontSize(20),
                  fontFamily: "Montserrat-SemiBold",
                  marginTop: -4,
                }}
              >
                Upit
              </Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default SearchSingleCard;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "#19212f",
    borderRadius: moderateScale(14),
    width: "100%",
    overflow: "hidden",
  },
  imageContainer: {
    width: "45%",
    height: verticalScale(120),
  },
  image: {
    width: "100%",
    height: "100%",
  },
  detailsText: {
    color: "#ddd",
    fontSize: getFontSize(12),
    fontFamily: "Montserrat-Regular",
  },
});
