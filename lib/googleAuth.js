import { supabase } from "./supabase";

export const storeUserInSupabase = async (idToken) => {
  console.log("Authenticating with Supabase...");
  
  const { data, error } = await supabase.auth.signInWithIdToken({
    provider: "google",
    token: idToken,
  });

  if (error) {
    console.error("Supabase Auth Error:", error.message);
  } else {
    console.log("User authenticated in Supabase:", data);
  }
};