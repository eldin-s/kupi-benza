import { ActivityIndicator, Alert, StyleSheet, Text, View } from "react-native";
import Input from "../ui/Input";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import { getFontSize } from "../../utils.js/getFontSize";
import { useForm } from "react-hook-form";
import { Picker } from "@react-native-picker/picker";
import { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import PrimaryButton from "../ui/PrimaryButton";
import { supabase, supabaseUrl } from "../../lib/supabase";

import { useAuth } from "../../providers/AuthProvider";
import { decode } from "base64-arraybuffer";
import * as FileSystem from "expo-file-system";
import { carColors, mercedesModels } from "../../utils.js/models";
import { useTheme } from "../../providers/ThemeProvider";
import DefaultText from "../ui/DefaultText";
import { useCreateListing } from "../../hooks/listings";

const AddListingForm = () => {
  const { theme } = useTheme();
  const [vrstaGoriva, setVrstaGoriva] = useState("");
  const [driveTrain, setDriveTrain] = useState("");
  const [carType, setCarType] = useState("");
  const [carState, setCarState] = useState("");
  const [line, setLine] = useState("");
  const [color, setColor] = useState("");
  const [images, setImages] = useState(null);

  const [selectedModel, setSelectedModel] = useState("");
  const [engineSize, setEngineSize] = useState([]);
  const [availableEngines, setAvailableEngines] = useState([]);
  const [productionYear, setProductionYear] = useState("");
  const currentYear = new Date().getFullYear();

  // Flatten all models
  const allModels = Object.entries(mercedesModels).flatMap(
    ([className, { models }]) =>
      models.map((model) => ({
        model,
        className,
      }))
  );

  // Handle model selection
  const handleModelChange = (value) => {
    setSelectedModel(value);
    const modelData = allModels.find((item) => item.model === value);
    if (modelData) {
      const { className } = modelData;
      setAvailableEngines(mercedesModels[className].engines);
    } else {
      setAvailableEngines([]);
    }
  };

  const { session } = useAuth();
  const { mutate: createListing, isPending } = useCreateListing();

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      aspect: [4, 3],
      quality: 1,
      allowsMultipleSelection: true,
    });

    if (!result.canceled) {
      const imageUris = result.assets.map((asset) => asset.uri);
      setImages(imageUris);
    }
  };

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const onCreate = async (data) => {
    try {
      const imagesPath = await uploadImagesToSupabase();

      const newCarData = {
        ...data,
        model: selectedModel,
        engine_size: engineSize,
        fuel_type: vrstaGoriva,
        drivetrain: driveTrain,
        car_type: carType,
        car_state: carState,
        line: line,
        production_year: productionYear,
        color,
        car_images: imagesPath,
        profile_id: session.user.id,
      };

      const newCar = createListing(newCarData);

      console.log(newCar);
    } catch (error) {
      Alert.alert("Failed to create listing", error.message);
    }
  };

  async function uploadImagesToSupabase() {
    const imagePaths = [];

    for (const image of images) {
      if (!image?.startsWith("file://")) {
        return;
      }

      const base64 = await FileSystem.readAsStringAsync(image, {
        encoding: "base64",
      });
      const filePath = `${Math.random()}`.replace(/\s+/g, "-");
      const contentType = "image/png";

      const { data, error } = await supabase.storage
        .from("pictures")
        .upload(filePath, decode(base64), { contentType });

      if (data) {
        const imagePath = `${supabaseUrl}/storage/v1/object/public/pictures/${filePath}`;
        imagePaths.push(imagePath);
      }
    }

    return imagePaths;
  }

  return (
    <View style={styles.container}>
      <DefaultText style={styles.heading}>Dodaj oglas</DefaultText>

      <View style={styles.row}>
        <View style={styles.pickerContainer}>
          <DefaultText style={styles.label}>Model:</DefaultText>
          <View
            style={[styles.pickerWrapper, { backgroundColor: theme.bgColor }]}
          >
            <Picker
              selectedValue={selectedModel}
              onValueChange={(value) => handleModelChange(value)}
              style={[styles.picker, { color: theme.text }]}
              dropdownIconColor={theme.text}
            >
              <Picker.Item label="Odaberi model..." value="" />
              {allModels.map(({ model }) => (
                <Picker.Item key={model} label={model} value={model} />
              ))}
            </Picker>
          </View>
        </View>
      </View>

      <View style={styles.row}>
        <View style={styles.pickerContainer}>
          <DefaultText style={styles.label}>Linija:</DefaultText>
          <View
            style={[styles.pickerWrapper, { backgroundColor: theme.bgColor }]}
          >
            <Picker
              selectedValue={line}
              onValueChange={(value) => {
                setLine(value);
                setValue("line", value);
              }}
              style={[styles.picker, { color: theme.text }]}
              dropdownIconColor={theme.text}
            >
              <Picker.Item label="Odaberi..." value="" />
              <Picker.Item label="Običan" value="Običan" />
              <Picker.Item label="AMG" value="AMG" />
              <Picker.Item label="Maybach" value="Maybach" />
              <Picker.Item label="EQ" value="EQ" />
            </Picker>
          </View>
        </View>

        <View style={styles.pickerContainer}>
          <DefaultText style={styles.label}>Vrsta Goriva:</DefaultText>
          <View
            style={[styles.pickerWrapper, { backgroundColor: theme.bgColor }]}
          >
            <Picker
              selectedValue={vrstaGoriva}
              onValueChange={(value) => {
                setVrstaGoriva(value);
                setValue("fuel_type", value);
              }}
              style={[styles.picker, { color: theme.text }]}
              dropdownIconColor={theme.text}
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
          <DefaultText style={styles.label}>Kubikaža:</DefaultText>
          <View
            style={[styles.pickerWrapper, { backgroundColor: theme.bgColor }]}
          >
            <Picker
              selectedValue={engineSize}
              onValueChange={(value) => setEngineSize(value)}
              style={[styles.picker, { color: theme.text }]}
              dropdownIconColor={theme.text}
            >
              <Picker.Item label="Odaberi kubikažu..." value="" />
              {availableEngines.map((engine) => (
                <Picker.Item key={engine} label={engine} value={engine} />
              ))}
            </Picker>
          </View>
        </View>
      </View>

      <View style={styles.row}>
        <View style={styles.pickerContainer}>
          <DefaultText style={styles.label}>Pogon:</DefaultText>
          <View
            style={[styles.pickerWrapper, { backgroundColor: theme.bgColor }]}
          >
            <Picker
              selectedValue={driveTrain}
              onValueChange={(value) => {
                setDriveTrain(value);
                setValue("drivetrain", value);
              }}
              style={[styles.picker, { color: theme.text }]}
              dropdownIconColor={theme.text}
            >
              <Picker.Item label="Odaberi..." value="" />
              <Picker.Item label="Prednji" value="Prednji" />
              <Picker.Item label="Zadnji" value="Zadnji" />
              <Picker.Item label="4matic" value="4matic" />
            </Picker>
          </View>
        </View>

        <View style={styles.inputBox}>
          {/* Engine Size Input */}
          <DefaultText style={styles.label}>Snaga:</DefaultText>
          <Input
            control={control}
            name="power"
            placeholder="Unesite konjske snage"
            keyboardType="numeric"
            rules={{
              required: "Snaga je obavezna.",
            }}
          />
          {errors.pwoer && (
            <DefaultText style={styles.error}>
              {errors.power.message}
            </DefaultText>
          )}
        </View>
      </View>

      <View style={styles.row}>
        <View style={styles.pickerContainer}>
          <DefaultText style={styles.label}>Godina proizvodnje:</DefaultText>
          <View
            style={[styles.pickerWrapper, { backgroundColor: theme.bgColor }]}
          >
            <Picker
              selectedValue={productionYear}
              onValueChange={(value) => setProductionYear(value)}
              style={[styles.picker, { color: theme.text }]}
              dropdownIconColor={theme.text}
            >
              <Picker.Item label="Odaberi godinu" value="" />
              {Array.from(
                { length: currentYear - 1989 },
                (_, i) => 1990 + i
              ).map((year) => (
                <Picker.Item key={year} label={`${year}`} value={year} />
              ))}
            </Picker>
          </View>
        </View>

        <View style={styles.pickerContainer}>
          <DefaultText style={styles.label}>Boja:</DefaultText>
          <View
            style={[styles.pickerWrapper, { backgroundColor: theme.bgColor }]}
          >
            <Picker
              selectedValue={line}
              onValueChange={(value) => {
                setColor(value);
                setValue("color", value);
              }}
              style={[styles.picker, { color: theme.text }]}
              dropdownIconColor={theme.text}
            >
              <Picker.Item label="Odaberi boju" value="" />
              {carColors.map((color) => (
                <Picker.Item key={color} label={color} value={color} />
              ))}
            </Picker>
          </View>
        </View>
      </View>

      <View style={styles.row}>
        <View style={styles.pickerContainer}>
          <DefaultText style={styles.label}>Tip:</DefaultText>
          <View
            style={[styles.pickerWrapper, { backgroundColor: theme.bgColor }]}
          >
            <Picker
              selectedValue={carType}
              onValueChange={(value) => {
                setCarType(value);
                setValue("car_type", value);
              }}
              style={[styles.picker, { color: theme.text }]}
              dropdownIconColor={theme.text}
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
          <DefaultText style={styles.label}>Stanje:</DefaultText>
          <View style={styles.pickerWrapper}>
            <Picker
              selectedValue={carState}
              onValueChange={(value) => {
                setCarState(value);
                setValue("car_state", value);
              }}
              style={[styles.picker, { color: theme.text }]}
              dropdownIconColor={theme.text}
            >
              <Picker.Item label="Novo" value="Novo" />
              <Picker.Item label="Polovno" value="Polovno" />
              <Picker.Item label="Klasik" value="Klasik" />
            </Picker>
          </View>
        </View>
      </View>

      <DefaultText onPress={pickImage} style={styles.imagePick}>
        {images
          ? `${images.length} fotografija otpremljeno`
          : "Otpremite fotografije"}
      </DefaultText>

      <PrimaryButton onPress={handleSubmit(onCreate)}>
        {isPending ? <ActivityIndicator color={theme.text} /> : "Dodaj oglas"}
      </PrimaryButton>
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
    borderColor: "#a1a1a1",
    overflow: "hidden",
  },
  picker: {
    margin: moderateScale(-8),
  },
  label: {
    marginBottom: moderateScale(6),
  },
  imagePick: {
    textAlign: "center",
    paddingVertical: verticalScale(6),
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#a1a1a1",
    borderStyle: "dashed",
  },
  error: {
    position: "absolute",
    bottom: moderateScale(-18),
    color: "#f87171",
  },
});
