import { ActivityIndicator, Alert, StyleSheet, Text, View } from "react-native";
import Input from "../ui/Input";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import { getFontSize } from "../../utils.js/getFontSize";
import { useForm } from "react-hook-form";
import { Picker } from "@react-native-picker/picker";
import { useEffect, useState } from "react";
import * as ImagePicker from "expo-image-picker";
import PrimaryButton from "../ui/PrimaryButton";
import { supabase, supabaseUrl } from "../../lib/supabase";
import { useCreateListing } from "../../app/api/listings";
import { useAuth } from "../../providers/AuthProvider";
import { decode } from "base64-arraybuffer";
import * as FileSystem from "expo-file-system";
import { mercedesModels } from "../../utils.js/models";

const AddListingForm = () => {
  const [vrstaGoriva, setVrstaGoriva] = useState("");
  const [driveTrain, setDriveTrain] = useState("");
  const [carType, setCarType] = useState("");
  const [carState, setCarState] = useState("");
  const [line, setLine] = useState("");
  const [images, setImages] = useState(null);

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
        fuel_type: vrstaGoriva,
        drivetrain: driveTrain,
        car_type: carType,
        car_state: carState,
        line: line,
        car_images: imagesPath,
        profile_id: session.user.id,
      };

      const newCar = createListing(newCarData);
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
      <Text style={styles.heading}>Dodaj oglas</Text>

      <View style={styles.inputBox}>
        {/* Model Input */}
        <View style={styles.pickerContainer}>
          <Text style={styles.label}>Model:</Text>
          <View style={styles.pickerWrapper}>
            <Picker
              selectedValue={line}
              onValueChange={(value) => {
                setLine(value);
                setValue("line", value);
              }}
              style={styles.picker}
              dropdownIconColor={"#fff"}
            >
              <Picker.Item label="Odaberi..." value="" />
              {mercedesModels.map((model) => (
                <Picker.Item key={model} label={model} value={model} />
              ))}
            </Picker>
          </View>
        </View>
      </View>

      <View style={styles.row}>
        <View style={styles.pickerContainer}>
          <Text style={styles.label}>Linija:</Text>
          <View style={styles.pickerWrapper}>
            <Picker
              selectedValue={line}
              onValueChange={(value) => {
                setLine(value);
                setValue("line", value);
              }}
              style={styles.picker}
              dropdownIconColor={"#fff"}
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
          <Text style={styles.label}>Vrsta Goriva:</Text>
          <View style={styles.pickerWrapper}>
            <Picker
              selectedValue={vrstaGoriva}
              onValueChange={(value) => {
                setVrstaGoriva(value);
                setValue("fuel_type", value);
              }}
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

        <View style={styles.inputBox}>
          {/* Engine Size Input */}
          <Text style={styles.label}>Obrtni moment:</Text>
          <Input
            control={control}
            name="torque"
            placeholder="Unesite obrtni moment"
            keyboardType="numeric"
            rules={{
              required: "Obrtni moment je obavezan.",
            }}
          />
          {errors.engine_size && (
            <Text style={styles.error}>{errors.engine_size.message}</Text>
          )}
        </View>
      </View>

      <View style={styles.row}>
        <View style={styles.pickerContainer}>
          <Text style={styles.label}>Pogon:</Text>
          <View style={styles.pickerWrapper}>
            <Picker
              selectedValue={driveTrain}
              onValueChange={(value) => {
                setDriveTrain(value);
                setValue("drivetrain", value);
              }}
              style={styles.picker}
              dropdownIconColor={"#fff"}
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
          <Text style={styles.label}>Snaga:</Text>
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
            name="production_year"
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
              selectedValue={carType}
              onValueChange={(value) => {
                setCarType(value);
                setValue("car_type", value);
              }}
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
              selectedValue={carState}
              onValueChange={(value) => {
                setCarState(value);
                setValue("car_state", value);
              }}
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

      <Text onPress={pickImage} style={styles.imagePick}>
        {images
          ? `${images.length} fotografija otpremljeno`
          : "Otpremite fotografije"}
      </Text>

      <PrimaryButton onPress={handleSubmit(onCreate)}>
        {isPending ? <ActivityIndicator color="#fff" /> : "Dodaj oglas"}
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
  imagePick: {
    color: "#fff",
    textAlign: "center",
    paddingVertical: verticalScale(6),
    backgroundColor: "#19212f",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#fff",
    borderStyle: "dashed",
  },
  error: {
    position: "absolute",
    bottom: moderateScale(-5),
    color: "#f87171",
  },
});
