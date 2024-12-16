import { View, Text, StyleSheet, Image } from 'react-native';
import { commonStyles, FriendObject } from '@/components/common/config';

type FriendProps = {
    friend: FriendObject;
    showEmail: boolean;
};

export function Friend({ friend, showEmail }: FriendProps) {
  return (
    <View style={styles.friend}>
      <Image
        style={commonStyles.image}
        source={require('../assets/images/react-logo.png')}
      />

      <View style={commonStyles.text}>
        <Text style={styles.name}>{friend.name} {friend.lastName}</Text>

        {showEmail && (
          <Text style={{ fontSize: 12 }}>{friend.email}</Text>
        )}

        {friend.lastMessage && (
          <View style={styles.info}>
            <Text>
              {friend.lastMessage.sender === 'me' ? `you: ${friend.lastMessage.message}` : friend.lastMessage.message}
            </Text>
            <Text>
              {new Date(friend.lastMessage.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </Text>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  friend: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    margin: 10,
  },
  name: {
    fontSize: 20,
  },
  info: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginStart: 10,
    marginEnd: 20,
  },
});
