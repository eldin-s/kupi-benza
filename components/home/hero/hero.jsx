import { View } from "react-native";
import SearchCard from "./search-card";
import Slider from "./slider";
import { verticalScale } from "react-native-size-matters";

const Hero = () => {
  return (
    <View style={{ marginTop: verticalScale(14) }}>
      <SearchCard />
      {/* <Slider /> */}
    </View>
  );
};

export default Hero;
