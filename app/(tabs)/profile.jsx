import { ActivityIndicator, ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Redirect, useRouter } from "expo-router";
import { useTheme } from "../../providers/ThemeProvider";
import { useAuth } from "../../providers/AuthProvider";
import Dashboard from "../../components/dashboard/dashboard";
import { scale } from "react-native-size-matters";
import { useEffect } from "react";

const Profile = () => {
  const { theme } = useTheme();
  const { session, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !session) {
      router.push("/log-in");
    }
  }, [loading, session]);

  if (loading) {
    return <ActivityIndicator />;
  }

  if (!session) {
    return null;
  }

  return (
    <View
      style={[styles.container, { backgroundColor: theme.bgColor }]}
      key={session.user.id}
    >
      <ScrollView>
        <Dashboard userId={session.user.id} />
      </ScrollView>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: scale(14),
  },
});
