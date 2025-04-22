import { ScrollView, StyleSheet, View } from "react-native";
import { moderateScale } from "react-native-size-matters";
import AddListingForm from "../../../components/forms/add-listing-form";
import { useTheme } from "../../../providers/ThemeProvider";

const AddListing = () => {
  const { theme } = useTheme();
  return (
    <View style={[styles.container, { backgroundColor: theme.bgColor }]}>
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
    padding: moderateScale(14),
  },
});
