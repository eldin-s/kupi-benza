import { useRoute } from "@react-navigation/native";
import { useCarsWithFilters } from "./listings";

export function useSearch() {
  const route = useRoute();
  const { queryString } = route.params || "";

  const searchParams = new URLSearchParams(queryString);

  const carState = searchParams.get("stanje");
  const model = searchParams.get("model");
  const yearMin = searchParams.get("odGodine");
  const yearMax = searchParams.get("doGodine");
  const priceMin = searchParams.get("odCene");
  const priceMax = searchParams.get("doCene");
  const fuelType = searchParams.get("vrstaGoriva");
  const carType = searchParams.get("karoserija");
  const sortBy = searchParams.get("sortBy");

  const priceRange = {
    min: priceMin || undefined,
    max: priceMax || undefined,
  };

  const yearRange = {
    min: yearMin || undefined,
    max: yearMax || undefined,
  };

  const { data, isLoading, isError, error } = useCarsWithFilters({
    carState: carState === "Sve" ? undefined : carState,
    model: model || undefined,
    yearRange,
    priceRange,
    fuelType: fuelType || undefined,
    carType: carType || undefined,
    sortBy,
  });

  return {
    data,
    isLoading,
    error,
    isError,
  };
}
