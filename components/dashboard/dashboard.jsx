import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { useCurrentUser } from "../../app/api/user";
import UserListings from "./user-listings";
import OutlineButton from "../ui/OutlineButton";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import Entypo from "@expo/vector-icons/Entypo";
import { supabase } from "../../lib/supabase";
import { useRouter } from "expo-router";
import { getFontSize } from "../../utils.js/getFontSize";
import { useTheme } from "../../providers/ThemeProvider";
import DefaultText from "../ui/DefaultText";

const Dashboard = ({ userId }) => {
  const { theme } = useTheme();
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
        <DefaultText
          weight="semibold"
          style={{
            fontSize: getFontSize(20),
          }}
        >
          Dobrodošli: {user.full_name}
        </DefaultText>

        <Entypo
          name="log-out"
          size={moderateScale(20)}
          color={theme.text}
          onPress={() => supabase.auth.signOut()}
        />
      </View>
      <OutlineButton
        textColor={theme.text}
        onPress={() => router.push("/profile/add-listing")}
      >
        + DODAJ OGLAS
      </OutlineButton>

      <UserListings userId={user.id} />
    </View>
  );
};

export default Dashboard;
