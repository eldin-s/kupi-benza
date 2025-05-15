import { View, StyleSheet, ScrollView, Text } from "react-native";
import React from "react";
import DefaultText from "../../ui/DefaultText";
import PrimaryButton from "../../ui/PrimaryButton";
import { scale, verticalScale } from "react-native-size-matters";
import { useTheme } from "../../../providers/ThemeProvider";
import Hero from "./hero";
import { getFontSize } from "../../../utils.js/getFontSize";
import QuickDetails from "./quick-details";
import Tabs from "../../Tabs";

const ServiceCar = ({ closeModal, user, listing }) => {
  const { theme } = useTheme();

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.bgColor }]}>
      <Hero listing={listing} />
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
          {listing.model}
        </DefaultText>
        <Text style={{color: theme.primary, textAlign: "center", marginTop: verticalScale(4)}}>
          {listing.chassis_number}
        </Text>
      </View>
      {/* <QuickDetails /> */}
      <Tabs closeModal={closeModal} listing={listing} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default ServiceCar;
