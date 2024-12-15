import { View, Text, StyleSheet, Image } from 'react-native';
import { commonStyles, GroupObject, MessageObject } from '@/components/common/config';

type GroupProps = {
    group: GroupObject;
    lastMessage: MessageObject | null;
};

export function Group({ group, lastMessage }: GroupProps) {
  return (
    <View style={styles.group}>
      <Image
        style={commonStyles.image}
        source={require('../assets/images/react-logo.png')}
      />

      <View style={commonStyles.text}>
        <Text style={styles.name}>{group.name}</Text>

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
  group: {
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
