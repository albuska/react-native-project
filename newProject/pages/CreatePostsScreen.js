import { Feather } from "@expo/vector-icons";
import * as MediaLibrary from "expo-media-library";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { Camera, CameraType } from "expo-camera";
import { useState, useEffect } from "react";

const CreatePostsScreen = () => {
  const [cameraRef, setCameraRef] = useState(null); 
  const [type, setType] = useState(null); 

  return (
    <View style={styles.container}>
      <Camera style={styles.camera} type={type} ref={setCameraRef}>
        
      </Camera>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1
  },
  
});

export default CreatePostsScreen;
