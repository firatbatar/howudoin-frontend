import { StyleSheet, ScrollView, Pressable, View, Text } from 'react-native';
import { Redirect, useFocusEffect, Link } from 'expo-router';
import { Friend } from '@/components/friend';
import { useCallback, useState } from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import Config, { commonStyles, FriendObject, MessageObject } from '@/components/common/config';

export default function Friends() {
  const [friends, setFriends] = useState<FriendObject[]>([]);

  function getLastMessage(email: string) {
    const requestOptions = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${Config.token}`,
      },
    };

    fetch(`${Config.API_URL}/messages?historyId=${email}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.status !== 'SUCCESS') {
          console.error(result.message);
          return null;
        }

        result.data = result.data || [];

        if (result.data.length === 0) {
          return null;
        }

        let message = result.data[0];

        if (message.sender !== email) {
          message.sender = 'me';
        }

        const lastMessage = {
          sender: message.sender,
          message: message.content,
          timestamp: message.timestamp,
        } as MessageObject;

        setFriends(friends => friends.map((friend) => {
          if (friend.email === email) {
            friend.lastMessage = lastMessage;
          }
          return friend;
        }));
      })
      .catch((error) => console.error(error));
  }

  function getFriends() {
    const requestOptions = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${Config.token}`,
      },
    };

    fetch(`${Config.API_URL}/friends`, requestOptions as RequestInit)
      .then((response) => response.json())
      .then((data) => {
        if (data.status !== 'SUCCESS') {
          console.error(data.message);
          return null;
        }

        setFriends([]);
        for (let i = 0; i < data.data.length; i++) {
          const friend = data.data[i];
          setFriends(friends => [...friends, {
            email: friend.email,
            name: friend.name,
            lastName: friend.lastname,
            avatar: '',
            lastMessage: null,
          }]);
        }
      })
      .catch((error) => console.error(error));
  }

  useFocusEffect(useCallback(() => {
    getFriends();

    friends.forEach((friend) => {
      getLastMessage(friend.email);
    });

    return () => {};
  }, []));

  if (!Config.token) {
    return <Redirect href='/login' />;
  }

  return (
    <View>
      <ScrollView
        style={{
          flexDirection: 'column',
          gap: 10,
          height: '100%',
        }}
      >
        {friends.length === 0 && (
          <Text
            style={{
              textAlign: 'center',
              marginTop: 20,
              fontSize: 18,
            }}
          >
            No friends to chat.
          </Text>
        )}

        {friends.map((friend) => (
          <Pressable key={friend.email} onPress={() => {}}>
            <Friend
              friend={friend}
              showEmail={false}
            />
          </Pressable>
        ))}
      </ScrollView>

      <Link
        href='/(tabs)/friends/requests'
        asChild
        style={[styles.float, commonStyles.btn, {width: 'auto'}]}
      >
        <MaterialIcons
          name='person-add'
          size={28}
          color='black'
        />
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  float: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    margin: 10,
  },
});
