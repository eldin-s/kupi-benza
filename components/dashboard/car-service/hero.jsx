import { View, Text, ImageBackground, StyleSheet, Image } from "react-native";
import mountainBg from "../../../assets/images/snow-bg.png";
import gClass from "../../../assets/images/g-class-bg.png";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import DefaultText from "../../ui/DefaultText";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import Logo from "../../home/logo";
import { useTheme } from "../../../providers/ThemeProvider";
import { getFontSize } from "../../../utils.js/getFontSize";

const Hero = ({listing}) => {
  const { theme } = useTheme();
  console.log("listing", listing.car_images[0]);

  return (
    <View>
      <ImageBackground source={{ uri: listing.car_images[0] }} style={styles.bgContainer}>
        <View
          style={{
            width: "100%",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View style={{ marginLeft: scale(-14) }}>
            <View
              style={{
                marginHorizontal: scale(14),
                marginVertical: verticalScale(6),
              }}
            >
              <Image
                source={theme.logo}
                resizeMode="contain"
                style={{ width: scale(70), height: verticalScale(20) }}
              />
            </View>
          </View>
          <FontAwesome5 name="bell" size={24} color={theme.text} />
        </View>

        <View>
          <DefaultText
            weight="bold"
            style={{ fontSize: getFontSize(42), textTransform: "uppercase" }}
          >
            Pozdrav {"\n"}Aldine
          </DefaultText>
          {/* <Image
            source={{ uri: listing.car_images[0] }}
            style={styles.imageSize}
            resizeMode="contain"
          /> */}
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  bgContainer: {
    paddingBottom: verticalScale(36),
    paddingTop: verticalScale(16),
    backgroundColor: "#19212f",
    flexDirection: "column",
    gap: scale(8),
    backgroundRepeat: "no-repeat",
    backgroundPosition: "top right",
    overflow: "hidden",
    paddingHorizontal: moderateScale(24),
  },
  imageSize: {
    width: scale(200),
    height: verticalScale(115),
    maxWidth: scale(200),
    maxHeight: verticalScale(200),
    marginTop: verticalScale(-25),
    zIndex: 20
  },
});

export default Hero;
