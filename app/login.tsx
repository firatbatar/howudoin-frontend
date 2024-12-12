import { useState } from "react";
import { Text, View, StyleSheet, Pressable, TextInput } from "react-native";
import { useRouter, Link } from "expo-router";
import Config from "./config"

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

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
      .then((response) => (response.text()))
      .then((result) => {
        try {
          const data = JSON.parse(result);
          Config.token = data.token;
          router.replace("/");
        } catch (error) {
          console.error(error);
          alert("Invalid email or password");
          return;
        }
      })
      .catch((error) => console.error(error));
  }

  return (
    <View style={styles.container}>
      <View 
        style={{
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <Text style={styles.title}>Login</Text>

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

        <Text style={{margin: 10}}>
          Not signed up yet? Register <Link style={styles.link} href="/register"><Text>here</Text></Link>!
        </Text>
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
  link: {
    color: "blue",
  },
});