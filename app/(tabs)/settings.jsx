import {
  ActivityIndicator,
  StyleSheet,
  Switch,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { scale, verticalScale } from "react-native-size-matters";
import { useAuth } from "../../providers/AuthProvider";
import { useCurrentUser } from "../api/user";
import Logo from "../../components/home/logo";
import { formatDate } from "../../helpers/formatDate";
import { useState } from "react";
import { getFontSize } from "../../utils.js/getFontSize";

const Settings = () => {
  const { session, loading } = useAuth();
  const { data: user, isLoading } = useCurrentUser(session?.user?.id, {
    enabled: !!session?.user?.id,
  });
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator color="#fff" />
      </SafeAreaView>
    );
  }

  if (!session) {
    return (
      <SafeAreaView style={styles.container}>
        <Logo />
        <Text
          style={{
            color: "#fff",
            fontFamily: "Montserrat-Bold",
            paddingLeft: scale(14),
            fontSize: getFontSize(18),
          }}
        >
          Prijavite se da biste pristupili podešavanjima.
        </Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Logo />

      <View style={styles.innerContainer}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Text style={{ color: "#fff", fontFamily: "Montserrat-SemiBold" }}>
            Tema:
          </Text>
          <Switch
            trackColor={{ false: "#494949", true: "#c5c5c5" }}
            thumbColor={isEnabled ? "#ff4605" : "#797979"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isEnabled}
          />
        </View>

        {user && session && (
          <>
            <Text style={{ color: "#fff", fontFamily: "Montserrat-Regular" }}>
              Email:
              <Text style={{ fontFamily: "Montserrat-SemiBold" }}>
                {user?.email}
              </Text>
            </Text>

            <Text style={{ color: "#fff", fontFamily: "Montserrat-Regular" }}>
              Ime:
              <Text style={{ fontFamily: "Montserrat-SemiBold" }}>
                {user?.full_name}
              </Text>
            </Text>

            <Text style={{ color: "#fff", fontFamily: "Montserrat-Regular" }}>
              Račun kreiran:
              <Text style={{ fontFamily: "Montserrat-SemiBold" }}>
                {formatDate(user?.created_at)}
              </Text>
            </Text>

            <Text style={{ color: "#fff", fontFamily: "Montserrat-Regular" }}>
              Parkirana vozila:
              <Text style={{ fontFamily: "Montserrat-SemiBold" }}>
                {user?.parkings.length}
              </Text>
            </Text>
          </>
        )}
      </View>
    </SafeAreaView>
  );
};

export default Settings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0f141e",
    paddingVertical: verticalScale(14),
  },
  innerContainer: {
    paddingVertical: verticalScale(14),
    paddingHorizontal: scale(14),
    rowGap: verticalScale(4),
  },
});
