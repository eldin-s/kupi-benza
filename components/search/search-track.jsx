import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { FontAwesome5 } from "@expo/vector-icons";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";

const SearchTrack = ({ carState, setCarState }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [sortBy, setSortBy] = useState({
    value: "priceAsc",
    label: "Cena: Niže",
  });

  const navigation = useNavigation();
  const route = useRoute();
  const params = new URLSearchParams(route.params?.queryString || "");

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleClickState = (newState) => {
    setCarState(newState);

    params.set("stanje", newState);

    const queryString = params.toString();
    navigation.navigate("search", { queryString });
  };

  const handleClickDate = (newState) => {
    setSortBy(newState);

    params.set("sortBy", newState.value);

    const queryString = params.toString();
    navigation.navigate("search", { queryString });
  };

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, carState === "Sve" && styles.activeButton]}
          onPress={() => handleClickState("Sve")}
        >
          <Text style={styles.buttonText}>Sve</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, carState === "Novo" && styles.activeButton]}
          onPress={() => handleClickState("Novo")}
        >
          <Text style={styles.buttonText}>Novo</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, carState === "Polovno" && styles.activeButton]}
          onPress={() => handleClickState("Polovno")}
        >
          <Text style={styles.buttonText}>Polovno</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.sortContainer}>
        <Text style={styles.sortLabel}>Sortiraj po:</Text>
        <TouchableOpacity style={styles.sortButton} onPress={toggleDropdown}>
          <Text style={styles.sortButtonText}>{sortBy.label}</Text>
          <FontAwesome5 name="angle-down" size={18} color="#fff" />
        </TouchableOpacity>
        {isOpen && (
          <View style={styles.dropdown}>
            <TouchableOpacity
              style={styles.dropdownItem}
              onPress={() => {
                setIsOpen(false);
                setSortBy({ value: "priseAsc", label: "Cena: Nize" });
              }}
            >
              <Text style={styles.dropdownItemText}>Cena: Niže</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.dropdownItem}
              onPress={() => {
                setIsOpen(false);
                setSortBy({ value: "priseDesc", label: "Cena: Više" });
              }}
            >
              <Text style={styles.dropdownItemText}>Cena: Više</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.dropdownItem}
              onPress={() => {
                setIsOpen(false);
                handleClickDate({ value: "dateAsc", label: "Datum: Nize" });
              }}
            >
              <Text style={styles.dropdownItemText}>Datum: Niže</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.dropdownItem}
              onPress={() => {
                setIsOpen(false);
                handleClickDate({ value: "dateDesc", label: "Datum: Više" });
              }}
            >
              <Text style={styles.dropdownItemText}>Datum: Više</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    gap: moderateScale(8),
    marginVertical: verticalScale(14),
  },
  buttonContainer: {
    backgroundColor: "#19212f",
    borderRadius: moderateScale(14),
    flexDirection: "row",
    justifyContent: "center",
    flex: 1,
  },
  button: {
    paddingVertical: verticalScale(10),
    marginHorizontal: scale(10),
    flex: 1,
    alignItems: "center",
    overflow: "hidden",
  },
  activeButton: {
    borderBottomWidth: 1,
    borderBottomColor: "#ff4605",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "light",
  },
  sortContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    width: "100%",
    gap: moderateScale(14),
    zIndex: 10,
  },
  sortLabel: {
    color: "#fff",
  },
  sortButton: {
    backgroundColor: "#19212f",
    borderRadius: moderateScale(14),
    paddingVertical: verticalScale(8),
    paddingHorizontal: scale(12),
    flexDirection: "row",
    alignItems: "center",
  },
  sortButtonText: {
    color: "#fff",
    marginRight: scale(8),
  },
  dropdown: {
    position: "absolute",
    top: verticalScale(35),
    right: 0,
    backgroundColor: "#19212f",
    borderRadius: 8,
    shadowColor: "#fff",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    padding: 8,
  },
  dropdownItem: {
    paddingVertical: verticalScale(8),
    paddingHorizontal: scale(16),
  },
  dropdownItemText: {
    fontWeight: "light",
    color: "#fff",
  },
});

export default SearchTrack;
