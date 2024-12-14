import { Redirect } from 'expo-router';
import Config from '@/app/config';

export default function Index() {
  if (!Config.token) {
    return <Redirect href='/login' />;
  }

  return <Redirect href='/(tabs)/friends' />;
}
