import { TextInput, View } from "react-native";
import { FieldProps } from "./types";
import { inputStyle, inputAndErrorStyle } from "./styles";
import EyeIcon, { ShowPasswordProps } from "../EyeIcon";
export interface PasswordProps extends FieldProps, ShowPasswordProps {}
import Error from "../Error/Error";

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
      <Error error={error} />
    </View>
  );
}

export default Password;
