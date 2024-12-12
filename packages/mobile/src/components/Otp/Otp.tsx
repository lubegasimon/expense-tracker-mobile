import { OtpInput } from "react-native-otp-entry";
import { View } from "react-native";
import styles from "./styles";

function Otp() {
  return (
    <View>
      <OtpInput
        numberOfDigits={4}
        focusColor="green"
        focusStickBlinkingDuration={500}
        onTextChange={(text) => console.log(text)}
        onFilled={(text) => console.log(`OTP is ${text}`)}
        textInputProps={{
          accessibilityLabel: "One-Time Password",
        }}
        type="numeric"
        theme={{
          containerStyle: styles.container,
        }}
      />
    </View>
  );
}

export default Otp;
