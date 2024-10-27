import { ActivityIndicator, Pressable, Text, View } from "react-native";
import { useSearch } from "../../hooks/useSearch";
import CarCard from "../ui/car-card";
import { useRouter } from "expo-router";
import SearchSingleCard from "./search-single-card";
import { verticalScale } from "react-native-size-matters";

const ListingsCard = () => {
  const { data, isLoading } = useSearch();
  const router = useRouter();

  if (isLoading) {
    return (
      <View>
        <ActivityIndicator color="#fff" />
      </View>
    );
  }

  if (data.length === 0) {
    return <Text style={{ color: "#fff" }}>Nema rezultata!</Text>;
  }

  return (
    <View
      style={{
        flex: 1,
        paddingHorizontal: 14,
        rowGap: verticalScale(10),
        paddingBottom: verticalScale(70),
      }}
    >
      {data.map((listing) => (
        <Pressable
          onPress={() => router.push(`/${listing.id}`)}
          key={listing.id}
        >
          <SearchSingleCard listing={listing} />
        </Pressable>
      ))}
    </View>
  );
};

export default ListingsCard;
