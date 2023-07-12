import { AntDesign } from "@expo/vector-icons";
import { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  Image,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
} from "react-native";
import { useSelector } from "react-redux";
import db from "../../firebase/config";
import { selectUser } from "../../redux/auth/selectors";

const CommentsScreen = ({ route }) => {
  const postId = route.params.item.id;

  const [picture, setPicture] = useState(null);
  const [comment, setComment] = useState("");
  const [allComments, setAllComments] = useState([]);
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);

  const date = new Date().toLocaleString("uk-UA", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  const { login, avatar } = useSelector(selectUser);

  useEffect(() => {
    getAllComments();
  }, []);

  const createPost = async () => {
    await db
      .firestore()
      .collection("posts")
      .doc(postId)
      .collection("comments")
      .add({ comment, login, date });

    setComment("");
  };

  const getAllComments = async () => {
    await db
      .firestore()
      .collection("posts")
      .doc(postId)
      .collection("comments")
      .onSnapshot((data) =>
        setAllComments(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
      );
  };

  useEffect(() => {
    try {
      if (route.params) {
        setPicture(route.params.item.photo);
      }
    } catch (error) {
      console.log(error.message);
    }
  }, [route.params]);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <View style={styles.card}>
          <Image style={styles.image} source={{ uri: picture }} />
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <SafeAreaView style={{ height: 300 }}>
            <FlatList
              data={allComments}
              renderItem={({ item }) => (
                <View style={{ flexDirection: "row", gap: 16, marginTop: 16 }}>
                  <Image source={{ uri: avatar }} style={styles.loadPhoto} />
                  <View style={styles.commentBox}>
                    <Text
                      style={styles.commentText}
                      onPress={() => setIsShowKeyboard(true)}
                    >
                      {item.comment}
                    </Text>
                    <Text
                      style={{
                        fontSize: 10,
                        color: "#BDBDBD",
                        marginLeft: "auto",
                        marginRight: 60,
                        paddingBottom: 20,
                      }}
                    >
                      {item.date}
                    </Text>
                  </View>
                </View>
              )}
              keyExtractor={(item) => item.id}
            />
          </SafeAreaView>

          <TouchableOpacity
            style={{ ...styles.button, bottom: isShowKeyboard ? 50 : 10 }}
          >
            <TextInput
              onFocus={() => setIsShowKeyboard(true)}
              onBlur={() => setIsShowKeyboard(false)}
              value={comment}
              onChangeText={setComment}
              placeholder="Коментувати..."
              required
              style={{ width: "100%" }}
            />
            <TouchableOpacity style={styles.buttonIconBox} onPress={createPost}>
              <AntDesign name="arrowup" size={24} color="#FFFFFF" />
            </TouchableOpacity>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 16,
  },
  card: {
    height: 250,
    // marginTop: 32,
  },
  loadPhoto: {
    width: 28,
    height: 28,
    backgroundColor: "#F6F6F6",
    borderRadius: 50,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 8,
  },
  button: {
    position: "absolute",
    width: "100%",
    padding: 16,
    borderRadius: 100,
    backgroundColor: "#BDBDBD",
  },
  buttonIconBox: {
    position: "absolute",
    bottom: 13,
    right: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FF6C00",
    width: 34,
    height: 34,
    borderRadius: 50,
  },
  commentBox: {
    width: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.03)",
    borderRadius: 6,
    paddingTop: 16,
    marginBottom: 10,
  },
  commentText: {
    width: "100%",
    // height: 30,
    color: "#212121",
    fontSize: 13,
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
});

export default CommentsScreen;
