import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { BaseTOpacity, BaseText } from "../atoms";
import BaseCard from "../atoms/BaseCard";
import { WeekDays } from "../../utils";
import { useStyles } from "../../hooks";
import { layoutStyle } from "../../styles";
import { hp, wp } from "../../styles/styleFunctions";

export type DaySelectorProps = {
  title?: string;
  days?: string[];
  onChangeSelected?: (days: string[]) => void;
};

const DaySelector = ({
  title = "title",
  days = WeekDays.slice(0, 5),
  onChangeSelected = () => {},
}: DaySelectorProps) => {
  const styles = useStyles(({ colors }) =>
    StyleSheet.create({
      container: {
        gap: hp(1),
      },
      dayContainer: {
        backgroundColor: colors.secondary11,
        padding: wp(1),
        width: wp(10),
        alignItems: "center",
        borderRadius: wp(4),
      },
      includedDay: {
        backgroundColor: colors.label,
      },
      dayText: {
        color: colors.secondary,
        textTransform: "capitalize",
      },
      selectedDayText: {
        color: colors.primary,
      },
    })
  );
  const layoutStyles = layoutStyle();

  const [selectedDays, setSelectedDays] = useState<string[]>(days);

  const toggleSelectedDay = (item: string) => {
    let arr: string[] = [];
    if (selectedDays?.includes(item)) {
      arr = selectedDays.filter((it) => it != item);
    } else {
      arr = [...selectedDays, item];
    }
    setSelectedDays(arr);
    onChangeSelected(arr);
  };

  const renderWeekDay = (item: string) => {
    const isIncluded = selectedDays?.includes(item);
    return (
      <BaseTOpacity
        key={item}
        style={[styles.dayContainer, isIncluded && styles.includedDay]}
        onPress={toggleSelectedDay.bind(this, item)}
      >
        <BaseText
          style={[styles.dayText, isIncluded && styles.selectedDayText]}
          bold
          varient="small"
        >
          {item?.slice(0, 3)}
        </BaseText>
      </BaseTOpacity>
    );
  };

  return (
    <BaseCard style={styles.container}>
      <BaseText bold varient="medium">
        {title}
      </BaseText>
      <View style={[layoutStyles.rowICenterJBetwewn]}>
        {WeekDays.map(renderWeekDay)}
      </View>
    </BaseCard>
  );
};

export default DaySelector;
