import { TextInput, Text, View } from "react-native";
import { FieldProps } from "./types";
import { inputStyle, errorStyle, inputAndErrorStyle } from "./styles";

function Email({ value, onChange, error }: FieldProps) {
  return (
    <View style={inputAndErrorStyle.view}>
      <TextInput
        style={inputStyle.input}
        onChangeText={(value) => onChange(value)}
        value={value}
        placeholder="Email"
        placeholderTextColor="gray"
      />
      {error && <Text style={errorStyle.error}>{error}</Text>}
    </View>
  );
}

export default Email;
