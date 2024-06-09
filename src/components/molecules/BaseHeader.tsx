import {
  StyleSheet,
  TextProps,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import React from "react";
import { BaseIcon, BaseTOpacity, BaseText, IconButton } from "../atoms";
import { themeStateValues } from "../../zustand";
import { hp, wp } from "../../styles/styleFunctions";
import { useAppNav, useStyles } from "../../hooks";
import { layoutStyle } from "../../styles";

type ViewStyles = ViewStyle | ViewStyle[];
type TextStyles = TextStyle | TextStyle[];

export type BaseHeaderProps = {
  title?: string;
  containerStyle?: ViewStyles;
  titleContainerStyle?: ViewStyles;
  disableBackArrow?: boolean;
  titleStyle?: TextStyles;
  titleProps?: TextProps;
  rightComponents?: React.ReactNode;
  backScreenName?: string;
};

export const BaseHeader = (props: BaseHeaderProps) => {
  const {
    containerStyle = {},
    titleStyle = {},
    disableBackArrow,
    titleProps,
    title,
    rightComponents = <></>,
    titleContainerStyle = {},
    backScreenName = "Back",
  } = props;

  const styles = useStyles(({ colors, theme }) =>
    StyleSheet.create({
      containerStyle: {
        paddingVertical: hp(1),
        paddingHorizontal: wp(2),
      },
      titleStyle: {
        flex: 1,
        color: colors.label,
        marginHorizontal: disableBackArrow ? 0 : wp(1),
      },
      icon: {
        color: colors.secondary,
      },
      backTitle: {
        color: colors.secondary,
        paddingHorizontal: wp(0.5),
        marginRight: wp(1),
      },
      backTitleContainer: {
        backgroundColor: theme === "dark" ? colors.secondary22 : colors.primary,
        elevation: theme === "dark" ? 0 : 4,
        alignSelf: "flex-start",
        paddingHorizontal: wp(2),
        paddingVertical: hp(0.5),
        borderRadius: wp(4),
        marginBottom: hp(1),
      },
    })
  );
  const layoutStyles = layoutStyle();

  const { navigation } = useAppNav();

  return (
    <View style={[styles.containerStyle, containerStyle]}>
      {!disableBackArrow && (
        <BaseTOpacity
          style={[layoutStyles.rowICenter, styles.backTitleContainer]}
          onPress={navigation.goBack}
        >
          <BaseIcon
            name="chevron-back"
            iFamily="Ionicons"
            size={25}
            iconStyle={styles.icon}
          />
          <BaseText varient="regular" bold style={styles.backTitle}>
            {backScreenName}
          </BaseText>
        </BaseTOpacity>
      )}
      <View style={[layoutStyles.rowICenter, titleContainerStyle]}>
        <BaseText
          {...titleProps}
          style={[styles.titleStyle, titleStyle]}
          varient="header"
          bold
        >
          {title}
        </BaseText>
        {rightComponents}
      </View>
    </View>
  );
};
