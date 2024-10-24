import { TextInput } from "react-native";
import { useState } from "react";

import inputStyle from "./styles";

function ConfirmPasswordField() {
  const [confirmPassword, setConfirmPassword] = useState("");

  return (
    <TextInput
      style={inputStyle.input}
      onChangeText={setConfirmPassword}
      value={confirmPassword}
      placeholder="Confirm Password"
      placeholderTextColor="gray"
    />
  );
}

export default ConfirmPasswordField;
