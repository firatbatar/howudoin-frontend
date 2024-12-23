import { Stack, useRouter } from 'expo-router';
import React from 'react';
import { Pressable } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import Config from '@/components/common/config';

export default function GroupsLayout() {
  const router = useRouter();

  return (
    <Stack>
      <Stack.Screen
        name='index'
        options={{
          title: 'Howudoin - Groups',
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
        name='create'
        options={{
          title: 'Create Group',
        }}
      />
      <Stack.Screen
        name='chat'
        options={({ route }) => ({
          title: route.params?.title,
        })}
      />
      <Stack.Screen
        name='group_details'
        options={{
          title: 'Group Details',
        }}
      />
      <Stack.Screen
        name='add_member'
        options={{
          title: 'Add Member',
        }}
      />
    </Stack>
  );
}
