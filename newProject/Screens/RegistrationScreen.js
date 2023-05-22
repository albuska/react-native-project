import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import React, { useState } from "react";

const RegistrationScreen = () => {
  const [login, setLogin] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //   const handleLoginChange = (login) => setLogin(login);
  //   const handleEmailChange = (email) => setLogin(email);
  //   const handlePasswordChange = (password) => setLogin(password);

  return (
    <View style={styles.container}>
      <ImageBackground
        resizeMode="cover"
        source={require("../assets/PhotoBG.jpg")}
        style={styles.imageBg}
      >
        <View style={styles.containerRegisterForm}>
          <View style={styles.inputBox}>
            <Text style={styles.title}>Реєстрація</Text>
            <TextInput
              style={styles.input}
              name="login"
              placeholder="Логін"
              value={login}
              onChangeText={setLogin}
            />
            <TextInput
              style={styles.input}
              name="email"
              placeholder="Адреса електронної пошти"
              value={email}
              onChangeText={setEmail}
            />
            <View>
              <TextInput
                style={styles.input}
                name="password"
                placeholder="Пароль"
                value={password}
                onChangeText={setPassword}
              />
              <Text style={styles.textLookPassword}>Показати</Text>
            </View>

            <TouchableOpacity style={styles.button}>
              <Text style={styles.textButton}>Зареєструватися</Text>
            </TouchableOpacity>
            <Text style={styles.text}>Уже є аккаунт? Ввійти</Text>
          </View>
        </View>
        <View style={styles.loadPhoto}>
          <View style={styles.addIcon}></View>
          <View style={styles.iconPlusHorizontal}></View>
          <View style={styles.iconPlusVertical}></View>
        </View>
      </ImageBackground>
    </View>
  );
};

export default RegistrationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    marginBottom: 33,
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
