import { useQuery } from "@tanstack/react-query";
import { supabase } from "../../../lib/supabase";

export function use5CarsList() {
  return useQuery({
    queryKey: ["cars"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("cars")
        .select("*")
        .range(0, 4);

      if (error) {
        console.log(error);
      }

      return data;
    },
  });
}
