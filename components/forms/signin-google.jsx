// import statusCodes along with GoogleSignin
import {
  GoogleSignin,
  statusCodes,
} from "@react-native-google-signin/google-signin";
import { storeUserInSupabase } from "../../lib/googleAuth";
import Toast from "react-native-toast-message";

GoogleSignin.configure({
  webClientId:
    "263936141502-8r9c7qheog5m277cm0emfmj9uqv29p6m.apps.googleusercontent.com",
  scopes: ["https://www.googleapis.com/auth/drive.readonly"],
  offlineAccess: true,
  forceCodeForRefreshToken: false,
  iosClientId:
    "263936141502-lsvde8sg67cp0j35gctr24pekllvidpu.apps.googleusercontent.com",
});

// Somewhere in your code
export default signIn = async () => {
  try {
    await GoogleSignin.hasPlayServices();
    Toast.show({
      type: "success",
      text1: "Prijava uspesna",
    });

    const response = await GoogleSignin.signIn();

    if (response.data.idToken) {
      await storeUserInSupabase(response.data.idToken);
    } else {
      console.log("No ID Token received");
      Toast.error({
        type: "error",
        text1: "Prijava neuspesna",
        text2: "No ID Token received",
      });
    }
  } catch (error) {
    console.error("Google Sign-In Error:", error);
    Toast.error({
      type: "error",
      text1: "Prijava nije uspesna",
      text2: error,
    });
    if (error.code) {
      switch (error.code) {
        case statusCodes.IN_PROGRESS:
          console.log("Sign-in already in progress.");
          break;
        case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
          console.log("Play services not available or outdated.");
          Toast.error({
            type: "error",
            text1: "Google Play NOT Service available!",
          });
          break;
        default:
          console.log("Other error:", error.message);
          Toast.error({
            type: "error",
            text1: "Google Sign-In Error",
            text2: error.message || "Unknown error",
          });
      }
    }
  }
};
