import { ActivityIndicator, ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Redirect } from "expo-router";
import { useAuth } from "../../../providers/AuthProvider";
import { scale } from "react-native-size-matters";
import Dashboard from "../../../components/dashboard/dashboard";
import { useTheme } from "../../../providers/ThemeProvider";

const Profile = () => {
  const { theme } = useTheme();
  const { session, loading } = useAuth();

  if (loading) {
    return <ActivityIndicator />;
  }

  if (!session) {
    return <Redirect href={"/log-in"} />;
  }

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.bgColor }]}
    >
      <ScrollView>
        <Dashboard userId={session.user.id} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: scale(14),
  },
});
