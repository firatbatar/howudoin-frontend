import { View, Text, StyleSheet, Image } from 'react-native';
import { GroupObject } from '@/components/common/types';
import { Style } from '@/components/common/styles';

type GroupProps = {
    group: GroupObject;
};

export function Group({ group }: GroupProps) {
  return (
    <View style={styles.group}>
      <Image
        style={Style.image}
        source={require('../assets/images/react-logo.png')}
      />

      <View style={Style.text}>
        <Text style={styles.name}>{group.name}</Text>
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
