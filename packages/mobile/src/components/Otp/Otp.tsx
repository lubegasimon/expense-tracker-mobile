import { OtpInput } from "react-native-otp-entry";
import { View } from "react-native";
import styles from "./styles";

interface OtpProps {
  setCode: (code: string) => void;
}

function Otp({ setCode }: OtpProps) {
  return (
    <View>
      <OtpInput
        numberOfDigits={4}
        focusColor="green"
        focusStickBlinkingDuration={500}
        onFilled={(code) => {
          setCode(code);
        }}
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
