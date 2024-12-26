import { useState } from 'react';
import { Text, View, Pressable, TextInput } from 'react-native';
import { router } from 'expo-router';
import Config from '@/components/common/config';
import { Style } from '@/components/common/styles';

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
      .then((response) => (response.json()))
      .then((result) => {
        if (result.status !== 'SUCCESS') {
          alert(result.message);
          return;
        }

        const user = result.data;

        alert(`User ${user.name} ${user.lastname} registered successfully`);

        router.replace('/');
      })
      .catch((error) => {
        // console.error(error);
      });
  }

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Text style={Style.title}>Register</Text>

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
            style={[Style.input, {width: 145}]}
            placeholder='Name'
            value={name}
            onChangeText={setName}
          />
          <TextInput
            style={[Style.input, {width: 145}]}
            placeholder='Last Name'
            value={lastName}
            onChangeText={setLastName}
          />
        </View>

        <TextInput
          style={Style.input}
          placeholder='Email'
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={Style.input}
          placeholder='Password'
          value={password}
          onChangeText={setPassword}
          secureTextEntry={true}
        />

        <Pressable style={Style.btn} onPress={handleRegister}>
          <Text>Register</Text>
        </Pressable>
      </View>
    </View>
  );
}
