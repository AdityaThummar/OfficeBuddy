import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInputProps,
  View,
  ViewStyle,
} from "react-native";
import { useStyles } from "../../hooks";
import { hp, wp } from "../../styles/styleFunctions";
import { BaseText, Varients } from "./BaseText";
import { BGWithOpacity } from "./BGWithOpacity";
import { BaseTOpacity } from "./BaseTOpacity";
import {
  DateTimePickerAndroid,
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { getTime12HFormat } from "../../utils";

export type BaseDateTimePicker = {
  title?: string;
  style?: ViewStyle | ViewStyle;
  value?: Date;
  setValue?: (d: Date) => void;
  mode?: "date" | "time";
};

export const BaseDateTimePicker = ({
  title,
  value = new Date(),
  setValue,
  style,
  mode = "date",
}: BaseDateTimePicker) => {
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
      modalContainer: {
        backgroundColor: colors.secondary22,
        position: "absolute",
        bottom: 0,
        right: 0,
        left: 0,
        alignItems: "center",
        paddingVertical: hp(3),
        borderTopRightRadius: wp(5),
        borderTopLeftRadius: wp(5),
      },
    })
  );

  const onChangeHandler = (event: DateTimePickerEvent) => {
    if (event.type === "set" && !!event?.nativeEvent?.timestamp && setValue) {
      setValue(new Date(event.nativeEvent.timestamp));
    }
  };

  const onPressDate = () => {
    DateTimePickerAndroid.open({
      mode,
      onChange: onChangeHandler,
      value,
    });
  };

  return (
    <>
      <View style={styles.container}>
        {title && (
          <BaseText varient="regular" bold style={styles.title}>
            {title}
          </BaseText>
        )}
        <BaseTOpacity style={styles.inputContainer} onPress={onPressDate}>
          <BGWithOpacity style={styles.dummyBack} />
          <Text style={[styles.input, style]}>
            {mode === "date"
              ? value.toString().slice(0, 15)
              : getTime12HFormat(value)}
          </Text>
        </BaseTOpacity>
        {/* <DateTimePicker value={new Date()} /> */}
      </View>
    </>
  );
};
