import {
  StyleSheet,
  Pressable,
  View,
  ActivityIndicator,
  Text,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { scale, verticalScale } from "react-native-size-matters";
import { useAuth } from "../../providers/AuthProvider";
import { useCurrentUser } from "../api/user";
import { useParkedListings } from "../api/listings";
import SearchSingleCard from "../../components/search/search-single-card";
import { useRouter } from "expo-router";
import { getFontSize } from "../../utils.js/getFontSize";
import Logo from "../../components/home/logo";

const Parking = () => {
  const { session } = useAuth();
  const { data: user } = useCurrentUser(session?.user?.id);
  const router = useRouter();

  const {
    data: parkedCards,
    error,
    isLoading,
  } = useParkedListings(user?.parkings);

  if (isLoading) {
    return (
      <View>
        <ActivityIndicator color="#fff" />
      </View>
    );
  }

  if (error) {
    return <Text style={{ color: "#fff" }}>Nema rezultata!</Text>;
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Logo />

        <View style={styles.innerContainer}>
          <Text
            style={{
              color: "#fff",
              fontFamily: "Montserrat-Medium",
              fontSize: getFontSize(18),
            }}
          >
            Vaša parkirana vozila:
          </Text>

          {!parkedCards || parkedCards.length === 0 || !user ? (
            <Text
              style={{
                color: "#fff",
                fontFamily: "Montserrat-Medium",
                fontSize: getFontSize(18),
              }}
            >
              Trenutno nemate parkiranih vozila
            </Text>
          ) : (
            parkedCards?.map((listing) => (
              <Pressable
                onPress={() => router.push(`/${listing.id}`)}
                key={listing.id}
              >
                <SearchSingleCard listing={listing} />
              </Pressable>
            ))
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Parking;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0f141e",
    paddingBottom: verticalScale(70),
    paddingTop: verticalScale(14),
  },

  innerContainer: {
    flex: 1,
    rowGap: verticalScale(10),
    paddingHorizontal: scale(14),
  },
});
