import { StyleSheet } from 'react-native';

export const Colours = {
  primary: '#007AFF',
  darkGray: '#333333',
  gray: '#A9A9A9',
  lightGray: '#E5E5EA',
  white: '#FFFFFF',
  black: '#000000',
  blue: '#0A84FF',
};

export const Style = StyleSheet.create({
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
    backgroundColor: Colours.blue,
    color: Colours.white,

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

