import React from "react";
import { StyleSheet, Text, TextProps, TextStyle } from "react-native";
import { useStyles } from "../../hooks";

export const Varients = {
  extraSmall: {
    fontSize: 12,
  },
  small: {
    fontSize: 14,
  },
  regular: {
    fontSize: 16,
  },
  medium: {
    fontSize: 18,
  },
  extraMedium: {
    fontSize: 19,
  },
  big: {
    fontSize: 20,
  },
  extraBig: {
    fontSize: 22,
  },
  large: {
    fontSize: 23,
  },
  extraLarge: {
    fontSize: 24,
  },
  header: {
    fontSize: 25,
  },
  huge: {
    fontSize: 26,
  },
  extraHuge: {
    fontSize: 28,
  },
};

export type BaseTextProps = TextProps & {
  varient?: keyof typeof Varients;
  bold?: boolean;
};

export const BaseText = (props: BaseTextProps) => {
  const { varient = "regular", style, bold, ...otherProps } = props;

  const localStyles = useStyles(({ colors }) =>
    StyleSheet.create({
      text: {
        color: colors.secondary,
        marginTop: -1,
      },
      bold: {
        fontWeight: "bold",
      },
    })
  );

  return (
    <Text
      {...otherProps}
      style={[
        localStyles.text,
        varient ? Varients[varient] : {},
        bold ? localStyles.bold : {},
        style,
      ]}
    />
  );
};
