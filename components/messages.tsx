import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Colours } from './common/styles';
import { MaterialIcons } from '@expo/vector-icons';

export interface Message {
  id: string;
  content: string;
  senderId: string;
  receiverId?: string;
  groupId?: string;
  senderName?: string;
  timestamp: string;
  status: 'sent' | 'delivered' | 'read';
}

interface MessageBubbleProps {
  content: string;
  timestamp: string;
  isOwnMessage: boolean;
  senderName?: string;
  status?: 'sent' | 'delivered' | 'read';
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({
  content,
  timestamp,
  isOwnMessage,
  senderName,
  status,
}) => (
  <View style={styles.messageWrapper}>
    {senderName && <Text style={styles.senderName}>{senderName}</Text>}
    <View style={[
      styles.messageBubble,
      isOwnMessage ? styles.ownMessage : styles.otherMessage,
    ]}>
      <Text style={[
        styles.messageText,
        isOwnMessage ? styles.ownMessageText : styles.otherMessageText,
      ]}>
        {content}
      </Text>
      <View style={styles.messageFooter}>
        <Text style={styles.timestamp}>{timestamp}</Text>
        {isOwnMessage && status && (
          <View style={styles.statusContainer}>
            {status === 'sent' && (
              <MaterialIcons name="check" size={14} color={Colours.gray} />
            )}
            {status === 'delivered' && (
              <MaterialIcons name="done-all" size={14} color={Colours.gray} />
            )}
            {status === 'read' && (
              <MaterialIcons name="done-all" size={14} color={Colours.blue} />
            )}
          </View>
        )}
      </View>
    </View>
  </View>
);

interface MessageInputProps {
  value: string;
  onChangeText: (text: string) => void;
  onSend: () => void;
}

export const MessageInput: React.FC<MessageInputProps> = ({
  value,
  onChangeText,
  onSend,
}) => (
  <View style={styles.inputContainer}>
    <TextInput
      style={styles.input}
      value={value}
      onChangeText={onChangeText}
      placeholder="Type a message..."
      multiline
    />
    <TouchableOpacity
      style={[styles.sendButton, !value.trim() && styles.sendButtonDisabled]}
      onPress={onSend}
      disabled={!value.trim()}
    >
      <MaterialIcons name="send" size={24} color={Colours.white} />
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  messageWrapper: {
    marginVertical: 5,
    marginHorizontal: 10,
  },
  messageBubble: {
    padding: 10,
    maxWidth: '80%',
    borderRadius: 15,
  },
  ownMessage: {
    backgroundColor: Colours.primary,
    alignSelf: 'flex-end',
  },
  otherMessage: {
    backgroundColor: Colours.lightGray,
    alignSelf: 'flex-start',
  },
  messageText: {
    fontSize: 16,
  },
  ownMessageText: {
    color: Colours.white,
  },
  otherMessageText: {
    color: Colours.black,
  },
  senderName: {
    fontSize: 12,
    color: Colours.gray,
    marginBottom: 2,
    marginLeft: 5,
  },
  messageFooter: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: 5,
  },
  timestamp: {
    fontSize: 12,
    color: Colours.gray,
    marginRight: 5,
  },
  statusContainer: {
    marginLeft: 5,
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: Colours.lightGray,
    backgroundColor: Colours.white,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: Colours.lightGray,
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 8,
    marginRight: 10,
    maxHeight: 100,
    backgroundColor: Colours.white,
  },
  sendButton: {
    backgroundColor: Colours.primary,
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendButtonDisabled: {
    backgroundColor: Colours.gray,
  },
});
