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

  const [isFocused, setIsFocused] = useState(false);
  const [picture, setPicture] = useState(null);
  const [comment, setComment] = useState("");
  const [allComments, setAllComments] = useState([]);

  const { login } = useSelector(selectUser);

  useEffect(() => {
    getAllComments();
  }, []);

  const createPost = async () => {
    await db
      .firestore()
      .collection("posts")
      .doc(postId)
      .collection("comments")
      .add({ comment, login });
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
    <TouchableWithoutFeedback onPress={Keyboard}>
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
          <SafeAreaView>
            <FlatList
              data={allComments}
              renderItem={({ item }) => (
                <View style={styles.commentBox}>
                  <Text style={styles.commentText}>{item.comment}</Text>
                </View>
              )}
              keyExtractor={(item) => item.id}
            />
          </SafeAreaView>

          <TouchableOpacity
            style={{ ...styles.button, marginBottom: isFocused ? 300 : 16 }}
          >
            <TextInput
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
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
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 16,
  },
  card: {
    height: 343,
    flex: 1,
    justifyContent: "space-between",

    marginTop: 32,
  },
  image: {
    width: "100%",
    height: "100%",
    // height: 343,
    borderRadius: 8,
  },
  button: {
    alignItems: "center",
    padding: 16,
    borderRadius: 100,
    backgroundColor: "#BDBDBD",
    marginVertical: 16,
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
    height: 29,
    backgroundColor: "rgba(0, 0, 0, 0.03)",
    borderRadius: 6,
    padding: 16,
    paddingVertical: 6,
    marginBottom: 24,
  },
  commentText: {
    height: 30,
    color: "#212121",
    lineHeight: 1.4,
    fontSize: 13,
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
});

export default CommentsScreen;
