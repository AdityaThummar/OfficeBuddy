import { Text, TextInput } from "react-native";
import { NavContainer } from "./src/navigators";

const App = () => {
  let BText = Text as any;
  let BTextInput = TextInput as any;

  if (BText?.defaultProps) {
    BText.defaultProps.allowFontScaling = false;
  } else {
    BText.defaultProps = {};
    BText.defaultProps.allowFontScaling = false;
  }

  // Override Text scaling in input fields
  if (BTextInput?.defaultProps) {
    BTextInput.defaultProps.allowFontScaling = false;
  } else {
    BTextInput.defaultProps = {};
    BTextInput.defaultProps.allowFontScaling = false;
  }

  return <NavContainer />;
};

export default App;
