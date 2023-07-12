import { Feather } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  SafeAreaView,
} from "react-native";
import { useSelector } from "react-redux";
import db from "../../firebase/config";
import { selectUser } from "../../redux/auth/selectors";

const DefaultScreenPosts = ({ navigation }) => {
  const [posts, setPosts] = useState([]);

  const { avatar, login, email } = useSelector(selectUser);

  useEffect(() => {
    const unsubscribe = db
      .firestore()
      .collection("posts")
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

  const handleLike = (postId) => {
    const currentUser = db.auth().currentUser;

    const post = posts.find((item) => item.id === postId);
    const hasLiked = post.likes && post.likes[currentUser.uid];

    if (hasLiked) {
      db.firestore()
        .collection("posts")
        .doc(postId)
        .update({
          [`likes.${currentUser.uid}`]: db.firestore.FieldValue.delete(),
        })
        .catch((error) => {
          console.error("Помилка при забиранні лайка:", error);
        });
    } else {
      db.firestore()
        .collection("posts")
        .doc(postId)
        .update({
          [`likes.${currentUser.uid}`]: true,
        })
        .catch((error) => {
          console.error("Помилка при додаванні лайка:", error);
        });
    }
  };

  console.log("posts ---->", posts);

  return (
    <View style={styles.container}>
      <View style={styles.profileBox}>
        <Image source={{ uri: avatar }} style={styles.loadPhoto} />
        <View style={{ marginLeft: 8, marginTop: 8 }}>
          <Text style={styles.login}>{login}</Text>
          <Text>{email}</Text>
        </View>
      </View>
      <SafeAreaView style={{ marginTop: 32, marginBottom: 80 }}>
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
                <View style={{ flexDirection: "row", gap: 24 }}>
                  <View style={{ flexDirection: "row" }}>
                    <Feather
                      name="message-circle"
                      size={24}
                      color={item.comments.length >= 0 ? "#FF6C00" : "#BDBDBD"}
                      style={{ transform: [{ rotate: "-90deg" }] }}
                      onPress={() => navigation.navigate("Comments", { item })}
                    />
                    <Text
                      style={{ color: "#BDBDBD", fontSize: 16, marginLeft: 8 }}
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
                        Object.keys(item.likes).length  > 0
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
                    {`${item.location.region}, ${item.location.country}`}
                  </Text>
                </View>
              </View>
            </View>
          )}
        />
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  profileBox: {
    flexDirection: "row",
    marginTop: 32,
    marginHorizontal: 16,
  },
  loadPhoto: {
    width: 60,
    height: 60,
    backgroundColor: "#F6F6F6",
    borderRadius: 16,
  },
  login: {
    color: "#212121",
    fontSize: 13,
    fontWeight: "bold",
  },
  card: {
    flex: 1,
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

export default DefaultScreenPosts;
