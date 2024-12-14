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
            name='requests'
            options={{
              title: 'Group Requests',
            }}
        />
    </Stack>
  )
}
