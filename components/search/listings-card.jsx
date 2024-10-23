import { ActivityIndicator, Pressable, Text, View } from "react-native";
import { useSearch } from "../../hooks/useSearch";
import CarCard from "../ui/car-card";
import { useRouter } from "expo-router";

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
    <View style={{ width: "100%", paddingHorizontal: 14 }}>
      {data.map((listing) => (
        <Pressable
          onPress={() => router.push(`/${listing.id}`)}
          key={listing.id}
        >
          <CarCard listing={listing} />
        </Pressable>
      ))}
    </View>
  );
};

export default ListingsCard;
