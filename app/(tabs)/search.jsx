import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import { getFontSize } from "../../utils.js/getFontSize";
import ListingsCard from "../../components/search/listings-card";
import SearchingCard from "../../components/search/searching-card";

const Search = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.headingCard}>
          <Text
            style={{
              padding: moderateScale(24),
              fontFamily: "Montserrat-SemiBold",
              fontSize: getFontSize(18),
            }}
          >
            Zakažite vaš servis bez čekanja!
          </Text>
        </View>

        <SearchingCard />
        <ListingsCard />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Search;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0f141e",
    paddingTop: verticalScale(10),
  },
  headingCard: {
    backgroundColor: "#d1d5db",
    borderRadius: moderateScale(14),
    marginBottom: verticalScale(14),
    marginHorizontal: scale(14),
  },
});
