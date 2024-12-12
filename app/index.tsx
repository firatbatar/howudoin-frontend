import { Text, View, StyleSheet } from "react-native";
import { Redirect } from "expo-router";
import Config from "./config";

export default function Index() {
  if (!Config.token) {
    return <Redirect href="/login" />;
  }
  
  return (
    <View style={styles.container}>
        <Text style={styles.title}>Howudoin Home</Text>
    </View> 
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  btn: {
    padding: 10,
    backgroundColor: "lightgreen",
    color: "black",
    
    borderWidth: 2,
    borderRadius: 5,
    margin: 10,

    textAlign: "center",
    alignItems: "center",

    width: 200,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
});