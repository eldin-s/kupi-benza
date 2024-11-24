import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { moderateScale, verticalScale } from "react-native-size-matters";
import DropDownPicker from "react-native-dropdown-picker";

const DropdownSearches = ({ filters, handleChangeFilters }) => {
  const fuels = [
    { label: "Poništi", value: null },
    { label: "Benzin", value: "Benzin" },
    { label: "Dizel", value: "Dizel" },
    { label: "Hibrid", value: "Hibrid" },
    { label: "Električni", value: "Električni" },
  ];

  const bodyTypes = [
    { label: "Poništi", value: null },
    { label: "Sedan", value: "Sedan" },
    { label: "Hatchback", value: "Hatchback" },
    { label: "Karavan", value: "Karavan" },
    { label: "Kupe", value: "Kupe" },
    { label: "Kabrio", value: "Kabrio" },
    { label: "SUV", value: "SUV" },
  ];

  const years = [
    { label: "Ponitšti", value: null },
    ...Array.from({ length: new Date().getFullYear() - 1989 }, (_, i) => ({
      label: `${1990 + i}`,
      value: `${1990 + i}`,
    })),
  ];

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
    const priceOptions = [{ label: "Poništi", value: null }];

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
            value={filters.odGodine}
            items={years}
            setOpen={(open) => handleChange("odGodine", open)}
            setValue={(callback) =>
              handleChangeFilters("odGodine", callback(filters.odGodine))
            }
            placeholder="Od godine"
            listMode="MODAL"
            style={styles.dropDownPicker}
            dropDownContainerStyle={{
              backgroundColor: "#000",
              borderColor: "skyblue",
            }}
            labelStyle={{ backgroundColor: "#fff" }}
            searchable={true}
            searchPlaceholder="Traži..."
          />
        </View>

        <View style={styles.pickerWrapper}>
          <DropDownPicker
            open={open.doGodine}
            value={filters.doGodine}
            items={years}
            setOpen={(open) => handleChange("doGodine", open)}
            setValue={(callback) =>
              handleChangeFilters("doGodine", callback(filters.doGodine))
            }
            placeholder="Do godine"
            listMode="MODAL"
            style={styles.dropDownPicker}
            dropDownContainerStyle={styles.dropDownContainer}
            searchable={true}
            searchPlaceholder="Traži..."
          />
        </View>
      </View>

      <View style={styles.row}>
        <View style={styles.pickerWrapper}>
          <DropDownPicker
            open={open.vrstaGoriva}
            value={filters.vrstaGoriva}
            items={fuels}
            setOpen={(open) => handleChange("vrstaGoriva", open)}
            setValue={(callback) =>
              handleChangeFilters("vrstaGoriva", callback(filters.vrstaGoriva))
            }
            placeholder="Vrsta Goriva"
            listMode="MODAL"
            style={styles.dropDownPicker}
            dropDownContainerStyle={styles.dropDownContainer}
            searchable={true}
            searchPlaceholder="Traži..."
          />
        </View>

        <View style={styles.pickerWrapper}>
          <DropDownPicker
            open={open.karoserija}
            value={filters.karoserija}
            items={bodyTypes}
            setOpen={(open) => handleChange("karoserija", open)}
            setValue={(callback) =>
              handleChangeFilters("karoserija", callback(filters.karoserija))
            }
            placeholder="Karoserija"
            listMode="MODAL"
            style={styles.dropDownPicker}
            dropDownContainerStyle={styles.dropDownContainer}
            searchable={true}
            searchPlaceholder="Traži..."
          />
        </View>
      </View>

      <View style={styles.row}>
        <View style={styles.pickerWrapper}>
          <DropDownPicker
            open={open.odCene}
            value={filters.odCene}
            items={priceOptions}
            setOpen={(open) => handleChange("odCene", open)}
            setValue={(callback) =>
              handleChangeFilters("odCene", callback(filters.odCene))
            }
            placeholder="Od Cene"
            listMode="MODAL"
            style={styles.dropDownPicker}
            dropDownContainerStyle={styles.dropDownContainer}
            searchable={true}
            searchPlaceholder="Traži..."
          />
        </View>

        <View style={styles.pickerWrapper}>
          <DropDownPicker
            open={open.doCene}
            value={filters.doCene}
            items={priceOptions}
            setOpen={(open) => handleChange("doCene", open)}
            setValue={(callback) =>
              handleChangeFilters("doCene", callback(filters.doCene))
            }
            placeholder="Do Cene"
            listMode="MODAL"
            style={styles.dropDownPicker}
            dropDownContainerStyle={styles.dropDownContainer}
            searchable={true}
            searchPlaceholder="Traži..."
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
    backgroundColor: "#fff",
  },
});
