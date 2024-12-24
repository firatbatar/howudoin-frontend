import { StyleSheet, ScrollView, Pressable, View, Text } from 'react-native';
import { Redirect, useFocusEffect, Link, useRouter } from 'expo-router';
import { Friend } from '@/components/friend';
import { useCallback, useState } from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import Config from '@/components/common/config';
import { Style } from '@/components/common/styles';
import { FriendObject } from '@/components/common/types';

export default function Friends() {
  const [friends, setFriends] = useState<FriendObject[]>([]);

  const router = useRouter();

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
          }]);
        }
      })
      .catch((error) => console.error(error));
  }

  useFocusEffect(useCallback(() => {
    getFriends();

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
          <Pressable
            key={friend.email}
            onPress={() => {
              router.push(`/(tabs)/friends/chat?id=${friend.email}&name=${friend.name + ' ' + friend.lastName}`);
            }}
          >
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
        style={[styles.float, Style.btn, {width: 'auto'}]}
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
