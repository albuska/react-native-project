import PostsScreen from "../pages/PostsScreen";
import ProfileScreen from "../pages/ProfileScreen";
import CreatePostsScreen from "../pages/CreatePostsScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const MainTab = createBottomTabNavigator();

const CreateTabNav = () => {
  return (
    <>
      <MainTab.Navigator>
        <MainTab.Screen name="Posts" component={PostsScreen} />
        <MainTab.Screen name="Profile" component={ProfileScreen} />
        <MainTab.Screen name="CreatePosts" component={CreatePostsScreen} />
      </MainTab.Navigator>
    </>
  );
};

export default CreateTabNav;
