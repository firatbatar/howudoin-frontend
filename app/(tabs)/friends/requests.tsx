import { Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import { useState, useCallback } from 'react';
import Config from '@/components/common/config';
import { Style } from '@/components/common/styles';
import { FriendObject } from '@/components/common/types';
import { useFocusEffect, useRouter } from 'expo-router';
import { Friend } from '@/components/friend';

export default function FriendRequest() {
  const [email, setEmail] = useState('');
  const [friendRequests, setFriendRequests] = useState<FriendObject[]>([]);

  const router = useRouter();

  function getFriendRequests() {
    const getFriendRequestsRequestOptions = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${Config.token}`,
      },
    };

    fetch(`${Config.API_URL}/friends/requests`, getFriendRequestsRequestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.status !== 'SUCCESS') {
          console.error(result.message);
          return null;
        }

        result.data = result.data || [];

        setFriendRequests([]);
        for (let i = 0; i < result.data.length; i++) {
          const friend = result.data[i];
          setFriendRequests(friendRequests => [...friendRequests, {
            email: friend.email,
            name: friend.name,
            lastName: friend.lastname,
            avatar: '',
          }]);
        }
      })
      .catch((error) => {
        // console.error(error);
      });
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
      .catch((error) => {
        // console.error(error);
      });

    router.replace('/(tabs)/friends/requests');
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
      .catch((error) => {
        // console.error(error);
      });
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
        <Text style={Style.title} >Add Friend</Text>
        <TextInput
          placeholder='Email'
          style={Style.input}
          value={email}
          onChangeText={setEmail}
        />
        <Pressable style={Style.btn} onPress={sendFriendRequest}>
          <Text>Send</Text>
        </Pressable>
      </View>


      <View style={{ flex: 1 }}>
        <Text style={Style.title}>Requests</Text>

        {friendRequests.length === 0 &&
          <Text style={{ textAlign:'center' }}>
            You don't have any pending friend requests.
          </Text>}

        {friendRequests.length > 0 && (
          <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            {
              friendRequests.map((friend) => (
                <View key={friend.email}>
                  <Friend
                    friend={friend}
                    showEmail={true}
                  />
                </View>
              ))
            }
          </ScrollView>
        )}

        {friendRequests.length > 0 && (
          <Pressable
            onPress={acceptFriendRequest}
            style={[
              Style.btn,
              { marginStart: 'auto', marginEnd: 'auto'},
            ]}
          >
            <Text>Accept</Text>
          </Pressable>
        )}
      </View>
    </View>
  );
}
