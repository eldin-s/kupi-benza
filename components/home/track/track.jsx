import { Image, StyleSheet, Text, View } from "react-native";
import amg from "../../../assets/images/AMG-Logo.png";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import { getFontSize } from "../../../utils.js/getFontSize";

const Track = () => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={[styles.heading, styles.textWhite]}>Svi Modeli</Text>
        <View style={styles.border}>
          <Image source={amg} resizeMode="contain" style={styles.imageSize} />
        </View>
        <Text style={[styles.heading, styles.textWhite, styles.trackingWidest]}>
          MAYBACH
        </Text>
      </View>
    </View>
  );
};

export default Track;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: scale(14),
    marginVertical: verticalScale(14),
  },
  content: {
    backgroundColor: "#19212f",
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    gap: scale(4),
    padding: moderateScale(8),
    flexWrap: "wrap",
    borderRadius: moderateScale(14),
  },
  heading: {
    fontSize: getFontSize(16),
    fontFamily: "Montserrat-Regular",
  },
  textWhite: {
    color: "white",
  },
  border: {
    padding: scale(8),
    borderWidth: 1,
    borderColor: "#ff4605",
    borderRadius: moderateScale(14),
  },
  imageSize: {
    width: scale(80),
    height: verticalScale(10),
  },
  trackingWidest: {
    letterSpacing: 2,
  },
});
