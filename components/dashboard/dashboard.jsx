import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { useCurrentUser } from "../../app/api/user";
import UserListings from "./user-listings";
import OutlineButton from "../ui/OutlineButton";
import { moderateScale, scale } from "react-native-size-matters";
import Entypo from "@expo/vector-icons/Entypo";
import { supabase } from "../../lib/supabase";
import { Link, useRouter } from "expo-router";

const Dashboard = ({ userId }) => {
  const { data: user, error, isLoading } = useCurrentUser(userId);
  const router = useRouter();

  if (isLoading) {
    return <ActivityIndicator />;
  }
  if (error) {
    Alert.alert(error.message);
  }

  return (
    <View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          gap: scale(6),
        }}
      >
        <Text style={{ color: "#fff" }}>{user.email}</Text>

        <OutlineButton onPress={() => router.push("/profile/add-listing")}>
          + DODAJ OGLAS
        </OutlineButton>

        <Entypo
          name="log-out"
          size={moderateScale(20)}
          color="#fff"
          onPress={() => supabase.auth.signOut()}
        />
      </View>
      <UserListings userId={user.id} />
    </View>
  );
};

export default Dashboard;

const styles = StyleSheet.create({});
