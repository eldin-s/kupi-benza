import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Redirect, useRouter } from "expo-router";
import { useAuth } from "../../../providers/AuthProvider";
import { scale } from "react-native-size-matters";
import Dashboard from "../../../components/dashboard/dashboard";
import { useTheme } from "../../../providers/ThemeProvider";
import DefaultText from "../../../components/ui/DefaultText";
import { useEffect } from "react";

const Profile = () => {
  const { theme } = useTheme();
  const { session, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !session) {
      // Perform navigation only after rendering phase
      router.push("/log-in");
    }
  }, [loading, session, router]);

  if (loading) {
    return <ActivityIndicator />;
  }

  if (!session) {
    return null; // Temporarily render nothing while redirecting
  }

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.bgColor }]}>
      <Dashboard userId={session?.user?.id} />
    </ScrollView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: scale(14),
  },
});
