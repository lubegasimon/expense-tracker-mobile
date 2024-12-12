import { TextInput, View } from "react-native";
import { FieldProps } from "./types";
import { inputStyle, inputAndErrorStyle } from "./styles";
import Error from "../Error/Error";

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
      <Error error={error} />
    </View>
  );
}

export default Email;
