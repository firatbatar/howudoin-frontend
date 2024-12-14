import { Pressable, Text, TextInput, View } from 'react-native';
import { useState, useCallback } from 'react';
import Config, { commonStyles } from '@/components/common/config';
import { useFocusEffect } from 'expo-router';
import { RequestList } from '@/components/requestList';

type FriendObject = {
  email: string;
  name: string;
  lastName: string;
  avatar: string;
};

export default function FriendRequest() {
  const [email, setEmail] = useState('');
  const [friendRequests, setFriendRequests] = useState<FriendObject[]>([]);

  function getFriendRequests() {
    const getFriendRequestsRequestOptions = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${Config.token}`,
      },
    };

    fetch(`${Config.API_URL}/friends/requests`, getFriendRequestsRequestOptions)
      .then((response) => response.json())
      .then((data) => {
        if (data.status !== 'SUCCESS') {
          console.error(data.message);
          return null;
        }

        setFriendRequests([]);
        for (let i = 0; i < data.data.length; i++) {
          const friend = data.data[i];
          setFriendRequests(friendRequests => [...friendRequests, {
            email: friend.email,
            name: friend.name,
            lastName: friend.lastname,
            avatar: '',
          }]);
        }
      })
      .catch((error) => console.error(error));
  }

  function acceptFriendRequest() {
    const requestOptions = {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${Config.token}`,
      },
    };

    fetch(`${Config.API_URL}/friends/accept`, requestOptions)
      .then((response) => (response.json()))
      .then((result) => {
        if (result.status === 'SUCCESS') {
          alert(result.message);
        } else {
          console.error(result.message);
          alert(result.message);
        }
      })
      .catch((error) => console.error(error));
  }

  function sendFriendRequest() {
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

    fetch(`${Config.API_URL}/friends/add`, requestOptions)
      .then((response) => (response.json()))
      .then((result) => {
        if (result.status === 'SUCCESS') {
          alert(result.message);
          setEmail('');
        } else {
          console.error(result.message);
          alert(result.message);
        }
      })
      .catch((error) => console.error(error));
  }

  useFocusEffect(useCallback(() => {
    getFriendRequests();

    return () => {};
  }, []));

  return (
    <View
      style={{
        flexDirection: 'column',
        gap: 10,
        height: '100%',
      }}
    >
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          borderBottomWidth: 1,
          borderBottomColor: '#ccc',
          paddingBottom: 20,
          marginTop: 20,
        }}
      >
        <Text style={commonStyles.title} >Add Friend</Text>
        <TextInput
          placeholder='Email'
          style={commonStyles.input}
          value={email}
          onChangeText={setEmail}
        />
        <Pressable style={commonStyles.btn} onPress={sendFriendRequest}>
          <Text>Send</Text>
        </Pressable>
      </View>


      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          paddingBottom: 20,
          marginTop: 20,
        }}
      >
        <RequestList
          requests={friendRequests}
          acceptFriendRequest={acceptFriendRequest}
        />
      </View>
    </View>
  );
}
