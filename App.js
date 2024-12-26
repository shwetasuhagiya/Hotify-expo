import { useFonts } from "expo-font";
import MainApp from "./src";
import { LogBox } from "react-native";
import { Provider } from "react-redux";
import store from "./src/redux/store";
import { MenuProvider } from "react-native-popup-menu";

export default function App() {
  LogBox.ignoreLogs(["Warning: ..."]); // Ignore log notification by message
  LogBox.ignoreAllLogs(); //Ignore all log notifications
  const [fontsLoaded] = useFonts({
    "Urbanist-Bold": require("./src/assets/fonts/Urbanist-Bold.ttf"),
    "Urbanist-SemiBold": require("./src/assets/fonts/Urbanist-SemiBold.ttf"),
    "Urbanist-Regular": require("./src/assets/fonts/Urbanist-Regular.ttf"),
    "Urbanist-Medium": require("./src/assets/fonts/Urbanist-Medium.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Provider store={store}>
      <MenuProvider>
        <MainApp />
      </MenuProvider>
    </Provider>
  );
}
