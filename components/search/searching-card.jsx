import { View, Text, StyleSheet, Pressable, Image } from "react-native";
import { useEffect, useState } from "react";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import mercedesLogo from "../../assets/images/Mercedes-Logo.png";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

import PrimaryButton from "../ui/PrimaryButton";

import sside from "../../assets/images/cars/s-side.png";
import gside from "../../assets/images/cars/g-side.png";
import gleside from "../../assets/images/cars/gle-side.png";
import glsside from "../../assets/images/cars/gls1.png";
import { useNavigation, useRoute } from "@react-navigation/native";
import DropdownSearches from "../home/hero/dropdown-searches";
import { getFontSize } from "../../utils.js/getFontSize";
import SearchTrack from "./search-track";
import DefaultText from "../ui/DefaultText";
import { useTheme } from "../../providers/ThemeProvider";

const SearchingCard = () => {
  const { theme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const route = useRoute();
  const { queryString } = route.params || "";
  const params = new URLSearchParams(queryString);

  const yearMin = params.get("odGodine");
  const yearMax = params.get("doGodine");
  const priceMin = params.get("odCene");
  const priceMax = params.get("doCene");
  const fuelType = params.get("vrstaGoriva");
  const carType = params.get("karoserija");

  const [model, setModel] = useState("GLE");
  const [carState, setCarState] = useState("Sve");

  const [filters, setFilters] = useState({
    odGodine: "",
    doGodine: "",
    vrstaGoriva: "",
    odCene: "",
    doCene: "",
    karoserija: "",
  });

  const handleChangeFilters = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  useEffect(() => {
    if (yearMin !== null) {
      handleChangeFilters("odGodine", yearMin);
    }
    if (yearMax !== null) {
      handleChangeFilters("doGodine", yearMax);
    }
    if (priceMin !== null) {
      handleChangeFilters("odCene", priceMin);
    }
    if (priceMax !== null) {
      handleChangeFilters("doCene", priceMax);
    }
    if (fuelType !== null) {
      handleChangeFilters("vrstaGoriva", fuelType);
    }
    if (carType !== null) {
      handleChangeFilters("karoserija", carType);
    }
  }, []);

  const navigation = useNavigation();

  const handleSearch = () => {
    const params = new URLSearchParams();

    if (filters.odGodine) {
      params.set("odGodine", filters.odGodine);
    }

    if (filters.doGodine) {
      params.set("doGodine", filters.doGodine);
    }

    if (filters.vrstaGoriva) {
      params.set("vrstaGoriva", filters.vrstaGoriva);
    }

    if (filters.odCene) {
      params.set("odCene", filters.odCene);
    }

    if (filters.doCene) {
      params.set("doCene", filters.doCene);
    }

    if (filters.karoserija) {
      params.set("karoserija", filters.karoserija);
    }

    // Convert params to string
    const queryString = params.toString();

    // Navigate to the Search screen and pass the query parameters
    console.log(queryString);
    navigation.navigate("search", { queryString });
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.cardContainer}>
        {/* CARD BODY */}
        <View style={styles.cardBody}>
          <Pressable
            style={styles.dropdownHeader}
            onPress={() => setIsOpen(!isOpen)}
          >
            <View style={styles.blockImage}>
              <Image
                source={mercedesLogo}
                style={styles.mercedesImage}
                resizeMode="contain"
              />
            </View>

            <DefaultText
              style={{
                paddingHorizontal: scale(14),
                fontSize: getFontSize(18),
                color: theme.primary,
              }}
              weight="bold"
            >
              {model}
            </DefaultText>
            <Text style={styles.arrowIcon}>
              <MaterialIcons
                name={isOpen ? "keyboard-arrow-up" : "keyboard-arrow-down"}
                size={24}
              />
            </Text>
          </Pressable>

          {isOpen && (
            <View style={styles.dropdownMenu}>
              <Pressable
                style={styles.dropdownElements}
                onPress={() => {
                  setModel("GLE");
                  setIsOpen(false);
                }}
              >
                <DefaultText color="#000" weight="medium">
                  GLE
                </DefaultText>
              </Pressable>
              <Pressable
                style={styles.dropdownElements}
                onPress={() => {
                  setModel("G-SQUARED");
                  setIsOpen(false);
                }}
              >
                <DefaultText color="#000" weight="medium">
                  G-SQUARED
                </DefaultText>
              </Pressable>
              <Pressable
                style={styles.dropdownElements}
                onPress={() => {
                  setModel("S-Class 550");
                  setIsOpen(false);
                }}
              >
                <DefaultText color="#000" weight="medium">
                  S-Class 550
                </DefaultText>
              </Pressable>
            </View>
          )}

          <DropdownSearches
            filters={filters}
            handleChangeFilters={handleChangeFilters}
          />

          <View style={styles.cardFooter}>
            <Text style={styles.searchButton}>BRZA PRETRAGA</Text>
            <View style={styles.searchImages}>
              <Image
                source={sside}
                style={styles.searchImage}
                resizeMode="contain"
              />
              <Image
                source={gside}
                style={styles.searchImage}
                resizeMode="contain"
              />
              <Image
                source={gleside}
                style={styles.searchImage}
                resizeMode="contain"
              />
              <Image
                source={glsside}
                style={styles.searchImage}
                resizeMode="contain"
              />
            </View>
          </View>
        </View>
      </View>
      <PrimaryButton variant="light" onPress={handleSearch}>
        <FontAwesome name="search" size={16} /> Pretraži
      </PrimaryButton>

      <SearchTrack
        carState={carState}
        setCarState={setCarState}
        params={params}
      />
    </View>
  );
};
{
}

export default SearchingCard;

const styles = StyleSheet.create({
  mainContainer: {
    marginHorizontal: moderateScale(14),
  },
  cardContainer: {
    backgroundColor: "#d1d5db",
    borderRadius: moderateScale(14),
    marginBottom: moderateScale(20),
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: moderateScale(3),
    justifyContent: "space-evenly",
  },

  text: {
    fontFamily: "Montserrat-Regular",
    paddingVertical: moderateScale(16),
    width: "100%",
  },
  primary: {
    color: "#ff4605",
  },
  black: {
    color: "#000",
  },

  devider: {
    height: "100%",
    backgroundColor: "#000",
    width: 1,
  },

  cardBody: {
    backgroundColor: "#fff",
    paddingVertical: moderateScale(18),
    paddingHorizontal: moderateScale(9),
    borderRadius: moderateScale(14),
    position: "relative",
  },

  dropdownHeader: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: moderateScale(14),
    borderWidth: 1,
    borderColor: "#ff4605",
  },

  blockImage: {
    borderRightWidth: 1,
    borderColor: "#d1d5db",
    width: scale(80),
    height: verticalScale(40),
    paddingHorizontal: moderateScale(14),
    paddingVertical: moderateScale(7),
  },

  mercedesImage: {
    width: "100%",
    height: "100%",
  },
  buttonText: {
    paddingHorizontal: scale(14),
    fontFamily: "Montserrat-Bold",
    fontSize: getFontSize(18),
    color: "#ff4605",
  },
  arrowIcon: {
    color: "#ff4605",
    position: "absolute",
    right: 8,
  },

  dropdownMenu: {
    position: "absolute",
    top: verticalScale(44),
    left: 0,
    right: 0,
    marginHorizontal: scale(10),

    zIndex: 20,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ff4605",
    borderRadius: moderateScale(14),
    transform: [{ translateY: 20 }],
  },

  dropdownElements: {
    paddingHorizontal: verticalScale(14),
    paddingVertical: verticalScale(7),
  },

  cardFooter: {
    alignItems: "center",
    borderWidth: 0.5,
    borderColor: "#6b7280",
    borderRadius: moderateScale(14),
    overflow: "hidden",
    marginTop: verticalScale(14),
  },
  searchButton: {
    width: "100%",
    backgroundColor: "#ff4605",
    color: "#fff",
    textAlign: "center",
    fontFamily: "Montserrat-SemiBold",

    paddingHorizontal: scale(4),
    paddingVertical: verticalScale(10),
  },

  searchImages: {
    flexDirection: "row",
    justifyContent: "space-around",
    gap: moderateScale(12),
    marginTop: verticalScale(14),
    paddingBottom: verticalScale(14),
    flexWrap: "wrap",
  },
  searchImage: {
    width: scale(100),
    height: verticalScale(30),
  },
});
