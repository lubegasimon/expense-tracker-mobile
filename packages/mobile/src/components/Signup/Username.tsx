import { Text, TextInput, View } from "react-native";
import { inputStyle, errorStyle, inputAndErrorStyle } from "./styles";
import { FieldProps } from "./types";

function Username({ value, onChange, error }: FieldProps) {
  return (
    <View style={inputAndErrorStyle.view}>
      <TextInput
        style={inputStyle.input}
        onChangeText={(value) => onChange(value)}
        value={value}
        placeholder="Username"
        placeholderTextColor="gray"
      />
      {error && <Text style={errorStyle.error}>{error}</Text>}
    </View>
  );
}

export default Username;
