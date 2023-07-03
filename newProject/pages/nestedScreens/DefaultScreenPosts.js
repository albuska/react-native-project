import { Feather } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, FlatList } from "react-native";

const DefaultScreenPosts = ({ route, navigation }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    try {
      if (route.params) {
        setPosts((prevState) => [...prevState, route.params]);
      }
    } catch (error) {
      console.log(error.message);
    }
  }, [route.params]);

  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image style={styles.image} source={{ uri: item.photo }} />
            <Text style={styles.title}>{item.name}</Text>
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <View style={{ flexDirection: "row" }}>
                <Feather
                  name="message-circle"
                  size={24}
                  color="#BDBDBD"
                  style={{ transform: [{ rotate: "-90deg" }] }}
                  onPress={() => navigation.navigate("Comments")}
                />
                <Text style={{ color: "#BDBDBD", fontSize: 16, marginLeft: 8 }}>
                  0
                </Text>
              </View>
              <View style={{ flexDirection: "row" }}>
                <Feather
                  name="map-pin"
                  size={24}
                  color="#BDBDBD"
                  onPress={() => navigation.navigate("Map", {})}
                />
                <Text
                  style={{
                    textDecorationLine: "underline",
                    textDecorationStyle: "solid",
                    textDecorationColor: "#1B4371",
                    color: "#212121",
                    marginLeft: 8,
                  }}
                >
                  {item.location}
                </Text>
              </View>
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
  },
  card: {
    flex: 1,
    justifyContent: "center",
    marginHorizontal: 16,
    marginBottom: 34,
  },
  image: {
    height: 400,
    borderRadius: 8,
  },
  title: {
    color: "#212121",
    fontSize: 16,
    fontFamily: "RobotoBold",
    marginTop: 5,
  },
});

export default DefaultScreenPosts;
