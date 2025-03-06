import {
    GoogleSignin,
    GoogleSigninButton,
    statusCodes,
  } from '@react-native-google-signin/google-signin';

GoogleSignin.configure({
webClientId: '263936141502-8r9c7qheog5m277cm0emfmj9uqv29p6m.apps.googleusercontent.com',
scopes: ['https://www.googleapis.com/auth/drive.readonly'],
offlineAccess: true, 
forceCodeForRefreshToken: false,
iosClientId: '263936141502-lsvde8sg67cp0j35gctr24pekllvidpu.apps.googleusercontent.com',
});