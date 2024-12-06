import { Text, TextInput, View } from "react-native";
import { inputStyle, errorStyle, inputAndErrorStyle } from "./styles";
import { FieldProps } from "./types";
import EyeIcon from "../EyeIcon";

export interface ConfirmPasswordProps extends FieldProps, ShowPasswordProps {}

interface ShowPasswordProps {
  isShowConfirmPassword: boolean;
  setShowConfirmPassword: () => void;
}

function ConfirmPassword({
  value,
  onChange,
  error,
  isShowConfirmPassword,
  setShowConfirmPassword,
}: ConfirmPasswordProps) {
  return (
    <View style={inputAndErrorStyle.view}>
      <TextInput
        style={inputStyle.input}
        onChangeText={(value) => onChange(value)}
        value={value}
        placeholder="Confirm Password"
        placeholderTextColor="gray"
        secureTextEntry={isShowConfirmPassword}
      />
      <EyeIcon
        isShowPassword={isShowConfirmPassword}
        setShowPassword={setShowConfirmPassword}
      />
      {error && <Text style={errorStyle.error}>{error}</Text>}
    </View>
  );
}

export default ConfirmPassword;
