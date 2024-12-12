import { TextInput, View } from "react-native";
import { inputStyle, inputAndErrorStyle } from "./styles";
import { FieldProps } from "./types";
import Error from "../Error/Error";

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
      <Error error={error} />
    </View>
  );
}

export default Username;
