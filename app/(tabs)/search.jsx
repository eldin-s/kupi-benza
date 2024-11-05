import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import { getFontSize } from "../../utils.js/getFontSize";
import ListingsCard from "../../components/search/listings-card";
import SearchingCard from "../../components/search/searching-card";
import DefaultText from "../../components/ui/DefaultText";
import { useTheme } from "../../providers/ThemeProvider";

const Search = () => {
  const { theme } = useTheme();

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.bgColor }]}
    >
      <ScrollView>
        <View style={styles.headingCard}>
          <DefaultText
            style={{
              padding: moderateScale(24),
              fontSize: getFontSize(18),
            }}
            color="#000"
            weight="semibold"
          >
            Zakažite vaš servis bez čekanja!
          </DefaultText>
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
    paddingTop: verticalScale(10),
  },
  headingCard: {
    backgroundColor: "#d1d5db",
    borderRadius: moderateScale(14),
    marginBottom: verticalScale(14),
    marginHorizontal: scale(14),
  },
});
