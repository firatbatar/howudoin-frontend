import { Text, View } from 'react-native';
import { Redirect } from 'expo-router';
import Config from '@/components/common/config';
import { commonStyles } from '@/components/common/config';

export default function Groups() {
  if (!Config.token) {
    return <Redirect href='/login' />;
  }

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Text style={commonStyles.title}>Groups</Text>
    </View>
  );
}
