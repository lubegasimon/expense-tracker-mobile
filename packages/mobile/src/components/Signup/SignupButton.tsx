import React from "react";
import { Pressable, Text, View } from "react-native";
import { signupButtonStyles } from "./styles";

interface ButtonProp {
  onPress: () => void;
  disabled: boolean;
}

function SignupButton({ onPress, disabled }: ButtonProp) {
  return (
    <View>
      <Pressable
        style={signupButtonStyles.button}
        onPress={onPress}
        disabled={disabled}
      >
        <Text style={signupButtonStyles.buttonText}>Signup</Text>
      </Pressable>
    </View>
  );
}

export default SignupButton;
