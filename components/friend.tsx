import { View, Text, StyleSheet, Image } from 'react-native';

type FriendProps = {
    name: string;
    lastName: string;
    avatar: string;
};

export function Friend({ name, lastName, avatar }: FriendProps) {
  return (
    <View style={styles.friend}>
      <Image
        style={styles.image}
        source={require('../assets/images/react-logo.png')}
      />

      <View style={styles.text}>
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
  image: {
    width: 50,
    height: 50,
    margin: 10,
    borderRadius: 50,
  },
  text: {
    flexDirection: 'column',
    height: 70,
    justifyContent: 'space-around',
    flex: 1,
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
