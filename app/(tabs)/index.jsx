import { ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Hero from "../../components/home/hero/hero";
import Listing from "../../components/home/listings/listings";
import Cards from "../../components/home/cards/cards";
import Track from "../../components/home/track/track";
import Logo from "../../components/home/logo";
import { verticalScale } from "react-native-size-matters";

const Home = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Logo />
        <Hero />
        <Listing />
        <Cards />
        <Track />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0f141e",
    paddingTop: verticalScale(14),
  },
});
