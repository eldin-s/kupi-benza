import { useQuery } from "@tanstack/react-query";
import { supabase } from "../../../lib/supabase";

export function useCurrentUser(userId) {
  return useQuery({
    queryKey: ["profiles", userId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userId)
        .single();

      if (error) {
        console.log(error);
      }

      return data;
    },
  });
}
