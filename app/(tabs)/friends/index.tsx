import { StyleSheet, ScrollView, Pressable, View } from 'react-native';
import { Redirect, useFocusEffect, Link } from 'expo-router';
import { Friend } from '@/components/friend';
import { useCallback, useState } from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import Config from '@/components/common/config';

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
      <ScrollView style={styles.container}>
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
        style={[styles.float, styles.btn, {width: 'auto'}]}
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
  container: {
    flexDirection: 'column',
    gap: 10,
    height: '100%',
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
  float: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    margin: 10,
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  link: {
    color: 'blue',
  },
});
