import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { FontAwesome5 } from "@expo/vector-icons";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import DefaultText from "../ui/DefaultText";
import { useTheme } from "../../providers/ThemeProvider";

const SearchTrack = ({ carState, setCarState }) => {
  const { theme } = useTheme();
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
      <View
        style={[styles.buttonContainer, { backgroundColor: theme.bgShade }]}
      >
        <TouchableOpacity
          style={[styles.button, carState === "Sve" && styles.activeButton]}
          onPress={() => handleClickState("Sve")}
        >
          <DefaultText weight="medium">Sve</DefaultText>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, carState === "Novo" && styles.activeButton]}
          onPress={() => handleClickState("Novo")}
        >
          <DefaultText weight="medium">Novo</DefaultText>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, carState === "Polovno" && styles.activeButton]}
          onPress={() => handleClickState("Polovno")}
        >
          <DefaultText weight="medium">Polovno</DefaultText>
        </TouchableOpacity>
      </View>

      <View style={[styles.sortContainer]}>
        <DefaultText>Sortiraj po:</DefaultText>
        <TouchableOpacity
          style={[styles.sortButton, { backgroundColor: theme.bgShade }]}
          onPress={toggleDropdown}
        >
          <DefaultText style={styles.sortButtonText}>
            {sortBy.label}
          </DefaultText>
          <FontAwesome5
            name={isOpen ? "angle-up" : "angle-down"}
            size={18}
            color={theme.text}
          />
        </TouchableOpacity>
        {isOpen && (
          <View style={[styles.dropdown, { backgroundColor: theme.bgShade }]}>
            <TouchableOpacity
              style={styles.dropdownItem}
              onPress={() => {
                setIsOpen(false);
                setSortBy({ value: "priseAsc", label: "Cena: Nize" });
              }}
            >
              <DefaultText>Cena: Niže</DefaultText>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.dropdownItem}
              onPress={() => {
                setIsOpen(false);
                setSortBy({ value: "priseDesc", label: "Cena: Više" });
              }}
            >
              <DefaultText>Cena: Više</DefaultText>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.dropdownItem}
              onPress={() => {
                setIsOpen(false);
                handleClickDate({ value: "dateAsc", label: "Datum: Nize" });
              }}
            >
              <DefaultText>Datum: Niže</DefaultText>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.dropdownItem}
              onPress={() => {
                setIsOpen(false);
                handleClickDate({ value: "dateDesc", label: "Datum: Više" });
              }}
            >
              <DefaultText>Datum: Više</DefaultText>
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

  sortContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    width: "100%",
    gap: moderateScale(14),
    zIndex: 10,
  },
  sortButton: {
    borderRadius: moderateScale(14),
    paddingVertical: verticalScale(8),
    paddingHorizontal: scale(12),
    flexDirection: "row",
    alignItems: "center",
  },
  sortButtonText: {
    marginRight: scale(8),
  },
  dropdown: {
    position: "absolute",
    top: verticalScale(35),
    right: 0,
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
});

export default SearchTrack;
