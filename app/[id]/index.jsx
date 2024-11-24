import {
  ActivityIndicator,
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
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
import { useAuth } from "../../providers/AuthProvider";
import { useCurrentUser, useSetParking } from "../api/user";
import { useTheme } from "../../providers/ThemeProvider";

const ListingSingle = () => {
  const { theme } = useTheme();
  const { id: listingId } = useLocalSearchParams();
  const [isParking, setIsParking] = useState(false);

  const { session } = useAuth();
  const { data: user } = useCurrentUser(session?.user?.id);
  const { data: listing, error, isLoading } = useSingleListing(listingId);

  const setParkingMutation = useSetParking();

  useEffect(() => {
    if (user && user.parkings) {
      setIsParking(user.parkings.includes(listingId));
    }
  }, [user, listingId]);

  const handleToggleParking = () => {
    if (!user) Alert.alert("Morate biti prijavljeni da bi parkirali vozilo");

    setParkingMutation.mutate(
      {
        userId: user?.id,
        listingId,
      },
      {
        onSuccess: (updatedProfile) => {
          setIsParking(updatedProfile.parkings.includes(listingId));
        },
        onError: (error) => {
          console.log("Failed to update", error);
        },
      }
    );
  };

  if (isLoading) {
    return <ActivityIndicator color={"#fff"} />;
  }

  if (error) {
    return (
      <Text style={{ color: theme.text, textAlign: "center" }}>
        Trenutno nije moguće prikazati oglas
      </Text>
    );
  }

  return (
    <ScrollView>
      <View style={[styles.container, { backgroundColor: theme.bgColor }]}>
        <Stack.Screen
          options={{
            title: listing?.model || "Učitavanje...",
            headerStyle: { backgroundColor: theme.bgColor },
            headerTintColor: theme.text,
            headerBackTitle: "Nazad",
          }}
        />
        {listing && listing.car_images ? (
          <ImageSlider images={listing.car_images} />
        ) : (
          <Text>Loading...</Text>
        )}

        <View
          style={[styles.detailsContainer, { backgroundColor: theme.bgShade }]}
        >
          <View style={{ borderBottomWidth: 1, borderColor: "#ff4605" }}>
            <Text
              style={{
                color: "#ff4605",
                fontFamily: "Montserrat-Bold",
                fontSize: getFontSize(20),
                textAlign: "center",
                paddingBottom: verticalScale(10),
              }}
            >
              {listing.model}
            </Text>

            <View
              style={{
                backgroundColor: "#ff4605",
                paddingTop: verticalScale(10),
                paddingBottom: verticalScale(18),
                borderTopLeftRadius: moderateScale(14),
                borderTopRightRadius: moderateScale(14),
              }}
            >
              <Text
                style={{
                  color: "#fff",
                  fontFamily: "Montserrat-SemiBold",
                  fontSize: getFontSize(20),
                  textAlign: "center",
                }}
              >
                Upit
              </Text>
            </View>
          </View>

          <View
            style={[styles.shortDetails, { backgroundColor: theme.bgShade }]}
          >
            <View style={styles.shortDetail}>
              <FontAwesome name="road" size={24} color={theme.text} />
              <Text style={{ color: theme.text }}>2,300km</Text>
            </View>

            <View style={styles.shortDetail}>
              <MaterialCommunityIcons
                name="car-shift-pattern"
                size={24}
                color={theme.text}
              />
              <Text style={{ color: theme.text }}>Automatik</Text>
            </View>

            <View style={styles.shortDetail}>
              <MaterialCommunityIcons
                name="gas-station-outline"
                size={24}
                color={theme.text}
              />
              <Text style={{ color: theme.text }}>Benzin</Text>
            </View>

            <View style={styles.shortDetail}>
              <MaterialCommunityIcons
                name="engine-outline"
                size={24}
                color={theme.text}
              />
              <Text style={{ color: theme.text }}>450/ks</Text>
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
                color: theme.text,
                marginBottom: verticalScale(10),
              }}
            >
              Ukoliko vam je potrebna {"\n"} pomoć kontaktirajte nas
            </Text>

            <View style={styles.buttons}>
              <OutlineButton
                icon={<FontAwesome name="phone" size={24} color="#ff4605" />}
                textColor={theme.text}
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
                textColor={theme.text}
              >
                Email
              </OutlineButton>
              <OutlineButton
                icon={
                  <MaterialIcons
                    name="local-parking"
                    size={24}
                    color={isParking ? "#fff" : "#ff4605"}
                  />
                }
                background={isParking ? "#ff4605" : "transparent"}
                onPress={handleToggleParking}
                disable={isLoading || setParkingMutation.isPending}
              />
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
    alignItems: "center",
  },
  detailsContainer: {
    width: "100%",
    marginTop: verticalScale(10),
    borderRadius: moderateScale(14),
    paddingVertical: verticalScale(10),
  },
  shortDetails: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "space-between",
    columnGap: scale(40),
    rowGap: verticalScale(10),

    paddingVertical: verticalScale(10),
    paddingHorizontal: scale(20),
    marginTop: scale(-10),
    borderTopLeftRadius: moderateScale(14),
    borderTopRightRadius: moderateScale(14),

    zIndex: 1,

    borderBottomWidth: 0.2,
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

    paddingHorizontal: scale(14),
    justifyContent: "center",
    flexWrap: "wrap",
    gap: scale(10),
  },
});
