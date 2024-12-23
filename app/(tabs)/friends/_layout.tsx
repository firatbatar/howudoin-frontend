import { MaterialIcons } from '@expo/vector-icons';
import { Stack, useRouter } from 'expo-router';
import React from 'react';
import { Pressable } from 'react-native';
import Config from '@/components/common/config';

export default function FriendsLayout() {
  const router = useRouter();

  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: 'Howudoin - Friends',
          headerRight: () => (
            <Pressable
              onPress={() => {
                Config.token = '';
                router.replace('/');
              }}
            >
              <MaterialIcons name="logout" size={24} color="black" />
            </Pressable>
          ),
        }}
      />
      <Stack.Screen
        name="requests"
        options={{
          title: 'Friend Requests',
        }}
      />
      <Stack.Screen
        name="chat"
        options={({ route }) => ({
          title: route.params?.title,
        })}
      />
    </Stack>
  );
}