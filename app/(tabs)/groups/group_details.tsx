import { useLocalSearchParams, Link } from 'expo-router';
import { View, Text, ScrollView, StyleSheet, Image } from 'react-native';
import Config from '@/components/common/config';
import { useState } from 'react';
import { FriendObject, commonStyles } from '@/components/common/config';
import { Friend } from '@/components/friend';
import { MaterialIcons } from '@expo/vector-icons';


export default function GroupDetails() {
  const [members, setMembers] = useState<FriendObject[]>([]);

  function getGroupMembers(id: string) {
    const requestOptions = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${Config.token}`,
      },
    };

    fetch(`${Config.API_URL}/groups/${id}/members`, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        if (data.status !== 'SUCCESS') {
          console.error(data.message);
          return null;
        }

        setMembers([]);
        for (let i = 0; i < data.data.length; i++) {
          const member = data.data[i];
          setMembers(members => [...members, {
            email: member.email,
            name: member.name,
            lastName: member.lastname,
            avatar: '',
          }]);
        }
      })
      .catch((error) => console.error);
  }

  const params = useLocalSearchParams<
    {
      id: string
      name: string
    }
  >();

  getGroupMembers(params.id);

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <Image
        style={styles.image}
        source={require('../../../assets/images/react-logo.png')}
      />

      <Text
        style={[
          commonStyles.title,
          { marginTop: 5 },
        ]}
      >
        { params.name }
      </Text>

      <ScrollView>
        <Text style={styles.subtitle}>
          Members:
        </Text>

        {members.map((member) => (
          <Friend
            key={member.email}
            friend={member}
            showEmail={true}
          />
        ))}
      </ScrollView>

      <Link
        href={`/(tabs)/groups/add_member?id=${params.id}&name=${params.name}`}
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
  image: {
    width: 80,
    height: 80,
    margin: 'auto',
    marginTop: 20,
    borderRadius: 50,
    borderWidth: 2,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 20,
    marginRight: 20,
    marginTop: 20,
    borderBottomWidth: 1,
  },
});
