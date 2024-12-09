import {
  ActivityIndicator,
  Alert,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Stack, useLocalSearchParams } from "expo-router";
import { useDeleteListing, useSingleListing } from "../../hooks/listings";
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
import { useCurrentUser, useSetParking } from "../../hooks/user";
import { useTheme } from "../../providers/ThemeProvider";
import EditListingForm from "../../components/forms/edit-listing-form";
import { useNavigation } from "@react-navigation/native";
import { supabase } from "../../lib/supabase";
import DefaultText from "../../components/ui/DefaultText";

const ListingSingle = () => {
  const { theme } = useTheme();
  const navigation = useNavigation();
  const { id: listingId } = useLocalSearchParams();
  const [isParking, setIsParking] = useState(false);

  const [isModalVisible, setModalVisible] = useState(false);

  const { session } = useAuth();
  const { data: user } = useCurrentUser(session?.user?.id);
  const { data: listing, error, isLoading } = useSingleListing(listingId);
  const { mutate: deleteListing, error: errorDelete } = useDeleteListing();

  const createTwoButtonAlert = () =>
    Alert.alert(
      "Da li ste sigurni da želite obrisati oglas?",
      "Ova akcija se ne može promeniti",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "OK",
          onPress: () => {
            deleteListing(listingId);
            navigation.goBack();
          },
        },
      ]
    );

  const setParkingMutation = useSetParking();

  useEffect(() => {
    const checkIfCarIsParked = async () => {
      if (!user || !user.id || !listingId) return;

      try {
        const { data, error } = await supabase
          .from("parkings")
          .select("id")
          .eq("profile_id", user.id)
          .eq("car_id", listingId)
          .single();

        if (error && error.code !== "PGRST116") {
          console.error(error.message);
          return;
        }

        // If data exists, the car is parked
        setIsParking(!!data);
      } catch (err) {
        console.error("Failed to check parking status:", err.message);
      }
    };

    checkIfCarIsParked();
  }, [user, listingId]);

  const handleToggleParking = () => {
    if (!user || !user.id) {
      Alert.alert("Morate biti prijavljeni da bi parkirali vozilo");
      return;
    }

    setParkingMutation.mutate(
      { userId: user.id, listingId },
      {
        onSuccess: () => {
          setIsParking((prev) => !prev);
        },
        onError: (error) => {
          console.error("Failed to toggle parking:", error.message);
        },
      }
    );
  };

  if (isLoading) {
    return <ActivityIndicator color={theme.text} />;
  }

  if (error) {
    return (
      <DefaultText style={{ textAlign: "center" }}>
        Trenutno nije moguće prikazati oglas
      </DefaultText>
    );
  }

  return (
    <ScrollView>
      <View style={[styles.container, { backgroundColor: theme.bgColor }]}>
        <Stack.Screen
          options={{
            title: listing?.model,
            headerStyle: { backgroundColor: theme.bgColor },
            headerTintColor: theme.text,
            headerBackTitle: "Nazad",
          }}
        />

        {/* {session && ( */}
        <View
          style={{
            position: "absolute",
            zIndex: 10,
            right: 8,
            flexDirection: "row",
            alignItems: "center",
            gap: scale(8),
          }}
        >
          <Pressable
            style={styles.iconWrapper}
            onPress={() => setModalVisible(true)}
          >
            <Text>
              <FontAwesome name="pencil" size={24} color="black" />
            </Text>
          </Pressable>
          <Pressable style={styles.iconWrapper} onPress={createTwoButtonAlert}>
            <Text>
              <FontAwesome name="trash" size={24} color="black" />
            </Text>
          </Pressable>
        </View>
        {/* )} */}

        <Modal
          visible={isModalVisible}
          animationType="slide"
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={{ backgroundColor: theme.bgColor }}>
            <EditListingForm
              listing={listing}
              onClose={() => setModalVisible(false)}
              theme={theme}
            />
          </View>
        </Modal>

        {listing && listing.car_images ? (
          <ImageSlider images={listing.car_images} />
        ) : (
          <DefaultText>Loading...</DefaultText>
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
              <Text style={{ color: theme.text }}>{listing.mileage} km</Text>
            </View>

            <View style={styles.shortDetail}>
              <MaterialCommunityIcons
                name="car-shift-pattern"
                size={24}
                color={theme.text}
              />
              <Text style={{ color: theme.text }}>{listing.transmission}</Text>
            </View>

            <View style={styles.shortDetail}>
              <MaterialCommunityIcons
                name="gas-station-outline"
                size={24}
                color={theme.text}
              />
              <Text style={{ color: theme.text }}>{listing.fuel_type}</Text>
            </View>

            <View style={styles.shortDetail}>
              <MaterialCommunityIcons
                name="engine-outline"
                size={24}
                color={theme.text}
              />
              <Text style={{ color: theme.text }}>{listing.power}/ks</Text>
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

        <Informations listing={listing} />
        <Safety safeties={listing.car_safety} />
        <Features features={listing.car_features} />
      </View>
    </ScrollView>
  );
};

export default ListingSingle;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    position: "relative",
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
  iconWrapper: {
    backgroundColor: "rgba(207, 207, 207, 0.4)",
    borderRadius: 100,
    padding: moderateScale(8),
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 3.84,
    elevation: 6,
    backdropFilter: "blur(10px)",
  },
});
