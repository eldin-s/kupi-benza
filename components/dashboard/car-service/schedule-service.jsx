import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import { useTheme } from "../../../providers/ThemeProvider";
import DefaultText from "../../ui/DefaultText";
import { Calendar, LocaleConfig } from "react-native-calendars";
import PrimaryButton from "../../ui/PrimaryButton";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";

LocaleConfig.locales["sr"] = {
  monthNames: [
    "Januar",
    "Februar",
    "Mart",
    "April",
    "Maj",
    "Jun",
    "Jul",
    "Avgust",
    "Septembar",
    "Octobar",
    "Novembar",
    "Decembar",
  ],
  monthNamesShort: [
    "Jan.",
    "Feb.",
    "Mar",
    "Apr",
    "Maj",
    "Jun",
    "Jul.",
    "Avg",
    "Sep.",
    "Okt.",
    "Nov.",
    "Dec.",
  ],
  dayNames: [
    "Ponedeljak",
    "Utorak",
    "Sreda",
    "Cetvrtak",
    "Petak",
    "Subota",
    "Nedelja",
  ],
  dayNamesShort: ["Pon", "Uto", "Sre", "Cet", "Pet", "Sub", "Ned"],
  today: "Danas",
};
LocaleConfig.defaultLocale = "sr";

const ScheduleService = ({ closeModal }) => {
  const { theme } = useTheme();

  const [text, setText] = useState("");
  const [selectedOption, setSelectedOption] = useState("option1");
  const [selectedDate, setSelectedDate] = useState("");

  return (
    <>
      <View
        style={[styles.contentContainer, { backgroundColor: theme.bgShade }]}
      >
        <View style={styles.radioContainer}>
          <TouchableOpacity onPress={() => setSelectedOption("option1")}>
            <Text
              style={[
                selectedOption === "option1"
                  ? styles.selectedRadio
                  : styles.radio,
              ]}
            ></Text>
          </TouchableOpacity>
          <DefaultText>SERVICE A</DefaultText>
        </View>
        <View style={styles.radioContainer}>
          <TouchableOpacity onPress={() => setSelectedOption("option2")}>
            <Text
              style={
                selectedOption === "option2"
                  ? styles.selectedRadio
                  : styles.radio
              }
            >
              ●
            </Text>
          </TouchableOpacity>
          <DefaultText>SERVICE B</DefaultText>
        </View>
        <View style={styles.radioContainer}>
          <TouchableOpacity onPress={() => setSelectedOption("option3")}>
            <Text
              style={
                selectedOption === "option3"
                  ? styles.selectedRadio
                  : styles.radio
              }
            >
              ●
            </Text>
          </TouchableOpacity>
          <DefaultText>DETALJNI PREGLED VOZILA</DefaultText>
        </View>
      </View>
      <View
        style={{
          borderRadius: 16,
          backgroundColor: theme.bgShade,
          padding: moderateScale(10),
          marginTop: verticalScale(20),
          color: theme.text,
          placeholder: theme.text,
        }}
      >
        <TextInput
          style={styles.textArea}
          multiline={true}
          numberOfLines={10} // Controls height
          placeholder="Napisite napomenu..."
          placeholderTextColor={theme.textShade}
          value={text}
          onChangeText={setText}
        />
      </View>

      <View style={{ flexDirection: "row", gap: scale(6) }}>
        <View
          style={{
            flex: 1,
            borderRadius: 16,
            overflow: "hidden",
            marginTop: verticalScale(20),
          }}
        >
          <Calendar
            onDayPress={(day) => setSelectedDate(day.dateString)}
            theme={{
              backgroundColor: theme.bgShade,
              calendarBackground: theme.bgShade,
              textSectionTitleColor: theme.textShade, // Day names color
              dayTextColor: theme.text, // Regular day color
              todayTextColor: theme.text, // Today’s color
              selectedDayBackgroundColor: theme.bgColor,
              selectedDayTextColor: theme.text,
              arrowColor: theme.text,
              monthTextColor: theme.text, // Month color
              yearTextColor: theme.textShade, // Year color
              textDisabledColor: theme.textShade, // Previous/Next month’s days color
            }}
            markedDates={{
              [selectedDate]: { selected: true, selectedColor: theme.bgColor },
            }}
            disableAllTouchEventsForDisabledDays={true} // Optional: Prevents clicking on disabled days
          />
        </View>
        <View>
          <View
            style={{
              borderRadius: 16,
              backgroundColor: theme.bgShade,
              padding: moderateScale(10),
              marginTop: verticalScale(20),
              color: theme.text,
              placeholder: theme.text,
            }}
          >
            <DefaultText weight="semibold">NAPOMENA</DefaultText>
            <DefaultText style={{ color: theme.textShade }}>
              Rando vreme:
            </DefaultText>
            <DefaultText style={{ color: theme.textShade }}>
              09:00 - 17:00
            </DefaultText>
            <DefaultText style={{ color: theme.textShade }}>
              Subota:
            </DefaultText>
            <DefaultText style={{ color: theme.textShade }}>
              09:00 - 14:00
            </DefaultText>
            <DefaultText style={{ color: theme.textShade }}>
              Nedelja:
            </DefaultText>
            <DefaultText style={{ color: theme.textShade }}>
              Zatvoreno
            </DefaultText>
          </View>
          <View style={{ marginTop: verticalScale(6) }}>
            <PrimaryButton onPress={closeModal}>Zakazi</PrimaryButton>
          </View>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  contentContainer: {
    flexDirection: "row",
    gap: 10,
    marginTop: 20,
    padding: 20,
    borderRadius: 16,
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center",
  },

  radioContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    flexWrap: "wrap",
  },
  radio: {
    fontSize: 1,
    marginRight: 8,
    backgroundColor: "#fff",
    borderRadius: 99,
    height: 18,
    width: 18,
  },
  selectedRadio: {
    fontSize: 1,
    marginRight: 8,
    backgroundColor: "#ff4605",
    borderWidth: 2,
    borderColor: "#fff",
    borderRadius: 99,
    height: 18,
    width: 18,
  },
  textArea: {
    width: "100%",
    borderRadius: 5,
    textAlignVertical: "top",
    minHeight: 100,
    color: "#fff",
  },
});

export default ScheduleService;
