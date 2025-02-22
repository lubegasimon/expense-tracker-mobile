import React from "react";
import { TextInput } from "react-native-paper";
import Error from "../Error/Error";
import inputStyles from "./styles";

interface ExpenseFormFieldProps {
  value: string;
  onChangeText: (newValue: string) => void;
  error?: string;
  label: string;
  placeholder: string;
}

function Input({
  value,
  onChangeText,
  error,
  label,
  placeholder,
}: ExpenseFormFieldProps) {
  return (
    <>
      <TextInput
        style={inputStyles.input}
        label={label}
        value={value}
        onChangeText={onChangeText}
        error={error ? true : false}
        placeholder={placeholder}
      />
      <Error error={error} />
    </>
  );
}

export default Input;
