import React from "react";
import {
  NativeStackNavigationOptions,
  createNativeStackNavigator,
} from "@react-navigation/native-stack";
import { themeState } from "../zustand";
import { MainStackScreensType } from "./types";
import OnBoarding from "../screen/OnBoarding";

const NStack = createNativeStackNavigator<MainStackScreensType>();

export const StackNavigator = () => {
  const {
    colors: { background },
  } = themeState();

  const screenOptions: NativeStackNavigationOptions = {
    headerShown: false,
    contentStyle: {
      backgroundColor: background,
    },
  };

  return (
    <NStack.Navigator
      screenOptions={screenOptions}
      initialRouteName={"OnBoarding"}
    >
      <NStack.Screen name={"OnBoarding"} component={OnBoarding} />
    </NStack.Navigator>
  );
};
