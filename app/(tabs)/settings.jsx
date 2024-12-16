import {
  ActivityIndicator,
  Alert,
  StyleSheet,
  Switch,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import { useAuth } from "../../providers/AuthProvider";
import { useCurrentUser, useUpdateUser } from "../../hooks/user";
import Logo from "../../components/home/logo";
import { formatDate } from "../../helpers/formatDate";
import { useState } from "react";
import { getFontSize } from "../../utils.js/getFontSize";
import { useTheme } from "../../providers/ThemeProvider";
import Colors from "../../constants/Colors";
import DefaultText from "../../components/ui/DefaultText";
import OutlineButton from "../../components/ui/OutlineButton";

const Settings = () => {
  const { theme, toggleTheme } = useTheme();
  const { session, loading } = useAuth();
  const { data: user, isLoading } = useCurrentUser(session?.user?.id, {
    enabled: !!session?.user?.id,
  });
  const { mutate: updateUser, isPending } = useUpdateUser();

  const [isDarkMode, setIsDarkMode] = useState(theme === Colors.dark);
  const [toggleEditForm, setToggleEditForm] = useState(false);
  const [userName, onChangeUserName] = useState("");

  const toggleSwitch = () => {
    setIsDarkMode(!isDarkMode);
    toggleTheme();
  };

  const onUpdate = async () => {
    try {
      const newUserData = {
        full_name: userName,
      };
      updateUser({
        newUserData,
        userId: user.id,
      });
    } catch (error) {
      Alert.alert("Failed to create listing", error.message);
    } finally {
      setToggleEditForm(false);
    }
  };

  if (loading || isLoading) {
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
            thumbColor={isDarkMode ? "#ff4605" : "#797979"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isDarkMode}
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
          </>
        )}
        <View style={{ paddingVertical: verticalScale(8) }}>
          {toggleEditForm && (
            <TextInput
              value={userName}
              onChangeText={onChangeUserName}
              placeholder={user.full_name}
              placeholderTextColor={theme.text}
              style={[
                styles.input,
                {
                  backgroundColor: theme.bgColor,
                  color: theme.text,
                },
              ]}
            />
          )}

          <OutlineButton
            textColor={theme.text}
            onPress={() => {
              if (toggleEditForm) {
                onUpdate(); // Save changes and close form
              } else {
                setToggleEditForm(true); // Open form
              }
            }}
            disabled={isPending}
          >
            {toggleEditForm ? "Sačuvaj izmene" : "Uredi profil"}
          </OutlineButton>
        </View>
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
  input: {
    width: "100%",
    padding: moderateScale(10),
    borderWidth: 0.5,
    borderColor: "#9c9c9c",
    borderRadius: 5,
    marginBottom: verticalScale(16),
  },
});
