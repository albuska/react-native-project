import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  ImageBackground,
  Image,
} from "react-native";
import { Feather, createIconSet } from "@expo/vector-icons";
import { selectUser } from "../../redux/auth/selectors";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import db from "../../firebase/config";

const ProfileScreen = () => {
  const { userId, avatar, login } = useSelector(selectUser);

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const unsubscribe = db
      .firestore()
      .collection("posts")
      .where("userId", "==", userId)
      .onSnapshot((snapshot) => {
        const updatedPosts = [];
        snapshot.forEach((doc) => {
          const post = doc.data();
          post.id = doc.id;
          post.comments = [];
          updatedPosts.push(post);

          const commentsSnapshot = doc.ref
            .collection("comments")
            .onSnapshot((comments) => {
              const updatedComments = comments.docs.map((commentDoc) => ({
                id: commentDoc.id,
                ...commentDoc.data(),
              }));
              const postIndex = updatedPosts.findIndex((p) => p.id === doc.id);
              if (postIndex !== -1) {
                updatedPosts[postIndex].comments = updatedComments;
                setPosts([...updatedPosts]);
              }
            });

          return () => {
            commentsSnapshot();
          };
        });
      });

    return () => {
      unsubscribe();
    };
  }, []);

  // const handleLike = (postId) => {
  //   const currentUser = db.auth().currentUser;

  //   const post = posts.find((item) => item.id === postId);
  //   const hasLiked = post.likes && post.likes[currentUser.uid];

  //   if (hasLiked) {
  //     db.firestore()
  //       .collection("posts")
  //       .doc(postId)
  //       .update({
  //         [`likes.${currentUser.uid}`]: db.firestore.FieldValue.delete(),
  //       })
  //       .catch((error) => {
  //         console.error("Помилка при забиранні лайка:", error);
  //       });
  //   } else {
  //     db.firestore()
  //       .collection("posts")
  //       .doc(postId)
  //       .update({
  //         [`likes.${currentUser.uid}`]: true,
  //       })
  //       .catch((error) => {
  //         console.error("Помилка при додаванні лайка:", error);
  //       });
  //   }
  // };

  // const getAllPost = async () => {
  //   await db
  //     .firestore()
  //     .collection("posts")
  //     .where("userId", "==", userId)
  //     .onSnapshot((data) =>
  //       setPosts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
  //     );
  // };

  // useEffect(() => {
  //   getAllPost();
  // }, []);

  console.log("Profile", posts);

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
            data={posts}
            keyExtractor={(item) => item.id}
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
                        color={
                          item.comments.length >= 0 ? "#FF6C00" : "#BDBDBD"
                        }
                        style={{ transform: [{ rotate: "-90deg" }] }}
                      />
                      <Text
                        style={{
                          color: "#BDBDBD",
                          fontSize: 16,
                          marginLeft: 8,
                        }}
                      >
                        {item.comments.length >= 0 ? item.comments.length : 0}
                      </Text>
                    </View>
                    <View style={{ flexDirection: "row" }}>
                      <Feather
                        onPress={() => handleLike(item.id)}
                        name="thumbs-up"
                        size={24}
                        color={
                          item.likes && Object.keys(item.likes).length
                            ? "#FF6C00"
                            : "#BDBDBD"
                        }
                      />
                      <Text
                        style={{
                          color: "#BDBDBD",
                          fontSize: 16,
                          marginLeft: 8,
                        }}
                      >
                        {item.likes ? Object.keys(item.likes).length : 0}
                      </Text>
                    </View>
                  </View>
                  <View style={{ flexDirection: "row" }}>
                    <Feather name="map-pin" size={24} color="#BDBDBD" />
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
