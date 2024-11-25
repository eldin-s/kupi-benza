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
  const queryCliet = useQueryClient();

  return useMutation({
    async mutationFn({ userId, listingId }) {
      const profile = queryCliet.getQueryData(["profiles", userId]);

      if (!profile)
        throw new Error("Morate biti prijavljeni da bi parkirali vozilo");

      const currentParkings = profile.parkings || [];
      const isAlreadyParked = currentParkings.includes(listingId);

      // Updating parked
      const updatedParkings = isAlreadyParked
        ? currentParkings.filter((id) => id !== listingId)
        : [...currentParkings, listingId];

      const { data, error } = await supabase
        .from("profiles")
        .update({ parkings: updatedParkings })
        .eq("id", userId)
        .select()
        .single();

      if (error) {
        throw new Error(error.message);
      }

      return data;
    },
    onSettled: (data, error, { userId }) => {
      queryCliet.invalidateQueries(["parkedListings", userId]);
    },
  });
}
