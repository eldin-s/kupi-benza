import {
  ActivityIndicator,
  Alert,
  Modal,
  Pressable,
  StyleSheet,
  View,
} from "react-native";
import Input from "../ui/Input";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import { getFontSize } from "../../utils.js/getFontSize";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
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
import SafetyAndFeaturesForm from "./safety-and-features-form";
import { SafeAreaView } from "react-native-safe-area-context";
import DropDownPicker from "react-native-dropdown-picker";

const AddListingForm = () => {
  const { theme } = useTheme();
  const [modalVisible, setModalVisible] = useState(false);
  const [images, setImages] = useState(null);

  const [open, setOpen] = useState({
    model: false,
    linija: false,
    vrstaGoriva: false,
    kubikaza: false,
    pogon: false,
    snaga: false,
    godinaProizvodnje: false,
    boja: false,
    tip: false,
    stanje: false,
  });

  const [carData, setCarData] = useState({
    model: "",
    line: "",
    fuelType: "",
    engineSize: "",
    drivetrain: "",
    power: "",
    productionYear: "",
    color: "",
    carType: "",
    carState: "",
    carSafeties: [],
    carFeatures: [],
  });

  const [availableEngines, setAvailableEngines] = useState([]);
  useEffect(() => {
    // Populate available engines based on the initial selected model
    if (carData?.model) {
      const modelData = allModels.find((item) => item.model === carData?.model);
      if (modelData) {
        const { className } = modelData;
        setAvailableEngines(mercedesModels[className]?.engines || []);
      } else {
        setAvailableEngines([]);
      }
    }
  }, [carData.model, allModels]);

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
  const handleChangeModal = (key, value) => {
    setOpen((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleChangeCarData = (key, value) => {
    setCarData((prev) => ({
      ...prev,
      [key]: value,
    }));
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
        car_safety: carSafeties,
        car_features: carFeatures,
      };

      console.log(newCarData);
      // createListing(newCarData);
    } catch (error) {
      Alert.alert("Neuspešno objavljivanje oglasa", error.message);
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
            <DropDownPicker
              open={open.model}
              value={carData.model}
              items={allModels.map((item) => ({
                label: item.model,
                value: item.model,
                key: item.model,
              }))}
              theme="DARK"
              setOpen={(open) => handleChangeModal("model", open)}
              setValue={(callback) =>
                handleChangeCarData("model", callback(carData.model))
              }
              placeholder="Model"
              listMode="MODAL"
              searchable={true}
              searchPlaceholder="Traži..."
            />
          </View>
        </View>
      </View>

      <View style={styles.row}>
        <View style={styles.pickerContainer}>
          <DefaultText style={styles.label}>Linija:</DefaultText>
          <View
            style={[styles.pickerWrapper, { backgroundColor: theme.bgColor }]}
          >
            <DropDownPicker
              open={open.linija}
              value={carData.line}
              items={[
                { label: "Poništi", value: null },
                { label: "Običan", value: "Običan" },
                { label: "AMG", value: "AMG" },
                { label: "Maybach", value: "Maybach" },
                { label: "EQ", value: "EQ" },
              ]}
              theme="DARK"
              setOpen={(open) => handleChangeModal("linija", open)}
              setValue={(callback) =>
                handleChangeCarData("line", callback(carData.line))
              }
              placeholder="Linija"
              listMode="MODAL"
              searchable={true}
              searchPlaceholder="Traži..."
            />
          </View>
        </View>

        <View style={styles.pickerContainer}>
          <DefaultText style={styles.label}>Vrsta Goriva:</DefaultText>
          <View
            style={[styles.pickerWrapper, { backgroundColor: theme.bgColor }]}
          >
            <DropDownPicker
              open={open.vrstaGoriva}
              value={carData.fuelType}
              items={[
                { label: "Benzin", value: "Benzin" },
                { label: "Dizel", value: "Dizel" },
                { label: "Hibrid", value: "Hibrid" },
                { label: "Električni", value: "Električni" },
              ]}
              theme="DARK"
              setOpen={(open) => handleChangeModal("vrstaGoriva", open)}
              setValue={(callback) =>
                handleChangeCarData("fuelType", callback(carData.fuelType))
              }
              placeholder="Vrsta goriva"
              listMode="MODAL"
              searchable={true}
              searchPlaceholder="Traži..."
            />
          </View>
        </View>
      </View>

      <View style={styles.row}>
        <View style={styles.pickerContainer}>
          <DefaultText style={styles.label}>Kubikaža:</DefaultText>
          <View
            style={[styles.pickerWrapper, { backgroundColor: theme.bgColor }]}
          >
            <DropDownPicker
              open={open.kubikaza}
              value={carData.engineSize}
              items={availableEngines.map((item) => ({
                label: item,
                value: item,
                key: item,
              }))}
              theme="DARK"
              setOpen={(open) => handleChangeModal("kubikaza", open)}
              setValue={(callback) =>
                handleChangeCarData("engineSize", callback(carData.engineSize))
              }
              placeholder="Kubikaza"
              listMode="MODAL"
              searchable={true}
              searchPlaceholder="Traži..."
            />
          </View>
        </View>
      </View>

      <View style={styles.row}>
        <View style={styles.pickerContainer}>
          <DefaultText style={styles.label}>Pogon:</DefaultText>
          <View
            style={[styles.pickerWrapper, { backgroundColor: theme.bgColor }]}
          >
            <DropDownPicker
              open={open.pogon}
              value={carData.drivetrain}
              items={[
                { label: "Prednji", value: "Prednji" },
                { label: "Zadnji", value: "Zadnji" },
                { label: "4matic", value: "4matic" },
              ]}
              theme="DARK"
              setOpen={(open) => handleChangeModal("pogon", open)}
              setValue={(callback) =>
                handleChangeCarData("drivetrain", callback(carData.drivetrain))
              }
              placeholder="Pogon"
              listMode="MODAL"
              searchable={true}
              searchPlaceholder="Traži..."
            />
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
            <DropDownPicker
              open={open.godinaProizvodnje}
              value={carData.productionYear}
              items={Array.from(
                { length: currentYear - 1989 },
                (_, i) => 1990 + i
              ).map((year) => ({
                label: year,
                value: year,
                key: year,
              }))}
              theme="DARK"
              setOpen={(open) => handleChangeModal("godinaProizvodnje", open)}
              setValue={(callback) =>
                handleChangeCarData(
                  "productionYear",
                  callback(carData.productionYear)
                )
              }
              placeholder="Model"
              listMode="MODAL"
              searchable={true}
              searchPlaceholder="Traži..."
            />
          </View>
        </View>

        <View style={styles.pickerContainer}>
          <DefaultText style={styles.label}>Boja:</DefaultText>
          <View
            style={[styles.pickerWrapper, { backgroundColor: theme.bgColor }]}
          >
            <DropDownPicker
              open={open.boja}
              value={carData.color}
              items={carColors.map((item) => ({
                label: item,
                value: item,
                key: item,
              }))}
              theme="DARK"
              setOpen={(open) => handleChangeModal("boja", open)}
              setValue={(callback) =>
                handleChangeCarData("color", callback(carData.color))
              }
              placeholder="Boja"
              listMode="MODAL"
              searchable={true}
              searchPlaceholder="Traži..."
            />
          </View>
        </View>
      </View>

      <View style={styles.row}>
        <View style={styles.pickerContainer}>
          <DefaultText style={styles.label}>Tip:</DefaultText>
          <View
            style={[styles.pickerWrapper, { backgroundColor: theme.bgColor }]}
          >
            <DropDownPicker
              open={open.tip}
              value={carData.carType}
              items={[
                { label: "Sedan", value: "Sedan" },
                { label: "Hatchback", value: "Hatchback" },
                { label: "Coupe", value: "Coupe" },
                { label: "Karavan", value: "Karavan" },
                { label: "Kabrio", value: "Kabrio" },
                { label: "SUV", value: "SUV" },
              ]}
              theme="DARK"
              setOpen={(open) => handleChangeModal("tip", open)}
              setValue={(callback) =>
                handleChangeCarData("carType", callback(carData.carType))
              }
              placeholder="Karoserija"
              listMode="MODAL"
              searchable={true}
              searchPlaceholder="Traži..."
            />
          </View>
        </View>

        <View style={styles.pickerContainer}>
          <DefaultText style={styles.label}>Stanje:</DefaultText>
          <View style={styles.pickerWrapper}>
            <DropDownPicker
              open={open.stanje}
              value={carData.carState}
              items={[
                { label: "Novo", value: "Novo" },
                { label: "Polovno", value: "Polovno" },
                { label: "Klasik", value: "Klasik" },
              ]}
              theme="DARK"
              setOpen={(open) => handleChangeModal("stanje", open)}
              setValue={(callback) =>
                handleChangeCarData("carState", callback(carData.carState))
              }
              placeholder="Stanje"
              listMode="MODAL"
              searchable={true}
              searchPlaceholder="Traži..."
            />
          </View>
        </View>
      </View>

      <Pressable
        style={styles.iconWrapper}
        onPress={() => setModalVisible(true)}
      >
        <DefaultText style={{ textAlign: "center" }}>
          Oprema i sigurnost
        </DefaultText>
      </Pressable>

      <Modal
        visible={modalVisible}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={{ backgroundColor: theme.bgColor }}>
          <SafetyAndFeaturesForm
            carSafeties={carData.carSafeties}
            setCarData={setCarData}
            carFeatures={carData.carFeatures}
            onClose={() => setModalVisible(false)}
            theme={theme}
          />
        </View>
      </Modal>

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
    flex: 1,
  },
  heading: {
    fontFamily: "Montserrat-SemiBold",
    color: "#ff4605",
    textAlign: "center",
    fontSize: getFontSize(28),
    paddingBottom: moderateScale(10),
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
  iconWrapper: {
    borderRadius: 5,
    borderWidth: 1,
    padding: 0,
    borderColor: "#a1a1a1",
    padding: moderateScale(8),
    overflow: "hidden",
    textAlign: "center",
  },
});
