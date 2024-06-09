import React from "react";
import { View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { StackNavigator } from "./StackNavigator";
import { useStyles } from "../hooks";

export const NavContainer = () => {
  const style = useStyles(({ colors }) => ({
    container: {
      backgroundColor: colors.primary,
      flex: 1,
    },
  }));

  return (
    <View style={style.container}>
      <NavigationContainer>
        <StackNavigator />
      </NavigationContainer>
    </View>
  );
};
