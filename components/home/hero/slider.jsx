import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons"; //
import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import glb from "../../../assets/images/cars/GLB_35.png";
import gls from "../../../assets/images/cars/gls.png";
import amg from "../../../assets/images/AMG-Logo.png";
import OutlineButton from "../../ui/OutlineButton";
import { scale, verticalScale } from "react-native-size-matters";
import { getFontSize } from "../../../utils.js/getFontSize";

const images = [
  {
    src: glb,
    name: "GLB",
    description:
      "Oduševljava do sedam ljudi: Novi Mercedes-AMG GLB 35 4MATIC otvara vam svet SUV-ova performansi. I u isto vreme, nudi mnogo prostora i fleksibilnosti za vaše ideje.",
    engine: "AMG 2,0-litarski četvorocilindrični motor sa turbopunjačem",
    power: "225kw/302ks",
    transmission: "AMG SPEEDSHIFT DCT 8G",
  },
  {
    src: gls,
    name: "GLS",
    description:
      "Pritisnite start da oživite V8 motor od 603 konjske snage i pustite ga da buči kroz 4 podešene izduvne cevi. Inteligentni pogon na sva četiri točka, samostabilizujuće vešanje i crvene kočione čeljusti.",
    engine: "AMG V8",
    power: "450kw/603ks",
    transmission: "AMG SPEEDSHIFT DCT 8G",
  },
];

const Slider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  return (
    <View style={styles.mainContainer}>
      {/* Logo */}
      <Image
        source={amg}
        resizeMode="contain"
        style={{ width: scale(160), height: verticalScale(16) }}
      />

      {/* Car Name and Description */}
      <Text style={styles.headingText}>
        Mercedes Benz{" "}
        <Text style={styles.boldText}>{images[currentIndex].name}</Text>
      </Text>
      <Text style={styles.textDescription}>
        {images[currentIndex].description}
      </Text>

      {/* Car Info: Engine, Power, Transmission */}
      <View style={styles.carDetails}>
        <View
          style={{ alignItems: "center", marginVertical: verticalScale(4) }}
        >
          <MaterialCommunityIcons
            name="engine-outline"
            size={32}
            color="#ff4605"
          />
          <Text style={styles.detailText}>{images[currentIndex].engine}</Text>
        </View>
        <View
          style={{ alignItems: "center", marginVertical: verticalScale(4) }}
        >
          <SimpleLineIcons name="speedometer" size={30} color="#ff4605" />
          <Text style={styles.detailText}>{images[currentIndex].power}</Text>
        </View>
        <View
          style={{ alignItems: "center", marginVertical: verticalScale(4) }}
        >
          <Ionicons name="settings-outline" size={32} color="#ff4605" />
          <Text style={styles.detailText}>
            {images[currentIndex].transmission}
          </Text>
        </View>
      </View>

      <Image
        source={images[currentIndex].src}
        style={styles.imageSize}
        resizeMode="contain"
      />

      <View style={styles.imageSlider}>
        <TouchableOpacity onPress={prevSlide}>
          <MaterialIcons name="keyboard-arrow-left" size={24} color="white" />
        </TouchableOpacity>

        <Text style={{ color: "#fff", fontFamily: "Montserrat-Bold" }}>
          {images[currentIndex].name}
        </Text>

        <Image
          source={images[currentIndex].src}
          resizeMode="contain"
          style={styles.sliderImage}
        />

        <TouchableOpacity onPress={nextSlide}>
          <MaterialIcons name="keyboard-arrow-right" size={24} color="white" />
        </TouchableOpacity>
      </View>

      <OutlineButton> ZATRAŽITE PONUDU </OutlineButton>
    </View>
  );
};

export default Slider;

const styles = StyleSheet.create({
  mainContainer: {
    marginTop: verticalScale(12),
    marginHorizontal: scale(14),
  },
  headingText: {
    fontSize: getFontSize(20),
    color: "#fff",
    fontFamily: "Montserrat-Regular",
    marginVertical: verticalScale(6),
  },
  boldText: {
    fontFamily: "Montserrat-Bold",
  },
  textDescription: {
    fontSize: getFontSize(12),
    fontFamily: "Montserrat-Regular",
    color: "#fff",
    textAlign: "center",
    paddingVertical: verticalScale(14),
  },

  carDetails: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    flexWrap: "wrap",
    gap: scale(12),
  },
  detailText: {
    textAlign: "center",
    fontSize: getFontSize(14),
    fontFamily: "Montserrat-SemiBold",
    color: "#fff",
  },

  imageSize: {
    width: scale(320),
    height: verticalScale(120),
  },

  imageSlider: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: scale(6),
    height: "fit-content",
  },

  sliderImage: {
    width: scale(80),
    height: verticalScale(60),
  },
});
