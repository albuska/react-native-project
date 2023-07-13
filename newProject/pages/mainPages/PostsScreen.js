import {  StyleSheet} from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import DefaultScreenPosts from "../nestedScreens/DefaultScreenPosts";
import MapScreen from "../nestedScreens/MapScreen";
import CommentsScreen from "../nestedScreens/CommentsScreen";
import { Feather } from "@expo/vector-icons";
import { logout } from "../../redux/auth/operations";
import { useDispatch } from "react-redux";
import { TouchableOpacity } from "react-native";

const NestedScreen = createStackNavigator();

const PostsScreen = () => {
  const dispatch = useDispatch();

  return (
    <>
      <NestedScreen.Navigator
        screenOptions={{
          headerTitleAlign: "center",
          headerRight: (props) => (
            <TouchableOpacity onPress={() => dispatch(logout())}>
              <Feather
                name="log-out"
                size={24}
                color="#BDBDBD"
                style={{ marginRight: 10 }}
              />
            </TouchableOpacity>
          ),
        }}
      >
        <NestedScreen.Screen
          name="DefaultScreen"
          component={DefaultScreenPosts}
          options={{
            title: "Posts",
          }}
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
