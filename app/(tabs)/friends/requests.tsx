import { Pressable, Text, TextInput, View, StyleSheet } from 'react-native';
import { useState, useCallback } from 'react';
import Config from '@/components/common/config';
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
    <View style={styles.container}>

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
        <Text style={styles.title} >Add Friend</Text>
        <TextInput
          placeholder='Email'
          style={styles.input}
          value={email}
          onChangeText={setEmail}
        />
        <Pressable style={styles.btn} onPress={sendFriendRequest}>
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

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    gap: 10,
    height: '100%',
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
});
