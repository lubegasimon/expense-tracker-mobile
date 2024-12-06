import { TextInput, Text, View } from "react-native";
import { FieldProps } from "./types";
import { inputStyle, errorStyle, inputAndErrorStyle } from "./styles";
import EyeIcon, { ShowPasswordProps } from "../EyeIcon";
export interface PasswordProps extends FieldProps, ShowPasswordProps {}

function Password({
  value,
  onChange,
  error,
  isShowPassword,
  setShowPassword,
}: PasswordProps) {
  return (
    <View style={inputAndErrorStyle.view}>
      <TextInput
        style={inputStyle.input}
        onChangeText={onChange}
        value={value}
        placeholder="Password"
        placeholderTextColor="gray"
        secureTextEntry={isShowPassword}
      />
      <EyeIcon
        isShowPassword={isShowPassword}
        setShowPassword={setShowPassword}
      />
      {error && <Text style={errorStyle.error}>{error}</Text>}
    </View>
  );
}

export default Password;
