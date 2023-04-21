import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View , TextInput} from 'react-native';
import React, {useState} from 'react';

export default function App() {
  const[login, setLogin] = useState('');

const handleLoginChange = (login) => {
  setLogin(login); 
}
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Реєстрація</Text>
      <View>
        <TextInput placeholder='Введіть свій логін' value={login} onChange={handleLoginChange} />
         <TextInput placeholder='Введіть адресу електронної пошти' value={login} onChange={handleLoginChange}/>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    // fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 500,
    fontSize: 30, 
    lineHeight: 35, 
    textAlign: 'center', 
    letterSpacing: 0.01,  
    color: '#212121',
  }
});


