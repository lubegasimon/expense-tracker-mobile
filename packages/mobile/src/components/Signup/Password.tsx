import { TextInput, Text, View } from "react-native";
import { FieldProps } from "./types";
import { inputStyle, errorStyle, inputAndErrorStyle } from "./styles";

function Password({ value, onChange, error }: FieldProps) {
  return (
    <View style={inputAndErrorStyle.view}>
      <TextInput
        style={inputStyle.input}
        onChangeText={onChange}
        value={value}
        placeholder="Password"
        placeholderTextColor="gray"
        secureTextEntry={true}
      />
      {error && <Text style={errorStyle.error}>{error}</Text>}
    </View>
  );
}

export default Password;
