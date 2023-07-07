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
  Button,
} from "react-native";
import Icon from "react-native-vector-icons/AntDesign";
import * as ImagePicker from "expo-image-picker";
import React, { useState } from "react";
import { register } from "../redux/auth/operations";
import { useDispatch, useSelector } from "react-redux";

const RegistrationScreen = ({ navigation }) => {
  const [hidePass, setHidePass] = useState(true);
  const [login, setLogin] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState(null);
  const [isFocused, setIsFocused] = useState(false);
  const [borderColor, setBorderColor] = useState("#E8E8E8");
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [isLogin, setIsLogin] = useState(false);

  const dispatch = useDispatch();

  const handleFocus = () => {
    // switch (value) {
    //   case "login":
    //     setIsFocused(true);
    //     console.debug("1");
    //     return;
    // }
    //     switch (value) {
    //       case "email":
    //         setIsFocused(true);
    //         console.debug("2");
    //         return;
    //     }
    //     switch (value) {
    //       case "password":
    //         setIsFocused(true);
    //         console.debug("3");
    //         return;
    //     }
    setBorderColor("#FF6C00");
  };

  const handleBlur = () => {
    setBorderColor("#E8E8E8");
  };

  const addImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const closeImage = () => {
    setImage(null);
  };

  const signIn = () => {
    dispatch(register({ login, email, password }));
    setIsLogin(true);

    setLogin("");
    setEmail("");
    setPassword("");
  };

  //   const handleLoginChange = (login) => setLogin(login);
  //   const handleEmailChange = (email) => setLogin(email);
  //   const handlePasswordChange = (password) => setLogin(password);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      {/* <View style={styles.container}> */}
      <ImageBackground
        resizeMode="cover"
        source={require("../assets/PhotoBG.jpg")}
        style={{
          ...styles.imageBg,
          justifyContent: isShowKeyboard ? "center" : "flex-end",
        }}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS == "ios" ? "padding" : "height"}
        >
          <View style={styles.containerRegisterForm}>
            <ImageBackground
              source={{ uri: image }}
              style={styles.loadPhoto}
              imageStyle={{ borderRadius: 16 }}
            >
              <TouchableOpacity style={styles.addIcon} onPress={addImage}>
                {image ? (
                  <Icon
                    name="close"
                    color="#FF6C00"
                    size={20}
                    onPress={closeImage}
                  />
                ) : (
                  <Icon name="plus" color="#FF6C00" size={20} />
                )}
              </TouchableOpacity>
            </ImageBackground>
            <Text style={styles.title}>Реєстрація</Text>
            <TextInput
              onFocus={() => setIsShowKeyboard(true)}
              onBlur={() => handleBlur}
              style={{ ...styles.input, borderColor }}
              placeholder="Логін"
              value={login}
              onChangeText={setLogin}
            />
            <TextInput
              onFocus={() => setIsShowKeyboard(true)}
              onBlur={() => handleBlur}
              style={{
                ...styles.input,
                borderColor,
              }}
              placeholder="Адреса електронної пошти"
              autoComplete="email"
              value={email}
              onChangeText={setEmail}
            />
            <View>
              <TextInput
                onFocus={() => setIsShowKeyboard(true)}
                onBlur={() => handleBlur}
                style={{
                  ...styles.input,
                  borderColor,
                }}
                placeholder="Пароль"
                autoComplete="password"
                secureTextEntry={hidePass ? true : false}
                value={password}
                onChangeText={setPassword}
              />

              <Text
                style={styles.textLookPassword}
                onPress={() => setHidePass(!hidePass)}
              >
                {hidePass ? "Показати" : "Заховати"}
              </Text>
            </View>
            <TouchableOpacity style={styles.button} onPress={signIn}>
              <Text style={styles.textButton}>Зареєструватися</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
              <Text style={styles.text}>Уже є аккаунт? Увійти</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </ImageBackground>
      {/* </View> */}
    </TouchableWithoutFeedback>
  );
};

export default RegistrationScreen;

const styles = StyleSheet.create({
  imageBg: {
    flex: 1,
  },
  containerRegisterForm: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: "#ffffff",
    paddingBottom: 66,
    paddingHorizontal: 16,
    paddingTop: 92,
  },
  title: {
    // fontFamily: "Roboto",
    // fontWeight: 500,
    fontSize: 30,
    lineHeight: 35,
    textAlign: "center",
    letterSpacing: 0.01,
    color: "#212121",
    marginBottom: 22,
  },
  input: {
    backgroundColor: "#F6F6F6",
    borderWidth: 1,
    borderRadius: 8,
    paddingTop: 16,
    paddingBottom: 15,
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  // textInputFocus: {
  //   borderColor: "#FF6C00",
  // },
  // textInput: {
  //   borderColor: "#E8E8E8",
  // },
  text: {
    textAlign: "center",
    marginTop: 16,
    color: "#1B4371",
    // fontWeight: "bold",
  },
  loadPhoto: {
    position: "absolute",
    top: -60,
    right: 140,
    width: 120,
    height: 120,
    backgroundColor: "#F6F6F6",
    borderRadius: 16,
    elevation: 5,
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
    elevation: 3,
  },
  button: {
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
