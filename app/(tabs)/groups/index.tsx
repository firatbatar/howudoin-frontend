import { StyleSheet, ScrollView, Pressable, View, Text } from 'react-native';
import { Redirect, useFocusEffect, Link } from 'expo-router';
import { useCallback, useState } from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import Config, { commonStyles, GroupObject, MessageObject } from '@/components/common/config';
import { Group } from '@/components/group';

export default function Groups() {
  const [groups, setGroups] = useState<GroupObject[]>([]);

  function getLastMessage(id: string) {
    const requestOptions = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${Config.token}`,
      },
    };

    fetch(`${Config.API_URL}/messages?historyId=${id}`, requestOptions)
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

        // if (message.sender !== email) {
        //   message.sender = 'me';
        // }

        const lastMessage = {
          sender: message.sender,
          message: message.content,
          timestamp: message.timestamp,
        } as MessageObject;

        setGroups(groups => groups.map((group) => {
          if (group.id === id) {
            group.lastMessage = lastMessage;
          }
          return group;
        }));
      })
      .catch((error) => console.error(error));
  }

  function getGroups() {
    const requestOptions = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${Config.token}`,
      },
    };

    fetch(`${Config.API_URL}/groups`, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        if (data.status !== 'SUCCESS') {
          console.error(data.message);
          return null;
        }

        setGroups([]);
        for (let i = 0; i < data.data.length; i++) {
          const group = data.data[i];
          setGroups(groups => [...groups, {
            id: group.id,
            name: group.name,
            avatar: '',
            lastMessage: null,
          }]);
        }
      })
      .catch((error) => console.error(error));
  }

  useFocusEffect(useCallback(() => {
    getGroups();

    groups.forEach((group) => {
      getLastMessage(group.id);
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
        {groups.length === 0 && (
          <Text
            style={{
              textAlign: 'center',
              marginTop: 20,
              fontSize: 18,
            }}
          >
            No groups to chat.
          </Text>
        )}

        {groups.map((group) => (
          <Pressable key={group.id} onPress={() => {}}>
            <Group
              group={group}
            />
          </Pressable>
        ))}
      </ScrollView>

      <Link
        href='/(tabs)/groups/create'
        asChild
        style={[styles.float, commonStyles.btn, {width: 'auto'}]}
      >
        <MaterialIcons
          name='group-add'
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
