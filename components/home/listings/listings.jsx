import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { use5CarsList } from "../../../app/api/listings/apiListing";
import CarCard from "../../ui/car-card";
import { scale } from "react-native-size-matters";

const Listing = () => {
  const { data: cars, error, isLoading } = use5CarsList();

  if (isLoading) {
    return (
      <View>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    console.log(error);
    return <Text>Trenutno je nemoguće učitati</Text>;
  }

  return (
    <View style={{ paddingHorizontal: scale(14) }}>
      {cars?.length > 0 && !isLoading ? (
        cars.map((car, index) => <CarCard key={index} listing={car} />)
      ) : (
        <Text>Trenutno oglasi nisu dostupni</Text>
      )}
    </View>
  );
};

export default Listing;

const styles = StyleSheet.create({});
