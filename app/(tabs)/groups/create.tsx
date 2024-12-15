import { View, Text, TextInput, Pressable } from 'react-native';
import { commonStyles } from '@/components/common/config';
import { useCallback, useState } from 'react';
import { MultipleSelectList } from 'react-native-dropdown-select-list';
import Config from '@/components/common/config';
import { useFocusEffect } from '@react-navigation/native';
import { useRouter } from 'expo-router';

export default function GroupRequest() {
  const [groupName, setGroupName] = useState('');
  const [selectedFriends, setSelectedFriends] = useState<string[]>([]);
  const [friends, setFriends] = useState<any[]>([]);

  const router = useRouter();

  function handleCreateGroup() {
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Config.token}`,
      },
      body: JSON.stringify({
        name: groupName,
        members: selectedFriends,
      }),
    };

    fetch(`${Config.API_URL}/groups/create`, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        if (data.status !== 'SUCCESS') {
          console.error(data.message);
          return null;
        }

        setGroupName('');
        setSelectedFriends([]);

        router.back();
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

    fetch(`${Config.API_URL}/friends`, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        if (data.status !== 'SUCCESS') {
          console.error(data.message);
          return null;
        }

        setFriends([]);
        for (let i = 0; i < data.data.length; i++) {
          const friend = data.data[i];
          setFriends((friends) => [
            ...friends,
            {
              key: friend.email,
              value: `${friend.name} ${friend.lastname}`,
            },
          ]);
        }
      })
      .catch((error) => console.error(error));
  }

  useFocusEffect(useCallback(() => {
    getFriends();

    return () => {};
  }, []));

  return (
    <View
      style={{
        flex: 1,
        paddingTop: 50,
        alignItems: 'center',
      }}
    >
      <Text style={commonStyles.title}>Create A New Group</Text>

      <TextInput
        style={commonStyles.input}
        placeholder='Group Name'
        value={groupName}
        onChangeText={setGroupName}
      />

      <MultipleSelectList
        setSelected={(val: string[]) => setSelectedFriends(val)}
        data={friends}
        save="key"
        label='Members'
        placeholder='Select member to add'
        search={false}
        notFoundText='No friends found.'
      />

      <Pressable style={commonStyles.btn} onPress={handleCreateGroup}>
        <Text>Create</Text>
      </Pressable>
    </View>
  );
}
