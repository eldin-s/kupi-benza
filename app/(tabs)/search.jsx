import { Image, StyleSheet } from "react-native";
import construction from "../../assets/construction.png";
import { SafeAreaView } from "react-native-safe-area-context";
import { scale, verticalScale } from "react-native-size-matters";

const Search = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={construction}
        style={{ width: scale(150), height: verticalScale(120) }}
      />
    </SafeAreaView>
  );
};

export default Search;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0f141e",
    alignItems: "center",
    justifyContent: "center",
  },
});
