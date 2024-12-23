import { Pressable, Text, TextInput, View } from 'react-native';
import { useState } from 'react';
import Config from '@/components/common/config';
import { Style } from '@/components/common/styles';
import { useLocalSearchParams, useRouter } from 'expo-router';

export default function AddMember() {
  const [email, setEmail] = useState('');

  const params = useLocalSearchParams<
    {
      id: string
      name: string
    }
  >();

  const router = useRouter();

  function addMember() {
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Config.token}`,
      },
      body: JSON.stringify(
        {
          email: email,
        },
      ),
    };

    fetch(`${Config.API_URL}/groups/${params.id}/add-member`, requestOptions)
      .then((response) => (response.json()))
      .then((result) => {
        if (result.status === 'SUCCESS') {
          router.back();
        } else {
          console.error(result.message);
          alert(result.message);
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
      <Text style={Style.title} >Add Member to { params.name }</Text>
      <TextInput
        placeholder='Email'
        style={Style.input}
        value={email}
        onChangeText={setEmail}
      />
      <Pressable style={Style.btn} onPress={addMember}>
        <Text>Add</Text>
      </Pressable>
    </View>
  );
}
