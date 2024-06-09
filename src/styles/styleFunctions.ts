import { Dimensions } from "react-native";
const { height, width } = Dimensions.get("screen");

export const hp = (p: number) => (height * p) / 100;
export const wp = (p: number) => (width * p) / 100;
