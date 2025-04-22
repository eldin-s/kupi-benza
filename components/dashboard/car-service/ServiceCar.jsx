import { View, StyleSheet, ScrollView } from "react-native";
import React from "react";
import DefaultText from "../../ui/DefaultText";
import PrimaryButton from "../../ui/PrimaryButton";
import { scale, verticalScale } from "react-native-size-matters";
import { useTheme } from "../../../providers/ThemeProvider";
import Hero from "./hero";
import { getFontSize } from "../../../utils.js/getFontSize";
import QuickDetails from "./quick-details";
import Tabs from "../../Tabs";

const ServiceCar = ({ closeModal }) => {
  const { theme } = useTheme();

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.bgColor }]}>
      <Hero />
      <View
        style={{
          paddingVertical: verticalScale(8),
          paddingHorizontal: scale(14),
        }}
      >
        <DefaultText
          style={{ textAlign: "center", fontSize: getFontSize(20) }}
          weight="semibold"
        >
          MERCEDES BENZ G63 AMG
        </DefaultText>
      </View>
      <QuickDetails />
      <Tabs closeModal={closeModal} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default ServiceCar;
