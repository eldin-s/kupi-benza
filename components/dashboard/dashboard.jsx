import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { useCurrentUser } from "../../app/api/user";
import UserListings from "./user-listings";
import OutlineButton from "../ui/OutlineButton";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import Entypo from "@expo/vector-icons/Entypo";
import { supabase } from "../../lib/supabase";
import { useRouter } from "expo-router";
import { getFontSize } from "../../utils.js/getFontSize";

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
    <View style={{ paddingVertical: verticalScale(10) }}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          paddingVertical: verticalScale(10),
          gap: scale(6),
        }}
      >
        <Text
          style={{
            color: "#fff",
            fontFamily: "Montserrat-SemiBold",
            fontSize: getFontSize(20),
          }}
        >
          {" "}
          Dobrodošli: {user.full_name}
        </Text>

        <Entypo
          name="log-out"
          size={moderateScale(20)}
          color="#fff"
          onPress={() => supabase.auth.signOut()}
        />
      </View>
      <OutlineButton onPress={() => router.push("/profile/add-listing")}>
        + DODAJ OGLAS
      </OutlineButton>

      <UserListings userId={user.id} />
    </View>
  );
};

export default Dashboard;

const styles = StyleSheet.create({});
