import {
  LayoutAnimation,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacityProps,
  UIManager,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { BaseText, IconButton } from "../atoms";
import { useStyles } from "../../hooks";
import { hp, wp } from "../../styles/styleFunctions";
import { themeState } from "../../zustand";
import { layoutStyle } from "../../styles";
import Animated, {
  FadeIn,
  FadeInDown,
  FadeInUp,
  FadeOut,
  FadeOutUp,
} from "react-native-reanimated";
import BaseCard from "../atoms/BaseCard";

if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export type InfoCardProps = {
  title?: string;
  info?: string;
  rightComponent?: React.ReactNode;
  children?: React.ReactNode;
  cardProps?: TouchableOpacityProps;
};

const InfoCard = (props: InfoCardProps) => {
  const {
    children,
    info,
    rightComponent,
    title = "title",
    cardProps = {},
  } = props;
  const { colors } = themeState();
  const layoutStyles = layoutStyle();
  const styles = useStyles(() =>
    StyleSheet.create({
      container: {
        backgroundColor: colors.secondary11,
        marginVertical: hp(1),
        marginHorizontal: wp(1),
        padding: wp(2),
        paddingHorizontal: wp(3),
        borderRadius: wp(4),
      },
      headerContainer: {
        gap: wp(1),
      },
      header: {
        flex: 1,
        backgroundColor: "yellow",
      },
      headerText: { flexShrink: 1 },
      infoContainer: {
        marginBottom: hp(0.5),
      },
    })
  );

  const [showInfo, setShowInfo] = useState(false);

  const toggleInfo = () => {
    setShowInfo((pre) => !pre);
  };

  return (
    <BaseCard {...cardProps}>
      {showInfo && !!info && (
        <Animated.View entering={FadeInDown} style={styles.infoContainer}>
          <BaseText varient="small">{info}</BaseText>
        </Animated.View>
      )}
      <View style={[layoutStyles.rowICenter, styles.headerContainer]}>
        <View
          style={[layoutStyles.rowICenter, styles.headerContainer, { flex: 1 }]}
        >
          <BaseText bold style={styles.headerText} varient="medium">
            {title}
          </BaseText>
          {info && (
            <IconButton
              name={showInfo ? "chevron-up-circle" : "information-circle"}
              color={colors.secondary}
              onPress={toggleInfo}
            />
          )}
        </View>
        {rightComponent}
      </View>
      {children ?? children}
    </BaseCard>
  );
};

export default InfoCard;
