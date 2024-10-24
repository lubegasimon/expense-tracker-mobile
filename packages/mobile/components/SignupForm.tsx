import { Text, View, TextInput, StyleSheet } from "react-native";
import { useState } from "react";

export default function SignupForm() {
  const [username, setUsername] = useState("");

  return (
    <View style={styles.view}>
      <Text> Create account </Text>
      <TextInput
        style={styles.input}
        onChangeText={setUsername}
        value={username}
        placeholder="Enter Your Username"
        placeholderTextColor="gray"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    padding: 50,
  },

  appName: {
    fontSize: 20,
    fontWeight: "bold",
  },
  input: {
    height: 40,
    width: 200,
    margin: 12,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
  },
});
