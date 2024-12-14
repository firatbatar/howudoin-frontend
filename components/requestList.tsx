import { Pressable, Text, ScrollView, StyleSheet, View } from 'react-native';
import { Friend } from '@/components/friend';

type FriendObject = {
  email: string;
  name: string;
  lastName: string;
  avatar: string;
};

type RequestListProps = {
    requests: FriendObject[];
    acceptFriendRequest: () => void;
};

export function RequestList({ requests, acceptFriendRequest }: RequestListProps) {
  if (requests.length === 0) {
    return (
      <View>
        <Text style={styles.title}>Requests</Text>
        <Text>You don't have any pending friend requests.</Text>
      </View>
    );
  }

  return (
    <ScrollView>
      <Text style={styles.title}>Requests</Text>

      {
        requests.map((friend) => (
          <Friend
            key={friend.email}
            name={friend.name}
            lastName={friend.lastName}
            avatar={friend.avatar}
          />
        ))
      }

      <Pressable style={styles.btn} onPress={acceptFriendRequest}>
        <Text>Accept</Text>
      </Pressable>
    </ScrollView>
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
