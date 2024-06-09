import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { ZustandKeys } from "../appstrings";
import { configureMMKV } from "./ZustandFunctions";
import {
  ColorsValuesType,
  darkThemeColors,
  lightThemeColors,
} from "../styles/theme";
import { StyleSheet, TextStyle, ViewStyle } from "react-native";
import { useMemo } from "react";

export type MainThemeType = "dark" | "light";

export type ThemeStateValuesType = {
  theme: MainThemeType;
  setTheme: (t: MainThemeType) => void;
  colors: ColorsValuesType;
};

export const getSchemeColors = (state: ThemeStateValuesType) => {
  const isLight = state?.theme === "light";

  return {
    ...(isLight ? lightThemeColors : darkThemeColors),
  };
};

export const themeState = create(
  persist<ThemeStateValuesType>(
    (set, get) => {
      const setTheme = (t: MainThemeType) =>
        set((s) => ({
          ...s,
          theme: t,
          colors: getSchemeColors({ ...get(), theme: t }),
        }));

      return {
        theme: "light",
        setTheme,
        colors: lightThemeColors,
      };
    },
    {
      name: ZustandKeys.themeState,
      storage: createJSONStorage(
        configureMMKV.bind(this, ZustandKeys.themeState)
      ),
    }
  )
);

export const themeStateValues = () => themeState.getState();
