import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";
import { useState } from "react";
import { useTheme } from "../../../providers/ThemeProvider";
import DefaultText from "../../ui/DefaultText";
import { Calendar, LocaleConfig } from "react-native-calendars";
import PrimaryButton from "../../ui/PrimaryButton";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

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

const ScheduleService = ({ closeModal, listing }) => {
  const { theme } = useTheme();

  const [isCalendarVisible, setIsCalendarVisible] = useState(false);

  const [text, setText] = useState("");
  const [selectedOption, setSelectedOption] = useState("Service A");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [selectedDate, setSelectedDate] = useState("");

  const handleReserve = async () => {
    if (!phoneNumber.trim()) {
      Alert.alert("Greska", "Molimo unesite broj telefona.");
      return;
    }
    if (!text.trim()) {
      Alert.alert("Greska", "Molimo unesite napomenu.");
      return;
    }
    if (!selectedDate) {
      Alert.alert("Greska", "Molimo izaberite datum.");
      return;
    }
    const payload = {
      carModel: listing.model,
      date: selectedDate,
      userEmail: "eldinskenderi95@gmail.com",
      chassisNumber: listing.chassis_number,
      serviceCat: selectedOption,
      phoneNumber: phoneNumber,
      notes: text
    };

    try {
      const res = await fetch(
        "https://ikyedgjktjmgrjexpokc.supabase.co/functions/v1/send-reservation-email",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      if (res.ok) {
        Alert.alert("Uspesno", "Vas email za zakazivanje je poslat!");
      } else {
        Alert.alert("Error", "Failed to send email.");
        console.log("error");
      }
    } catch (err) {
      Alert.alert("Error", err.message);
      console.log(err);
    }
  };

  return (
    <>
      <View
        style={[styles.contentContainer, { backgroundColor: theme.bgShade }]}
      >
        <TouchableOpacity onPress={() => setSelectedOption("Service A")}>
          <View
            style={[styles.radioContainer, { backgroundColor: theme.bgColor }]}
          >
            <Text
              style={[
                selectedOption === "Service A"
                  ? styles.selectedRadio
                  : styles.radio,
              ]}
            ></Text>
            <DefaultText>SERVICE A</DefaultText>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setSelectedOption("Service B")}>
          <View
            style={[styles.radioContainer, { backgroundColor: theme.bgColor }]}
          >
            <Text
              style={
                selectedOption === "Service B"
                  ? styles.selectedRadio
                  : styles.radio
              }
            >
              ●
            </Text>
            <DefaultText>SERVICE B</DefaultText>
          </View>
        </TouchableOpacity>
      </View>
      <View
        style={{
          borderRadius: 16,
          backgroundColor: theme.bgShade,
          padding: moderateScale(10),
          marginTop: verticalScale(16),
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

      <View
        style={{
          borderRadius: 16,
          backgroundColor: theme.bgShade,
          padding: moderateScale(10),
          marginTop: verticalScale(16),
          color: theme.text,
          placeholder: theme.text,
        }}
      >
        <TextInput
          style={styles.input}
          numberOfLines={1} // Controls height
          placeholder="Vas broj telefona"
          placeholderTextColor={theme.textShade}
          value={phoneNumber}
          onChangeText={setPhoneNumber}
        />
      </View>

      <View style={{ flexDirection: "row", gap: scale(10) }}>
        <View
          style={{
            flex: 1,
            borderRadius: 16,
            overflow: "hidden",
            marginTop: verticalScale(16),
          }}
        >
          <TouchableOpacity
            onPress={() => setIsCalendarVisible(!isCalendarVisible)}
            style={{
              padding: moderateScale(13),
              width: "100%",
              backgroundColor: theme.bgShade,
              borderRadius: 16,
              alignItems: "center",
            }}
          >
            <View
              style={{
                color: theme.text,
                alignItems: "center",
                gap: 5,
                flexDirection: "row",
              }}
            >
              <DefaultText>
                <Ionicons name="calendar" size={16} />
              </DefaultText>
              <DefaultText>{selectedDate || "Izaberite datum"}</DefaultText>
              <DefaultText>
                <MaterialIcons name="keyboard-arrow-down" size={16}  />
              </DefaultText>
            </View>
          </TouchableOpacity>

          {isCalendarVisible && (
            <Calendar
              onDayPress={(day) => {
                setSelectedDate(day.dateString);
                setIsCalendarVisible(false);
              }}
              style={{
                borderRadius: 16,
                marginTop: verticalScale(2),
              }}
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
                [selectedDate]: {
                  selected: true,
                  selectedColor: theme.bgColor,
                },
              }}
              minDate={new Date().toISOString().split("T")[0]}
              disableAllTouchEventsForDisabledDays={true}
            />
          )}
        </View>
        <View style={{ marginTop: verticalScale(16), width: "30%" }}>
          <PrimaryButton onPress={handleReserve}>Zakazi</PrimaryButton>
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
    marginTop: 16,
    padding: 20,
    borderRadius: 16,
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center",
  },

  radioContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#000",
    paddingHorizontal: scale(14),
    paddingVertical: verticalScale(8),
    borderRadius: 999,
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
  input: {
    width: "100%",
    color: "#fff",
    borderRadius: 5,
  },
});

export default ScheduleService;
