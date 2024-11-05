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
    defaultValue: "",
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
            backgroundColor: theme.bgColor,
            color: theme.text,
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
    padding: moderateScale(4.6),
    borderWidth: 1,
    borderColor: "#777777",
    borderRadius: 5,

    fontSize: getFontSize(16),
  },
});
