import { View, Text, StyleSheet, Pressable, Image } from "react-native";
import React, { useState } from "react";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import mercedesLogo from "../../../assets/images/Mercedes-Logo.png";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import DropdownSearches from "./dropdown-searches";
import PrimaryButton from "../../ui/PrimaryButton";

import sside from "../../../assets/images/cars/s-side.png";
import gside from "../../../assets/images/cars/g-side.png";
import gleside from "../../../assets/images/cars/gle-side.png";
import { getFontSize } from "../../../utils.js/getFontSize";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "../../../providers/ThemeProvider";
import DefaultText from "../../ui/DefaultText";

const SearchCard = () => {
  const { theme } = useTheme();
  const [carState, setCarState] = useState("Sve");
  const [isOpen, setIsOpen] = useState(false);

  const [odGodine, setOdGodine] = useState("");
  const [doGodine, setDoGodine] = useState("");
  const [vrstaGoriva, setVrstaGoriva] = useState("");
  const [odCene, setOdCene] = useState("");
  const [doCene, setDoCene] = useState("");
  const [karoserija, setKaroserija] = useState("");

  const navigation = useNavigation();

  const handleSearch = () => {
    const params = new URLSearchParams();

    if (odGodine) {
      params.set("odGodine", odGodine);
    }

    if (doGodine) {
      params.set("doGodine", doGodine);
    }

    if (vrstaGoriva) {
      params.set("vrstaGoriva", vrstaGoriva);
    }

    if (odCene) {
      params.set("odCene", odCene);
    }

    if (doCene) {
      params.set("doCene", doCene);
    }

    if (karoserija) {
      params.set("karoserija", karoserija);
    }

    // Convert params to string
    const queryString = params.toString();

    // Navigate to the Search screen and pass the query parameters
    navigation.navigate("search", { queryString });
  };

  return (
    <View style={[styles.mainContainer, { backgroundColor: theme.bgShade }]}>
      {/* CARD HEADER */}
      <View style={styles.cardHeader}>
        <Pressable onPress={() => setCarState("Sve")}>
          <DefaultText
            style={[
              styles.text,
              carState === "Sve" && { color: theme.primary },
            ]}
          >
            Sve
          </DefaultText>
        </Pressable>

        <View style={styles.devider} />

        <Pressable onPress={() => setCarState("Novo")}>
          <DefaultText
            style={[
              styles.text,
              carState === "Novo" && { color: theme.primary },
            ]}
          >
            Novo
          </DefaultText>
        </Pressable>

        <View style={styles.devider} />

        <Pressable onPress={() => setCarState("Polovno")}>
          <DefaultText
            style={[
              styles.text,
              carState === "Polovno" && { color: theme.primary },
            ]}
          >
            Polovno
          </DefaultText>
        </Pressable>
      </View>

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
            GLA
          </DefaultText>
          <DefaultText style={styles.arrowIcon}>
            <MaterialIcons
              name={isOpen ? "keyboard-arrow-up" : "keyboard-arrow-down"}
              size={24}
            />
          </DefaultText>
        </Pressable>

        {isOpen && (
          <View style={styles.dropdownMenu}>
            <Pressable style={styles.dropdownElements}>
              <DefaultText color="#000" weight="medium">
                GLE
              </DefaultText>
            </Pressable>
            <Pressable style={styles.dropdownElements}>
              <DefaultText color="#000" weight="medium">
                G-SQUARED
              </DefaultText>
            </Pressable>
            <Pressable style={styles.dropdownElements}>
              <DefaultText color="#000" weight="medium">
                S-Class 550
              </DefaultText>
            </Pressable>
          </View>
        )}

        <DropdownSearches
          odGodine={odGodine}
          doGodine={doGodine}
          vrstaGoriva={vrstaGoriva}
          odCene={odCene}
          doCene={doCene}
          karoserija={karoserija}
          setOdGodine={setOdGodine}
          setDoGodine={setDoGodine}
          setVrstaGoriva={setVrstaGoriva}
          setOdCene={setOdCene}
          setDoCene={setDoCene}
          setKaroserija={setKaroserija}
        />

        <PrimaryButton onPress={handleSearch}>PRETRAŽI</PrimaryButton>

        <View style={styles.cardFooter}>
          <DefaultText weight="medium" color="#fff" style={styles.searchButton}>
            BRZA PRETRAGA
          </DefaultText>
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
          </View>
        </View>
      </View>
    </View>
  );
};

export default SearchCard;

const styles = StyleSheet.create({
  mainContainer: {
    borderRadius: moderateScale(14),
    marginBottom: moderateScale(20),
    marginHorizontal: moderateScale(14),
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

    textAlign: "center",

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
    width: scale(70),
    height: verticalScale(30),
  },
});
