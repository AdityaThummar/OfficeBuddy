export type MainThemeColorsType = {
  primary: string;
  secondary: string;
  background: string;
  label: string;
  placeholder: string;
  border: string;
  success: string;
  error: string;
  secondary33: string;
  secondary22: string;
  secondary11: string;
};

export type ColorsValuesType = MainThemeColorsType;

export const lightThemeColors: MainThemeColorsType = {
  primary: "#FFFFFF",
  secondary: "#000000",
  background: "#FFFFFF",
  border: "#000000",
  label: "#007aff",
  success: "#4cd964",
  error: "#ff3b30",
  placeholder: "#AAAAAA",
  secondary33: "#00000033",
  secondary22: "#00000022",
  secondary11: "#00000011",
};

export const darkThemeColors: MainThemeColorsType = {
  primary: "#000000",
  secondary: "#FFFFFF",
  background: "#000000",
  border: "#EFEFEF",
  label: "#007aff",
  success: "#4cd964",
  error: "#ff3b30",
  placeholder: "#AAAAAA",
  secondary33: "#FFFFFF33",
  secondary22: "#FFFFFF22",
  secondary11: "#FFFFFF11",
};
