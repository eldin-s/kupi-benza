import {
  StyleSheet,
  Pressable,
  View,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { scale, verticalScale } from "react-native-size-matters";
import { useAuth } from "../../providers/AuthProvider";
import { useCurrentUser } from "../../hooks/user";
import { useParkedListings } from "../../hooks/listings";

import SearchSingleCard from "../../components/search/search-single-card";
import { useRouter } from "expo-router";
import { getFontSize } from "../../utils.js/getFontSize";
import Logo from "../../components/home/logo";
import { useTheme } from "../../providers/ThemeProvider";
import DefaultText from "../../components/ui/DefaultText";

const Parking = () => {
  const { theme } = useTheme();
  const { session } = useAuth();
  const { data: user } = useCurrentUser(session?.user?.id);
  const router = useRouter();

  const { data: parkedCars, error, isLoading } = useParkedListings(user?.id);

  if (isLoading) {
    return (
      <View>
        <ActivityIndicator color={theme.color} />
      </View>
    );
  }

  if (error) {
    return <DefaultText>Nema rezultata!</DefaultText>;
  }

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.bgColor }]}
    >
      <ScrollView>
        <Logo />

        <View style={styles.innerContainer}>
          <DefaultText
            style={{
              fontSize: getFontSize(18),
            }}
            weight="medium"
          >
            Vaša parkirana vozila:
          </DefaultText>

          {!parkedCars || parkedCars.length === 0 || !user ? (
            <DefaultText
              style={{
                fontSize: getFontSize(18),
              }}
              weight="medium"
            >
              Trenutno nemate parkiranih vozila
            </DefaultText>
          ) : (
            parkedCars?.map((listing) => (
              <Pressable
                onPress={() => router.push(`/${listing.cars.id}`)}
                key={listing.cars.id}
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
    paddingBottom: verticalScale(70),
    paddingTop: verticalScale(14),
  },

  innerContainer: {
    flex: 1,
    rowGap: verticalScale(10),
    paddingHorizontal: scale(14),
  },
});
