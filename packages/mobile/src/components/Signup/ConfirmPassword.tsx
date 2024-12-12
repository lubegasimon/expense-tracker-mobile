import { TextInput, View } from "react-native";
import { inputStyle, inputAndErrorStyle } from "./styles";
import { FieldProps } from "./types";
import EyeIcon from "../EyeIcon";
import Error from "../Error/Error";

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
      <Error error={error} />
    </View>
  );
}

export default ConfirmPassword;
