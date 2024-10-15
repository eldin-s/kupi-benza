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
        throw new Error(error.message);
      }

      return data;
    },
  });
}

export const useListingsForUser = (userId) => {
  return useQuery({
    queryKey: ["listings", userId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("cars")
        .select("*")
        .eq("profile_id", userId);

      if (error) {
        throw new Error(error.message);
      }

      return data;
    },
  });
};

export const useSingleListing = (id) => {
  return useQuery({
    queryKey: ["cars", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("cars")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        throw new Error("Trenutno nije moguće pokazati detalje oglasa");
      }

      return data;
    },
  });
};