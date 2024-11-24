import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { moderateScale, verticalScale } from "react-native-size-matters";
import DropDownPicker from "react-native-dropdown-picker";

const DropdownSearches = ({
  odGodine,
  setOdGodine,
  doGodine,
  setDoGodine,
  vrstaGoriva,
  setVrstaGoriva,
  odCene,
  setOdCene,
  doCene,
  setDoCene,
  karoserija,
  setKaroserija,
}) => {
  const fuels = [
    { label: "Benzin", value: "benzin" },
    { label: "Dizel", value: "dizel" },
    { label: "Hibrid", value: "hibrid" },
    { label: "Električni", value: "električni" },
  ];

  const bodyTypes = [
    { label: "Sedan", value: "sedan" },
    { label: "Hatchback", value: "hatchback" },
    { label: "Karavan", value: "karavan" },
    { label: "Kupe", value: "kupe" },
    { label: "Kabrio", value: "kabrio" },
    { label: "SUV", value: "suv" },
  ];

  const years = Array.from(
    { length: new Date().getFullYear() - 1989 },
    (_, i) => ({
      label: `${1990 + i}`,
      value: `${1990 + i}`,
    })
  );

  const [open, setOpen] = useState({
    odGodine: false,
    doGodine: false,
    vrstaGoriva: false,
    odCene: false,
    doCene: false,
    karoserija: false,
  });

  const handleChange = (key, value) => {
    setOpen((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const getPriceOptions = () => {
    const priceOptions = [];

    for (let price = 2000; price < 10000; price += 2000) {
      priceOptions.push({ label: `${price}`, value: price });
    }
    for (let price = 10000; price <= 50000; price += 5000) {
      priceOptions.push({ label: `${price}`, value: price });
    }

    return priceOptions;
  };

  const priceOptions = getPriceOptions();

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <View style={styles.pickerWrapper}>
          <DropDownPicker
            open={open.odGodine}
            value={odGodine}
            items={years}
            setOpen={(open) => handleChange("odGodine", open)}
            setValue={setOdGodine}
            placeholder="Od godine"
            listMode="MODAL"
            style={styles.dropDownPicker}
            dropDownContainerStyle={styles.dropDownContainer}
          />
        </View>

        <View style={styles.pickerWrapper}>
          <DropDownPicker
            open={open.doGodine}
            value={doGodine}
            items={years}
            setOpen={(open) => handleChange("doGodine", open)}
            setValue={setDoGodine}
            placeholder="Do godine"
            listMode="MODAL"
            style={styles.dropDownPicker}
            dropDownContainerStyle={styles.dropDownContainer}
          />
        </View>
      </View>

      <View style={styles.row}>
        <View style={styles.pickerWrapper}>
          <DropDownPicker
            open={open.vrstaGoriva}
            value={vrstaGoriva}
            items={fuels}
            setOpen={(open) => handleChange("vrstaGoriva", open)}
            setValue={setVrstaGoriva}
            placeholder="Vrsta Goriva"
            listMode="MODAL"
            style={styles.dropDownPicker}
            dropDownContainerStyle={styles.dropDownContainer}
          />
        </View>

        <View style={styles.pickerWrapper}>
          <DropDownPicker
            open={open.karoserija}
            value={karoserija}
            items={bodyTypes}
            setOpen={(open) => handleChange("karoserija", open)}
            setValue={setKaroserija}
            placeholder="Karoserija"
            listMode="MODAL"
            style={styles.dropDownPicker}
            dropDownContainerStyle={styles.dropDownContainer}
          />
        </View>
      </View>

      <View style={styles.row}>
        <View style={styles.pickerWrapper}>
          <DropDownPicker
            open={open.odCene}
            value={odCene}
            items={priceOptions}
            setOpen={(open) => handleChange("odCene", open)}
            setValue={setOdCene}
            placeholder="Od Cene"
            listMode="MODAL"
            style={styles.dropDownPicker}
            dropDownContainerStyle={styles.dropDownContainer}
          />
        </View>

        <View style={styles.pickerWrapper}>
          <DropDownPicker
            open={open.doCene}
            value={doCene}
            items={priceOptions}
            setOpen={(open) => handleChange("doCene", open)}
            setValue={setDoCene}
            placeholder="Od Cene"
            listMode="MODAL"
            style={styles.dropDownPicker}
            dropDownContainerStyle={styles.dropDownContainer}
          />
        </View>
      </View>
    </View>
  );
};

export default DropdownSearches;

const styles = StyleSheet.create({
  container: {
    marginVertical: verticalScale(16),
  },

  row: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginVertical: verticalScale(6),
  },
  pickerWrapper: {
    flex: 1,
    margin: 3,
    borderRadius: 10,
    borderWidth: 1,
    padding: 0,
    borderColor: "gray",
    overflow: "hidden",
  },
  picker: {
    height: verticalScale(40),
    margin: moderateScale(-8),
    backgroundColor: "#fff",
  },
  dropDownPicker: {
    minHeight: verticalScale(28),
    borderWidth: 0.2,
    padding: -2,
  },
});
