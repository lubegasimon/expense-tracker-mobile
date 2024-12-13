import { useState } from "react";
import { View, StyleSheet } from "react-native";
import { useRoute } from "@react-navigation/native";
import { axiosInstance } from "@/src/api/axios";
import { resendCode, verifyCode } from "@/src/api/endpoints";
import Otp from "../components/Otp/Otp";
import OtpTitle from "../components/Otp/OtpTitle";
import ResendCodeSection from "../components/Otp/ResendCode";
import SubmitCodeButton from "../components/Otp/SubmitCode";
import ErrorBoundary from "../components/ErrorBoundary/ErrorBoundary";
import Loader from "../components/Loader/loader";
import Error from "../components/Error/Error";

function OtpScreen() {
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [resentCode, setResentCode] = useState(false);

  interface EmailParam {
    email: string;
  }

  const route = useRoute();
  const { email } = route.params as EmailParam;

  function handleSubmit(code: string) {
    setLoading(true);
    axiosInstance
      .post(verifyCode, { code, email })
      .then(() => {
        setLoading(false);
        setError("");
      })
      .catch((error) => {
        setLoading(false);
        setError(error.response.data.error);
      });
  }

  function handleResendCode() {
    setLoading(true);
    axiosInstance
      .post(resendCode)
      .then(() => {
        setResentCode(true);
        setLoading(false);
        setError("");
      })
      .catch((error) => {
        setLoading(false);
        setError(error.response.data.error);
      });
  }

  if (loading) return <Loader />;
  else
    return (
      <ErrorBoundary>
        <View style={{ paddingTop: "10%" }}>
          <OtpTitle
            subTitle={
              resentCode
                ? "Code has been re-sent to your email"
                : "Code has been sent to your email"
            }
          />
          <Otp setCode={(code) => setCode(code)} />
          <Error error={error} style={errorStyle.error} />
          <ResendCodeSection onPress={handleResendCode} disabled={loading} />
          <SubmitCodeButton
            onPress={() => handleSubmit(code)}
            disabled={loading}
          />
        </View>
      </ErrorBoundary>
    );
}

const errorStyle = StyleSheet.create({
  error: {
    paddingLeft: "10%",
    paddingTop: "5%",
  },
});

export default OtpScreen;
