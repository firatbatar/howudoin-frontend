export type FriendObject = {
  email: string;
  name: string;
  lastName: string;
  avatar: string;
};

export type GroupObject = {
  id: string;
  name: string;
  avatar: string;
};

export interface Message {
  id: string;
  sender: string;
  senderName: string;
  receiver: string;
  content: string;
  timestamp: string;
};
