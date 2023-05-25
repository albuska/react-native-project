import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Image,
} from "react-native";
import React, { useState } from "react";
// import Icon from "react-native-vector-icons/AntDesign";
import Icon from "react-native-vector-icons/AntDesign";
import * as ImagePicker from "expo-image-picker";

const RegistrationScreen = () => {
  const [hidePass, setHidePass] = useState(true);
  const [login, setLogin] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState(null);

  const signIn = () => {
    console.debug("Welcome!");
  };

  const addImage = async () => {
    console.debug("add image");
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      let filename = result?.assets[0].uri.substring(
        result?.assets[0].uri.lastIndexOf("/") + 1,
        result?.assets[0].uri.length
      );

      delete result.cancelled;
      result = {
        ...result,
        name: filename,
      };
    }
  };

  //   const handleLoginChange = (login) => setLogin(login);
  //   const handleEmailChange = (email) => setLogin(email);
  //   const handlePasswordChange = (password) => setLogin(password);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <ImageBackground
          resizeMode="cover"
          source={require("../assets/PhotoBG.jpg")}
          style={styles.imageBg}
        >
          <View style={styles.containerRegisterForm}>
            <View style={styles.inputBox}>
              <View></View>
              <Text style={styles.title}>Реєстрація</Text>
              <KeyboardAvoidingView
                behavior={Platform.OS == "ios" ? "padding" : "height"}
              >
                <TextInput
                  style={styles.input}
                  // name="login"
                  placeholder="Логін"
                  value={login}
                  onChangeText={setLogin}
                />
              </KeyboardAvoidingView>
              <KeyboardAvoidingView
                behavior={Platform.OS == "ios" ? "padding" : "height"}
              >
                <TextInput
                  style={styles.input}
                  // name="email"
                  placeholder="Адреса електронної пошти"
                  autoComplete="email"
                  value={email}
                  onChangeText={setEmail}
                />
              </KeyboardAvoidingView>
              <View>
                <KeyboardAvoidingView
                  behavior={Platform.OS == "ios" ? "padding" : "height"}
                >
                  <TextInput
                    style={styles.input}
                    // name="password"
                    placeholder="Пароль"
                    autoComplete="password"
                    secureTextEntry={hidePass ? true : false}
                    value={password}
                    onChangeText={setPassword}
                  />
                </KeyboardAvoidingView>
                <Text
                  style={styles.textLookPassword}
                  onPress={() => setHidePass(!hidePass)}
                >
                  Показати
                </Text>
              </View>

              <TouchableOpacity style={styles.button} onPress={signIn}>
                <Text style={styles.textButton}>Зареєструватися</Text>
              </TouchableOpacity>
              <Text style={styles.text}>Уже є аккаунт? Ввійти</Text>
            </View>
          </View>
          <View style={styles.loadPhoto}>
            <TouchableOpacity style={styles.addIcon} onPress={addImage}>
              {/* <Icon name="close" color="#FF6C00" size={20} /> */}
              <Icon name="plus" color="#FF6C00" size={20} />
            </TouchableOpacity>
            {image && (
              <Image
                source={{ uri: image }}
                style={{ width: 120, height: 120 }}
              />
            )}
          </View>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default RegistrationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingBottom: 30,
  },
  imageBg: {
    flex: 1,
    justifyContent: "flex-end",
  },
  containerRegisterForm: {
    backgroundColor: "#ffffff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  title: {
    fontStyle: "normal",
    fontWeight: 500,
    fontSize: 30,
    lineHeight: 35,
    textAlign: "center",
    letterSpacing: 0.01,
    color: "#212121",
    marginBottom: 22,
  },
  inputBox: {
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 92,
    paddingBottom: 66,
    width: "100%",
  },
  input: {
    backgroundColor: "#F6F6F6",
    borderColor: "#E8E8E8",
    borderWidth: 1,
    borderRadius: 8,
    paddingTop: 16,
    paddingBottom: 15,
    paddingLeft: 16,
    marginBottom: 16,
  },
  text: {
    textAlign: "center",
    marginTop: 16,
  },
  loadPhoto: {
    position: "absolute",
    top: 200,
    right: 140,
    width: 120,
    height: 120,
    backgroundColor: "#F6F6F6",
    borderRadius: 16,
  },
  addIcon: {
    position: "absolute",
    right: -10,
    bottom: 20,
    width: 25,
    height: 25,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    borderColor: "#FF6C00",
    borderWidth: 1,
    backgroundColor: "#ffffff",
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    borderRadius: 100,
    backgroundColor: "#FF6C00",
    marginTop: 23,
  },
  textButton: {
    color: "#ffffff",
  },
  textLookPassword: {
    position: "absolute",
    right: 15,
    top: 20,
    color: "#1B4371",
  },
});
