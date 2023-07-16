import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import { useState } from "react";
import { login } from "../redux/auth/operations";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../redux/auth/selectors";

const LoginScreen = ({ navigation }) => {
  const [hidePass, setHidePass] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [focusedInput, setFocusedInput] = useState(null);

  const user = useSelector(selectUser);

  const dispatch = useDispatch();

  const handleInputFocus = (input) => {
    setIsShowKeyboard(true);
    setFocusedInput(input);
  };

  const handleInputBlur = () => {
    setIsShowKeyboard(false);
    setFocusedInput(null);
  };

  const onLogin = () => {
    if (user.email !== email || user.password !== password)
      Alert.alert("Password or email entered incorrectly!");

    dispatch(login({ email, password }));
    // setIsLogin(true);
    Alert.alert("You are welcome!");

    setEmail("");
    setPassword("");
  };

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
              <Text style={styles.title}>Увійти</Text>
              <KeyboardAvoidingView
                behavior={Platform.OS == "ios" ? "padding" : "height"}
              >
                <TextInput
                  onFocus={() => handleInputFocus("email")}
                  onBlur={handleInputBlur}
                  style={[
                    styles.input,
                    focusedInput === "email" && styles.focusedFormInput,
                  ]}
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
                    onFocus={() => handleInputFocus("password")}
                    onBlur={handleInputBlur}
                    style={[
                      styles.input,
                      focusedInput === "password" && styles.focusedFormInput,
                    ]}
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
                  {hidePass ? "Показати" : "Заховати"}
                </Text>
              </View>

              <TouchableOpacity style={styles.button}>
                <Text style={styles.textButton} onPress={onLogin}>
                  Увійти
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => navigation.navigate("Registration")}
              >
                <Text style={styles.text}>
                  Немає акаунту?{" "}
                  <Text style={styles.textButtonToRegister}>
                    Зареєструватися
                  </Text>{" "}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default LoginScreen;

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
    fontWeight: "bold",
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
    paddingTop: 32,
    paddingBottom: 111,
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
  focusedFormInput: {
    borderWidth: 1,
    borderStyle: "solid",
    borderRadius: 8,
    borderColor: "#FF6C00",
    backgroundColor: "#FFFFFF",
  },
  text: {
    textAlign: "center",
    marginTop: 16,
    color: "#1B4371",
    fontWeight: "bold",
  },
  textButtonToRegister: {
    textDecorationLine: "underline",
    textDecorationStyle: "solid",
    textDecorationColor: "#1B4371",
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
    marginTop: 43,
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
