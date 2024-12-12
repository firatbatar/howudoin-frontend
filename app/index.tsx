import { Text, View, StyleSheet, Pressable } from "react-native";
import { Link } from "expo-router";

export default function Index() {
  return (
    <View style={styles.container}>
      <View>

        <Link href="/login" asChild>
          <Pressable style={styles.btn}>
            <Text>Login</Text>
          </Pressable>
        </Link>

        <Link href="/register" asChild>
          <Pressable style={styles.btn}>
            <Text>Register</Text>
          </Pressable>
        </Link>
      </View>
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
});