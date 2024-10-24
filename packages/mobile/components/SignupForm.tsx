import { Text, View, TextInput, StyleSheet } from "react-native";
import { useState } from "react";

export default function SignupForm() {
  const [username, setUsername] = useState("");

  return (
    <View style={styles.view}>
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
  },

  appName: {
    fontSize: 20,
    fontWeight: "bold",
  },
  input: {
    height: 40,
    margin: 12,
    borderColor: "gray",
    borderWidth: 1,
    padding: 10,
  },
});
