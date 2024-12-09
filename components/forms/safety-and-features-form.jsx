import React, { useState } from "react";
import {
  carFeatures as carFeaturesData,
  carSafety,
} from "../../utils.js/models";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { Pressable, ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import DefaultText from "../ui/DefaultText";
import { moderateScale, verticalScale } from "react-native-size-matters";
import { getFontSize } from "../../utils.js/getFontSize";
import Ionicons from "@expo/vector-icons/Ionicons";

const SafetyAndFeaturesForm = ({
  carSafeties,
  setCarSafeties,
  carFeatures,
  setCarFeatures,
  theme,
  onClose,
}) => {
  return (
    <SafeAreaView>
      <ScrollView style={{ position: "relative" }}>
        <View style={styles.container}>
          <Pressable
            onPress={onClose}
            style={{
              position: "absolute",
              top: verticalScale(12),
              right: 4,
              padding: 4,
              zIndex: 30,
            }}
          >
            <DefaultText>
              <Ionicons name="close" size={24} />
            </DefaultText>
          </Pressable>
          <View style={styles.checkboxContainer}>
            <View style={{ position: "relative" }}>
              <DefaultText style={{ fontSize: getFontSize(18) }}>
                Sigurnost
              </DefaultText>
            </View>

            {carSafety.map((element, index) => (
              <BouncyCheckbox
                key={index}
                size={25}
                fillColor="#ff4605"
                unFillColor={theme.text}
                text={element}
                iconStyle={{ borderColor: "#c7c7c7" }}
                innerIconStyle={{ borderWidth: 1 }}
                isChecked={carSafeties.includes(element)}
                onPress={(isChecked) => {
                  setCarSafeties((prev) =>
                    isChecked
                      ? [...prev, element]
                      : prev.filter((item) => item !== element)
                  );
                }}
              />
            ))}
          </View>

          <View style={styles.checkboxContainer}>
            <DefaultText style={{ fontSize: getFontSize(18) }}>
              Oprema
            </DefaultText>
            {carFeaturesData.map((element, index) => (
              <BouncyCheckbox
                key={index}
                size={25}
                fillColor="#ff4605"
                unFillColor={theme.text}
                text={element}
                iconStyle={{ borderColor: "#c7c7c7" }}
                innerIconStyle={{ borderWidth: 1 }}
                isChecked={carFeatures.includes(element)}
                onPress={(isChecked) => {
                  setCarFeatures((prev) =>
                    isChecked
                      ? [...prev, element]
                      : prev.filter((item) => item !== element)
                  );
                }}
              />
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: moderateScale(16),
    flex: 1,
    height: "100vh",
  },
  checkboxContainer: {
    marginTop: verticalScale(14),
    gap: verticalScale(10),
  },
});

export default SafetyAndFeaturesForm;
