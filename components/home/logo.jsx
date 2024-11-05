import { Image, View } from "react-native";
import React from "react";
import { scale, verticalScale } from "react-native-size-matters";
import { useTheme } from "../../providers/ThemeProvider";

const Logo = () => {
  const { theme } = useTheme();

  return (
    <View
      style={{ marginHorizontal: scale(14), marginVertical: verticalScale(6) }}
    >
      <Image
        source={theme.logo}
        resizeMode="contain"
        style={{ width: scale(90), height: verticalScale(30) }}
      />
    </View>
  );
};

export default Logo;
