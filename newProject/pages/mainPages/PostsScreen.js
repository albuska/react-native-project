import { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, FlatList } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import DefaultScreenPosts from "../nestedScreens/DefaultScreenPosts";
import MapScreen from "../nestedScreens/MapScreen";
import CommentsScreen from "../nestedScreens/CommentsScreen";

const NestedScreen = createStackNavigator();

const PostsScreen = () => {
  return (
    <>
      <NestedScreen.Navigator screenOptions={{ headerTitleAlign: "center" }}>
        <NestedScreen.Screen
          name="DefaultScreen"
          component={DefaultScreenPosts}
          options={{title: "Posts" }}
        />
        <NestedScreen.Screen name="Comments" component={CommentsScreen} />
        <NestedScreen.Screen name="Map" component={MapScreen} />
      </NestedScreen.Navigator>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
  },
});

export default PostsScreen;
