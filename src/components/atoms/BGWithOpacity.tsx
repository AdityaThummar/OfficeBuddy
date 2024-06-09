import {
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native";
import React from "react";

export type BGWithOpacityProps = TouchableOpacityProps & {
  opacity?: number;
  backgroundColor?: string;
};

export const BGWithOpacity = ({
  opacity = 0.5,
  backgroundColor = "black",
  ...props
}: BGWithOpacityProps) => {
  return (
    <TouchableOpacity
      activeOpacity={opacity}
      {...props}
      style={[
        { opacity, backgroundColor },
        StyleSheet.absoluteFill,
        props.style,
      ]}
    />
  );
};
