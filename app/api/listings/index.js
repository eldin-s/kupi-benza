import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "../../../lib/supabase";
import { Alert } from "react-native";

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
    queryKey: ["listings", id],
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

export const useCreateListing = () => {
  const queryClient = useQueryClient();

  return useMutation({
    async mutationFn(data) {
      const { data: newListing, error } = await supabase
        .from("cars")
        .insert(data)
        .single();

      if (error) {
        throw new Error(error.message);
      }

      return newListing;
    },

    async onSuccess() {
      Alert.alert("Oglas uspješno objavljen");
      await queryClient.invalidateQueries({ queryKey: ["listings"] });
    },
  });
};
