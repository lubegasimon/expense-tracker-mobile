import { TextInput } from "react-native-paper";
import React from "react";
import { SignupFormFieldProps } from "./types";
import inputStyles from "./styles";
import Error from "../Error/Error";

interface PasswordProps extends SignupFormFieldProps {
  isShowPassword: boolean;
  setShowPassword: () => void;
}

function PasswordInput({
  value,
  onChangeText,
  error,
  label,
  isShowPassword,
  setShowPassword,
}: PasswordProps) {
  return (
    <>
      <TextInput
        style={inputStyles.input}
        value={value}
        onChangeText={onChangeText}
        label={label}
        secureTextEntry={isShowPassword}
        right={
          <TextInput.Icon
            style={{ paddingTop: 20 }}
            icon={isShowPassword ? "eye" : "eye-off"}
            onPress={setShowPassword}
          />
        }
      />
      <Error error={error} />
    </>
  );
}

export default PasswordInput;
