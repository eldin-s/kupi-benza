import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { Alert } from "react-native";
import { supabase } from "../../lib/supabase";

export function use5CarsList() {
  return useQuery({
    queryKey: ["cars"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("cars")
        .select("*")
        .range(0, 5);

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

export const useParkedListings = (userId) => {
  return useQuery({
    queryKey: ["parkedListings", userId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("parkings")
        .select(`cars (*)`)
        .eq("profile_id", userId);

      if (error) {
        console.log(error);
        throw new Error(error.message);
      }

      return data;
    },
    enabled: !!userId,
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

export const useUpdateListing = () => {
  const queryClient = useQueryClient();

  return useMutation({
    async mutationFn({ data, id }) {
      const { data: updatedListing, error } = await supabase
        .from("cars")
        .update(data)
        .eq("id", id)
        .select();

      if (error) {
        throw new Error(error.message);
      }

      return updatedListing;
    },

    async onSuccess() {
      Alert.alert("Oglas uspješno ažuriran");
      await queryClient.invalidateQueries({ queryKey: ["listings"] });
    },
  });
};

export const useDeleteListing = () => {
  const queryClient = useQueryClient();

  return useMutation({
    async mutationFn(id) {
      const { error } = await supabase.from("cars").delete().eq("id", id);

      if (error) {
        throw new Error(error.message);
      }
    },

    async onSuccess() {
      Alert.alert("Oglas uspešno obrisan");
      await queryClient.invalidateQueries({ queryKey: ["listings"] });
    },

    async onError() {
      Alert.alert("Greška u toku brisanja oglasa");
    },
  });
};

export function useCarsWithFilters(filters) {
  return useQuery({
    queryKey: ["cars", filters],
    queryFn: async () => {
      const { yearRange, priceRange, fuelType, carType, carState, sortBy } =
        filters;

      let query = supabase.from("cars").select("*");

      // Apply filters if they are provided
      if (yearRange?.min !== undefined || yearRange?.max !== undefined) {
        query = query
          .gte("production_year", yearRange?.min || 0)
          .lte("production_year", yearRange?.max || 9999);
      }

      if (
        priceRange?.min !== undefined ||
        priceRange?.max !== undefined ||
        priceRange?.max === "50000+"
      ) {
        if (priceRange?.max === "50000+") {
          query = query.gte("price", priceRange?.min || 0);
        } else {
          query = query
            .gte("price", priceRange?.min || 0)
            .lte(
              "price",
              priceRange?.max !== undefined ? priceRange.max : Infinity
            );
        }
      }

      if (fuelType) {
        query = query.eq("fuel_type", fuelType);
      }

      if (carType) {
        query = query.eq("car_type", carType);
      }

      if (carState) {
        query = query.eq("car_state", carState);
      }

      if (sortBy === "priceAsc") {
        query = query.order("price", { ascending: true });
      } else if (sortBy === "priceDesc") {
        query = query.order("price", { ascending: false });
      } else if (sortBy === "dateAsc") {
        query = query.order("created_at", { ascending: true });
      } else if (sortBy === "dateDesc") {
        query = query.order("created_at", { ascending: false });
      }

      const { data, error } = await query;

      if (error) {
        throw new Error(error.message);
      }

      return data;
    },
    keepPreviousData: true,
  });
}

// export function useSetParking() {
//   const queryCliet = useQueryClient();

//   return useMutation({
//     async mutationFn({ userId, listingId }) {
//       const profile = queryCliet.getQueryData(["profiles", userId]);

//       if (!profile)
//         throw new Error("Morate biti prijavljeni da bi parkirali vozilo");

//       const currentParkings = profile.parkings || [];
//       const isAlreadyParked = currentParkings.includes(listingId);

//       // Updating parked
//       const updatedParkings = isAlreadyParked
//         ? currentParkings.filter((id) => id !== listingId)
//         : [...currentParkings, listingId];

//       const { data, error } = await supabase
//         .from("profiles")
//         .update({ parkings: updatedParkings })
//         .eq("id", userId)
//         .select()
//         .single();

//       if (error) {
//         throw new Error(error.message);
//       }

//       return data;
//     },
//     onSettled: (data, error, { userId }) => {
//       queryCliet.invalidateQueries(["parkedListings", userId]);
//     },
//   });
// }
