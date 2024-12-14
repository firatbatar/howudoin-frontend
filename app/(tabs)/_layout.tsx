import { Tabs } from 'expo-router';
import React from 'react';
import { MaterialIcons } from '@expo/vector-icons';

export default function TabLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name='friends'
        options={{
          headerShown: false,
          tabBarIcon: () => <MaterialIcons name='person' size={24} />,
        }}
      />
      <Tabs.Screen
        name='groups'
        options={{
          headerShown: false,
          tabBarIcon: () => <MaterialIcons name='group' size={24} />,
        }}
      />
    </Tabs>
  );
}
