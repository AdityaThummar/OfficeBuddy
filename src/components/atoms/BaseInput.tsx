import React from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
} from "react-native";
import { useStyles } from "../../hooks";
import { hp, wp } from "../../styles/styleFunctions";
import { BaseText, Varients } from "./BaseText";
import { BGWithOpacity } from "./BGWithOpacity";
import { themeState } from "../../zustand";

export type BaseInputProps = { title?: string } & TextInputProps;

export const BaseInput = ({ title, ...inputProps }: BaseInputProps) => {
  const styles = useStyles(({ colors, theme }) =>
    StyleSheet.create({
      container: {
        paddingVertical: hp(1),
        paddingHorizontal: wp(1),
      },
      inputContainer: {
        borderRadius: wp(4),
        overflow: "hidden",
      },
      input: {
        ...Varients.big,
        fontWeight: "bold",
        paddingVertical: hp(1),
        paddingHorizontal: wp(3),
        color: colors.label,
      },
      dummyBack: {
        backgroundColor: colors.secondary,
        opacity: theme == "dark" ? 0.12 : 0.07,
        zIndex: -10,
      },
      title: {
        marginHorizontal: wp(3),
        marginBottom: hp(0.5),
      },
    })
  );
  const { colors } = themeState();

  return (
    <View style={styles.container}>
      {title && (
        <BaseText varient="regular" bold style={styles.title}>
          {title}
        </BaseText>
      )}
      <View style={styles.inputContainer}>
        <BGWithOpacity style={styles.dummyBack} />
        <TextInput
          placeholder="Enter"
          placeholderTextColor={colors.secondary33}
          {...inputProps}
          style={[styles.input, inputProps.style]}
        />
      </View>
    </View>
  );
};
