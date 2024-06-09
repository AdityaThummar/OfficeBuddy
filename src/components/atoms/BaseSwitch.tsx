import {
  Pressable,
  Animated,
  StyleSheet,
  ViewStyle,
  TextStyleAndroid,
  TextStyleIOS,
} from "react-native";
import { useEffect, useRef, useState } from "react";
import { wp } from "../../styles/styleFunctions";
import { BGWithOpacity } from "./BGWithOpacity";
import { BaseText } from "./BaseText";
import { themeState } from "../../zustand";

const BaseSwitch = ({
  status,
  thumb,
  switchGap = wp(1.7),
  mainContainerStyle,
  switchWidth = wp(12),
  thumbHeightWidth = wp(5),
  thumbContainerStyle,
  thumbColor = "white",
  onLabel,
  offLabel,
  labelStyle,
  labelContainerStyle,
  thumbStyle,
  onPress,
  mainBg,
  backDummyOpacity = 1,
}: {
  status: true | false;
  thumb?: () => JSX.Element;
  switchGap?: number;
  mainContainerStyle?: {};
  switchWidth?: number;
  thumbHeightWidth?: number;
  thumbContainerStyle?: ViewStyle | ViewStyle[];
  thumbColor?: string;
  onLabel?: string;
  offLabel?: string;
  labelStyle?: TextStyleAndroid | TextStyleIOS;
  labelContainerStyle?: ViewStyle | ViewStyle[];
  thumbStyle?: ViewStyle | ViewStyle[];
  onPress?: () => void;
  mainBg?: string;
  backDummyOpacity?: number;
}) => {
  const thumbPos = useRef(
    new Animated.Value(
      !status ? switchWidth - thumbHeightWidth - switchGap : switchGap
    )
  ).current;
  const labelOpacity = useRef(new Animated.Value(1)).current;
  const thumbOpacity = useRef(new Animated.Value(1)).current;

  const [labelPos, setLabelPos] = useState(status ? "left" : "right");
  const { colors } = themeState();

  const styles = StyleSheet.create({
    mainContainerStyle: {
      width: switchWidth,
      height: thumbHeightWidth + 2 * switchGap,
      borderRadius: 500,
      justifyContent: "center",
      flexDirection: "row",
      alignItems: "center",
    },
    thumbContainerStyle: {
      height: thumbHeightWidth,
      width: thumbHeightWidth,
      backgroundColor: thumbColor,
      borderRadius: 500,
    },
  });

  const turnOn = () => {
    setTimeout(() => {
      setLabelPos("left");
    }, 100);
    Animated.sequence([
      Animated.timing(labelOpacity, {
        toValue: 0,
        duration: 0,
        useNativeDriver: false,
      }),
      Animated.timing(thumbOpacity, {
        toValue: 0,
        duration: 0,
        useNativeDriver: false,
      }),
      Animated.timing(thumbPos, {
        toValue: switchWidth - thumbHeightWidth,
        duration: 300,
        useNativeDriver: false,
        delay: 100,
      }),
      Animated.timing(thumbPos, {
        toValue: switchWidth - thumbHeightWidth - switchGap,
        duration: 200,
        useNativeDriver: false,
      }),
      Animated.parallel([
        Animated.timing(labelOpacity, {
          toValue: 1,
          duration: 200,
          useNativeDriver: false,
        }),
        Animated.timing(thumbOpacity, {
          toValue: 1,
          duration: 200,
          useNativeDriver: false,
        }),
      ]),
    ]).start();
  };

  const turnOff = () => {
    setTimeout(() => {
      setLabelPos("right");
    }, 100);
    Animated.sequence([
      Animated.timing(labelOpacity, {
        toValue: 0,
        duration: 0,
        useNativeDriver: false,
      }),
      Animated.timing(thumbOpacity, {
        toValue: 0,
        duration: 0,
        useNativeDriver: false,
      }),
      Animated.timing(thumbPos, {
        toValue: 0,
        duration: 300,
        delay: 100,
        useNativeDriver: false,
      }),
      Animated.timing(thumbPos, {
        toValue: switchGap,
        duration: 200,
        useNativeDriver: false,
      }),
      Animated.parallel([
        Animated.timing(labelOpacity, {
          toValue: 1,
          duration: 200,
          useNativeDriver: false,
        }),
        Animated.timing(thumbOpacity, {
          toValue: 1,
          duration: 200,
          useNativeDriver: false,
        }),
      ]),
    ]).start();
  };

  useEffect(() => {
    if (status) {
      turnOn();
    } else {
      turnOff();
    }
  }, [status]);

  return (
    <Pressable
      style={[styles.mainContainerStyle, mainContainerStyle]}
      onPress={onPress}
    >
      <BGWithOpacity
        backgroundColor={mainBg}
        opacity={backDummyOpacity}
        // isDark
        style={{
          borderRadius: 500,
          backgroundColor: status ? colors.success : colors.secondary22,
        }}
      />
      <Animated.View
        style={[
          styles.thumbContainerStyle,
          {
            position: "absolute",
            left: thumbPos,
          },
          thumbContainerStyle,
        ]}
      >
        {!!thumb && (
          <Animated.View style={[thumbStyle, { opacity: thumbOpacity }]}>
            {thumb()}
          </Animated.View>
        )}
      </Animated.View>
      {(!!onLabel || !!offLabel) && (
        <Animated.View
          style={[
            {
              position: "absolute",
              opacity: labelOpacity,
            },
            labelPos == "left" && { left: 2 * switchGap },
            labelPos == "right" && { right: 2 * switchGap },
            labelContainerStyle,
          ]}
        >
          <BaseText bold style={labelStyle}>
            {(labelPos == "left" ? onLabel : offLabel) ?? ""}
          </BaseText>
        </Animated.View>
      )}
    </Pressable>
  );
};

export default BaseSwitch;
