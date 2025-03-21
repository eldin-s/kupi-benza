import {
  ActivityIndicator,
  Button,
  Modal,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useCurrentUser } from "../../hooks/user";
import UserListings from "./user-listings";
import OutlineButton from "../ui/OutlineButton";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import Entypo from "@expo/vector-icons/Entypo";
import { supabase } from "../../lib/supabase";
import { useRouter } from "expo-router";
import { getFontSize } from "../../utils.js/getFontSize";
import { useTheme } from "../../providers/ThemeProvider";
import DefaultText from "../ui/DefaultText";
import { useState } from "react";
import PrimaryButton from "../ui/PrimaryButton";
import ServiceCar from "./car-service/ServiceCar";

const Dashboard = ({ userId }) => {
  const { theme } = useTheme();
  const { data: user, error, isLoading } = useCurrentUser(userId);
  const router = useRouter();

  const [modalVisible, setModalVisible] = useState(false);

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
      {user && user.role === "Admin" && (
        <>
          <OutlineButton
            textColor={theme.text}
            onPress={() => router.push("/profile/add-listing")}
          >
            + DODAJ OGLAS
          </OutlineButton>

          <UserListings userId={user.id} />
        </>
      )}

      <PrimaryButton onPress={() => setModalVisible(true)}>
        Zakazi servis
      </PrimaryButton>
      <Modal
        animationType="slide"
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <ServiceCar closeModal={() => setModalVisible(false)} />
      </Modal>
    </View>
  );
};

export default Dashboard;
