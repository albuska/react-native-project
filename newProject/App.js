import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";
import "react-native-url-polyfill/auto";
import "react-native-get-random-values";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
import { useCallback, useState } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import useRoute from "./utils/router";
import { store } from "./redux/store";

import db from "./firebase/config";

export default function App() {
  const [user, setUser] = useState(null);

  db.auth().onAuthStateChanged((user) => setUser(user));

  const routing = useRoute(user);

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
        <NavigationContainer>{routing}</NavigationContainer>
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
