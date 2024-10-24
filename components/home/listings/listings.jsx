import {
  ActivityIndicator,
  Alert,
  StyleSheet,
  Text,
  View,
  Pressable,
} from "react-native";
import { useRouter } from "expo-router";
import { use5CarsList } from "../../../app/api/listings";
import CarCard from "../../ui/car-card";
import { scale, verticalScale } from "react-native-size-matters";
import { getFontSize } from "../../../utils.js/getFontSize";

const Listing = () => {
  const { data: cars, error, isLoading } = use5CarsList();
  const router = useRouter();

  if (isLoading) {
    return (
      <View>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    Alert.alert(error);
  }

  return (
    <View style={{ paddingHorizontal: scale(14) }}>
      <Text style={styles.heading}>Istaknuti Oglasi</Text>

      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "space-between",
          rowGap: verticalScale(6),
        }}
      >
        {cars?.length > 0 && !isLoading ? (
          cars.map((car) => (
            <View key={car.id} style={{ width: "49%" }}>
              <Pressable onPress={() => router.push(`/${car.id}`)}>
                <CarCard listing={car} />
              </Pressable>
            </View>
          ))
        ) : (
          <Text>Trenutno oglasi nisu dostupni</Text>
        )}
      </View>
    </View>
  );
};

export default Listing;

const styles = StyleSheet.create({
  heading: {
    color: "#fff",
    fontFamily: "Montserrat-Black",
    marginBottom: verticalScale(10),
    fontSize: getFontSize(18),
    textAlign: "center",
    textTransform: "uppercase",
  },
});
