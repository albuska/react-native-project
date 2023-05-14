import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, TextInput, Button } from "react-native";
import React, { useState } from "react";

export default function App() {
  const [login, setLogin] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLoginChange = (login) => {
    setLogin(login);
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Реєстрація</Text>
      <View>
        <TextInput
          placeholder="Логін"
          value={login}
          onChange={handleLoginChange}
        />
        <TextInput
          placeholder="Адреса електронної пошти"
          value={email}
          onChange={handleLoginChange}
        />
        <TextInput
          placeholder="Пароль"
          value={password}
          onChange={handleLoginChange}
        />
        <Text>Показати</Text>
      </View>
      <StatusBar style="auto" />
      <Button title="Зареєструватися" color="#FF7F50" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    // fontFamily: 'Roboto',
    fontStyle: "normal",
    fontWeight: 500,
    fontSize: 30,
    lineHeight: 35,
    textAlign: "center",
    letterSpacing: 0.01,
    color: "#212121",
  },
});
