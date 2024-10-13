import { Image, ImageBackground, StyleSheet, Text, View } from "react-native";
import percent from "../../../assets/images/icons/percentage.png";
import glb35 from "../../../assets/images/cars/GLB_35.png";
import shape from "../../../assets/images/shape1.png";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import OutlineButton from "../../ui/OutlineButton";
import { getFontSize } from "../../../utils.js/getFontSize";

const DisplayCard1 = () => {
  const data = [{ key: "Finansiski" }, { key: "Operativni" }];

  return (
    <ImageBackground source={shape} resizeMode="cover" style={styles.container}>
      <View style={styles.relative}>
        <Image
          source={percent}
          resizeMode="contain"
          style={[styles.iconSize, styles.absoluteIcon]}
        />
        <Image source={glb35} style={styles.imageSize} resizeMode="contain" />
      </View>

      <View style={styles.content}>
        <Text style={styles.heading}>Finansiranje</Text>
        <Text style={styles.text}>
          Nudimo mogucnostu {"\n"}kupovine putem lizinga
        </Text>
        {data.map((item, index) => (
          <View key={index}>
            <Text style={styles.textList}>{item.key}</Text>
          </View>
        ))}

        <OutlineButton>Saznajte više</OutlineButton>
      </View>
    </ImageBackground>
  );
};

export default DisplayCard1;

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
    top: scale(48),
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
  textList: {
    color: "#fff",
    fontFamily: "Montserrat-Regular",
    paddingLeft: scale(10),
  },
  iconSize: {
    width: scale(40),
    height: scale(40),
  },
  imageSize: {
    width: scale(120),
    height: verticalScale(80),
  },
});
