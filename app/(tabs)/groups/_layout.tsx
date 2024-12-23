import { Stack } from 'expo-router';
import React from 'react';

export default function GroupsLayout() {
  return (
    <Stack>
      <Stack.Screen
        name='index'
        options={{
          title: 'Howudoin - Groups',
        }}
      />
      <Stack.Screen
        name='create'
        options={{
          title: 'Create Group',
        }}
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
