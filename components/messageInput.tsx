import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Colours } from './common/styles';

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
