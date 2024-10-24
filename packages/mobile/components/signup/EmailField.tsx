import { TextInput } from "react-native";
import { useState } from "react";

import inputStyle from "./styles";

function EmailField() {
  const [email, setEmail] = useState("");

  return (
    <TextInput
      style={inputStyle.input}
      onChangeText={setEmail}
      value={email}
      placeholder="Enter Your Email"
      placeholderTextColor="gray"
    />
  );
}

export default EmailField;
