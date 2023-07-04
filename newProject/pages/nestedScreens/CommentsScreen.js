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
} from "react-native";

const CommentsScreen = ({ route }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [picture, setPicture] = useState(null);
  const [comment, setComment] = useState("");

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
            <View style={styles.buttonIconBox}>
              <AntDesign name="arrowup" size={24} color="#FFFFFF" />
            </View>
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
  },
  card: {
    flex: 1,
    justifyContent: "space-between",
    marginHorizontal: 16,
    marginTop: 32,
  },
  image: {
    height: "40%",
    borderRadius: 8,
  },
  button: {
    alignItems: "center",
    padding: 16,
    borderRadius: 100,
    backgroundColor: "#BDBDBD",
    marginHorizontal: 16,
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
});

export default CommentsScreen;
