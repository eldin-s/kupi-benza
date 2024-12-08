import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "../../lib/supabase";

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
        throw new Error(error.message);
      }

      return data;
    },
  });
}

export function useSetParking() {
  return useMutation({
    async mutationFn({ userId, listingId }) {
      const { data } = await supabase
        .from("parkings")
        .select("id")
        .eq("profile_id", userId)
        .eq("car_id", listingId)
        .single();

      if (data) {
        // Remove parking if already exists
        const { error: deleteError } = await supabase
          .from("parkings")
          .delete()
          .eq("profile_id", userId)
          .eq("car_id", listingId);

        if (deleteError) {
          throw new Error(deleteError.message);
        }
      } else {
        // Add to parking if not exists
        const { error: insertError } = await supabase
          .from("parkings")
          .insert([{ profile_id: userId, car_id: listingId }]);

        if (insertError) {
          throw new Error(insertError.message);
        }
      }
    },
    onSettled: ({ userId }) => {
      queryCliet.invalidateQueries(["parkedListings", userId]);
    },
  });
}
