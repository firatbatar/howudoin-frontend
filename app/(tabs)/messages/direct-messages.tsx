import React, { useState, useEffect } from 'react';
import {
  View,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { MessageBubble, MessageInput, Message } from '@/components/messages';

export default function DirectMessageScreen() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [userId, setUserId] = useState<string | null>(null);
  const navigation = useNavigation();
  const route = useRoute();
  const { friendId, friendName } = route.params as { friendId: string; friendName: string };

  useEffect(() => {
    navigation.setOptions({ title: friendName });
    loadUserId();
    fetchMessages();
    const interval = setInterval(fetchMessages, 5000);
    return () => clearInterval(interval);
  }, []);


  const fetchMessages = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      const response = await fetch(`YOUR_API_URL/messages?friendId=${friendId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setMessages(data);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

 

    try {
      const response = await fetch('YOUR_API_URL/messages/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          receiverId: friendId,
          content: newMessage,
        }),
      });

      if (response.ok) {
        setNewMessage('');
        fetchMessages();
      }
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <FlatList
        data={messages}
        renderItem={({ item }) => (
          <MessageBubble
            content={item.content}
            timestamp={new Date(item.timestamp).toLocaleTimeString()}
            isOwnMessage={item.senderId === userId}
          />
        )}
        keyExtractor={item => item.id}
        inverted
      />
      <MessageInput
        value={newMessage}
        onChangeText={setNewMessage}
        onSend={sendMessage}
      />
    </KeyboardAvoidingView>
  );
}