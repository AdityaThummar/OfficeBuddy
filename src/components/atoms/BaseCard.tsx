import { StyleSheet, TouchableOpacityProps } from "react-native";
import React from "react";
import { useStyles } from "../../hooks";
import { hp, wp } from "../../styles/styleFunctions";
import { BaseTOpacity } from "./BaseTOpacity";

const BaseCard = ({ style, ...props }: TouchableOpacityProps) => {
  const styles = useStyles(({ colors }) =>
    StyleSheet.create({
      container: {
        backgroundColor: colors.secondary11,
        marginVertical: hp(1),
        marginHorizontal: wp(1),
        padding: wp(2),
        paddingHorizontal: wp(3),
        borderRadius: wp(4),
      },
    })
  );
  return <BaseTOpacity {...props} style={[styles.container, style]} />;
};

export default BaseCard;
