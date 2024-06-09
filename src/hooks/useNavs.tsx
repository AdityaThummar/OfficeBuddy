import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { MainStackScreensType } from "../navigators/types";

export const useAppNav = <T extends keyof MainStackScreensType>() => {
  type Props = NativeStackScreenProps<MainStackScreensType, T>;
  type ScreenNavigationProp = Props["navigation"];

  const navigation = useNavigation<ScreenNavigationProp>();
  const route = useRoute<RouteProp<MainStackScreensType, T>>();

  return { navigation, route };
};
