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

interface GroupMessage extends Message {
  senderName: string;
}

export default function GroupChat() {
  const [messages, setMessages] = useState<GroupMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [userId, setUserId] = useState<string | null>(null);
  const navigation = useNavigation();
  const route = useRoute();
  const { groupId, groupName } = route.params as { groupId: string; groupName: string };

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
});