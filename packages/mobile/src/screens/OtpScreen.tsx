import { useState } from "react";
import { View, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { axiosInstance } from "@/src/api/axios";
import { resendCode, verifyCode } from "@/src/api/endpoints";
import Otp from "../components/Otp/Otp";
import OtpTitle from "../components/Otp/OtpTitle";
import ResendCodeSection from "../components/Otp/ResendCode";
import SubmitCodeButton from "../components/Otp/SubmitCode";
import ErrorBoundary from "../components/ErrorBoundary/ErrorBoundary";
import Loader from "../components/Loader/loader";
import Error from "../components/Error/Error";
import { useAppSelector } from "../redux/hooks";
import { selectEmail } from "../redux/userSlice";
import { clearedEmail } from "../redux/userSlice";
import { useAppDispatch } from "../redux/hooks";
import { RouteNavigationStack } from "../types";

type ExpenseNavigationProp = StackNavigationProp<
  RouteNavigationStack,
  "expenses"
>;

function OtpScreen() {
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [resentCode, setResentCode] = useState(false);
  const email = useAppSelector(selectEmail);
  const dispatch = useAppDispatch();

  const navigation = useNavigation<ExpenseNavigationProp>();

  function handleSubmit(code: string) {
    setLoading(true);
    axiosInstance
      .post(verifyCode, { code, email })
      .then(() => {
        dispatch(clearedEmail());
        setLoading(false);
        setError("");
        navigation.navigate("expenses");
      })
      .catch((error) => {
        setError(error.response.data.error);
      })
      .finally(() => setLoading(false));
  }

  function handleResendCode() {
    setLoading(true);
    axiosInstance
      .post(resendCode, { email })
      .then(() => {
        setResentCode(true);
        setError("");
      })
      .catch((error) => {
        setError(error.response.data.error);
      })
      .finally(() => setLoading(false));
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
