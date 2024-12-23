import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colours } from './common/styles';

type MessageBubbleProps = {
  content: string;
  timestamp: string;
  isOwnMessage: boolean;
  senderName?: string;
};

export const MessageBubble: React.FC<MessageBubbleProps> = ({
  content,
  timestamp,
  isOwnMessage,
  senderName,
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
      </View>
    </View>
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
});
