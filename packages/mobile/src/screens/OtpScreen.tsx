import { View, Text } from "react-native";
import Otp from "../components/Otp/Otp";
import OtpHeadings from "../components/Otp/OtpHeadings";
import ResendCodeSection from "../components/Otp/ResendCode";
import SubmitCodeButton from "../components/Otp/SubmitCode";
import { ErrorBoundary } from "react-error-boundary";

function OtpScreen() {
  return (
    <ErrorBoundary
      fallback={
        <Text
          style={{
            color: "red",
          }}
        >
          Something went wrong
        </Text>
      }
    >
      <View style={{ paddingTop: "20%" }}>
        <OtpHeadings />
        <Otp />
        <ResendCodeSection />
        <SubmitCodeButton />
      </View>
    </ErrorBoundary>
  );
}

export default OtpScreen;
