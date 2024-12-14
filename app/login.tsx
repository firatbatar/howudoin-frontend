import { useState } from 'react';
import { Text, View, Pressable, TextInput } from 'react-native';
import { useRouter, Link } from 'expo-router';
import Config from '@/components/common/config';
import { commonStyles } from '@/components/common/config';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const router = useRouter();

  function handleLogin() {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(
        {
          email: email,
          password: password,
        },
      ),
    };

    fetch(Config.API_URL + '/login', requestOptions)
      .then((response) => (response.text()))
      .then((result) => {
        try {
          const data = JSON.parse(result);
          Config.token = data.token;
          router.replace('/');
        } catch (error) {
          console.error(error);
          alert('Invalid email or password');
          return;
        }
      })
      .catch((error) => console.error(error));
  }

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Text style={commonStyles.title}>Login</Text>

        <TextInput
          style={commonStyles.input}
          placeholder='Email'
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={commonStyles.input}
          placeholder='Password'
          value={password}
          onChangeText={setPassword}
          secureTextEntry={true}
        />

        <Pressable style={commonStyles.btn} onPress={handleLogin}>
          <Text>Login</Text>
        </Pressable>
      </View>

      <Text style={{margin: 10, textAlign: 'center'}}>
        Not signed up yet? Register <Link style={commonStyles.link} href='/register'><Text>here</Text></Link>!
      </Text>
    </View>
  );
}
