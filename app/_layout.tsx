import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen
        name='(tabs)'
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name='index'
        options={{ title: 'Howudoin' }}
      />
      <Stack.Screen
        name='login'
        options={{ title: 'Howudoin - Login' }}
      />
      <Stack.Screen
        name='register'
        options={{ title: 'Howudoin - Register' }}
      />
    </Stack>
  );
}
