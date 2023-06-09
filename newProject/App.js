import "react-native-gesture-handler";
import { Provider } from "react-redux";
import "react-native-url-polyfill/auto";
import "react-native-get-random-values";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
import { useCallback, useState } from "react";
import { StyleSheet, View } from "react-native";
import { store } from "./redux/store";
import Main from "./components/Main";

export default function App() {
  
  console.log("hello");

  // const [fontsLoaded] = useFonts({
  //   Agdasima: require("./assets/fonts/Agdasima-Regular.ttf"),
  //   Roboto: require("./assets/fonts/Roboto-BoldItalic.ttf"),
  //   RobotoBold: require("./assets/fonts/Roboto-Bold.ttf"),
  // });

  // const onLayoutRootView = useCallback(async () => {
  //   if (fontsLoaded) {
  //     await SplashScreen.hideAsync();
  //   }
  // }, [fontsLoaded]);

  // if (!fontsLoaded) {
  //   return null;
  // }

  return (
    <Provider store={store}>
      <View style={styles.container}>
        <Main />
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
