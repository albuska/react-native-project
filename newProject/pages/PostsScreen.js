import { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image } from "react-native";

const PostsScreen = ({ route }) => {
  const [posts, setPosts] = useState([]);
  
  useEffect(() => {
    if (route.params === undefined) {
      return; 
    }
    setPosts(route.params);
}, [route])

  console.debug("----->", route.params)
  return (
      <View style={styles.container}>
        <Image source={posts.phone} />
        <Text>{posts.name}</Text>
      </View>
    )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
  },
});

export default PostsScreen;
