import { SafeAreaView, ScrollView, StyleSheet, View } from "react-native";
import React from "react";
import { themeStateValues } from "../../zustand";
import { BaseHeader, BaseHeaderProps } from "../molecules";
import { BaseStatusBar } from "../atoms";
import { wp } from "../../styles/styleFunctions";

export type ScreenWrapperProps = {
  children?: React.ReactNode;
} & BaseHeaderProps;

const ScreenWrapper = (props: ScreenWrapperProps) => {
  const { children, ...headerProps } = props;
  const style = styles();

  return (
    <View style={style.container}>
      <SafeAreaView style={{ flex: 1 }}>
        <BaseHeader {...headerProps} />
        <ScrollView showsVerticalScrollIndicator={false}>{children}</ScrollView>
        <BaseStatusBar />
      </SafeAreaView>
    </View>
  );
};

export default ScreenWrapper;

const styles = () => {
  const { colors } = themeStateValues();
  return StyleSheet.create({
    container: {
      backgroundColor: colors.background,
      flex: 1,
      paddingHorizontal: wp(4),
      paddingBottom: wp(3),
    },
  });
};
