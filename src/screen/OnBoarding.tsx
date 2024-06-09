import React, { useEffect, useState } from "react";
import ScreenWrapper from "../components/templates/ScreenWrapper";
import { BaseDateTimePicker, BaseText } from "../components";
import FilledButton from "../components/atoms/FilledButton";
import { useStyles } from "../hooks";
import { Alert, Linking, StyleSheet, View } from "react-native";
import { hp, wp } from "../styles/styleFunctions";
import BaseSwitch from "../components/atoms/BaseSwitch";
import InfoCard from "../components/organisms/InfoCard";
import DaySelector from "../components/organisms/DaySelector";
import Animated, { FadeInDown, FadeInUp } from "react-native-reanimated";
import * as Notifications from "expo-notifications";
import { getTime12HFormat } from "../utils";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
    priority: Notifications.AndroidNotificationPriority.HIGH,
  }),
});

Notifications.setNotificationCategoryAsync("testStart", [
  {
    identifier: "testStart",
    buttonTitle: "Start Tracker",
  },
]);

Notifications.setNotificationCategoryAsync("testStop", [
  {
    identifier: "testStop",
    buttonTitle: "Stop Tracker",
  },
]);

const OnBoarding = () => {
  const styles = useStyles(({ colors }) =>
    StyleSheet.create({
      nextButton: {
        marginTop: hp(2),
      },
      testButtonContainer: {
        paddingVertical: 0,
        paddingHorizontal: 0,
        height: hp(4),
        backgroundColor: "transparent",
      },
      testButtonText: {
        color: colors.label,
      },
    })
  );

  const [inTime, setInTime] = useState(new Date());
  const [outTime, setOutTime] = useState(new Date());
  const [reminderNotifications, setReminderNotifications] = useState(false);
  const [startTrackerNotifications, setStartTrackerNotifications] =
    useState(false);
  const [stopTrackerNotifications, setStopTrackerNotifications] =
    useState(false);
  const [workingDays, setWorkingDays] = useState<string[]>([]);

  useEffect(() => {
    if (!startTrackerNotifications && !stopTrackerNotifications) {
      setReminderNotifications(false);
    }
  }, [startTrackerNotifications, stopTrackerNotifications]);

  const toggleReminderNotifications = async () => {
    const status = await Notifications.requestPermissionsAsync();
    console.log("🚀 ~ toggleReminderNotifications ~ status:", status);
    if (!status.granted && status.canAskAgain) {
      Alert.alert(
        "Oops",
        "You have to allow access to notifications in order to get reminder notifications",
        [
          {
            text: "Cancel",
          },
          {
            text: "Ask Again",
            onPress: toggleReminderNotifications,
          },
        ]
      );
    } else if (!status.canAskAgain) {
      Alert.alert(
        "Oops",
        "You have denied for Notification Permission.\nGo to Settings > Notification and give access to enable notificatios.",
        [
          {
            text: "Cancel",
          },
          {
            text: "Open Settings",
            onPress: Linking.openSettings,
          },
        ]
      );
    } else {
      setReminderNotifications((pre) => !pre);
      setStartTrackerNotifications(!reminderNotifications);
      setStopTrackerNotifications(!reminderNotifications);
    }
  };

  const toggleNotifications = (type: "start" | "stop" = "start") => {
    type === "start"
      ? setStartTrackerNotifications((pre) => !pre)
      : setStopTrackerNotifications((pre) => !pre);
  };

  const onNext = () => {
    if (inTime.getHours() < outTime.getHours()) {
    } else {
      Alert.alert("Oops", "Please select valid times");
    }
  };

  const presentTestNotifications = async (type: "start" | "stop" = "start") => {
    Notifications.scheduleNotificationAsync({
      content: {
        title: `It's ${
          getTime12HFormat(type === "start" ? inTime : outTime).split(" ")[0]
        }, Don't forget to start tracker.`,
        priority: Notifications.AndroidNotificationPriority.HIGH,
        subtitle: "Start Tracker",
        sticky: true,
        categoryIdentifier: type === "start" ? "testStart" : "testStop",
      },
      trigger: null,
    });
  };

  const TestButton = ({ type }: { type: "start" | "stop" }) => {
    return (
      <FilledButton
        containerStyle={styles.testButtonContainer}
        title="Show me"
        textStyle={styles.testButtonText}
        onPress={presentTestNotifications.bind(this, type)}
      />
    );
  };

  return (
    <ScreenWrapper disableBackArrow title="Getting Onboard">
      <Animated.View entering={FadeInDown.delay(10).duration(500)}>
        <BaseDateTimePicker
          title="Your In-time"
          value={inTime}
          setValue={setInTime}
          mode="time"
        />
      </Animated.View>
      <Animated.View entering={FadeInDown.delay(100).duration(500)}>
        <BaseDateTimePicker
          title="Your Out-time"
          value={outTime}
          setValue={setOutTime}
          mode="time"
        />
      </Animated.View>
      <Animated.View entering={FadeInDown.delay(200).duration(500)}>
        <DaySelector title="Working Days" onChangeSelected={setWorkingDays} />
      </Animated.View>
      <Animated.View entering={FadeInDown.delay(300).duration(500)}>
        <InfoCard
          title="Reminder Notification"
          rightComponent={
            <BaseSwitch
              status={reminderNotifications}
              onPress={toggleReminderNotifications}
            />
          }
          cardProps={{ onPress: toggleReminderNotifications }}
          info="When Enabled on we will send a reminder notifications on every working day to remind you to start/stop a work tracker"
        />
      </Animated.View>
      {reminderNotifications && (
        <>
          <Animated.View entering={FadeInDown.duration(500)}>
            <InfoCard
              title="Start Tracker Notification"
              rightComponent={
                <BaseSwitch
                  status={startTrackerNotifications}
                  onPress={toggleNotifications.bind(this, "start")}
                />
              }
              cardProps={{ onPress: toggleNotifications.bind(this, "start") }}
              info="When Enabled on we will send a reminder notification on every working day before your in-time to remind you to start a work tracker"
            >
              <TestButton type="start" />
            </InfoCard>
          </Animated.View>
          <Animated.View entering={FadeInDown.delay(100).duration(500)}>
            <InfoCard
              title="Stop Tracker Notification"
              rightComponent={
                <BaseSwitch
                  status={stopTrackerNotifications}
                  onPress={toggleNotifications.bind(this, "stop")}
                />
              }
              info="When Enabled on we will send a reminder notification on every working day before your out-time to remind you to stop a work tracker"
              cardProps={{ onPress: toggleNotifications.bind(this, "stop") }}
            >
              <TestButton type="stop" />
            </InfoCard>
          </Animated.View>
        </>
      )}
      <Animated.View entering={FadeInUp.delay(500).duration(1000)}>
        <FilledButton
          title="Next"
          containerStyle={styles.nextButton}
          onPress={onNext}
        />
      </Animated.View>
    </ScreenWrapper>
  );
};

export default OnBoarding;
