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

export const useParkedListings = (parkedIds) => {
  return useQuery({
    queryKey: ["parkedListings", parkedIds],
    queryFn: async () => {
      if (!parkedIds || parkedIds.length === 0) return [];

      const { data, error } = await supabase
        .from("cars")
        .select("*")
        .in("id", parkedIds);

      if (error) {
        throw new Error(error.message);
      }

      return data;
    },
    enabled: !!parkedIds && parkedIds.length > 0,
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
        // throw new Error(error.message);
        console.log(error);
      }

      return newListing;
    },

    async onSuccess() {
      Alert.alert("Oglas uspješno objavljen");
      await queryClient.invalidateQueries({ queryKey: ["listings"] });
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
