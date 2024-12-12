import { View, Text, Pressable } from "react-native";
import { ButtonProps } from "./types";

function ResendCode({ onPress, disabled }: ButtonProps) {
  return (
    <View
      style={{ flexDirection: "row", paddingLeft: "10%", paddingTop: "3%" }}
    >
      <Text style={{ fontSize: 18 }}>Didn't receive code?</Text>
      <Pressable onPress={onPress} disabled={disabled}>
        <Text style={{ color: "#34b4eb", paddingLeft: "2%", fontSize: 18 }}>
          Resend code
        </Text>
      </Pressable>
    </View>
  );
}

export default ResendCode;
