import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import { Stack, useLocalSearchParams } from "expo-router";
import { useSingleListing } from "../api/listings";
import ImageSlider from "../../components/ui/image-slider";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import { getFontSize } from "../../utils.js/getFontSize";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import OutlineButton from "../../components/ui/OutlineButton";
import Informations from "../../components/single-listing/informations";
import Safety from "../../components/single-listing/safety";
import Features from "../../components/single-listing/features";

const ListingSingle = () => {
  const { id } = useLocalSearchParams();
  const { data: listing, error, isLoading } = useSingleListing(id);

  if (isLoading) {
    return <ActivityIndicator color={"#fff"} />;
  }

  if (error) {
    return (
      <Text style={{ color: "#fff", textAlign: "center" }}>
        Trenutno nije moguće prikazati oglas
      </Text>
    );
  }

  return (
    <ScrollView>
      <View style={styles.container}>
        <Stack.Screen
          options={{
            title: listing.model,
            headerStyle: { backgroundColor: "#0f141e" },
            headerTintColor: "#fff",
          }}
        />
        {listing && listing.car_images ? (
          <ImageSlider images={listing.car_images} />
        ) : (
          <Text>Loading...</Text>
        )}

        <View style={styles.detailsContainer}>
          <View style={{ borderBottomWidth: 2, borderColor: "#ff4605" }}>
            <Text
              style={{
                color: "#fff",
                fontFamily: "Montserrat-Bold",
                fontSize: getFontSize(28),
                textAlign: "center",
              }}
            >
              {listing.model}
            </Text>
            <Text
              style={{
                color: "#fff",
                fontFamily: "Montserrat-Regular",
                fontSize: getFontSize(36),
                textAlign: "center",
                paddingTop: verticalScale(12),
              }}
            >
              198.000 €
            </Text>
          </View>

          <View style={styles.shortDetails}>
            <View style={styles.shortDetail}>
              <FontAwesome name="road" size={24} color="#fff" />
              <Text style={{ color: "#fff" }}>2,300km</Text>
            </View>

            <View style={styles.shortDetail}>
              <MaterialCommunityIcons
                name="car-shift-pattern"
                size={24}
                color="#fff"
              />
              <Text style={{ color: "#fff" }}>Automatik</Text>
            </View>

            <View style={styles.shortDetail}>
              <MaterialCommunityIcons
                name="gas-station-outline"
                size={24}
                color="#fff"
              />
              <Text style={{ color: "#fff" }}>Benzin</Text>
            </View>

            <View style={styles.shortDetail}>
              <MaterialCommunityIcons
                name="engine-outline"
                size={24}
                color="#fff"
              />
              <Text style={{ color: "#fff" }}>450/ks</Text>
            </View>
          </View>

          <View
            style={{
              alignItems: "center",
              paddingVertical: verticalScale(10),
            }}
          >
            <Text
              style={{
                fontSize: getFontSize(13),
                color: "#9ca3af",
                marginBottom: verticalScale(10),
              }}
            >
              Ukoliko vam je potrebna {"\n"} pomoć kontaktirajte nas
            </Text>

            <View style={styles.buttons}>
              <OutlineButton
                icon={<FontAwesome name="phone" size={24} color="#ff4605" />}
              >
                Pozovite
              </OutlineButton>
              <OutlineButton
                icon={
                  <MaterialCommunityIcons
                    name="email-outline"
                    size={24}
                    color="#ff4605"
                  />
                }
              >
                Pozovite
              </OutlineButton>
              <OutlineButton
                icon={
                  <MaterialIcons
                    name="local-parking"
                    size={24}
                    color="#ff4605"
                  />
                }
              >
                Pozovite
              </OutlineButton>
            </View>
          </View>
        </View>

        <Informations />
        <Safety />
        <Features />
      </View>
    </ScrollView>
  );
};

export default ListingSingle;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0f141e",
    alignItems: "center",
    paddingHorizontal: scale(14),
  },
  detailsContainer: {
    width: "100%",
    marginTop: verticalScale(10),
    backgroundColor: "#19212f",
    borderRadius: moderateScale(14),
    padding: moderateScale(16),
  },
  shortDetails: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "space-between",
    columnGap: scale(40),
    rowGap: verticalScale(10),

    paddingVertical: verticalScale(10),
    borderBottomWidth: 2,
    borderColor: "#ff4605",
  },
  shortDetail: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    gap: 8,
  },

  buttons: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    flexWrap: "wrap",
    gap: scale(10),
  },
});
