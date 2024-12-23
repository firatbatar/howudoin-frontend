import { View, Text, StyleSheet, Image, Pressable } from 'react-native';
import { commonStyles, GroupObject } from '@/components/common/config';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

type GroupProps = {
    group: GroupObject;
};

export function Group({ group }: GroupProps) {
  const router = useRouter();

  return (
    <View style={styles.group}>
      <Image
        style={commonStyles.image}
        source={require('../assets/images/react-logo.png')}
      />

      <View style={commonStyles.text}>
        <Text style={styles.name}>{group.name}</Text>
      </View>

      <Pressable
        style={{
          marginEnd: 15,
        }}
        onPress={() => {
          router.push(`/(tabs)/groups/group_details?id=${group.id}&name=${group.name}`);
        }}
      >
        <MaterialIcons name="info" size={24} color="black" />
      </Pressable>
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
