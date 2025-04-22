import { View, Text, StyleSheet } from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Ionicons from "@expo/vector-icons/Ionicons";
import Octicons from "@expo/vector-icons/Octicons";
import DefaultText from "../../ui/DefaultText";
import { getFontSize } from "../../../utils.js/getFontSize";
import { scale, verticalScale } from "react-native-size-matters";

const QuickDetails = () => {
  return (
    <>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          gap: scale(10),
        }}
      >
        <View style={styles.icons}>
          <MaterialCommunityIcons
            name="engine-outline"
            size={20}
            color="#ff4605"
          />
          <DefaultText
            style={{ fontSize: getFontSize(10), textAlign: "center" }}
          >
            AMG 4.0-litarski {"\n"}osmocilindricni motor{"\n"}sa turbopunjacem
          </DefaultText>
        </View>
        <View
          style={{
            height: "100%",
            transform: "rotate(20deg)",
            backgroundColor: "#ff4605",
            width: 1,
          }}
        />
        <View style={styles.icons}>
          <Ionicons name="speedometer-outline" size={20} color="#ff4605" />
          <DefaultText style={{ fontSize: getFontSize(10) }}>
            430kw/585ks
          </DefaultText>
        </View>
        <View
          style={{
            height: "100%",
            transform: "rotate(20deg)",
            backgroundColor: "#ff4605",
            width: 1,
          }}
        />
        <View style={styles.icons}>
          <Octicons name="gear" size={20} color="#ff4605" />
          <DefaultText style={{ fontSize: getFontSize(10) }}>
            AMG SPEEDSHIFT {"\n"}DCT 9G
          </DefaultText>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  icons: {
    flexDirection: "row",
    gap: scale(4),
    maxWidth: "100%",
    alignItems: "center",
  },
});

export default QuickDetails;
