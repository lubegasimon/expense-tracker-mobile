import { Text, StyleSheet, KeyboardAvoidingView, Platform } from "react-native";
import { useState } from "react";
import { AxiosResponse } from "axios";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteNavigationStack } from "@/src/types";
import { axiosInstance } from "../api/axios";
import { signupApi } from "../api/endpoints";
import Username from "../components/Signup/Username";
import Email from "../components/Signup/Email";
import Password from "../components/Signup/Password";
import ConfirmPassword from "../components/Signup/ConfirmPassword";
import SignupButton from "../components/Signup/SignupButton";
import Loader from "../components/Loader/loader";
import ErrorBoundary from "../components/ErrorBoundary/ErrorBoundary";
import Error from "../components/Error/Error";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { clearEmail, selectEmail, storedEmail } from "../redux/userSlice";

type VerifyCodeNavigationProp = StackNavigationProp<
  RouteNavigationStack,
  "verifyCode"
>;

function SignupForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(true);
  const [showConfirmPassword, setConfirmShowPassword] = useState(true);
  const navigation = useNavigation<VerifyCodeNavigationProp>();
  const dispatch = useAppDispatch();
  const email = useAppSelector(selectEmail);

  function handleSubmit() {
    setLoading(true);
    axiosInstance
      .post(signupApi, {
        username,
        email,
        password,
        confirmPassword,
      })
      .then((_response: AxiosResponse) => {
        dispatch(storedEmail(email));
        dispatch(clearEmail());
        setUsername("");
        setPassword("");
        setConfirmPassword("");
        navigation.navigate("verifyCode", { email });
        setLoading(false);
        setErrors({});
      })
      .catch((error) => {
        setLoading(false);
        if (!error.response || !error.response.data) {
          console.error("No response data received from the server:", error);
          setErrors({
            ServerConnectionError:
              "Failed to connect to the server. Confirm that you are connected to the internet and try again",
          });
          return;
        }
        setErrors(error.response.data.error);
      });
  }

  if (loading) return <Loader />;
  else
    return (
      <ErrorBoundary>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.container}
        >
          <Text style={{ fontSize: 30, fontWeight: "bold" }}>
            {" "}
            Create your account{" "}
          </Text>
          <Error error={errors.emailExists} />
          <Username
            value={username}
            onChange={setUsername}
            error={errors.username}
          />
          <Email
            value={email}
            onChange={(text) => dispatch(storedEmail(text))}
            error={errors.email}
          />
          <Password
            value={password}
            onChange={setPassword}
            error={errors.password}
            isShowPassword={showPassword}
            setShowPassword={() => setShowPassword(!showPassword)}
          />
          <ConfirmPassword
            value={confirmPassword}
            onChange={setConfirmPassword}
            error={errors.confirmPassword}
            isShowConfirmPassword={showConfirmPassword}
            setShowConfirmPassword={() =>
              setConfirmShowPassword(!showConfirmPassword)
            }
          />
          <SignupButton onPress={handleSubmit} disabled={loading} />
        </KeyboardAvoidingView>
      </ErrorBoundary>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default SignupForm;
