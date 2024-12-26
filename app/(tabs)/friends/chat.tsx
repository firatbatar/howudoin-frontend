import { ScrollView, View } from 'react-native';
import { useState, useCallback, useLayoutEffect, useRef, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useLocalSearchParams, useFocusEffect } from 'expo-router';
import { MessageBubble } from '@/components/messageBubble';
import { MessageInput } from '@/components/messageInput';
import { Message } from '@/components/common/types';
import Config from '@/components/common/config';

export default function FriendChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');

  const navigation = useNavigation();
  const scrollViewRef = useRef<ScrollView>(null);
  useEffect(() => {
    scrollViewRef.current?.scrollToEnd({ animated: false });
  }, []);

  const params = useLocalSearchParams<{ id: string; name: string }>();

  const fetchMessages = useCallback(() => {
    const requestOptions = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${Config.token}`,
      },
    };

    fetch(`${Config.API_URL}/messages?history=${params.id}`, requestOptions as RequestInit)
      .then((response) => response.json())
      .then((result) => {
        if (result.status !== 'SUCCESS') {
          console.error(result.message);
          return null;
        }
        result.data.reverse();
        setMessages(result.data);
      })
      .catch((error) => {
        // console.error(error);
      });
  }, [params]);

  function sendMessage() {
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Config.token}`,
      },
      body: JSON.stringify({
        receiver: params.id,
        content: newMessage,
      }),
    };

    fetch(`${Config.API_URL}/messages/send`, requestOptions as RequestInit)
      .then((response) => response.json())
      .then((result) => {
        if (result.status !== 'SUCCESS') {
          console.error(result.message);
          return null;
        }

        setNewMessage('');
        fetchMessages();
      });
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      title: params.name,
    });
  }, [navigation, params]);

  useFocusEffect(useCallback(() => {
    fetchMessages();

    const interval = setInterval(fetchMessages, 5000);

    return () => clearInterval(interval);
  }, [fetchMessages]));

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'space-between',
        paddingTop: 10,
      }}
    >
      <ScrollView
        ref={scrollViewRef}
        onContentSizeChange={() => {
          scrollViewRef.current?.scrollToEnd({ animated: true });
        }}
      >
        {messages.map(message => (
          <MessageBubble
            key={message.id}
            content={message.content}
            timestamp={new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            isOwnMessage={message.sender === Config.userEmail}
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
