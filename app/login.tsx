import { useState } from "react";
import { Text, View, StyleSheet, Pressable, TextInput } from "react-native";
import Config from "./config"

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleLogin() {
    const requestOptions = {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(
        {
          email: email,
          password: password
        }
      ),
    }

    fetch(Config.API_URL + "/login", requestOptions)
      .then((response) => response.text())
      .then((result) => {
        console.log(result);
      })
      .catch((error) => console.error(error));
  }

  return (
    <View style={styles.container}>

      <Text style={styles.title}>Register</Text>

      <View 
        style={{
          justifyContent: "center",
          alignItems: "center"
        }}
      >
          <TextInput
            style={styles.input} 
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
          />
          <TextInput 
            style={styles.input}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={true}
          />

        <Pressable style={styles.btn} onPress={handleLogin}>
          <Text>Login</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  btn: {
    padding: 10,
    backgroundColor: "lightgreen",
    color: "black",
    
    borderWidth: 2,
    borderRadius: 5,
    margin: 10,

    textAlign: "center",
    alignItems: "center",

    width: 200,
  },
  input: {
    height: 50,
    width: 300,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
});