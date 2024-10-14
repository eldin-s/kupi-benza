import { ScrollView, StyleSheet, View } from "react-native";
import { moderateScale } from "react-native-size-matters";
import AddListingForm from "../../../components/forms/add-listing-form";

const AddListing = () => {
  return (
    <View style={styles.container}>
      <ScrollView>
        <AddListingForm />
      </ScrollView>
    </View>
  );
};

export default AddListing;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0f141e",
    padding: moderateScale(14),
  },
});
