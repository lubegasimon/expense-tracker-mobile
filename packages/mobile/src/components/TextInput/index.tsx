import React from "react";
import { TextInput } from "react-native-paper";
import Error from "../Error/Error";
import inputStyles from "./styles";
import { SignupFormFieldProps } from "./types";

function Input({ value, onChangeText, error, label }: SignupFormFieldProps) {
  return (
    <>
      <TextInput
        style={inputStyles.input}
        label={label}
        value={value}
        onChangeText={(value) => onChangeText(value)}
      />
      <Error error={error} />
    </>
  );
}

export default Input;
