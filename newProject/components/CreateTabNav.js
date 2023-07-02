import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import PostsScreen from "../pages/PostsScreen";
import ProfileScreen from "../pages/ProfileScreen";
import CreatePostsScreen from "../pages/CreatePostsScreen";
import { Feather } from "@expo/vector-icons";

const MainTab = createBottomTabNavigator();

const CreateTabNav = () => {
  return (
    <>
      <MainTab.Navigator
        screenOptions={{
          tabBarShowLabel: false,
          headerTitleAlign: "center",
          unmountOnBlur: true,
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
            headerRight: (props) => (
              <Feather
                name="log-out"
                size={24}
                color="#BDBDBD"
                style={{ marginRight: 10 }}
              />
            ),
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
              />
            ),
            // unmountOnBlur: true,
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
          }}
        />
      </MainTab.Navigator>
    </>
  );
};

export default CreateTabNav;
