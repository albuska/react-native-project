import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import PostsScreen from "../pages/mainPages/PostsScreen";
import ProfileScreen from "../pages/mainPages/ProfileScreen";
import CreatePostsScreen from "../pages/mainPages/CreatePostsScreen";
import { Feather } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

const MainTab = createBottomTabNavigator();

const CreateTabNav = () => {
  const navigation = useNavigation();

  return (
    <>
      <MainTab.Navigator
        screenOptions={{
          tabBarShowLabel: false,
          headerTitleAlign: "center",
        }}
      >
        <MainTab.Screen
          name="Posts"
          component={PostsScreen}
          options={{
            tabBarIcon: ({ focused, size, color }) => {
              return (
                <Feather
                  name="grid"
                  size={focused ? 13 : 24}
                  color={focused ? "#ffffff" : "#212121"}
                  backgroundColor={focused ? "#FF6C00" : "transparent"}
                  paddingHorizontal={focused ? 25 : null}
                  paddingVertical={focused ? 13 : null}
                  style={{
                    borderTopLeftRadius: 100,
                    borderTopRightRadius: 100,
                    borderBottomLeftRadius: 100,
                    borderBottomRightRadius: 100,
                  }}
                />
              );
            },
            headerShown: false,
          }}
        />
        <MainTab.Screen
          name="CreatePosts"
          component={CreatePostsScreen}
          options={{
            tabBarIcon: ({ focused, size, color }) => {
              return (
                <Feather
                  name="plus"
                  size={focused ? 13 : 24}
                  color={focused ? "#ffffff" : "#212121"}
                  backgroundColor={focused ? "#FF6C00" : "transparent"}
                  paddingHorizontal={focused ? 30 : null}
                  paddingVertical={focused ? 13 : null}
                  style={{
                    borderTopLeftRadius: 100,
                    borderTopRightRadius: 100,
                    borderBottomLeftRadius: 100,
                    borderBottomRightRadius: 100,
                  }}
                />
              );
            },
            headerLeft: (props) => (
              <TouchableOpacity onPress={() => navigation.navigate("Posts")}>
                <Feather
                  name="arrow-left"
                  size={24}
                  color="#BDBDBD"
                  style={{ marginLeft: 10 }}
                />
              </TouchableOpacity>
            ),
            unmountOnBlur: true,
          }}
        />

        <MainTab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            tabBarIcon: ({ focused, size, color }) => {
              return (
                <Feather
                  name="user"
                  size={focused ? 13 : 24}
                  color={focused ? "#ffffff" : "#212121"}
                  backgroundColor={focused ? "#FF6C00" : "transparent"}
                  paddingHorizontal={focused ? 30 : null}
                  paddingVertical={focused ? 13 : null}
                  style={{
                    borderTopLeftRadius: 100,
                    borderTopRightRadius: 100,
                    borderBottomLeftRadius: 100,
                    borderBottomRightRadius: 100,
                  }}
                />
              );
            },
            headerShown: false,
          }}
        />
      </MainTab.Navigator>
    </>
  );
};

export default CreateTabNav;
