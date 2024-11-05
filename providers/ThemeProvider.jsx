import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Colors from "../constants/Colors";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(Colors.dark); // Default to dark theme

  // Load saved theme on app load
  useEffect(() => {
    const loadTheme = async () => {
      const storedTheme = await AsyncStorage.getItem("userTheme");
      if (storedTheme) {
        setTheme(storedTheme === "dark" ? Colors.dark : Colors.light);
      }
    };
    loadTheme();
  }, []);

  // Toggle theme and save the selection
  const toggleTheme = async () => {
    const newTheme = theme === Colors.dark ? Colors.light : Colors.dark;
    setTheme(newTheme);
    await AsyncStorage.setItem(
      "userTheme",
      newTheme === Colors.dark ? "dark" : "light"
    );
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
