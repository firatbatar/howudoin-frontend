import { StyleSheet } from 'react-native';

export default class Config {
  public static readonly API_URL = 'http://10.51.13.113:8080';
  public static token: string = '';
}

export const commonStyles = StyleSheet.create({
  input: {
    height: 50,
    width: 300,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
  },
  btn: {
    padding: 10,
    backgroundColor: 'lightgreen',
    color: 'black',

    borderWidth: 2,
    borderRadius: 5,
    margin: 10,

    textAlign: 'center',
    alignItems: 'center',

    width: 200,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  image: {
    width: 50,
    height: 50,
    margin: 10,
    borderRadius: 50,
  },
  text: {
    flexDirection: 'column',
    height: 70,
    justifyContent: 'space-around',
    flex: 1,
  },
  link: {
    color: 'blue',
  },
});

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
}

export const colors = {
  primary: '#007AFF',
  gray: '#8E8E93',
  lightGray: '#E5E5EA',
  white: '#FFFFFF',
  black: '#000000',
  blue: '#0A84FF'
};