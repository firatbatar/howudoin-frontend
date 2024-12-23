import { View, Text, StyleSheet, Image } from 'react-native';
import { FriendObject } from '@/components/common/types';
import { Style } from '@/components/common/styles';

type FriendProps = {
    friend: FriendObject;
    showEmail: boolean;
};

export function Friend({ friend, showEmail }: FriendProps) {
  return (
    <View style={styles.friend}>
      <Image
        style={[Style.image, styles.image]}
        source={require('../assets/images/react-logo.png')}
      />

      <View style={Style.text}>
        <Text style={styles.name}>{friend.name} {friend.lastName}</Text>

        {showEmail && (
          <Text style={{ fontSize: 12 }}>{friend.email}</Text>
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
  image: {
    borderWidth: 1,
  },
});
