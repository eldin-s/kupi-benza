import { SafeAreaView } from 'react-native-safe-area-context'
import DefaultText from '../components/ui/DefaultText'
import { StyleSheet, View } from 'react-native'
import { moderateScale, scale, verticalScale } from 'react-native-size-matters'
import { getFontSize } from '../utils.js/getFontSize'
import { useTheme } from '../providers/ThemeProvider'
import { Link, Stack } from 'expo-router'
import Ionicons from "@expo/vector-icons/Ionicons";
import SigninForm from '../components/forms/signin-form'

const AdminLogin = () => {
  const {theme} = useTheme();

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.bgColor }]}
    >
      <Stack.Screen options={{ headerShown: false }} />
      <View
        style={{
          position: "absolute",
          top: verticalScale(30),
          left: scale(10),
        }}
      >
        <Link href={"/log-in"} style={{ textAlign: "center" }}>
          <Ionicons name="arrow-back" size={24} color={theme.text} />
        </Link>
      </View>

      <SigninForm />
    </SafeAreaView>
  )
}

export default AdminLogin;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
    padding: moderateScale(10),
    position: "relative",
  },
});