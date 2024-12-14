import { StyleSheet, ScrollView, Pressable, View } from 'react-native';
import { Redirect, useFocusEffect, Link } from 'expo-router';
import { Friend } from '@/components/friend';
import { useCallback, useState } from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import Config, { commonStyles } from '@/components/common/config';

type FriendObject = {
  email: string;
  name: string;
  lastName: string;
  avatar: string;
};

export default function Friends() {
  const [friends, setFriends] = useState<FriendObject[]>([]);

  function getFriends() {
    const getFriendsRequestOptions = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${Config.token}`,
      },
    };

    fetch(`${Config.API_URL}/friends`, getFriendsRequestOptions)
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
    getFriends();return () => {};
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
        {friends.map((friend) => (
          <Pressable key={friend.email} onPress={() => {}}>
            <Friend
              key={friend.email}
              name={friend.name}
              lastName={friend.lastName}
              avatar={friend.avatar}
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
