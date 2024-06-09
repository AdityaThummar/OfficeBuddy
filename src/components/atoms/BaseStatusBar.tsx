import { StatusBar } from "react-native";
import React from "react";
import { themeState } from "../../zustand";
import { StatusBarProps } from "expo-status-bar";

export const BaseStatusBar = (props: StatusBarProps) => {
  const {
    colors: { background },
    theme,
  } = themeState();

  return (
    <StatusBar
      translucent={false}
      barStyle={theme === "light" ? "dark-content" : "light-content"}
      backgroundColor={background}
      {...props}
    />
  );
};
