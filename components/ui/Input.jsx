import { StyleSheet, TextInput, View } from "react-native";
import { moderateScale } from "react-native-size-matters";
import { useController } from "react-hook-form";
import { getFontSize } from "../../utils.js/getFontSize";
import { useTheme } from "../../providers/ThemeProvider";

const Input = ({
  name,
  control,
  placeholder,
  secureTextEntry,
  keyboardType = "default",
  autoCapitalize,
  rules,
}) => {
  const { theme } = useTheme();

  const { field } = useController({
    control,
    name,
    rules,
  });

  return (
    <View style={styles.container}>
      <TextInput
        value={field.value}
        onChangeText={field.onChange}
        placeholder={placeholder}
        placeholderTextColor={theme.text}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize}
        style={[
          styles.input,
          {
            // backgroundColor: theme.bgColor,
            // color: theme.text,
          },
        ]}
      />
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  input: {
    width: "100%",
    padding: 17,
    borderWidth: 0.5,
    color: "#dfdfdf",
    borderColor: "#c7c7c7",
    backgroundColor: "#292d3e",
    borderRadius: 5,

    // fontSize: 1,
  },
});
