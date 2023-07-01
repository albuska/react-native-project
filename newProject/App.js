import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import "react-native-url-polyfill/auto";
import "react-native-get-random-values";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
import { useCallback } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import useRoute from "./utils/router";

export default function App() {
  const routing = useRoute({});

  const [fontsLoaded] = useFonts({
    "Agdasima": require("./assets/fonts/Agdasima-Regular.ttf"),
    "Roboto": require("./assets/fonts/Roboto-BoldItalic.ttf"),
    "RobotoBold": require("./assets/fonts/Roboto-Bold.ttf"),
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
    <View style={styles.container} onLayout={onLayoutRootView}>
      <NavigationContainer>{routing}</NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
