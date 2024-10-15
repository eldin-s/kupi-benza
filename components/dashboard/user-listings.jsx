import { ActivityIndicator, Alert, StyleSheet, Text, View } from "react-native";
import { useListingsForUser } from "../../app/api/listings";
import CarCard from "../ui/car-card";
import { getFontSize } from "../../utils.js/getFontSize";
import { verticalScale } from "react-native-size-matters";

const UserListings = ({ userId }) => {
  const { data, error, isLoading } = useListingsForUser(userId);

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
      {data && data.length > 0 ? (
        data.map((listing, index) => (
          <CarCard listing={listing} key={listing.id} />
        ))
      ) : (
        <Text>No listings available.</Text>
      )}
    </View>
  );
};

export default UserListings;

const styles = StyleSheet.create({});
