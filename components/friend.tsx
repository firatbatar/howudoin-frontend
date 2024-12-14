import { View, Text, StyleSheet, Image } from 'react-native';
import { commonStyles } from '@/components/common/config';

type FriendProps = {
    name: string;
    lastName: string;
    avatar: string;
};

export function Friend({ name, lastName, avatar }: FriendProps) {
  return (
    <View style={styles.friend}>
      <Image
        style={commonStyles.image}
        source={require('../assets/images/react-logo.png')}
      />

      <View style={commonStyles.text}>
        <Text style={styles.name}>{name} {lastName}</Text>

        <View style={styles.info}>
          <Text>last message</Text>
          <Text>20:36</Text>
        </View>
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
