import { View, Text, StyleSheet, Image } from 'react-native';
import { commonStyles, FriendObject, MessageObject } from '@/components/common/config';

type FriendProps = {
    friend: FriendObject;
    lastMessage: MessageObject | null;
    showEmail: boolean;
};

export function Friend({ friend, lastMessage, showEmail }: FriendProps) {
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

        {lastMessage && (
          <View style={styles.info}>
            <Text>
              {lastMessage.sender === 'me' ? `you: ${lastMessage.message}` : lastMessage.message}
            </Text>
            <Text>
              {new Date(lastMessage.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
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
