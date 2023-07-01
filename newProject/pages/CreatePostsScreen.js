import { Fontisto, Feather } from "@expo/vector-icons";
import * as MediaLibrary from "expo-media-library";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
} from "react-native";
import { Camera, CameraType } from "expo-camera";
import { useState, useEffect } from "react";

const CreatePostsScreen = ({ navigation }) => {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [cameraRef, setCameraRef] = useState(null);
  const [photo, setPhoto] = useState("");
  const [type, setType] = useState(null);

  const takePhoto = async () => {
    const photo = await cameraRef.takePictureAsync();
    setPhoto(photo.uri);
  };

  const sendPost = () => {
    const post = {
      photo,
      name,
      location,
    };
    navigation.navigate("Posts", post);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <View style={styles.containerCamera}>
          <Camera style={styles.camera} ref={setCameraRef}>
            {photo && (
              <View style={styles.containerImage}>
                <Image
                  source={{ uri: photo }}
                  style={{ width: 100, height: 100, borderRadius: 10 }}
                />
              </View>
            )}
            <TouchableOpacity
              style={{
                ...styles.containerSnap,
                backgroundColor: photo
                  ? "rgba(255, 255, 255, 0.30)"
                  : "#FFFFFF",
              }}
              onPress={takePhoto}
            >
              <Fontisto
                name="camera"
                size={24}
                color={photo ? "#FFFFFF" : "#BDBDBD"}
              />
            </TouchableOpacity>
          </Camera>
          <View style={styles.containerLoadImage}>
            <TouchableOpacity>
              <Text style={{ color: "#BDBDBD", marginBottom: 20 }}>
                {photo ? "Редагувати фото" : "Завантажте фото"}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.form}>
            <View style={styles.input}>
              <TextInput
                placeholder="Назва..."
                required
                value={name}
                onChangeText={setName}
                style={{ width: "100%"}}
              />
            </View>
            <View style={styles.input}>
              <Feather
                name="map-pin"
                size={24}
                color="#BDBDBD"
                style={{ paddingRight: 4 }}
              />
              <TextInput
                value={location}
                onChangeText={setLocation}
                placeholder="Місцевість..."
                required
                style={{ width: "100%"}}
              />
            </View>
            <TouchableOpacity
              style={{
                ...styles.button,
                backgroundColor:
                  photo && name && location ? "#FF6C00" : "#BDBDBD",
              }}
              onPress={sendPost}
            >
              <Text style={styles.textButton}>Опублікувати</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ alignItems: "center" }}>
          <View style={styles.bgIcon}>
            <Feather name="trash-2" size={24} color="#ffffff" />
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  containerCamera: {
    flex: 1,
    marginHorizontal: 20,
    marginVertical: 20,
    borderRadius: 8,
    overflow: "hidden",
  },
  camera: {
    height: "40%",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
  },
  containerSnap: {
    borderWidth: 1,
    borderRadius: 50,
    borderColor: "transparent",
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
  },
  containerImage: {
    position: "absolute",
    top: 0,
    left: 85,
    borderColor: "#FFFFFF",
    borderWidth: 1,
    borderRadius: 10,
  },
  containerLoadImage: {
    marginTop: 8,
  },
  form: {
    // marginVertical: 20,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: "#BDBDBD",
    borderStyle: "solid",
    marginVertical: 10,
    paddingVertical: 15,
    flexDirection: "row",
  },
  button: {
    alignItems: "center",
    padding: 16,
    borderRadius: 100,
    marginTop: 23,
  },
  textButton: {
    color: "#ffffff",
  },
  bgIcon: {
    width: 70,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#BDBDBD",
    borderTopLeftRadius: 100,
    borderTopRightRadius: 100,
    borderBottomLeftRadius: 100,
    borderBottomRightRadius: 100,
    marginBottom: 34,
  },
});

export default CreatePostsScreen;
