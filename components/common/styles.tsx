import { StyleSheet } from 'react-native';

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
