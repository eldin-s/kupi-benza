import { ActivityIndicator, ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { scale } from "react-native-size-matters";
import { useEffect, useState } from "react";
import { useTheme } from "../../../providers/ThemeProvider";
import { useAuth } from "../../../providers/AuthProvider";
import Dashboard from "../../../components/dashboard/dashboard";

const Profile = () => {
  const { theme } = useTheme();
  const { session, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !session) {
      setTimeout(() => {
        router.replace("/log-in");
      }, 50); // 50ms delay
    }
  }, [loading, session]);

  if (loading) {
    return <ActivityIndicator />;
  }

  if (!session) {
    return null;
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