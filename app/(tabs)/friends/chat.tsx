import { ScrollView, View } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { MessageBubble, MessageInput, Message } from '@/components/messages';
import { useLocalSearchParams } from 'expo-router';

export default function FriendChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');

  const navigation = useNavigation();
  const route = useRoute();

  const params = useLocalSearchParams<{ id: string; name: string }>();

  function fetchMessages() {

  }

  function sendMessage() {

  }

  useEffect(() => {
    // navigation.setOptions({ title: params.name });

    fetchMessages();

    const interval = setInterval(fetchMessages, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <View>
      <ScrollView>
        {messages.map(message => (
          <MessageBubble
            key={message.id}
            content={message.content}
            timestamp={new Date(message.timestamp).toLocaleTimeString()}
            isOwnMessage={true}
          />
        ))}
      </ScrollView>

      <MessageInput
        value={newMessage}
        onChangeText={setNewMessage}
        onSend={sendMessage}
      />
    </View>
  );
}
