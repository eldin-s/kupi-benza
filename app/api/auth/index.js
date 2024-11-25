import { supabase } from "../../../lib/supabase";

export default async function signup({
  fullName,
  email,
  password,
  role = "user",
}) {
  const data = {
    email,
    password,
    options: {
      data: {
        fullName,
        role,
      },
    },
  };

  const { data: userData, error } = await supabase.auth.signUp(data);

  if (error) {
    throw new Error("Kreiranje naloga je neuspešno");
  }

  const { error: updateError } = await supabase
    .from("profiles")
    .update({ full_name: fullName })
    .eq("id", userData.user.id);

  if (updateError) {
    throw new Error("Greška!");
  }
}
