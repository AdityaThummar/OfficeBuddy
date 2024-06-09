import {
  Pressable,
  StyleSheet,
  Text,
  TextProps,
  TextStyle,
  TouchableOpacity,
  ViewProps,
  ViewStyle,
} from "react-native";
import React from "react";
import { themeStateValues } from "../../zustand";
import { hp, wp } from "../../styles/styleFunctions";
import { BaseText } from "./BaseText";

export type FilledButtonType = "default" | "success" | "error";

export type FilledButtonProps = {
  title: string;
  onPress: () => void;
  containerStyle?: ViewStyle | ViewStyle[];
  containerProps?: ViewProps;
  textStyle?: TextStyle | TextStyle[];
  textProps?: TextProps;
  type?: FilledButtonType;
  inverted?: boolean;
};

const FilledButton = ({
  title = "",
  onPress = () => {},
  containerStyle = {},
  containerProps = {},
  textProps = {},
  textStyle = {},
  type = "default",
  inverted = false,
}: FilledButtonProps) => {
  const { theme, colors } = themeStateValues();
  const backgroundColor =
    theme === "dark"
      ? colors.secondary22
      : type == "success"
      ? colors.success
      : type == "error"
      ? colors.error
      : colors.label;
  const color =
    theme === "dark"
      ? type == "success"
        ? colors.success
        : type == "error"
        ? colors.error
        : colors.label
      : colors.primary;

  const style = inverted
    ? styles(...[color, backgroundColor])
    : styles(...[backgroundColor, color]);

  return (
    <Pressable
      {...containerProps}
      onPress={onPress}
      style={({ pressed }) => [
        style.container,
        pressed && { opacity: 0.7 },
        containerStyle,
      ]}
    >
      <BaseText
        {...textProps}
        style={[style.text, textStyle]}
        varient="big"
        bold
      >
        {title}
      </BaseText>
    </Pressable>
  );
};

export default FilledButton;

const styles = (backgroundColor: string, color: string) => {
  return StyleSheet.create({
    container: {
      backgroundColor,
      alignItems: "center",
      paddingVertical: hp(1.2),
      paddingHorizontal: wp(5),
      borderRadius: wp(4),
      marginHorizontal: wp(2),
      marginVertical: hp(1),
      // elevation: 3,
      height: hp(6),
      justifyContent: "center",
    },
    text: {
      color,
    },
  });
};
