import { ScrollView, StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Hero from "../../components/home/hero/hero";
import Facts from "../../components/home/facts";
import Listing from "../../components/home/listings/listings";
import Cards from "../../components/home/cards/cards";
import Track from "../../components/home/track/track";

const Home = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Hero />
        <Facts />
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
  },
});
