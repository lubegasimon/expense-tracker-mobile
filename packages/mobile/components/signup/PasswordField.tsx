import { TextInput } from "react-native";
import { useState } from "react";

import inputStyle from "./styles";

function PasswordField() {
  const [password, setPassword] = useState("");

  return (
    <TextInput
      style={inputStyle.input}
      onChangeText={setPassword}
      value={password}
      placeholder="Enter Your Password"
      placeholderTextColor="gray"
    />
  );
}

export default PasswordField;
