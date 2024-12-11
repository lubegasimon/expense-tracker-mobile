import { View, Text, Pressable } from "react-native";

function ResendCode() {
  return (
    <View
      style={{ flexDirection: "row", paddingLeft: "10%", paddingTop: "5%" }}
    >
      <Text style={{ fontSize: 18 }}>Didn't receive code?</Text>
      <Pressable>
        <Text style={{ color: "#34b4eb", paddingLeft: "2%", fontSize: 18 }}>
          Resend code
        </Text>
      </Pressable>
    </View>
  );
}

export default ResendCode;
