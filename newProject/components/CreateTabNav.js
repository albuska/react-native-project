import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import PostsScreen from "../pages/mainPages/PostsScreen";
import ProfileScreen from "../pages/mainPages/ProfileScreen";
import CreatePostsScreen from "../pages/mainPages/CreatePostsScreen";
import { Feather } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import { logout } from "../redux/auth/operations";
import { useDispatch } from "react-redux";

const MainTab = createBottomTabNavigator();

const CreateTabNav = () => {
  const dispatch = useDispatch();
  return (
    <>
      <MainTab.Navigator
        screenOptions={{
          tabBarShowLabel: false,
          headerTitleAlign: "center",
          // headerRight: (props) => (
          //   <TouchableOpacity onPress={() => dispatch(logout())}>
          //     <Feather
          //       name="log-out"
          //       size={24}
          //       color="#BDBDBD"
          //       style={{ marginRight: 10 }}
          //     />
          //   </TouchableOpacity>
          // ),
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
              <Feather
                name="arrow-left"
                size={24}
                color="#BDBDBD"
                style={{ marginLeft: 10 }}
                onPress={() => navigation.navigate("DefaultScreen")}
              />
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
