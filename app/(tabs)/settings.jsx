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
import { useTheme } from "../../providers/ThemeProvider";
import Colors from "../../constants/Colors";
import DefaultText from "../../components/ui/DefaultText";

const Settings = () => {
  const { session, loading } = useAuth();
  const { data: user, isLoading } = useCurrentUser(session?.user?.id, {
    enabled: !!session?.user?.id,
  });

  const { theme, toggleTheme } = useTheme();
  const [isEnabled, setIsEnabled] = useState(theme === Colors.dark);
  const toggleSwitch = () => {
    setIsEnabled(!isEnabled);
    toggleTheme();
  };

  if (loading) {
    return (
      <SafeAreaView
        style={[styles.container, { backgroundColor: theme.bgColor }]}
      >
        <ActivityIndicator color={theme.Text} />
      </SafeAreaView>
    );
  }

  if (!session) {
    return (
      <SafeAreaView
        style={[styles.container, { backgroundColor: theme.bgColor }]}
      >
        <Logo />
        <DefaultText
          style={{
            fontSize: getFontSize(18),
            textAlign: "center",
            marginTop: verticalScale(20),
          }}
          weight="bold"
        >
          Prijavite se da biste pristupili podešavanjima.
        </DefaultText>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.bgColor }]}
    >
      <Logo />

      <View style={styles.innerContainer}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <DefaultText weight="bold">Tema:</DefaultText>
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
            <DefaultText>
              Email:
              <DefaultText weight="bold"> {user?.email}</DefaultText>
            </DefaultText>

            <DefaultText>
              Ime:
              <DefaultText weight="bold"> {user?.full_name}</DefaultText>
            </DefaultText>

            <DefaultText>
              Račun kreiran:
              <DefaultText weight="bold">
                {" "}
                {formatDate(user?.created_at)}
              </DefaultText>
            </DefaultText>

            <DefaultText>
              Parkirana vozila:
              <DefaultText weight="bold"> {user?.parkings.length}</DefaultText>
            </DefaultText>
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
    paddingVertical: verticalScale(14),
  },
  innerContainer: {
    paddingVertical: verticalScale(14),
    paddingHorizontal: scale(14),
    rowGap: verticalScale(4),
  },
});
