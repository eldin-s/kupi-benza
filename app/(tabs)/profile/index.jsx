import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Redirect } from "expo-router";
import { useAuth } from "../../../providers/AuthProvider";
import PrimaryButton from "../../../components/ui/PrimaryButton";
import { supabase } from "../../../lib/supabase";

const Profile = () => {
  const { session, loading } = useAuth();

  const logout = async () => {
    const { data, error } = await supabase.auth.signOut();
    console.log(data);
  };

  if (loading) {
    return <ActivityIndicator />;
  }

  if (!session) {
    return <Redirect href={"/log-in"} />;
  }

  return (
    <SafeAreaView>
      <Text>Profile</Text>

      <PrimaryButton onPress={() => supabase.auth.signOut()}>
        Odloguj se
      </PrimaryButton>
    </SafeAreaView>
  );
};

export default Profile;

const styles = StyleSheet.create({});
