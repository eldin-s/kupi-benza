import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import DefaultText from "../ui/DefaultText";
import Input from "../ui/Input";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import { getFontSize } from "../../utils.js/getFontSize";
import PrimaryButton from "../ui/PrimaryButton";
import { useForm } from "react-hook-form";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  carColors,
  carFeatures,
  carSafety as carSafetyData,
  mercedesModels,
} from "../../utils.js/models";
import DropDownPicker from "react-native-dropdown-picker";
import { useUpdateListing } from "../../hooks/listings";
import Ionicons from "@expo/vector-icons/Ionicons";
import BouncyCheckbox from "react-native-bouncy-checkbox";

const EditListingForm = ({ listing, onClose, theme }) => {
  const { mutate: updateListing, isPending } = useUpdateListing();

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
    model: listing.model,
    line: listing.line,
    fuelType: listing.fuel_type,
    engineSize: listing.engine_size,
    drivetrain: listing.drivetrain,
    power: listing.power,
    productionYear: listing.production_year,
    color: listing.color,
    carType: listing.car_type,
    carState: listing.car_state,
    carSafeties: listing.car_safety,
    carFeatures: listing.car_features,
  });
  console.log(carData);

  const [availableEngines, setAvailableEngines] = useState([]);

  useEffect(() => {
    // Populate available engines based on the initial selected model
    if (carData.model) {
      const modelData = allModels.find((item) => item.model === carData.model);
      if (modelData) {
        const { className } = modelData;
        setAvailableEngines(mercedesModels[className]?.engines || []);
      } else {
        setAvailableEngines([]);
      }
    }
  }, [carData.model, allModels]);

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

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      power: listing.power.toString(),
    },
  });

  const onCreate = async (data) => {
    try {
      const newCarData = {
        ...data,
        model: carData.model,
        engine_size: carData.engineSize,
        fuel_type: carData.fuelType,
        drivetrain: carData.drivetrain,
        car_type: carData.carType,
        car_state: carData.carState,
        line: carData.line,
        production_year: carData.productionYear,
        color: carData.color,
        car_safety: carData.carSafeties,
        car_features: carData.carFeatures,
      };

      updateListing({
        data: newCarData,
        id: listing.id,
      });
    } catch (error) {
      Alert.alert("Failed to create listing", error.message);
    }
  };

  const allModels = Object.entries(mercedesModels).flatMap(
    ([className, { models }]) =>
      models.map((model) => ({
        model,
        className,
      }))
  );

  const currentYear = new Date().getFullYear();

  return (
    <ScrollView style={styles.container}>
      <SafeAreaView>
        <View style={{ position: "relative" }}>
          <DefaultText style={styles.heading}>Uredi oglas</DefaultText>

          <Pressable
            onPress={onClose}
            style={{ position: "absolute", top: 14, left: 4, padding: 4 }}
          >
            <DefaultText>
              <Ionicons name="arrow-back" size={24} />
            </DefaultText>
          </Pressable>

          <View style={styles.row}>
            <View style={styles.pickerContainer}>
              <DefaultText style={styles.label}>Model:</DefaultText>
              <View
                style={[
                  styles.pickerWrapper,
                  { backgroundColor: theme.bgColor },
                ]}
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
                style={[
                  styles.pickerWrapper,
                  { backgroundColor: theme.bgColor },
                ]}
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
                style={[
                  styles.pickerWrapper,
                  { backgroundColor: theme.bgColor },
                ]}
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
                style={[
                  styles.pickerWrapper,
                  { backgroundColor: theme.bgColor },
                ]}
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
                    handleChangeCarData(
                      "engineSize",
                      callback(carData.engineSize)
                    )
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
                style={[
                  styles.pickerWrapper,
                  { backgroundColor: theme.bgColor },
                ]}
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
                    handleChangeCarData(
                      "drivetrain",
                      callback(carData.drivetrain)
                    )
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
              {errors.power && (
                <DefaultText style={styles.error}>
                  {errors.power.message}
                </DefaultText>
              )}
            </View>
          </View>

          <View style={styles.row}>
            <View style={styles.pickerContainer}>
              <DefaultText style={styles.label}>
                Godina proizvodnje:
              </DefaultText>
              <View
                style={[
                  styles.pickerWrapper,
                  { backgroundColor: theme.bgColor },
                ]}
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
                  setOpen={(open) =>
                    handleChangeModal("godinaProizvodnje", open)
                  }
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
                style={[
                  styles.pickerWrapper,
                  { backgroundColor: theme.bgColor },
                ]}
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
                style={[
                  styles.pickerWrapper,
                  { backgroundColor: theme.bgColor },
                ]}
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

          <View style={styles.checkboxContainer}>
            <DefaultText style={{ fontSize: getFontSize(18) }}>
              Sigurnost
            </DefaultText>
            {carSafetyData.map((element, index) => (
              <BouncyCheckbox
                key={index}
                size={25}
                fillColor="#ff4605"
                unFillColor={theme.text}
                text={element}
                iconStyle={{ borderColor: "#c7c7c7" }}
                innerIconStyle={{ borderWidth: 1 }}
                isChecked={carData.carSafeties.includes(element)}
                onPress={(isChecked) => {
                  setCarData((prev) => ({
                    ...prev,
                    carSafeties: isChecked
                      ? [...prev.carSafeties, element]
                      : prev.carSafeties.filter((item) => item !== element),
                  }));
                }}
              />
            ))}
          </View>

          <View style={styles.checkboxContainer}>
            <DefaultText style={{ fontSize: getFontSize(18) }}>
              Oprema
            </DefaultText>
            {carFeatures.map((element, index) => (
              <BouncyCheckbox
                key={index}
                size={25}
                fillColor="#ff4605"
                unFillColor={theme.text}
                text={element}
                iconStyle={{ borderColor: "#c7c7c7" }}
                innerIconStyle={{ borderWidth: 1 }}
                isChecked={carData.carFeatures.includes(element)}
                onPress={(isChecked) => {
                  setCarData((prev) => ({
                    ...prev,
                    carFeatures: isChecked
                      ? [...prev.carFeatures, element]
                      : prev.carFeatures.filter((item) => item !== element),
                  }));
                }}
              />
            ))}
          </View>

          <View style={{ paddingTop: verticalScale(8) }}>
            <PrimaryButton onPress={handleSubmit(onCreate)}>
              {isPending ? (
                <ActivityIndicator color={theme.text} />
              ) : (
                "Uredi oglas"
              )}
            </PrimaryButton>
          </View>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

export default EditListingForm;

const styles = StyleSheet.create({
  container: {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    gap: moderateScale(10),
    paddingHorizontal: scale(6),
    height: "100%",
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
    paddingVertical: verticalScale(6),
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
  checkboxContainer: {
    marginTop: verticalScale(14),
    gap: verticalScale(10),
  },
});
