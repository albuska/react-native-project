// import { StyleSheet, Text, View, TextInput, Button } from "react-native";
// import { StatusBar } from "expo-status-bar";
// import React, { useState } from "react";

// const RegistrationScreen = () => {
//   const [login, setLogin] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const handleLoginChange = (login) => setLogin(login);
//   const handleEmailChange = (email) => setLogin(email);
//   const handlePasswordChange = (password) => setLogin(password);

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Реєстрація</Text>
//       <StatusBar style="auto" />
//       <View>
//         <TextInput
//           name="login"
//           placeholder="Логін"
//           value={login}
//           onChange={handleLoginChange}
//         />
//         <TextInput
//           name="email"
//           placeholder="Адреса електронної пошти"
//           value={email}
//           onChange={handleEmailChange}
//         />
//         <TextInput
//           name="password"
//           placeholder="Пароль"
//           value={password}
//           onChange={handlePasswordChange}
//         />
//         <Text>Показати</Text>
//       </View>
//       <StatusBar style="auto" />
//       <Button title="Зареєструватися" color="#FF7F50" />
//       <Text>Уже є аккаунт? Ввійти</Text>
//     </View>
//   );
// };

// export default RegistrationScreen;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   title: {
//     // fontFamily: 'Roboto',
//     fontStyle: "normal",
//     fontWeight: 500,
//     fontSize: 30,
//     lineHeight: 35,
//     textAlign: "center",
//     letterSpacing: 0.01,
//     color: "#212121",
//   },
// });
