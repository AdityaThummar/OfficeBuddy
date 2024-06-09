import { useMemo } from "react";
import { ThemeStateValuesType, themeState } from "../zustand";
import { ImageStyle, TextStyle, ViewStyle } from "react-native";

export type NamedStyles<T> = {
  [P in keyof T]: ViewStyle | TextStyle | ImageStyle;
};

export const useStyles = <
  T extends (args: ThemeStateValuesType) => NamedStyles<T> | NamedStyles<any>
>(
  func: T,
  deps: any[] = []
): ReturnType<T> => {
  const values = themeState();
  return useMemo(() => func(values), [values, ...deps]) as any;
};
