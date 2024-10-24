import {
  ActivityIndicator,
  Alert,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useListingsForUser } from "../../app/api/listings";
import CarCard from "../ui/car-card";
import { getFontSize } from "../../utils.js/getFontSize";
import { verticalScale } from "react-native-size-matters";
import { useRouter } from "expo-router";

const UserListings = ({ userId }) => {
  const { data, error, isLoading } = useListingsForUser(userId);
  const router = useRouter();

  if (isLoading) {
    return <ActivityIndicator />;
  }
  if (error) {
    Alert.alert(error);
  }

  return (
    <View>
      <Text
        style={{
          color: "#fff",
          fontSize: getFontSize(16),
          fontFamily: "Montserrat-SemiBold",
          marginBottom: verticalScale(8),
        }}
      >
        Vaši oglasi:
      </Text>

      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "space-between",
          rowGap: verticalScale(6),
        }}
      >
        {data && data.length > 0 ? (
          data.map((listing) => (
            <View key={car.id} style={{ width: "49%" }} key={listing.id}>
              <Pressable onPress={() => router.push(`/${listing.id}`)}>
                <CarCard listing={listing} />
              </Pressable>
            </View>
          ))
        ) : (
          <Text style={{ color: "#fff" }}>
            Trenutno nemate objavljenih oglasa. Kliknite na "+ DODAJ OGLAS" da
            bi ste objavili oglas.
          </Text>
        )}
      </View>
    </View>
  );
};

export default UserListings;

const styles = StyleSheet.create({});
