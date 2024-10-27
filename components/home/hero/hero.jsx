import { View } from "react-native";
import SearchCard from "./search-card";
import { verticalScale } from "react-native-size-matters";

const Hero = () => {
  return (
    <View style={{ marginTop: verticalScale(14) }}>
      <SearchCard />
    </View>
  );
};

export default Hero;
