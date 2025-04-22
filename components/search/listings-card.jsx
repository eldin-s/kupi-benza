import { ActivityIndicator, Pressable, Text, View } from "react-native";
import { useSearch } from "../../hooks/useSearch";
import { useRouter } from "expo-router";
import SearchSingleCard from "./search-single-card";
import { scale, verticalScale } from "react-native-size-matters";
import DefaultText from "../ui/DefaultText";

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

  if (data.length <= 0) {
    return <DefaultText style={{ paddingBottom: verticalScale(20)}}>Nema rezultata!</DefaultText>;
  }

  return (
    <View
      style={{
        flex: 1,
        paddingHorizontal: scale(14),
        rowGap: verticalScale(10),
        paddingBottom: verticalScale(22),
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
