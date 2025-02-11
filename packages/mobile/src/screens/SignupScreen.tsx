import { Text, StyleSheet, KeyboardAvoidingView, Platform } from "react-native";
import { useState } from "react";
import { AxiosResponse } from "axios";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteNavigationStack } from "@/src/types";
import { axiosInstance } from "../api/axios";
import { signupApi } from "../api/endpoints";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { selectEmail, storedEmail } from "../redux/userSlice";
import SignupButton from "../components/SignupButton";
import Input from "../components/TextInput";
import PasswordInput from "../components/TextInput/passwordInput";
import Loader from "../components/Loader/loader";
import ErrorBoundary from "../components/ErrorBoundary/ErrorBoundary";
import Error from "../components/Error/Error";

type VerifyCodeNavigationProp = StackNavigationProp<
  RouteNavigationStack,
  "verifyCode"
>;

function SignupFormScreen() {
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
            Create your account
          </Text>
          <Error error={errors.emailExists} />
          <Input
            label="Username"
            value={username}
            onChangeText={setUsername}
            error={errors.username}
          />
          <Input
            label="Email"
            value={email}
            onChangeText={(text) => dispatch(storedEmail(text))}
            error={errors.email}
          />
          <PasswordInput
            label="Password"
            value={password}
            onChangeText={setPassword}
            error={errors.password}
            isShowPassword={showPassword}
            setShowPassword={() => setShowPassword(!showPassword)}
          />
          <PasswordInput
            label="Confirm password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            error={errors.confirmPassword}
            isShowPassword={showConfirmPassword}
            setShowPassword={() => setConfirmShowPassword(!showConfirmPassword)}
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

export default SignupFormScreen;
