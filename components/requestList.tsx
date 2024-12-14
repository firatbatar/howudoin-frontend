import { Pressable, Text, ScrollView, View } from 'react-native';
import { Friend } from '@/components/friend';
import { commonStyles } from '@/components/common/config';

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
        <Text style={commonStyles.title}>Requests</Text>
        <Text>You don't have any pending friend requests.</Text>
      </View>
    );
  }

  return (
    <ScrollView>
      <Text style={commonStyles.title}>Requests</Text>

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

      <Pressable style={commonStyles.btn} onPress={acceptFriendRequest}>
        <Text>Accept</Text>
      </Pressable>
    </ScrollView>
  );
}
