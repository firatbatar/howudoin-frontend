import { View, Text, StyleSheet, Image } from 'react-native';
import { commonStyles, GroupObject } from '@/components/common/config';

type GroupProps = {
    group: GroupObject;
};

export function Group({ group }: GroupProps) {
  return (
    <View style={styles.group}>
      <Image
        style={commonStyles.image}
        source={require('../assets/images/react-logo.png')}
      />

      <View style={commonStyles.text}>
        <Text style={styles.name}>{group.name}</Text>

        {group.lastMessage && (
          <View style={styles.info}>
            <Text>
              {group.lastMessage.sender === 'me' ? `you: ${group.lastMessage.message}` : group.lastMessage.message}
            </Text>
            <Text>
              {new Date(group.lastMessage.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
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
