import { StyleSheet, Text, View } from "react-native";
import Input from "../ui/Input";
import { moderateScale, scale } from "react-native-size-matters";
import { getFontSize } from "../../utils.js/getFontSize";
import { useForm } from "react-hook-form";
import { Picker } from "@react-native-picker/picker";
import { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import PrimaryButton from "../ui/PrimaryButton";

const AddListingForm = () => {
  const [vrstaGoriva, setVrstaGoriva] = useState("");
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Dodaj oglas</Text>

      <View style={styles.row}>
        <View style={styles.inputBox}>
          {/* Model Input */}
          <Text style={styles.label}>Model:</Text>
          <Input
            control={control}
            name="model"
            placeholder="Unesite model vozila"
            keyboardType="email-address"
            rules={{
              required: "Model je obavezan.",
            }}
          />
          {errors.model && (
            <Text style={styles.error}>{errors.model.message}</Text>
          )}
        </View>

        <View style={styles.pickerContainer}>
          <Text style={styles.label}>Linija:</Text>
          <View style={styles.pickerWrapper}>
            <Picker
              selectedValue={vrstaGoriva}
              onValueChange={(value) => setVrstaGoriva(value)}
              style={styles.picker}
              dropdownIconColor={"#fff"}
            >
              <Picker.Item label="Običan" value="Običan" />
              <Picker.Item label="AMG" value="AMG" />
              <Picker.Item label="Maybach" value="Maybach" />
              <Picker.Item label="EQ" value="EQ" />
            </Picker>
          </View>
        </View>
      </View>

      <View style={styles.row}>
        <View style={styles.inputBox}>
          {/* Engine Size Input */}
          <Text style={styles.label}>Kubikaža:</Text>
          <Input
            control={control}
            name="engine_size"
            placeholder="Unesite kubikažu"
            keyboardType="numeric"
            rules={{
              required: "Kubikaža je obavezna.",
            }}
          />
          {errors.engine_size && (
            <Text style={styles.error}>{errors.engine_size.message}</Text>
          )}
        </View>

        <View style={styles.pickerContainer}>
          <Text style={styles.label}>Vrsta Goriva:</Text>
          <View style={styles.pickerWrapper}>
            <Picker
              selectedValue={vrstaGoriva}
              onValueChange={(value) => setVrstaGoriva(value)}
              style={styles.picker}
              dropdownIconColor={"#fff"}
            >
              <Picker.Item label="Vrsta goriva" value="" />
              <Picker.Item label="Benzin" value="Benzin" />
              <Picker.Item label="Dizel" value="Dizel" />
              <Picker.Item label="Hibrid" value="Hibrid" />
              <Picker.Item label="Električni" value="Električni" />
            </Picker>
          </View>
        </View>
      </View>

      <View style={styles.row}>
        <View style={styles.pickerContainer}>
          <Text style={styles.label}>Pogon:</Text>
          <View style={styles.pickerWrapper}>
            <Picker
              selectedValue={vrstaGoriva}
              onValueChange={(value) => setVrstaGoriva(value)}
              style={styles.picker}
              dropdownIconColor={"#fff"}
            >
              <Picker.Item label="Prednji" value="Prednji" />
              <Picker.Item label="Zadnji" value="Zadnji" />
              <Picker.Item label="4matic" value="4matic" />
            </Picker>
          </View>
        </View>

        <View style={styles.inputBox}>
          {/* Engine Size Input */}
          <Text style={styles.label}>Snaga:</Text>
          <Input
            control={control}
            name="power"
            placeholder="Unesite kubikažu"
            keyboardType="numeric"
            rules={{
              required: "Snaga je obavezna.",
            }}
          />
          {errors.pwoer && (
            <Text style={styles.error}>{errors.pwoer.message}</Text>
          )}
        </View>
      </View>

      <View style={styles.row}>
        <View style={styles.inputBox}>
          {/* Engine Size Input */}
          <Text style={styles.label}>Godina proizvodnje:</Text>
          <Input
            control={control}
            name="power"
            placeholder="Godina proizvodnje"
            keyboardType="numeric"
            rules={{
              required: "Godina proizvodnja je obavezna.",
            }}
          />
          {errors.pwoer && (
            <Text style={styles.error}>{errors.pwoer.message}</Text>
          )}
        </View>

        <View style={styles.inputBox}>
          {/* Engine Size Input */}
          <Text style={styles.label}>Boja:</Text>
          <Input
            control={control}
            name="color"
            placeholder="Unesite boju vozila"
            rules={{
              required: "Boja je obavezna.",
            }}
          />
          {errors.color && (
            <Text style={styles.error}>{errors.color.message}</Text>
          )}
        </View>
      </View>

      <View style={styles.row}>
        <View style={styles.pickerContainer}>
          <Text style={styles.label}>Tip:</Text>
          <View style={styles.pickerWrapper}>
            <Picker
              selectedValue={vrstaGoriva}
              onValueChange={(value) => setVrstaGoriva(value)}
              style={styles.picker}
              dropdownIconColor={"#fff"}
            >
              <Picker.Item label="Sedan" value="Sedan" />
              <Picker.Item label="Hatchback" value="Hatchback" />
              <Picker.Item label="Coupe" value="Coupe" />
              <Picker.Item label="Karavan" value="Karavan" />
              <Picker.Item label="Kabrio" value="Kabrio" />
              <Picker.Item label="SUV" value="SUV" />
            </Picker>
          </View>
        </View>

        <View style={styles.pickerContainer}>
          <Text style={styles.label}>Stanje:</Text>
          <View style={styles.pickerWrapper}>
            <Picker
              selectedValue={vrstaGoriva}
              onValueChange={(value) => setVrstaGoriva(value)}
              style={styles.picker}
              dropdownIconColor={"#fff"}
            >
              <Picker.Item label="Novo" value="Novo" />
              <Picker.Item label="Polovno" value="Polovno" />
              <Picker.Item label="Klasik" value="Klasik" />
            </Picker>
          </View>
        </View>
      </View>

      <Text onPress={pickImage} style={styles.label}>
        Otpremite fotografije
      </Text>

      <PrimaryButton>Dodaj oglas</PrimaryButton>
    </View>
  );
};

export default AddListingForm;

const styles = StyleSheet.create({
  container: {
    gap: moderateScale(20),
  },
  heading: {
    fontFamily: "Montserrat-SemiBold",
    color: "#ff4605",
    textAlign: "center",
    fontSize: getFontSize(28),
    paddingVertical: moderateScale(10),
  },
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: scale(6),
    justifyContent: "space-between",
  },
  inputBox: {
    position: "relative",
    flex: 1,
  },
  pickerContainer: {
    flex: 1,
  },
  pickerWrapper: {
    borderRadius: 5,
    borderWidth: 1,
    padding: 0,
    borderColor: "#d1d5db",
    overflow: "hidden",
    backgroundColor: "#19212f",
  },
  picker: {
    margin: moderateScale(-8),
    color: "#fff",
  },
  label: {
    color: "#fff",
    marginBottom: moderateScale(6),
  },
  error: {
    position: "absolute",
    bottom: moderateScale(-5),
    color: "#f87171",
  },
});
