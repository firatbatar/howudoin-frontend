import { useState } from 'react';
import { Text, View, StyleSheet, Pressable, TextInput } from 'react-native';
import { router } from 'expo-router';
import Config from '@/components/common/config';

export default function Register() {
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleRegister() {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(
        {
          email: email,
          name: name,
          lastname: lastName,
          password: password,
        },
      ),
    };

    fetch(Config.API_URL + '/register', requestOptions)
      .then((response) => response.text())
      .then((result) => {
        try {
          const data = JSON.parse(result);
          alert(`User ${data.name} ${data.lastname} registered successfully`);
          router.replace('/');
        } catch (error) {
          console.error(error);
          alert(`Error: ${error}`);
          return;
        }
      })
      .catch((error) => console.error(error));
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>

      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 10,
          }}
        >
          <TextInput
            style={[styles.input, {width: 145}]}
            placeholder='Name'
            value={name}
            onChangeText={setName}
          />
          <TextInput
            style={[styles.input, {width: 145}]}
            placeholder='Last Name'
            value={lastName}
            onChangeText={setLastName}
          />
        </View>

        <TextInput
          style={styles.input}
          placeholder='Email'
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder='Password'
          value={password}
          onChangeText={setPassword}
          secureTextEntry={true}
        />

        <Pressable style={styles.btn} onPress={handleRegister}>
          <Text>Register</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btn: {
    padding: 10,
    backgroundColor: 'lightgreen',
    color: 'black',

    borderWidth: 2,
    borderRadius: 5,
    margin: 10,

    textAlign: 'center',
    alignItems: 'center',

    width: 200,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
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
});
