import { supabase } from "./supabase";

export const storeUserInSupabase = async (idToken) => {
  
  const { data, error } = await supabase.auth.signInWithIdToken({
    provider: "google",
    token: idToken,
  });
  
  if (error) {
    console.error("Supabase Auth Error:", error.message);
  } else {
    console.log("User authenticated in Supabase:", data);
  
    const user = data.user;
  
    if (user) {
      const { data: profile, error: fetchError } = await supabase
        .from("profiles")
        .select("full_name")
        .eq("id", user.id)
        .single();
  
      if (fetchError) {
        console.error("Error fetching profile:", fetchError.message);
      } else if (!profile || !profile.full_name) {
        // Update only if full_name is missing
        const { error: updateError } = await supabase
          .from("profiles")
          .update({ full_name: user.user_metadata?.full_name || user.email })
          .eq("id", user.id);
  
        if (updateError) {
          console.error("Error updating profile:", updateError.message);
        } else {
          console.log("Profile updated successfully");
        }
      } else {
        console.log("Profile already has a full_name, no update needed");
      }
    }
  }  
};