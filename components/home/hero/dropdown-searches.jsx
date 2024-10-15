import React from "react";
import { View, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { moderateScale, verticalScale } from "react-native-size-matters";

const DropdownSearches = ({
  odGodine,
  doGodine,
  vrstaGoriva,
  odCene,
  doCene,
  karoserija,

  setOdGodine,
  setDoGodine,
  setVrstaGoriva,
  setOdCene,
  setDoCene,
  setKaroserija,
}) => {
  const currentYear = new Date().getFullYear();

  const getPriceOptions = () => {
    const priceOptions = [];
    for (let price = 2000; price < 10000; price += 2000) {
      priceOptions.push(
        <Picker.Item key={price} label={`${price}`} value={price} />
      );
    }
    for (let price = 10000; price <= 50000; price += 5000) {
      priceOptions.push(
        <Picker.Item key={price} label={`${price}`} value={price} />
      );
    }
    return priceOptions;
  };

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <View style={styles.pickerWrapper}>
          <Picker
            selectedValue={odGodine}
            onValueChange={(value) => setOdGodine(value)}
            style={styles.picker}
          >
            <Picker.Item label="Od godine" value="" />
            {Array.from({ length: currentYear - 1989 }, (_, i) => 1990 + i).map(
              (year) => (
                <Picker.Item key={year} label={`${year}`} value={year} />
              )
            )}
          </Picker>
        </View>

        <View style={styles.pickerWrapper}>
          <Picker
            selectedValue={doGodine}
            onValueChange={(value) => setDoGodine(value)}
            style={styles.picker}
          >
            <Picker.Item label="Do godine" value="" />
            {Array.from({ length: currentYear - 1989 }, (_, i) => 1990 + i).map(
              (year) => (
                <Picker.Item key={year} label={`${year}`} value={year} />
              )
            )}
          </Picker>
        </View>
      </View>

      <View style={styles.row}>
        <View style={styles.pickerWrapper}>
          <Picker
            selectedValue={vrstaGoriva}
            onValueChange={(value) => setVrstaGoriva(value)}
            style={styles.picker}
          >
            <Picker.Item label="Vrsta goriva" value="" />
            <Picker.Item label="Benzin" value="Benzin" />
            <Picker.Item label="Dizel" value="Dizel" />
            <Picker.Item label="Hibrid" value="Hibrid" />
            <Picker.Item label="Električni" value="Električni" />
          </Picker>
        </View>

        <View style={styles.pickerWrapper}>
          <Picker
            selectedValue={karoserija}
            onValueChange={(value) => setKaroserija(value)}
            style={styles.picker}
          >
            <Picker.Item label="Karoserija" value="" />
            <Picker.Item label="Sedan" value="Sedan" />
            <Picker.Item label="Hatchback" value="Hatchback" />
            <Picker.Item label="Karavan" value="Karavan" />
            <Picker.Item label="Kupe" value="Kupe" />
            <Picker.Item label="Kabrio" value="Kabrio" />
            <Picker.Item label="Suv" value="Suv" />
          </Picker>
        </View>
      </View>

      <View style={styles.row}>
        <View style={styles.pickerWrapper}>
          <Picker
            selectedValue={odCene}
            onValueChange={(value) => setOdCene(value)}
            style={styles.picker}
          >
            {getPriceOptions()}
          </Picker>
        </View>

        <View style={styles.pickerWrapper}>
          <Picker
            selectedValue={doCene}
            onValueChange={(value) => setDoCene(value)}
            style={styles.picker}
          >
            {getPriceOptions()}
          </Picker>
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
    marginVertical: verticalScale(10),
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
    height: verticalScale(30),
    margin: moderateScale(-8),
    backgroundColor: "#fff",
  },
});
