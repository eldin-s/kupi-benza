import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import React from "react";
import DefaultText from "../../ui/DefaultText";
import { useTheme } from "../../../providers/ThemeProvider";
import { getFontSize } from "../../../utils.js/getFontSize";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useSingleListing } from "../../../hooks/listings";
import { scale, verticalScale } from "react-native-size-matters";

const AboutCar = ({listing}) => {
  const { theme } = useTheme();
  console.log("listing", listing);

  return (
    <>
      {/* <View
        style={[styles.contentContainer, { backgroundColor: theme.bgShade }]}
      >
        <DefaultText
          style={{ textAlign: "center", fontSize: getFontSize(20) }}
          weight="semibold"
        >
          INFORMACIJE O ISPORUCI
        </DefaultText>

        <View
          style={{
            marginTop: 10,
            width: "100%",
            flexDirection: "row",
            gap: 4,
            justifyContent: "space-between",
          }}
        >
          <View>
            <DefaultText
              weight="semibold"
              style={{ fontSize: getFontSize(10) }}
            >
              DATUM ISPORUKE
            </DefaultText>
            <DefaultText
              color={theme.primary}
              weight="semibold"
              style={{ textAlign: "center", fontSize: getFontSize(10) }}
            >
              02.02.2025
            </DefaultText>
          </View>

          <View>
            <DefaultText
              weight="semibold"
              style={{ fontSize: getFontSize(10) }}
            >
              PRVA REGISTRACIJA
            </DefaultText>
            <DefaultText
              color={theme.primary}
              weight="semibold"
              style={{ textAlign: "center", fontSize: getFontSize(10) }}
            >
              05.02.2025
            </DefaultText>
          </View>

          <View>
            <DefaultText
              weight="semibold"
              style={{ fontSize: getFontSize(10) }}
            >
              NACIN ISPORUKE
            </DefaultText>
            <DefaultText
              color={theme.primary}
              weight="semibold"
              style={{ textAlign: "center", fontSize: getFontSize(10) }}
            >
              LICNO PREUZETO
            </DefaultText>
          </View>
        </View>
      </View> */}

      <View
        style={[styles.contentContainer, { backgroundColor: theme.bgShade }]}
      >
        <DefaultText
          style={{ textAlign: "center", fontSize: getFontSize(20) }}
          weight="semibold"
        >
          SPECIFIKACIJE
        </DefaultText>

        <View
          style={{
            marginTop: 10,
            width: "100%",
            flexDirection: "row",
            gap: 4,
            justifyContent: "space-between",
          }}
        >
          <View style={{ flexDirection: "row", gap: 4, alignItems: "center" }}>
            <MaterialCommunityIcons
              name="engine-outline"
              size={20}
              color="#ff4605"
            />
            <DefaultText
              weight="semibold"
              style={{ fontSize: getFontSize(10) }}
            >
              {listing.engine_size} L
            </DefaultText>
          </View>

          <View style={{ flexDirection: "row", gap: 4, alignItems: "center" }}>
            <MaterialCommunityIcons
              name="engine-outline"
              size={20}
              color="#ff4605"
            />
            <DefaultText
              weight="semibold"
              style={{ fontSize: getFontSize(10) }}
            >
              {listing.power} KS
            </DefaultText>
          </View>

          <View style={{ flexDirection: "row", gap: 4, alignItems: "center" }}>
            <MaterialCommunityIcons
              name="engine-outline"
              size={20}
              color="#ff4605"
            />
            <DefaultText
              weight="semibold"
              style={{ fontSize: getFontSize(10) }}
            >
              {listing.transmission}
            </DefaultText>
          </View>
        </View>

        <View
          style={{
            marginTop: 10,
            width: "100%",
            flexDirection: "row",
            gap: 4,
            justifyContent: "space-between",
          }}
        >
          <View>
            <DefaultText
              weight="semibold"
              style={{ fontSize: getFontSize(10), textAlign: "center" }}
            >
              GODISTE
            </DefaultText>
            <DefaultText
              color={theme.primary}
              weight="semibold"
              style={{ textAlign: "center", fontSize: getFontSize(10) }}
            >
              {listing.production_year}
            </DefaultText>
          </View>

          <View>
            <DefaultText
              weight="semibold"
              style={{ fontSize: getFontSize(10), textAlign: "center" }}
            >
              UBRZANJE
            </DefaultText>
            <DefaultText
              color={theme.primary}
              weight="semibold"
              style={{ textAlign: "center", fontSize: getFontSize(10) }}
            >
              5,5S (0-100KM/H)
            </DefaultText>
          </View>

          <View>
            <DefaultText
              weight="semibold"
              style={{ fontSize: getFontSize(10), textAlign: "center" }}
            >
              GORIVO
            </DefaultText>
            <DefaultText
              color={theme.primary}
              weight="semibold"
              style={{ textAlign: "center", fontSize: getFontSize(10) }}
            >
              {listing.fuel_type}
            </DefaultText>
          </View>
        </View>
      </View>

      <View
        style={[styles.contentContainer, { backgroundColor: theme.bgShade }]}
      >
        <DefaultText
          style={{ textAlign: "center", fontSize: getFontSize(20) }}
          weight="semibold"
        >
          LISTA OPREME
        </DefaultText>

        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            gap: scale(4),
            justifyContent: "space-between",
          }}
        >
          {listing.car_features.map((feature, index) => (
            <View
              key={index}
              style={{
                width: "48%", // Each item takes up approximately half the width
                marginBottom: verticalScale(2), // Add spacing between rows
              }}
            >
              <DefaultText>*{feature}</DefaultText>
            </View>
          ))}
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  contentContainer: {
    marginTop: 20,
    padding: 20,
    backgroundColor: "#f9f9f9",
    borderRadius: 16,
  },
});

export default AboutCar;
