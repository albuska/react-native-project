import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  ImageBackground,
  Image,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { selectUser } from "../../redux/auth/selectors";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import db from "../../firebase/config";

const ProfileScreen = () => {
  const { userId, avatar, login } = useSelector(selectUser);

  const [listPosts, setListPosts] = useState([]);
  // const [isFollowing, setIsFollowing] = useState(false);
  // const [likes, setLikes] = useState(0);

  // const handleClickChangeFollow = () => {
  //   console.log("click");
  //   if (!isFollowing) {
  //     setIsFollowing(true);
  //     setLikes(likes + 1);
  //   } else {
  //     setIsFollowing(false);
  //     setLikes(likes - 1);
  //   }
  // };

  const getUserPosts = async () => {
    await db
      .firestore()
      .collection("posts")
      .where("userId", "==", userId)
      .onSnapshot((data) =>
        setListPosts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
      );
  };

  useEffect(() => {
    getUserPosts();
  }, []);

  return (
    <ImageBackground
      resizeMode="cover"
      source={require("../../assets/PhotoBG.jpg")}
      style={styles.imageBg}
    >
      <View style={styles.container}>
        <View style={{ alignItems: "center" }}>
          <Image source={{ uri: avatar }} style={styles.loadPhoto} />
          <Text style={styles.login}>{login}</Text>
        </View>
        <SafeAreaView>
          <FlatList
            data={listPosts}
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
                  <View style={{ flexDirection: "row", gap: 24 }}>
                    <View style={{ flexDirection: "row" }}>
                      <Feather
                        name="message-circle"
                        size={24}
                        color="#BDBDBD"
                        style={{ transform: [{ rotate: "-90deg" }] }}
                        onPress={() =>
                          navigation.navigate("Comments", { item })
                        }
                      />
                      <Text
                        style={{
                          color: "#BDBDBD",
                          fontSize: 16,
                          marginLeft: 8,
                        }}
                      >
                        0
                      </Text>
                    </View>
                    <View style={{ flexDirection: "row" }}>
                      <Feather
                        onPress={handleClickChangeFollow}
                        name="thumbs-up"
                        size={24}
                        color={isFollowing ? "#FF6C00" : "#BDBDBD"}
                      />
                      <Text
                        style={{
                          color: "#BDBDBD",
                          fontSize: 16,
                          marginLeft: 8,
                        }}
                      >
                        0
                        {/* {likes} */}
                      </Text>
                    </View>
                  </View>
                  <View style={{ flexDirection: "row" }}>
                    <Feather
                      name="map-pin"
                      size={24}
                      color="#BDBDBD"
                      onPress={() => navigation.navigate("Map", { item })}
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
                      {`${item.location.country}`}
                    </Text>
                  </View>
                </View>
              </View>
            )}
            keyExtractor={(item) => item.id}
          />
        </SafeAreaView>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  imageBg: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  container: {
    flex: 1,
    marginTop: 200,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    // alignItems: "center",
    backgroundColor: "#FFFFFF",
    paddingBottom: 140,
  },
  loadPhoto: {
    top: -60,
    width: 120,
    height: 120,
    backgroundColor: "#F6F6F6",
    borderRadius: 16,
  },
  login: {
    color: "#212121",
    fontSize: 28,
    letterSpacing: 0.3,
    top: -35,
    fontWeight: "bold",
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
    // fontFamily: "RobotoBold",
    fontWeight: "bold",
    marginTop: 5,
    marginBottom: 5,
  },
});

export default ProfileScreen;
