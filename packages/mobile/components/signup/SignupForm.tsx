import { Text, View, TextInput, StyleSheet } from "react-native";
import { useState } from "react";

import inputStyle from "./styles";

export default function SignupForm() {
  const [username, setUsername] = useState("");

  return (
    <View style={styles.view}>
      <Text> Create account </Text>
      <TextInput
        style={inputStyle.input}
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
});
