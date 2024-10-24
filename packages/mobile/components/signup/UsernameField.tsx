import { TextInput } from "react-native";
import { useState } from "react";

import inputStyle from "./styles";

function UsernameField() {
  const [username, setUsername] = useState("");

  return (
    <TextInput
      style={inputStyle.input}
      onChangeText={setUsername}
      value={username}
      placeholder="Enter Your Username"
      placeholderTextColor="gray"
    />
  );
}

export default UsernameField;
