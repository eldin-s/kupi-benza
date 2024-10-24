import React from "react";
import Svg, { Path } from "react-native-svg";
import { View } from "react-native";
import { verticalScale } from "react-native-size-matters";

const TabBarBackground = () => {
  return (
    <View
      style={{
        position: "absolute",
        bottom: 0,
        width: "100%",
        height: verticalScale(60),
      }}
    >
      <Svg
        height={verticalScale(60)}
        width="100%"
        viewBox="0 0 1390 260"
        style={{ position: "absolute", bottom: 0 }}
      >
        <Path
          fill="#020a18"
          d="M69 59c78,0 348,0 426,0 85,0 126,-59 201,-59 74,0 126,59 205,59 91,0 330,0 421,0 38,0 69,31 69,69l0 70c0,38 -31,69 -69,69l-1252 0c-38,0 -69,-31 -69,-69l0 -70c0,-38 31,-69 69,-69z"
        />
      </Svg>
    </View>
  );
};

export default TabBarBackground;
