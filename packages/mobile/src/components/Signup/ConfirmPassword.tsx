import { Text, TextInput, View } from "react-native";
import { FieldProps } from "./types";
import { inputStyle, errorStyle, inputAndErrorStyle } from "./styles";

function ConfirmPassword({ value, onChange, error }: FieldProps) {
  return (
    <View style={inputAndErrorStyle.view}>
      <TextInput
        style={inputStyle.input}
        onChangeText={(value) => onChange(value)}
        value={value}
        placeholder="Confirm Password"
        placeholderTextColor="gray"
        secureTextEntry={true}
      />
      {error && <Text style={errorStyle.error}>{error}</Text>}
    </View>
  );
}

export default ConfirmPassword;
