import { StyleSheet, TextInput, View } from "react-native";
import { moderateScale } from "react-native-size-matters";
import { useController } from "react-hook-form";
import { getFontSize } from "../../utils.js/getFontSize";

const Input = ({
  name,
  control,
  placeholder,
  secureTextEntry,
  keyboardType = "default",
  autoCapitalize,
  rules,
}) => {
  const {
    field,
    fieldState: { error },
  } = useController({
    control,
    defaultValue: "",
    name,
    rules, // Pass the validation rules here
  });

  return (
    <View style={styles.container}>
      <TextInput
        value={field.value}
        onChangeText={field.onChange}
        placeholder={placeholder}
        placeholderTextColor="#fff"
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize}
        style={[styles.input, { backgroundColor: "#19212f" }]}
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
    borderColor: "#d1d5db",
    borderRadius: 5,
    color: "white",
    fontSize: getFontSize(16),
  },
});
