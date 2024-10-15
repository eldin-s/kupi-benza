import { Image, ImageBackground, StyleSheet, Text, View } from "react-native";
import highquality from "../../../assets/images/icons/high-quality.png";
import gwagon from "../../../assets/images/cars/g-wagon.png";
import shape2 from "../../../assets/images/shape2.png";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import OutlineButton from "../../ui/OutlineButton";
import { getFontSize } from "../../../utils.js/getFontSize";

const DisplayCard2 = () => {
  return (
    <ImageBackground
      source={shape2}
      resizeMode="cover"
      style={styles.container}
    >
      <View style={styles.relative}>
        <Image
          source={highquality}
          resizeMode="contain"
          style={[styles.iconSize, styles.absoluteIcon]}
        />
        <Image source={gwagon} style={styles.imageSize} resizeMode="contain" />
      </View>

      <View style={styles.content}>
        <Text style={styles.heading}>Garancija</Text>
        <Text style={styles.text}>
          Garancija na sva nova vozila {"\n"}od 2 do 5 godina.
        </Text>

        <OutlineButton>Saznajte više</OutlineButton>
      </View>
    </ImageBackground>
  );
};

export default DisplayCard2;

const styles = StyleSheet.create({
  container: {
    paddingVertical: verticalScale(6),
    backgroundColor: "#19212f",
    borderRadius: moderateScale(14),
    flexDirection: "row",
    gap: scale(8),
    backgroundRepeat: "no-repeat",
    backgroundPosition: "top right",
    overflow: "hidden",
    marginVertical: verticalScale(7),
    marginHorizontal: scale(14),
  },
  relative: {
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
  },
  absoluteIcon: {
    position: "absolute",
    zIndex: -1,
    left: scale(64),
    top: scale(10),
  },
  content: {
    flex: 1,
    marginRight: scale(8),
  },
  heading: {
    color: "#fff",
    fontSize: getFontSize(16),
    fontFamily: "Montserrat-SemiBold",
  },
  text: {
    color: "#fff",
    fontFamily: "Montserrat-Regular",
  },
  iconSize: {
    width: scale(43),
    height: scale(43),
  },
  imageSize: {
    width: scale(120),
    height: verticalScale(80),
  },
});
