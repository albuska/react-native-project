import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
import { useCallback } from "react";
import { Dimensions, View } from "react-native";
import useRoute from "./utils/router";

export default function App() {
  const routing = useRoute(null);

  const [fontsLoaded] = useFonts({
    Agdasima: require("./assets/fonts/Agdasima-Regular.ttf"),
    Roboto: require("./assets/fonts/Roboto-BoldItalic.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <NavigationContainer onLayout={onLayoutRootView}>
      {routing}
    </NavigationContainer>
  );
}
